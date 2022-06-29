import classNames from "classnames";
import { useCallback, useEffect, useMemo } from "react";
import { Icon } from "../../constants/icons";
import { withSpinner } from "../../hocs/withSpinner";
import { useAsset } from "../../hooks/useAsset";
import { useTokenListModal } from "../../hooks/useModal";
import { useSettings } from "../../hooks/useSettings";
import { Asset, Quote } from "../../lib";
import { useRateFetch } from "../../hooks/useRate";
import { useSwapStore } from "../../hooks/useSwap";

function WeightInput({
  asset,
  balance,
  route,
}: {
  asset: Asset;
  balance: Quote | undefined;
  route: Quote | undefined;
}) {
  const { focusedAsset, setAssetWeight } = useSwapStore();

  const onWeightChange = useMemo(
    () => (weightValue: string) =>
      setAssetWeight(asset, Math.min(Number(weightValue), 100)),
    [asset, setAssetWeight]
  );

  return (
    <div
      className={classNames("grow flex items-end", {
        "text-gray-300": false,
      })}
    >
      <input
        className={classNames(
          "font-mono bg-transparent text-2xl text-center w-16 outline-0 border border-gray-100 px-2 rounded-full",
          {
            "border-white": asset === focusedAsset,
          }
        )}
        type="number"
        value={asset.weight}
        min={0}
        max={100}
        disabled={!balance?.amount || !route?.amount}
        onChange={(e) => onWeightChange(e.target.value)}
      ></input>
      <div className="text-sm ml-1">g</div>
    </div>
  );
}

function IngredientChangeButton({ asset }: { asset: Asset }) {
  const { assets, removeAsset } = useSwapStore();
  const { open } = useTokenListModal();

  const onChangeClick = useCallback(
    () =>
      open({
        alreadySelectedAddresses: assets.map((it) => it.address),
        forAsset: asset,
      }),
    [asset, assets, open]
  );

  const onRemoveClick = useCallback(
    () => removeAsset(asset),
    [asset, removeAsset]
  );

  return (
    <div className="flex items-center h-8">
      <button
        className="text-lg hover:bg-red-700 hover:text-white rounded-2xl bg-gray-100 h-full"
        onClick={onChangeClick}
      >
        <div className="flex items-center ml-1 mr-2">
          <img
            className="w-6 h-6 rounded-full mr-1 bg-white"
            src={asset?.logoURI}
          />{" "}
          <span>{asset?.symbol}</span>
        </div>
      </button>
      <button
        className="hover:bg-red-700 hover:text-white rounded-2xl px-1 h-full"
        onClick={onRemoveClick}
      >
        {Icon.Delete}
      </button>
    </div>
  );
}

function IngredientRow({
  asset,
  compoundWeight,
}: {
  asset: Asset;
  compoundWeight: number;
}) {
  const { focusedAsset, focusAsset } = useSwapStore();
  const { format } = useSettings();

  const { equity, destinationEquity, executionEquity, balance, rate } =
    useAsset(asset);

  const Route = withSpinner(() => (
    <div className="group flex items-center space-x-1 hover:bg-gray-200 rounded-full px-2 hover:cursor-pointer">
      <div>{format(equity)}</div>
    </div>
  ));

  const isLoading = useMemo(() => {
    return (
      (balance ? !balance.amount && balance.loading : false) ||
      (rate ? !rate.amount && rate.loading : false)
    );
  }, [balance, rate]);

  return (
    <div
      className={classNames("px-4 py-2", {
        "bg-gray-100": asset === focusedAsset,
      })}
      onMouseOver={() => focusAsset(asset)}
      onMouseOut={() => focusAsset(undefined)}
    >
      <div className="flex">
        <WeightInput asset={asset} balance={balance} route={rate} />
        <IngredientChangeButton asset={asset}></IngredientChangeButton>
      </div>
      <div className="flex justify-center text-gray-500 text-sm mt-1 mr-1 h-5">
        <div className="flex justify-end items-center">
          <div className="font-mono group flex items-center hover:bg-gray-200 rounded-full px-2 hover:cursor-pointer">
            {!isLoading && format(destinationEquity)}
          </div>
        </div>
        <div className="grow text-right">
          <div className="flex justify-end items-center font-mono">
            <Route
              className="mr-1"
              loading={isLoading}
              error={rate?.error || false}
            ></Route>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssetList() {
  const { assets, compoundWeight } = useSwapStore();
  const { fetchRate } = useRateFetch();

  const fetch = useCallback(
    () => assets.forEach((it) => fetchRate(it)),
    [fetchRate, assets]
  );

  useEffect(() => {
    fetch();

    const interval = setInterval(() => fetch(), 3000);

    return () => clearInterval(interval);
  }, [fetch]);

  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden">
      {!assets.length && (
        <p className="text-center p-4 opacity-40 text-sm">
          Use button below to add a tokens to rebalance or click here to import
          tokens from your wallet.
        </p>
      )}
      {assets.map((it, idx) => (
        <IngredientRow
          key={idx}
          asset={it}
          compoundWeight={compoundWeight}
        ></IngredientRow>
      ))}
    </div>
  );
}
