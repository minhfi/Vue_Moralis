<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mb-32">
      <h1 class="text-8xl font-bold mb-12 text-center">Send to</h1>

      <div class="mb-8">
        <label class="block">
          <span
            class="
              after:content-['*'] after:ml-0.5 after:text-red-500
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Address
          </span>
          <input
            name="address"
            class="
              mt-2
              px-3
              py-4
              bg-white
              border
              shadow-sm
              border-gray-300
              placeholder-gray-400
              focus:outline-none focus:border-sky-500 focus:ring-sky-500
              block
              w-full
              rounded-md
              sm:text-sm
              focus:ring-1
            "
            :value="address"
            @change="handleChangeInput"
            placeholder="Enter your address"
          />
        </label>
      </div>

      <div class="">
        <label class="block">
          <span
            class="
              after:content-['*'] after:ml-0.5 after:text-red-500
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Amount
          </span>
          <input
            name="amount"
            class="
              mt-2
              px-3
              py-4
              bg-white
              border
              shadow-sm
              border-gray-300
              placeholder-gray-400
              focus:outline-none focus:border-sky-500 focus:ring-sky-500
              block
              w-full
              rounded-md
              sm:text-sm
              focus:ring-1
            "
            :value="amount"
            @change="handleChangeInput"
            placeholder="Enter your amount"
          />
        </label>
      </div>
    </div>

    <button
      @click="handleTRansfer"
      class="
        text-white
        bg-blue-500
        px-14
        py-3
        rounded-full
        border-none
        text-2xl
        w-80
      "
    >
      Pay
    </button>

    <button
      @click="handleCancel"
      class="mt-4 px-14 py-3 rounded-full border border-grey-500 text-2xl w-80"
    >
      Cancel
    </button>
  </div>
</template>

<script>
import Web3 from "web3";
// import { ethers } from "ethers";
import { mapState, mapActions } from "vuex";

export default {
  name: "SendETHPayment",
  data() {
    return {
      address: "",
      amount: "",
    };
  },

  computed: {
    ...mapState({
      wallet: (state) => state.wallet,
    }),
  },

  methods: {
    ...mapActions({
      setError: "app/setError",
    }),

    handleChangeInput(event) {
      const { name, value } = event.target;
      this[name] = value;
    },

    handleCancel() {
      this.$router.push("/");
      this.setError("");
    },

    async handleTRansfer() {
      try {
        const web3 = new Web3(this.wallet.info.provider);
        const accounts = await web3.eth.getAccounts();

        if (!web3.utils.isAddress(accounts[0]))
          throw new Error("From address invalid");

        if (!web3.utils.isAddress(this.address))
          throw new Error("To address invalid");

        await web3.eth.sendTransaction({
          from: accounts[0],
          to: this.address,
          value: web3.utils.toWei(this.amount),
        });

        alert("Sent to amount successfully.")
      } catch (error) {
        this.setError(error);
      }
    },

    // async handleSentAmount() {
    //   try {
    //     console.log("window.ethereum", window.ethereum);
    //     await window.ethereum.send("eth_requestAccounts");

    //     console.log("object", window.ethereum);
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    //     signer.sendTransaction({
    //       to: this.address,
    //       value: ethers.utils.parseEther(this.amount),
    //     });
    //   } catch (error) {
    //     this.setError(error);
    //   }
    // },
  },

  mounted() {
    if (!this.wallet.info.isConnected) this.$router.push("/");
  },
};
</script>

<style>
</style>