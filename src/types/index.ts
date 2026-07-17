export interface Stock {
  ticker: string;
  name: string;
  price: number;
  avgCost: number;
  quantity: number;
  value: number;
  percentage: number;
}

export interface Quote {
  symbol: string;
  close: number;
  change: number;
  percentChange: number;
  previousClose: number;
}

export interface SymbolSearchResult {
  symbol: string;
  instrument_name?: string;
  name?: string;
  exchange?: string;
}

export interface PortfolioSnapshot {
  stocks: Stock[];
  quotes: Record<string, Quote>;
  series: Record<string, number[]>;
  updatedAt: Date | null;
}
