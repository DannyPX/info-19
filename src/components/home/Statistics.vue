<template>
  <div id="statistics">
    <div class="header">
      <span class="title">Statistics</span>
      <span v-if="cumulative != ''" class="date">{{ cumulativeLastDate }}</span>
    </div>
    <div class="wrap">
      <Infobox
        v-if="cumulative != ''"
        :value="cumulativeReportedLast"
        :change="cumulativeReportedChange"
      ></Infobox>
      <Infobox
        v-if="cumulative != ''"
        :value="cumulativeHospitalizedLast"
        :change="cumulativeHospitalizedChange"
      ></Infobox>
      <Infobox
        v-if="cumulative != ''"
        :value="cumulativeDeceasedLast"
        :change="cumulativeDeceasedChange"
      ></Infobox>
    </div>
  </div>
</template>

<script>
import Infobox from "@/components/home/Infobox.vue";
import { mapGetters } from "vuex";

export default {
  name: "Statistics",
  computed: {
    ...mapGetters("data", [
      "cumulative",
      "cumulativeLastDate",
      "cumulativeReportedLast",
      "cumulativeReportedChange",
      "cumulativeHospitalizedLast",
      "cumulativeHospitalizedChange",
      "cumulativeDeceasedLast",
      "cumulativeDeceasedChange"
    ])
  },
  components: {
    Infobox
  }
};
</script>

<style scoped>
#statistics {
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .title {
  color: var(--text);
  font-weight: 500;
  font-size: 1.05rem;
}

.header .date {
  color: var(--text);
  font-size: 0.9rem;
}

.wrap {
  display: grid;
  margin-top: 10px;
  grid-template-columns: 31% 31% 31%;
  justify-content: space-between;
}
</style>
