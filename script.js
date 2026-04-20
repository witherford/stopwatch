javascript
// Global variables
let timerInterval;
let isRunning = false;
let totalElapsed = 0;
let startTime = 0;

// Get DOM elements
const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMs = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// --- Timer Logic ---

function updateDisplay() {
    const now = Date.now();
    // Calculate time remaining in this interval
    const elapsed = now - startTime;
    totalElapsed += elapsed;

    // Breakdown time
    const hours = Math.floor(totalElapsed / 3600000);
    const minutes = Math.floor((totalElapsed % 3600000) / 60000);
    const seconds = Math.floor((totalElapsed % 60000) / 1000);
    const milliSeconds = Math.floor((totalElapsed % 1000) / 10);

    // Pad with zeros
    displayHours.innerText = hours.toString().padStart(2, '0');
    displayMinutes.innerText = minutes.toString().padStart(2, '0');
    displaySeconds.innerText = seconds.toString().padStart(2, '0');
    displayMs.innerText = milliSeconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.innerText = "Pause";
        startBtn.style.backgroundColor = "#ff4d4d"; // Red for pause

        // Use 10ms interval for smooth ms updating
        timerInterval = setInterval(updateDisplay, 10);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        startBtn.innerText = "Start";
        startBtn.style.backgroundColor = ""; // Reset to default CSS
    }
}

function resetTimer() {
    if (isRunning) pauseTimer();
    totalElapsed = 0;
    lapsList.innerHTML = ""; // Clear lap list
    startTime = 0;
    updateDisplay();
    startBtn.innerText = "Start";
    startBtn.style.backgroundColor = "";
}

function addLap() {
    const currentLapTime = totalElapsed;
    const hours = String(Math.floor(currentLapTime / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((currentLapTime % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((currentLapTime % 60000) / 1000)).padStart(2, '0');
    const ms = String(Math.floor((currentLapTime % 1000) / 10)).padStart(2, '0');
    
    const lapTimeStr = `${hours}:${minutes}:${seconds}.${ms}`;
    
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span>Lap #${lapsList.children.length + 1}</span>
        <span class="lap-time">${lapTimeStr}</span>
    `;
    
    lapsList.appendChild(lapItem);
}

// --- Event Listeners ---

// Fix: Directly bind events to prevent scope issues
startBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

// Fix: Ensure lap button is added properly
const container = document.querySelector('.container');
if (container && lapsList) {
    const lapBtn = document.createElement('button');
    lapBtn.innerText = "Lap";
    lapBtn.className = "secondary btn";
    lapBtn.style.marginTop = "10px";
    lapBtn.style.width = "100%";
    lapBtn.onclick = addLap;
    container.insertBefore(lapBtn, container.lastElementChild);
}

// Prevent spacebar from scrolling page
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) pauseTimer();
        else startTimer();
    }
});