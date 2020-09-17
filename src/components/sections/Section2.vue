<template>
  <div id="section2">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Section2",
  props: {
    height: Number,
  },
};
</script>

<style scoped>
#section2 {
  height: calc(100vh - 318px);
  width: 100%;
  background: #f2f2f2;
  border-radius: 30px 30px 0 0;
  box-sizing: border-box;
  padding: 20px;
}
</style>
