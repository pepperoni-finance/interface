import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { useUniverseStore } from "./useUniverseStore";

export function useNetwork() {
  const { chainId } = useWeb3React();
  const { networks } = useUniverseStore();

  const network = useMemo(() => {
    return networks.find((it) => it.chainId === chainId);
  }, [chainId, networks]);

  return { ...network };
}
