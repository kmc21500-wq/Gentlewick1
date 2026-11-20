import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Shell } from "./router-BOtqzCen.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-BGECO2zn.js
var import_jsx_runtime = require_jsx_runtime();
function AccountInfo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "My memories"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl md:text-5xl",
				children: "Kept close, on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "lede mt-5",
				children: "Your memorial pages, photographs, and candle memories are stored in this browser on this device. Gentlewick does not use accounts, backups, or cloud sync."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-8 grid gap-4 p-5 sm:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: "A little note about keeping them"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "If you change devices, use a different browser, or clear this browser’s site data, your saved memories may not be available anymore. Gentlewick has no backup or cloud recovery feature."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "You can keep visiting this browser to return to the pages and candles you have saved here."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/memorials",
					className: "btn btn-primary",
					children: "See your memorials"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/create",
					className: "btn btn-ghost",
					children: "Begin a page"
				})]
			})
		]
	}) });
}
//#endregion
export { AccountInfo as component };
