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
        :toggle="checkLocalStorage('notification', 'true')"
        @functionName="toggleNotification"
      ></Block>
      <span class="blocked" v-if="blocked"
        >You have notifications blocked, please change this in your browser
        settings.</span
      >
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
      blocked: false,
      version: "1.1.2"
    };
  },
  methods: {
    ...mapActions("location", ["toggleAutoLocation"]),
    checkLocalStorage(key, value) {
      let locationAuto = localStorage.getItem(key);
      return locationAuto == value ? true : false;
    },
    toggleNotification() {
      if (localStorage.getItem("notification") != "true") {
        if (Notification.permission === "granted") {
          console.log("Granted");
          localStorage.setItem("notification", "true");
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
              console.log("Granted");
              localStorage.setItem("notification", "true");
            } else if (Notification.permission === "denied") {
              localStorage.setItem("notification", "false");
            }
          });
        } else if (Notification.permission === "denied") {
          this.blocked = true;
        }
      } else {
        localStorage.setItem("notification", "false");
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
.blocked {
  display: block;
  margin: 0 20px;
  color: var(--red);
  font-size: 1rem;
}

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
