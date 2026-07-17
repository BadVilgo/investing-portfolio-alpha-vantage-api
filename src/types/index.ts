export interface Stock {
  ticker: string;
  name: string;
  price: number;
  quantity: number;
  value: number;
  percentage: number;
}

export interface SymbolSearchResult {
  symbol: string;
  instrument_name?: string;
  name?: string;
  exchange?: string;
}
