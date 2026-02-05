export type SaleItem = {
  id: string;
  amount: number;
};

export type DailySales = {
  date: string; // YYYY-MM-DD
  sales: SaleItem[];
  total: number;
};
