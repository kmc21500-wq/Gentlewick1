import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Flame } from "@/components/flame";
import { Paw } from "@/components/paw";
import { Shell } from "@/components/shell";
import { copyText, decodeShare, speciesLabel } from "@/lib/store";
import { isSupabaseConfigured } from "@/lib/gentlewickApi";

export const Route = createFileRoute("/keep")({
  validateSearch: (search: Record<string, unknown>) => ({ c: typeof search.c === "string" ? search.c : "" }),
  head: () => ({ meta: [{ title: "A shared remembrance — Gentlewick" }] }),
  component: KeepInfo,
});

function KeepInfo() {
  const { c } = Route.useSearch();
  const shared = c ? decodeShare(c) : null;
  const [copied, setCopied] = useState(false);

  async function shareAgain() {
    try {
      await copyText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Shell>
      <main className="mx-auto max-w-2xl px-5 py-14">
        {shared ? (
          <article className="rounded-3xl border border-line bg-paper p-6 sm:p-10">
            <p className="kicker">A shared remembrance</p>
            <div className="mt-8 grid justify-items-center rounded-3xl bg-cream px-6 py-10 text-center">
              <Flame lit size="lg" />
              <Paw className="mt-6 size-6 text-[#c6ae8a]" />
              <h1 className="mt-3 font-serif text-4xl text-balance sm:text-5xl">{shared.n}</h1>
              <p className="mt-3 text-muted">{[shared.y, shared.d].filter(Boolean).join(" · ")}</p>
              <p className="mt-5 text-sm text-sea-deep">{speciesLabel(shared.s)}</p>
              {shared.t ? <blockquote className="pull mt-8 max-w-lg">{shared.t}</blockquote> : <p className="mt-8 text-muted">The name is enough.</p>}
            </div>
            <p className="mt-6 text-sm text-muted">This shared page contains the words and details only. The original photograph and candle history remain with the person who created the memorial.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="btn btn-ghost" onClick={() => void shareAgain()}>{copied ? "Link copied" : "Share this remembrance"}</button>
              <Link to="/create" search={{ environment: undefined }} className="btn btn-primary">Create a memorial</Link>
            </div>
          </article>
        ) : (
          <>
            <p className="kicker">Your memories</p>
            <h1 className="mt-3 font-serif text-4xl">No account needed.</h1>
            <p className="lede mt-5">Gentlewick does not require sign-up. Your local memorial pages, photographs, and candle memories stay in this browser. Shared cloud memorials, when enabled, are stored online and are publicly viewable.</p>
            <p className="mt-4 text-muted">{isSupabaseConfigured() ? "Cloud memorials are separate from your local pages. Local memories can still be lost if you change devices or clear browser data; there is no automatic backup or sync for local pages." : "If you change devices or clear browser data, your saved local memories may not be available. Cloud sharing is currently off, and there is no automatic backup or sync."}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/account" className="btn btn-primary">My memories</Link>
              <Link to="/memorials" search={{ environment: undefined }} className="btn btn-ghost">Return to memorials</Link>
            </div>
          </>
        )}
      </main>
    </Shell>
  );
}
