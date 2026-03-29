let homeScore = 0;
let guestScore = 0;
let homeFouls = 0;
let guestFouls = 0;
let period = 1;
let periodDuration = 12 * 60;
let timer;

let teamHomeEl = document.getElementById("team-home")
let teamGuestEl = document.getElementById("team-guest")
let homeScoreEl = document.getElementById("home-score-el");
let guestScoreEl = document.getElementById("guest-score-el");
let homeFoulsEl = document.getElementById("home-fouls-el");
let guestFoulsEl = document.getElementById("guest-fouls-el");
let periodTrackerEl = document.getElementById("period-tracker-el");
let clockEl = document.getElementById("clock-el");
let newGameBtn = document.getElementById("new-game-btn");

// Events (User Actions)
function addHomeScore(num) {
    homeScore += num;
    renderScore()
}

function addGuestScore(num) {
    guestScore += num;
    renderScore()
}

function addHomeFoul() {
    homeFouls += 1;
    renderFouls();
}

function addGuestFoul() {
    guestFouls += 1;
    renderFouls();
}

// Render Functions (UI Updates)
function renderScore() {
    homeScoreEl.textContent = homeScore;
    guestScoreEl.textContent = guestScore;
    highlightLead();
}

function renderFouls() {
    homeFoulsEl.textContent = homeFouls;
    guestFoulsEl.textContent = guestFouls;
}

function renderPeriod() {
    periodTrackerEl.textContent = period;
}

function renderClock() {
    clockEl.textContent = formatClock(periodDuration);
}

function highlightLead() {
    homeScoreEl.classList.toggle("leading", homeScore > guestScore);
    guestScoreEl.classList.toggle("leading", guestScore > homeScore);
}

// Game Control
function resetGame() {
    homeScore = 0;
    guestScore = 0;
    homeFouls = 0;
    guestFouls = 0;
    period = 1;
    periodDuration = 12 * 60;
    clearInterval(timer);
}

function newGame() {
    resetGame();
    renderScore();
    renderFouls();
    renderPeriod();
    renderClock();
}

// Period Timer Logic
function startTimer() {
    timer = setInterval(() => {
        periodDuration--;
        renderClock();
        
        if (periodDuration <= 0) {
            if (period < 4) {
                period++;
                renderPeriod();
                periodDuration = 12 * 60;
            } else {
                clearInterval(timer);
            }
        }       
    }, 1000)
}

// Utilities
function formatClock(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = String(duration % 60).padStart(2, "0");
    return minutes + ":" + seconds;
}

// Start the Timer on page load
startTimer();