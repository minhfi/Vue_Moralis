import Vue from "vue";
import Vuex from "vuex";
// import VuexPersistence from "vuex-persist";
import modules from './modules'

Vue.use(Vuex);

// const persistenceOptions = {
//   key: "vuex",
//   storage: window.localStorage,
//   filter: (mutation) => mutation.type.includes('wallet'),
// };

const Store = new Vuex.Store({
  modules: {
      wallet: modules.wallet,
      app: modules.app
  },
  // plugins: [new VuexPersistence(persistenceOptions).plugin],
});

export default Store;
