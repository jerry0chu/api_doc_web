import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    currentProjId: -1,
    currentApiId: -1
  },
  mutations: {
    setCurrentProjId: (state, num) =>
    {
      state.currentProjId = num
    },
    setCurrentApiId: (state, num) =>
    {
      state.currentApiId = num
    }
  }
})
;
