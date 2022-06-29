import create from "zustand";
import { Token } from "../lib";
import { toDisplayAmount } from "../lib/uniswap";

type SettingState = {
  quote: Token;

  format: (value: string | undefined) => string;
};

export const useSettings = create<SettingState>((set, get) => ({
  quote: {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainId: 1,
    decimals: 6,
    logoURI: "",
    name: "USDC",
    symbol: "USDC",
  },

  format: (value: string | undefined) => {
    return `${toDisplayAmount(value ?? "0", get().quote)} ${
      get().quote.symbol
    }`;
  },
}));
