<template>
  <div>
    <Topbar
      title="INFO-19"
      :map="true"
      :settings="true"
      :dropdown="true"
    ></Topbar>
    <Section1 :top="165">
      <span
        style="display: block; margin-left: 90px; position: absolute;"
        v-if="false"
        @click="test"
      >
        Click to change municipality
      </span>
      <Statistics></Statistics>
      <Section2>
        <Sort title="Graph"></Sort>
        <Graph></Graph>
      </Section2>
    </Section1>
  </div>
</template>

<script>
import Topbar from "@/components/nav/Topbar.vue";
import Section1 from "@/components/sections/Section1.vue";
import Statistics from "@/components/home/Statistics.vue";
import Section2 from "@/components/sections/Section2.vue";
import Sort from "@/components/sort/Sort.vue";
import Graph from "@/components/home/Graph.vue";
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      defaultLocation: localStorage.getItem("defaultLocation") || "Eindhoven"
    };
  },
  methods: {
    ...mapActions("data", ["loadSession", "loadCumulative"]),
    checkDate() {
      let sessionDate = null;
      let sessionMunicipality = null;
      let localMunicipality = localStorage.getItem("municipality");
      // Get current date in YYYY-MM-DD
      let currentDate = new Date().toISOString().substring(0, 10);
      // Get current time in hours
      let currentTime = new Date().toISOString().substring(11, 13) * 1 + 2;

      // Prevent empty municipality in local storage
      if (localMunicipality == null) {
        localStorage.setItem("municipality", this.defaultLocation);
      }

      // Check if sessionStorage contains cumulative
      if (sessionStorage.getItem("cumulative") != null) {
        // Convert api data in session to usable JSON
        let sessionArr = JSON.parse(sessionStorage.getItem("cumulative"));
        // Convert date of last item in session to YYYY-MM-DD
        sessionDate = sessionArr[sessionArr.length - 1].Date_of_report.split(
          " "
        )[0];
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
        (sessionDate != currentDate && currentTime < 15)
      ) {
        this.loadSession();
        console.log("session used");
      } else {
        this.loadCumulative();
        console.log("api used");
      }
    },
    test() {
      localStorage.setItem("municipality", "Amsterdam");
      this.loadCumulative();
    }
  },
  created() {
    this.checkDate();
  },
  components: {
    Topbar,
    Section1,
    Statistics,
    Section2,
    Sort,
    Graph
  }
};
</script>
