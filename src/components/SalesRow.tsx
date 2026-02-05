"use client";

import { SaleItem } from "@/types/sales";
import { useState } from "react";
import { Edit2, Trash2, Check, X } from "lucide-react";

type Props = {
  sale: SaleItem;
  isEditable: boolean;
  onUpdate: (id: string, amount: number) => void;
  onDelete: (id: string) => void;
};

export default function SalesRow({
  sale,
  isEditable,
  onUpdate,
  onDelete
}: Props) {
  const [value, setValue] = useState(sale.amount.toString());
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(sale.amount.toString());

  const handleSave = () => {
    const num = Number(tempValue);
    if (!isNaN(num) && num > 0) {
      onUpdate(sale.id, num);
      setValue(tempValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="py-4 px-6">
        <div className="flex items-center justify-between">
          {isEditable && isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <span className="text-gray-500 font-medium">৳</span>
              <input
                type="number"
                value={tempValue}
                onChange={e => setTempValue(e.target.value)}
                className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                autoFocus
                min="0"
                step="0.01"
              />
              <div className="flex gap-1 ml-2">
                <button
                  onClick={handleSave}
                  className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 bg-gradient-to-r from-gray-300 to-gray-400 text-white rounded-lg hover:shadow transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    ৳ {Number(value).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Sale #{sale.id.substring(0, 8)}
                  </div>
                </div>
              </div>
              {isEditable && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:shadow-md"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </div>
      </td>

      {isEditable && !isEditing && (
        <td className="py-4 px-6">
          <button
            onClick={() => onDelete(sale.id)}
            className="p-2 bg-gradient-to-r from-red-50 to-red-100 text-red-600 rounded-lg hover:shadow-md transition-all transform hover:scale-105"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </td>
      )}
    </tr>
  );
}