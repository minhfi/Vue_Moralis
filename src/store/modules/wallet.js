import { SET_INFO_TO_WALLET, RESET_WALLET } from "./constants";

const state = {
  info: {
    isConnected: false,
    provider: null,
    address: null,
    tokenAddress: null,
    chainId: null,
    networkId: null,
    balance: null,
    symbol: null,
    decimals: null,
    tokens: []
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
      address: null,
      tokenAddress: null,
      chainId: null,
      networkId: null,
      balance: null,
      symbol: null,
      decimals: null,
      tokens: []
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
