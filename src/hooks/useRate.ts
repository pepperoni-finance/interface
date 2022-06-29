import { useWeb3React } from "@web3-react/core";
import { useCallback, useMemo } from "react";
import create from "zustand";
import { Quote, Token } from "../lib";
import { useUniswapRate } from "../lib/uniswap/hooks/useUniswapRate";
import { useSettings } from "./useSettings";

type RateState = {
  rate: Record<string, Quote>;
  setRateLoading: (token: Token) => void;
  setRate: (token: Token, rate: string | undefined) => void;
  setRateError: (token: Token, error: Error) => void;
};

export const useRateStore = create<RateState>((set) => ({
  rate: {},

  setRateLoading: (token: Token) =>
    set((state) => {
      if (state.rate[token.address] && state.rate[token.address].loading) {
        return state;
      }

      return {
        rate: {
          ...state.rate,
          [token.address]: {
            ...state.rate[token.address],
            loading: true,
            error: false,
            updatedAt: new Date().getTime(),
          },
        },
      };
    }),
  setRate: (token: Token, rate: string | undefined) =>
    set((state) => {
      if (
        state.rate[token.address] &&
        state.rate[token.address].amount === rate
      ) {
        return state;
      }

      return {
        rate: {
          ...state.rate,
          [token.address]: {
            amount: rate,
            loading: false,
            error: false,
            updatedAt: new Date().getTime(),
          },
        },
      };
    }),
  setRateError: (token: Token, error: Error) =>
    set((state) => ({
      rate: {
        ...state.rate,
        [token.address]: {
          amount: undefined,
          loading: false,
          error: true,
          updatedAt: new Date().getTime(),
        },
      },
    })),
}));

export function useRate(token: Token | undefined) {
  const { rate } = useRateStore();

  return useMemo(() => {
    if (!token) {
      return undefined;
    }

    return rate[token.address];
  }, [rate, token]);
}

export function useRateFetch() {
  const { setRateLoading, setRate, setRateError } = useRateStore();
  const { provider } = useWeb3React();
  const { quote } = useSettings();
  const { fetch } = useUniswapRate();

  const fetchRate = useCallback(
    (token: Token | undefined) => {
      if (!token || !quote || !provider) {
        return undefined;
      }

      setRateLoading(token);

      fetch(token, quote)
        .then((rate) => setRate(token, rate))
        .catch((error) => setRateError(token, error));
    },
    [quote, provider, fetch, setRate, setRateLoading, setRateError]
  );

  return { fetchRate };
}
