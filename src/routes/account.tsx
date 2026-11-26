import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Shell } from "@/components/shell";
import { useLedger } from "@/lib/use-ledger";
import type { Persisted } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My memories — Gentlewick" }] }),
  component: AccountInfo,
});

function isBackup(value: unknown): value is { version: 1; data: Persisted } {
  if (!value || typeof value !== "object") return false;
  const backup = value as { version?: unknown; data?: Partial<Persisted> };
  const data = backup.data;
  if (backup.version !== 1 || !data || typeof data !== "object") return false;
  if (!Array.isArray(data.memorials) || !Array.isArray(data.orders)) return false;
  if (!data.lights || typeof data.lights !== "object" || Array.isArray(data.lights)) return false;
  if (!data.photos || typeof data.photos !== "object" || Array.isArray(data.photos)) return false;
  const species = ["dog", "cat", "bird", "other"];
  if (!data.memorials.every((m) => m && typeof m.id === "string" && typeof m.slug === "string" && typeof m.name === "string" && m.house === false && species.includes(m.species))) return false;
  if (!Object.values(data.photos).every((photo) => typeof photo === "string" && photo.startsWith("data:image/"))) return false;
  if (!Object.values(data.lights).every((lights) => Array.isArray(lights) && lights.every((light) => light && typeof light.id === "string" && typeof light.at === "number" && typeof light.whisper === "string"))) return false;
  return true;
}

function AccountInfo() {
  const { data, ready, error, commit } = useLedger();
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  function downloadBackup() {
    if (!data) return;
    const backup = { version: 1, exportedAt: new Date().toISOString(), data };
    const blob = new Blob([JSON.stringify(backup)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gentlewick-memories-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Your backup has been prepared. Keep the file somewhere safe.");
  }

  async function restoreBackup(file?: File) {
    if (!file) return;
    setStatus("");
    if (file.size > 8_000_000) {
      setStatus("That backup is too large to restore here.");
      return;
    }
    setBusy(true);
    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!isBackup(parsed)) {
        setStatus("This file is not a valid Gentlewick backup.");
        return;
      }
      if (!window.confirm("Restore this backup? It will replace the memories currently saved in this browser. Download a backup of your current memories first if you want to keep them.")) return;
      const ok = commit(() => parsed.data);
      setStatus(ok ? "Your memories have been restored on this device." : "We couldn't save the restored memories. Please make more space on this device and try again.");
    } catch {
      setStatus("We couldn't read that backup file. Please choose a Gentlewick backup.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <Shell>
      <main className="mx-auto max-w-2xl px-5 py-14">
        <p className="kicker">My memories</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Kept close.</h1>
        <p className="lede mt-5">Your local memorial pages, photographs, and candle memories stay in this browser on this device.</p>
        <section className="panel mt-8 grid gap-4 p-5 sm:p-7">
          <h2 className="font-serif text-2xl">Keep a copy of your memories</h2>
          <p className="text-muted">Download a backup file to keep your memorials, photographs, candle notes, and saved candle holds safe. You can use it to restore them on this or another device.</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn btn-primary" onClick={downloadBackup} disabled={!ready}>Download a backup</button>
            <button type="button" className="btn btn-ghost" onClick={() => fileRef.current?.click()} disabled={!ready || busy}>{busy ? "Restoring…" : "Restore a backup"}</button>
            <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" aria-label="Choose a Gentlewick backup file" onChange={(event) => void restoreBackup(event.currentTarget.files?.[0])} />
          </div>
          <p className="text-xs text-muted">Your backup stays on your device unless you choose to save or share the file. Restore replaces the local memories in this browser.</p>
          {status || error ? <p role="status" aria-live="polite" className="text-sm text-sea-deep">{status || error}</p> : null}
        </section>
        <section className="panel mt-5 grid gap-4 p-5 sm:p-7">
          <h2 className="font-serif text-2xl">A note about storage</h2>
          <p className="text-muted">Gentlewick does not automatically upload or back up local pages. Download a backup regularly and keep it somewhere safe.</p>
          <p className="text-muted">Local memorials are private to this browser. Shared sanctuary lanterns are separate and can be viewed by other visitors.</p>
          <p className="text-muted">The candle hold list is only a collection of notes saved on this device. It is not an order history.</p>
        </section>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/memorials" search={{ environment: undefined }} className="btn btn-primary">See the sanctuary</Link>
          <Link to="/create" search={{ environment: undefined }} className="btn btn-ghost">Begin a page</Link>
        </div>
      </main>
    </Shell>
  );
}
