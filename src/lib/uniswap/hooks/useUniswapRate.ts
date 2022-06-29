import { CurrencyAmount } from "@uniswap/smart-order-router";
import Big from "big.js";
import { Percent, TradeType } from "@uniswap/sdk-core";
import { useCallback } from "react";
import { Token } from "../..";
import { useUniswapRouter } from "./useUniswapRouter";
import { toUniswapToken } from "../token-map";

export function useUniswapRate() {
  const router = useUniswapRouter();

  const fetch = useCallback(
    async (base: Token, quote: Token) => {
      if (!router) {
        return undefined;
      }

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
    },
    [router]
  );

  return { fetch };
}
