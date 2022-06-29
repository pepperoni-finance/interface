import { Icon } from "../../constants/icons";

export function Header() {
  return (
    <div className="flex mb-3">
      <button className="hover:bg-red-700 hover:text-white rounded-2xl px-1 h-8">
        {Icon.Info}
      </button>
      <div className="grow text-lg flex justify-center items-center">
        <div>Rebalance</div>
      </div>
      <button className="hover:bg-red-700 hover:text-white rounded-2xl px-1 h-8">
        {Icon.Setting}
      </button>
    </div>
  );
}
