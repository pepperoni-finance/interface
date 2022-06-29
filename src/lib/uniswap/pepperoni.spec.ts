import { arrayEquityOf, pepperoniOf } from "./pepperoni";

describe("equityOf", () => {
  test("should calculate the equity of input array", () => {
    const input = [
      {
        //BAT
        quantity: "21646187430000000000",
        rate: "361490",
        decimals: 18,
      },
      {
        //BTC
        quantity: "876825",
        rate: "20717319373",
        decimals: 8,
      },
    ];

    expect(arrayEquityOf(input)).toBe("189479516");
  });

  test("should calculate a fraction of value", () => {
    const input = [
      {
        //BAT
        quantity: "21646187430000000000",
        rate: "361490",
        decimals: 18,
        weight: 2,
      },
      {
        //BTC
        quantity: "876825",
        rate: "20717319373",
        decimals: 8,
        weight: 1,
      },
    ];

    expect(pepperoniOf(input)).toEqual([
      {
        equity: "1136877096",
      },
      {
        equity: "568438548",
      },
    ]);
  });
});
