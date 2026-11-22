import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — Gentlewick" }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <p className="kicker">Privacy</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Your memories deserve care.</h1>
        <p className="lede mt-6">Gentlewick has two kinds of remembrance: private pages kept in your browser, and shared sanctuary lanterns that can be visited by others.</p>
        <div className="mt-10 grid gap-8 text-muted">
          <section>
            <h2 className="font-serif text-2xl text-ink">Memories kept on this device</h2>
            <p className="mt-3">Memorials you create in local mode, photographs, candle-light history and candle-hold notes are stored in this browser on this device. They are not uploaded. Clearing browser or site data, changing browsers, or losing access to this device may permanently remove them. Gentlewick currently does not provide an automatic backup or cloud recovery for these local pages.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Shared sanctuary lanterns</h2>
            <p className="mt-3">When cloud memorial creation is enabled and you create a shared lantern, the information you submit—including the name, dates, story, quote, chosen sanctuary, and photograph—may be stored in the Gentlewick Supabase database and photo storage. Shared lanterns are public: anyone who visits the sanctuary or has the link may view their details and photograph. Visitors may also leave public blessings and light a shared candle.</p>
            <p className="mt-3">Cloud memorial creation is disabled by default. Local memorial creation remains available.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Sharing local memorials</h2>
            <p className="mt-3">A local memorial share link contains the memorial's written details. It does not upload or include the photograph or candle history. Anyone with the link can read the details encoded in it.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Website providers</h2>
            <p className="mt-3">Gentlewick is hosted by Vercel. Shared sanctuary data, when used, is handled by Supabase. The site also loads typography from Google Fonts. These providers may process technical information required to deliver their services, such as network requests and IP addresses.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Candle holds and payments</h2>
            <p className="mt-3">The candle hold is a local note only. It does not reserve stock, create an order, send an email, or take payment. Real online payments are not enabled.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Removing memories</h2>
            <p className="mt-3">You can remove local memorials from their pages and clear this site's browser data to remove local Gentlewick data. For a shared cloud lantern, use its available owner controls or contact <a className="footer-link" href="mailto:hello@gentlewick.com">hello@gentlewick.com</a> for help.</p>
          </section>
        </div>
        <p className="mt-10 text-sm">Questions? <a className="footer-link" href="mailto:hello@gentlewick.com">hello@gentlewick.com</a></p>
        <Link to="/account" className="btn btn-primary mt-8">My memories</Link>
      </main>
    </Shell>
  );
}
