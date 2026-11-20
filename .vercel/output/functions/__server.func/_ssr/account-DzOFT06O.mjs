import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as makeBackup, V as validateBackup, o as Shell } from "./router-DnCH3ZYG.mjs";
import { t as useLedger } from "./use-ledger-Dwqk7oJ4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-DzOFT06O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUPABASE_URL = "";
var SUPABASE_KEY = "";
var SESSION_KEY = "gentlewick.cloud-session.v1";
function cloudConfigured() {
	return Boolean(SUPABASE_URL);
}
function getCloudSession() {
	try {
		const value = localStorage.getItem(SESSION_KEY);
		if (!value) return null;
		const session = JSON.parse(value);
		if (!session.access_token || !session.refresh_token || !session.user?.id) return null;
		return session;
	} catch {
		return null;
	}
}
function saveSession(session) {
	if (!session.expires_at && session.expires_in) session.expires_at = Math.floor(Date.now() / 1e3) + session.expires_in;
	localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
async function api(path, init = {}, token) {
	if (!cloudConfigured()) throw new Error("Cloud backup is not configured yet. The website owner must connect Supabase first.");
	const response = await fetch(`${SUPABASE_URL}${path}`, {
		...init,
		headers: {
			apikey: SUPABASE_KEY,
			"Content-Type": "application/json",
			...token ? { Authorization: `Bearer ${token}` } : {},
			...init.headers ?? {}
		}
	});
	const body = await response.text();
	let parsed = null;
	try {
		parsed = body ? JSON.parse(body) : null;
	} catch {
		parsed = body;
	}
	if (!response.ok) {
		const message = parsed && typeof parsed === "object" && "message" in parsed ? String(parsed.message) : `Cloud request failed (${response.status}).`;
		throw new Error(message);
	}
	return parsed;
}
async function signUp(email, password) {
	const result = await api("/auth/v1/signup", {
		method: "POST",
		body: JSON.stringify({
			email,
			password
		})
	});
	if (result?.access_token && result?.refresh_token && result?.user) saveSession(result);
	return result;
}
async function signIn(email, password) {
	const result = await api("/auth/v1/token?grant_type=password", {
		method: "POST",
		body: JSON.stringify({
			email,
			password
		})
	});
	saveSession(result);
	return result;
}
function signOut() {
	const session = getCloudSession();
	localStorage.removeItem(SESSION_KEY);
	if (session) api("/auth/v1/logout", { method: "POST" }, session.access_token).catch(() => void 0);
}
async function validSession() {
	let session = getCloudSession();
	if (!session) throw new Error("Please sign in first.");
	if (session.expires_at && session.expires_at * 1e3 < Date.now() + 6e4) {
		const refreshed = await api("/auth/v1/token?grant_type=refresh_token", {
			method: "POST",
			body: JSON.stringify({ refresh_token: session.refresh_token })
		});
		saveSession(refreshed);
		session = refreshed;
	}
	return session;
}
async function uploadCloudBackup(data) {
	const session = await validSession();
	if (new TextEncoder().encode(JSON.stringify(data)).length > 8388608) throw new Error("This cloud backup is larger than Gentlewick’s 8 MB backup limit. Download a device backup and remove/reduce large photos first.");
	await api("/rest/v1/gentlewick_backups?on_conflict=user_id", {
		method: "POST",
		headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
		body: JSON.stringify({
			user_id: session.user.id,
			data,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		})
	}, session.access_token);
}
async function downloadCloudBackup() {
	const session = await validSession();
	return (await api(`/rest/v1/gentlewick_backups?select=data,updated_at&user_id=eq.${encodeURIComponent(session.user.id)}&limit=1`, { method: "GET" }, session.access_token))?.[0] ?? null;
}
async function deleteCloudBackup() {
	const session = await validSession();
	await api(`/rest/v1/gentlewick_backups?user_id=eq.${encodeURIComponent(session.user.id)}`, { method: "DELETE" }, session.access_token);
}
function AccountInfo() {
	const { data, ready, error, commit } = useLedger();
	const fileRef = (0, import_react.useRef)(null);
	const [status, setStatus] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [cloudSession, setCloudSession] = (0, import_react.useState)(() => getCloudSession());
	const [cloudEmail, setCloudEmail] = (0, import_react.useState)("");
	const [cloudPassword, setCloudPassword] = (0, import_react.useState)("");
	const [cloudStatus, setCloudStatus] = (0, import_react.useState)("");
	function downloadBackup() {
		if (!data) return;
		const json = JSON.stringify(makeBackup(data), null, 2);
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		link.href = url;
		link.download = `gentlewick-backup-${date}.json`;
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
		setStatus("Backup downloaded. Keep it somewhere safe, outside this phone/browser.");
	}
	async function cloudAuth(mode) {
		setBusy(true);
		setCloudStatus("");
		try {
			if (!cloudEmail.trim() || cloudPassword.length < 8) throw new Error("Enter an email and a password of at least 8 characters.");
			const session = mode === "signin" ? await signIn(cloudEmail.trim(), cloudPassword) : await signUp(cloudEmail.trim(), cloudPassword);
			setCloudSession(getCloudSession());
			setCloudPassword("");
			setCloudStatus(session?.access_token ? "Signed in. Cloud backup is available when you choose to use it." : "Account created. Check your email to confirm, then sign in.");
		} catch (err) {
			setCloudStatus(err instanceof Error ? err.message : "Cloud account action failed.");
		} finally {
			setBusy(false);
		}
	}
	async function cloudUpload() {
		if (!data) return;
		setBusy(true);
		setCloudStatus("");
		try {
			await uploadCloudBackup(data);
			setCloudStatus("Encrypted connection used. Your current memories and photos have been uploaded to your private cloud backup.");
		} catch (err) {
			setCloudStatus(err instanceof Error ? err.message : "Upload failed.");
		} finally {
			setBusy(false);
		}
	}
	async function cloudDelete() {
		if (!window.confirm("Delete your Gentlewick cloud backup? Your local memories on this device will not be changed.")) return;
		setBusy(true);
		setCloudStatus("");
		try {
			await deleteCloudBackup();
			setCloudStatus("Cloud backup deleted. Your local memories remain on this device.");
		} catch (err) {
			setCloudStatus(err instanceof Error ? err.message : "Could not delete the cloud backup.");
		} finally {
			setBusy(false);
		}
	}
	async function cloudRestore() {
		setBusy(true);
		setCloudStatus("");
		try {
			const backup = await downloadCloudBackup();
			if (!backup) {
				setCloudStatus("No cloud backup exists for this account yet.");
				return;
			}
			const checked = validateBackup({
				app: "Gentlewick",
				schemaVersion: 1,
				exportedAt: backup.updated_at,
				data: backup.data
			});
			if (!checked.ok) throw new Error(checked.error);
			if (!window.confirm(`Restore the cloud backup dated ${new Date(backup.updated_at).toLocaleString()}? This replaces memories on this device. Download a device backup first if you want to keep them.`)) return;
			const ok = commit(() => checked.data);
			setCloudStatus(ok ? "Cloud backup restored to this device." : "Could not restore to this device; the current data was left unchanged.");
		} catch (err) {
			setCloudStatus(err instanceof Error ? err.message : "Cloud restore failed.");
		} finally {
			setBusy(false);
		}
	}
	async function restoreBackup(file) {
		if (!file) return;
		setStatus("");
		if (file.size > 8388608) {
			setStatus("That backup is too large to restore safely in this browser.");
			return;
		}
		setBusy(true);
		try {
			const parsed = JSON.parse(await file.text());
			const checked = validateBackup(parsed);
			if (!checked.ok) {
				setStatus(checked.error);
				return;
			}
			if (!window.confirm("Restore this backup? It will replace the memories currently stored in this browser. Download a backup of the current memories first if you want to keep them.")) return;
			const ok = commit(() => checked.data);
			setStatus(ok ? "Backup restored. Your memories are back on this device." : "The browser could not store this backup. Your existing memories were left in place.");
		} catch {
			setStatus("That file could not be read as a backup.");
		} finally {
			setBusy(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-2xl px-5 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "My memories"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl md:text-5xl",
				children: "Keep them safe."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "lede mt-5",
				children: "Gentlewick does not need an account. Your pages, photographs, candle evenings, and saved candle notes are kept in this browser on this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-8 grid gap-4 p-5 sm:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: "Download a backup"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "Save a copy of your memorials, photographs, notes, candle history, and held candle notes as a file. This is the safest way to carry your memories to another device."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-primary w-fit",
						disabled: !ready || !data,
						onClick: downloadBackup,
						children: "Download my backup"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl",
								children: "Restore a backup"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted",
								children: "Choose a Gentlewick backup file. Restoring replaces the memories currently on this device, so download a current backup first if needed."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "btn btn-ghost mt-4 w-fit",
								children: [busy ? "Restoring…" : "Choose backup file", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: "application/json,.json",
									className: "sr-only",
									disabled: busy,
									onChange: (event) => void restoreBackup(event.target.files?.[0])
								})]
							})
						]
					}),
					status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-sm text-sea-deep",
						children: status
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-sea-deep",
						children: error
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-8 grid gap-4 p-5 sm:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: "Optional · private cloud copy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: "Carry your memories between devices."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: "Cloud backup is opt-in. It uploads your memorials, photographs, candle history, and held-candle notes to a private account. It is not automatic: choose Upload or Restore yourself."
						})
					] }),
					!cloudConfigured() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl bg-cream p-4 text-sm",
						children: "Cloud sync is prepared in the website code, but the owner still needs to configure Supabase and its private backup table before it can be enabled."
					}) : cloudSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [
								"Signed in as ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: cloudSession.user.email ?? "your account" }),
								"."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-primary",
									type: "button",
									disabled: busy || !data,
									onClick: () => void cloudUpload(),
									children: busy ? "Working…" : "Upload this device's backup"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-ghost",
									type: "button",
									disabled: busy,
									onClick: () => void cloudRestore(),
									children: "Restore cloud backup"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-ghost",
									type: "button",
									disabled: busy,
									onClick: () => void cloudDelete(),
									children: "Delete cloud backup"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-ghost",
									type: "button",
									onClick: () => {
										signOut();
										setCloudSession(null);
										setCloudStatus("Signed out.");
									},
									children: "Sign out"
								})
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-3",
						onSubmit: (e) => e.preventDefault(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									autoComplete: "email",
									value: cloudEmail,
									onChange: (e) => setCloudEmail(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Password (8+ characters)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									autoComplete: "current-password",
									value: cloudPassword,
									onChange: (e) => setCloudPassword(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-primary",
									disabled: busy,
									onClick: () => void cloudAuth("signin"),
									children: "Sign in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-ghost",
									disabled: busy,
									onClick: () => void cloudAuth("signup"),
									children: "Create account"
								})]
							})
						]
					}),
					cloudStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-sm text-sea-deep",
						children: cloudStatus
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Only use this on a device you trust. Cloud restore replaces local data. Keep a separate downloaded backup too."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-3 text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-ink",
					children: "A few important things:"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc space-y-2 pl-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Gentlewick currently stores memories locally; they are not uploaded to our servers." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Shared memorial links contain the memorial words and details, but not photographs or candle history." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Clearing browser data, changing devices, or browser storage being removed can erase the local copy." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Keep your backup file somewhere private. It contains personal memories and any photographs you added." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/memorials",
				className: "btn btn-ghost mt-8",
				children: "Back to the lights"
			})
		]
	}) });
}
//#endregion
export { AccountInfo as component };
