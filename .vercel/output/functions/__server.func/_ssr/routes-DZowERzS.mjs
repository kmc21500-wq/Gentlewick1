import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Shell, s as Paw, u as SANDY } from "./router-Dy3D-o78.mjs";
import { t as Flame } from "./flame-B9txz86U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DZowERzS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WELCOME = "gentlewick.welcome";
function todayKey() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function welcomeIsLit() {
	try {
		return localStorage.getItem(WELCOME) === todayKey();
	} catch {
		return false;
	}
}
function Home() {
	const [nightLit, setNightLit] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setNightLit(welcomeIsLit());
	}, []);
	function light() {
		setNightLit(true);
		try {
			localStorage.setItem(WELCOME, todayKey());
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-8 px-5 py-8 md:grid-cols-2 md:gap-10 md:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "order-1 md:order-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero.jpg",
					alt: "A lit candle in a frosted glass jar, sitting on a pale windowsill.",
					className: "aspect-4/5 w-full rounded-3xl object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "mt-3 text-sm text-muted",
					children: "A lit candle in frosted glass, on the windowsill."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-2 md:order-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "For dogs, cats, and the others who chose you"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-3 text-[#d4b16a]",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-current" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-current" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-serif text-5xl text-balance md:text-6xl",
						children: "For the ones who left paw prints"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-4 flex items-end gap-2 text-[#c6ae8a]",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "size-7 -rotate-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "size-6 translate-y-1 rotate-6" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted",
						children: "For the evenings you feel lost."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lede mt-5",
						children: "A soft place to keep their light close. When you are ready, light a candle. Their glow will wait for you — soft, familiar, and close."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-primary",
							onClick: light,
							disabled: nightLit,
							children: nightLit ? "Candle is lit" : "Light a candle for them"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/create",
							className: "btn btn-ghost",
							children: "Begin their page"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm text-muted",
						children: nightLit ? "It will wait here today. Begin their page when you want the name kept." : "Nothing to join. The page is free."
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-5 py-12 md:py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-6 md:grid-cols-3",
					children: [
						"The lead, still by the door.",
						"The bowl you have not moved.",
						"The hour the house goes quiet."
					].map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "font-serif text-2xl text-balance md:text-3xl",
						children: line
					}, line))
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-5 py-16 md:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					className: "aspect-[9/16] w-full rounded-3xl bg-cream object-cover",
					controls: true,
					playsInline: true,
					preload: "metadata",
					poster: "/images/film-poster.jpg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						src: "/film.mp4",
						type: "video/mp4"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "A short film"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-serif text-4xl text-balance md:text-5xl",
						children: "Love finds another way to shine."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lede mt-5",
						children: "Forty-five quiet seconds. A photograph, a candle, and a page you can come back to. Press play when you want it."
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-16 md:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "What they have meant"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 max-w-xl font-serif text-4xl text-balance md:text-5xl",
					children: "Old feelings. Not rules."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lede mt-5 max-w-xl",
					children: "A paw print is a step that stayed. People have read their animals this way for a long time. A page here does not ask yours to match a story."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-12 grid gap-10 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-3xl",
								children: "The dog"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted",
								children: "Loyalty that waits by the door. In Ireland the hound belonged to the house. Elsewhere the same feeling was left at a gate, or a station, long after the person was gone."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-3xl",
								children: "The cat"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted",
								children: "The quiet keeper of a room. Old household stories put the cat by the hearth, not as a riddle, but as the one who made a place feel kept."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-3xl",
								children: "The bird"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted",
								children: "A passing at the window. On these islands a bird at the glass was read as news. Not a verdict. Just a message that something had moved."
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "band",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/paw.jpg",
					alt: "A close view of a dog’s paw resting on cream linen.",
					className: "aspect-4/5 w-full rounded-3xl object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "The first light"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "mt-4 size-5 text-[#c6ae8a]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-serif text-5xl",
						children: SANDY.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted",
						children: [
							SANDY.years,
							" · ",
							SANDY.departed
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
						className: "pull mt-8",
						children: SANDY.dedication
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-muted",
						children: "Gentlewick began as a place for her light to wait. Seventeen years in the house, and then a room that went quiet. Her face is not invented here. A page like hers starts with a name."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/memorial/$slug",
						params: { slug: "sandy" },
						className: "btn btn-primary mt-8",
						children: "Open her page"
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-16 md:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "What a page keeps"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-serif text-4xl text-balance md:text-5xl",
						children: "A name. The years. The evenings you come back."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-12 grid gap-10 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-3xl",
								children: "Their name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted",
								children: "A photograph if you have one today. A line under the name, or none. You can begin with only the name."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-3xl",
								children: "The evening"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted",
								children: "Light the candle on a hard night or an ordinary one. The day is kept. You do not have to write."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-line pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-3xl",
								children: "The words"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted",
								children: "Leave a sentence if you want. A shared link carries the words. The photograph stays with you."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/create",
						className: "btn btn-primary",
						children: "Begin a page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/memorials",
						className: "btn btn-ghost",
						children: "See the lights"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/night-flame.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-40"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "night-veil relative px-5 py-24 text-center text-night-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-xl justify-items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
							lit: nightLit,
							size: "lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-6 font-serif text-4xl md:text-5xl",
							children: nightLit ? "The candle is lit" : "If a name is too much tonight"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-lg text-cream",
							children: nightLit ? "It will wait. Begin their page when you want the name kept." : "Light this one. It does not ask who it is for."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-light mt-8",
							onClick: light,
							disabled: nightLit,
							children: nightLit ? "Candle is lit" : "Light a candle"
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-5 pt-16 pb-6 md:pt-24 md:pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-4xl",
					children: "Before you begin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-8",
					children: [
						["Does a page cost anything?", "No. The name, the evenings, and the candle you light here stay free."],
						["Where does the photograph go?", "It stays in this browser. Sharing copies the words, not the picture."],
						["Can there be more than one?", "Yes. Dog, cat, bird, or someone else. A house can keep several lights."],
						["Will you invent their face?", "No. Without a photograph, the page shows their initial."],
						["What if I am not ready to write?", "Light the candle and leave. The name is enough. The words can wait."]
					].map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-serif text-2xl",
							children: q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-2 text-muted",
							children: a
						})]
					}, q))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-muted",
					children: "There is no right way to remember. No words required. You can always come back."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-end gap-2",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuietCandle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paw, { className: "mb-1 size-4 text-[#c9a15b]" })]
				})
			]
		})
	] }) });
}
function QuietCandle() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 72",
		className: "h-16 w-10",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 16c2.4 3.4 6.4 4.6 6.4 8.6 0 3.6-2.9 6-6.4 6s-6.4-2.4-6.4-6c0-4 4-5.2 6.4-8.6z",
				fill: "#f3c56b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 21c1.1 1.6 2.6 2.2 2.6 4 0 1.5-1.2 2.5-2.6 2.5s-2.6-1-2.6-2.5c0-1.8 1.5-2.4 2.6-4z",
				fill: "#fff6e4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 30.5v7",
				stroke: "#c9a15b",
				strokeWidth: "1.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "38",
				width: "20",
				height: "26",
				rx: "4",
				stroke: "#c6ae8a",
				strokeWidth: "1.25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M14 47h20",
				stroke: "#e4d5c0",
				strokeWidth: "1"
			})
		]
	});
}
function Heart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-3.5",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 19.5s-6.2-3.8-6.2-8.1A3.4 3.4 0 0 1 12 8.6a3.4 3.4 0 0 1 6.2 2.8c0 4.3-6.2 8.1-6.2 8.1z" })
	});
}
//#endregion
export { Home as component };
