import { i as __toESM } from "./_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link, x as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { A as photoOf, C as formatWhen, I as setPhoto, M as readPhotoFile, O as nightsKept, P as removeMemorial, R as speciesLabel, S as findMemorial, T as lightsOf, V as withLight, _ as copyText, b as encodeShare, o as Shell, r as Route$1, s as Paw, w as isLitToday, y as departedThisMonth, z as speciesLine } from "./_ssr/router-CChJQlW0.mjs";
import { t as useLedger } from "./_ssr/use-ledger-Bsi3CEwd.mjs";
import { t as Portrait } from "./_ssr/portrait-Dq9OD0po.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-1lCNsSO8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function loadCardPhoto(photo) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = () => reject(/* @__PURE__ */ new Error("photo"));
		image.src = photo;
	});
}
function wrapCanvasText(ctx, text, maxWidth) {
	const words = text.trim().split(/\s+/).filter(Boolean);
	const lines = [];
	let line = "";
	for (const word of words) {
		const candidate = line ? `${line} ${word}` : word;
		if (ctx.measureText(candidate).width > maxWidth && line) {
			lines.push(line);
			line = word;
		} else line = candidate;
	}
	if (line) lines.push(line);
	return lines;
}
async function createMemorialCardBlob(memorial, photo) {
	const canvas = document.createElement("canvas");
	canvas.width = 1080;
	canvas.height = 1350;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("canvas");
	ctx.fillStyle = "#f7f3ec";
	ctx.fillRect(0, 0, 1080, 1350);
	ctx.strokeStyle = "#d8c8ae";
	ctx.lineWidth = 3;
	ctx.strokeRect(38, 38, 1004, 1274);
	ctx.strokeStyle = "#e7dccb";
	ctx.lineWidth = 1.5;
	ctx.strokeRect(58, 58, 964, 1234);
	ctx.textAlign = "center";
	ctx.fillStyle = "#6b827f";
	ctx.font = "500 24px Arial, sans-serif";
	ctx.fillText("GENTLEWICK  ·  IN LOVING MEMORY", 540, 150);
	ctx.strokeStyle = "#c7a46c";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(420, 190);
	ctx.lineTo(510, 190);
	ctx.moveTo(570, 190);
	ctx.lineTo(660, 190);
	ctx.stroke();
	const circleX = 540, circleY = 430, radius = 190;
	ctx.save();
	ctx.beginPath();
	ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
	ctx.clip();
	ctx.fillStyle = "#efe6d6";
	ctx.fillRect(350, 240, 380, 380);
	if (photo) {
		const image = await loadCardPhoto(photo);
		const scale = Math.max(380 / image.width, 380 / image.height);
		const w = image.width * scale, h = image.height * scale;
		ctx.drawImage(image, circleX - w / 2, circleY - h / 2, w, h);
	} else {
		ctx.fillStyle = "#3f6d82";
		ctx.font = "96px Georgia, serif";
		ctx.fillText(memorial.name.trim().charAt(0).toUpperCase() || "·", circleX, 462);
	}
	ctx.restore();
	ctx.strokeStyle = "#d4b16a";
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.arc(circleX, circleY, 197, 0, Math.PI * 2);
	ctx.stroke();
	const nameSize = Math.min(76, Math.max(42, 1e3 / Math.max(1, memorial.name.length) * 2.5));
	ctx.fillStyle = "#2a2622";
	ctx.font = `600 ${nameSize}px Georgia, serif`;
	ctx.fillText(memorial.name, 540, 720, 900);
	const dates = [memorial.years, memorial.departed].filter(Boolean).join("  ·  ");
	ctx.fillStyle = "#6f675f";
	ctx.font = "30px Arial, sans-serif";
	if (dates) ctx.fillText(dates, 540, 780, 900);
	if (memorial.dedication.trim()) {
		ctx.fillStyle = "#433d38";
		ctx.font = "italic 34px Georgia, serif";
		const lines = wrapCanvasText(ctx, memorial.dedication.trim(), 790).slice(0, 4);
		const startY = 850 - (lines.length - 1) * 22;
		lines.forEach((line, index) => ctx.fillText(line, 540, startY + index * 54));
	}
	ctx.fillStyle = "#c9a15b";
	ctx.beginPath();
	ctx.moveTo(540, 1075);
	ctx.bezierCurveTo(565, 1040, 568, 1024, 540, 990);
	ctx.bezierCurveTo(515, 1026, 512, 1045, 540, 1075);
	ctx.fill();
	ctx.fillStyle = "#fff6e4";
	ctx.beginPath();
	ctx.moveTo(540, 1062);
	ctx.bezierCurveTo(551, 1044, 550, 1036, 540, 1022);
	ctx.bezierCurveTo(530, 1037, 529, 1048, 540, 1062);
	ctx.fill();
	ctx.fillStyle = "#e9dfcf";
	ctx.fillRect(510, 1080, 60, 90);
	ctx.strokeStyle = "#d4b16a";
	ctx.lineWidth = 2;
	ctx.strokeRect(510, 1080, 60, 90);
	ctx.fillStyle = "#6b827f";
	ctx.font = "24px Arial, sans-serif";
	ctx.fillText("A little light. A lifetime of love.", 540, 1220);
	ctx.fillStyle = "#6f675f";
	ctx.font = "22px Arial, sans-serif";
	ctx.fillText("gentlewick.com", 540, 1260);
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("export")), "image/png");
	});
}
function downloadMemorialCard(blob, slug) {
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `${slug || "memorial"}-keepsake.png`;
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 3e4);
}
function MemorialPage() {
	const { slug } = Route$1.useParams();
	const navigate = useNavigate();
	const { data, ready, error, commit } = useLedger();
	const [whisper, setWhisper] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)("");
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const [photoError, setPhotoError] = (0, import_react.useState)(null);
	const [cardMessage, setCardMessage] = (0, import_react.useState)("");
	const [cardBusy, setCardBusy] = (0, import_react.useState)(false);
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
	async function makeCard(action) {
		if (cardBusy) return;
		setCardBusy(true);
		setCardMessage("");
		try {
			const blob = await createMemorialCardBlob(memorial, photo);
			if (action === "share") {
				const file = new File([blob], `${memorial.slug}-keepsake.png`, { type: "image/png" });
				if (navigator.share && navigator.canShare?.({ files: [file] })) try {
					await navigator.share({
						files: [file],
						title: `${memorial.name} — Gentlewick`,
						text: "A little light. A lifetime of love."
					});
					setCardMessage("Your keepsake was shared.");
					return;
				} catch (err) {
					if (err instanceof Error && err.name === "AbortError") {
						setCardMessage("Sharing was cancelled.");
						return;
					}
				}
				downloadMemorialCard(blob, memorial.slug);
				setCardMessage("Image saved to your downloads. You can share it from there.");
			} else {
				downloadMemorialCard(blob, memorial.slug);
				setCardMessage("Your keepsake image is ready to save or print.");
			}
		} catch {
			setCardMessage("We couldn't make the image just now. Please try again.");
		} finally {
			setCardBusy(false);
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
								className: "btn btn-primary",
								disabled: cardBusy,
								onClick: () => void makeCard("download"),
								children: cardBusy ? "Making image…" : "Download keepsake"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-ghost",
								disabled: cardBusy,
								onClick: () => void makeCard("share"),
								children: "Share memorial card"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: () => void share(),
								children: "Share page link"
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
						"aria-live": "polite",
						children: copied
					}) : null,
					cardMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-sea-deep",
						"aria-live": "polite",
						children: cardMessage
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
