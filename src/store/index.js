import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    currentProjId: -1,
    currentModId: -1,
    currentApiId: -1,
    deleteApiId: -1,
    isEditApi: false
  },
  mutations: {
    setCurrentProjId: (state, num) =>
    {
      state.currentProjId = num
    },
    setCurrentModId: (state, num) =>
    {
      state.currentModId = num
    },
    setCurrentApiId: (state, num) =>
    {
      state.currentApiId = num
    },
    setDeleteApiId: (state, num) =>
    {
      state.deleteApiId = num
    },
    setIsEditApi: (state, bool) =>
    {
      state.isEditApi = bool
    }
  }
})
;
