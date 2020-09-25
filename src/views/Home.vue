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
  methods: {
    ...mapActions("data", ["loadSession", "loadCumulative"]),
    checkDate() {
      let sessionDate = null;
      let sessionMunicipality = null;
      let localMunicipality = localStorage.getItem("municipality");
      // Get current date in YYYY-MM-DD
      let currentDate = new Date().toISOString().substring(0, 10);
      let currentTime = new Date().toISOString().substring(11, 13) * 1 + 2;
      // Check if sessionStorage contains cumulative
      if (sessionStorage.getItem("cumulative") != null) {
        // Convert date of last item in session to YYYY-MM-DD
        let sessionArr = JSON.parse(sessionStorage.getItem("cumulative"));
        sessionDate = sessionArr[sessionArr.length - 1].Date_of_report.split(
          " "
        )[0];
        sessionMunicipality = sessionArr[0].Municipality_name;
      }

      // Compare session and current date
      if (
        (sessionDate != currentDate && currentTime >= 15) ||
        (sessionMunicipality != localMunicipality &&
          localMunicipality != null) ||
        sessionMunicipality != "Eindhoven" ||
        sessionDate == null
      ) {
        this.loadCumulative();
        console.log("api used");
      } else {
        this.loadSession();
        console.log("session used");
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
