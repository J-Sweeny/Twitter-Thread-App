import { retrofit_blocks, createTweetHTML } from "./add_tweets.js";

const twt_button = document.querySelector(".twt button");
twt_button.addEventListener("click", finalDraft);

function getTweets() {
  const xyz = Array.from(document.querySelectorAll(".tweet-text p"));
  const final_tweets = xyz.map((e) => e.textContent).filter((e) => e.length > 3);
  return final_tweets;
}

function finalDraft() {
  const final_tweets = getTweets();
  const new_twt_html = final_tweets.map((e, i) => createTweetHTML(i + 1, false, false, e));
  console.table(new_twt_html);

  const finalDraftModal = document.querySelector(".final-draft-modal");
  const quitBtn = finalDraftModal.querySelector(".quit-modal");
  const quitBtnClone = quitBtn.cloneNode(true);

  new_twt_html.forEach((e) => {
    finalDraftModal.append(e[0]);
    finalDraftModal.append(e[1]);
    retrofit_blocks(document.querySelectorAll(".final-draft-modal .tweet-block"));
  });
  finalDraftModal.classList.remove("disappear");
  document.querySelector(".final-draft-backdrop").classList.remove("disappear");
  document.body.style.position = "fixed";

  quitBtn.addEventListener("click", (e) => {
    finalDraftModal.innerHTML = null;
    finalDraftModal.append(quitBtnClone);
    finalDraftModal.classList.add("disappear");
    document.querySelector(".final-draft-backdrop").classList.add("disappear");
    document.body.style.position = "";
  });
}
