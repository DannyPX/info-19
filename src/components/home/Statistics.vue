<template>
  <div id="statistics">
    <div class="header">
      <span class="title">Statistics</span>
      <span v-if="totalReported != '0'" class="date">{{ date }}</span>
    </div>
    <div v-if="totalReported != '0'" key="statistics" class="wrap">
      <Infobox
        :info="true"
        :value="totalReported"
        :daily="dailyReported"
        type="Reported"
      ></Infobox>
      <Infobox
        :info="true"
        :value="totalHospitalized"
        :daily="dailyHospitalized"
        type="Hospitalized"
      ></Infobox>
      <Infobox
        :info="true"
        :value="totalDeceased"
        :daily="dailyDeceased"
        type="Deceased"
      ></Infobox>
    </div>
    <div v-else key="statistics" class="wrap">
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
  color: var(--statText100);
  font-weight: 500;
  font-size: 1.05rem;
}

.header .date {
  color: var(--statText60);
  font-size: 0.9rem;
}

.wrap {
  display: grid;
  margin-top: 10px;
  grid-template-columns: 31% 31% 31%;
  justify-content: space-between;
}
</style>
