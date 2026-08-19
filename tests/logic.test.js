const test = require("node:test");
const assert = require("node:assert/strict");
const { normalize, scramble, FEEDBACK_URL } = require("../logic.js");

test("normalize lowercases, strips accents, and trims", () => {
  assert.equal(normalize("  Café "), "cafe");
  assert.equal(normalize("CORAÇÃO"), "coracao");
  assert.equal(normalize("já"), "ja");
});

test("scramble preserves the same letters as the original word", () => {
  const word = "computador";
  const scrambled = scramble(word);
  assert.equal(scrambled.length, word.length);
  assert.deepEqual([...scrambled].sort(), [...word].sort());
});

test("scramble returns a different arrangement for a multi-letter word", () => {
  assert.notEqual(scramble("relampago"), "relampago");
});

test("FEEDBACK_URL points at the repo's issue tracker", () => {
  assert.match(FEEDBACK_URL, /^https:\/\/github\.com\/.+\/issues\/new$/);
});
