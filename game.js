let difficulty = null;
let timer = null;
let timeLeft = 3;
let duelFinished = false;

/* Sons spécifiques par joueur */
const soundPlayer1 = "sfx/fahhh.wav";
const soundPlayer2 = "sfx/fahhh.wav";

/* Joue le son du joueur */
function playSoundForPlayer(player) {
    const audio = new Audio(player === 1 ? soundPlayer1 : soundPlayer2);
    audio.play().catch(() => {});
}

/* RESET DU DUEL */
function restartDuel() {
    duelFinished = false;
    difficulty = null;

    document.getElementById("chrono").textContent = "00";
    document.getElementById("animation").style.opacity = 0;
    document.getElementById("restartBtn").style.display = "none";

    showAnimation("READY");
}

/* Choix difficulté */
function setDifficulty(d) {
    if (duelFinished) return;

    difficulty = d;
    duelFinished = false;

    showAnimation("START!");
    startCountdown();
}

/* Countdown vers GO */
function startCountdown() {
    const chrono = document.getElementById("chrono");
    timeLeft = 3;

    clearInterval(timer);
    timer = setInterval(() => {
        chrono.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            chrono.textContent = "GO";
            showAnimation("GO!");
        }

        timeLeft--;
    }, 1000);
}

/* Buzz */
function buzz(player) {
    const chrono = document.getElementById("chrono");

    if (duelFinished) return;
    if (chrono.textContent !== "GO") return;

    duelFinished = true;

    showAnimation(`PLAYER ${player} WINS`);
    playSoundForPlayer(player);

    clearInterval(timer);

    document.getElementById("restartBtn").style.display = "block";
}

/* Animation Texte */
function showAnimation(text) {
    const anim = document.getElementById("animation");
    anim.textContent = text;
    anim.style.opacity = 1;

    setTimeout(() => {
        anim.style.opacity = 0;
    }, 1400);
}
