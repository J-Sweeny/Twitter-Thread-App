const gradient = [
  "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
  "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
  "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
  "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)",
  "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
  "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
  "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)",
  "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)",
  "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
  "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
  "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
  "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
  "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
  "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)",
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
  "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
  "linear-gradient(180deg, #2af598 0%, #009efd 100%)",
  "linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)",
  "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)",
  "linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%)",
  "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
  //  "background-color: #DCD9D4; background-image: linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%); background-blend-mode: soft-light,screen;",
  "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
  "linear-gradient(to top, #c471f5 0%, #fa71cd 100%)",
  "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
  "linear-gradient(to top, #feada6 0%, #f5efef 100%)",
  "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
  "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
  "linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%)",
  // "linear-gradient(to right, #434343 0%, black 100%)",
  "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)",
  "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
  "linear-gradient(to top, #c79081 0%, #dfa579 100%)",
  "linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)",
  "linear-gradient(to right, #868f96 0%, #596164 100%)",
  "linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)",
  "linear-gradient(to top, #09203f 0%, #537895 100%)",
  "linear-gradient(to top, #f77062 0%, #fe5196 100%)",
  "linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
];

let rand_gradient = gradient[Math.floor(Math.random() * gradient.length + 1)];
document.body.style.background = rand_gradient;

document.body.addEventListener("click", () => {
  const rand_gradient =
    gradient[Math.floor(Math.random() * gradient.length + 1)];
  document.body.style.background = rand_gradient;
});
