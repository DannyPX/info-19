<template>
  <div class="block">
    <div class="box">
      <div class="header">
        <sliders-icon v-if="general" size="1.3x"></sliders-icon>
        <map-pin-icon v-if="location" size="1.3x"></map-pin-icon>
        <bell-icon v-if="notification" size="1.3x"></bell-icon>
        <layout-icon v-if="theme" size="1.3x"></layout-icon>
        <span>{{ title }}</span>
      </div>
      <div class="d-thick"></div>
      <div class="slide">
        <span>{{ option }}</span>
        <toggle-button
          v-if="!general"
          key="button"
          :value="toggle"
          :color="{ checked: 'var(--red)', unchecked: 'var(--toggle)' }"
          :width="45"
          :margin="2"
          @click.native="vibrate"
          @change="functionName"
        />
        <div v-else key="button" class="language">
          <img
            @click="changeLocale('en')"
            :class="{ active: !isActive }"
            src="/img/svg/flagEnglish.svg"
          />
          <img
            @click="changeLocale('nl')"
            :class="{ active: isActive }"
            src="/img/svg/flagDutch.svg"
          />
        </div>
      </div>
      <div class="d-thin"></div>
      <div v-if="general" class="slide" @click="showGuide">
        <span>{{ option2 }}</span>
        <chevron-right-icon size="1.2x"></chevron-right-icon>
      </div>
      <div v-if="general" class="d-thin"></div>
    </div>
  </div>
</template>

<script>
import {
  SlidersIcon,
  ChevronRightIcon,
  MapPinIcon,
  BellIcon,
  LayoutIcon
} from "vue-feather-icons";
import { ToggleButton } from "vue-js-toggle-button";
import { mapActions } from "vuex";

export default {
  name: "Block",
  data() {
    return {
      isActive: localStorage.getItem("locale") == "en" ? true : false
    };
  },
  props: {
    general: Boolean,
    location: Boolean,
    notification: Boolean,
    theme: Boolean,
    title: String,
    option: String,
    option2: String,
    toggle: Boolean
  },
  methods: {
    ...mapActions("data", ["loadLocale"]),
    changeLocale(language) {
      if (localStorage.getItem("locale") != language) {
        localStorage.setItem("locale", language);
        this.loadLocale();
        this.isActive = language == "en" ? true : false;
      }
    },
    vibrate() {
      navigator.vibrate(15);
    },
    functionName() {
      this.$emit("functionName");
    },
    showGuide() {
      this.$emit("showGuide");
    }
  },
  components: {
    SlidersIcon,
    ChevronRightIcon,
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
  border-bottom: 1px solid var(--line);
}

.slide {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 1.05rem;
  color: var(--statText60);
}

.language {
  margin-bottom: -5px;
}

.language img {
  margin-right: 5px;
  transition: 0.4s ease-in-out;
}

.active {
  opacity: 0.4;
}
</style>
