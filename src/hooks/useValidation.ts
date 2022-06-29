import { useMemo } from "react";
import { useBalanceStore } from "./useBalance";
import { useEquity } from "./useEquity";
import { useRateStore } from "./useRate";
import { useSwapStore } from "./useSwap";

export function useValidation() {
  const { assets } = useSwapStore();
  const { balance } = useBalanceStore();
  const { rate } = useRateStore();
  const { hasMinimumEquity, compoundWeight } = useEquity();

  const message = useMemo(() => {
    if (assets.length < 2) {
      return "You need to add at least two assets to rebalance";
    }

    if (compoundWeight == 0) {
      return "Nothing to rebalance";
    }

    if (
      !assets.every((it) => rate[it.address]?.amount) ||
      !assets.every((it) => balance[it.address]?.amount)
    ) {
      return "Fetching...";
    }

    if (!hasMinimumEquity) {
      return "No funds to rebalance";
    }
  }, [assets, rate, balance, hasMinimumEquity, compoundWeight]);

  return { isValid: message === undefined, message };
}
