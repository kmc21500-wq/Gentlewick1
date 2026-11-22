import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Flame } from "./flame-B9txz86U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portrait-Dq9OD0po.js
var import_jsx_runtime = require_jsx_runtime();
function Portrait({ name, photo, lit, size = "lg" }) {
	const initial = name.trim().charAt(0).toUpperCase() || "·";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `portrait portrait-${size}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
			lit,
			size: size === "lg" ? "lg" : "sm"
		}), photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: photo,
			alt: "",
			className: "portrait-photo"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "portrait-fallback font-serif",
			"aria-hidden": "true",
			children: initial
		})]
	});
}
//#endregion
export { Portrait as t };
