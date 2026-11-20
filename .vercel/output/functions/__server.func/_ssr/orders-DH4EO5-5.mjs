import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as wickBy, C as formatWhen, F as scentBy, L as sizeBy, N as releaseOrder, o as Shell, x as euro } from "./router-Dy3D-o78.mjs";
import { t as useLedger } from "./use-ledger-Bsi3CEwd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-DH4EO5-5.js
var import_jsx_runtime = require_jsx_runtime();
function OrdersPage() {
	const { data, ready, commit } = useLedger();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "The atelier"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-serif text-5xl",
				children: "Held candles"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-lg text-muted",
				children: "Notes of candles you might want later. Nothing is charged. They stay in this browser, and nowhere else. Releasing one only removes the note."
			}),
			!ready || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-muted",
				children: "A moment."
			}) : data.orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No candles held yet." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/candle",
					className: "btn btn-primary mt-6",
					children: "Start a candle"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-10 grid gap-4",
				children: data.orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-3xl border border-line bg-paper p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-3xl",
								children: order.petName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: euro(order.price)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-muted",
							children: [
								order.id,
								" · ",
								formatWhen(order.createdAt)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3",
							children: [
								sizeBy(order.size).name,
								" · ",
								scentBy(order.scent).name,
								" · ",
								wickBy(order.wick).name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-muted",
							children: [
								"“",
								order.boxNote,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								order.keeperName,
								" · ",
								order.email
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-sea-deep",
							children: "A note on this device. Not an order."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-4 text-sm text-muted",
							onClick: () => commit((current) => releaseOrder(current, order.id)),
							children: "Release this hold"
						})
					]
				}, order.id))
			})
		]
	}) });
}
//#endregion
export { OrdersPage as component };
