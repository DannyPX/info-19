import api from '../api/index'
import qs from 'qs'

export default {
  namespaced: true,
  state: {
    cumulative: [],
    daily: []
  },
  mutations: {
    SET_CUMULATIVE(state, data) {
      state.cumulative = data
    },
    SET_DAILY(state, data) {
      state.daily = data
    }
  },
  actions: {
    loadCumulative({ commit }) {
      // TODO: Change data to localStorage
      var data = { municipality: 'Helmond'}
      api
        .post('/covid/cumulativemunicipality', qs.stringify(data),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then((response) => {
          commit('SET_CUMULATIVE', response.data)
        })
    },
    loadDaily({ commit }) {
      // TODO: Change data to localStorage
      var data = { municipality: 'Helmond'}
      api
        .post('/covid/dailymunicipality', qs.stringify(data),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then((response) => {
          commit('SET_DAILY', response.data)
        })
    }
  },
  getters: {
    cumulative: (state) => {
      return state.cumulative
    }
  }
}