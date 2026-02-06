"use client"

import { useState } from "react"

export default function ExportSection() {
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    const download = () => {
        if (!from || !to) return
        window.open(`/api/export?from=${from}&to=${to}`)
    }

    return (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">📤</span>
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-800">Export Sales Data</h4>
                    <p className="text-gray-600 text-sm">Download Excel reports for any date range</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                        <input
                            type="date"
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                        <input
                            type="date"
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all"
                        />
                    </div>
                </div>

                <button
                    onClick={download}
                    disabled={!from || !to}
                    className={`w-full md:w-auto px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${from && to
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <span>📥</span>
                        Download Excel Report
                    </div>
                </button>
            </div>
        </div>
    )
}