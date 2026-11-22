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
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Kept close.</h1>
        <p className="lede mt-5">Your local memorial pages, photographs, and candle memories stay in this browser on this device.</p>
        <section className="panel mt-8 grid gap-4 p-5 sm:p-7">
          <h2 className="font-serif text-2xl">Keeping your memories safe</h2>
          <p className="text-muted">Gentlewick currently does not have automatic backup or cloud recovery for local pages. If you clear browser data, change browsers, or lose access to this device, your local memories may be lost.</p>
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
