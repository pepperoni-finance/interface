import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export function useAccount() {
  const { account } = useWeb3React();

  const shortAccount = useMemo(() => {
    return account
      ? `${account.substring(0, 5)}...${account.substring(account.length - 4)}`
      : "";
  }, [account]);

  return { account, shortAccount };
}
