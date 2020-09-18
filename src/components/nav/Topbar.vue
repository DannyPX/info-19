<template>
  <nav>
    <div class="items">
      <router-link class="link" :to="map ? '/map' : '/'">
        <map-icon size="1.5x" v-if="map"></map-icon>
        <img class="back" src="/img/svg/back.svg" v-if="!map" />
      </router-link>
      <span>{{ title }}</span>
      <settings-icon
        v-if="!settings"
        class="placeholder"
        size="1.5x"
      ></settings-icon>
      <router-link v-if="settings" class="link" to="/settings">
        <settings-icon size="1.5x"></settings-icon>
      </router-link>
    </div>
    <select name="municipality" v-if="dropdown">
      <option value="null">Choose a municipality</option>
      <option value="ams">Amsterdam</option>
      <option value="rot">Rotterdam</option>
    </select>
  </nav>
</template>

<script>
import { MapIcon, SettingsIcon } from "vue-feather-icons";

export default {
  name: "Bigtopbar",
  props: {
    title: String,
    map: Boolean,
    settings: Boolean,
    dropdown: Boolean,
  },
  components: {
    MapIcon,
    SettingsIcon,
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 200px;
  background: var(--red);
  display: flex;
  flex-flow: column nowrap;
}

.items {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  margin-top: 45px;
}

.items span {
  color: var(--white);
  font-size: 1.3rem;
  font-weight: 300;
}

.back {
  margin-right: 12px;
}

.placeholder {
  opacity: 0;
}

select {
  background: var(--dropdown);
  color: var(--text);
  margin: 20px;
  font-size: 1.05rem;
  font-family: "Signika";
  font-weight: 500;
  padding: 0 20px;
  height: 50px;
  border-radius: 12px;
  border: none;
  outline: none;
  background-image: url("/img/svg/dropdown.svg");
  background-repeat: no-repeat;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-position: right 20px center;
}
</style>
