import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { Icon } from "../../constants/icons";
import { useUniverseStore } from "../../hooks/useUniverseStore";
import styled from "styled-components";
import tw from "twin.macro";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../Modal";

const Button = styled.button(
  () => tw`
    w-full 
    text-lg 
    rounded-2xl 
    p-3  
    text-red-700 
    bg-white
    border border-red-700 
    hover:bg-red-700 hover:text-white`
);

export function Connect() {
  const { connector } = useWeb3React();
  const { networks } = useUniverseStore();
  const { close, open, isOpen } = useModal("walletNotInjected");

  const onClick = useCallback(() => {
    if (!window.ethereum) {
      open({});
    } else {
      connector.activate({
        supportedChainIds: networks.map((it) => it.chainId),
      });
    }
  }, [connector, networks, open]);

  return (
    <div className="bg-white shadow-md rounded-3xl p-3 border border-gray-100">
      <div className="flex space-x-1 justify-center mt-3 mb-5">
        <div>{Icon.Info}</div>
        <p>Connect your wallet in order to use this application.</p>
      </div>
      <Button onClick={onClick}>Connect Wallet</Button>
      <Modal onClose={close} open={isOpen}>
        <div className="flex flex-col rounded-3xl bg-white w-full">
          <div className="border-b border-gray-100">
            <div className="m-5 mb-2 flex">
              <div className="ml-8 grow text-lg text-center">
                Wallet not found
              </div>
              <button
                className="hover:bg-red-700 hover:text-white rounded-2xl px-1 w-8 h-8"
                onClick={close}
              >
                {Icon.Delete}
              </button>
            </div>
          </div>
          <div className="mb-2 mx-2">
            <div className="m-5 flex align-middle justify-center text-center">
              Unable to find injected Ethereum wallet. You need to install one
              before start.
            </div>
            <Button onClick={close}>OK</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
