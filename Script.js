let startTime;
let isRunning = false;
let lapCounter = 1;

const display = document.querySelector('.display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lapList');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startPause() {
    if (!isRunning) {
        startTime = new Date().getTime();
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
        updateDisplay();
        runStopwatch();
    } else {
        isRunning = false;
        startPauseBtn.textContent = 'Resume';
    }
}

function reset() {
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    display.textContent = '00:00:00';
    lapCounter = 1;
    lapList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = calculateElapsedTime();
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.insertBefore(lapItem, lapList.firstChild);
    }
}

function runStopwatch() {
    if (isRunning) {
        setTimeout(function () {
            updateDisplay();
            runStopwatch();
        }, 10);
    }
}

function updateDisplay() {
    const elapsed = calculateElapsedTime();
    display.textContent = formatTime(elapsed);
}

function calculateElapsedTime() {
    const currentTime = new Date().getTime();
    const elapsed = currentTime - startTime;
    return elapsed;
}

function formatTime(time) {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor(time % 1000);

    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
    return formattedTime;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function padMilliseconds(num) {
    return num.toString().padStart(3, '0');
}
