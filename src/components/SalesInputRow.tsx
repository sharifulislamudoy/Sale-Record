"use client";

import { useState, KeyboardEvent } from "react";
import { DollarSign } from "lucide-react";

type Props = {
  onAdd: (amount: number) => void;
};

export default function SalesInputRow({ onAdd }: Props) {
  const [value, setValue] = useState("");

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const num = Number(value);
      if (!isNaN(num) && num > 0) {
        onAdd(num);
        setValue("");
      }
    }
  }

  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <DollarSign className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
      </div>
      <input
        type="number"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Enter sale amount (Press Enter to add)"
        className="w-full pl-12 pr-24 py-4 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-300 rounded-xl text-lg font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 hover:border-blue-300"
        min="0"
        step="0.01"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
          Press Enter
        </span>
      </div>
    </div>
  );
}