import { i as __toESM } from "../_runtime.mjs";
import { J as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as persist, T as loadStore } from "./router-D0CoVBdS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-ledger-B9m_Nbe6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLedger() {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const loaded = loadStore();
		setData(loaded);
		function onStorage(event) {
			if (event.key !== "gentlewick.v1") return;
			const latest = loadStore();
			setData(latest);
			setError(null);
		}
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);
	const commit = (0, import_react.useCallback)((fn) => {
		const next = fn(loadStore());
		const message = persist(next);
		if (message) {
			setError(message);
			return false;
		}
		setData(next);
		setError(null);
		return true;
	}, []);
	return {
		data,
		ready: data !== null,
		error,
		setError,
		commit
	};
}
//#endregion
export { useLedger as t };
