import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChoiceGroup } from "@/components/choice";
import { Flame } from "@/components/flame";
import { Shell } from "@/components/shell";
import {
  allMemorials,
  euro,
  photoOf,
  priceFor,
  SCENTS,
  SIZES,
  WICKS,
  WOOD_EXTRA,
  type CandleSize,
  type Scent,
  type Wick,
} from "@/lib/store";
import { useLedger } from "@/lib/use-ledger";

export const Route = createFileRoute("/candle")({
  head: () => ({ meta: [{ title: "The candle — Gentlewick" }] }),
  component: CandlePage,
});

function CandlePage() {
  const navigate = useNavigate();
  const { data } = useLedger();
  const [size, setSize] = useState<CandleSize>("petite");
  const [scent, setScent] = useState<Scent>("unscented");
  const [wick, setWick] = useState<Wick>("cotton");
  const [memorialSlug, setMemorialSlug] = useState("");
  const [customName, setCustomName] = useState("");

  const memorials = data ? allMemorials(data) : [];
  const selected = memorials.find((item) => item.slug === memorialSlug);
  const name = selected?.name || customName.trim() || "Their name";
  const photo = data && selected ? photoOf(data, selected) : null;
  const price = priceFor(size, wick);
  const initial = name.trim().charAt(0).toUpperCase() || "·";

  return (
    <Shell>
      <main>
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-10 lg:grid-cols-2">
          <div>
            <img
              src="/images/glass-room.jpg"
              alt="A frosted candle on a wooden table in morning light. The dog printed into the glass is a sample, not a real companion."
              className="aspect-3/4 w-full rounded-3xl object-cover object-center shadow-soft"
            />
            <img
              src="/images/box-open.jpg"
              alt="The candle in an open cream box with a pale blue lining and a paw seal."
              className="mt-3 aspect-4/3 w-full rounded-3xl object-cover"
            />
            <p className="mt-3 text-sm text-muted">
              In the box: the frosted jar, a pale blue lining, a paw seal, and one card. The dog in the glass
              is a sample of the printing. It is not Sandy, and it is not yours.
            </p>
          </div>

          <div>
            <p className="kicker">Only if the page is not enough</p>
            <h1 className="mt-3 font-serif text-5xl text-balance">A light for the room they were in.</h1>
            <p className="mt-4 text-lg text-muted">
              Their photograph printed into frosted glass. A cream box, a pale blue lining, and a card that can
              read: Their light is still here. You do not need this to keep their page.
            </p>

            <div className="jar mt-8">
              <Flame lit size="sm" />
              <div className="jar-body">
                {photo ? <img src={photo} alt="" /> : <span className="jar-initial">{initial}</span>}
                <p className="jar-name">{name}</p>
                <p className="jar-line">{selected?.years || selected?.departed || "Their years, if you want them"}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6">
              <label className="field">
                <span>Whose light is this?</span>
                <select value={memorialSlug} onChange={(event) => setMemorialSlug(event.target.value)}>
                  <option value="">A name I’ll type</option>
                  {memorials.map((item) => (
                    <option key={item.id} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              {memorialSlug ? null : (
                <label className="field">
                  <span>Their name on the glass</span>
                  <input value={customName} maxLength={60} onChange={(event) => setCustomName(event.target.value)} placeholder="Their name" />
                </label>
              )}
              <ChoiceGroup
                label="Size"
                value={size}
                onChange={setSize}
                options={SIZES.map((item) => ({
                  id: item.id,
                  name: item.name,
                  note: `${item.note} ${item.hours}.`,
                  extra: euro(item.price),
                }))}
              />
              <ChoiceGroup
                label="Scent"
                columns={2}
                value={scent}
                onChange={setScent}
                options={SCENTS.map((item) => ({ id: item.id, name: item.name, note: item.note }))}
              />
              <ChoiceGroup
                label="Wick"
                columns={2}
                value={wick}
                onChange={setWick}
                options={WICKS.map((item) => ({
                  id: item.id,
                  name: item.name,
                  note: item.note,
                  extra: item.id === "wood" ? `+ ${euro(WOOD_EXTRA)}` : "Included",
                }))}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary mt-8"
              onClick={() =>
                void navigate({
                  to: "/order",
                  search: {
                    size,
                    scent,
                    wick,
                    memorial: memorialSlug,
                    name: memorialSlug ? "" : customName.trim(),
                  },
                })
              }
            >
              Hold this glass · {euro(price)}
            </button>
            <p className="mt-4 text-sm text-muted">
              A hold is a note on this device. Nothing is charged, and no candle is booked.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-muted sm:grid-cols-3">
              <li>Printed into the glass</li>
              <li>A clean, quiet burn</li>
              <li>A small making, in Dublin</li>
            </ul>
          </div>
        </div>
      </main>
    </Shell>
  );
}
