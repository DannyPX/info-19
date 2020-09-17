<template>
  <nav>
    <div class="items">
      <router-link class="link" to="/map">
        <map-icon size="1.5x"></map-icon>
      </router-link>
      <span>{{ title }}</span>
      <router-link class="link" to="/settings">
        <settings-icon size="1.5x"></settings-icon>
      </router-link>
    </div>
    <select name="municipality">
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
  background: #ec1f27;
  color: #ffffff;
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
  font-size: 1.3rem;
  font-weight: 300;
}

select {
  background: #ffffff;
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
