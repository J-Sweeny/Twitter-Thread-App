localStorage.getItem("darkMode") == "dark" ? trigger_dm() : null;

const dark_mode_button = document.querySelector(".dark-mode");
dark_mode_button.addEventListener("click", trigger_dm);

export function news_dark_mode() {
  document.querySelectorAll("div.news-appended p, div.news-appended span, div.news-appended li, div.news-appended ul").forEach((e) => {
    if (e.style.fontSize >= "18px" || e.style.color == "rgb(59, 169, 62)") {
      e.classList.toggle("dkmd-green");
    } else if (e.parentElement.style.fontWeight > "400") {
      e.classList.toggle("dkmd-heading");
    } else {
      e.classList.toggle("dkmd-news");
    }
  });
  document.querySelectorAll("h1, h2, h3, .divider_inner").forEach((e) => {
    e.classList.toggle("dkmd-heading");
  });
  document.querySelectorAll(".divider_inner").forEach((e) => {
    e.classList.toggle("dkmd-div");
  });
}

function modals_dark_mode() {
  const modal = document.querySelector(".modal");
  // const news_buttons = document.querySelectorAll(".news-button-stack");
  const timer_display = document.querySelector(".display-time-left");
  const timer_sub_buttons = document.querySelectorAll(".timer_button");
  const pom = document.querySelector(".pomodoro");

  modal.classList.toggle("dkmd-grey");
  timer_display.classList.toggle("dkmd-yellow");
  timer_sub_buttons.forEach((b) => b.classList.toggle("dkmd"));
  pom.classList.toggle("dkmd-yellow");
}

function trigger_dm() {
  const navs = document.querySelectorAll(".nav");
  const user = document.querySelectorAll(".user-name-line");
  const final_drafts = document.querySelector(".final-draft-modal");

  document.body.classList.toggle("dkmd");
  navs.forEach((nav) => nav.classList.toggle("dkmd"));
  user.forEach((e) => e.classList.toggle("dkmd-heading"));
  // news_buttons.forEach((e) => e.classList.toggle("dkmd"));
  document.querySelectorAll(".news-button-stack").forEach((e) => e.classList.toggle("dkmd-news"));

  document.querySelector(".modals") ? modals_dark_mode() : null;
  document.querySelector(".news-appended") ? news_dark_mode() : null;
  final_drafts ? final_drafts.classList.toggle("dkmd") : null;

  document.body.classList.contains("dkmd") ? localStorage.setItem("darkMode", "dark") : localStorage.setItem("darkMode", "light");
}
