import { createFileRoute, Link } from "@tanstack/react-router";

import { Flame } from "@/components/flame";
import { Shell } from "@/components/shell";
import { allMemorials, isLitToday, lightsOf, nightsKept, photoOf, speciesLabel } from "@/lib/store";
import { useLedger } from "@/lib/use-ledger";
import { fetchPublicLanterns } from "@/lib/gentlewickServer";
import type { Lantern } from "@/lib/gentlewickApi";

export const Route = createFileRoute("/memorials")({
  loader: async () => { try { return { cloudLanterns: await fetchPublicLanterns() as Lantern[] }; } catch { return { cloudLanterns: [] as Lantern[] }; } },
  head: () => ({ meta: [{ title: "The lights — Gentlewick" }] }),
  component: Memorials,
});

function Memorials() {
  const { cloudLanterns } = Route.useLoaderData();
  const { data, ready } = useLedger();
  const memorials = data ? allMemorials(data) : [];
  return (
    <Shell>
      <main className="gw-memorials mx-auto max-w-6xl px-5 py-14">
        <div className="gw-memorials-intro flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">A sanctuary of remembrance</p>
            <h1 className="mt-2 font-serif text-5xl">Every love leaves a light.</h1>
            <p className="mt-3 max-w-lg text-muted">
              A quiet place to visit, remember, and leave a little love. These pages are kept here together.
            </p>
          </div>
          <Link to="/create" className="btn btn-primary">
            Begin a page
          </Link>
        </div>
        {cloudLanterns.length ? <section className="mt-10"><p className="kicker">The shared sanctuary</p><h2 className="mt-2 font-serif text-3xl">Lanterns kept together</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{cloudLanterns.map(lantern=><article key={lantern.id} className="flex items-center gap-4 rounded-3xl border border-line bg-paper p-5"><div className="size-16 shrink-0 overflow-hidden rounded-full bg-cream">{lantern.photo_url?<img src={lantern.photo_url} alt="" className="size-full object-cover"/>:<div className="grid size-full place-items-center font-serif text-2xl text-sea-deep">{lantern.name.slice(0,1)}</div>}</div><div className="min-w-0 flex-1"><h3 className="font-serif text-2xl">{lantern.name}</h3><p className="text-sm text-muted">{lantern.dates}</p><p className="mt-1 line-clamp-2 text-sm text-muted">{lantern.story}</p></div><a className="font-medium" href={`/?pet=${encodeURIComponent(lantern.slug)}`}>Visit</a></article>)}</div></section>:null}
        {!ready || !data ? (
          <p className="mt-10 text-muted">A moment.</p>
        ) : (
          <>
            <div className="gw-memory-grid mt-10 grid gap-4 md:grid-cols-2">
            {memorials.map((memorial) => {
              const lights = lightsOf(data, memorial.id);
              const photo = photoOf(data, memorial);
              const lit = isLitToday(lights);
              return (
                <article key={memorial.id} className="gw-memory-card flex flex-col rounded-3xl border border-line bg-paper p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm text-sea-deep">{memorial.house ? "The first light" : speciesLabel(memorial.species)}</p>
                      <h2 className="mt-1 font-serif text-3xl text-balance">{memorial.name}</h2>
                      <p className="mt-1 text-muted">
                        {memorial.years || "A light kept here"}
                        {memorial.departed ? ` · ${memorial.departed}` : ""}
                      </p>
                    </div>
                    {photo ? (
                      <img src={photo} alt="" className="size-14 shrink-0 rounded-full object-cover sm:size-16" />
                    ) : (
                      <div className="grid size-14 shrink-0 place-items-center rounded-full bg-cream font-serif text-2xl text-sea-deep sm:size-16">
                        {memorial.name.trim().charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <p className="mt-4 flex-1 line-clamp-3 text-muted">{memorial.dedication}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                    <div className="flex items-center gap-2 text-sm text-sea-deep">
                      <Flame lit={lit} size="sm" />
                      {lit ? "Lit today" : nightsKept(lights) ? `${nightsKept(lights)} evenings` : "Wick waiting"}
                    </div>
                    <Link to="/memorial/$slug" params={{ slug: memorial.slug }} className="font-medium">
                      Open
                    </Link>
                  </div>
                </article>
              );
            })}
            </div>
          </>
        )}
      </main>
    </Shell>
  );
}
