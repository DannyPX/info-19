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
        municipality: localStorage.getItem("municipality") || "Eindhoven"
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
      let data = { municipality: localStorage.getItem("municipality") };
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
    cumulativeLastDate: state => {
      return state.cumulative[state.cumulative.length - 1].Date_of_report.split(
        " "
      )[0]
        .split("-")
        .reverse()
        .join("-");
    },
    // Reported data
    cumulativeReportedLast: state => {
      return state.cumulative[state.cumulative.length - 1].Total_reported;
    },
    cumulativeReportedChange: (state, getters) => {
      return (
        getters.cumulativeReportedLast -
        state.cumulative[state.cumulative.length - 2].Total_reported
      );
    },
    // Hospitalized data
    cumulativeHospitalizedLast: state => {
      return state.cumulative[state.cumulative.length - 1].Hospital_admission;
    },
    cumulativeHospitalizedChange: (state, getters) => {
      return (
        getters.cumulativeHospitalizedLast -
        state.cumulative[state.cumulative.length - 2].Hospital_admission
      );
    },
    // Deceased data
    cumulativeDeceasedLast: state => {
      return state.cumulative[state.cumulative.length - 1].Deceased;
    },
    cumulativeDeceasedChange: (state, getters) => {
      return (
        getters.cumulativeDeceasedLast -
        state.cumulative[state.cumulative.length - 2].Deceased
      );
    },
    daily: state => {
      return state.daily;
    }
  }
};
