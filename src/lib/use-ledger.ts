import { useCallback, useEffect, useState } from "react";
import { loadStore, persist, type Persisted } from "@/lib/store";

export function useLedger() {
  const [data, setData] = useState<Persisted | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadStore();
    setData(loaded);

    function onStorage(event: StorageEvent) {
      if (event.key !== "gentlewick.v1") return;
      const latest = loadStore();
      setData(latest);
      setError(null);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const commit = useCallback((fn: (prev: Persisted) => Persisted) => {
    const base = loadStore();
    const next = fn(base);
    const message = persist(next);
    if (message) {
      setError(message);
      return false;
    }
    setData(next);
    setError(null);
    return true;
  }, []);

  return { data, ready: data !== null, error, setError, commit };
}
