<template>
  <div id="blur">
    <div id="popup">
      <GuideBlock
        v-for="(block, index) in blocks"
        :key="index"
        :title="block.title"
        :info="block.info"
        :stats="block.stats"
        :close="block.close"
        @closed="guideClosed"
      ></GuideBlock>
    </div>
  </div>
</template>

<script>
import GuideBlock from "@/components/guide/GuideBlock.vue";

export default {
  name: "GuidePopup",
  data() {
    return {
      blocks: [
        {
          title: "Dropdown",
          info:
            "With the dropdown you can pick a township. The statistics and graph will refresh upon selection",
          stats: false,
          close: false
        },
        {
          title: "Statistics",
          info:
            "The statistics show multiple values in 3 different boxes. See below what each value stands for.",
          stats: true,
          close: false
        },
        {
          title: "Graph",
          info:
            "The graph shows the daily increases for the past 5 days and the current day. With the filter above  it you can switch what info should be shown.",
          stats: false,
          close: true
        }
      ]
    };
  },
  methods: {
    guideClosed() {
      this.$emit("guideClosed");
    }
  },
  components: {
    GuideBlock
  }
};
</script>

<style scoped>
#blur {
  position: absolute;
  display: flex;
  top: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  backdrop-filter: blur(9px);
  z-index: 9999;
}

#popup {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin: 20px;
  padding: 15px;
  background: var(--section1);
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--tbDropdownBorder);
  border-radius: 12px;
}
</style>
