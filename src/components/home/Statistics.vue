<template>
  <div id="statistics">
    <div class="header">
      <span class="title">{{ locale.statistics }}</span>
      <span v-if="totalReported != '0'" class="date">{{ date }}</span>
    </div>
    <div v-if="totalReported != '0'" key="statistics" class="wrap">
      <Infobox
        :info="true"
        :value="totalR ? totalReported : percentageReported + '%'"
        :daily="totalR ? dailyReported : -1"
        :type="locale.reported"
        @click.native="changeContent('rep')"
      ></Infobox>
      <Infobox
        :info="true"
        :value="totalH ? totalHospitalized : percentageHospitalized + '%'"
        :daily="totalH ? dailyHospitalized : -1"
        :type="locale.hospitalized"
        @click.native="changeContent('hos')"
      ></Infobox>
      <Infobox
        :info="true"
        :value="totalD ? totalDeceased : percentageDeceased + '%'"
        :daily="totalD ? dailyDeceased : -1"
        :type="locale.deceased"
        @click.native="changeContent('dec')"
      ></Infobox>
    </div>
    <div v-else key="statistics" class="wrap">
      <Infobox :type="locale.reported"></Infobox>
      <Infobox :type="locale.hospitalized"></Infobox>
      <Infobox :type="locale.deceased"></Infobox>
    </div>
  </div>
</template>

<script>
import Infobox from "@/components/home/Infobox.vue";
import { mapGetters } from "vuex";

export default {
  name: "Statistics",
  data() {
    return {
      totalR: true,
      totalH: true,
      totalD: true
    };
  },
  computed: {
    ...mapGetters("data", [
      "date",
      "totalReported",
      "dailyReported",
      "totalHospitalized",
      "dailyHospitalized",
      "totalDeceased",
      "dailyDeceased",
      "locale",
      "percentageReported",
      "percentageHospitalized",
      "percentageDeceased"
    ])
  },
  methods: {
    changeContent(type) {
      switch (type) {
        case "rep":
          this.totalR = !this.totalR;
          break;
        case "hos":
          this.totalH = !this.totalH;
          break;
        case "dec":
          this.totalD = !this.totalD;
          break;
      }
    }
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
