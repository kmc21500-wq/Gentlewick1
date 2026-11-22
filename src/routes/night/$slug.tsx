import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame } from "@/components/flame";
import { Wordmark } from "@/components/wordmark";
import { Shell } from "@/components/shell";
import { findMemorial, isLitToday, lightsOf, withLight } from "@/lib/store";
import { useLedger } from "@/lib/use-ledger";

export const Route = createFileRoute("/night/$slug")({
  head: () => ({ meta: [{ title: "A quiet night — Gentlewick" }] }),
  component: NightPage,
});

function NightPage() {
  const { slug } = Route.useParams();
  const { data, ready, commit } = useLedger();

  if (!ready || !data) {
    return (
      <Shell bare>
        <main className="grid min-h-screen place-items-center text-cream">A moment.</main>
      </Shell>
    );
  }

  const memorial = findMemorial(data, slug);
  if (!memorial) {
    return (
      <Shell bare>
        <main className="grid min-h-screen place-items-center px-6 text-center">
          <div>
            <p className="font-serif text-3xl">This night has no name.</p>
            <Link to="/memorials" search={{ environment: undefined }} className="btn btn-light mt-6">
              The lights
            </Link>
          </div>
        </main>
      </Shell>
    );
  }

  const lit = isLitToday(lightsOf(data, memorial.id));

  return (
    <Shell bare>
      <main className="relative min-h-screen overflow-hidden">
        <img src="/images/night-flame.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="night-veil absolute inset-0" />
        <div className="relative mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
          <Wordmark tone="light" />
          <h1 className="mt-6 font-serif text-5xl text-balance text-night-fg">{memorial.name}</h1>
          <div className="mt-8">
            <Flame lit={lit} size="lg" />
          </div>
          <p className="mt-6 font-serif text-2xl text-night-fg">
            {lit ? "The candle is lit." : "Someone is missing here."}
          </p>
          <button
            type="button"
            className="btn btn-light mt-8"
            disabled={lit}
            onClick={() => commit((current) => withLight(current, memorial.id, ""))}
          >
            {lit ? "Candle is lit" : "Light a candle for them"}
          </button>
          <Link to="/memorial/$slug" params={{ slug: memorial.slug }} className="mt-8 text-sm text-cream">
            Leave the night
          </Link>
        </div>
      </main>
    </Shell>
  );
}
