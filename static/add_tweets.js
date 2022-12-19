const add_buttons = document.querySelectorAll(".add-tweet");
add_buttons.forEach((e) => e.addEventListener("click", addTweet));

let n = [0, 1];

export function createTweetHTML(newN = 0, btns = true, editable = true, tweet_text = false) {
  const pic = document.querySelector(".pro-pic").cloneNode(true);
  const content = document.querySelector(".tweet-block").cloneNode(true);
  content.dataset.tweet = newN;

  const content_txt = content.querySelector(".tweet-text p");
  tweet_text ? (content_txt.textContent = tweet_text) : (content_txt.textContent = `${newN}\\`);
  editable ? null : (content_txt.contentEditable = false);
  btns ? null : content.querySelector("button").remove();

  return [pic, content];
}

export function retrofit_blocks(target = document.querySelectorAll(".tweets .tweet-block")) {
  const d = Array.from(target);
  d.map((e, i) => (e.dataset.tweet = i + 1));

  d.map((e, i) => {
    const txt = e.querySelector(".tweet-text p").textContent;
    if (txt.length > 3) {
      const k = txt.slice(0, 4).indexOf(`\\`);
      e.querySelector(".tweet-text p").textContent = `${i + 1}\\${txt.slice(k + 1)}`;
    } else {
      e.querySelector(".tweet-text p").textContent = `${i + 1}\\`;
    }
  });
}

function addTweet() {
  console.log(this.parentElement.dataset.tweet);
  const trunk_tweet = this.parentElement;
  const parentN = parseInt(this.parentElement.dataset.tweet);
  const newN = parentN + 1;

  const [avtr, txt] = createTweetHTML(newN);
  trunk_tweet.insertAdjacentElement("afterend", avtr);
  trunk_tweet.nextElementSibling.insertAdjacentElement("afterend", txt);

  if (parentN == n.length) {
    n.push(newN);
  } else {
    n.splice(n.indexOf(parentN), 0, newN);
    n.map((e, i) => (e = i));
    retrofit_blocks();
  }

  const new_button = trunk_tweet.nextElementSibling.nextElementSibling.querySelector(".add-tweet");
  new_button.addEventListener("click", addTweet);
}
