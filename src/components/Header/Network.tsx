import { useState } from "react";
import { useNetwork } from "../../hooks/useNetwork";
import { NetworkModal } from "./NetworkModal";

export function Network() {
  const [isOpen, setOpen] = useState(false);
  const { logoURI, name } = useNetwork();

  return (
    <>
      <button
        className="flex rounded-full overflow-hidden bg-white shadow-sm border-white items-center px-2 space-x-2 hover:bg-red-700 hover:text-white"
        onClick={() => setOpen(true)}
      >
        <img className="w-6 h-6" src={logoURI}></img>
        <div className="hidden sm:block pr-1">{name}</div>
      </button>

      <NetworkModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      ></NetworkModal>
    </>
  );
}
