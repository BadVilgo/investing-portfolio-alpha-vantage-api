import type { Stock } from "../types";
import { supabase } from "./supabaseClient";

const STORAGE_KEY = "stockData";

export const initialStockData: Stock[] = [
  { ticker: "AMZN", name: "Amazon", price: 182, avgCost: 150, quantity: 5, value: 910, percentage: 0 },
  { ticker: "NVDA", name: "Nvidia", price: 132, avgCost: 98, quantity: 10, value: 1320, percentage: 0 },
  { ticker: "IBM", name: "IBM", price: 228, avgCost: 245, quantity: 15, value: 3420, percentage: 0 },
];

export function normalizeStocks(raw: Partial<Stock>[]): Stock[] {
  return raw.map((stock) => {
    const price = Number(stock.price) || 0;
    const quantity = Number(stock.quantity) || 0;
    return {
      ticker: String(stock.ticker ?? ""),
      name: String(stock.name ?? stock.ticker ?? ""),
      price,
      avgCost: Number(stock.avgCost) || price,
      quantity,
      value: price * quantity,
      percentage: Number(stock.percentage) || 0,
    };
  });
}

export function recalculatePercentages(stocks: Stock[]): Stock[] {
  const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);

  return stocks.map((stock) => ({
    ...stock,
    percentage: totalValue ? Number(((stock.value / totalValue) * 100).toFixed(2)) : 0,
  }));
}

export interface Concentration {
  topTicker: string;
  topShare: number;
  level: "balanced" | "moderate" | "high";
}

export function concentration(stocks: Stock[]): Concentration | null {
  const withValue = stocks.filter((stock) => stock.value > 0);
  if (withValue.length === 0) {
    return null;
  }

  const top = withValue.reduce((max, stock) => (stock.value > max.value ? stock : max));
  const total = withValue.reduce((sum, stock) => sum + stock.value, 0);
  const topShare = (top.value / total) * 100;

  return {
    topTicker: top.ticker,
    topShare: Number(topShare.toFixed(1)),
    level: topShare > 50 ? "high" : topShare > 100 / 3 ? "moderate" : "balanced",
  };
}

export function buildHistory(stocks: Stock[], series: Record<string, number[]>): number[] {
  const covered = stocks.filter(
    (stock) => stock.quantity > 0 && (series[stock.ticker]?.length ?? 0) > 1
  );
  if (covered.length === 0) {
    return [];
  }

  const length = Math.min(...covered.map((stock) => series[stock.ticker].length));

  return Array.from({ length }, (_, index) =>
    covered.reduce((sum, stock) => {
      const values = series[stock.ticker];
      return sum + stock.quantity * values[values.length - length + index];
    }, 0)
  );
}

export function toCsv(stocks: Stock[]): string {
  const header = "Ticker,Name,Quantity,Buy price,Current price,Value,Percent of portfolio";
  const rows = stocks.map((stock) =>
    [
      stock.ticker,
      `"${stock.name.replace(/"/g, '""')}"`,
      stock.quantity,
      stock.avgCost.toFixed(2),
      stock.price.toFixed(2),
      stock.value.toFixed(2),
      stock.percentage,
    ].join(",")
  );
  return [header, ...rows].join("\n");
}

export function readLocalPortfolio(): Stock[] | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    return normalizeStocks(JSON.parse(saved) as Partial<Stock>[]);
  } catch {
    return null;
  }
}

export function writeLocalPortfolio(stocks: Stock[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
}

export async function loadPortfolio(userId: string): Promise<Stock[] | null> {
  const { data, error } = await supabase
    .from("portfolios")
    .select("data")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const raw = data?.data as Partial<Stock>[] | undefined;
  return raw ? normalizeStocks(raw) : null;
}

export async function savePortfolio(userId: string, stocks: Stock[]): Promise<void> {
  const { error } = await supabase.from("portfolios").upsert(
    {
      user_id: userId,
      data: stocks,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    throw error;
  }
}
