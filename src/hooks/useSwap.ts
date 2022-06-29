import create from "zustand";
import { Asset, Token } from "../lib";

type SwapState = {
  assets: Array<Asset>;
  focusedAsset: Asset | undefined;
  compoundWeight: number;
  compoundEstimatedValue: string | undefined;
  valid: boolean;

  addAsset: (token: Token) => void;
  removeAsset: (asset: Asset) => void;
  focusAsset: (asset: Asset | undefined) => void;
  setAssetWeight: (asset: Asset, weight: number) => void;
  setAssetToken: (asset: Asset, token: Token) => void;
};

export const useSwapStore = create<SwapState>((set, get) => ({
  assets: [],
  focusedAsset: undefined,
  compoundWeight: 0,
  compoundEstimatedValue: undefined,
  valid: false,

  addAsset: (token: Token) =>
    set((state) => {
      return {
        assets: [
          ...state.assets,
          {
            ...token,
            weight: 1,
          },
        ],
      };
    }),

  removeAsset: (asset: Asset) =>
    set((state) => {
      return {
        assets: [...state.assets.filter((it) => it.address !== asset.address)],
      };
    }),

  focusAsset: (asset: Asset | undefined) =>
    set((state) => {
      if (state.focusedAsset?.address === asset?.address) {
        return state;
      }

      return {
        focusedAsset: asset,
      };
    }),

  setAssetWeight: (asset: Asset, weight: number) =>
    set((state) => {
      if (state.focusedAsset?.address === asset?.address) {
        return state;
      }

      return {
        assets: state.assets.map((it) =>
          it.address === asset.address ? { ...it, weight } : it
        ),
      };
    }),

  setAssetToken: (asset: Asset, token: Token) =>
    set((state) => {
      if (state.focusedAsset?.address === asset?.address) {
        return state;
      }

      return {
        assets: state.assets.map((it) =>
          it.address === asset.address ? { ...it, ...token } : it
        ),
      };
    }),
}));
