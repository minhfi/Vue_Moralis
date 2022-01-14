<template>
  <div class="box-section">
    <div class="subtitle1 mb-8">Transfer Native</div>
    <div class="pl-8">
      <div class="flex items-center mb-4">
        <div
          class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          Address
        </div>
        <input
          name="address"
          class="
            px-2
            py-2
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
      </div>

      <div class="flex items-center">
        <div
          class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          Amount
        </div>
        <input
          name="amount"
          class="
            px-2
            py-2
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
      </div>

      <div class="flex justify-end mt-8">
        <b-button variant="light" @click="handleCancel" class="w-32"
          >Cancel</b-button
        >
        <b-button variant="primary" class="w-32" @click="handleTransferNative">
          Submit
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Moralis from "moralis";

export default {
  name: "TransferNative",
  data() {
    return {
      address: null,
      amount: null,
    };
  },

  methods: {
    handleChangeInput(event) {
      const { name, value } = event.target;
      this[name] = value;
    },

    handleCancel() {
      (this.address = null), (this.amount = null);
    },

    async handleTransferNative() {
      try {
        const options = {
          type: "native",
          amount: Moralis.Units.Token(this.amount, "18"),
          receiver: this.address,
        };

        await Moralis.transfer(options);

        alert("Transfer native successfully.");
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>