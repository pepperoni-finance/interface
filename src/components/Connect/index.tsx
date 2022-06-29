import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { Icon } from "../../constants/icons";
import { useUniverseStore } from "../../hooks/useUniverseStore";
import styled from "styled-components";
import tw from "twin.macro";

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
  const { isActive, connector } = useWeb3React();
  const { networks } = useUniverseStore();

  const onClick = useCallback(() => {
    connector.activate({
      supportedChainIds: networks.map((it) => it.chainId),
    });
  }, [connector, networks]);

  if (isActive) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-3xl p-3 border border-gray-100">
      <div className="flex space-x-1 justify-center mt-3 mb-5">
        <div>{Icon.Info}</div>
        <p>Connect your wallet in order to use this application.</p>
      </div>
      <Button onClick={onClick}>Connect Wallet</Button>
    </div>
  );
}
