export interface Symbole {
  count: number;
  result: resultModel [];
}

interface resultModel {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}
