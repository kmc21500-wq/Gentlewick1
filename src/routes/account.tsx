import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My memories — Gentlewick" }] }),
  component: AccountInfo,
});

function AccountInfo() {
  return (
    <Shell>
      <main className="mx-auto max-w-2xl px-5 py-14">
        <p className="kicker">My memories</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Kept close, on this device.</h1>
        <p className="lede mt-5">Your memorial pages, photographs, and candle memories are stored in this browser on this device. Gentlewick does not use accounts, backups, or cloud sync.</p>
        <section className="panel mt-8 grid gap-4 p-5 sm:p-7">
          <h2 className="font-serif text-2xl">A little note about keeping them</h2>
          <p className="text-muted">If you change devices, use a different browser, or clear this browser’s site data, your saved memories may not be available anymore. Gentlewick has no backup or cloud recovery feature.</p>
          <p className="text-muted">You can keep visiting this browser to return to the pages and candles you have saved here.</p>
        </section>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/memorials" className="btn btn-primary">See your memorials</Link>
          <Link to="/create" className="btn btn-ghost">Begin a page</Link>
        </div>
      </main>
    </Shell>
  );
}
