import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createMemorialCardBlob, downloadMemorialCard } from "@/lib/memorial-card";
import { Portrait } from "@/components/portrait";
import { Paw } from "@/components/paw";
import { Shell } from "@/components/shell";
import {
  copyText,
  departedThisMonth,
  encodeShare,
  findMemorial,
  formatWhen,
  isLitToday,
  lightsOf,
  nightsKept,
  photoOf,
  readPhotoFile,
  removeMemorial,
  setPhoto,
  speciesLabel,
  speciesLine,
  withLight,
} from "@/lib/store";
import { useLedger } from "@/lib/use-ledger";

export const Route = createFileRoute("/memorial/$slug")({
  head: () => ({ meta: [{ title: "A light — Gentlewick" }] }),
  component: MemorialPage,
});

function MemorialPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { data, ready, error, commit } = useLedger();
  const [whisper, setWhisper] = useState("");
  const [copied, setCopied] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [cardMessage, setCardMessage] = useState("");
  const [cardBusy, setCardBusy] = useState(false);

  if (!ready || !data) {
    return (
      <Shell>
        <main className="px-5 py-20 text-center text-muted">A moment.</main>
      </Shell>
    );
  }

  const memorial = findMemorial(data, slug);
  if (!memorial) {
    return (
      <Shell>
        <main className="mx-auto max-w-lg px-5 py-24 text-center">
          <h1 className="font-serif text-4xl">This light is not on this device.</h1>
          <p className="mt-3 text-muted">Pages you make stay in this browser, unless you shared the words.</p>
          <Link to="/memorials" search={{ environment: undefined }} className="btn btn-primary mt-8">
            The lights
          </Link>
        </main>
      </Shell>
    );
  }

  const lights = lightsOf(data, memorial.id);
  const photo = photoOf(data, memorial);
  const lit = isLitToday(lights);
  const nights = nightsKept(lights);
  const words = [...lights].reverse().filter((light) => light.whisper);
  const month = departedThisMonth(memorial.departed);

  function light(text: string) {
    commit((current) => withLight(current, memorial!.id, text));
    if (text.trim()) setWhisper("");
  }

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    try {
      const next = await readPhotoFile(file);
      setPhotoError(null);
      commit((current) => setPhoto(current, memorial!.id, next));
    } catch (err) {
      setPhotoError(
        err instanceof Error && err.message === "size"
          ? "That photograph is too heavy. Try a smaller one."
          : "That file could not be used as a photograph.",
      );
    }
  }

  async function share() {
    const path = memorial!.house
      ? `${window.location.origin}/memorial/${memorial!.slug}`
      : `${window.location.origin}/keep?c=${encodeURIComponent(encodeShare(memorial!))}`;
    try {
      await copyText(path);
      setCopied(memorial!.house ? "Link copied." : "Link copied. The name, dates, and dedication travel; the photograph stays here.");
    } catch {
      setCopied("The link could not be copied. Please try your browser’s share or copy option.");
    }
  }

  async function makeCard(action: "download" | "share") {
    if (cardBusy) return;
    setCardBusy(true);
    setCardMessage("");
    try {
      const blob = await createMemorialCardBlob(memorial!, photo);
      if (action === "share") {
        const file = new File([blob], `${memorial!.slug}-keepsake.png`, { type: "image/png" });
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: `${memorial!.name} — Gentlewick`, text: "A little light. A lifetime of love." });
            setCardMessage("Your keepsake was shared.");
            return;
          } catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
              setCardMessage("Sharing was cancelled.");
              return;
            }
          }
        }
        downloadMemorialCard(blob, memorial!.slug);
        setCardMessage("Image saved to your downloads. You can share it from there.");
      } else {
        downloadMemorialCard(blob, memorial!.slug);
        setCardMessage("Your keepsake image is ready to save or print.");
      }
    } catch {
      setCardMessage("We couldn't make the image just now. Please try again.");
    } finally {
      setCardBusy(false);
    }
  }

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link to="/memorials" search={{ environment: undefined }} className="text-sm text-muted">
          All lights
        </Link>
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
          <section>
            <p className="kicker">{memorial.house ? "The first light" : "A private light"}</p>
            <h1 className="mt-2 font-serif text-4xl text-balance sm:text-5xl md:text-6xl">{memorial.name}</h1>
            <Paw className="mt-4 size-5 text-[#c6ae8a]" />
            <p className="mt-3 text-lg text-muted">{[memorial.years, memorial.departed].filter(Boolean).join(" · ")}</p>
            {month ? <p className="mt-3 text-sea-deep">This month holds their date.</p> : null}
            <div className="mt-6 flex justify-center rounded-3xl bg-cream px-4 py-8 sm:mt-8 sm:py-10">
              <Portrait name={memorial.name} photo={photo} lit={lit} />
            </div>
            {memorial.dedication ? (
              <p className="mt-8 font-serif text-2xl text-balance md:text-3xl">{memorial.dedication}</p>
            ) : (
              <p className="mt-8 text-muted">No words yet. The name is enough.</p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {lit ? (
                <p className="font-medium text-sea-deep">Candle is lit.</p>
              ) : (
                <button type="button" className="btn btn-primary w-full sm:w-auto" onClick={() => light("")}>
                  Light a candle
                </button>
              )}
              <Link to="/night/$slug" params={{ slug: memorial.slug }} className="btn btn-ghost">
                The quiet night
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted">
              {nights === 0 ? "Their glow will wait." : nights === 1 ? "Lit once." : `Lit on ${nights} evenings.`}
            </p>
          </section>

          <aside className="grid content-start gap-4 lg:pt-16">
            <p className="text-sm text-muted">
              {speciesLabel(memorial.species)}
              {" · "}
              {speciesLine(memorial.species)}
              {" · "}
              {lit ? "Candle is lit today" : "Not lit today"}
              {" · "}
              {nights === 0 ? "No evenings kept yet" : nights === 1 ? "One evening kept" : `${nights} evenings kept`}
            </p>

            <form
              className="panel grid gap-3 p-4 sm:p-6"
              onSubmit={(event) => {
                event.preventDefault();
                if (!whisper.trim()) return;
                light(whisper);
              }}
            >
              <h2 className="font-serif text-2xl">This evening</h2>
              <p className="text-sm text-muted">A few words, if you want. They stay on this device.</p>
              <label className="field">
                <span className="sr-only">A few words</span>
                <textarea
                  value={whisper}
                  maxLength={180}
                  onChange={(event) => setWhisper(event.target.value)}
                  placeholder="They stay on this device."
                />
              </label>
              <button type="submit" className="btn btn-ghost" disabled={!whisper.trim()}>
                Leave this here
              </button>
            </form>

            <div className="panel">
              <h2 className="font-serif text-2xl">Words left here</h2>
              {words.length ? (
                <ul className="mt-4 grid gap-4">
                  {words.slice(0, 8).map((lightNote) => (
                    <li key={lightNote.id} className="border-t border-line pt-4">
                      <p>{lightNote.whisper}</p>
                      <p className="mt-1 text-sm text-muted">{formatWhen(lightNote.at)}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-muted">Nothing written yet. The light is enough. Come back when you want the page to remember the day.</p>
              )}
            </div>

            {memorial.house ? (
              <div className="panel-cream">
                <h2 className="font-serif text-2xl">Why this page exists</h2>
                <p className="mt-2 text-muted">
                  Sandy McCann was here for seventeen years. In March 2024 the room went quiet. This light was
                  the first one. Her photograph is not a stand-in. Add the real one when you are ready.
                </p>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary" disabled={cardBusy} onClick={() => void makeCard("download")}>
                {cardBusy ? "Making image…" : "Download keepsake"}
              </button>
              <button type="button" className="btn btn-ghost" disabled={cardBusy} onClick={() => void makeCard("share")}>
                Share memorial card
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => void share()}>
                Share page link
              </button>
              <label className="btn btn-ghost">
                {photo ? "Change photograph" : "Add their photograph"}
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => { void onPhoto(e.target.files?.[0]); e.currentTarget.value = ""; }} />
              </label>
              {photo ? (
                <button type="button" className="btn btn-ghost" onClick={() => commit((current) => setPhoto(current, memorial.id, null))}>
                  Remove photograph
                </button>
              ) : null}
            </div>
            {copied ? <p className="text-sm text-sea-deep" aria-live="polite">{copied}</p> : null}
            {cardMessage ? <p className="text-sm text-sea-deep" aria-live="polite">{cardMessage}</p> : null}
            {photoError || error ? <p className="text-sm text-sea-deep">{photoError || error}</p> : null}
            {!memorial.house ? <p className="text-sm text-muted">Anyone with the link can see their name, species, dates, and dedication. Their photograph and candle history stay here.</p> : null}

            {!memorial.house ? (
              <div>
                {confirmDelete ? (
                  <div className="grid gap-3">
                    <p>Remove this page from this device? The words here will go with it.</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          commit((current) => removeMemorial(current, memorial.id));
                          void navigate({ to: "/memorials", search: { environment: undefined } });
                        }}
                      >
                        Remove the page
                      </button>
                      <button type="button" className="btn btn-ghost" onClick={() => setConfirmDelete(false)}>
                        Keep it
                      </button>
                    </div>
                  </div>
                ) : (
                  <button type="button" className="text-sm text-muted" onClick={() => setConfirmDelete(true)}>
                    Remove this page
                  </button>
                )}
              </div>
            ) : null}
          </aside>
        </div>
      </main>
    </Shell>
  );
}
