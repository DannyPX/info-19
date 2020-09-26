<template>
  <div id="statistics">
    <div class="header">
      <span class="title">Statistics</span>
      <span v-if="cumulative != ''" class="date">{{ date }}</span>
    </div>
    <div v-if="cumulative != ''" class="wrap">
      <Infobox
        :info="true"
        :value="totalReported"
        :change="dailyReported"
        type="Reported"
      ></Infobox>
      <Infobox
        :info="true"
        :value="totalHospitalized"
        :change="dailyHospitalized"
        type="Hospitalized"
      ></Infobox>
      <Infobox
        :info="true"
        :value="totalDeceased"
        :change="dailyDeceased"
        type="Deceased"
      ></Infobox>
    </div>
    <div v-else class="wrap">
      <Infobox type="Reported"></Infobox>
      <Infobox type="Hospitalized"></Infobox>
      <Infobox type="Deceased"></Infobox>
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
      "date",
      "totalReported",
      "dailyReported",
      "totalHospitalized",
      "dailyHospitalized",
      "totalDeceased",
      "dailyDeceased"
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
