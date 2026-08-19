const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { FEEDBACK_URL } = require("../logic.js");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

test("index.html includes a feedback link pointing at FEEDBACK_URL", () => {
  const match = html.match(/<a[^>]*id="feedback-btn"[^>]*>/);
  assert.ok(match, "expected an element with id=feedback-btn in index.html");
  const tag = match[0];
  assert.ok(tag.includes(`href="${FEEDBACK_URL}"`), "feedback link href should match FEEDBACK_URL");
  assert.ok(tag.includes('target="_blank"'), "feedback link should open in a new tab");
  assert.ok(tag.includes("rel=\"noopener"), "feedback link should set rel=noopener for security");
});

test("index.html loads logic.js before script.js", () => {
  const logicIndex = html.indexOf('src="logic.js"');
  const scriptIndex = html.indexOf('src="script.js"');
  assert.notEqual(logicIndex, -1);
  assert.notEqual(scriptIndex, -1);
  assert.ok(logicIndex < scriptIndex, "logic.js must load before script.js");
});
