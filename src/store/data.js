import api from "../api/index";
import qs from "qs";
import locales from "@/assets/data/locales/locale.js";

export default {
  namespaced: true,
  state: {
    cumulative: [
      {
        Date_of_report: "yyyy-00-00",
        Total_reported: 0,
        Hospital_admission: 0,
        Deceased: 0
      },
      {
        Date_of_report: "yyyy-00-00",
        Total_reported: 0,
        Hospital_admission: 0,
        Deceased: 0
      },
      {
        Date_of_report: "yyyy-00-00",
        Total_reported: 0,
        Hospital_admission: 0,
        Deceased: 0
      },
      {
        Date_of_report: "yyyy-00-00",
        Total_reported: 0,
        Hospital_admission: 0,
        Deceased: 0
      },
      {
        Date_of_report: "yyyy-00-00",
        Total_reported: 0,
        Hospital_admission: 0,
        Deceased: 0
      },
      {
        Date_of_report: "yyyy-00-00",
        Total_reported: 0,
        Hospital_admission: 0,
        Deceased: 0
      },
      {
        Date_of_report: "yyyy-00-00",
        Total_reported: 0,
        Hospital_admission: 0,
        Deceased: 0
      }
    ],
    locale: "",
    geojson:""
  },
  mutations: {
    LOAD_SESSION(state) {
      state.cumulative = JSON.parse(sessionStorage.getItem("cumulative"));
    },
    SET_CUMULATIVE(state, data) {
      state.cumulative = data;
      sessionStorage.setItem("cumulative", JSON.stringify(data));
    },
    LOAD_LOCALE(state, locale) {
      state.locale = locales.filter(o => o.locale == locale)[0];
    },
    SET_GEOJSON(state, json) {
      state.geojson = json;
    }
  },
  actions: {
    loadSession({ commit }) {
      commit("LOAD_SESSION");
    },
    loadCumulative({ commit }) {
      let data = {
        municipality: localStorage.getItem("municipality")
      };
      api
        .post("/covid/cumulativemunicipality", qs.stringify(data), {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
          let arr = [];
          for (let i = 7; i > 0; i--) {
            arr.push(response.data[response.data.length - i]);
          }
          response.data = arr;
          commit("SET_CUMULATIVE", response.data);
        });
    },
    loadLocale({ commit }) {
      commit("LOAD_LOCALE", localStorage.getItem("locale"));
    },
    loadGeoJson({ commit }) {
      api.get("/covid/geojson")
      .then(response => {
        commit("SET_GEOJSON", response.data);
      })
    }
  },
  getters: {
    cumulative: state => {
      return state.cumulative;
    },
    date: state => {
      return state.cumulative[state.cumulative.length - 1].Date_of_report.split(
        " "
      )[0]
        .split("-")
        .reverse()
        .join("-");
    },
    // Reported data
    totalReported: state => {
      return state.cumulative[state.cumulative.length - 1].Total_reported;
    },
    dailyReported: (state, getters) => {
      return (
        getters.totalReported -
        state.cumulative[state.cumulative.length - 2].Total_reported
      );
    },
    // Hospitalized data
    totalHospitalized: state => {
      return state.cumulative[state.cumulative.length - 1].Hospital_admission;
    },
    dailyHospitalized: (state, getters) => {
      return (
        getters.totalHospitalized -
        state.cumulative[state.cumulative.length - 2].Hospital_admission
      );
    },
    // Deceased data
    totalDeceased: state => {
      return state.cumulative[state.cumulative.length - 1].Deceased;
    },
    dailyDeceased: (state, getters) => {
      return (
        getters.totalDeceased -
        state.cumulative[state.cumulative.length - 2].Deceased
      );
    },
    lastSixDays: state => {
      let arr = [];
      for (let i = 6; i > 0; i--) {
        arr.push(
          state.cumulative[
            state.cumulative.length - i
          ].Date_of_report.substring(5, 10)
            .split("-")
            .reverse()
            .join("/")
        );
      }
      return arr;
    },
    lastSixReports: state => {
      let arr = [];
      for (let i = 6; i > 0; i--) {
        arr.push(
          state.cumulative[state.cumulative.length - i].Total_reported -
            state.cumulative[state.cumulative.length - (i + 1)].Total_reported
        );
      }
      return arr;
    },
    lastSixHospitalized: state => {
      let arr = [];
      for (let i = 6; i > 0; i--) {
        arr.push(
          state.cumulative[state.cumulative.length - i].Hospital_admission -
            state.cumulative[state.cumulative.length - (i + 1)]
              .Hospital_admission
        );
      }
      return arr;
    },
    lastSixDeceased: state => {
      let arr = [];
      for (let i = 6; i > 0; i--) {
        arr.push(
          state.cumulative[state.cumulative.length - i].Deceased -
            state.cumulative[state.cumulative.length - (i + 1)].Deceased
        );
      }
      return arr;
    },
    locale: state => {
      return state.locale;
    },
    geojson: state => {
      return state.geojson;
    }
  }
};
