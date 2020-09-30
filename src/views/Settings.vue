<template>
  <div>
    <Topbar title="SETTINGS" :map="false" :settings="false"></Topbar>
    <Section1 :top="90">
      <Block
        :location="true"
        title="Location"
        option="Automatic"
        :toggle="checkLocalStorage('locationAuto', 'on')"
        @functionName="toggleAutoLocation"
      ></Block>
      <Block
        :notification="true"
        title="Notifications"
        option="Push notifications"
        :toggle="false"
      ></Block>
      <Block
        :theme="true"
        title="Theme"
        option="Dark mode"
        :toggle="checkLocalStorage('themeColor', 'dark-mode')"
        @functionName="toggleTheme"
      ></Block>
      <span class="version">Version {{ version }}</span>
    </Section1>
  </div>
</template>

<script>
import Topbar from "@/components/nav/Topbar.vue";
import Section1 from "@/components/sections/Section1.vue";
import Block from "@/components/settings/Block.vue";
import { mapActions } from "vuex";

export default {
  name: "Settings",
  data() {
    return {
      location: "Choose a location",
      version: "0.0.1"
    };
  },
  methods: {
    ...mapActions("location", ["getLocation"]),
    checkLocalStorage(key, value) {
      let locationAuto = localStorage.getItem(key);
      return locationAuto == value ? true : false;
    },
    async getLatLng() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(pos);
          },
          err => {
            reject(err);
          }
        );
      });
    },
    async toggleAutoLocation() {
      let locationAuto = localStorage.getItem("locationAuto");
      let location;

      if (locationAuto != "on") {
        try {
          location = await this.getLatLng();
          localStorage.setItem("locationAuto", "on");
          localStorage.setItem("latitude", location.coords.latitude.toFixed(6));
          localStorage.setItem(
            "longitude",
            location.coords.longitude.toFixed(6)
          );
          this.getLocation();
        } catch (e) {
          window.console.log(e);
          localStorage.setItem("locationAuto", "off");
        }
      } else {
        localStorage.removeItem("latitude");
        localStorage.removeItem("longitude");
        localStorage.removeItem("municipality");
        localStorage.setItem("locationAuto", "off");
      }
    },
    toggleTheme() {
      const main = document.getElementById("main");
      let theme = localStorage.getItem("themeColor");

      if (theme == "dark-mode") {
        main.classList.remove(theme);
        localStorage.setItem("themeColor", "light-mode");
        main.classList.add("light-mode");
      } else {
        main.classList.remove(theme);
        localStorage.setItem("themeColor", "dark-mode");
        main.classList.add("dark-mode");
      }
    }
  },
  components: {
    Topbar,
    Section1,
    Block
  }
};
</script>

<style scoped>
.version {
  color: var(--statText60);
  position: absolute;
  display: block;
  width: 100%;
  bottom: 0;
  text-align: center;
  margin-bottom: 20px;
}
</style>
