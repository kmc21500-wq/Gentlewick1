import { i as __toESM } from "./_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link, x as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { A as photoOf, C as formatWhen, I as setPhoto, M as readPhotoFile, O as nightsKept, P as removeMemorial, R as speciesLabel, S as findMemorial, T as lightsOf, V as withLight, _ as copyText, b as encodeShare, o as Shell, r as Route$1, s as Paw, w as isLitToday, y as departedThisMonth, z as speciesLine } from "./_ssr/router-Dy3D-o78.mjs";
import { t as useLedger } from "./_ssr/use-ledger-Bsi3CEwd.mjs";
import { t as Portrait } from "./_ssr/portrait-Dq9OD0po.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-gfP7soT0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MemorialPage() {
	const { slug } = Route$1.useParams();
	const navigate = useNavigate();
	const { data, ready, error, commit } = useLedger();
	const [whisper, setWhisper] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)("");
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const [photoError, setPhotoError] = (0, import_react.useState)(null);
	if (!ready || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-5 py-20 text-center text-muted",
		children: "A moment."
	}) });
	const memorial = findMemorial(data, slug);
	if (!memorial) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-5 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: "This light is not on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Pages you make stay in this browser, unless you shared the words."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/memorials",
				className: "btn btn-primary mt-8",
				children: "The lights"
			})
		]
	}) });
	const lights = lightsOf(data, memorial.id);
	const photo = photoOf(data, memorial);
	const lit = isLitToday(lights);
	const nights = nightsKept(lights);
	const words = [...lights].reverse().filter((light) => light.whisper);
	const month = departedThisMonth(memorial.departed);
	function light(text) {
		commit((current) => withLight(current, memorial.id, text));
		if (text.trim()) setWhisper("");
	}
	async function onPhoto(file) {
		if (!file) return;
		try {
			const next = await readPhotoFile(file);
			setPhotoError(null);
			commit((current) => setPhoto(current, memorial.id, next));
		} catch (err) {
			setPhotoError(err instanceof Error && err.message === "size" ? "That photograph is too heavy. Try a smaller one." : "That file could not be used as a photograph.");
		}
	}
	async function share() {
		const path = memorial.house ? `${window.location.origin}/memorial/${memorial.slug}` : `${window.location.origin}/keep?c=${encodeURIComponent(encodeShare(memorial))}`;
		try {
			await copyText(path);
			setCopied(memorial.house ? "Link copied." : "Link copied. The name, dates, and dedication travel; the photograph stays here.");
		} catch {
			setCopied("The link could not be copied. Please try your browser’s share or copy option.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/memorials",
			className: "text-sm text-muted",
			children: "All lights"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid items-start gap-8 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: memorial.house ? "The first light" : "A private light"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-4xl text-balance sm:text-5xl md:text-6xl",
					children: memorial.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "mt-4 size-5 text-[#c6ae8a]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg text-muted",
					children: [memorial.years, memorial.departed].filter(Boolean).join(" · ")
				}),
				month ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sea-deep",
					children: "This month holds their date."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center rounded-3xl bg-cream px-4 py-8 sm:mt-8 sm:py-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
						name: memorial.name,
						photo,
						lit
					})
				}),
				memorial.dedication ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 font-serif text-2xl text-balance md:text-3xl",
					children: memorial.dedication
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-muted",
					children: "No words yet. The name is enough."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap items-center gap-3",
					children: [lit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-sea-deep",
						children: "Candle is lit."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-primary w-full sm:w-auto",
						onClick: () => light(""),
						children: "Light a candle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/night/$slug",
						params: { slug: memorial.slug },
						className: "btn btn-ghost",
						children: "The quiet night"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: nights === 0 ? "Their glow will wait." : nights === 1 ? "Lit once." : `Lit on ${nights} evenings.`
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "grid content-start gap-4 lg:pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							speciesLabel(memorial.species),
							" · ",
							speciesLine(memorial.species),
							" · ",
							lit ? "Candle is lit today" : "Not lit today",
							" · ",
							nights === 0 ? "No evenings kept yet" : nights === 1 ? "One evening kept" : `${nights} evenings kept`
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "panel grid gap-3 p-4 sm:p-6",
						onSubmit: (event) => {
							event.preventDefault();
							if (!whisper.trim()) return;
							light(whisper);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl",
								children: "This evening"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "A few words, if you want. They stay on this device."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "A few words"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: whisper,
									maxLength: 180,
									onChange: (event) => setWhisper(event.target.value),
									placeholder: "They stay on this device."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "btn btn-ghost",
								disabled: !whisper.trim(),
								children: "Leave this here"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: "Words left here"
						}), words.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-4",
							children: words.slice(0, 8).map((lightNote) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-line pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: lightNote.whisper }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: formatWhen(lightNote.at)
								})]
							}, lightNote.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: "Nothing written yet. The light is enough. Come back when you want the page to remember the day."
						})]
					}),
					memorial.house ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: "Why this page exists"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: "Sandy McCann was here for seventeen years. In March 2024 the room went quiet. This light was the first one. Her photograph is not a stand-in. Add the real one when you are ready."
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: () => void share(),
								children: "Share this light"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "btn btn-ghost",
								children: [photo ? "Change photograph" : "Add their photograph", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*",
									className: "sr-only",
									onChange: (e) => {
										onPhoto(e.target.files?.[0]);
										e.currentTarget.value = "";
									}
								})]
							}),
							photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: () => commit((current) => setPhoto(current, memorial.id, null)),
								children: "Remove photograph"
							}) : null
						]
					}),
					copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-sea-deep",
						children: copied
					}) : null,
					photoError || error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-sea-deep",
						children: photoError || error
					}) : null,
					!memorial.house ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Anyone with the link can see their name, species, dates, and dedication. Their photograph and candle history stay here."
					}) : null,
					!memorial.house ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: confirmDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Remove this page from this device? The words here will go with it." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-primary",
								onClick: () => {
									commit((current) => removeMemorial(current, memorial.id));
									navigate({ to: "/memorials" });
								},
								children: "Remove the page"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: () => setConfirmDelete(false),
								children: "Keep it"
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm text-muted",
						onClick: () => setConfirmDelete(true),
						children: "Remove this page"
					}) }) : null
				]
			})]
		})]
	}) });
}
//#endregion
export { MemorialPage as component };
