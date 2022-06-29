import { Web3ReactProvider } from "@web3-react/core";
import { ReactNode } from "react";
import { connectors } from "../../hooks/useConnector";

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
}
