function pad_it(blocks) {
  blocks.forEach((element) => {
    if (element.cellPadding === "10") {
      element.style.padding = "10px";
    }
  });
}

function width700(blocks) {
  blocks.forEach((element) => {
    element.style.width = "700px";
  });
}

function imgFullSize() {
  document.querySelectorAll("img.big").forEach((element) => {
    let intial_width = parseInt(element.style.width);
    const new_width = intial_width * 1.3;
    element.style.width = new_width + "px";
  });
  // increases size by 30% or defaults to 700px / solves for smaller imgs
}

function column_edge_cases() {
  document.querySelectorAll(".column").forEach((e) => {
    if (e.width != "100%") {
      Array.from(e.children).forEach((c) => {
        c.style.width = parseInt(c.style.width) * (parseInt(e.width) / 100) + "px";
      });
    }
  });
}

// document.querySelectorAll(".column")[4].children[0].style.width =
//   parseInt(document.querySelectorAll(".column")[4].children[0].style.width) *
//     0.75 +
//   "px";

export function pad_it_all() {
  const news_blocks = document.querySelectorAll(".text_block, .button_block, .image_block, ul");
  const bullets_news = document.querySelectorAll("ul");

  bullets_news.forEach((element) => {
    element.style.paddingLeft = "30px";
  });

  pad_it(news_blocks);
}

export function pad_it_full_size() {
  const news_blocks = document.querySelectorAll(".text_block, .button_block, .image_block, ul");
  const bullets_news = document.querySelectorAll("ul");

  bullets_news.forEach((element) => {
    element.style.paddingLeft = "30px";
  });

  pad_it(news_blocks);
  width700(news_blocks);
  imgFullSize();
  column_edge_cases();
}
