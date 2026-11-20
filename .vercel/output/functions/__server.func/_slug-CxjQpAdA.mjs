import { S as require_jsx_runtime, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { S as findMemorial, T as lightsOf, V as withLight, c as Wordmark, n as Route, o as Shell, w as isLitToday } from "./_ssr/router-Dy3D-o78.mjs";
import { t as Flame } from "./_ssr/flame-B9txz86U.mjs";
import { t as useLedger } from "./_ssr/use-ledger-Bsi3CEwd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CxjQpAdA.js
var import_jsx_runtime = require_jsx_runtime();
function NightPage() {
	const { slug } = Route.useParams();
	const { data, ready, commit } = useLedger();
	if (!ready || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		bare: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "grid min-h-screen place-items-center text-cream",
			children: "A moment."
		})
	});
	const memorial = findMemorial(data, slug);
	if (!memorial) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		bare: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "grid min-h-screen place-items-center px-6 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-3xl",
				children: "This night has no name."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/memorials",
				className: "btn btn-light mt-6",
				children: "The lights"
			})] })
		})
	});
	const lit = isLitToday(lightsOf(data, memorial.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		bare: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "relative min-h-screen overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/night-flame.jpg",
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover opacity-35"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "night-veil absolute inset-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { tone: "light" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 font-serif text-5xl text-balance text-night-fg",
							children: memorial.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
								lit,
								size: "lg"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-serif text-2xl text-night-fg",
							children: lit ? "The candle is lit." : "Someone is missing here."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-light mt-8",
							disabled: lit,
							onClick: () => commit((current) => withLight(current, memorial.id, "")),
							children: lit ? "Candle is lit" : "Light a candle for them"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/memorial/$slug",
							params: { slug: memorial.slug },
							className: "mt-8 text-sm text-cream",
							children: "Leave the night"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { NightPage as component };
