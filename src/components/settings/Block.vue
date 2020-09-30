<template>
  <div class="block">
    <div class="box">
      <div class="header">
        <map-pin-icon class="test" v-if="location" size="1.3x"></map-pin-icon>
        <bell-icon v-if="notification" size="1.3x"></bell-icon>
        <layout-icon v-if="theme" size="1.3x"></layout-icon>
        <span>{{ title }}</span>
      </div>
      <div class="d-thick"></div>
      <div class="slide">
        <span>{{ option }}</span>
        <toggle-button
          :value="toggle"
          :color="{ checked: 'var(--red)', unchecked: 'var(--toggle)' }"
          :width="45"
          :margin="2"
          @click.native="vibrate"
          @change="functionName"
        />
      </div>
      <div class="d-thin"></div>
    </div>
  </div>
</template>

<script>
import { MapPinIcon, BellIcon, LayoutIcon } from "vue-feather-icons";
import { ToggleButton } from "vue-js-toggle-button";

export default {
  name: "Block",
  props: {
    location: Boolean,
    notification: Boolean,
    theme: Boolean,
    title: String,
    option: String,
    toggle: Boolean
  },
  methods: {
    vibrate() {
      navigator.vibrate(15);
    },
    functionName() {
      this.$emit("functionName");
    }
  },
  components: {
    MapPinIcon,
    BellIcon,
    LayoutIcon,
    ToggleButton
  }
};
</script>

<style scoped>
.block {
  padding: 20px 20px 0 20px;
}

.box {
  display: flex;
  flex-flow: column nowrap;
}

.header {
  color: var(--statText100);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.header span {
  margin-left: 8px;
  font-size: 1.2rem;
  font-weight: 500;
}

.d-thick {
  margin-top: 3px;
  border-bottom: 2px solid var(--statText100);
}

.d-thin {
  border-bottom: 1px solid var(--statText60);
}

.slide {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 1.05rem;
  color: var(--statText60);
}
</style>
