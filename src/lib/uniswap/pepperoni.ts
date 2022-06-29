import Big from "big.js";

export function equityOf(input: {
  quantity: string;
  rate: string;
  decimals: number;
}) {
  return new Big(input.quantity)
    .mul(new Big(input.rate))
    .div(new Big(10 ** input.decimals))
    .toFixed(0);
}

export function arrayEquityOf(
  input: Array<{ quantity: string; rate: string; decimals: number }>
) {
  return input
    .reduce((sum, it) => sum.add(new Big(equityOf(it))), new Big(0))
    .toFixed(0);
}

export function pepperoniOf(
  weight: number,
  compound: {
    equity: string;
    weight: number;
  }
) {
  const stepSize = new Big(compound.equity).div(new Big(compound.weight));

  return new Big(weight).mul(stepSize).toFixed(0);
}

export function executionAmount(
  currentAmount: string,
  destinationAmount: string
) {
  const current = new Big(currentAmount);
  const destination = new Big(destinationAmount);

  if (destination.gt(current)) {
    return {
      equity: destination.minus(current).toFixed(0),
      side: "buy",
    };
  }

  if (destination.lt(current)) {
    return { equity: current.minus(destination).toFixed(0), side: "sell" };
  }

  return {
    equity: "0",
  };
}
