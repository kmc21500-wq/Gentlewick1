import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Shell } from "./router-kr3dZ8tz.mjs";
import { t as Flame } from "./flame-B9txz86U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C4slqE0m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [lit, setLit] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "sanctuary-home",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sanctuary-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sanctuary-stars",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sanctuary-firefly firefly-one" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sanctuary-firefly firefly-two" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sanctuary-firefly firefly-three" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sanctuary-hero-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "sanctuary-eyebrow",
								children: "A place where love keeps growing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
								"The Starlight",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Lantern Meadow"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "sanctuary-subtitle",
								children: "Where the sun never sets on the trails we walked."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "sanctuary-intro",
								children: "For every paw, wing, and little soul that made our world brighter — their light has a place here."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sanctuary-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/create",
									className: "sanctuary-button sanctuary-button-gold",
									children: "✦ Release a Lantern"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#garden",
									className: "sanctuary-button sanctuary-button-outline",
									children: "Walk into the garden ↓"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "sanctuary-light-note",
								"aria-live": "polite",
								children: ["✧ ", lit ? "A little light is glowing beside you." : "You can stay a while. There is no rush."]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landscape, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sanctuary-hero-bottom",
						"aria-hidden": "true",
						children: ["Take a breath ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "garden",
				className: "sanctuary-garden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sanctuary-section-heading",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sanctuary-overline",
								children: "A living sanctuary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
								"Love doesn't disappear.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "It finds somewhere to bloom." })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Memories are not still. They run through the grass, rest in the sunlight, and flutter among the flowers." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sanctuary-garden-art",
						role: "img",
						"aria-label": "A peaceful twilight meadow with glowing lanterns, rolling hills, and wildflowers",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "garden-moon" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "garden-hill garden-hill-back" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "garden-hill garden-hill-front" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "garden-lantern lantern-a" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "garden-lantern lantern-b" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "garden-lantern lantern-c" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "garden-flower flower-a",
								children: "✿"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "garden-flower flower-b",
								children: "✾"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "garden-flower flower-c",
								children: "✿"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "garden-flower flower-d",
								children: "✾"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sanctuary-garden-caption",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Every memory is its own light.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Every love belongs."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/memorials",
							className: "sanctuary-text-link",
							children: "Explore the sanctuary ↗"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sanctuary-ways",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sanctuary-section-heading sanctuary-heading-compact",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sanctuary-overline",
						children: "Whenever you need"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Small ways to feel close." })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sanctuary-ways-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "sanctuary-way-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sanctuary-way-icon",
									children: "✧"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Keep their light" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create a little lantern with their name, their story, and the love that remains." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/create",
									className: "sanctuary-text-link",
									children: "Create a lantern ↗"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "sanctuary-way-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sanctuary-way-icon",
									children: "❀"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Visit when you wish" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A gentle place to return to. No dates to remember and no words you have to find." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/memorials",
									className: "sanctuary-text-link",
									children: "Visit your memories ↗"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "sanctuary-way-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sanctuary-way-icon",
									children: "♡"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Share the love" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Keep a remembrance close or share its words with someone who understands." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									className: "sanctuary-text-link",
									children: "About Gentlewick ↗"
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sanctuary-last-light",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sanctuary-last-light-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sanctuary-last-light-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
							lit,
							size: "lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sanctuary-overline",
							children: "A moment for them"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: lit ? "Your little light is glowing." : "If you want, light a little lantern." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: lit ? "Stay as long as you need. The night can be gentle." : "No name needed. No story to tell. Just a moment of warmth." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "sanctuary-button sanctuary-button-gold",
							type: "button",
							onClick: () => setLit(true),
							disabled: lit,
							children: lit ? "Lantern glowing" : "Light a lantern"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/create",
							className: "sanctuary-quiet-link",
							children: "Make a lantern in their name"
						})
					]
				})]
			})
		]
	}) });
}
function Landscape() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "sanctuary-landscape",
		viewBox: "0 0 1440 620",
		preserveAspectRatio: "xMidYMid slice",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "sky",
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#090e1d" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: ".5",
						stopColor: "#19243a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: ".78",
						stopColor: "#59404a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "#b47b58"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: "glow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					stopColor: "#d7a174",
					stopOpacity: ".6"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#a56e67",
					stopOpacity: "0"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "1440",
				height: "620",
				fill: "url(#sky)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "1440",
				height: "620",
				fill: "url(#glow)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fill: "#f5e6ce",
				opacity: ".72",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "136",
						cy: "96",
						r: "2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "245",
						cy: "58",
						r: "1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "356",
						cy: "130",
						r: "1.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "474",
						cy: "70",
						r: "1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "616",
						cy: "118",
						r: "1.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "764",
						cy: "55",
						r: "1.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "915",
						cy: "102",
						r: "1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "1044",
						cy: "63",
						r: "2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "1168",
						cy: "130",
						r: "1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "1304",
						cy: "83",
						r: "1.5"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "1080",
				cy: "140",
				r: "44",
				fill: "#f2dfbd",
				opacity: ".8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0 400Q180 310 360 390T700 382T1050 370T1440 355V620H0Z",
				fill: "#263847"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0 460Q170 385 380 450T760 430T1110 440T1440 405V620H0Z",
				fill: "#20352e"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0 520Q220 445 440 500T850 490T1250 500T1440 470V620H0Z",
				fill: "#111e1a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				stroke: "#a4ad84",
				strokeWidth: "2",
				opacity: ".45",
				fill: "none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M150 620Q170 500 126 450M174 620Q188 520 220 465M250 620Q235 500 260 440M410 620Q435 510 400 460M490 620Q505 500 540 460M650 620Q635 510 680 455M800 620Q825 520 795 440M950 620Q935 520 980 465M1120 620Q1140 510 1105 455M1290 620Q1310 510 1280 455" })
			})
		]
	});
}
//#endregion
export { Home as component };
