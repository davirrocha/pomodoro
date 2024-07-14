const btnFocus = document.querySelector("#focus");
const btnBreak = document.querySelector("#break");
const btnRest = document.querySelector("#rest");
const btnStart = document.querySelector("#start");
const btnPause = document.querySelector("#pause");
const btnContinue = document.querySelector("#continue");
const btnReset = document.querySelector("#reset");
let minutes = document.querySelector("#minute");
let seconds = document.querySelector("#second");
let interval;
let isPause = false;
let endTime;
const audio = new Audio();
audio.src = "./assets/timersong.mp3";


// Flag to track focus state (visible or hidden)
let isTabFocused = true;

document.addEventListener("visibilitychange", function () {
    isTabFocused = !document.hidden; // Update focus state on visibility change
    if (!isTabFocused && !isPause) {
        pauseTimer(); // Pause timer when tab is hidden and not already paused
    } else if (isTabFocused && isPause) {
        continueTimer(); // Resume timer when tab is visible and paused
    }
});

btnFocus.addEventListener("click", function () {
    minutes.textContent = "25";
    seconds.textContent = "00";

    btnStart.removeEventListener("click", startFocus);
    btnStart.addEventListener("click", startFocus);
});

function startFocus() {
    const duration = 25 * 60; // 25 minutes in seconds
    startTimer(duration);
}

btnBreak.addEventListener("click", function () {
    minutes.textContent = "05";
    seconds.textContent = "00";

    btnStart.removeEventListener("click", startBreak);
    btnStart.addEventListener("click", startBreak);
});

function startBreak() {
    const duration = 5 * 60; // 5 minutes in seconds
    startTimer(duration);
}

btnRest.addEventListener("click", function () {
    minutes.textContent = "15";
    seconds.textContent = "00";

    btnStart.removeEventListener("click", startRest);
    btnStart.addEventListener("click", startRest);
});

function startRest() {
    const duration = 15 * 60; // 15 minutes in seconds
    startTimer(duration);
}

function startTimer(duration) {
    endTime = Date.now() + duration * 1000;
    updateTimer();

    btnStart.style.display = "none";
    btnPause.style.display = "block";
    btnReset.style.display = "block";
}

function updateTimer() {
    if (isPause) return;

    const remaining = Math.max(0, endTime - Date.now());
    const minute = Math.floor(remaining / 60000);
    const second = Math.floor((remaining % 60000) / 1000);

    minutes.textContent = formatTime(minute);
    seconds.textContent = formatTime(second);

    if (remaining > 0) {
        interval = setTimeout(updateTimer, 1000);
    } else {
        clearTimeout(interval);
        audio.play()
    }
}

btnPause.addEventListener("click", function pauseTimer() {
    isPause = true;
    clearTimeout(interval);
    btnPause.style.display = "none";
    btnContinue.style.display = "block";
});

btnContinue.addEventListener("click", function continueTimer() {
    isPause = false;
    endTime = Date.now() + (parseInt(minutes.textContent) * 60 + parseInt(seconds.textContent)) * 1000;
    updateTimer();

    btnPause.style.display = "block";
    btnContinue.style.display = "none";
});

btnReset.addEventListener("click", function resetTimer() {
    isPause = false;
    clearTimeout(interval);
    minutes.textContent = "00";
    seconds.textContent = "00";

    btnStart.style.display = "block";
    btnPause.style.display = "none";
    btnContinue.style.display = "none";
    btnReset.style.display = "none";
});

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
