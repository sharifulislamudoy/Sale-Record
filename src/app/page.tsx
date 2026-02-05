"use client";

import { useEffect, useState } from "react";
import { DailySales, SaleItem } from "@/types/sales";
import {
  getLocalSales,
  saveLocalSales,
  clearLocalSales
} from "@/utils/localSales";

import SalesInputRow from "@/components/SalesInputRow";
import SalesTable from "@/components/SalesTable";
import TotalSummary from "@/components/TotalSummary";
import ExportButton from "@/components/ExportButton";
import { Calendar, TrendingUp, DollarSign, Package } from "lucide-react";

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export default function DashboardPage() {
  const today = getToday();

  const [data, setData] = useState<DailySales>({
    date: today,
    sales: [],
    total: 0
  });

  const [isEditable, setIsEditable] = useState(true);

  // load + date check
  useEffect(() => {
    const stored = getLocalSales();

    if (!stored) return;

    if (stored.date !== today) {
      fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stored)
      }).then(() => {
        clearLocalSales();
      });
    } else {
      setData(stored);
    }
  }, [today]);

  // sync localStorage
  useEffect(() => {
    saveLocalSales(data);
  }, [data]);

  function addSale(amount: number) {
    const newSale: SaleItem = {
      id: crypto.randomUUID(),
      amount
    };

    const updatedSales = [...data.sales, newSale];
    const total = updatedSales.reduce((s, i) => s + i.amount, 0);

    setData({ ...data, sales: updatedSales, total });
  }

  function updateSale(id: string, amount: number) {
    const updatedSales = data.sales.map(s =>
      s.id === id ? { ...s, amount } : s
    );

    const total = updatedSales.reduce((s, i) => s + i.amount, 0);
    setData({ ...data, sales: updatedSales, total });
  }

  function deleteSale(id: string) {
    const updatedSales = data.sales.filter(s => s.id !== id);
    const total = updatedSales.reduce((s, i) => s + i.amount, 0);
    setData({ ...data, sales: updatedSales, total });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                Sales Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Track and manage your daily sales efficiently</p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700 font-medium">{formatDate(today)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input & Table */}
          <div className="lg:col-span-2 space-y-8">
            {/* Add Sale Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Add New Sale</h2>
              </div>
              <SalesInputRow onAdd={addSale} />
              <p className="text-gray-500 text-sm mt-4">
                Press <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">Enter</kbd> to add sale
              </p>
            </div>

            {/* Sales Table Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Today's Sales</h2>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium">
                    {data.sales.length} items
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                {data.sales.length > 0 ? (
                  <SalesTable
                    sales={data.sales}
                    onUpdate={updateSale}
                    onDelete={deleteSale}
                    isEditable={isEditable}
                  />
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                      <DollarSign className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No sales yet</h3>
                    <p className="text-gray-500">Add your first sale using the input above</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Export */}
          <div className="space-y-8">
            {/* Total Summary Card */}
            <div className="bg-gradient-to-br from-slate-900 to-gray-900 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">Daily Summary</h2>
              </div>
              
              <div className="space-y-6">
                <TotalSummary total={data.total} />
                
                <div className="pt-6 border-t border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Transactions</span>
                    <span className="font-semibold">{data.sales.length}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Average Sale</span>
                    <span className="font-semibold">
                      ৳ {data.sales.length > 0 ? (data.total / data.sales.length).toFixed(2) : "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Date</span>
                    <span className="font-semibold">{today}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Export Data</h2>
              </div>
              
              <div className="space-y-4">
                <ExportButton />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditable(!isEditable)}
                  className={`w-full px-4 py-3 rounded-xl font-medium transition-all ${isEditable 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300'}`}
                >
                  {isEditable ? '✓ Editing Enabled' : 'Enable Editing'}
                </button>
                <button
                  onClick={() => {
                    if (data.sales.length > 0 && window.confirm('Clear all sales?')) {
                      setData({ date: today, sales: [], total: 0 });
                    }
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:border-red-300 hover:text-red-600 transition-all"
                >
                  Clear All Sales
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Data is automatically saved locally and synced when needed.</p>
          <p className="mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}