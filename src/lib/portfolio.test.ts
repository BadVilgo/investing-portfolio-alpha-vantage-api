import { describe, expect, it } from "vitest";
import { recalculatePercentages } from "./portfolio";
import type { Stock } from "../types";

function makeStock(ticker: string, value: number): Stock {
  return { ticker, name: ticker, price: 1, quantity: value, value, percentage: 0 };
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

  it("sums close to 100 for an even split", () => {
    const result = recalculatePercentages([
      makeStock("A", 10),
      makeStock("B", 10),
      makeStock("C", 10),
    ]);
    const total = result.reduce((sum, stock) => sum + stock.percentage, 0);
    expect(Math.round(total)).toBe(100);
  });

  it("does not mutate the original array", () => {
    const original = [makeStock("A", 50), makeStock("B", 50)];
    recalculatePercentages(original);
    expect(original[0].percentage).toBe(0);
  });
});
