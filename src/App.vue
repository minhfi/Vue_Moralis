<template>
  <div>
    <div v-if="error" class="error text-red-500 bg-red-200">{{error}}</div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
 
  computed: {
    ...mapState({
      error: (state) => state.app.error,
    }),
  },

  methods: {
    ...mapMutations(["setError"]),
  },

  mounted() {
    if (!window.ethereum) return this.setError( "No crypto wallet found. Please install it.")
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.error {
  min-width: 320px;
  padding: 16px;
  text-align: center;
}
</style>
