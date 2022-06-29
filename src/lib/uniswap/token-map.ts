import { Token as UniswapToken } from "@uniswap/sdk-core";
import { Token } from "..";
import Big from "big.js";

export function toUniswapToken(token: Token) {
  return new UniswapToken(
    token.chainId,
    token.address,
    token.decimals,
    token.symbol,
    token.name
  );
}

export function toDisplayAmount(
  amount: string | undefined,
  token: Token,
  fixed: boolean = true
) {
  if (!amount) {
    return "";
  }

  Big.DP = token.decimals;

  return new Big(amount)
    .div(new Big(10 ** token.decimals))
    .toFixed(fixed ? token.decimals : undefined);
}
