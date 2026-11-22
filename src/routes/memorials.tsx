import { createFileRoute, Link } from "@tanstack/react-router";

import { Flame } from "@/components/flame";
import { Shell } from "@/components/shell";
import { allMemorials, isLitToday, lightsOf, nightsKept, photoOf, speciesLabel } from "@/lib/store";
import { useLedger } from "@/lib/use-ledger";
import { fetchPublicLanterns } from "@/lib/gentlewickServer";
import type { Lantern } from "@/lib/gentlewickApi";

export const Route = createFileRoute("/memorials")({
  validateSearch: (search: Record<string, unknown>) => ({ environment: typeof search.environment === "string" ? search.environment : undefined }),
  loader: async () => { try { return { cloudLanterns: await fetchPublicLanterns() as Lantern[] }; } catch { return { cloudLanterns: [] as Lantern[] }; } },
  head: () => ({ meta: [{ title: "The lights — Gentlewick" }] }),
  component: Memorials,
});

function Memorials() {
  const { cloudLanterns } = Route.useLoaderData();
  const { environment } = Route.useSearch();
  const filteredLanterns = environment ? cloudLanterns.filter(l => l.environment === environment) : cloudLanterns;
  const environmentNames: Record<string,string> = { "golden-meadows":"The Golden Meadows", "moonlit-garden":"The Moonlit Garden", "crystal-falls":"Crystal Falls", "eternal-woods":"The Eternal Woods", "rainbow-bridge":"Rainbow Bridge" };
  const { data, ready } = useLedger();
  const memorials = data ? allMemorials(data) : [];
  return (
    <Shell>
      <main className="gw-memorials mx-auto max-w-6xl px-5 py-14">
        <div className="gw-memorials-intro flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">A sanctuary of remembrance</p>
            <h1 className="mt-2 font-serif text-5xl">{environment ? environmentNames[environment] || "Every love leaves a light." : "Every love leaves a light."}</h1>
            <p className="mt-3 max-w-lg text-muted">
              {environment ? `A quiet place within ${environmentNames[environment] || "the sanctuary"} to visit, remember, and leave a little love.` : "A quiet place to visit, remember, and leave a little love. These pages are kept here together."}
            </p>
          </div>
          <Link to="/create" className="btn btn-primary">
            Begin a page
          </Link>
        </div>
        <nav className="gw-environment-filter mt-8 flex flex-wrap gap-2" aria-label="Sanctuary places">
          <Link to="/memorials" className={environment ? "btn btn-ghost" : "btn btn-primary"}>All places</Link>
          <Link to="/memorials" search={{ environment: "golden-meadows" }} className={environment === "golden-meadows" ? "btn btn-primary" : "btn btn-ghost"}>Golden Meadows</Link>
          <Link to="/memorials" search={{ environment: "moonlit-garden" }} className={environment === "moonlit-garden" ? "btn btn-primary" : "btn btn-ghost"}>Moonlit Garden</Link>
          <Link to="/memorials" search={{ environment: "crystal-falls" }} className={environment === "crystal-falls" ? "btn btn-primary" : "btn btn-ghost"}>Crystal Falls</Link>
          <Link to="/memorials" search={{ environment: "eternal-woods" }} className={environment === "eternal-woods" ? "btn btn-primary" : "btn btn-ghost"}>Eternal Woods</Link>
          <Link to="/memorials" search={{ environment: "rainbow-bridge" }} className={environment === "rainbow-bridge" ? "btn btn-primary" : "btn btn-ghost"}>Rainbow Bridge</Link>
        </nav>
        {filteredLanterns.length ? <section className="mt-10"><p className="kicker">{environment ? environmentNames[environment] || "The shared sanctuary" : "The shared sanctuary"}</p><h2 className="mt-2 font-serif text-3xl">Lanterns kept together</h2>{environment ? <Link to="/memorials" className="mt-3 inline-block text-sm underline">See all lanterns</Link> : null}<div className="mt-5 grid gap-4 md:grid-cols-2">{filteredLanterns.map(lantern=><article key={lantern.id} className="flex items-center gap-4 rounded-3xl border border-line bg-paper p-5"><div className="size-16 shrink-0 overflow-hidden rounded-full bg-cream">{lantern.photo_url?<img src={lantern.photo_url} alt="" className="size-full object-cover"/>:<div className="grid size-full place-items-center font-serif text-2xl text-sea-deep">{lantern.name.slice(0,1)}</div>}</div><div className="min-w-0 flex-1"><h3 className="font-serif text-2xl">{lantern.name}</h3><p className="text-sm text-muted">{lantern.dates}</p><p className="gw-cloud-environment">{({ "golden-meadows":"The Golden Meadows", "moonlit-garden":"The Moonlit Garden", "crystal-falls":"Crystal Falls", "eternal-woods":"The Eternal Woods", "rainbow-bridge":"Rainbow Bridge" } as Record<string,string>)[lantern.environment] || "Sanctuary"}</p><p className="mt-1 line-clamp-2 text-sm text-muted">{lantern.story}</p></div><a className="font-medium" href={`/?pet=${encodeURIComponent(lantern.slug)}`}>Visit</a></article>)}</div></section>:null}
        {environment && !filteredLanterns.length ? <section className="mt-10 rounded-3xl border border-line bg-paper p-8 text-center"><h2 className="font-serif text-3xl">A quiet place, waiting for a light.</h2><p className="mt-3 text-muted">There are no shared memorials in this place yet. You could be the first to leave a light here.</p><Link to="/create" className="btn btn-primary mt-6">Create a memorial here</Link></section> : null}\n        {!ready || !data ? (
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
