import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert, r as Menu, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BHjwcsDB.js
var SPECIES = [
	{
		id: "dog",
		label: "Dog",
		line: "The one who waits at the door."
	},
	{
		id: "cat",
		label: "Cat",
		line: "The quiet keeper of a room."
	},
	{
		id: "bird",
		label: "Bird",
		line: "A passing at the window."
	},
	{
		id: "other",
		label: "Someone else",
		line: "Whoever chose you."
	}
];
var SIZES = [
	{
		id: "petite",
		name: "Petite",
		hours: "about 40 hours",
		price: 42,
		note: "A small light for a bedside or a desk."
	},
	{
		id: "classic",
		name: "Classic",
		hours: "about 60 hours",
		price: 58,
		note: "For the room you shared."
	},
	{
		id: "long",
		name: "Long light",
		hours: "about 90 hours",
		price: 78,
		note: "For anniversaries, and the long evenings."
	}
];
var SCENTS = [
	{
		id: "unscented",
		name: "Unscented",
		note: "Just the wax, and the light."
	},
	{
		id: "cotton",
		name: "Soft cotton",
		note: "Clean linen, barely there."
	},
	{
		id: "vanilla",
		name: "Warm vanilla",
		note: "A low, familiar sweetness."
	},
	{
		id: "lavender",
		name: "Gentle lavender",
		note: "Soft, not sharp. For night."
	}
];
var WICKS = [{
	id: "cotton",
	name: "Classic wick",
	note: "A quiet, steady flame."
}, {
	id: "wood",
	name: "Wooden wick",
	note: "A soft crackle, like a small hearth."
}];
var BOX_NOTE = "Their light is still here.";
var SANDY = {
	id: "sandy",
	slug: "sandy",
	name: "Sandy McCann",
	years: "17 years of loyalty",
	departed: "March 2024",
	dedication: "Loyal heart. Gentle soul. Forever loved. Thank you for a lifetime of love.",
	species: "dog",
	house: true,
	createdAt: Date.parse("2024-03-15T12:00:00Z")
};
var KEY = "gentlewick.v1";
function empty() {
	return {
		memorials: [],
		lights: {},
		photos: {},
		orders: []
	};
}
function validMemorial(value) {
	if (!value || typeof value !== "object") return false;
	const m = value;
	return typeof m.id === "string" && typeof m.slug === "string" && typeof m.name === "string" && m.house === false;
}
function loadStore() {
	if (typeof window === "undefined") return empty();
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return empty();
		const parsed = JSON.parse(raw);
		return {
			memorials: Array.isArray(parsed.memorials) ? parsed.memorials.filter(validMemorial) : [],
			lights: parsed.lights && typeof parsed.lights === "object" ? parsed.lights : {},
			photos: parsed.photos && typeof parsed.photos === "object" ? parsed.photos : {},
			orders: Array.isArray(parsed.orders) ? parsed.orders : []
		};
	} catch {
		return empty();
	}
}
function persist(data) {
	try {
		localStorage.setItem(KEY, JSON.stringify(data));
		return null;
	} catch {
		return "This device could not keep that. Try a smaller photograph.";
	}
}
function allMemorials(data) {
	return [SANDY, ...data.memorials];
}
function findMemorial(data, slug) {
	return allMemorials(data).find((m) => m.slug === slug);
}
function photoOf(data, memorial) {
	return data.photos[memorial.id] ?? null;
}
function lightsOf(data, id) {
	return data.lights[id] ?? [];
}
function speciesLabel(species) {
	return SPECIES.find((s) => s.id === species)?.label ?? "Companion";
}
function speciesLine(species) {
	return SPECIES.find((s) => s.id === species)?.line ?? "";
}
function sizeBy(id) {
	return SIZES.find((s) => s.id === id) ?? SIZES[0];
}
function scentBy(id) {
	return SCENTS.find((s) => s.id === id) ?? SCENTS[0];
}
function wickBy(id) {
	return WICKS.find((w) => w.id === id) ?? WICKS[0];
}
function priceFor(size, wick) {
	return sizeBy(size).price + (wick === "wood" ? 4 : 0);
}
function euro(n) {
	return new Intl.NumberFormat("en-IE", {
		style: "currency",
		currency: "EUR",
		maximumFractionDigits: 0
	}).format(n);
}
function formatWhen(at) {
	return new Intl.DateTimeFormat("en-IE", {
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(new Date(at));
}
function sameDay(a, b) {
	const da = new Date(a);
	const db = new Date(b);
	return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate();
}
function isLitToday(lights) {
	return lights.some((light) => sameDay(light.at, Date.now()));
}
function nightsKept(lights) {
	return new Set(lights.map((light) => new Date(light.at).toDateString())).size;
}
function departedThisMonth(departed) {
	const month = (/* @__PURE__ */ new Date()).toLocaleString("en-IE", { month: "long" }).toLowerCase();
	return departed.toLowerCase().includes(month);
}
function slugBase(name) {
	return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48) || "light";
}
function uniqueSlug(name, data) {
	const taken = new Set(allMemorials(data).map((m) => m.slug));
	const base = slugBase(name);
	if (!taken.has(base)) return base;
	let i = 2;
	while (taken.has(`${base}-${i}`)) i += 1;
	return `${base}-${i}`;
}
function isSize(value) {
	return value === "petite" || value === "classic" || value === "long";
}
function isScent(value) {
	return value === "unscented" || value === "cotton" || value === "vanilla" || value === "lavender";
}
function isWick(value) {
	return value === "cotton" || value === "wood";
}
function parseOrderSearch(search) {
	return {
		size: isSize(search.size) ? search.size : "petite",
		scent: isScent(search.scent) ? search.scent : "unscented",
		wick: isWick(search.wick) ? search.wick : "cotton",
		memorial: typeof search.memorial === "string" ? search.memorial : "",
		name: typeof search.name === "string" ? search.name.slice(0, 60) : ""
	};
}
function addMemorial(data, input) {
	const id = crypto.randomUUID();
	const memorial = {
		id,
		slug: uniqueSlug(input.name, data),
		name: input.name.trim(),
		years: input.years.trim(),
		departed: input.departed.trim(),
		dedication: input.dedication.trim(),
		species: input.species,
		house: false,
		createdAt: Date.now()
	};
	const photos = input.photo ? {
		...data.photos,
		[id]: input.photo
	} : data.photos;
	return {
		...data,
		memorials: [memorial, ...data.memorials],
		photos
	};
}
function removeMemorial(data, id) {
	if (id === SANDY.id) return data;
	const photos = { ...data.photos };
	const lights = { ...data.lights };
	delete photos[id];
	delete lights[id];
	return {
		...data,
		memorials: data.memorials.filter((m) => m.id !== id),
		photos,
		lights
	};
}
function setPhoto(data, id, photo) {
	const photos = { ...data.photos };
	if (photo) photos[id] = photo;
	else delete photos[id];
	return {
		...data,
		photos
	};
}
function withLight(data, memorialId, whisper) {
	const list = data.lights[memorialId] ?? [];
	const trimmed = whisper.trim().slice(0, 180);
	const today = list.filter((light) => sameDay(light.at, Date.now()));
	if (today.length && !trimmed) return data;
	if (today.some((light) => light.whisper === trimmed)) return data;
	const empty = today.find((light) => !light.whisper);
	const lights = empty && trimmed ? list.map((light) => light.id === empty.id ? {
		...light,
		whisper: trimmed
	} : light) : [...list, {
		id: crypto.randomUUID(),
		at: Date.now(),
		whisper: trimmed
	}];
	return {
		...data,
		lights: {
			...data.lights,
			[memorialId]: lights
		}
	};
}
function makeOrderId() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let id = "GW-";
	for (let i = 0; i < 4; i += 1) id += alphabet[Math.floor(Math.random() * 32)];
	return id;
}
function releaseOrder(data, id) {
	return {
		...data,
		orders: data.orders.filter((order) => order.id !== id)
	};
}
function encodeShare(memorial) {
	const payload = {
		n: memorial.name,
		y: memorial.years,
		d: memorial.departed,
		t: memorial.dedication,
		s: memorial.species
	};
	const bytes = new TextEncoder().encode(JSON.stringify(payload));
	let bin = "";
	bytes.forEach((b) => {
		bin += String.fromCharCode(b);
	});
	return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function decodeShare(value) {
	try {
		const pad = value.replace(/-/g, "+").replace(/_/g, "/");
		const b64 = pad + "===".slice((pad.length + 3) % 4);
		const bin = atob(b64);
		const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0));
		const data = JSON.parse(new TextDecoder().decode(bytes));
		if (!data || typeof data.n !== "string" || !data.n.trim()) return null;
		return {
			n: data.n.slice(0, 60),
			y: typeof data.y === "string" ? data.y.slice(0, 80) : "",
			d: typeof data.d === "string" ? data.d.slice(0, 40) : "",
			t: typeof data.t === "string" ? data.t.slice(0, 400) : "",
			s: [
				"dog",
				"cat",
				"bird",
				"other"
			].includes(data.s) ? data.s : "other"
		};
	} catch {
		return null;
	}
}
function readPhotoFile(file) {
	if (!file.type.startsWith("image/")) return Promise.reject(/* @__PURE__ */ new Error("type"));
	if (file.size > 8e6) return Promise.reject(/* @__PURE__ */ new Error("size"));
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			const scale = Math.min(1, 960 / Math.max(img.width, img.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.max(1, Math.round(img.width * scale));
			canvas.height = Math.max(1, Math.round(img.height * scale));
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("canvas"));
				return;
			}
			try {
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				const converted = canvas.toDataURL("image/jpeg", .82);
				URL.revokeObjectURL(url);
				resolve(converted);
			} catch {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("image"));
			}
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("image"));
		};
		img.src = url;
	});
}
async function copyText(text) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
		return;
	}
	const area = document.createElement("textarea");
	area.value = text;
	area.setAttribute("readonly", "true");
	document.body.appendChild(area);
	area.select();
	document.execCommand("copy");
	area.remove();
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-D0CoVBdS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
function Wordmark({ lockup = false, tone = "ink" }) {
	const ink = tone === "light" ? "text-night-fg" : "text-ink";
	const mute = tone === "light" ? "text-cream" : "text-muted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-2.5 ${ink}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { tone }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-serif text-[1.35rem] leading-none tracking-tight",
				children: [
					"Gentlewick",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", {
						className: `ml-px font-sans text-[0.55rem] font-medium ${mute}`,
						"aria-hidden": "true",
						children: "™"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: " trademark"
					})
				]
			}), lockup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `mt-1.5 text-[0.68rem] tracking-[0.16em] uppercase ${mute}`,
				children: "For the ones who left paw prints"
			}) : null]
		})]
	});
}
function Mark({ tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 36",
		className: "h-8 w-5 shrink-0",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#E7A23A",
				d: "M12 1.2c2.4 3.6 5.4 6 5.4 10.2a5.4 5.4 0 0 1-10.8 0C6.6 7.2 9.6 4.8 12 1.2z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FFF8EC",
				d: "M12 7c1 1.4 1.8 2.3 1.8 3.6A1.8 1.8 0 0 1 12 12.4a1.8 1.8 0 0 1-1.8-1.8C10.2 9.3 11 8.4 12 7z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 16.2v8.2",
				stroke: tone === "light" ? "#F3EDE4" : "#2A2622",
				strokeWidth: "1.4",
				strokeLinecap: "round"
			})
		]
	});
}
function Paw({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 80",
		className,
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "40",
				cy: "52",
				rx: "16",
				ry: "13.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "17",
				cy: "30",
				rx: "7.5",
				ry: "10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "31",
				cy: "18",
				rx: "7",
				ry: "9.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "49",
				cy: "18",
				rx: "7",
				ry: "9.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "63",
				cy: "30",
				rx: "7.5",
				ry: "10"
			})
		]
	});
}
var LINKS = [
	{
		to: "/memorials",
		label: "The lights"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/account",
		label: "My memories"
	},
	{
		to: "/privacy",
		label: "Privacy"
	}
];
function Shell({ children, bare = false }) {
	if (bare) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-night text-night-fg",
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Header() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-20 border-b border-line bg-ivory/90 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-ink",
					onClick: () => setOpen(false),
					"aria-label": "Gentlewick, home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mb-3 flex items-end gap-1 text-[#c6ae8a]",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "size-3.5 -rotate-12" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "mb-2 size-3 rotate-6 opacity-80" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "mb-4 size-2.5 rotate-12 opacity-55" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-6 md:flex",
							"aria-label": "Primary",
							children: [LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: link.to,
								className: pathname === link.to ? "text-ink" : "text-muted",
								children: link.label
							}, link.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/create",
								className: "btn btn-primary",
								children: "Begin a page"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost min-h-11 min-w-11 md:hidden",
							"aria-expanded": open,
							"aria-label": open ? "Close menu" : "Open menu",
							onClick: () => setOpen((value) => !value),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				onClick: () => setOpen(false),
				className: "mt-1 inline-flex items-center gap-1.5 text-[0.62rem] tracking-[0.14em] text-muted uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-5 bg-[#d4b16a]" }),
					"Pet Memorials",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "size-2.5 text-[#c6ae8a]" }),
					"Virtual Candles",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-5 bg-[#d4b16a]" })
				]
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "grid gap-1 border-t border-line px-5 py-3 md:hidden",
			"aria-label": "Mobile",
			children: [LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: link.to,
				className: "rounded-2xl px-3 py-3 text-lg",
				onClick: () => setOpen(false),
				children: link.label
			}, link.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/create",
				className: "btn btn-primary mt-2",
				onClick: () => setOpen(false),
				children: "Begin a page"
			})]
		}) : null]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-6 border-t border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { lockup: true }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 flex items-center gap-2 text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "size-3.5 text-[#c6ae8a]" }), "A soft place to keep their light close."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://gentlewick.com",
					className: "footer-link mt-4 inline-block",
					children: "gentlewick.com"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "mailto:hello@gentlewick.com",
					className: "footer-link mt-1 block",
					children: "hello@gentlewick.com"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Footer",
				className: "flex flex-wrap gap-x-6 gap-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/memorials",
						className: "footer-link",
						children: "The lights"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						className: "footer-link",
						children: "About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/create",
						className: "footer-link",
						children: "Begin a page"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/account",
						className: "footer-link",
						children: "My memories"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "footer-link",
						children: "Privacy"
					})
				]
			})]
		})
	});
}
var styles_default = "/assets/styles-DEGlitHD.css";
function publicHost(value) {
	const host = String(value ?? "").split(",")[0].trim().split(":")[0].toLowerCase();
	if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) return "";
	if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
	if (host === "vercel.app" || host.endsWith(".vercel.app") || host === "vercel.com" || host.endsWith(".vercel.com")) return "";
	return host;
}
var Route$13 = createRootRoute({
	head: ({ matches }) => {
		const path = matches.at(-1)?.pathname ?? "/";
		const url = `https://gentlewick.com${path === "/" ? "" : path}`;
		const host = publicHost(void 0);
		const xBanner = host ? `https://${host}/x-banner.jpg` : "";
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{ title: "Gentlewick" },
				{
					name: "description",
					content: "A soft place to remember the ones who left paw prints. Keep their name, their photograph, and a candle you can light whenever you come back."
				},
				{
					name: "theme-color",
					content: "#F7F3EC"
				},
				{
					property: "og:site_name",
					content: "Gentlewick"
				},
				{
					property: "og:url",
					content: url
				},
				...xBanner ? [{
					property: "x:game:image",
					content: xBanner
				}] : []
			],
			links: [
				{
					rel: "canonical",
					href: url
				},
				{
					rel: "icon",
					type: "image/svg+xml",
					href: "/favicon.svg"
				},
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..700&family=Outfit:wght@300..600&display=swap"
				},
				{
					rel: "manifest",
					href: "/manifest.webmanifest"
				},
				{
					rel: "apple-touch-icon",
					href: "/apple-touch-icon.png"
				}
			]
		};
	},
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	}),
	notFoundComponent: NotFound
});
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-5 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Gentlewick"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl",
				children: "This page is quiet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Nothing is kept at this address."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "btn btn-primary mt-8",
				children: "Back home"
			})
		]
	}) });
}
var $$splitComponentImporter$12 = () => import("./routes-CZ-qhPqs.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Gentlewick — The Starlight Lantern Meadow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./about-9cKE6DaL.mjs");
var Route$11 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./account-CR-J6Uqu.mjs");
var Route$10 = createFileRoute("/account")({
	head: () => ({ meta: [{ title: "My memories — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./candle-BhqtjtHY.mjs");
var Route$9 = createFileRoute("/candle")({
	head: () => ({ meta: [{ title: "The candle — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./create-BOjtXPZr.mjs");
var Route$8 = createFileRoute("/create")({
	head: () => ({ meta: [{ title: "Begin a page — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./keep-C1mOaVI-.mjs");
var Route$7 = createFileRoute("/keep")({
	validateSearch: (search) => ({ c: typeof search.c === "string" ? search.c : "" }),
	head: () => ({ meta: [{ title: "A shared remembrance — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./memorials-P4K04WcS.mjs");
var Route$6 = createFileRoute("/memorials")({
	head: () => ({ meta: [{ title: "The lights — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./migrate-B-xh5-uy.mjs");
var Route$5 = createFileRoute("/migrate")({
	head: () => ({ meta: [{ title: "Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./order-Di6lNKTW.mjs");
var Route$4 = createFileRoute("/order")({
	validateSearch: (search) => parseOrderSearch(search),
	head: () => ({ meta: [{ title: "Hold a candle — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./orders-CU-HRzDZ.mjs");
var Route$3 = createFileRoute("/orders")({
	head: () => ({ meta: [{ title: "Held candles — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./privacy-DNkZfe-x.mjs");
var Route$2 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_slug-IrpA2ipD.mjs");
var Route$1 = createFileRoute("/memorial/$slug")({
	head: () => ({ meta: [{ title: "A light — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_slug-DJ9le0vZ.mjs");
var Route = createFileRoute("/night/$slug")({
	head: () => ({ meta: [{ title: "A quiet night — Gentlewick" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$12.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$13
	}),
	AboutRoute: Route$11.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$13
	}),
	AccountRoute: Route$10.update({
		id: "/account",
		path: "/account",
		getParentRoute: () => Route$13
	}),
	CandleRoute: Route$9.update({
		id: "/candle",
		path: "/candle",
		getParentRoute: () => Route$13
	}),
	CreateRoute: Route$8.update({
		id: "/create",
		path: "/create",
		getParentRoute: () => Route$13
	}),
	KeepRoute: Route$7.update({
		id: "/keep",
		path: "/keep",
		getParentRoute: () => Route$13
	}),
	MemorialsRoute: Route$6.update({
		id: "/memorials",
		path: "/memorials",
		getParentRoute: () => Route$13
	}),
	MigrateRoute: Route$5.update({
		id: "/migrate",
		path: "/migrate",
		getParentRoute: () => Route$13
	}),
	OrderRoute: Route$4.update({
		id: "/order",
		path: "/order",
		getParentRoute: () => Route$13
	}),
	OrdersRoute: Route$3.update({
		id: "/orders",
		path: "/orders",
		getParentRoute: () => Route$13
	}),
	PrivacyRoute: Route$2.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$13
	}),
	MemorialSlugRoute: Route$1.update({
		id: "/memorial/$slug",
		path: "/memorial/$slug",
		getParentRoute: () => Route$13
	}),
	NightSlugRoute: Route.update({
		id: "/night/$slug",
		path: "/night/$slug",
		getParentRoute: () => Route$13
	})
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { priceFor as A, withLight as B, isLitToday as C, nightsKept as D, makeOrderId as E, setPhoto as F, sizeBy as I, speciesLabel as L, releaseOrder as M, removeMemorial as N, persist as O, scentBy as P, speciesLine as R, formatWhen as S, loadStore as T, decodeShare as _, Route$7 as a, euro as b, Wordmark as c, SIZES as d, SPECIES as f, copyText as g, allMemorials as h, Route$4 as i, readPhotoFile as j, photoOf as k, BOX_NOTE as l, addMemorial as m, Route as n, Shell as o, WICKS as p, Route$1 as r, Paw as s, router_exports as t, SCENTS as u, departedThisMonth as v, lightsOf as w, findMemorial as x, encodeShare as y, wickBy as z };
