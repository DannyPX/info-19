import api from "../api/index";
import qs from "qs";

export default {
  namespaced: true,
  state: {
    cumulative: [],
    daily: []
  },
  mutations: {
    LOAD_SESSION(state) {
      state.cumulative = JSON.parse(sessionStorage.getItem("cumulative"));
    },
    SET_CUMULATIVE(state, data) {
      state.cumulative = data;
      sessionStorage.setItem("cumulative", JSON.stringify(data));
    },
    SET_DAILY(state, data) {
      state.daily = data;
      sessionStorage.setItem("daily", JSON.stringify(data));
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
          commit("SET_CUMULATIVE", response.data);
        });
    },
    loadDaily({ commit }) {
      let data = {
        municipality: localStorage.getItem("municipality")
      };
      api
        .post("/covid/dailymunicipality", qs.stringify(data), {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
          commit("SET_DAILY", response.data);
        });
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
    daily: state => {
      return state.daily;
    }
  }
};
