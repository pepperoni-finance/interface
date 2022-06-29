import { ListChildComponentProps } from "react-window";
import { useCallback, useMemo } from "react";
import classNames from "classnames";
import { useBalance } from "../../hooks/useBalance";
import { withSpinner } from "../../hocs/withSpinner";
import { Token } from "../../lib";
import { useTokenListModal } from "../../hooks/useModal";
import { toDisplayAmount } from "../../lib/uniswap";
import { useSwapStore } from "../../hooks/useSwap";

export function TokenRow({
  index,
  style,
  data,
}: ListChildComponentProps<Token[]>) {
  const token = data[index];

  const { setAssetToken, addAsset } = useSwapStore();
  const { params, close } = useTokenListModal();

  const onClick = useCallback(() => {
    if (params.forAsset) {
      setAssetToken(params.forAsset, token);
    } else {
      addAsset(token);
    }

    close();
  }, [setAssetToken, addAsset, token, params, close]);

  const isAlreadySelected = useMemo(
    () => params.alreadySelectedAddresses.includes(token.address),
    [params, token]
  );

  const balance = useBalance(token);

  const BalanceWithSpinner = withSpinner(() => (
    <div className="font-mono">
      {toDisplayAmount(balance?.amount, token, false)}
    </div>
  ));

  return (
    <div
      className={classNames("flex items-center px-5 py-2", {
        "opacity-40": isAlreadySelected,
        "hover:bg-slate-50 cursor-pointer": !isAlreadySelected,
      })}
      style={style}
      onClick={isAlreadySelected ? undefined : onClick}
    >
      <div className="w-10 h-10 items-center flex">
        <img className="text-red rounded-full" src={token.logoURI} alt="" />
      </div>
      <div className="ml-4 mr-1 flex flex-col w-full space-y-1">
        <div className="text-md flex">
          <div className="grow">{token.symbol}</div>
          <BalanceWithSpinner
            loading={balance ? !balance.amount && balance.loading : false}
            error={balance?.error || false}
          />
        </div>
        <div className="text-xs text-gray-500 flex">
          <div className="grow">{token.name}</div>
          <div className="border-gray-300 border font-mono text-gray-400 rounded-md px-1 ">
            {token.isChainToken ? "CHAIN" : "ERC20"}
          </div>
        </div>
      </div>
    </div>
  );
}
