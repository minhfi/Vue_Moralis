<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import Moralis from "moralis";

export default {
  name: "App",
  data() {
    return {};
  },

  methods: {
    async checkIsWeb3Installed() {
      const isWeb3Active = Moralis.ensureWeb3IsInstalled();
      if (!isWeb3Active) await Moralis.enableWeb3();
    },

    async checkIsMetaMaskInstalled() {
      const isMetaMaskInstalled = await Moralis.isMetaMaskInstalled();
      if (!isMetaMaskInstalled)
        return alert("No crypto wallet found. Please install it.");
    },
  },

  mounted() {
    this.checkIsMetaMaskInstalled();
    this.checkIsWeb3Installed();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
