import create from "zustand";
import { Network, Token } from "../lib";

type UniverseState = {
  networks: Array<Network>;
  tokens: Array<Token>;
  initialize: (snapshot: {
    networks: Array<Network>;
    tokens: Array<Token>;
  }) => void;
};

export const useUniverseStore = create<UniverseState>((set) => ({
  networks: new Array<Network>(),
  tokens: new Array<Token>(),

  initialize: (snapshot: { networks: Array<Network>; tokens: Array<Token> }) =>
    set(() => ({ ...snapshot })),
}));
