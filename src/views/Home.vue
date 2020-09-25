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
        <column-chart
          :data="placeholder"
          :colors="['rgb(236, 31, 39)']"
          height="25vh"
          :min="0"
        ></column-chart>
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
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      placeholder: [
        ["19 sept", 985],
        ["20 sept", 1003],
        ["21 sept", 1021],
        ["22 sept", 1057],
        ["23 sept", 1093],
        ["24 sept", 1130]
      ]
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
        (sessionDate != currentDate && currentTime >= 12) ||
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
    Sort
  }
};
</script>
