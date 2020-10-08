<template>
  <div id="blur">
    <div id="popup">
      <GuideBlock
        :title="locale.dropdown"
        :info="locale.dropdown_text"
      ></GuideBlock>
      <GuideBlock
        :title="locale.statistics"
        :info="locale.statistics_text"
        :stats="true"
      ></GuideBlock>
      <GuideBlock
        :title="locale.graph"
        :info="locale.graph_text"
        :close="true"
        @closed="guideClosed"
      ></GuideBlock>
    </div>
  </div>
</template>

<script>
import GuideBlock from "@/components/guide/GuideBlock.vue";
import { mapGetters } from "vuex";

export default {
  name: "GuidePopup",
  computed: {
    ...mapGetters("data", ["locale"])
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
