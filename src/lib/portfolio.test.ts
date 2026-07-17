import { describe, expect, it } from "vitest";
import {
  buildHistory,
  concentration,
  normalizeStocks,
  recalculatePercentages,
  toCsv,
} from "./portfolio";
import type { Stock } from "../types";

function makeStock(ticker: string, value: number, quantity = value): Stock {
  return {
    ticker,
    name: ticker,
    price: quantity ? value / quantity : 0,
    avgCost: 1,
    quantity,
    value,
    percentage: 0,
  };
}

describe("recalculatePercentages", () => {
  it("splits percentages proportionally to value", () => {
    const result = recalculatePercentages([makeStock("A", 75), makeStock("B", 25)]);
    expect(result[0].percentage).toBe(75);
    expect(result[1].percentage).toBe(25);
  });

  it("returns zero percentages when total value is zero", () => {
    const result = recalculatePercentages([makeStock("A", 0), makeStock("B", 0)]);
    expect(result.every((stock) => stock.percentage === 0)).toBe(true);
  });

  it("does not mutate the original array", () => {
    const original = [makeStock("A", 50), makeStock("B", 50)];
    recalculatePercentages(original);
    expect(original[0].percentage).toBe(0);
  });
});

describe("normalizeStocks", () => {
  it("defaults avgCost to price for legacy data", () => {
    const result = normalizeStocks([
      { ticker: "A", name: "A", price: 10, quantity: 2 } as Partial<Stock>,
    ]);
    expect(result[0].avgCost).toBe(10);
    expect(result[0].value).toBe(20);
  });

  it("keeps an explicit avgCost", () => {
    const result = normalizeStocks([
      { ticker: "A", name: "A", price: 10, avgCost: 7, quantity: 2 } as Partial<Stock>,
    ]);
    expect(result[0].avgCost).toBe(7);
  });
});

describe("concentration", () => {
  it("flags a dominant position as high", () => {
    const result = concentration([makeStock("A", 80), makeStock("B", 20)]);
    expect(result?.topTicker).toBe("A");
    expect(result?.topShare).toBe(80);
    expect(result?.level).toBe("high");
  });

  it("flags an even split as balanced", () => {
    const result = concentration([
      makeStock("A", 25),
      makeStock("B", 25),
      makeStock("C", 25),
      makeStock("D", 25),
    ]);
    expect(result?.level).toBe("balanced");
  });

  it("returns null for an empty portfolio", () => {
    expect(concentration([])).toBeNull();
  });
});

describe("buildHistory", () => {
  it("sums quantity times close per day", () => {
    const stocks = [makeStock("A", 20, 2), makeStock("B", 30, 3)];
    const series = { A: [1, 2, 3], B: [10, 20, 30] };
    expect(buildHistory(stocks, series)).toEqual([32, 64, 96]);
  });

  it("aligns series of different lengths on the most recent days", () => {
    const stocks = [makeStock("A", 10, 1), makeStock("B", 10, 1)];
    const series = { A: [1, 2, 3, 4], B: [10, 20] };
    expect(buildHistory(stocks, series)).toEqual([13, 24]);
  });

  it("returns an empty history when no series are available", () => {
    expect(buildHistory([makeStock("A", 10)], {})).toEqual([]);
  });
});

describe("toCsv", () => {
  it("escapes names containing commas and quotes", () => {
    const stock = { ...makeStock("A", 10, 1), name: 'Ac"me, Inc' };
    const csv = toCsv([stock]);
    expect(csv.split("\n")[1]).toContain('"Ac""me, Inc"');
  });

  it("starts with a header row", () => {
    expect(toCsv([]).startsWith("Ticker,Name,Quantity")).toBe(true);
  });
});
