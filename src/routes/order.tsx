import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Shell } from "@/components/shell";
import {
  BOX_NOTE,
  euro,
  findMemorial,
  makeOrderId,
  parseOrderSearch,
  photoOf,
  priceFor,
  scentBy,
  sizeBy,
  wickBy,
  type Order,
} from "@/lib/store";
import { useLedger } from "@/lib/use-ledger";

export const Route = createFileRoute("/order")({
  validateSearch: (search) => parseOrderSearch(search),
  head: () => ({ meta: [{ title: "Hold a candle — Gentlewick" }] }),
  component: OrderPage,
});

function OrderPage() {
  const search = Route.useSearch();
  const { data, ready, error, commit } = useLedger();
  const [petName, setPetName] = useState(search.name);
  const [boxNote, setBoxNote] = useState(BOX_NOTE);
  const [keeperName, setKeeperName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [held, setHeld] = useState<Order | null>(null);

  useEffect(() => {
    if (!data || !search.memorial) return;
    const memorial = findMemorial(data, search.memorial);
    if (memorial) setPetName((current) => current || memorial.name);
  }, [data, search.memorial]);

  const price = priceFor(search.size, search.wick);
  const linked = data && search.memorial ? findMemorial(data, search.memorial) : undefined;
  const photo = data && linked ? photoOf(data, linked) : null;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!data) return;
    if (!petName.trim()) {
      setFormError("The glass needs their name.");
      return;
    }
    if (!keeperName.trim() || !email.includes("@")) {
      setFormError("Leave your name and an email on this device. It is not sent anywhere.");
      return;
    }
    const order: Order = {
      id: makeOrderId(),
      createdAt: Date.now(),
      petName: petName.trim(),
      memorialId: linked?.id ?? null,
      size: search.size,
      scent: search.scent,
      wick: search.wick,
      boxNote: boxNote.trim() || BOX_NOTE,
      keeperName: keeperName.trim(),
      email: email.trim(),
      price,
    };
    const ok = commit((current) => ({ ...current, orders: [order, ...current.orders] }));
    if (ok) setHeld(order);
    else setFormError("This device could not hold the order.");
  }

  return (
    <Shell>
      <main className="mx-auto max-w-xl px-5 py-14">
        <p className="kicker">The glass</p>
        <h1 className="mt-2 font-serif text-5xl text-balance">{held ? "Held." : "Hold this candle."}</h1>
        {held ? (
          <div className="mt-8 grid gap-4">
            <p className="font-serif text-3xl">{held.id}</p>
            <p className="text-muted">
              {held.petName} · {sizeBy(held.size).name} · {scentBy(held.scent).name} · {wickBy(held.wick).name} ·{" "}
              {euro(held.price)}
            </p>
            <p>
              Nothing has been charged. This is a note of the candle, not an order. It stays in this browser until
              you release it, or until the browser is cleared.
            </p>
            <p className="text-sm text-muted">
              Your email was not sent. Holding again adds another note. It does not change this one.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/orders" className="btn btn-primary">
                See held candles
              </Link>
              <Link to="/candle" className="btn btn-ghost">
                Hold a different one
              </Link>
            </div>
          </div>
        ) : !ready ? (
          <p className="mt-8 text-muted">A moment.</p>
        ) : (
          <form className="mt-8 grid gap-5" onSubmit={submit}>
            <div className="rounded-3xl bg-cream p-5">
              <p className="font-medium">
                {sizeBy(search.size).name} · {scentBy(search.scent).name} · {wickBy(search.wick).name}
              </p>
              <p className="mt-1 font-serif text-3xl">{euro(price)}</p>
              <p className="mt-2 text-sm text-muted">{sizeBy(search.size).hours}. {sizeBy(search.size).note}</p>
              {photo ? <img src={photo} alt="" className="mt-4 size-16 rounded-full object-cover" /> : null}
            </div>
            <label className="field">
              <span>Name on the glass</span>
              <input value={petName} maxLength={60} onChange={(event) => setPetName(event.target.value)} />
            </label>
            <label className="field">
              <span>Note in the box</span>
              <textarea value={boxNote} maxLength={140} onChange={(event) => setBoxNote(event.target.value)} />
            </label>
            <label className="field">
              <span>Your name</span>
              <input value={keeperName} maxLength={80} onChange={(event) => setKeeperName(event.target.value)} />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                maxLength={120}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Kept on this device only"
              />
            </label>
            <p className="text-sm text-muted">
              A hold saves this glass on this device only. It does not take payment, book a candle, or send your
              email. Another hold is a second note, not a change to this one.
            </p>
            {data && data.orders.length > 0 ? (
              <p className="text-sm text-sea-deep">
                {data.orders.length === 1
                  ? "One candle is already held on this device."
                  : `${data.orders.length} candles are already held on this device.`}
              </p>
            ) : null}
            {formError || error ? <p className="text-sea-deep">{formError || error}</p> : null}
            <button type="submit" className="btn btn-primary">
              Hold this candle
            </button>
          </form>
        )}
      </main>
    </Shell>
  );
}
