import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { isSupabaseConfigured } from "@/lib/gentlewickApi";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — Gentlewick" }] }),
  component: Privacy,
});

function Privacy() {
  const cloudEnabled = isSupabaseConfigured();
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <p className="kicker">Privacy</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Your memories deserve care.</h1>
        <p className="lede mt-6">Gentlewick does not require an account. Some memories are kept only in this browser; shared memorials may be stored online when cloud features are enabled.</p>
        <div className="mt-10 grid gap-8 text-muted">
          <section>
            <h2 className="font-serif text-2xl text-ink">Memorials kept on this device</h2>
            <p className="mt-3">Local memorial details, photographs, candle dates and notes, and candle-hold notes are stored in your browser. They are not synced to other devices. Clearing site data or losing this device may permanently remove them.</p>
          </section>
          {cloudEnabled ? (
            <>
              <section>
                <h2 className="font-serif text-2xl text-ink">Shared memorials and cloud storage</h2>
                <p className="mt-3">When cloud memorials are enabled, memorial names, dates, stories, quotes, sanctuary choice, photographs, candle counts, and whispered blessings are stored with our cloud database provider (Supabase). Shared memorials and their photographs and blessings are publicly viewable by anyone who visits or has the link. Do not include information you want to keep private.</p>
                <p className="mt-3">There is no user account. An owner token is kept in this browser to allow the memorial creator to remove their shared memorial. If you lose access to this browser or its site data, you may lose that ability.</p>
              </section>
              <section>
                <h2 className="font-serif text-2xl text-ink">Removing a shared memorial</h2>
                <p className="mt-3">If the creator's owner token is available in this browser, the memorial page offers “Remove my memorial”. This removes the memorial, blessings, and associated photo object from the cloud. If you cannot access that control, contact hello@gentlewick.com for help.</p>
              </section>
            </>
          ) : (
            <section>
              <h2 className="font-serif text-2xl text-ink">Cloud features are currently off</h2>
              <p className="mt-3">This version is operating in local-only mode. Shared memorials, online photo storage, and online blessings are not enabled.</p>
            </section>
          )}
          <section>
            <h2 className="font-serif text-2xl text-ink">Shared memorial links</h2>
            <p className="mt-3">A locally shared remembrance link contains the name, species, dates, and dedication encoded in the link. Anyone with the link can read those details. The photograph and candle history are not included in a local remembrance link.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Website providers and network requests</h2>
            <p className="mt-3">Gentlewick is hosted by Vercel. Hosting and security providers may process technical information such as IP addresses, request details, and security logs to deliver and protect the website. The site loads typography from Google Fonts, so your browser requests font files from Google.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Candle holds and payments</h2>
            <p className="mt-3">Candle holds are local notes only. They are not orders, no payment is taken, and the email address entered is not sent anywhere.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Deleting local memories</h2>
            <p className="mt-3">You can remove local memorials from their page. To remove all local Gentlewick data, clear this site's browser storage.</p>
          </section>
        </div>
        <p className="mt-10 text-sm">Questions? <a className="footer-link" href="mailto:hello@gentlewick.com">hello@gentlewick.com</a></p>
        <Link to="/account" className="btn btn-primary mt-8">My memories</Link>
      </main>
    </Shell>
  );
}
