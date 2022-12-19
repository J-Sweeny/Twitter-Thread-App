function trigger_pop() {
  const pop_bar = document.querySelector(".pop-up-bar");
  pop_bar.classList.toggle("slidein");
}

function trigger_drafts() {
  const drafts_bar = document.querySelector(".drafts");
  drafts_bar.classList.toggle("disappear");
  close();
  modal_stage();
}

function close() {
  // Closes anything with the class open
  const mod = document.querySelector(".opens");
  mod.classList.toggle("disappear");
  mod.classList.toggle("opens");
}

function open(c) {
  // Opens target modal
  const mod = document.querySelector(c);
  mod.classList.toggle("disappear");
  mod.classList.toggle("opens");
}

function modal_stage() {
  x = document.querySelector(".modals");
  if (document.querySelectorAll(".opens").length != 0) {
    x.classList.remove("disappear");
  } else {
    x.classList.add("disappear");
  }
}

let last_param = null;

function trigger_modals(e) {
  if (document.querySelectorAll(".opens").length == 0) {
    open(e.currentTarget.param);
    last_param = e.currentTarget;
  } else if (e.currentTarget == last_param) {
    close();
    last_param = e.currentTarget;
  } else {
    close();
    open(e.currentTarget.param);
    last_param = e.currentTarget;
  }

  modal_stage();
  if (document.querySelectorAll(".opens").length != 0) {
    document.querySelector(".drafts").classList.add("disappear");
  }
}

const pop_toggle = document.querySelector(".pop-toggle");
pop_toggle.addEventListener("click", trigger_pop);

const drafts_toggle = document.querySelector(".drafts-toggle");
drafts_toggle.addEventListener("click", trigger_drafts);

const fire_toggle = document.querySelector(".fire");
fire_toggle.param = ".newsletter";
fire_toggle.addEventListener("click", trigger_modals);

const dash_toggle = document.querySelector(".dashboard");
dash_toggle.param = ".weekly-tracker";
dash_toggle.addEventListener("click", trigger_modals);

const dm_toggle = document.querySelector(".dm");
dm_toggle.param = ".rand";
dm_toggle.addEventListener("click", trigger_modals);

const engage_toggle = document.querySelector(".engagements");
engage_toggle.param = ".feed";
engage_toggle.addEventListener("click", trigger_modals);

const remix_toggle = document.querySelector(".remix");
remix_toggle.param = ".rand";
remix_toggle.addEventListener("click", trigger_modals);

const sprint_toggle = document.querySelector(".sprint");
sprint_toggle.param = ".timer";
sprint_toggle.addEventListener("click", trigger_modals);

const form = document.querySelector("#user-search");
form.addEventListener("submit", (event) => {
  // handle the form data
  event.preventDefault();

  const username = form.elements["user-search"];
  const url = "https://twitter.com/" + username.value;

  const timeline = document.createElement("a");
  timeline.classList.add("twitter-timeline");
  timeline.setAttribute("href", url);
  timeline.setAttribute("data-chrome", "nofooter noborders noheader transparent");
  document.querySelector(".feed-widget").appendChild(timeline);

  const widget_script = document.createElement("script");
  widget_script.setAttribute("src", "https://platform.twitter.com/widgets.js");
  widget_script.setAttribute("async", " ");
  document.querySelector(".feed-widget").appendChild(widget_script);

  document.querySelector(".search-form").classList.add("disappear");
});
