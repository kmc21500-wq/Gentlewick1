import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flame-B9txz86U.js
var import_jsx_runtime = require_jsx_runtime();
function Flame({ lit, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `gw-flame gw-flame-${size} ${lit ? "is-lit" : ""}`,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "glow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "outer" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inner" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "stick" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "wax" })
		]
	});
}
//#endregion
export { Flame as t };
