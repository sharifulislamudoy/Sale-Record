"use client";

import { SaleItem } from "@/types/sales";
import SalesRow from "./SalesRow";

type Props = {
  sales: SaleItem[];
  isEditable: boolean;
  onUpdate: (id: string, amount: number) => void;
  onDelete: (id: string) => void;
};

export default function SalesTable({
  sales,
  isEditable,
  onUpdate,
  onDelete
}: Props) {
  if (sales.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span>Amount (৳)</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-normal">
                    {sales.length} items
                  </span>
                </div>
              </th>
              {isEditable && (
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm uppercase tracking-wider w-24">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sales.map((s, index) => (
              <SalesRow
                key={s.id}
                sale={s}
                isEditable={isEditable}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Summary Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Total Items</span>
          <span className="font-bold text-lg text-gray-900">{sales.length}</span>
        </div>
      </div>
    </div>
  );
}