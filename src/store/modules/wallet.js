const state = {
  isConnected: false,
  info: {
    accounts: null,
    chainId: null,
    networkId: null,
    balance: null,
  },
};

const getters = {};

const mutations = {
  setConnectToWallet(state) {
    state.isConnected = true
  },
  setInfoToWallet(state, payload) {
    state.info = {...state.info, ...payload };
  },
  resetWallet(state) {
    state.isConnected = false;
    state.info = {
      accounts: null,
      chainId: null,
      networkId: null,
      balance: null,
    };
  },
};

export default {
  state,
  getters,
  mutations,
};
