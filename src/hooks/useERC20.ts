import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import ERC20 from "../../erc-20-abi.json";

export function useERC20(tokenAddress: string | undefined) {
  const { provider } = useWeb3React();

  return useMemo(() => {
    if (!provider || !tokenAddress) {
      return undefined;
    }

    return new Contract(tokenAddress, ERC20, provider);
  }, [provider, tokenAddress]);
}
