import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Shell } from "@/components/shell";
import { Portrait } from "@/components/portrait";
import { addMemorial, readPhotoFile, SPECIES, speciesLine, type Species } from "@/lib/store";
import { useLedger } from "@/lib/use-ledger";
import { isSupabaseConfigured, uploadLanternPhoto, createPublicLantern, type Environment } from "@/lib/gentlewickApi";

export const Route = createFileRoute("/create")({
  validateSearch: (search: Record<string, unknown>) => ({ environment: typeof search.environment === "string" ? search.environment : undefined }),
  head: () => ({ meta: [{ title: "Begin a page — Gentlewick" }] }),
  component: Create,
});

function Create() {
  const navigate = useNavigate();
  const { environment: requestedEnvironment } = Route.useSearch();
  const { data, ready, error, commit } = useLedger();
  const [name, setName] = useState("");
  const [years, setYears] = useState("");
  const [departed, setDeparted] = useState("");
  const [dedication, setDedication] = useState("");
  const [species, setSpecies] = useState<Species>("dog");
  const [environment, setEnvironment] = useState<Environment>(requestedEnvironment && ["golden-meadows","moonlit-garden","crystal-falls","eternal-woods","rainbow-bridge"].includes(requestedEnvironment) ? requestedEnvironment as Environment : "golden-meadows");
  const [photo, setPhoto] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    setFormError(null);
    try {
      setPhoto(await readPhotoFile(file));
    } catch (err) {
      setPhoto(null);
      setFormError(err instanceof Error && err.message === "size" ? "That photograph is too heavy. Try a smaller one." : "That file could not be used as a photograph.");
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!data) return;
    const trimmed = name.trim();
    if (!trimmed) {
      setFormError("They need a name.");
      return;
    }
    setSaving(true);
    if (isSupabaseConfigured()) {
      try {
        let photo_url: string | null = null;
        if (photo) {
          const blob = await (await fetch(photo)).blob();
          const photoFile = new File([blob], "memorial-photo", { type: blob.type || "image/jpeg" });
          photo_url = await uploadLanternPhoto(photoFile);
        }
        const dates = [years.trim(), departed.trim()].filter(Boolean).join(" · ");
        const result = await createPublicLantern({
            slug: trimmed,
            name: trimmed,
            dates,
            scent: "Morning Meadow & Warm Linen",
            photo_url,
            story: dedication.trim(),
            quote: dedication.trim().slice(0, 280),
            sky_x: 50,
            sky_y: 45,
            environment,
        });
        try { localStorage.setItem(`gentlewick.owner.${result.lantern.id}`, result.editToken); } catch { /* Owner token storage is best-effort. */ }
        window.location.assign(`/?pet=${encodeURIComponent(result.lantern.slug)}`);
        return;
      } catch (err) {
        setFormError(err instanceof Error ? err.message : "We couldn't create the memorial online. Please try again.");
        setSaving(false);
        return;
      }
    }
    const next = addMemorial(data, { name: trimmed, years, departed, dedication, species, photo });
    const created = next.memorials[0];
    const ok = commit(() => next);
    if (!ok || !created) { setSaving(false); return; }
    void navigate({ to: "/memorial/$slug", params: { slug: created.slug } });
  }

  return (
    <Shell>
      <main className="gw-create mx-auto grid max-w-6xl items-start gap-10 px-5 py-14 lg:grid-cols-2">
        <div>
        <p className="kicker">Create</p>
        <h1 className="mt-2 font-serif text-5xl text-balance">A page for their light</h1>
        <p className="mt-4 text-muted">
          There is no right way to remember. Their name is enough. Add a photograph or a few words if you wish.
        </p>
        {!ready ? (
          <p className="mt-8 text-muted">A moment.</p>
        ) : (
          <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
            <section className="grid gap-4 rounded-2xl border border-line p-4 sm:p-5">
              <div>
                <p className="kicker">First</p>
                <h2 className="font-serif text-2xl">Their name</h2>
                <p className="text-sm text-muted">The name you want to remember them by.</p>
              </div>
            <label className="field">
              <span>Their name</span>
              <input value={name} maxLength={60} onChange={(e) => { setName(e.target.value); setFormError(null); }} placeholder="Sandy" required autoComplete="off" />
              <span className="text-xs text-muted">{name.length}/60</span>
            </label>
            <fieldset>
              <legend className="font-medium">Who they were</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {SPECIES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="choice"
                    aria-pressed={species === item.id}
                    onClick={() => setSpecies(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted">{speciesLine(species)}</p>
            </fieldset>
            </section>
            <section className="grid gap-4 rounded-2xl border border-line p-4 sm:p-5">
              <div>
                <p className="kicker">Next</p>
                <h2 className="font-serif text-2xl">A little about them</h2>
                <p className="text-sm text-muted">Dates, a favourite memory, or just a few words. Leave anything blank if it doesn't feel right.</p>
              </div>
            <label className="field">
              <span>A line under the name</span>
              <input
                value={years}
                maxLength={80}
                onChange={(e) => setYears(e.target.value)}
                placeholder="17 years of loyalty"
              />
            </label>
            <label className="field">
              <span>When they left</span>
              <input
                value={departed}
                maxLength={40}
                onChange={(e) => setDeparted(e.target.value)}
                placeholder="March 2024"
              />
            </label>
            <label className="field">
              <span>A few words that matter</span>
              <textarea
                value={dedication}
                maxLength={400}
                onChange={(e) => setDedication(e.target.value)}
                placeholder="Loyal heart. Gentle soul. Forever loved."
              />
            </label>
            </section>
            {null /* Golden Meadows is the gentle default; sanctuary choice can be changed later. */}
            <section className="grid gap-4 rounded-2xl border border-line p-4 sm:p-5">
              <div>
                <p className="kicker">Whenever you're ready</p>
                <h2 className="font-serif text-2xl">A photograph</h2>
                <p className="text-sm text-muted">Optional — you can create the page without one.</p>
              </div>
            <div className="field">
              <span>Their photograph, if you have it</span>
              <label className="btn btn-ghost w-fit">
                {photo ? "Choose a different photograph" : "Add a photograph"}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => { void onPhoto(e.target.files?.[0]); e.currentTarget.value = ""; }}
                />
              </label>
              {photo ? (
                <>
                  <img src={photo} alt="" className="mt-2 size-28 rounded-full object-cover" />
                  <button type="button" className="mt-2 text-sm text-muted underline underline-offset-4" onClick={() => setPhoto(null)}>Remove photograph</button>
                </>
              ) : (
                <p className="text-sm text-muted">Optional. A letter will hold the place if you do not have a photograph.</p>
              )}
            </div>
            </section>
            {formError || error ? <p className="text-sea-deep">{formError || error}</p> : null}
            <button type="submit" className="btn btn-primary" disabled={saving}>
              Keep this page
            </button>
          </form>
        )}
        </div>
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-3xl bg-cream px-6 py-10">
            <div className="flex justify-center">
              <Portrait name={name.trim() || "Their name"} photo={photo} lit={name.trim().length > 0} />
            </div>
            <h2 className="mt-6 text-center font-serif text-4xl text-balance">{name.trim() || "Their name"}</h2>
            <p className="mt-2 text-center text-muted">
              {[years.trim(), departed.trim()].filter(Boolean).join(" · ") || "A line under the name will sit here"}
            </p>
            <p className="mt-6 text-center font-serif text-xl text-balance">
              {dedication.trim() || "A few words that matter."}
            </p>
          </div>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            <li>You can keep only a name, and add the rest later.</li>
            <li>{isSupabaseConfigured() ? "Your memorial is saved to the Gentlewick sanctuary and can be opened from its shared link." : "Your page stays in this browser on this device."}</li>
            <li>Once created, their shared memorial can be opened from any device using its link.</li>
            <li>{isSupabaseConfigured() ? "Your shared memorial can include its photograph and public blessings." : "Local share links include their words only; the photograph stays on this device."}</li>
            <li>The candle on the page is free. Come back whenever you need to.</li>
          </ul>
        </aside>
      </main>
    </Shell>
  );
}
