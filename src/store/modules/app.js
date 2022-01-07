const state = {
    error: ''
  };
  
  const getters = {};
  
  const mutations = {
    setError(state, payload) {
      state.error = payload
    },
  };
  
  export default {
    state,
    getters,
    mutations,
  };
  