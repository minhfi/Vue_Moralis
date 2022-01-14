const TOKENS = {
  BNB: {
    token_address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    name: "BNB",
    symbol: "BNB",
    logo: null,
    thumbnail: null,
    decimals: "18",
  },
  L7: {
    token_address: "0xa2ca9d03a7f0fca6ee249be34f29604903d5b5c9",
    name: "L7",
    symbol: "L7",
    logo: null,
    thumbnail: null,
    decimals: "18",
  },
};

const NETWORKS = [
  {
    network: "BSC testnet",
    chain: "bsc testnet",
    chainId: 97,
    ...TOKENS["BNB"],
  },
];

const NETWORKS_NAME = [
  "eth",
  "ropsten",
  "rinkeby",
  "kovan",
  "polygon",
  "bsc",
  "bsc testnet",
  "fantom",
];

export { NETWORKS, TOKENS, NETWORKS_NAME };
