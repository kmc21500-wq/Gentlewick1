import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Notice — Gentlewick" }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <p className="kicker">Privacy</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Your memories deserve care.</h1>
        <p className="lede mt-6">Gentlewick is a sanctuary where people can remember beloved pets, light virtual candles, and leave messages of remembrance.</p>
        <p className="mt-4 text-sm text-muted">Last updated: 22 November 2026</p>
        <div className="mt-10 grid gap-8 text-muted">
          <section>
            <h2 className="font-serif text-2xl text-ink">1. Who we are</h2>
            <p className="mt-3">Gentlewick operates gentlewick.com. Our privacy contact is <a className="footer-link" href="mailto:hello@gentlewick.com">hello@gentlewick.com</a>. The controller's legal name and business details will be added before public launch.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">2. Information we handle</h2>
            <p className="mt-3">Information about a pet alone may not identify a person. Personal data may be included when you add names, contact details, stories, photographs, or messages that identify you or another person.</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong className="text-ink">Local memorials:</strong> memorial details, photos, candle history, and notes are stored in your browser on your device.</li>
              <li><strong className="text-ink">Shared memorials:</strong> if cloud memorial creation is enabled, details you submit—such as a pet's name, dates, story, quote, sanctuary selection, and photo—may be stored in the database and photo storage and made publicly viewable.</li>
              <li><strong className="text-ink">Visitor messages:</strong> blessings or candle messages submitted to shared memorials may be publicly displayed.</li>
              <li><strong className="text-ink">Technical information:</strong> hosting and security providers may process technical data such as IP addresses, browser/device information, and request logs.</li>
            </ul>
            <p className="mt-3">Gentlewick does not currently provide email reminders, account email collection, or online payments.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">3. Photographs and location metadata</h2>
            <p className="mt-3">Photos selected for local memorials are converted in your browser before being stored locally. Shared memorial photos are also browser-converted before upload. Server-side removal of EXIF/GPS and other metadata has not yet been implemented or verified. Please avoid uploading photos that may reveal a private location until this safeguard is confirmed.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">4. Why information is used</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To provide memorial pages, candles, and messages you request.</li>
              <li>To store and display shared memorials when cloud features are enabled.</li>
              <li>To protect the service, prevent abuse, and respond to reports or legal obligations.</li>
            </ul>
            <p className="mt-3">Depending on the activity, processing may be necessary to provide a requested service, based on legitimate interests in operating and securing the site, or required by law. Optional reminders or marketing are not currently offered.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">5. Service providers</h2>
            <p className="mt-3">Gentlewick currently uses Vercel for website hosting, Supabase for shared memorial database and storage functionality, and Google Fonts for typography. These providers may process technical information needed to operate their services. Their applicable regions, contractual data-protection terms, and any additional subprocessors are being reviewed before cloud memorials are enabled for public use. We do not sell personal data.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">6. Retention and deletion</h2>
            <p className="mt-3">Local memorials remain in your browser until you remove them or clear the site's browser data. They are not automatically backed up and may be lost if the browser or device data is cleared.</p>
            <p className="mt-3">Shared memorials are intended to remain until deleted by their owner or a removal request is handled. Retention periods for technical/security logs depend on provider settings and are being confirmed.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">7. Your rights</h2>
            <p className="mt-3">Depending on applicable law, you may have rights to access, correct, obtain a copy of, delete, restrict, or object to processing of your personal data.</p>
            <p className="mt-3">To request help with a shared memorial or privacy request, email <a className="footer-link" href="mailto:hello@gentlewick.com">hello@gentlewick.com</a>. You may also complain to Ireland's Data Protection Commission: <a className="footer-link" href="https://www.dataprotection.ie" target="_blank" rel="noreferrer">dataprotection.ie</a>.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">8. Candle holds and payments</h2>
            <p className="mt-3">The candle hold is a local note only. It does not reserve stock, create an order, send an email, or take payment. Online payments are not currently enabled.</p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-ink">9. Sharing local memorials</h2>
            <p className="mt-3">A local memorial share link may contain memorial text and details. Anyone with that link can read the information encoded in it. It does not upload the photograph or candle history.</p>
          </section>
        </div>
        <p className="mt-10 text-sm">Privacy questions? <a className="footer-link" href="mailto:hello@gentlewick.com">hello@gentlewick.com</a></p>
        <Link to="/account" className="btn btn-primary mt-8">My memories</Link>
      </main>
    </Shell>
  );
}
