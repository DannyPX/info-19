import axios from "axios";

export default {
  namespaced: true,
  state: {
    municipality: "Eindhoven"
  },
  mutations: {},
  actions: {
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
    async toggleAutoLocation({ dispatch }) {
      let locationAuto = localStorage.getItem("locationAuto");
      let location;

      if (locationAuto != "on") {
        try {
          location = await dispatch("getLatLng");
          localStorage.setItem("locationAuto", "on");
          localStorage.setItem("latitude", location.coords.latitude.toFixed(6));
          localStorage.setItem(
            "longitude",
            location.coords.longitude.toFixed(6)
          );
          dispatch("getLocation");
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
    async refreshLocation({ dispatch }) {
      let location;

      try {
        location = await dispatch("getLatLng");
        localStorage.setItem("latitude", location.coords.latitude.toFixed(6));
        localStorage.setItem("longitude", location.coords.longitude.toFixed(6));
        await dispatch("getLocation");
      } catch (e) {
        window.console.log(e);
      }
    },
    async getLocation({ state }) {
      axios
        .get("https://eu1.locationiq.com/v1/reverse.php", {
          params: {
            lat: localStorage.getItem("latitude"),
            lon: localStorage.getItem("longitude"),
            key: "409bc2c998f4f2",
            format: "json"
          }
        })
        .then(response => {
          state.municipality =
            response.data.address.city || response.data.address.village;
          localStorage.setItem(
            "municipality",
            response.data.address.city || response.data.address.village
          );
        });
    }
  },
  getters: {
    municipality: state => {
      return state.municipality;
    }
  }
};
