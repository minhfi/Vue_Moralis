<template>
  <div>
    <div class="nav px-8 py-8 flex justify-end">
      <button
        v-if="!wallet.info.isConnected"
        @click="login"
        class="
          text-white
          bg-red-500
          px-8
          py-2
          rounded-full
          border-none
          text-2xl
        "
      >
        Connect to wallet
      </button>

      <button
        v-if="wallet.info.isConnected"
        @click="logOut"
        class="
          text-red-500
          px-8
          py-2
          rounded-full
          border border-red-500
          text-2xl
        "
      >
        Disconnect wallet
      </button>
    </div>

    <!-- tabs -->
    <b-tabs content-class="mt-3">
      <b-tab title="Overview" active>
        <Overview />
      </b-tab>
      <b-tab title="Transfer">
        <TransferNative />
        <TransferERC20 />
      </b-tab>
      <b-tab title="Metadata">
        <GetTokenMetadata />
        <GetTokenMetadataBySymbol />
      </b-tab>
      <b-tab title="Transaction">
        <GetTransactions />
        <GetNativeBalance />
        <GetTokenBalances />
        <GetTokenTransfers />
      </b-tab>
      <b-tab title="Block">
        <GetBlock />
        <GetDateToBlock
      /></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Moralis from "moralis";
import { mapState, mapActions } from "vuex";
import { formatBalanceToken } from "../ultils/format";
import { NETWORKS } from "../constants";
import Overview from "./Overview";
import TransferNative from "./TransferNative";
import TransferERC20 from "./TransferERC20";
import GetTokenMetadata from "./GetTokenMetadata";
import GetTokenMetadataBySymbol from "./GetTokenMetadataBySymbol";
import GetTransactions from "./GetTransactions";
import GetNativeBalance from "./GetNativeBalance";
import GetTokenBalances from "./GetTokenBalances";
import GetTokenTransfers from "./GetTokenTransfers";
import GetBlock from "./GetBlock";
import GetDateToBlock from "./GetDateToBlock";

export default {
  name: "Home",
  data() {
    return {};
  },

  components: {
    Overview,
    TransferNative,
    TransferERC20,
    GetTokenMetadata,
    GetTokenMetadataBySymbol,
    GetTransactions,
    GetNativeBalance,
    GetTokenBalances,
    GetTokenTransfers,
    GetBlock,
    GetDateToBlock,
  },

  computed: {
    ...mapState({
      wallet: (state) => state.wallet,
    }),
  },

  methods: {
    ...mapActions({
      setInfoToWallet: "wallet/setInfoToWallet",
      resetWallet: "wallet/resetWallet",
    }),

    async loadAccount(ethAddress) {
      await this.getChainId();
      const balance = await this.getBalanceNative(ethAddress);
      const tokens = await this.getTokens(ethAddress);

      const payload = {
        isConnected: true,
        address: ethAddress,
        tokenAddress: NETWORKS[0].token_address,
        balance,
        symbol: NETWORKS[0].symbol,
        decimals: NETWORKS[0].decimals,
        tokens: [
          {
            tokenAddress: NETWORKS[0].token_address,
            balance,
            symbol: NETWORKS[0].symbol,
            decimals: NETWORKS[0].decimals,
          },
          ...tokens,
        ],
      };

      this.subscribe();
      this.setInfoToWallet(payload);
    },

    async login() {
      try {
        if (Moralis.User.current()) return;

        /* Authentication code */
        const user = await Moralis.authenticate();
        this.loadAccount(user.get("ethAddress"));
      } catch (error) {
        alert(error);
      }
    },

    async logOut() {
      await Moralis.User.logOut();
      this.resetWallet();
    },

    subscribe() {
      Moralis.onAccountsChanged(async (accounts) => {
        this.loadAccount(accounts[0]);
      });

      Moralis.onChainChanged(async (accounts) => {
        console.log(accounts);
      });
    },

    async getChainId() {
      const isWeb3Active = Moralis.ensureWeb3IsInstalled();
      if (!isWeb3Active) await Moralis.enableWeb3();

      const chainId = await Moralis.getChainId();
      this.setInfoToWallet({ chainId });

      if (chainId !== NETWORKS[0]["chainId"]) {
        // switch network to scb testnet
        await Moralis.switchNetwork(NETWORKS[0]["chainId"]);
      }
    },

    async getBalanceNative(address) {
      // get BSC native balance for a given address
      const options = {
        chain: NETWORKS[0]["chain"],
        address,
      };
      const { balance } = await Moralis.Web3API.account.getNativeBalance(
        options
      );

      return formatBalanceToken(balance);
    },

    async getTokens(address) {
      const options = {
        chain: NETWORKS[0]["chain"],
        address,
      };
      const tokens = await Moralis.Web3API.account.getTokenBalances(options);
      const mapData = tokens.map((token) => ({
        tokenAddress: token.token_address,
        balance: formatBalanceToken(token.balance, null, token.decimals),
        symbol: token.symbol,
        decimals: token.decimals,
      }));

      return mapData;
    },
  },

  mounted() {
    if (this.wallet.info.address) {
      this.loadAccount(this.wallet.info.address);
    }
  },
};
</script>

<style>
.nav-tabs .nav-link {
  color: #ccc;
  font-size: 24px;
}

.nav-tabs .nav-link:hover {
  color: red !important;
  border-color: #fff #fff red !important;
}

.nav-link.active {
  color: red !important;
  border-color: #fff #fff red !important;
}
</style>
