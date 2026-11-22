import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { isSupabaseConfigured } from "@/lib/gentlewickApi";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My memories — Gentlewick" }] }),
  component: AccountInfo,
});

function AccountInfo() {
  const cloudEnabled = isSupabaseConfigured();
  return (
    <Shell>
      <main className="mx-auto max-w-2xl px-5 py-14">
        <p className="kicker">My memories</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Kept close, without an account.</h1>
        <p className="lede mt-5">Gentlewick does not have sign-in or account recovery. Your local pages and shared online memorials work differently, so it is worth knowing where each one is kept.</p>
        <section className="panel mt-8 grid gap-4 p-5 sm:p-7">
          <h2 className="font-serif text-2xl">Memorials on this device</h2>
          <p className="text-muted">Local memorial pages, photos, candle history, and notes stay in this browser. Clearing site data, using a different browser, or changing devices can make them unavailable. There is currently no automatic backup or sync.</p>
        </section>
        {cloudEnabled ? (
          <section className="panel mt-4 grid gap-4 p-5 sm:p-7">
            <h2 className="font-serif text-2xl">Shared memorials online</h2>
            <p className="text-muted">Memorials created while cloud features are enabled are stored online and can be viewed by visitors. They are not tied to an account. The creator's removal token is saved in this browser, so keep access to this device and its site data if you want to manage or remove that memorial.</p>
          </section>
        ) : (
          <section className="panel mt-4 grid gap-4 p-5 sm:p-7">
            <h2 className="font-serif text-2xl">Shared memorials online</h2>
            <p className="text-muted">Cloud sharing is currently off. Memorials created in this version are kept locally on this device unless you share a remembrance link.</p>
          </section>
        )}
        <section className="panel mt-4 grid gap-4 p-5 sm:p-7">
          <h2 className="font-serif text-2xl">Candle notes</h2>
          <p className="text-muted">Candle holds and their contact details are saved locally only. They are not orders, payment is not taken, and your email is not sent.</p>
        </section>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/memorials" search={{ environment: undefined }} className="btn btn-primary">See memorials</Link>
          <Link to="/create" search={{ environment: undefined }} className="btn btn-ghost">Begin a page</Link>
          <Link to="/privacy" className="btn btn-ghost">Privacy details</Link>
        </div>
      </main>
    </Shell>
  );
}
