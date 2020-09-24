import axios from "axios";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getLocation() {
      axios
        .get("https://eu1.locationiq.com/v1/reverse.php", {
          params: {
            lat: localStorage.getItem("latitude"),
            lon: localStorage.getItem("longitude"),
            key: "409bc2c998f4f2",
            format: "json",
          },
        })
        .then((response) => {
          localStorage.setItem("municipality", response.data.address.city);
        });
    },
  },
  getters: {},
};
