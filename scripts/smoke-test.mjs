import assert from "node:assert/strict";
import {
  SANDY,
  addMemorial,
  allMemorials,
  decodeShare,
  encodeShare,
  findMemorial,
  removeMemorial,
  setPhoto,
  withLight,
} from "../src/lib/store.ts";

const empty = { memorials: [], lights: {}, photos: {}, orders: [] };
const created = addMemorial(empty, {
  name: "Milo 🐾",
  years: "12 years",
  departed: "May 2025",
  dedication: "Always loved.",
  species: "dog",
  photo: null,
});
const memorial = created.memorials[0];
assert.ok(memorial, "memorial should be created");
assert.equal(memorial.slug, "milo");

const shared = decodeShare(encodeShare(memorial));
assert.deepEqual(shared, {
  n: "Milo 🐾",
  y: "12 years",
  d: "May 2025",
  t: "Always loved.",
  s: "dog",
});
assert.equal(decodeShare("not-a-share-link"), null);

let populated = withLight(created, memorial.id, "Missing you.");
assert.equal(populated.lights[memorial.id].length, 1);
populated = withLight(populated, memorial.id, "Missing you.");
assert.equal(populated.lights[memorial.id].length, 1, "duplicate same-day candle notes should be ignored");
populated = setPhoto(populated, memorial.id, "data:image/jpeg;base64,AAAA");
assert.equal(populated.photos[memorial.id], "data:image/jpeg;base64,AAAA");
assert.equal(findMemorial(populated, memorial.slug)?.name, "Milo 🐾");
assert.equal(allMemorials(populated).length, 2, "built-in memorial should remain in the directory");
const removed = removeMemorial(populated, memorial.id);
assert.equal(findMemorial(removed, memorial.slug), undefined);
assert.ok(SANDY.house, "the built-in first memorial remains available");
console.log("Gentlewick smoke tests passed: memorial creation, share links, candle notes, photos, directory lookup, removal.");
