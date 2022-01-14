<template>
  <div class="box-section">
    <div class="subtitle1 mb-8">getTokenMetadata</div>

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
          <select
            name=""
            id=""
            @change="handleSelectNetwork"
            class="
              min-w-full
              px-2
              py-2
              bg-white
              border
              shadow-sm
              border-gray-300
              placeholder-gray-400
              rounded-md
            "
          >
            <option
              v-for="chain in networks"
              :key="chain"
              :value="chain"
              :selected="chain === network"
            >
              {{ chain }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex mb-8">
        <div
          class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          Contract addresses
        </div>

        <div class="w-full">
          <input
            v-for="(address, index) in addresses"
            :key="index"
            :name="index"
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
              mb-4
            "
            :value="address"
            @change="handleChangeInput"
            placeholder="Enter your address"
          />
          <b-button variant="outline-primary" @click="handleAddAddress"
            >Add</b-button
          >
        </div>
      </div>

      <div class="flex justify-end mt-8">
        <b-button variant="light" @click="handleCancel" class="w-32"
          >Cancel</b-button
        >
        <b-button
          variant="primary"
          class="w-32"
          @click="handleGetTokenMetadata"
        >
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
  name: "GetTokenMetadata",
  data() {
    return {
      network: "bsc testnet",
      addresses: [null],
      data: null,
      networks: NETWORKS_NAME,
    };
  },

  methods: {
    handleChangeInput(event) {
      const { name, value } = event.target;
      this.addresses[name] = value;
    },

    handleCancel() {
      this.network = "bsc testnet";
      this.addresses = [null];
      this.data = null;
    },

    handleSelectNetwork(event) {
      const { value } = event.target;
      this.network = value;
    },

    handleAddAddress() {
      this.addresses = [...this.addresses, null];
    },

    async handleGetTokenMetadata() {
      try {
        //Get metadata for an array of tokens
        const options = {
          chain: this.network,
          addresses: this.addresses,
        };
        const data = await Moralis.Web3API.token.getTokenMetadata(options);
        this.data = data.map((item) => ({
          address: item.address,
          name: item.name,
          symbol: item.symbol,
          decimals: item.decimals,
          block_number: item.block_number,
        }));
      } catch (error) {
        alert(error.error);
      }
    },
  },
};
</script>