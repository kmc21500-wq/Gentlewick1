import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { euro, formatWhen, releaseOrder, scentBy, sizeBy, wickBy } from "@/lib/store";
import { useLedger } from "@/lib/use-ledger";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Held candles — Gentlewick" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const { data, ready, commit } = useLedger();

  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-14">
        <p className="kicker">The atelier</p>
        <h1 className="mt-2 font-serif text-5xl">Held candles</h1>
        <p className="mt-3 max-w-lg text-muted">
          Notes of candles you might want later. Nothing is charged. They stay in this browser, and nowhere else.
          Releasing one only removes the note.
        </p>
        {!ready || !data ? (
          <p className="mt-10 text-muted">A moment.</p>
        ) : data.orders.length === 0 ? (
          <div className="mt-10">
            <p>No candles held yet.</p>
            <Link to="/candle" className="btn btn-primary mt-6">
              Start a candle
            </Link>
          </div>
        ) : (
          <ul className="mt-10 grid gap-4">
            {data.orders.map((order) => (
              <li key={order.id} className="rounded-3xl border border-line bg-paper p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-serif text-3xl">{order.petName}</h2>
                  <p className="font-medium">{euro(order.price)}</p>
                </div>
                <p className="mt-2 text-muted">
                  {order.id} · {formatWhen(order.createdAt)}
                </p>
                <p className="mt-3">
                  {sizeBy(order.size).name} · {scentBy(order.scent).name} · {wickBy(order.wick).name}
                </p>
                <p className="mt-2 text-muted">“{order.boxNote}”</p>
                <p className="mt-2 text-sm text-muted">
                  {order.keeperName} · {order.email}
                </p>
                <p className="mt-3 text-sm text-sea-deep">A note on this device. Not an order.</p>
                <button
                  type="button"
                  className="mt-4 text-sm text-muted"
                  onClick={() => commit((current) => releaseOrder(current, order.id))}
                >
                  Release this hold
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </Shell>
  );
}
