import type { Quote, SymbolSearchResult } from "../types";

const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;
const BASE_URL = "https://api.twelvedata.com";
const SERIES_CACHE_KEY = "seriesCacheV1";
const MAX_SERIES_PER_LOAD = 8;

interface RawQuote {
  symbol?: string;
  close?: string;
  change?: string;
  percent_change?: string;
  previous_close?: string;
  code?: number;
  message?: string;
}

interface SeriesCache {
  [symbol: string]: { day: string; values: number[] };
}

function parseQuote(symbol: string, raw: RawQuote | undefined): Quote | null {
  const close = Number.parseFloat(raw?.close ?? "");
  if (Number.isNaN(close)) {
    return null;
  }
  return {
    symbol,
    close,
    change: Number.parseFloat(raw?.change ?? "") || 0,
    percentChange: Number.parseFloat(raw?.percent_change ?? "") || 0,
    previousClose: Number.parseFloat(raw?.previous_close ?? "") || close,
  };
}

export async function fetchQuotes(symbols: string[]): Promise<Record<string, Quote>> {
  if (symbols.length === 0) {
    return {};
  }

  const response = await fetch(
    `${BASE_URL}/quote?symbol=${symbols.join(",")}&apikey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch quotes. Please try again later.");
  }

  const data = await response.json();

  if (data.code || data.status === "error") {
    throw new Error(data.message || "The market data provider returned an error.");
  }

  const quotes: Record<string, Quote> = {};

  if (symbols.length === 1) {
    const quote = parseQuote(symbols[0], data as RawQuote);
    if (quote) {
      quotes[symbols[0]] = quote;
    }
    return quotes;
  }

  for (const symbol of symbols) {
    const quote = parseQuote(symbol, data[symbol] as RawQuote | undefined);
    if (quote) {
      quotes[symbol] = quote;
    }
  }

  return quotes;
}

function readSeriesCache(): SeriesCache {
  try {
    return (JSON.parse(localStorage.getItem(SERIES_CACHE_KEY) ?? "{}") as SeriesCache) ?? {};
  } catch {
    return {};
  }
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

async function fetchTimeSeries(symbol: string): Promise<number[]> {
  const response = await fetch(
    `${BASE_URL}/time_series?symbol=${encodeURIComponent(symbol)}&interval=1day&outputsize=30&apikey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch price history.");
  }

  const data = await response.json();

  if (data.code || data.status === "error" || !Array.isArray(data.values)) {
    throw new Error(data.message || "The market data provider returned an error.");
  }

  return (data.values as { close: string }[])
    .map((entry) => Number.parseFloat(entry.close))
    .filter((close) => !Number.isNaN(close))
    .reverse();
}

export async function fetchSeriesCached(
  symbols: string[],
  onSeries: (symbol: string, values: number[]) => void
): Promise<void> {
  const cache = readSeriesCache();
  const day = todayKey();
  let requestsUsed = 0;

  for (const symbol of symbols) {
    const cached = cache[symbol];
    if (cached && cached.day === day && cached.values.length > 1) {
      onSeries(symbol, cached.values);
      continue;
    }

    if (requestsUsed >= MAX_SERIES_PER_LOAD) {
      if (cached && cached.values.length > 1) {
        onSeries(symbol, cached.values);
      }
      continue;
    }

    try {
      requestsUsed += 1;
      const values = await fetchTimeSeries(symbol);
      cache[symbol] = { day, values };
      localStorage.setItem(SERIES_CACHE_KEY, JSON.stringify(cache));
      onSeries(symbol, values);
    } catch {
      if (cached && cached.values.length > 1) {
        onSeries(symbol, cached.values);
      }
      break;
    }
  }
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
