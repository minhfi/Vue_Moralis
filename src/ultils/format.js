import Moralis from "moralis";

const formatBalanceToken = (
  balance,
  symbol,
  decimals = "18"
) => {
  if (symbol) {
    return (Moralis.Units.FromWei(balance, decimals)) + " " + symbol;
  }

  return Moralis.Units.FromWei(balance, decimals);
};

export { formatBalanceToken };
