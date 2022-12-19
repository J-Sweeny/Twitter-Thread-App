const incoming_json = document
  .querySelector("#twt-tracker-data")
  .getAttribute("data-chart");

const clean_json = incoming_json.replaceAll(`'`, `"`);
console.log(clean_json);
const twt_data = JSON.parse(clean_json);

const data = {
  datasets: [
    {
      label: "Tweets",
      backgroundColor: "#FBC506",
      borderColor: "#000000",
      borderWidth: 2,
      data: twt_data,
    },
  ],
};

Chart.defaults.font.size = 14;
const config = {
  type: "bar",
  data: data,
  options: {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Tweets Last 7 Days",
        // postion: "left",
        font: { weight: "bold" },
        padding: 20,
        font: {
          size: 20,
        },
      },
    },
  },
};

const myChart = new Chart(document.getElementById("myChart"), config);
