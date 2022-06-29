import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useMemo } from "react";
import create from "zustand";
import { Quote, Token } from "../lib";
import { useERC20 } from "./useERC20";

type BalanceState = {
  balance: Record<string, Quote>;
  setBalanceLoading: (token: Token) => void;
  setBalance: (token: Token, quantity: string) => void;
  setBalanceError: (token: Token, error: Error) => void;
};

export const useBalanceStore = create<BalanceState>((set) => ({
  balance: {},

  setBalanceLoading: (token: Token) =>
    set((state) => {
      if (
        state.balance[token.address] &&
        state.balance[token.address].loading
      ) {
        return state;
      }

      return {
        balance: {
          ...state.balance,
          [token.address]: {
            ...state.balance[token.address],
            loading: true,
            error: false,
            updatedAt: new Date().getTime(),
          },
        },
      };
    }),
  setBalance: (token: Token, quantity: string) =>
    set((state) => {
      if (
        state.balance[token.address] &&
        state.balance[token.address].amount === quantity
      ) {
        return state;
      }

      return {
        balance: {
          ...state.balance,
          [token.address]: {
            amount: quantity,
            loading: false,
            error: false,
            updatedAt: new Date().getTime(),
          },
        },
      };
    }),
  setBalanceError: (token: Token, error: Error) =>
    set((state) => ({
      balance: {
        ...state.balance,
        [token.address]: {
          amount: undefined,
          loading: false,
          error: true,
          updatedAt: new Date().getTime(),
        },
      },
    })),
}));

export function useBalance(token: Token | undefined) {
  const { balance, setBalanceLoading, setBalance, setBalanceError } =
    useBalanceStore();
  const { provider } = useWeb3React();
  const contract = useERC20(token?.address);

  const fetch = useCallback(() => {
    if (!token || !provider) {
      return undefined;
    }

    if (token.isChainToken) {
      setBalanceLoading(token);

      provider
        .getBalance(token.address)
        .then((balance) => setBalance(token, balance.toString()))
        .catch((error) => setBalanceError(token, error));
    } else {
      if (!contract) {
        return undefined;
      }

      setBalanceLoading(token);

      contract
        .balanceOf("0x9Cd83BE15a79646A3D22B81fc8dDf7B7240a62cB")
        .then((balance: any) => setBalance(token, balance.toString()))
        .catch((error: any) => setBalanceError(token, error));
    }
  }, [
    token,
    contract,
    provider,
    setBalanceError,
    setBalance,
    setBalanceLoading,
  ]);

  useEffect(() => {
    fetch();

    const interval = setInterval(() => fetch(), 5000);

    return () => clearInterval(interval);
  }, [token, contract, provider, fetch]);

  return useMemo(() => {
    if (!token) {
      return undefined;
    }

    return balance[token.address];
  }, [balance, token]);
}
