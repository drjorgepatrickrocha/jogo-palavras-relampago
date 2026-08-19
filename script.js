const WORDS = [
  "casa", "sol", "lua", "praia", "livro", "gato", "cachorro", "flor",
  "carro", "porta", "janela", "escola", "amigo", "musica", "chuva",
  "cidade", "montanha", "estrela", "oceano", "floresta", "viagem",
  "computador", "telefone", "cadeira", "mesa", "jardim", "pizza",
  "futebol", "cinema", "cafe", "chocolate", "biblioteca", "avenida",
  "relogio", "espelho", "chave", "bicicleta", "aviao", "trem",
  "coracao", "sorriso", "aventura", "misterio", "castelo", "dragao",
  "planeta", "foguete", "robo", "pintura", "teatro", "orquestra"
];

const scrambledEl = document.getElementById("scrambled");
const answerEl = document.getElementById("answer");
const scoreEl = document.getElementById("score");
const comboEl = document.getElementById("combo");
const bestEl = document.getElementById("best");
const timerFillEl = document.getElementById("timer-fill");
const feedbackEl = document.getElementById("feedback");
const startBtn = document.getElementById("start-btn");

let currentWord = "";
let score = 0;
let combo = 0;
let best = Number(localStorage.getItem("palavrasRelampagoBest") || 0);
let roundDuration = 10000;
let roundStart = 0;
let rafId = null;
let roundActive = false;
let usedWords = [];

bestEl.textContent = best;

function pickWord() {
  if (usedWords.length >= WORDS.length) usedWords = [];
  let candidates = WORDS.filter(w => !usedWords.includes(w));
  const word = candidates[Math.floor(Math.random() * candidates.length)];
  usedWords.push(word);
  return word;
}

function startRound() {
  currentWord = pickWord();
  scrambledEl.textContent = scramble(currentWord).toUpperCase();
  answerEl.value = "";
  answerEl.disabled = false;
  answerEl.classList.remove("correct", "wrong");
  answerEl.focus();
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";

  roundDuration = Math.max(5000, 10000 - combo * 250);
  roundStart = performance.now();
  roundActive = true;
  tick();
}

function tick() {
  if (!roundActive) return;
  const elapsed = performance.now() - roundStart;
  const remaining = Math.max(0, 1 - elapsed / roundDuration);
  timerFillEl.style.width = (remaining * 100) + "%";

  if (remaining < 0.3) {
    timerFillEl.style.background = "linear-gradient(90deg, #ff5d5d, #ff5d8f)";
  } else {
    timerFillEl.style.background = "linear-gradient(90deg, #3ddc97, #ffd23f)";
  }

  if (elapsed >= roundDuration) {
    roundTimeout();
    return;
  }
  rafId = requestAnimationFrame(tick);
}

function roundTimeout() {
  roundActive = false;
  cancelAnimationFrame(rafId);
  combo = 0;
  comboEl.textContent = combo;
  answerEl.disabled = true;
  answerEl.classList.add("wrong");
  feedbackEl.textContent = "Tempo esgotado! Era: " + currentWord.toUpperCase();
  feedbackEl.className = "feedback bad";
  setTimeout(startRound, 1400);
}

function handleCorrect() {
  roundActive = false;
  cancelAnimationFrame(rafId);
  combo++;
  const points = 10 + combo * 2;
  score += points;
  scoreEl.textContent = score;
  comboEl.textContent = combo;

  if (score > best) {
    best = score;
    bestEl.textContent = best;
    localStorage.setItem("palavrasRelampagoBest", String(best));
  }

  answerEl.disabled = true;
  answerEl.classList.add("correct");
  feedbackEl.textContent = "+" + points + " pontos! 🔥";
  feedbackEl.className = "feedback good";
  setTimeout(startRound, 700);
}

answerEl.addEventListener("input", () => {
  if (!roundActive) return;
  if (normalize(answerEl.value) === normalize(currentWord)) {
    handleCorrect();
  }
});

function resetGame() {
  score = 0;
  combo = 0;
  usedWords = [];
  scoreEl.textContent = score;
  comboEl.textContent = combo;
  startBtn.textContent = "Reiniciar";
  startRound();
}

startBtn.addEventListener("click", resetGame);
