import {
  SET_INFO_TO_WALLET,
  RESET_WALLET,
} from "./constants";

const state = {
  info: {
    isConnected: false,
    provider: null,
    accounts: null,
    chainId: null,
    networkId: null,
    balance: null,
  },
};

const getters = {};

const actions = {
  async setInfoToWallet({ commit }, payload) {
    commit(SET_INFO_TO_WALLET, payload);
  },

  async resetWallet({ commit }) {
    commit(RESET_WALLET);
  },
};

const mutations = {
  [SET_INFO_TO_WALLET](state, payload) {
    state.info = { ...state.info, ...payload };
  },

  [RESET_WALLET](state) {
    state.info = {
      isConnected: false,
      provider: null,
      accounts: null,
      chainId: null,
      networkId: null,
      balance: null,
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
