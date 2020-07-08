const state = {
  tryItem: ''
}
const mutations = {
  SET_TRYITEM (state, tryItem) {
    state.tryItem = tryItem
  }
}
const actions = {
  setTryItem ({ commit }, tryItem) {
    commit('SET_TRYITEM', tryItem)
  }
}
const getters = {
  tryItem: state => state.tryItem
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
/**
 Vuex.createStore({
  state: {
    tryItem: {}
  },
  mutations: {
    SET_TRYITEM (state, tryItem) {
      state.tryItem = tryItem
    }
  },
  actions: {
    setTryItem ({ commit }, tryItem) {
      commit('SET_TRYITEM', tryItem)
    }
  },
  getters: {
    tryItem: state => state.tryItem
  }
})

 */
