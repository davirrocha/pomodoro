const focusBtn = document.querySelector("#focus");
const breakBtn = document.querySelector("#break");
const restBtn = document.querySelector("#rest");

const pauseBtn = document.querySelector("#pause");
const continueBtn = document.querySelector("#continue")
let minutes = document.querySelector("#minute");
let seconds = document.querySelector("#second");
let interval;
let isPause = false



function startFocus() {
    let minute = 24;
    let second = 60;

    interval = setInterval(() => {
        if (!isPause) {

            second -= 1

            if (second === 0) {
                minute--
                second = 59
            }


            minutes.textContent = formatTime(minute)
            seconds.textContent = formatTime(second)
        }


        if (minute === 0 && second === 1) {
            clearInterval(interval)
        }
    }, 1000);

    minutes.textContent = "25"
    seconds.textContent = "00"
    pauseBtn.style.display = "block"
}


// PAUSA DE 5MIN
function startBreak() {
    let minute = 4;
    let second = 60;
    interval = setInterval(() => {
        if (!isPause) {

            second -= 1

            if (second === 0) {
                minute--
                second = 59
            }

            minutes.textContent = formatTime(minute)
            seconds.textContent = formatTime(second)
            pauseBtn.style.display = "block"
        }

        if (minute === 0 && second === 1) {
            clearInterval(interval)
        }
    }, 1000);

    minutes.textContent = "05"
    seconds.textContent = "00"
}


//PAUSA DE 15MIN
function startRest() {
    let minute = 14;
    let second = 60;

    interval = setInterval(() => {

        if (!isPause) {
            second -= 1

            if (second === 0) {
                minute--
                second = 59
            }

            minutes.textContent = formatTime(minute)
            seconds.textContent = formatTime(second)
            pauseBtn.style.display = "block"
        }
        if (minute === 0 && second === 1) {
            clearInterval(interval)
        }
    }, 1000);

    minutes.textContent = "15"
    second.textContent = "00"
}

function stoptTimer() {

}


function pauseTimer() {
    isPause = true
    pauseBtn.style.display = "none"
    continueBtn.style.display = "block"

}

function continueTimer() {
    isPause = false
    continueBtn.style.display = "none"
    pauseBtn.style.display = "block"
}


function formatTime(time) {
    return time < 10 ? `0${time}` : time
}



focusBtn.addEventListener("click", startFocus)
breakBtn.addEventListener("click", startBreak)
restBtn.addEventListener("click", startRest)
continueBtn.addEventListener("click", continueTimer)
pauseBtn.addEventListener("click", pauseTimer)


