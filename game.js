const startBtn = document.getElementById("startBtn");
const chrono = document.getElementById("chrono");
const animation = document.getElementById("animation");
const victoryOverlay = document.getElementById("victoryOverlay");
const victoryMessage = document.getElementById("victoryMessage");

const START_LABEL = "START DUEL";
const RESTART_LABEL = "RESTART DUEL";

let timer = null;
let startDelayTimeout = null;
let animationTimeout = null;
let timeLeft = 3;
let duelActive = false;
let duelFinished = false;

showStartButton(START_LABEL);

/* Sons spécifiques par joueur */
const soundPlayer1 = "sfx/fahhh.wav";
const soundPlayer2 = "sfx/fahhh.wav";

/* Joue le son du joueur */
function playSoundForPlayer(player) {
    const audio = new Audio(player === 1 ? soundPlayer1 : soundPlayer2);
    audio.play().catch(() => {});
}

// Lance le duel depuis le bouton Start
function startDuel() {
    if (duelActive) return;

    duelActive = true;
    duelFinished = false;

    if (animation) animation.style.opacity = 0;
    if (chrono) chrono.textContent = "3";
    hideVictoryOverlay();
    hideStartButton();

    resetAnimationTimeout();
    resetStartDelay();
    clearCountdown();

    showAnimation("READY");

    startDelayTimeout = setTimeout(() => {
        startCountdown();
    }, 1000);
}

/* Countdown vers GO */
function startCountdown() {
    timeLeft = 3;

    clearCountdown();

    timer = setInterval(() => {
        if (!chrono) {
            clearCountdown();
            return;
        }

        chrono.textContent = timeLeft;

        if (timeLeft === 0) {
            clearCountdown();
            chrono.textContent = "GO";
            showAnimation("GO!");
            return;
        }

        timeLeft--;
    }, 1000);
}

/* Buzz */
function buzz(player) {
    if (duelFinished || !duelActive) return;
    if (!chrono || chrono.textContent !== "GO") return;

    duelFinished = true;
    duelActive = false;

    showAnimation(`PLAYER ${player} WINS`);
    playSoundForPlayer(player);

    clearCountdown();
    resetStartDelay();

    if (chrono) chrono.textContent = "00";

    showVictoryOverlay(`PLAYER ${player} WINS`);
    showStartButton(RESTART_LABEL);
}

/* Animation Texte */
function showAnimation(text) {
    if (!animation) return;

    animation.textContent = text;
    animation.style.opacity = 1;

    resetAnimationTimeout();
    animationTimeout = setTimeout(() => {
        animation.style.opacity = 0;
    }, 1400);
}

function clearCountdown() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function resetStartDelay() {
    if (startDelayTimeout) {
        clearTimeout(startDelayTimeout);
        startDelayTimeout = null;
    }
}

function resetAnimationTimeout() {
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
}

function showVictoryOverlay(text) {
    if (!victoryOverlay || !victoryMessage) return;
    victoryMessage.textContent = text;
    victoryOverlay.classList.add("visible");
}

function hideVictoryOverlay() {
    if (!victoryOverlay) return;
    victoryOverlay.classList.remove("visible");
}

function showStartButton(label = START_LABEL) {
    if (!startBtn) return;
    if (label) startBtn.textContent = label;
    startBtn.style.display = "block";
}

function hideStartButton() {
    if (startBtn) startBtn.style.display = "none";
}

