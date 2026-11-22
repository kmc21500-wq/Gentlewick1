import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as speciesLabel, _ as decodeShare, a as Route$7, g as copyText, o as Shell, s as Paw } from "./router-D0CoVBdS.mjs";
import { t as Flame } from "./flame-B9txz86U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/keep-C1mOaVI-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KeepInfo() {
	const { c } = Route$7.useSearch();
	const shared = c ? decodeShare(c) : null;
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function shareAgain() {
		try {
			await copyText(window.location.href);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2200);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-2xl px-5 py-14",
		children: shared ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-3xl border border-line bg-paper p-6 sm:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "A shared remembrance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid justify-items-center rounded-3xl bg-cream px-6 py-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
							lit: true,
							size: "lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "mt-6 size-6 text-[#c6ae8a]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-serif text-4xl text-balance sm:text-5xl",
							children: shared.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: [shared.y, shared.d].filter(Boolean).join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-sm text-sea-deep",
							children: speciesLabel(shared.s)
						}),
						shared.t ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
							className: "pull mt-8 max-w-lg",
							children: shared.t
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-muted",
							children: "The name is enough."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted",
					children: "This shared page contains the words and details only. The original photograph and candle history remain with the person who created the memorial."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => void shareAgain(),
						children: copied ? "Link copied" : "Share this remembrance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/create",
						className: "btn btn-primary",
						children: "Create a memorial"
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Your memories"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl",
				children: "No account needed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "lede mt-5",
				children: "Gentlewick keeps your memorial pages, photographs, and candle memories in this browser on this device. You can simply keep using the site without signing up."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "If you change devices or clear browser data, your saved memories may not be available. Gentlewick does not offer backup or cloud sync."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					className: "btn btn-primary",
					children: "My memories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/memorials",
					className: "btn btn-ghost",
					children: "Return to memorials"
				})]
			})
		] })
	}) });
}
//#endregion
export { KeepInfo as component };
