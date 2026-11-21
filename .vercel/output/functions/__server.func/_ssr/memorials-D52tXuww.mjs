import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as lightsOf, T as isLitToday, _ as allMemorials, j as photoOf, k as nightsKept, o as Shell, z as speciesLabel } from "./router-CLcXLmwN.mjs";
import { t as Flame } from "./flame-B9txz86U.mjs";
import { t as useLedger } from "./use-ledger-M1_g4rKC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/memorials-D52tXuww.js
var import_jsx_runtime = require_jsx_runtime();
function Memorials() {
	const { data, ready } = useLedger();
	const memorials = data ? allMemorials(data) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "The lights"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-5xl",
					children: "Pages you can return to"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-lg text-muted",
					children: "Sandy’s light is already here. Any page you begin stays on this device, with the evenings you come back."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/create",
				className: "btn btn-primary",
				children: "Begin a page"
			})]
		}), !ready || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-10 text-muted",
			children: "A moment."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-2",
			children: memorials.map((memorial) => {
				const lights = lightsOf(data, memorial.id);
				const photo = photoOf(data, memorial);
				const lit = isLitToday(lights);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col rounded-3xl border border-line bg-paper p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-sea-deep",
										children: memorial.house ? "The first light" : speciesLabel(memorial.species)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 font-serif text-3xl text-balance",
										children: memorial.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-muted",
										children: [memorial.years || "A light kept here", memorial.departed ? ` · ${memorial.departed}` : ""]
									})
								]
							}), photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: photo,
								alt: "",
								className: "size-14 shrink-0 rounded-full object-cover sm:size-16"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-14 shrink-0 place-items-center rounded-full bg-cream font-serif text-2xl text-sea-deep sm:size-16",
								children: memorial.name.trim().charAt(0).toUpperCase()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 flex-1 line-clamp-3 text-muted",
							children: memorial.dedication
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between gap-3 border-t border-line pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm text-sea-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
									lit,
									size: "sm"
								}), lit ? "Lit today" : nightsKept(lights) ? `${nightsKept(lights)} evenings` : "Wick waiting"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/memorial/$slug",
								params: { slug: memorial.slug },
								className: "font-medium",
								children: "Open"
							})]
						})
					]
				}, memorial.id);
			})
		}) })]
	}) });
}
//#endregion
export { Memorials as component };
