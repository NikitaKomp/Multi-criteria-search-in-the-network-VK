import Promise from 'bluebird'

const state = {
  token: null,
}

const mutations = {
  setToken (state, token) {
    state.token = token
  },
}

const actions = {
  setToken ({commit}, token) {
    return new Promise((resolve, reject) => {
      commit('setToken', token)
      resolve()
    })
  },
}

const getters = {
  token: state => state.token,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
