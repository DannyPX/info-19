<template>
  <div class="graph-wrap">
    <column-chart
      :data="placeholder"
      :colors="['rgb(236, 31, 39)']"
      height="22vh"
      :min="0"
    ></column-chart>
  </div>
</template>

<script>
export default {
  name: "Graph",
  data() {
    return {
      placeholder: [
        ["19 sept", 985],
        ["20 sept", 1003],
        ["21 sept", 1021],
        ["22 sept", 1057],
        ["23 sept", 1093],
        ["24 sept", 1130]
      ]
    };
  }
};
</script>

<style scoped>
.graph-wrap {
  position: relative;
  background: var(--statBox);
  padding: 10px 10px 10px 5px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
</style>
