import { useCallback, useMemo } from "react";
import { Asset } from "../lib";
import create from "zustand";

type ModalState = {
  opened: Record<string, any>;
  open: (key: string, params: any) => void;
  close: (key: string) => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
  opened: {},
  open: (key: string, params: any) =>
    set((state) => ({
      opened: {
        ...state.opened,
        [key]: params,
      },
    })),
  close: (key: string) =>
    set((state) => ({
      opened: {
        ...Object.keys(state.opened)
          .filter((it) => it != key)
          .map((it) => state.opened[it]),
      },
    })),
}));

export function useModal<T = any>(name: string) {
  const modal = useModalStore();
  const params = useMemo(() => modal.opened[name] as T, [modal.opened, name]);

  const open = useCallback(
    (params: T) => modal.open(name, params),
    [modal, name]
  );

  const close = useCallback(() => modal.close(name), [modal, name]);

  return { open, close, isOpen: params !== undefined, params };
}

export type TokenListModalParams = {
  alreadySelectedAddresses: Array<string>;
  forAsset: Asset | undefined;
};

export function useTokenListModal() {
  return useModal<TokenListModalParams>("tokenList");
}
