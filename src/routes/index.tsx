import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame } from "@/components/flame";
import { Paw } from "@/components/paw";
import { Shell } from "@/components/shell";
import { SANDY, SAMPLE_MEMORIALS, speciesLabel } from "@/lib/store";

const WELCOME = "gentlewick.welcome";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function welcomeIsLit() {
  try {
    return localStorage.getItem(WELCOME) === todayKey();
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Gentlewick — For the ones who left paw prints" }],
  }),
  component: Home,
});

function Home() {
  const [nightLit, setNightLit] = useState(false);

  useEffect(() => {
    setNightLit(welcomeIsLit());
  }, []);

  function light() {
    setNightLit(true);
    try {
      localStorage.setItem(WELCOME, todayKey());
    } catch {
      /* the light can still show for this visit */
    }
  }

  return (
    <Shell>
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-8 md:grid-cols-2 md:gap-10 md:py-16">
          <figure className="order-1 md:order-2">
            <img
              src="/images/hero.jpg"
              alt="A lit candle in a frosted glass jar, sitting on a pale windowsill."
              className="aspect-4/5 w-full rounded-3xl object-cover"
            />
            <figcaption className="mt-3 text-sm text-muted">A lit candle in frosted glass, on the windowsill.</figcaption>
          </figure>
          <div className="order-2 md:order-1">
            <p className="kicker">For dogs, cats, and the others who chose you</p>
            <div className="mt-4 flex items-center gap-3 text-[#d4b16a]" aria-hidden="true">
              <span className="h-px w-10 bg-current" />
              <Heart />
              <span className="h-px w-10 bg-current" />
            </div>
            <h1 className="mt-4 font-serif text-5xl text-balance md:text-6xl">For the ones who left paw prints</h1>
            <span className="mt-4 flex items-end gap-2 text-[#c6ae8a]" aria-hidden="true">
              <Paw className="size-7 -rotate-12" />
              <Paw className="size-6 translate-y-1 rotate-6" />
            </span>
            <p className="mt-4 text-muted">For the evenings you feel lost.</p>
            <p className="lede mt-5">
              A soft place to keep their light close. When you are ready, light a candle. Their glow will wait
              for you — soft, familiar, and close.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" className="btn btn-primary" onClick={light} disabled={nightLit}>
                {nightLit ? "Candle is lit" : "Light a candle for them"}
              </button>
              <Link to="/create" className="btn btn-ghost">
                Begin their page
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted">
              {nightLit
                ? "It will wait here today. Begin their page when you want the name kept."
                : "Nothing to join. The page is free."}
            </p>
          </div>
        </section>

        <section className="border-y border-line">
          <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
            <ul className="grid gap-6 md:grid-cols-3">
              {["The lead, still by the door.", "The bowl you have not moved.", "The hour the house goes quiet."].map(
                (line) => (
                  <li key={line} className="font-serif text-2xl text-balance md:text-3xl">
                    {line}
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_1fr]">
            <video
              className="aspect-[9/16] w-full rounded-3xl bg-cream object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/images/film-poster.jpg"
            >
              <source src="/film.mp4" type="video/mp4" />
            </video>
            <div>
              <p className="kicker">A short film</p>
              <h2 className="mt-4 font-serif text-4xl text-balance md:text-5xl">Love finds another way to shine.</h2>
              <p className="lede mt-5">
                Forty-five quiet seconds. A photograph, a candle, and a page you can come back to. Press play when
                you want it.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="kicker">What they have meant</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl text-balance md:text-5xl">Old feelings. Not rules.</h2>
          <p className="lede mt-5 max-w-xl">
            A paw print is a step that stayed. People have read their animals this way for a long time. A page here
            does not ask yours to match a story.
          </p>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            <li className="border-t border-line pt-6">
              <h3 className="font-serif text-3xl">The dog</h3>
              <p className="mt-3 text-muted">
                Loyalty that waits by the door. In Ireland the hound belonged to the house. Elsewhere the same
                feeling was left at a gate, or a station, long after the person was gone.
              </p>
            </li>
            <li className="border-t border-line pt-6">
              <h3 className="font-serif text-3xl">The cat</h3>
              <p className="mt-3 text-muted">
                The quiet keeper of a room. Old household stories put the cat by the hearth, not as a riddle, but
                as the one who made a place feel kept.
              </p>
            </li>
            <li className="border-t border-line pt-6">
              <h3 className="font-serif text-3xl">The bird</h3>
              <p className="mt-3 text-muted">
                A passing at the window. On these islands a bird at the glass was read as news. Not a verdict.
                Just a message that something had moved.
              </p>
            </li>
          </ul>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="kicker">A few examples</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl text-balance md:text-5xl">Every life has its own shape.</h2>
          <p className="lede mt-5 max-w-2xl">These sample pages show how a remembrance might look — from a quiet cat, to a little bird, to a life that was too short or beautifully long.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SAMPLE_MEMORIALS.map((sample) => (
              <article key={sample.id} className="flex flex-col rounded-3xl border border-line bg-paper p-5">
                <p className="text-sm text-sea-deep">{sample.exampleLabel}</p>
                <h3 className="mt-2 font-serif text-3xl">{sample.name}</h3>
                <p className="mt-2 text-sm text-muted">{speciesLabel(sample.species)} · {sample.years}</p>
                <p className="mt-4 flex-1 text-muted">{sample.dedication}</p>
                <Link to="/memorial/$slug" params={{ slug: sample.slug }} className="btn btn-ghost mt-5">View example</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="band">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
            <img
              src="/images/paw.jpg"
              alt="A close view of a dog’s paw resting on cream linen."
              className="aspect-4/5 w-full rounded-3xl object-cover"
            />
            <div>
              <p className="kicker">The first light</p>
              <Paw className="mt-4 size-5 text-[#c6ae8a]" />
              <h2 className="mt-4 font-serif text-5xl">{SANDY.name}</h2>
              <p className="mt-3 text-muted">
                {SANDY.years} · {SANDY.departed}
              </p>
              <blockquote className="pull mt-8">{SANDY.dedication}</blockquote>
              <p className="mt-8 text-muted">
                Gentlewick began as a place for her light to wait. Seventeen years in the house, and then a room
                that went quiet. Her face is not invented here. A page like hers starts with a name.
              </p>
              <Link to="/memorial/$slug" params={{ slug: "sandy" }} className="btn btn-primary mt-8">
                Open her page
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="max-w-xl">
            <p className="kicker">What a page keeps</p>
            <h2 className="mt-4 font-serif text-4xl text-balance md:text-5xl">A name. The years. The evenings you come back.</h2>
          </div>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            <li className="border-t border-line pt-6">
              <h3 className="font-serif text-3xl">Their name</h3>
              <p className="mt-3 text-muted">
                A photograph if you have one today. A line under the name, or none. You can begin with only the
                name.
              </p>
            </li>
            <li className="border-t border-line pt-6">
              <h3 className="font-serif text-3xl">The evening</h3>
              <p className="mt-3 text-muted">
                Light the candle on a hard night or an ordinary one. The day is kept. You do not have to write.
              </p>
            </li>
            <li className="border-t border-line pt-6">
              <h3 className="font-serif text-3xl">The words</h3>
              <p className="mt-3 text-muted">
                Leave a sentence if you want. A shared link carries the words. The photograph stays with you.
              </p>
            </li>
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/create" className="btn btn-primary">
              Begin a page
            </Link>
            <Link to="/memorials" className="btn btn-ghost">
              See the lights
            </Link>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <img src="/images/night-flame.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="night-veil relative px-5 py-24 text-center text-night-fg">
            <div className="mx-auto grid max-w-xl justify-items-center">
              <Flame lit={nightLit} size="lg" />
              <h2 className="mt-6 font-serif text-4xl md:text-5xl">
                {nightLit ? "The candle is lit" : "If a name is too much tonight"}
              </h2>
              <p className="mt-4 max-w-md text-lg text-cream">
                {nightLit ? "It will wait. Begin their page when you want the name kept." : "Light this one. It does not ask who it is for."}
              </p>
              <button type="button" className="btn btn-light mt-8" onClick={light} disabled={nightLit}>
                {nightLit ? "Candle is lit" : "Light a candle"}
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 pt-16 pb-6 md:pt-24 md:pb-8">
          <h2 className="font-serif text-4xl">Before you begin</h2>
          <dl className="mt-8">
            {[
              ["Does a page cost anything?", "No. The name, the evenings, and the candle you light here stay free."],
              ["Where does the photograph go?", "It stays in this browser. Sharing copies the words, not the picture."],
              ["Can there be more than one?", "Yes. Dog, cat, bird, or someone else. A house can keep several lights."],
              ["Will you invent their face?", "No. Without a photograph, the page shows their initial."],
              ["What if I am not ready to write?", "Light the candle and leave. The name is enough. The words can wait."],
            ].map(([q, a]) => (
              <div key={q} className="border-t border-line py-5">
                <dt className="font-serif text-2xl">{q}</dt>
                <dd className="mt-2 text-muted">{a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-muted">
            There is no right way to remember. No words required. You can always come back.
          </p>
          <div className="mt-6 flex items-end gap-2" aria-hidden="true">
            <QuietCandle />
            <Paw className="mb-1 size-4 text-[#c9a15b]" />
          </div>
        </section>
      </main>
    </Shell>
  );
}

function QuietCandle() {
  return (
    <svg viewBox="0 0 48 72" className="h-16 w-10" fill="none" aria-hidden="true">
      <path d="M24 16c2.4 3.4 6.4 4.6 6.4 8.6 0 3.6-2.9 6-6.4 6s-6.4-2.4-6.4-6c0-4 4-5.2 6.4-8.6z" fill="#f3c56b" />
      <path d="M24 21c1.1 1.6 2.6 2.2 2.6 4 0 1.5-1.2 2.5-2.6 2.5s-2.6-1-2.6-2.5c0-1.8 1.5-2.4 2.6-4z" fill="#fff6e4" />
      <path d="M24 30.5v7" stroke="#c9a15b" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="14" y="38" width="20" height="26" rx="4" stroke="#c6ae8a" strokeWidth="1.25" />
      <path d="M14 47h20" stroke="#e4d5c0" strokeWidth="1" />
    </svg>
  );
}

function Heart() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 19.5s-6.2-3.8-6.2-8.1A3.4 3.4 0 0 1 12 8.6a3.4 3.4 0 0 1 6.2 2.8c0 4.3-6.2 8.1-6.2 8.1z" />
    </svg>
  );
}
