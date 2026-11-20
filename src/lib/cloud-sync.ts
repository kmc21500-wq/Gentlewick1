import type { Persisted } from "@/lib/store";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "") ?? "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
const SESSION_KEY = "gentlewick.cloud-session.v1";

type Session = { access_token: string; refresh_token: string; expires_at?: number; user: { id: string; email?: string } };

export function cloudConfigured() { return Boolean(SUPABASE_URL && SUPABASE_KEY); }

export function getCloudSession(): Session | null {
  try {
    const value = localStorage.getItem(SESSION_KEY);
    if (!value) return null;
    const session = JSON.parse(value) as Session;
    if (!session.access_token || !session.refresh_token || !session.user?.id) return null;
    return session;
  } catch { return null; }
}

function saveSession(session: Session & { expires_in?: number }) {
  if (!session.expires_at && session.expires_in) session.expires_at = Math.floor(Date.now() / 1000) + session.expires_in;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

async function api(path: string, init: RequestInit = {}, token?: string) {
  if (!cloudConfigured()) throw new Error("Cloud backup is not configured yet. The website owner must connect Supabase first.");
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(init.headers ?? {}) },
  });
  const body = await response.text();
  let parsed: unknown = null;
  try { parsed = body ? JSON.parse(body) : null; } catch { parsed = body; }
  if (!response.ok) {
    const message = parsed && typeof parsed === "object" && "message" in parsed ? String((parsed as { message: unknown }).message) : `Cloud request failed (${response.status}).`;
    throw new Error(message);
  }
  return parsed;
}

export async function signUp(email: string, password: string) {
  const result = await api("/auth/v1/signup", { method: "POST", body: JSON.stringify({ email, password }) }) as Session;
  if (result?.access_token && result?.refresh_token && result?.user) saveSession(result);
  return result;
}
export async function signIn(email: string, password: string) {
  const result = await api("/auth/v1/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) }) as Session;
  saveSession(result); return result;
}
export function signOut() {
  const session = getCloudSession(); localStorage.removeItem(SESSION_KEY);
  if (session) void api("/auth/v1/logout", { method: "POST" }, session.access_token).catch(() => undefined);
}
async function validSession() {
  let session = getCloudSession();
  if (!session) throw new Error("Please sign in first.");
  if (session.expires_at && session.expires_at * 1000 < Date.now() + 60_000) {
    const refreshed = await api("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: session.refresh_token }) }) as Session;
    saveSession(refreshed); session = refreshed;
  }
  return session;
}
export async function uploadCloudBackup(data: Persisted) {
  const session = await validSession();
  const bytes = new TextEncoder().encode(JSON.stringify(data)).length;
  if (bytes > 8 * 1024 * 1024) throw new Error("This cloud backup is larger than Gentlewick’s 8 MB backup limit. Download a device backup and remove/reduce large photos first.");
  await api("/rest/v1/gentlewick_backups?on_conflict=user_id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify({ user_id: session.user.id, data, updated_at: new Date().toISOString() }) }, session.access_token);
}
export async function downloadCloudBackup(): Promise<{ data: Persisted; updated_at: string } | null> {
  const session = await validSession();
  const result = await api(`/rest/v1/gentlewick_backups?select=data,updated_at&user_id=eq.${encodeURIComponent(session.user.id)}&limit=1`, { method: "GET" }, session.access_token) as Array<{ data: Persisted; updated_at: string }>;
  return result?.[0] ?? null;
}

export async function deleteCloudBackup() {
  const session = await validSession();
  await api(`/rest/v1/gentlewick_backups?user_id=eq.${encodeURIComponent(session.user.id)}`, { method: "DELETE" }, session.access_token);
}
