import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    currentProjId: -1,
    currentModId: -1
  },
  mutations: {
    setCurrentProjId: (state, num) =>
    {
      state.currentProjId = num
    },
    setCurrentModId: (state, num) =>
    {
      state.currentModId = num
    }
  }
})
;
