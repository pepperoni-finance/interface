import { AlphaRouter, CurrencyAmount } from "@uniswap/smart-order-router";
import Big from "big.js";
import { Token } from "..";
import { toUniswapToken } from "./token-map";
import { Percent, TradeType } from "@uniswap/sdk-core";
export * from "./token-map";

export async function fetchUniswapRoute(
  base: Token,
  quote: Token,
  router: AlphaRouter
) {
  const amount = CurrencyAmount.fromRawAmount(
    toUniswapToken(base),
    new Big(1).mul(new Big(10 ** base.decimals)).toString()
  );

  if (base.address === quote.address) {
    return new Big(10 ** base.decimals).toFixed(0);
  }

  const route = await router.route(
    amount,
    toUniswapToken(quote),
    TradeType.EXACT_INPUT,
    {
      recipient: "0x5247CC7B0Dda810Cfd13534dd2aA0fd89cB6B4D6",
      slippageTolerance: new Percent(5, 100),
      deadline: Math.floor(Date.now() / 1000 + 1800),
    }
  );

  return route?.quote.quotient.toString();
}
