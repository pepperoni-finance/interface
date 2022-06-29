import { useMemo } from "react";
import { useAccount } from "../../hooks/useAccount";
import { useBalance } from "../../hooks/useBalance";
import { useNetwork } from "../../hooks/useNetwork";
import { toDisplayAmount } from "../../lib/uniswap";
import { Avatar } from "./Avatar";

export function Wallet() {
  const { account, shortAccount } = useAccount();
  const { chainToken } = useNetwork();
  const balance = useBalance(chainToken);
  const quantity = useMemo(() => {
    if (!chainToken || !balance || !balance.amount) {
      return "";
    }

    return toDisplayAmount(balance.amount, chainToken);
  }, [balance, chainToken]);

  return (
    <div className="text-lg flex rounded-full shadow-sm overflow-hidden bg-white border-white items-center">
      <div className="grow py-1 px-3 flex space-x-1">
        <div>{quantity}</div>
        <div>{chainToken?.symbol}</div>
      </div>
      <div className="pr-2 pl-3 my-1 rounded-l-full rounded-r-full flex justify-center items-center gap-2">
        <div className="font-mono hidden sm:block">{shortAccount}</div>
        <Avatar account={account} size={24}></Avatar>
      </div>
    </div>
  );
}
