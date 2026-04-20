javascript
let timerInterval;
let isRunning = false;
let elapsedTime = 0;
let startTime = 0;

// DOM Elements
const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMs = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');
const startBtn = document.getElementById('startBtn');

// Format the time string nicely
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliSeconds = Math.floor((ms % 1000) / 10); // Show first two digits of ms

    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
        milliSeconds.toString().padStart(2, '0'),
    ];
}

function updateDisplay() {
    const timeParts = formatTime(elapsedTime);
    displayHours.innerText = timeParts[0];
    displayMinutes.innerText = timeParts[1];
    displaySeconds.innerText = timeParts[2];
    displayMs.innerText = timeParts[3];
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.innerText = "Pause";
        startBtn.style.backgroundColor = "#ff4d4d"; // Change to pause color
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10); // Update every 10ms
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        startBtn.innerText = "Resume";
        startBtn.style.backgroundColor = ""; // Revert to default CSS
        startBtn.classList.add('secondary'); // Visual cue
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    startTime = 0;
    lapsList.innerHTML = ""; // Clear laps
    
    updateDisplay();
    startBtn.innerText = "Start";
    startBtn.classList.remove('secondary');
}

// Add Lap functionality (Just visual appending for now)
function addLap() {
    const now = Date.now();
    const currentLapDuration = now - elapsedTime; // Time taken for this specific lap
    
    const li = document.createElement('div');
    li.classList.add('lap-item');
    li.innerHTML = `
        <span>Lap #${lapsList.children.length + 1}</span>
        <span class="lap-time">${formatTime(currentLapDuration).join(':')}</span>
    `;
    lapsList.appendChild(li);
}

// Event Listeners
startBtn.addEventListener('click', () => {
    if(isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);

document.addEventListener('keydown', (e) => {
    // Allow Space bar to toggle start/pause
    if (e.code === 'Space') {
        startBtn.click();
    }
});

// Add a button for adding laps
const lapBtn = document.createElement('button');
lapBtn.innerText = "Lap";
lapBtn.className = "secondary btn";
lapBtn.style.marginTop = "10px";
lapBtn.onclick = addLap;
container = document.querySelector('.container');
// Insert the lap button next to controls
container.insertBefore(lapBtn, container.lastElementChild);