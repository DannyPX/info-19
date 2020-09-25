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
        <Sort title="Graph"></Sort>
        <column-chart
          :data="placeholder"
          :colors="['rgb(236, 31, 39)']"
          height="25vh"
          :min="0"
          :max="60"
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
        ["13 sept", 8],
        ["14 sept", 13],
        ["15 sept", 11],
        ["16 sept", 17],
        ["17 sept", 14],
        ["18 sept", 16]
      ]
    };
  },
  methods: {
    ...mapActions("data", ["loadSession", "loadCumulative", "loadDaily"]),
    checkDate() {
      let sessionDate = null;
      // Get current date in YYYY-MM-DD
      let currentDate = new Date().toISOString().substring(0, 10);
      // Check if sessionStorage contains cumulative
      if (sessionStorage.getItem("cumulative") != null) {
        // Convert date of last item in session to YYYY-MM-DD
        let sessionArr = JSON.parse(sessionStorage.getItem("cumulative"));
        sessionDate = sessionArr[sessionArr.length - 1].Date_of_report.split(
          " "
        )[0];
      }

      // Compare session and current date
      if (sessionDate != currentDate || sessionDate == null) {
        this.loadCumulative();
        console.log("api used");
      } else {
        this.loadSession();
        console.log("session used");
      }
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
