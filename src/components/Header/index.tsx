import { useWeb3React } from "@web3-react/core";
import { Network } from "./Network";
import { Wallet } from "./Wallet";

export default function Header() {
  const { isActive } = useWeb3React();

  return (
    <>
      <div className="sticky top-4">
        <div className="my-4 h-9 flex space-x-3">
          {isActive && (
            <>
              <Network></Network>
              <div className="grow"></div>
              <Wallet></Wallet>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center my-5">
        <img className="h-52 mix-blend-multiply" src="./logo.jpg" />
      </div>
    </>
  );
}
