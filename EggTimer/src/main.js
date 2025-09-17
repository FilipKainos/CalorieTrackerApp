// Entry point for EggTimer app
// See TASK-project-structure.md, TASK-basic-timer-logic.md, TASK-timer-ui.md
import EggTimer from './timer.js';
const app = document.getElementById('app');

// --- UI Elements ---
const timerDisplay = document.createElement('div');
timerDisplay.id = 'timer-display';
timerDisplay.textContent = '00:00';

const controls = document.createElement('div');
controls.id = 'timer-controls';
controls.style.display = 'flex';
controls.style.justifyContent = 'center';
controls.style.gap = '16px';
controls.style.marginBottom = '24px';

function makeButton(label, color) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.style.background = color || '#eee';
  btn.style.color = '#222';
  btn.style.border = 'none';
  btn.style.borderRadius = '6px';
  btn.style.padding = '12px 28px';
  btn.style.fontSize = '1.1rem';
  btn.style.fontWeight = 'bold';
  btn.style.cursor = 'pointer';
  btn.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
  btn.onmouseover = () => btn.style.background = '#d1eaff';
  btn.onmouseout = () => btn.style.background = color || '#eee';
  return btn;
}


// --- Minimal Timer Logic ---
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const timer = new EggTimer(
  (remaining) => {
    timerDisplay.textContent = formatTime(remaining);
  },
  () => {
    timerDisplay.textContent = 'Done!';
  }
);

// Set initial time (e.g., 3 minutes)
timer.setTime(180);


// --- Custom Time Input ---
const customTimeForm = document.createElement('form');
customTimeForm.style.display = 'flex';
customTimeForm.style.justifyContent = 'center';
customTimeForm.style.gap = '8px';
customTimeForm.style.marginBottom = '18px';

const minInput = document.createElement('input');
minInput.type = 'number';
minInput.min = '0';
minInput.max = '99';
minInput.value = '3';
minInput.style.width = '48px';
minInput.placeholder = 'min';

const secInput = document.createElement('input');
secInput.type = 'number';
secInput.min = '0';
secInput.max = '59';
secInput.value = '0';
secInput.style.width = '48px';
secInput.placeholder = 'sec';

const setBtn = makeButton('Set', '#b6e388');
setBtn.type = 'submit';

customTimeForm.appendChild(minInput);
customTimeForm.appendChild(document.createTextNode('min'));
customTimeForm.appendChild(secInput);
customTimeForm.appendChild(document.createTextNode('sec'));
customTimeForm.appendChild(setBtn);

customTimeForm.onsubmit = (e) => {
  e.preventDefault();
  let mins = parseInt(minInput.value, 10) || 0;
  let secs = parseInt(secInput.value, 10) || 0;
  let total = mins * 60 + secs;
  if (total > 0) {
    timer.setTime(total);
    timerDisplay.textContent = formatTime(total);
  }
};

// --- Controls ---
const startBtn = makeButton('Start', '#b6e388');
const pauseBtn = makeButton('Pause', '#ffe388');
const resetBtn = makeButton('Reset', '#ffd6a5');

startBtn.onclick = () => timer.start();
pauseBtn.onclick = () => timer.pause();
resetBtn.onclick = () => timer.reset();

controls.appendChild(startBtn);
controls.appendChild(pauseBtn);
controls.appendChild(resetBtn);


// --- Beep Sound ---
const beep = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
beep.volume = 1.0;

function playBeepPattern() {
  // 4 quick beeps (150ms beep, 100ms gap), 500ms pause, repeat 2 more times
  const beepCount = 4;
  const beepDuration = 100;
  const smallGap = 15;
  const bigGap = 500;
  let pattern = [];
  for (let set = 0; set < 3; set++) {
    for (let i = 0; i < beepCount; i++) {
      pattern.push('beep');
      if (i < beepCount - 1) pattern.push('smallGap');
    }
    if (set < 2) pattern.push('bigGap');
  }

  let idx = 0;
  function next() {
    if (idx >= pattern.length) return;
    const action = pattern[idx++];
    if (action === 'beep') {
      beep.currentTime = 0;
      beep.play();
      setTimeout(next, beepDuration);
    } else if (action === 'smallGap') {
      setTimeout(next, smallGap);
    } else if (action === 'bigGap') {
      setTimeout(next, bigGap);
    }
  }
  next();
}

// Patch timer finish callback to play beep pattern
timer.onFinish = () => {
  timerDisplay.textContent = 'Done!';
  playBeepPattern();
};

// --- App Layout ---
const card = document.createElement('div');
card.id = 'timer-card';
card.appendChild(customTimeForm);
card.appendChild(timerDisplay);
card.appendChild(controls);

app.innerHTML = '';
app.appendChild(card);
