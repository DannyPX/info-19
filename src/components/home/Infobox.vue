<template>
  <div class="box">
    <span
      :style="change > 0 ? 'color: var(--red)' : 'color: var(--green)'"
      class="change"
      >{{ change > 0 ? "+" + change : "0" }}</span
    >
    <span class="number">{{ value }}</span>
    <span class="type">Reported</span>
  </div>
</template>

<script>
export default {
  name: "Infobox",
  props: {
    value: Number,
    change: Number
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
</style>
