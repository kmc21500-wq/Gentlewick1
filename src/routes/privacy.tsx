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
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Your memories stay on this device.</h1>
        <p className="lede mt-6">Gentlewick stores the memorials you create, photographs, candle history, and saved candle notes in your browser on this device. They are not uploaded to Gentlewick servers.</p>
        <div className="mt-10 grid gap-8 text-muted">
          <section>
            <h2 className="font-serif text-2xl text-ink">What is stored on your device</h2>
            <p className="mt-3">Your memorial details, resized photographs, candle-light dates and notes, and saved candle-hold notes are kept in browser storage. They are used to display and operate your Gentlewick pages in that browser.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">No accounts or cloud sync</h2>
            <p className="mt-3">Gentlewick does not have user accounts, backup files, or cloud sync. Your saved memories are not transferred between devices or browsers. Clearing browser or site data, or losing access to this device, may permanently remove the locally stored memories.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Shared memorial links</h2>
            <p className="mt-3">When you choose to share a memorial, its name, species, dates, and dedication are encoded in the link. Anyone with that link can read those details. Photographs and candle history are not included.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Website providers and network requests</h2>
            <p className="mt-3">Gentlewick is hosted by Vercel. Hosting providers may process basic technical information such as IP addresses, request details, and security logs to deliver and protect the website. The site also loads typography from Google Fonts, which means your browser makes requests to Google for those font files.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Payments</h2>
            <p className="mt-3">Real online payment and email-order processing are not currently enabled. The candle hold is a local note only and is not an order.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">Deleting your memories</h2>
            <p className="mt-3">You can remove a memorial from its page. To remove all local Gentlewick data, clear this site's browser storage.</p>
          </section>
        </div>
        <p className="mt-10 text-sm">Questions? <a className="footer-link" href="mailto:hello@gentlewick.com">hello@gentlewick.com</a></p>
        <Link to="/account" className="btn btn-primary mt-8">My memories</Link>
      </main>
    </Shell>
  );
}
