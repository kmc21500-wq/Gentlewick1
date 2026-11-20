import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Shell } from "@/components/shell";
import { backupMaxBytes, makeBackup, validateBackup } from "@/lib/store";
import { cloudConfigured, deleteCloudBackup, downloadCloudBackup, getCloudSession, signIn, signOut, signUp, uploadCloudBackup } from "@/lib/cloud-sync";
import { useLedger } from "@/lib/use-ledger";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My memories & backup — Gentlewick" }] }),
  component: AccountInfo,
});

function AccountInfo() {
  const { data, ready, error, commit } = useLedger();
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [cloudSession, setCloudSession] = useState(() => getCloudSession());
  const [cloudEmail, setCloudEmail] = useState("");
  const [cloudPassword, setCloudPassword] = useState("");
  const [cloudStatus, setCloudStatus] = useState("");

  function downloadBackup() {
    if (!data) return;
    const json = JSON.stringify(makeBackup(data), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `gentlewick-backup-${date}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Backup downloaded. Keep it somewhere safe, outside this phone/browser.");
  }

  async function cloudAuth(mode: "signin" | "signup") {
    setBusy(true); setCloudStatus("");
    try {
      if (!cloudEmail.trim() || cloudPassword.length < 8) throw new Error("Enter an email and a password of at least 8 characters.");
      const session = mode === "signin" ? await signIn(cloudEmail.trim(), cloudPassword) : await signUp(cloudEmail.trim(), cloudPassword);
      setCloudSession(getCloudSession());
      setCloudPassword("");
      setCloudStatus(session?.access_token ? "Signed in. Cloud backup is available when you choose to use it." : "Account created. Check your email to confirm, then sign in.");
    } catch (err) { setCloudStatus(err instanceof Error ? err.message : "Cloud account action failed."); }
    finally { setBusy(false); }
  }

  async function cloudUpload() {
    if (!data) return;
    setBusy(true); setCloudStatus("");
    try { await uploadCloudBackup(data); setCloudStatus("Encrypted connection used. Your current memories and photos have been uploaded to your private cloud backup."); }
    catch (err) { setCloudStatus(err instanceof Error ? err.message : "Upload failed."); }
    finally { setBusy(false); }
  }

  async function cloudDelete() {
    if (!window.confirm("Delete your Gentlewick cloud backup? Your local memories on this device will not be changed.")) return;
    setBusy(true); setCloudStatus("");
    try { await deleteCloudBackup(); setCloudStatus("Cloud backup deleted. Your local memories remain on this device."); }
    catch (err) { setCloudStatus(err instanceof Error ? err.message : "Could not delete the cloud backup."); }
    finally { setBusy(false); }
  }

  async function cloudRestore() {
    setBusy(true); setCloudStatus("");
    try {
      const backup = await downloadCloudBackup();
      if (!backup) { setCloudStatus("No cloud backup exists for this account yet."); return; }
      const checked = validateBackup({ app: "Gentlewick", schemaVersion: 1, exportedAt: backup.updated_at, data: backup.data });
      if (!checked.ok) throw new Error(checked.error);
      if (!window.confirm(`Restore the cloud backup dated ${new Date(backup.updated_at).toLocaleString()}? This replaces memories on this device. Download a device backup first if you want to keep them.`)) return;
      const ok = commit(() => checked.data);
      setCloudStatus(ok ? "Cloud backup restored to this device." : "Could not restore to this device; the current data was left unchanged.");
    } catch (err) { setCloudStatus(err instanceof Error ? err.message : "Cloud restore failed."); }
    finally { setBusy(false); }
  }

  async function restoreBackup(file: File | undefined) {
    if (!file) return;
    setStatus("");
    if (file.size > backupMaxBytes) {
      setStatus("That backup is too large to restore safely in this browser.");
      return;
    }
    setBusy(true);
    try {
      const parsed: unknown = JSON.parse(await file.text());
      const checked = validateBackup(parsed);
      if (!checked.ok) {
        setStatus(checked.error);
        return;
      }
      const confirmed = window.confirm("Restore this backup? It will replace the memories currently stored in this browser. Download a backup of the current memories first if you want to keep them.");
      if (!confirmed) return;
      const ok = commit(() => checked.data);
      setStatus(ok ? "Backup restored. Your memories are back on this device." : "The browser could not store this backup. Your existing memories were left in place.");
    } catch {
      setStatus("That file could not be read as a backup.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <Shell>
      <main className="mx-auto max-w-2xl px-5 py-14">
        <p className="kicker">My memories</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Keep them safe.</h1>
        <p className="lede mt-5">Gentlewick does not need an account. Your pages, photographs, candle evenings, and saved candle notes are kept in this browser on this device.</p>
        <div className="panel mt-8 grid gap-4 p-5 sm:p-7">
          <div>
            <h2 className="font-serif text-2xl">Download a backup</h2>
            <p className="mt-2 text-muted">Save a copy of your memorials, photographs, notes, candle history, and held candle notes as a file. This is the safest way to carry your memories to another device.</p>
          </div>
          <button type="button" className="btn btn-primary w-fit" disabled={!ready || !data} onClick={downloadBackup}>Download my backup</button>
          <div className="border-t border-line pt-4">
            <h2 className="font-serif text-2xl">Restore a backup</h2>
            <p className="mt-2 text-muted">Choose a Gentlewick backup file. Restoring replaces the memories currently on this device, so download a current backup first if needed.</p>
            <label className="btn btn-ghost mt-4 w-fit">
              {busy ? "Restoring…" : "Choose backup file"}
              <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" disabled={busy} onChange={(event) => void restoreBackup(event.target.files?.[0])} />
            </label>
          </div>
          {status ? <p role="status" className="text-sm text-sea-deep">{status}</p> : null}
          {error ? <p role="alert" className="text-sm text-sea-deep">{error}</p> : null}
        </div>
        <section className="panel mt-8 grid gap-4 p-5 sm:p-7">
          <div>
            <p className="kicker">Optional · private cloud copy</p>
            <h2 className="font-serif text-2xl">Carry your memories between devices.</h2>
            <p className="mt-2 text-muted">Cloud backup is opt-in. It uploads your memorials, photographs, candle history, and held-candle notes to a private account. It is not automatic: choose Upload or Restore yourself.</p>
          </div>
          {!cloudConfigured() ? <p className="rounded-xl bg-cream p-4 text-sm">Cloud sync is prepared in the website code, but the owner still needs to configure Supabase and its private backup table before it can be enabled.</p> : cloudSession ? (
            <div className="grid gap-3">
              <p className="text-sm">Signed in as <strong>{cloudSession.user.email ?? "your account"}</strong>.</p>
              <div className="flex flex-wrap gap-3"><button className="btn btn-primary" type="button" disabled={busy || !data} onClick={() => void cloudUpload()}>{busy ? "Working…" : "Upload this device's backup"}</button><button className="btn btn-ghost" type="button" disabled={busy} onClick={() => void cloudRestore()}>Restore cloud backup</button><button className="btn btn-ghost" type="button" disabled={busy} onClick={() => void cloudDelete()}>Delete cloud backup</button><button className="btn btn-ghost" type="button" onClick={() => { signOut(); setCloudSession(null); setCloudStatus("Signed out."); }}>Sign out</button></div>
            </div>
          ) : (
            <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
              <label className="field"><span>Email</span><input type="email" autoComplete="email" value={cloudEmail} onChange={(e) => setCloudEmail(e.target.value)} /></label>
              <label className="field"><span>Password (8+ characters)</span><input type="password" autoComplete="current-password" value={cloudPassword} onChange={(e) => setCloudPassword(e.target.value)} /></label>
              <div className="flex flex-wrap gap-3"><button type="button" className="btn btn-primary" disabled={busy} onClick={() => void cloudAuth("signin")}>Sign in</button><button type="button" className="btn btn-ghost" disabled={busy} onClick={() => void cloudAuth("signup")}>Create account</button></div>
            </form>
          )}
          {cloudStatus ? <p role="status" className="text-sm text-sea-deep">{cloudStatus}</p> : null}
          <p className="text-xs text-muted">Only use this on a device you trust. Cloud restore replaces local data. Keep a separate downloaded backup too.</p>
        </section>
        <div className="mt-8 grid gap-3 text-muted">
          <p><strong className="text-ink">A few important things:</strong></p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Gentlewick currently stores memories locally; they are not uploaded to our servers.</li>
            <li>Shared memorial links contain the memorial words and details, but not photographs or candle history.</li>
            <li>Clearing browser data, changing devices, or browser storage being removed can erase the local copy.</li>
            <li>Keep your backup file somewhere private. It contains personal memories and any photographs you added.</li>
          </ul>
        </div>
        <Link to="/memorials" className="btn btn-ghost mt-8">Back to the lights</Link>
      </main>
    </Shell>
  );
}
