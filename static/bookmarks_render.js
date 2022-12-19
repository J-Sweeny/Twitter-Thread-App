// Render Bookmarks

// Create Twitter Feed
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
