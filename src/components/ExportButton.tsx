"use client";

import * as XLSX from "xlsx";
import { useState } from "react";
import { Download, Calendar, FileSpreadsheet } from "lucide-react";

export default function ExportButton() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleExport() {
    if (!from || !to) {
      alert("Please select both dates");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/sales?from=${from}&to=${to}`);
      const data = await res.json();

      const sheetData = data.map((d: any) => ({
        Date: d.date,
        "Total Sales": d.total,
        "Transaction Count": d.sales?.length || 0,
        "Average Sale": d.sales?.length > 0 ? (d.total / d.sales.length).toFixed(2) : 0
      }));

      const worksheet = XLSX.utils.json_to_sheet(sheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

      // Add some styling
      const wscols = [
        { wch: 12 }, // Date
        { wch: 15 }, // Total Sales
        { wch: 18 }, // Transaction Count
        { wch: 15 }, // Average Sale
      ];
      worksheet["!cols"] = wscols;

      XLSX.writeFile(workbook, `Sales_Report_${from}_to_${to}.xlsx`);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900">Select Date Range</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="date" 
                value={from} 
                onChange={e => setFrom(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="date" 
                value={to} 
                onChange={e => setTo(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleExport}
        disabled={isLoading || !from || !to}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] ${
          isLoading || !from || !to
            ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:shadow-xl active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            <span>Export to Excel</span>
            <FileSpreadsheet className="h-5 w-5 ml-auto" />
          </>
        )}
      </button>

      {from && to && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Selected Range</p>
              <p className="text-sm text-gray-600">
                {new Date(from).toLocaleDateString()} - {new Date(to).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}