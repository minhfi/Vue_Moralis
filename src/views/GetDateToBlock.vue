<template>
  <div class="box-section mt-8">
    <div class="subtitle1 mb-8">getDateToBlock</div>

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
          Chain
        </div>
        <div class="w-full">
          <b-form-select
            class="
              px-2
              py-2
              w-full
              bg-white
              border
              shadow-sm
              border-gray-300
              placeholder-gray-400
              rounded-md
            "
            v-model="chain"
            :options="optionsChain"
          />
        </div>
      </div>

      <div class="flex items-center mb-4">
        <div
          class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          Date
        </div>
        <b-form-input v-model="date" type="date" />
      </div>

      <div class="flex justify-end mt-8">
        <b-button variant="light" @click="handleCancel" class="w-32"
          >Cancel</b-button
        >
        <b-button variant="primary" class="w-32" @click="handleGetDateToBlock">
          Submit
        </b-button>
      </div>
    </div>

    <div class="mt-16 max-h-96 overflow-auto" v-if="data">
      <b-table striped hover :items="data"></b-table>
    </div>
  </div>
</template>

<script>
import Moralis from "moralis";
import { NETWORKS_NAME } from "../constants";

export default {
  name: "GetDateToBlock",
  data() {
    return {
      chain: "bsc testnet",
      date: null,
      data: null,
    };
  },

  computed: {
    optionsChain() {
      const options = NETWORKS_NAME.map((chain) => ({
        value: chain,
        text: chain,
      }));

      return options;
    },
  },

  methods: {
    handleCancel() {
      this.chain = "bsc testnet";
      this.date = null;
      this.data = null;
    },

    async handleGetDateToBlock() {
      try {
        const options = {
          chain: this.chain,
          date: this.date,
        };
        const data = await Moralis.Web3API.native.getDateToBlock(options);
        this.data = [data];
      } catch (error) {
        alert(error.error);
      }
    },
  },
};
</script>