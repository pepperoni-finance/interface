import { Icon } from "../../constants/icons";
import { Modal } from "../Modal";
import { useNetwork } from "../../hooks/useNetwork";
import { Network } from "../../lib";
import { useUniverseStore } from "../../hooks/useUniverseStore";

const Link = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-3 w-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export function NetworkListRow({
  chain,
  onClick,
}: {
  chain: Network;
  onClick: () => void;
}) {
  const network = useNetwork();

  return (
    <div
      className="flex items-center px-5 py-2 hover:bg-slate-50 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <img className="w-8 h-8" src={chain.logoURI} />
      </div>
      <div className="ml-4 grow">
        <div className="text-md">{chain.name}</div>
        <div className="group flex rounded-md p-1 items-center text-xs group opacity-40 hover:bg-gray-200">
          {Link}
          {chain.url}
        </div>
      </div>

      {network?.chainId === chain.chainId && (
        <div className="flex justify-center text-white items-center rounded-2xl px-1 w-6 h-6 mx-1 bg-red-700">
          {Icon.Checked}
        </div>
      )}
    </div>
  );
}

export function NetworkModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { networks } = useUniverseStore();

  return (
    <Modal open={isOpen} onClose={() => onClose()}>
      <div className="flex flex-col rounded-3xl bg-white w-full">
        <div className="border-b border-gray-100">
          <div className="m-5 mb-2 flex">
            <div className="ml-8 grow text-lg text-center">
              Select a network
            </div>
            <button
              className="hover:bg-red-700 hover:text-white rounded-2xl px-1 w-8 h-8"
              onClick={onClose}
            >
              {Icon.Delete}
            </button>
          </div>
        </div>
        <div className="mb-2">
          {networks.map((it) => (
            <NetworkListRow
              key={it.chainId}
              chain={it}
              onClick={onClose}
            ></NetworkListRow>
          ))}
        </div>
      </div>
    </Modal>
  );
}
