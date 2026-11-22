import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Gentlewick" }] }),
  component: About,
});

function About() {
  return (
    <Shell>
      <main>
        <article className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <p className="kicker">About</p>
          <h1 className="mt-4 font-serif text-5xl text-balance md:text-6xl">A place to remember them.</h1>
          <p className="pull mt-8">A small sanctuary, made from the love that stays.</p>
          <div className="mt-8 grid gap-5 text-lg text-ink-soft">
            <p>
              Gentlewick began with the need for somewhere quiet to remember. We are building it as a little world of natural beauty — meadows, gardens, woods, and soft light — where every beloved animal has a place.
            </p>
            <p>
              A memorial can hold a name, photographs, a story, a candle, and words from people who loved them. No one needs to write a long story or visit every day. A name is enough.
            </p>
            <p>
              Remembering will never be paywalled. Creating and sharing a memorial, photographs, candles, and messages are intended to remain free. Any optional keepsakes would be separate — never a requirement to remember.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/memorial/$slug" params={{ slug: "sandy" }} className="btn btn-primary">
              Sandy’s page
            </Link>
            <Link to="/create" className="btn btn-ghost">
              Begin a page
            </Link>
          </div>
        </article>

        <figure className="mx-auto max-w-6xl px-5">
          <img
            src="/images/room.jpg"
            alt="A single candle burning on a low wooden table in a quiet sitting room."
            className="aspect-video w-full rounded-3xl object-cover"
          />
          <figcaption className="mt-3 text-sm text-muted">The candle in the sitting room. Come back on a hard night, or an ordinary one.</figcaption>
        </figure>

        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <p className="kicker">Our promise</p>
          <ul className="rule-list mt-6">
            <li>
              <h2 className="font-serif text-2xl">Keep it genuine</h2>
              <p className="mt-2 text-muted">
                We will not replace a real animal with invented imagery. If you do not have a photo, a simple placeholder is okay.
              </p>
            </li>
            <li>
              <h2 className="font-serif text-2xl">Never charge for love</h2>
              <p className="mt-2 text-muted">
                The core memorial, photo upload, candles, messages, and sharing stay free.
              </p>
            </li>
            <li>
              <h2 className="font-serif text-2xl">Rush the writing</h2>
              <p className="mt-2 text-muted">
                You can light the candle and leave. A sentence is welcome. It is never required.
              </p>
            </li>
          </ul>
        </section>
      </main>
    </Shell>
  );
}
