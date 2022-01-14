<template>
  <div class="box-section">
    <div class="subtitle1 mb-8">Wallet Info</div>
    <div class="pl-8">
      <div class="flex items-center mb-4">
        <div class="min-w-max label w-1/5">Address:</div>
        <div class="subtitle2">{{ wallet.info.address }}</div>
      </div>

      <div class="flex items-center mb-4">
        <div class="min-w-max label w-1/5">Contract address:</div>
        <div class="subtitle2">{{ wallet.info.tokenAddress }}</div>
      </div>

      <div class="flex items-center mb-4">
        <div class="min-w-max label w-1/5">Balance:</div>
        <div class="subtitle2">{{ wallet.info.balance }}</div>
      </div>

      <div class="flex items-center mb-4">
        <div class="min-w-max label w-1/5">Decimals:</div>
        <div class="subtitle2">{{ wallet.info.decimals }}</div>
      </div>

      <div class="flex items-center mb-4" v-if="wallet.info.tokenAddress">
        <div class="min-w-max label w-1/5">Symbol:</div>
        <div class="">
          <b-form-select
            class="
              px-2
              py-2
              font-bold
              bg-white
              border
              shadow-sm
              border-gray-300
              placeholder-gray-400
              rounded-md
            "
            v-model="wallet.info.tokenAddress"
            :options="optionsToken"
            @change="handleSelectToken"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Overview",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      wallet: (state) => state.wallet,
    }),

    optionsToken() {
      const options = this.wallet.info.tokens.map((token) => ({
        value: token.tokenAddress,
        text: token.symbol,
      }));

      return options;
    },
  },

  methods: {
    ...mapActions({
      setInfoToWallet: "wallet/setInfoToWallet",
    }),

    handleSelectToken() {
      const token = this.wallet.info.tokens.find(
        ({ tokenAddress }) => tokenAddress === this.wallet.info.tokenAddress
      );

      const payload = {
        tokenAddress: token.tokenAddress,
        balance: token.balance,
        symbol: token.symbol,
        decimals: token.decimals,
      };

      this.setInfoToWallet(payload);
    },
  },
};
</script>