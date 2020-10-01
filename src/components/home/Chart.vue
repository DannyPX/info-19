<template>
  <div>
    <Sort @changeActive="changeChart" title="Graph"></Sort>
    <div class="chart-wrap">
      <span v-if="totalReported == 0" class="loader">Loading...</span>
      <Barchart
        key="chart"
        :height="210"
        :chartData="datacollection"
        :options="options"
      ></Barchart>
    </div>
  </div>
</template>

<script>
import Sort from "@/components/sort/Sort.vue";
import Barchart from "@/components/chart/Barchart.js";
import { mapGetters } from "vuex";

export default {
  name: "Chart",
  data() {
    return {
      barBorder: "transparent",
      barBackground: "#ec1f27",
      statType: 0,
      datacollection: {
        label: "",
        backgroundColor: "#ec1f27",
        data: 0
      },
      options: {
        cornerRadius: 20,
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
                maxTicksLimit: 7,
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
  computed: {
    ...mapGetters("data", [
      "cumulative",
      "totalReported",
      "lastSixDays",
      "lastSixReports",
      "lastSixHospitalized",
      "lastSixDeceased"
    ])
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.lastSixDays,
        datasets: [
          {
            label: null,
            backgroundColor: this.barBackground,
            borderWidth: 1.2,
            borderColor: this.barBorder,
            hoverBackgroundColor: "#bc1016",
            data: this.statType != 0 ? this.statType : this.lastSixReports,
            barPercentage: 0.4
          }
        ]
      };
    },
    changeChart(clicked) {
      switch (clicked.id) {
        case "rep":
          this.statType = this.lastSixReports;
          break;
        case "hos":
          this.statType = this.lastSixHospitalized;
          break;
        case "dec":
          this.statType = this.lastSixDeceased;
          break;
      }
      this.fillData();
    }
  },
  watch: {
    cumulative() {
      this.fillData();
    }
  },
  mounted() {
    if (localStorage.getItem("themeColor") == "dark-mode") {
      this.options.scales.xAxes[0].ticks.fontColor = "#c6c6c6";
      this.options.scales.yAxes[0].ticks.fontColor = "#c6c6c6";
      this.barBorder = "#ed454b";
      this.barBackground = "#321E1F";
    }
    if (this.cumulative != "") this.fillData();
  },
  components: {
    Sort,
    Barchart
  }
};
</script>

<style scoped>
.chart-wrap {
  position: relative;
  background: var(--statBox);
  margin: 0 20px;
  padding: 10px 10px 5px 5px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.loader {
  color: var(--statText100);
  font-size: clamp(0.95rem, 3vw, 1.4rem);
  position: absolute;
  right: 50%;
  bottom: 55%;
  transform: translateX(50%);
}
</style>
