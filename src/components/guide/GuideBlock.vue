<template>
  <div class="wrapper">
    <span class="title">{{ title }}</span>
    <div class="d-thick"></div>
    <span class="info">{{ info }}</span>
    <div v-if="stats" class="stats">
      <img :src="src" />
      <span class="info daily">Daily increase</span>
      <span class="info daily total">Total amount</span>
      <span class="info daily what">Info reference</span>
    </div>
    <div v-if="close" @click="closePopup" class="close">Close</div>
  </div>
</template>

<script>
export default {
  name: "GuideBlock",
  data() {
    return {
      src: "/img/svg/guideBoxL.svg"
    };
  },
  props: {
    title: String,
    info: String,
    stats: Boolean,
    close: Boolean
  },
  methods: {
    closePopup() {
      localStorage.setItem("guide", false);
      this.$emit("closed");
    }
  },
  mounted() {
    localStorage.getItem("themeColor") == "dark-mode"
      ? (this.src = "/img/svg/guideBoxD.svg")
      : (this.src = "/img/svg/guideBoxL.svg");
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 10px;
}

.title {
  color: var(--statText100);
  font-size: 1.2rem;
  font-weight: 500;
}

.d-thick {
  margin-top: 3px;
  border-bottom: 2px solid var(--statText100);
}

.info {
  color: var(--statText60);
  font-size: 1rem;
  font-weight: 300;
  margin-top: 5px;
}

.stats {
  position: relative;
  margin: -4px 0 -12px -8px;
}

.daily {
  position: absolute;
  margin-top: 11px;
  margin-left: 20px;
}

.daily::before {
  content: "";
  position: absolute;
  top: 50%;
  width: 28px;
  height: 1px;
  background: var(--statText60);
  margin-left: -31px;
}

.total {
  margin-top: 32px;
}

.total::before {
  width: 40px;
  margin-left: -43px;
}

.what {
  margin-top: 59px;
}

.what::before {
  width: 40px;
  margin-left: -43px;
}

.close {
  display: flex;
  width: 100px;
  height: 32px;
  margin: 0 auto;
  border: 1px solid var(--tbDropdownBorder);
  border-radius: 20px;
  background: var(--tbBackground);
  color: var(--sortActive);
  justify-content: center;
  align-items: center;
  margin-bottom: -2px;
  margin-top: 18px;
}
</style>
