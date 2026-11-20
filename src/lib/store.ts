export type Species = "dog" | "cat" | "bird" | "other";
export type CandleSize = "petite" | "classic" | "long";
export type Scent = "unscented" | "cotton" | "vanilla" | "lavender";
export type Wick = "cotton" | "wood";

export type Memorial = {
  id: string;
  slug: string;
  name: string;
  years: string;
  departed: string;
  dedication: string;
  species: Species;
  house: boolean;
  createdAt: number;
};

export type Light = {
  id: string;
  at: number;
  whisper: string;
};

export type Order = {
  id: string;
  createdAt: number;
  petName: string;
  memorialId: string | null;
  size: CandleSize;
  scent: Scent;
  wick: Wick;
  boxNote: string;
  keeperName: string;
  email: string;
  price: number;
};

export type Persisted = {
  memorials: Memorial[];
  lights: Record<string, Light[]>;
  photos: Record<string, string>;
  orders: Order[];
};


export type BackupFile = {
  app: "Gentlewick";
  schemaVersion: 1;
  exportedAt: string;
  data: Persisted;
};

const BACKUP_MAX_BYTES = 8 * 1024 * 1024;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function isSpecies(value: unknown): value is Species {
  return value === "dog" || value === "cat" || value === "bird" || value === "other";
}

export function makeBackup(data: Persisted): BackupFile {
  return { app: "Gentlewick", schemaVersion: 1, exportedAt: new Date().toISOString(), data };
}

export function validateBackup(value: unknown): { ok: true; data: Persisted } | { ok: false; error: string } {
  if (!isRecord(value) || value.app !== "Gentlewick" || value.schemaVersion !== 1 || !isRecord(value.data)) {
    return { ok: false, error: "That file is not a Gentlewick backup we recognise." };
  }
  const source = value.data;
  if (!Array.isArray(source.memorials) || !isRecord(source.lights) || !isRecord(source.photos) || !Array.isArray(source.orders)) {
    return { ok: false, error: "The backup is missing some of its memory data." };
  }
  const memorials: Memorial[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const item of source.memorials) {
    if (!isRecord(item) || item.house !== false || typeof item.id !== "string" || !item.id || typeof item.slug !== "string" || !item.slug || typeof item.name !== "string" || !item.name.trim() || !isSpecies(item.species)) {
      return { ok: false, error: "A memorial in this backup is incomplete or invalid." };
    }
    if (item.id === SANDY.id || item.slug === SANDY.slug || ids.has(item.id) || slugs.has(item.slug)) return { ok: false, error: "This backup contains duplicate or reserved memorial entries." };
    ids.add(item.id);
    slugs.add(item.slug);
    memorials.push({
      id: item.id.slice(0, 100), slug: item.slug.slice(0, 100), name: item.name.slice(0, 60),
      years: typeof item.years === "string" ? item.years.slice(0, 80) : "",
      departed: typeof item.departed === "string" ? item.departed.slice(0, 40) : "",
      dedication: typeof item.dedication === "string" ? item.dedication.slice(0, 400) : "",
      species: item.species, createdAt: typeof item.createdAt === "number" && Number.isFinite(item.createdAt) ? item.createdAt : Date.now(), house: false,
    });
  }
  const photos: Record<string, string> = {};
  for (const [id, photo] of Object.entries(source.photos)) {
    if (!ids.has(id) && id !== SANDY.id) continue;
    if (typeof photo !== "string" || !photo.startsWith("data:image/jpeg;base64,")) return { ok: false, error: "A photo in this backup is not a supported image." };
    if (photo.length > 3_500_000) return { ok: false, error: "A photo in this backup is too large to restore safely." };
    photos[id] = photo;
  }
  const lights: Record<string, Light[]> = {};
  for (const [id, list] of Object.entries(source.lights)) {
    if (!ids.has(id) && id !== SANDY.id) continue;
    if (!Array.isArray(list)) continue;
    lights[id] = list.slice(-2000).filter((entry): entry is Light => isRecord(entry) && typeof entry.id === "string" && typeof entry.at === "number" && Number.isFinite(entry.at) && typeof entry.whisper === "string").map((entry) => ({ id: entry.id.slice(0, 100), at: entry.at, whisper: entry.whisper.slice(0, 180) }));
  }
  const orders: Order[] = [];
  for (const item of source.orders) {
    if (!isRecord(item) || typeof item.id !== "string" || typeof item.petName !== "string" || !isSize(item.size) || !isScent(item.scent) || !isWick(item.wick) || typeof item.price !== "number" || !Number.isFinite(item.price)) continue;
    orders.push({
      id: item.id.slice(0, 100), createdAt: typeof item.createdAt === "number" && Number.isFinite(item.createdAt) ? item.createdAt : Date.now(),
      petName: item.petName.slice(0, 60), memorialId: typeof item.memorialId === "string" ? item.memorialId.slice(0, 100) : null,
      size: item.size, scent: item.scent, wick: item.wick, boxNote: typeof item.boxNote === "string" ? item.boxNote.slice(0, 300) : BOX_NOTE,
      keeperName: typeof item.keeperName === "string" ? item.keeperName.slice(0, 100) : "", email: typeof item.email === "string" ? item.email.slice(0, 200) : "", price: item.price,
    });
  }
  return { ok: true, data: { memorials, lights, photos, orders } };
}

export function backupFileSize(value: string) {
  return new TextEncoder().encode(value).length;
}

export const backupMaxBytes = BACKUP_MAX_BYTES;

export const SPECIES: { id: Species; label: string; line: string }[] = [
  { id: "dog", label: "Dog", line: "The one who waits at the door." },
  { id: "cat", label: "Cat", line: "The quiet keeper of a room." },
  { id: "bird", label: "Bird", line: "A passing at the window." },
  { id: "other", label: "Someone else", line: "Whoever chose you." },
];

export const SIZES: { id: CandleSize; name: string; hours: string; price: number; note: string }[] = [
  { id: "petite", name: "Petite", hours: "about 40 hours", price: 42, note: "A small light for a bedside or a desk." },
  { id: "classic", name: "Classic", hours: "about 60 hours", price: 58, note: "For the room you shared." },
  { id: "long", name: "Long light", hours: "about 90 hours", price: 78, note: "For anniversaries, and the long evenings." },
];

export const SCENTS: { id: Scent; name: string; note: string }[] = [
  { id: "unscented", name: "Unscented", note: "Just the wax, and the light." },
  { id: "cotton", name: "Soft cotton", note: "Clean linen, barely there." },
  { id: "vanilla", name: "Warm vanilla", note: "A low, familiar sweetness." },
  { id: "lavender", name: "Gentle lavender", note: "Soft, not sharp. For night." },
];

export const WICKS: { id: Wick; name: string; note: string }[] = [
  { id: "cotton", name: "Classic wick", note: "A quiet, steady flame." },
  { id: "wood", name: "Wooden wick", note: "A soft crackle, like a small hearth." },
];

export const BOX_NOTE = "Their light is still here.";
export const WOOD_EXTRA = 4;

export const SANDY: Memorial = {
  id: "sandy",
  slug: "sandy",
  name: "Sandy McCann",
  years: "17 years of loyalty",
  departed: "March 2024",
  dedication: "Loyal heart. Gentle soul. Forever loved. Thank you for a lifetime of love.",
  species: "dog",
  house: true,
  createdAt: Date.parse("2024-03-15T12:00:00Z"),
};

const KEY = "gentlewick.v1";

function empty(): Persisted {
  return { memorials: [], lights: {}, photos: {}, orders: [] };
}

function validMemorial(value: unknown): value is Memorial {
  if (!value || typeof value !== "object") return false;
  const m = value as Memorial;
  return typeof m.id === "string" && typeof m.slug === "string" && typeof m.name === "string" && m.house === false;
}

export function loadStore(): Persisted {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      memorials: Array.isArray(parsed.memorials) ? parsed.memorials.filter(validMemorial) : [],
      lights: parsed.lights && typeof parsed.lights === "object" ? parsed.lights : {},
      photos: parsed.photos && typeof parsed.photos === "object" ? parsed.photos : {},
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    };
  } catch {
    return empty();
  }
}

export function persist(data: Persisted): string | null {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    return null;
  } catch {
    return "This device could not keep that. Try a smaller photograph.";
  }
}

export function allMemorials(data: Persisted): Memorial[] {
  return [SANDY, ...data.memorials];
}

export function findMemorial(data: Persisted, slug: string) {
  return allMemorials(data).find((m) => m.slug === slug);
}

export function photoOf(data: Persisted, memorial: Memorial) {
  return data.photos[memorial.id] ?? null;
}

export function lightsOf(data: Persisted, id: string) {
  return data.lights[id] ?? [];
}

export function speciesLabel(species: Species) {
  return SPECIES.find((s) => s.id === species)?.label ?? "Companion";
}

export function speciesLine(species: Species) {
  return SPECIES.find((s) => s.id === species)?.line ?? "";
}

export function sizeBy(id: CandleSize) {
  return SIZES.find((s) => s.id === id) ?? SIZES[0];
}

export function scentBy(id: Scent) {
  return SCENTS.find((s) => s.id === id) ?? SCENTS[0];
}

export function wickBy(id: Wick) {
  return WICKS.find((w) => w.id === id) ?? WICKS[0];
}

export function priceFor(size: CandleSize, wick: Wick) {
  return sizeBy(size).price + (wick === "wood" ? WOOD_EXTRA : 0);
}

export function euro(n: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatWhen(at: number) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(at));
}

export function sameDay(a: number, b: number) {
  const da = new Date(a);
  const db = new Date(b);
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate();
}

export function isLitToday(lights: Light[]) {
  return lights.some((light) => sameDay(light.at, Date.now()));
}

export function nightsKept(lights: Light[]) {
  return new Set(lights.map((light) => new Date(light.at).toDateString())).size;
}

export function departedThisMonth(departed: string) {
  const month = new Date().toLocaleString("en-IE", { month: "long" }).toLowerCase();
  return departed.toLowerCase().includes(month);
}

export function slugBase(name: string) {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
  return base || "light";
}

export function uniqueSlug(name: string, data: Persisted) {
  const taken = new Set(allMemorials(data).map((m) => m.slug));
  const base = slugBase(name);
  if (!taken.has(base)) return base;
  let i = 2;
  while (taken.has(`${base}-${i}`)) i += 1;
  return `${base}-${i}`;
}

export function isSize(value: unknown): value is CandleSize {
  return value === "petite" || value === "classic" || value === "long";
}

export function isScent(value: unknown): value is Scent {
  return value === "unscented" || value === "cotton" || value === "vanilla" || value === "lavender";
}

export function isWick(value: unknown): value is Wick {
  return value === "cotton" || value === "wood";
}

export type OrderSearch = {
  size: CandleSize;
  scent: Scent;
  wick: Wick;
  memorial: string;
  name: string;
};

export function parseOrderSearch(search: Record<string, unknown>): OrderSearch {
  return {
    size: isSize(search.size) ? search.size : "petite",
    scent: isScent(search.scent) ? search.scent : "unscented",
    wick: isWick(search.wick) ? search.wick : "cotton",
    memorial: typeof search.memorial === "string" ? search.memorial : "",
    name: typeof search.name === "string" ? search.name.slice(0, 60) : "",
  };
}

export function addMemorial(
  data: Persisted,
  input: {
    name: string;
    years: string;
    departed: string;
    dedication: string;
    species: Species;
    photo: string | null;
  },
): Persisted {
  const id = crypto.randomUUID();
  const memorial: Memorial = {
    id,
    slug: uniqueSlug(input.name, data),
    name: input.name.trim(),
    years: input.years.trim(),
    departed: input.departed.trim(),
    dedication: input.dedication.trim(),
    species: input.species,
    house: false,
    createdAt: Date.now(),
  };
  const photos = input.photo ? { ...data.photos, [id]: input.photo } : data.photos;
  return { ...data, memorials: [memorial, ...data.memorials], photos };
}

export function removeMemorial(data: Persisted, id: string): Persisted {
  if (id === SANDY.id) return data;
  const photos = { ...data.photos };
  const lights = { ...data.lights };
  delete photos[id];
  delete lights[id];
  return { ...data, memorials: data.memorials.filter((m) => m.id !== id), photos, lights };
}

export function setPhoto(data: Persisted, id: string, photo: string | null): Persisted {
  const photos = { ...data.photos };
  if (photo) photos[id] = photo;
  else delete photos[id];
  return { ...data, photos };
}

export function withLight(data: Persisted, memorialId: string, whisper: string): Persisted {
  const list = data.lights[memorialId] ?? [];
  const trimmed = whisper.trim().slice(0, 180);
  const today = list.filter((light) => sameDay(light.at, Date.now()));
  if (today.length && !trimmed) return data;
  if (today.some((light) => light.whisper === trimmed)) return data;
  const empty = today.find((light) => !light.whisper);
  const lights = empty && trimmed
    ? list.map((light) => (light.id === empty.id ? { ...light, whisper: trimmed } : light))
    : [...list, { id: crypto.randomUUID(), at: Date.now(), whisper: trimmed }];
  return { ...data, lights: { ...data.lights, [memorialId]: lights } };
}

export function makeOrderId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "GW-";
  for (let i = 0; i < 4; i += 1) id += alphabet[Math.floor(Math.random() * alphabet.length)];
  return id;
}

export function releaseOrder(data: Persisted, id: string): Persisted {
  return { ...data, orders: data.orders.filter((order) => order.id !== id) };
}

export type SharedCard = {
  n: string;
  y: string;
  d: string;
  t: string;
  s: Species;
};

export function encodeShare(memorial: Pick<Memorial, "name" | "years" | "departed" | "dedication" | "species">) {
  const payload: SharedCard = {
    n: memorial.name,
    y: memorial.years,
    d: memorial.departed,
    t: memorial.dedication,
    s: memorial.species,
  };
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeShare(value: string): SharedCard | null {
  try {
    const pad = value.replace(/-/g, "+").replace(/_/g, "/");
    const b64 = pad + "===".slice((pad.length + 3) % 4);
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0));
    const data = JSON.parse(new TextDecoder().decode(bytes)) as SharedCard;
    if (!data || typeof data.n !== "string" || !data.n.trim()) return null;
    const species: Species[] = ["dog", "cat", "bird", "other"];
    return {
      n: data.n.slice(0, 60),
      y: typeof data.y === "string" ? data.y.slice(0, 80) : "",
      d: typeof data.d === "string" ? data.d.slice(0, 40) : "",
      t: typeof data.t === "string" ? data.t.slice(0, 400) : "",
      s: species.includes(data.s) ? data.s : "other",
    };
  } catch {
    return null;
  }
}

export function readPhotoFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) return Promise.reject(new Error("type"));
  if (file.size > 8_000_000) return Promise.reject(new Error("size"));
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const max = 960;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      try {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const converted = canvas.toDataURL("image/jpeg", 0.82);
        URL.revokeObjectURL(url);
        resolve(converted);
      } catch {
        URL.revokeObjectURL(url);
        reject(new Error("image"));
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    img.src = url;
  });
}

export async function copyText(text: string) {
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
