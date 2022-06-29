import { useMemo } from "react";
import { Asset } from "../lib";
import {
  equityOf,
  pepperoniOf,
  executionAmount,
} from "../lib/uniswap/pepperoni";
import { useBalance } from "./useBalance";
import { useEquity } from "./useEquity";
import { useRate } from "./useRate";
import { useSwapStore } from "./useSwap";

export function useAsset(asset: Asset | undefined) {
  const rate = useRate(asset);
  const balance = useBalance(asset);
  const { assets } = useSwapStore();
  const compoundEquity = useEquity();

  const equity = useMemo(() => {
    if (!asset || !rate || !rate.amount || !balance || !balance.amount) {
      return undefined;
    }

    return equityOf({
      quantity: balance.amount,
      rate: rate.amount,
      decimals: asset.decimals,
    });
  }, [rate, asset, balance]);

  const destinationEquity = useMemo(() => {
    if (!asset || !compoundEquity) {
      return undefined;
    }

    const compoundWeight = assets.reduce((agg, it) => agg + it.weight, 0);

    return pepperoniOf(asset.weight, {
      equity: compoundEquity.equity,
      weight: compoundWeight,
    });
  }, [asset, compoundEquity, assets]);

  const executionEquity = useMemo(() => {
    if (!equity || !destinationEquity) {
      return undefined;
    }

    return executionAmount(equity, destinationEquity);
  }, [equity, destinationEquity]);

  const fraction = useMemo(() => {
    if (!asset || !compoundEquity) {
      return undefined;
    }

    const compoundWeight = assets.reduce((agg, it) => agg + it.weight, 0);

    return asset.weight / compoundWeight;
  }, [asset, compoundEquity, assets]);

  return {
    equity,
    destinationEquity,
    fraction,
    executionEquity,
    balance,
    rate,
  };
}
