import { useMemo } from "react";
import { useNetwork } from "./useNetwork";
import { useUniverseStore } from "./useUniverseStore";

export function useTokenList(keyword: string) {
  const { tokens } = useUniverseStore();
  const { chainToken } = useNetwork();

  const combinedTokens = useMemo(
    () =>
      chainToken
        ? [
            chainToken,
            ...tokens.filter((it) => it.chainId === chainToken.chainId),
          ]
        : [],
    [chainToken, tokens]
  );

  return useMemo(() => {
    const term = keyword.toLowerCase();

    if (!term) {
      return combinedTokens;
    }

    return combinedTokens.filter(
      (it) =>
        it.name.toLocaleLowerCase().includes(term) ||
        it.symbol.toLocaleLowerCase().includes(term) ||
        it.address.toLocaleLowerCase().includes(term)
    );
  }, [combinedTokens, keyword]);
}
