import type { Stock } from "../types";
import { supabase } from "./supabaseClient";

const STORAGE_KEY = "stockData";

export const initialStockData: Stock[] = [
  { ticker: "AMZN", name: "Amazon", price: 182, quantity: 5, value: 910, percentage: 0 },
  { ticker: "NVDA", name: "Nvidia", price: 132, quantity: 10, value: 1320, percentage: 0 },
  { ticker: "IBM", name: "IBM", price: 228, quantity: 15, value: 3420, percentage: 0 },
];

export function recalculatePercentages(stocks: Stock[]): Stock[] {
  const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);

  return stocks.map((stock) => ({
    ...stock,
    percentage: totalValue ? Number(((stock.value / totalValue) * 100).toFixed(2)) : 0,
  }));
}

export function readLocalPortfolio(): Stock[] | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    const parsed = JSON.parse(saved) as Stock[];
    return parsed.map((stock) => ({
      ...stock,
      price: Number(stock.price),
      quantity: Number(stock.quantity),
      value: Number(stock.value),
      percentage: Number(stock.percentage),
    }));
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

  return (data?.data as Stock[] | undefined) ?? null;
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
