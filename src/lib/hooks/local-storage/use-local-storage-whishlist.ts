"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "whishlist-items";
const STORAGE_EVENT = "local-wishlist-updated";

// ---- Module cache (keeps snapshot stable)
let cachedRaw: string | null = null;
let cachedParsed: string[] = [];

/** Parse JSON safely into string[] */
function parseList(raw: string | null): string[] {
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

// Read snapshot with caching (stable reference)  to prevent re-render
function getSnapshot(): string[] {
  // to prevent hydration error
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);

  // ✅ If storage string didn't change, return the SAME array reference
  if (raw === cachedRaw) return cachedParsed;

  cachedRaw = raw;
  cachedParsed = parseList(raw);
  return cachedParsed;
}

//Subscribe to updates to make all component aware about updates in local-storage
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const onCustom = () => callback();
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };

  window.addEventListener(STORAGE_EVENT, onCustom);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(STORAGE_EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

//Emit custom event that tell all component use hook  this are updates in local storage
function emit() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function useLocalWishlist() {
  // useSyncExternalStore=> React hook that connects an external data source (localStorage) to React.
  // It keeps all components in sync automatically and re-renders them
  // whenever the external store changes, without using React state.
  const list = useSyncExternalStore(subscribe, getSnapshot, () => []);

  // Check if id exists
  const has = useCallback((id: string) => list.includes(id), [list]);

  // Add
  const add = useCallback((id: string) => {
    if (typeof window === "undefined") return false;

    const current = getSnapshot(); // cached stable array
    if (current.includes(id)) return false;

    const next = [...current, id];
    const rawNext = JSON.stringify(next);

    localStorage.setItem(STORAGE_KEY, rawNext);

    // ✅ update cache so next getSnapshot returns stable ref
    cachedRaw = rawNext;
    cachedParsed = next;

    emit();
    return true;
  }, []);

  //Remove
  const remove = useCallback((id: string) => {
    if (typeof window === "undefined") return false;

    const current = getSnapshot();
    if (!current.includes(id)) return false;

    const next = current.filter((x) => x !== id);
    const rawNext = JSON.stringify(next);

    localStorage.setItem(STORAGE_KEY, rawNext);

    // ✅ update cache
    cachedRaw = rawNext;
    cachedParsed = next;

    emit();
    return true;
  }, []);

  return { list, has, add, remove } as const;
}
