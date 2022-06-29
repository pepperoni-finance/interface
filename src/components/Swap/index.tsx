import { AddAsset } from "./AddAsset";
import { AssetList } from "./AssetList";
import { Header } from "./Header";
import { PizzaChart } from "./PizzaChart";
import { RebalanceButton } from "./RebalanceButton";

export default function Swap() {
  return (
    <div className="bg-white shadow-md rounded-3xl p-3">
      <div className="">
        <Header></Header>
        <AssetList></AssetList>
        <AddAsset></AddAsset>
        <PizzaChart size={160}></PizzaChart>
        <RebalanceButton></RebalanceButton>
      </div>
    </div>
  );
}
