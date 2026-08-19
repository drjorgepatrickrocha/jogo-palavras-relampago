const FEEDBACK_URL = "https://github.com/drjorgepatrickrocha/jogo-palavras-relampago/issues/new";

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function scramble(word) {
  let letters = word.split("");
  let scrambled = word;
  let attempts = 0;
  while (scrambled === word && attempts < 20) {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    scrambled = letters.join("");
    attempts++;
  }
  return scrambled;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { FEEDBACK_URL, normalize, scramble };
}
