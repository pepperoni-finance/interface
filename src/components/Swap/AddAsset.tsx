import { useCallback } from "react";
import { Icon } from "../../constants/icons";
import { useTokenListModal } from "../../hooks/useModal";
import { useSwapStore } from "../../hooks/useSwap";

export function AddAsset() {
  const { assets } = useSwapStore();
  const { open } = useTokenListModal();

  const onClick = useCallback(() => {
    open({
      alreadySelectedAddresses: assets.map((it) => it.address),
      forAsset: undefined,
    });
  }, [assets, open]);

  return (
    <div className="flex mx-4 my-2 justify-center">
      <button
        className="h-12 w-12 rounded-full border border-gray-100 hover:bg-red-700 hover:text-white flex justify-center items-center"
        onClick={onClick}
      >
        {Icon.Add}
      </button>
    </div>
  );
}
