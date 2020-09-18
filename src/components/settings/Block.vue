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
        <DarkMode v-if="darkToggle" :modes="['light', 'dark']">
          Click
        </DarkMode>
        <toggle-button
          v-if="!darkToggle"
          :value="toggle"
          :color="{ checked: 'var(--red)', unchecked: 'var(--toggle)' }"
          :width="45"
          :margin="2"
        />
      </div>
      <div class="d-thin"></div>
      <div v-if="slide2" class="slide">
        <span>{{ option2 }}</span>
        <span class="location">{{ currentLocation }}</span>
      </div>
      <div v-if="slide2" class="d-thin"></div>
    </div>
  </div>
</template>

<script>
import { MapPinIcon, BellIcon, LayoutIcon } from "vue-feather-icons";
import { ToggleButton } from "vue-js-toggle-button";
import { DarkMode } from "@vue-a11y/dark-mode";

export default {
  name: "Block",
  props: {
    location: Boolean,
    notification: Boolean,
    theme: Boolean,
    title: String,
    option: String,
    slide2: Boolean,
    option2: String,
    currentLocation: String,
    toggle: Boolean,
    darkToggle: Boolean,
  },
  components: {
    MapPinIcon,
    BellIcon,
    LayoutIcon,
    ToggleButton,
    DarkMode,
  },
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
  color: var(--text);
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
  border-bottom: 2px solid var(--text);
}

.d-thin {
  border-bottom: 1px solid var(--thinLine);
}

.slide {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 1.05rem;
  color: var(--slide);
}

.location {
  color: var(--text);
  font-weight: 500;
}
</style>
