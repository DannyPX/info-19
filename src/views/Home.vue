<template>
  <div>
    <Topbar
      title="INFO-19"
      :map="true"
      :settings="true"
      :dropdown="true"
    ></Topbar>
    <Section1 :top="165">
      <Statistics></Statistics>
      <Section2>
        <Chart></Chart>
      </Section2>
    </Section1>
    <GuidePopup v-if="guide == null" @guideClosed="guide = true"></GuidePopup>
  </div>
</template>

<script>
import Topbar from "@/components/nav/Topbar.vue";
import Section1 from "@/components/sections/Section1.vue";
import Statistics from "@/components/home/Statistics.vue";
import Section2 from "@/components/sections/Section2.vue";
import Chart from "@/components/home/Chart.vue";
import GuidePopup from "@/components/guide/GuidePopup.vue";
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      guide: localStorage.getItem("guide"),
      location: localStorage.getItem("locationAuto")
    };
  },
  methods: {
    ...mapActions("data", ["loadSession", "loadCumulative"]),
    ...mapActions("location", ["refreshLocation"]),
    checkSession() {
      let sessionDate = null;
      let sessionDay = null;
      let sessionMunicipality = null;
      let localMunicipality = localStorage.getItem("municipality");
      // Get current date in YYYY-MM-DD
      let currentDate = new Date().toISOString().substring(0, 10);
      // Get current day from date
      let currentDay = currentDate.split("-")[2] * 1;
      // Get current time in hours
      let currentTime = new Date().toISOString().substring(11, 13) * 1 + 2;

      // Prevent empty municipality in local storage
      if (localMunicipality == null) {
        localStorage.setItem("municipality", "Eindhoven");
      }

      // Check if sessionStorage contains cumulative
      if (sessionStorage.getItem("cumulative") != null) {
        // Convert api data in session to usable JSON
        let sessionArr = JSON.parse(sessionStorage.getItem("cumulative"));
        // Convert date of last item in session to YYYY-MM-DD
        sessionDate = sessionArr[sessionArr.length - 1].Date_of_report.split(
          " "
        )[0];
        sessionDay = sessionDate.split("-")[2] * 1;
        // Get the municipality name of the first item
        sessionMunicipality = sessionArr[0].Municipality_name;
      }

      // Reduce api calls made when entering the home screen by using sessions
      // Use sessions storage when
      // The sessions and current towns and date are the same
      // The sessiondate is different from current and the time is before 15:00
      if (
        (sessionMunicipality == localMunicipality &&
          sessionDate == currentDate) ||
        (sessionMunicipality == localMunicipality &&
          sessionDay == currentDay - 1 &&
          currentTime < 15) ||
        (sessionMunicipality == localMunicipality &&
          sessionDay - 29 == currentDay &&
          currentTime < 15) ||
        (sessionMunicipality == localMunicipality &&
          sessionDay - 30 == currentDay &&
          currentTime < 15)
      ) {
        this.loadSession();
        window.console.log("session used");
      } else {
        this.loadCumulative();
        window.console.log("api used");
      }
    }
  },
  created() {
    this.checkSession();
  },
  mounted() {
    if (this.location == "on") {
      this.refreshLocation();
      window.console.log("used current location");
    }
  },
  components: {
    Topbar,
    Section1,
    Statistics,
    Section2,
    Chart,
    GuidePopup
  }
};
</script>
