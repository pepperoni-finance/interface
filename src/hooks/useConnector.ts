import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

export const metamask = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

export const connectors = [metamask];

export function useConnector() {
  return connectors[0];
}
