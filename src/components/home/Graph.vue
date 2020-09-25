<template>
  <div>
    <column-chart
      :data="placeholder"
      :colors="['rgb(236, 31, 39)']"
      height="25vh"
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
