<template>
  <div class="box">
    <span
      v-if="info"
      :style="change > 0 ? 'color: var(--red)' : 'color: var(--green)'"
      class="change"
      >{{ change > 0 ? "+" + change : "0" }}</span
    >
    <span v-if="info" class="number">{{ value }}</span>
    <span v-else class="loading">
      <img :src="src" />
    </span>
    <span class="type">{{ type }}</span>
  </div>
</template>

<script>
export default {
  name: "Infobox",
  data() {
    return {
      src: "/img/gif/loadingL.gif"
    };
  },
  props: {
    value: Number,
    change: Number,
    type: String,
    info: Boolean
  },
  mounted() {
    localStorage.getItem("themeColor") == "dark-mode"
      ? (this.src = "/img/gif/loadingD.gif")
      : (this.src = "/img/gif/loadingL.gif");
  }
};
</script>

<style scoped>
.box {
  position: relative;
  background: var(--statBox);
  padding: 15px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.box .change {
  position: absolute;
  color: var(--red);
  top: 0;
  right: 0;
  margin: 2px 6px;
  font-size: clamp(1rem, 4vw, 1.8rem);
}

.box .number {
  color: var(--red);
  font-weight: 500;
  font-size: clamp(1.7rem, 8vw, 3rem);
}

.box .type {
  color: var(--text);
  font-size: clamp(0.95rem, 3vw, 1.4rem);
}

.loading img {
}
</style>
