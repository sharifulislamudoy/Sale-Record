import { DailySales } from "@/types/sales";

const KEY = "daily-sales";

export function getLocalSales(): DailySales | null {
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as DailySales) : null;
}

export function saveLocalSales(data: DailySales) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function clearLocalSales() {
  localStorage.removeItem(KEY);
}
