import classNames from "classnames";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { Icon } from "../../constants/icons";
import { useAsset } from "../../hooks/useAsset";
import { useEquity } from "../../hooks/useEquity";
import { useSettings } from "../../hooks/useSettings";
import { useSwapStore } from "../../hooks/useSwap";
import { Asset } from "../../lib";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 1}
        outerRadius={outerRadius + 7}
        fill="#c62f29"
      />
    </g>
  );
};

function Focus({
  asset,
  compoundWeight,
}: {
  asset: Asset | undefined;
  compoundWeight: number;
}) {
  const { fraction, executionEquity } = useAsset(asset);
  const { equity } = useEquity();
  const { format } = useSettings();

  return (
    <div className="flex font-mono items-center space-x-1 border border-gray-100 rounded-full pl-1 pr-2 py-1">
      {asset && (
        <>
          <img className="w-6 h-6" src={asset.logoURI}></img>
          <div className="flex items-center space-x-1">
            {((fraction ?? 0) * 100).toFixed(2)}%
            <div
              className={classNames("flex items-center ml-2", {
                "text-green-700": executionEquity?.side === "buy",
                "text-red-700": executionEquity?.side === "sell",
              })}
            >
              {executionEquity?.side === "buy" ? Icon.Plus : Icon.Minus}
              {format(executionEquity?.equity)}
            </div>
          </div>
        </>
      )}
      {!asset && (
        <>
          <div>{format(equity)}</div>
        </>
      )}
    </div>
  );
}

export function PizzaChart({
  className,
  size,
}: {
  className?: string;
  size: number;
}) {
  const { assets, compoundWeight, focusedAsset, focusAsset } = useSwapStore();
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  useEffect(() => {
    setActiveIndex(assets.findIndex((i) => i === focusedAsset));
  }, [focusedAsset, assets]);

  if (!assets.length) {
    return <></>;
  }

  return (
    <div className={classNames("my-5", className)}>
      <div className="flex flex-col items-center justify-center">
        <PieChart width={size} height={size}>
          <Pie
            data={assets}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={size / 2.2}
            fill="#8884d8"
            dataKey="weight"
            stroke={"#fff"}
            strokeWidth={1}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
          >
            {assets.map((it, idx) => (
              <Cell
                onMouseEnter={() => focusAsset(it)}
                onMouseLeave={() => focusAsset(undefined)}
                key={`cell-${idx}`}
                fill={"#febe24"}
                opacity={
                  it === focusedAsset
                    ? 1.0
                    : 1.0 - (1.0 / (assets.length + 3)) * (idx + 1)
                }
              />
            ))}
          </Pie>
        </PieChart>
        <div className="h-8 mt-4">
          <Focus asset={focusedAsset} compoundWeight={compoundWeight}></Focus>
        </div>
      </div>
    </div>
  );
}
