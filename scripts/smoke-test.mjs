import assert from "node:assert/strict";
import {
  SANDY,
  addMemorial,
  decodeShare,
  encodeShare,
  makeBackup,
  setPhoto,
  validateBackup,
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
populated = setPhoto(populated, memorial.id, "data:image/jpeg;base64,AAAA");
const backup = makeBackup(populated);
const restored = validateBackup(backup);
assert.equal(restored.ok, true);
if (restored.ok) {
  assert.equal(restored.data.memorials[0].name, "Milo 🐾");
  assert.equal(restored.data.lights[memorial.id][0].whisper, "Missing you.");
  assert.equal(restored.data.photos[memorial.id], "data:image/jpeg;base64,AAAA");
}
assert.equal(validateBackup({ app: "Other", schemaVersion: 1, data: populated }).ok, false);
assert.equal(validateBackup({ app: "Gentlewick", schemaVersion: 1, data: { ...populated, memorials: [{ ...memorial, id: "sandy", slug: "sandy" }] } }).ok, false);
assert.equal(validateBackup({ app: "Gentlewick", schemaVersion: 1, data: { ...populated, photos: { [memorial.id]: "javascript:bad" } } }).ok, false);
assert.ok(SANDY.house, "the built-in first memorial remains available");
console.log("Gentlewick smoke tests passed: memorial creation, shared-link encoding, candle history, photo backup/restore, and invalid backup rejection.");
