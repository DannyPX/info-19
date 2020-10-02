<template>
  <router-view></router-view>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const schedule = require("node-schedule");
export default {
  computed: {
    ...mapGetters("location", ["municipality"]),
    ...mapGetters("data", [
      "dailyReported",
      "dailyHospitalized",
      "dailyDeceased"
    ])
  },
  methods: {
    ...mapActions("location", ["refreshLocation"]),
    themeCheck() {
      if (localStorage.getItem("themeColor") == null) {
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? localStorage.setItem("themeColor", "dark-mode")
          : localStorage.setItem("themeColor", "light-mode");
      }
      document
        .getElementById("main")
        .classList.add(localStorage.getItem("themeColor"));
    },
    notification() {
      let _this = this;
      let j = null;
      schedule.scheduleJob("*/9 * * * *", function() {
        if (
          Notification.permission === "granted" &&
          localStorage.getItem("locationAuto") == "on" &&
          localStorage.getItem("notification") == "true"
        ) {
          _this.refreshLocation();
          if (
            localStorage.getItem("lastVisit") !=
            localStorage.getItem("municipality")
          ) {
            localStorage.setItem(
              "lastVisit",
              localStorage.getItem("municipality")
            );
            if (j !== null) {
              j.cancel();
              scheduleTimer();
            } else {
              scheduleTimer();
            }
          }
        } else if (localStorage.getItem("locationAuto") == "on") {
          _this.refreshLocation();
        }
      });
      function scheduleTimer() {
        let startTime = new Date(Date.now() + 600000);
        let endTime = new Date(startTime.getTime() + 1000);
        j = schedule.scheduleJob(
          { start: startTime, end: endTime, rule: "*/1 * * * * *" },
          function() {
            if (Notification.permission === "granted") {
              let title = _this.municipality;
              let options = {
                body:
                  "Reported: " +
                  _this.dailyReported +
                  " " +
                  "Hospitalized: " +
                  _this.dailyHospitalized +
                  " " +
                  "Deceased: " +
                  _this.dailyDeceased,
                icon: "https://info19.nl/favicon.ico",
                vibrate: 50
              };

              new Notification(title, options);
            }
          }
        );
      }
    }
  },
  beforeMount() {
    this.themeCheck();
    this.notification();
  }
};
</script>

<style>
/* latin */
@font-face {
  font-family: "Signika";
  font-weight: 300;
  font-display: swap;
  src: url(./assets/fonts/signika.woff2) format("woff2");
}
/* latin */
@font-face {
  font-family: "Signika";
  font-weight: 400;
  font-display: swap;
  src: url(./assets/fonts/signika.woff2) format("woff2");
}
/* latin */
@font-face {
  font-family: "Signika";
  font-weight: 500;
  font-display: swap;
  src: url(./assets/fonts/signika.woff2) format("woff2");
}

.link {
  color: var(--white);
  display: flex;
  text-decoration: none;
}

:root {
  /* COLORS */
  --red: #ec1f27;
  --green: #32cd32;

  /* TOPBAR */
  --tbBackground: #ec1f27;
  --tbItems: #ffffff;
  --tbDropdown: #ffffff;
  --tbDropdownBorder: transparent;
  --tbText: #000000;

  /* SECTIONS */
  --section1: #ffffff;
  --section2: #f2f2f2;

  /* INFO */
  --statBox: #ffffff;
  --statText100: #000000;
  --statText87: #000000;
  --statText60: #404040;
  --sortBackground: #ec1f27;
  --sortActive: #ffffff;

  /* SETTINGS */
  --toggle: #e6e6e6;
  --line: #a6a6a6;
}

html.light-mode #section2 {
  height: calc(100vh - 318px);
  width: 100%;
  background: var(--section2);
  border-radius: 30px 30px 0 0;
  box-sizing: border-box;
  padding-top: 10px;
}

html.dark-mode {
  /* COLORS */
  --red: #ed454b;
  --green: #259825;

  /* TOPBAR */
  --tbBackground: #1c1c1c;
  --tbItems: #e2e2e2;
  --tbDropdown: #121212;
  --tbDropdownBorder: #ed454b;
  --tbText: #e2e2e2;

  /* SECTIONS */
  --section1: #121212;
  --section2: #121212;

  /* INFO */
  --statBox: #1c1c1c;
  --statText100: #e0e0e0;
  --statText87: #e2e2e2;
  --statText60: #c6c6c6;
  --sortBackground: #1c1c1c;
  --sortActive: #e2e2e2;

  /* SETTINGS */
  --toggle: #2c2c2c;
  --line: #717171;
}

html.dark-mode #section2 {
  margin-top: -10px;
}
</style>
