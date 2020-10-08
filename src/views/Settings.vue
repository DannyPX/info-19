<template>
  <div>
    <Topbar :title="locale.settings" :map="false" :settings="false"></Topbar>
    <Section1 :top="90">
      <Block
        :general="true"
        :title="locale.general"
        :option="locale.language"
        :option2="locale.guide"
        @showGuide="guide = true"
      ></Block>
      <Block
        :location="true"
        :title="locale.location"
        :option="locale.automatic"
        :toggle="checkLocalStorage('locationAuto', 'on')"
        @functionName="toggleAutoLocation"
      ></Block>
      <Block
        :notification="true"
        :title="locale.notifications"
        :option="locale.push_notifications"
        :toggle="checkLocalStorage('notification', 'true')"
        @functionName="toggleNotification"
      ></Block>
      <span class="blocked" v-if="blocked">{{
        locale.blocked_notifications
      }}</span>
      <Block
        :theme="true"
        :title="locale.theme"
        :option="locale.dark_mode"
        :toggle="checkLocalStorage('themeColor', 'dark-mode')"
        @functionName="toggleTheme"
      ></Block>
      <span class="version">{{ locale.version }} {{ version }}</span>
    </Section1>
    <GuidePopup v-if="guide" @guideClosed="guide = false"></GuidePopup>
  </div>
</template>

<script>
import Topbar from "@/components/nav/Topbar.vue";
import Section1 from "@/components/sections/Section1.vue";
import Block from "@/components/settings/Block.vue";
import GuidePopup from "@/components/guide/GuidePopup.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Settings",
  computed: {
    ...mapGetters("data", ["locale"])
  },
  data() {
    return {
      location: "Choose a location",
      blocked: false,
      guide: false,
      version: "1.1.0"
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
    Block,
    GuidePopup
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
