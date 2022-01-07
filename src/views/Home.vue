<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mb-40">
      <h1 class="text-8xl font-bold mb-12 text-center">Wallet Info</h1>
      <div class="">
        <div class="text-2xl flex justify-start">
          <span class="text-3xl font-bold w-52 text-left mb-4">Address:</span>
          {{ wallet.info.accounts || "Not update" }}
        </div>
        <div class="text-2xl flex justify-start">
          <span class="text-3xl font-bold w-52 text-left mb-4">ChainId:</span
          >{{ wallet.info.chainId || "Not update" }}
        </div>
        <div class="text-2xl flex justify-start">
          <span class="text-3xl font-bold w-52 text-left mb-4">NetworkId:</span
          >{{ wallet.info.networkId || "Not update" }}
        </div>
        <div class="text-2xl flex justify-start">
          <span class="text-3xl font-bold w-52 text-left mb-4">Balance:</span
          >{{ wallet.info.balance || "Not update" }}
        </div>
      </div>
    </div>

    <!-- connect to wallet -->
    <button
      v-if="!wallet.isConnected"
      @click="handleConnect"
      class="
        text-white
        bg-red-500
        px-14
        py-3
        rounded-full
        border-none
        text-2xl
        w-80
      "
    >
      Connect to wallet
    </button>

    <!-- Send to eth payment -->
    <button
      v-if="wallet.isConnected"
      @click="$router.push('/send-eth-payment')"
      class="
        text-white
        bg-blue-500
        px-14
        py-3
        mb-4
        rounded-full
        border-none
        text-2xl
        w-80
      "
    >
      Send
    </button>

    <button
      v-if="wallet.isConnected"
      @click="handleConnect"
      class="px-14 py-3 rounded-full border border-grey-500 text-2xl w-80"
    >
      Disconnected
    </button>

    <router-view />
  </div>
</template>

<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      web3Modal: null,
      provider: null,
    };
  },

  computed: {
    ...mapState({
      wallet: (state) => state.wallet,
    }),
  },

  methods: {
    ...mapMutations([
      "setConnectToWallet",
      "setInfoToWallet",
      "resetWallet",
      "setError",
    ]),

    initWeb3() {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            // Mikko's test key - don't copy as your mileage may vary
            infuraId: "bb53d719cd5e4cc8925e924ddc066c51",
          },
        },
      };

      this.web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
      });
    },

    async handleConnect() {
      // handle disconnect && clear cache
      if (this.wallet.isConnected) {
        this.web3Modal.clearCachedProvider();
        return this.resetWallet();
      }

      this.provider = await this.web3Modal
        .connect()
        .catch(() => this.setError("Could not get a wallet connection"));

      if (this.provider) {
        this.getAccount();
        this.subscribe();
      }
    },

    async getAccount() {
      const web3 = new Web3(this.provider);

      const accounts = await web3.eth.getAccounts();

      const chainId = await web3.eth.getChainId();

      const networkId = await web3.eth.net.getId();

      const responBalance = await web3.eth.getBalance(accounts[0]);
      const balance = web3.utils.fromWei(responBalance);

      const payload = {
        accounts: accounts[0],
        chainId,
        networkId,
        balance,
      };

      this.setConnectToWallet();
      this.setInfoToWallet(payload);
    },

    subscribe() {
      if (!this.provider) return;

      // Subscribe to accounts change
      this.provider.on("accountsChanged", () => {
        this.getAccount()
      });

      // Subscribe to chainId change
      this.provider.on("chainChanged", () => {
        this.getAccount()
      });

      // Subscribe to networkId change
      this.provider.on("networkChanged", () => {
        this.getAccount()
      });

      // Subscribe to provider disconnection
      this.provider.on("disconnect", (error) => {
        console.log(error);
      });
    },
  },

  mounted() {
    this.initWeb3();
  },
};
</script>