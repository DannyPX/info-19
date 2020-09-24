import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/store/data'

Vue.use(Vuex)

const modules = { data }

const store = new Vuex.Store({
  modules
})

export default store