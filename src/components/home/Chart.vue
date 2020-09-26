<template>
  <div class="chart-wrap">
    <Barchart
      :height="210"
      :chartData="datacollection"
      :options="options"
    ></Barchart>
  </div>
</template>

<script>
import Barchart from "@/components/chart/Barchart.js";

export default {
  name: "Chart",
  data() {
    return {
      datacollection: {
        label: "",
        backgroundColor: "#ec1f27",
        data: 0
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "#000000",
                fontFamily: "Signika",
                fontSize: 14
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 8,
                fontColor: "#000000",
                fontFamily: "Signika",
                fontSize: 14
              },
              gridLines: {
                color: "#a6a6a6",
                borderDash: [3, 4],
                borderDashOffset: 4,
                zeroLineColor: "#a6a6a6"
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    };
  },
  mounted() {
    this.fillData();
  },
  components: {
    Barchart
  },
  methods: {
    fillData() {
      if (localStorage.getItem("themeColor") == "dark-mode") {
        this.options.scales.yAxes[0].ticks.fontColor = "#ffffff";
        this.options.scales.xAxes[0].ticks.fontColor = "#ffffff";
      }
      this.datacollection = {
        labels: ["20/09", "21/09", "22/09", "23/09", "24/09", "25/09"],
        datasets: [
          {
            label: null,
            backgroundColor: "#ec1f27",
            hoverBackgroundColor: "#bc1016",
            data: [42, 45, 55, 60, 63, 72],
            barPercentage: 0.4
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.chart-wrap {
  position: relative;
  background: var(--statBox);
  padding: 10px 10px 5px 5px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
</style>
