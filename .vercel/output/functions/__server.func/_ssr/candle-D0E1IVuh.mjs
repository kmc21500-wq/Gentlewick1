import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as priceFor, b as euro, d as SIZES, h as allMemorials, k as photoOf, o as Shell, p as WICKS, u as SCENTS } from "./router-kr3dZ8tz.mjs";
import { t as Flame } from "./flame-B9txz86U.mjs";
import { t as useLedger } from "./use-ledger-B9m_Nbe6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/candle-D0E1IVuh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChoiceGroup({ label, value, onChange, options, columns = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
		className: "choice-legend font-serif text-2xl",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: columns === 2 ? "mt-3 grid gap-2 sm:grid-cols-2" : "mt-3 grid gap-2",
		children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "choice",
			"aria-pressed": value === option.id,
			onClick: () => onChange(option.id),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-medium",
					children: option.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "note",
					children: option.note
				})]
			}), option.extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-sm font-medium",
				children: option.extra
			}) : null]
		}, option.id))
	})] });
}
function CandlePage() {
	const navigate = useNavigate();
	const { data } = useLedger();
	const [size, setSize] = (0, import_react.useState)("petite");
	const [scent, setScent] = (0, import_react.useState)("unscented");
	const [wick, setWick] = (0, import_react.useState)("cotton");
	const [memorialSlug, setMemorialSlug] = (0, import_react.useState)("");
	const [customName, setCustomName] = (0, import_react.useState)("");
	const memorials = data ? allMemorials(data) : [];
	const selected = memorials.find((item) => item.slug === memorialSlug);
	const name = selected?.name || customName.trim() || "Their name";
	const photo = data && selected ? photoOf(data, selected) : null;
	const price = priceFor(size, wick);
	const initial = name.trim().charAt(0).toUpperCase() || "·";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl items-start gap-10 px-5 py-10 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/glass-room.jpg",
				alt: "A frosted candle on a wooden table in morning light. The dog printed into the glass is a sample, not a real companion.",
				className: "aspect-3/4 w-full rounded-3xl object-cover object-center shadow-soft"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/box-open.jpg",
				alt: "The candle in an open cream box with a pale blue lining and a paw seal.",
				className: "mt-3 aspect-4/3 w-full rounded-3xl object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "In the box: the frosted jar, a pale blue lining, a paw seal, and one card. The dog in the glass is a sample of the printing. It is not Sandy, and it is not yours."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Only if the page is not enough"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-5xl text-balance",
				children: "A light for the room they were in."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-muted",
				children: "Their photograph printed into frosted glass. A cream box, a pale blue lining, and a card that can read: Their light is still here. You do not need this to keep their page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "jar mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
					lit: true,
					size: "sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "jar-body",
					children: [
						photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photo,
							alt: ""
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "jar-initial",
							children: initial
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "jar-name",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "jar-line",
							children: selected?.years || selected?.departed || "Their years, if you want them"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Whose light is this?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: memorialSlug,
							onChange: (event) => setMemorialSlug(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "A name I’ll type"
							}), memorials.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.slug,
								children: item.name
							}, item.id))]
						})]
					}),
					memorialSlug ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Their name on the glass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: customName,
							maxLength: 60,
							onChange: (event) => setCustomName(event.target.value),
							placeholder: "Their name"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
						label: "Size",
						value: size,
						onChange: setSize,
						options: SIZES.map((item) => ({
							id: item.id,
							name: item.name,
							note: `${item.note} ${item.hours}.`,
							extra: euro(item.price)
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
						label: "Scent",
						columns: 2,
						value: scent,
						onChange: setScent,
						options: SCENTS.map((item) => ({
							id: item.id,
							name: item.name,
							note: item.note
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceGroup, {
						label: "Wick",
						columns: 2,
						value: wick,
						onChange: setWick,
						options: WICKS.map((item) => ({
							id: item.id,
							name: item.name,
							note: item.note,
							extra: item.id === "wood" ? `+ ${euro(4)}` : "Included"
						}))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "btn btn-primary mt-8",
				onClick: () => void navigate({
					to: "/order",
					search: {
						size,
						scent,
						wick,
						memorial: memorialSlug,
						name: memorialSlug ? "" : customName.trim()
					}
				}),
				children: ["Hold this glass · ", euro(price)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "A hold is a note on this device. Nothing is charged, and no candle is booked."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-6 grid gap-2 text-sm text-muted sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Printed into the glass" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A clean, quiet burn" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A small making, in Dublin" })
				]
			})
		] })]
	}) }) });
}
//#endregion
export { CandlePage as component };
