import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/store/data'
import location from '@/store/location'

Vue.use(Vuex)

const modules = { data, location }

const store = new Vuex.Store({
  modules
})

export default store
