import { pad_it_all, pad_it_full_size } from "./fix_padding.js";
import { news_dark_mode } from "./dk.js";
import { jr_newsletters } from "./news_assets.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const super_styled_btn = `<div class="divider"></div>
            <button class="newsletter_button">
              <div class="news-button-stack">
                <div class="stack-row-1">
                  <div class="publication-line">
                    <img src="../static/styles/images/JR-monogram-green.png" />
                    <p>JUST RAISED NEWSLETTER</p>
                    <div class="date-line">10/12/22</div>
                  </div>
                  <div class="title-line">
                    <p></p>
                  </div>
                </div>
                <div class="stack-row-2">
                  <p>
                    Synthetic biology...
                  </p>
                </div>
                <div class="stack-row-3">
                  <div class="author-line">
                    <p>FROM JOE SWEENY</p>
                  </div>
                </div>
              </div>
            </button>`;

function createNewsletterSection(newsletter_list = jr_newsletters) {
  newsletter_list.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  newsletter_list.forEach((e, i) => {
    const new_btn = document.createElement("div");
    new_btn.innerHTML = super_styled_btn;
    new_btn.querySelector(".title-line p").textContent = e.title;
    new_btn.querySelector(".date-line").textContent = e.date;
    new_btn.querySelector(".stack-row-2 p").textContent = e.subject_line;

    const newsletter_btn_box = $(".newsletter-button-box .newsletter-button-box__inner");
    newsletter_btn_box.append(new_btn);

    newsletter_btn_box.lastChild.addEventListener("click", () => {
      add_news_HTML(e.news);
    });
  });
}

function add_news_HTML(news_str) {
  const news_button_box = $(".newsletter-button-box");
  const newsletter_div = $(".newsletter");
  const news_html = document.createElement("div");
  news_html.classList.add("news-appended");
  news_html.innerHTML = news_str;
  newsletter_div.append(news_html);

  const create_quit_btn = document.createElement("button");
  create_quit_btn.classList.add("quit-modal");
  create_quit_btn.innerHTML = `<i class="fa-solid fa-xmark fa-2x"></i>`;

  const create_zen_btn = document.createElement("button");
  create_zen_btn.classList.add("focus-modal");
  create_zen_btn.innerHTML = `<i class="fa-solid fa-mug-hot fa-xl"></i>`;

  const news_appended_div = newsletter_div.querySelector(".news-appended");
  news_appended_div.insertBefore(create_quit_btn, news_appended_div.firstChild);
  news_appended_div.insertBefore(create_zen_btn, news_appended_div.firstChild);
  $(".news-full-size") ? window.scrollTo(0, 0) : (newsletter_div.scrollTop = 0);

  news_button_box.classList.toggle("disappear");

  newsletter_div.querySelector(".quit-modal").addEventListener("click", () => {
    news_appended_div.remove();
    news_button_box.classList.toggle("disappear");
  });

  $(".tweets") ? pad_it_all() : pad_it_full_size();
  document.body.classList.contains("dkmd") ? news_dark_mode() : null;

  newsletter_div.querySelector(".focus-modal").addEventListener("click", () => {
    const nav_target = $(".nav");
    nav_target.classList.toggle("disappear");
  });
}

createNewsletterSection();
