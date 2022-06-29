import { useMemo } from "react";
import { arrayEquityOf } from "../lib/uniswap/pepperoni";
import { useBalanceStore } from "./useBalance";
import { useRateStore } from "./useRate";
import { useSwapStore } from "./useSwap";

export const useEquity = () => {
  const { assets } = useSwapStore();
  const { rate } = useRateStore();
  const { balance } = useBalanceStore();

  const equity = useMemo(() => {
    return arrayEquityOf(
      assets.map((it) => ({
        quantity: balance[it.address]?.amount ?? "0",
        rate: rate[it.address]?.amount ?? "0",
        decimals: it.decimals,
      }))
    );
  }, [assets, balance, rate]);

  const compoundWeight = useMemo(
    () => assets.reduce((agg, it) => agg + it.weight, 0),
    [assets]
  );

  return { equity, hasMinimumEquity: equity != "0", compoundWeight };
};
