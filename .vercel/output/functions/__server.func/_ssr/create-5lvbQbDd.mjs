import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as speciesLine, N as readPhotoFile, g as addMemorial, m as SPECIES, o as Shell } from "./router-CLcXLmwN.mjs";
import { t as useLedger } from "./use-ledger-M1_g4rKC.mjs";
import { t as Portrait } from "./portrait-Dq9OD0po.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-5lvbQbDd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Create() {
	const navigate = useNavigate();
	const { data, ready, error, commit } = useLedger();
	const [name, setName] = (0, import_react.useState)("");
	const [years, setYears] = (0, import_react.useState)("");
	const [departed, setDeparted] = (0, import_react.useState)("");
	const [dedication, setDedication] = (0, import_react.useState)("");
	const [species, setSpecies] = (0, import_react.useState)("dog");
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const [formError, setFormError] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function onPhoto(file) {
		if (!file) return;
		setFormError(null);
		try {
			setPhoto(await readPhotoFile(file));
		} catch (err) {
			setPhoto(null);
			setFormError(err instanceof Error && err.message === "size" ? "That photograph is too heavy. Try a smaller one." : "That file could not be used as a photograph.");
		}
	}
	function onSubmit(event) {
		event.preventDefault();
		if (!data) return;
		const trimmed = name.trim();
		if (!trimmed) {
			setFormError("They need a name.");
			return;
		}
		setSaving(true);
		const next = addMemorial(data, {
			name: trimmed,
			years,
			departed,
			dedication,
			species,
			photo
		});
		const created = next.memorials[0];
		if (!commit(() => next) || !created) {
			setSaving(false);
			return;
		}
		navigate({
			to: "/memorial/$slug",
			params: { slug: created.slug }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-6xl items-start gap-10 px-5 py-14 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Create"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-serif text-5xl text-balance",
				children: "A page for their light"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "Take your time. Start with their name, and add anything else you feel like sharing."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-2xl border border-line bg-white/50 p-4",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: "Your page is taking shape"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [[
								name.trim().length > 0,
								years.trim().length > 0 || departed.trim().length > 0 || dedication.trim().length > 0,
								photo !== null
							].filter(Boolean).length, " of 3"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-1.5 overflow-hidden rounded-full bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-[#d4b16a] transition-all",
							style: { width: `${[
								name.trim().length > 0,
								years.trim().length > 0 || departed.trim().length > 0 || dedication.trim().length > 0,
								photo !== null
							].filter(Boolean).length / 3 * 100}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "Everything except their name is optional."
					})
				]
			}),
			!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-muted",
				children: "A moment."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 grid gap-5",
				onSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 rounded-2xl border border-line p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "kicker",
									children: "First"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-2xl",
									children: "Their name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "The name you want to remember them by."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Their name" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: name,
										maxLength: 60,
										onChange: (e) => {
											setName(e.target.value);
											setFormError(null);
										},
										placeholder: "Sandy",
										required: true,
										autoComplete: "off"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted",
										children: [name.length, "/60"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "font-medium",
									children: "Who they were"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 grid grid-cols-2 gap-2",
									children: SPECIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "choice",
										"aria-pressed": species === item.id,
										onClick: () => setSpecies(item.id),
										children: item.label
									}, item.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted",
									children: speciesLine(species)
								})
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 rounded-2xl border border-line p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "kicker",
									children: "Next"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-2xl",
									children: "A little about them"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Dates, a favourite memory, or just a few words. Leave anything blank if it doesn't feel right."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A line under the name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: years,
									maxLength: 80,
									onChange: (e) => setYears(e.target.value),
									placeholder: "17 years of loyalty"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "When they left" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: departed,
									maxLength: 40,
									onChange: (e) => setDeparted(e.target.value),
									placeholder: "March 2024"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A few words that matter" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: dedication,
									maxLength: 400,
									onChange: (e) => setDedication(e.target.value),
									placeholder: "Loyal heart. Gentle soul. Forever loved."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 rounded-2xl border border-line p-4 sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "kicker",
								children: "Whenever you're ready"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl",
								children: "A photograph"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Optional — you can create the page without one."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Their photograph, if you have it" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "btn btn-ghost w-fit",
									children: [photo ? "Choose a different photograph" : "Add a photograph", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
										className: "sr-only",
										onChange: (e) => {
											onPhoto(e.target.files?.[0]);
											e.currentTarget.value = "";
										}
									})]
								}),
								photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo,
									alt: "",
									className: "mt-2 size-28 rounded-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "mt-2 text-sm text-muted underline underline-offset-4",
									onClick: () => setPhoto(null),
									children: "Remove photograph"
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Optional. A letter will hold the place if you do not have a photograph."
								})
							]
						})]
					}),
					formError || error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sea-deep",
						children: formError || error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn btn-primary",
						disabled: saving,
						children: "Keep this page"
					})
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "lg:sticky lg:top-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-cream px-6 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
							name: name.trim() || "Their name",
							photo,
							lit: name.trim().length > 0
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 text-center font-serif text-4xl text-balance",
						children: name.trim() || "Their name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-muted",
						children: [years.trim(), departed.trim()].filter(Boolean).join(" · ") || "A line under the name will sit here"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center font-serif text-xl text-balance",
						children: dedication.trim() || "A few words that matter."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 grid gap-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You can keep only a name, and add the rest later." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Your page is saved in this browser only—not online or backed up." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Clearing browser data or using another device can make it unavailable." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A share link carries the written details, never the photograph." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The candle on the page is free. Come back whenever you need to." })
				]
			})]
		})]
	}) });
}
//#endregion
export { Create as component };
