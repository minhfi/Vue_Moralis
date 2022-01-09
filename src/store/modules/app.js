import { SET_ERROR } from "./constants";

const state = {
  error: "",
};

const getters = {};


const actions = {
  async setError({ commit }, payload) {
    commit(SET_ERROR, payload);
  },
};

const mutations = {
  [SET_ERROR](state, payload) {
    state.error = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
