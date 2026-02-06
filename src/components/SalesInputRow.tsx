"use client"

import { useState } from "react"

interface Props {
  onAdded: () => void
}

export default function SalesInputRow({ onAdded }: Props) {
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

  const submit = async () => {
    const value = Number(amount)
    if (!value) return

    await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: value, note }),
    })

    setAmount("")
    setNote("")
    onAdded()
  }

  return (
    <div className="mt-8 bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">➕ Add New Sale</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount (৳)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">৳</span>
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
          <input
            placeholder="Add a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
          />
        </div>
        
        <div className="flex items-end">
          <button
            onClick={submit}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Add Sale
          </button>
        </div>
      </div>
    </div>
  )
}