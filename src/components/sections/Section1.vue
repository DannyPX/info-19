<template>
  <div
    id="section1"
    :style="'height: calc(100vh - ' + top + 'px);' + 'top: ' + top + 'px'"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Section1",
  props: {
    top: Number,
  },
};
</script>

<style scoped>
#section1 {
  position: absolute;
  width: 100%;
  background: var(--section1);
  border-radius: 30px 30px 0 0;
  box-sizing: border-box;
}
</style>
