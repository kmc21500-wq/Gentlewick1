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
          <p className="pull mt-8">Seventeen years of loyalty, and a room that went quiet in March 2024.</p>
          <div className="mt-8 grid gap-5 text-lg text-ink-soft">
            <p>
              Gentlewick began as a page for Sandy McCann. The evenings were already happening, and there was
              nowhere quiet to put her name.
            </p>
            <p>
              A page holds a name, the years, a photograph if you have one, and the evenings you come back.
              You can light a candle and leave. You can write a sentence. You can keep more than one — a dog,
              a cat, a bird, or someone else who chose you.
            </p>
            <p>
              The pages stay free. The photograph stays on your device. A shared link carries the words, not
              the picture. Nothing here asks you to be ready.
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
          <p className="kicker">What we will not do</p>
          <ul className="rule-list mt-6">
            <li>
              <h2 className="font-serif text-2xl">Invent a face</h2>
              <p className="mt-2 text-muted">
                If you have no photograph yet, the page shows an initial. Sandy’s face is not made up here.
                Add the real one when you are ready.
              </p>
            </li>
            <li>
              <h2 className="font-serif text-2xl">Charge for remembering</h2>
              <p className="mt-2 text-muted">
                The name, the evenings, the words, and the candle you light on the page stay free.
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
