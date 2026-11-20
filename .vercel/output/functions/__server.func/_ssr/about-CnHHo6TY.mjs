import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Shell } from "./router-DVzBneu4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CnHHo6TY.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto max-w-3xl px-5 py-14 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "About"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-serif text-5xl text-balance md:text-6xl",
					children: "A place to remember them."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pull mt-8",
					children: "Seventeen years of loyalty, and a room that went quiet in March 2024."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-5 text-lg text-ink-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Gentlewick began as a page for Sandy McCann. The evenings were already happening, and there was nowhere quiet to put her name." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A page holds a name, the years, a photograph if you have one, and the evenings you come back. You can light a candle and leave. You can write a sentence. You can keep more than one — a dog, a cat, a bird, or someone else who chose you." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The pages stay free. The photograph stays on your device. A shared link carries the words, not the picture. Nothing here asks you to be ready." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/memorial/$slug",
						params: { slug: "sandy" },
						className: "btn btn-primary",
						children: "Sandy’s page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/create",
						className: "btn btn-ghost",
						children: "Begin a page"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/room.jpg",
				alt: "A single candle burning on a low wooden table in a quiet sitting room.",
				className: "aspect-video w-full rounded-3xl object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mt-3 text-sm text-muted",
				children: "The candle in the sitting room. Come back on a hard night, or an ordinary one."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-5 py-16 md:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "What we will not do"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "rule-list mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: "Invent a face"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "If you have no photograph yet, the page shows an initial. Sandy’s face is not made up here. Add the real one when you are ready."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: "Charge for remembering"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "The name, the evenings, the words, and the candle you light on the page stay free."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: "Rush the writing"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "You can light the candle and leave. A sentence is welcome. It is never required."
					})] })
				]
			})]
		})
	] }) });
}
//#endregion
export { About as component };
