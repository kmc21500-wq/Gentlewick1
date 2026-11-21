import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as photoOf, B as wickBy, D as makeOrderId, F as scentBy, L as sizeBy, S as findMemorial, i as Route$4, j as priceFor, l as BOX_NOTE, o as Shell, x as euro } from "./router-CChJQlW0.mjs";
import { t as useLedger } from "./use-ledger-Bsi3CEwd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-DwRiIMwT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrderPage() {
	const search = Route$4.useSearch();
	const { data, ready, error, commit } = useLedger();
	const [petName, setPetName] = (0, import_react.useState)(search.name);
	const [boxNote, setBoxNote] = (0, import_react.useState)(BOX_NOTE);
	const [keeperName, setKeeperName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [formError, setFormError] = (0, import_react.useState)(null);
	const [held, setHeld] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!data || !search.memorial) return;
		const memorial = findMemorial(data, search.memorial);
		if (memorial) setPetName((current) => current || memorial.name);
	}, [data, search.memorial]);
	const price = priceFor(search.size, search.wick);
	const linked = data && search.memorial ? findMemorial(data, search.memorial) : void 0;
	const photo = data && linked ? photoOf(data, linked) : null;
	function submit(event) {
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
		const order = {
			id: makeOrderId(),
			createdAt: Date.now(),
			petName: petName.trim(),
			memorialId: linked?.id ?? null,
			size: search.size,
			scent: search.scent,
			wick: search.wick,
			boxNote: boxNote.trim() || "Their light is still here.",
			keeperName: keeperName.trim(),
			email: email.trim(),
			price
		};
		if (commit((current) => ({
			...current,
			orders: [order, ...current.orders]
		}))) setHeld(order);
		else setFormError("This device could not hold the order.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "The glass"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-serif text-5xl text-balance",
				children: held ? "Held." : "Hold this candle."
			}),
			held ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-3xl",
						children: held.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							held.petName,
							" · ",
							sizeBy(held.size).name,
							" · ",
							scentBy(held.scent).name,
							" · ",
							wickBy(held.wick).name,
							" ·",
							" ",
							euro(held.price)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nothing has been charged. This is a note of the candle, not an order. It stays in this browser until you release it, or until the browser is cleared." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Your email was not sent. Holding again adds another note. It does not change this one."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/orders",
							className: "btn btn-primary",
							children: "See held candles"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/candle",
							className: "btn btn-ghost",
							children: "Hold a different one"
						})]
					})
				]
			}) : !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-muted",
				children: "A moment."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 grid gap-5",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-cream p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									sizeBy(search.size).name,
									" · ",
									scentBy(search.scent).name,
									" · ",
									wickBy(search.wick).name
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-serif text-3xl",
								children: euro(price)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									sizeBy(search.size).hours,
									". ",
									sizeBy(search.size).note
								]
							}),
							photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: photo,
								alt: "",
								className: "mt-4 size-16 rounded-full object-cover"
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name on the glass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: petName,
							maxLength: 60,
							onChange: (event) => setPetName(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Note in the box" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: boxNote,
							maxLength: 140,
							onChange: (event) => setBoxNote(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: keeperName,
							maxLength: 80,
							onChange: (event) => setKeeperName(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							maxLength: 120,
							onChange: (event) => setEmail(event.target.value),
							placeholder: "Kept on this device only"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "A hold saves this glass on this device only. It does not take payment, book a candle, or send your email. Another hold is a second note, not a change to this one."
					}),
					data && data.orders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-sea-deep",
						children: data.orders.length === 1 ? "One candle is already held on this device." : `${data.orders.length} candles are already held on this device.`
					}) : null,
					formError || error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sea-deep",
						children: formError || error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn btn-primary",
						children: "Hold this candle"
					})
				]
			})
		]
	}) });
}
//#endregion
export { OrderPage as component };
