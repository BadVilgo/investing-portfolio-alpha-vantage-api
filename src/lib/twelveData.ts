import type { SymbolSearchResult } from "../types";

const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;
const BASE_URL = "https://api.twelvedata.com";

interface PriceResponse {
  price?: string;
  code?: number;
  message?: string;
}

export async function fetchPrices(symbols: string[]): Promise<Record<string, number>> {
  if (symbols.length === 0) {
    return {};
  }

  const response = await fetch(
    `${BASE_URL}/price?symbol=${symbols.join(",")}&apikey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prices. Please try again later.");
  }

  const data = await response.json();

  if (data.code || data.status === "error") {
    throw new Error(data.message || "The market data provider returned an error.");
  }

  const prices: Record<string, number> = {};

  if (symbols.length === 1) {
    const single = data as PriceResponse;
    const price = Number.parseFloat(single.price ?? "");
    if (!Number.isNaN(price)) {
      prices[symbols[0]] = price;
    }
    return prices;
  }

  for (const symbol of symbols) {
    const price = Number.parseFloat((data[symbol] as PriceResponse | undefined)?.price ?? "");
    if (!Number.isNaN(price)) {
      prices[symbol] = price;
    }
  }

  return prices;
}

export async function fetchPrice(symbol: string): Promise<number> {
  const prices = await fetchPrices([symbol]);
  return prices[symbol] ?? 0;
}

export async function searchSymbols(query: string): Promise<SymbolSearchResult[]> {
  const response = await fetch(
    `${BASE_URL}/symbol_search?symbol=${encodeURIComponent(query)}&apikey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Search failed. Please try again later.");
  }

  const data = await response.json();
  return (data.data as SymbolSearchResult[] | undefined) ?? [];
}
