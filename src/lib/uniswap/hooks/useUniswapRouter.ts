import { AlphaRouter } from "@uniswap/smart-order-router";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export function useUniswapRouter() {
  const { provider } = useWeb3React();
  const [router, setRouter] = useState<AlphaRouter>();

  useEffect(() => {
    (async () => {
      if (!provider) {
        return;
      }

      const router = new AlphaRouter({
        chainId: 1,
        provider,
      });

      setRouter(router);
    })();
  }, [provider]);

  return router;
}
