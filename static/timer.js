let countdown;
const timerDisplay = document.querySelector(".display-time-left");
const secondTimer = document.querySelector(".second-timer");
const buttons = document.querySelectorAll("[data-time]");
const pomodoro = document.querySelector(".pomodoro");
let poms = false;

const start = new Audio("static/assets/arcade-bonus.wav");
const ding = new Audio("static/assets/arabian-mystery-harp-notification.wav");

function timer(seconds) {
  timerDisplay.classList.remove("color_red");
  clearInterval(countdown);
  start.play();

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      ding.play();
      timerDisplay.classList.add("color_red");
      clearInterval(countdown);
      poms ? pomodoro_second_timer() : null;
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const min = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${min}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
  secondTimer.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function pomodoro_first_timer() {
  poms = true;
  timer(1500);
}

function pomodoro_second_timer() {
  poms = false;
  timer(300);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});

pomodoro.addEventListener("click", pomodoro_first_timer);
