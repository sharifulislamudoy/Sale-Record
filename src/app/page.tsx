"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import DateHeader from "@/components/DateHeader"
import SalesInputRow from "@/components/SalesInputRow"
import SalesTable from "@/components/SalesTable"
import DailyTotalCard from "@/components/DailyTotalCard"
import ExportSection from "@/components/ExportSection"
import { Sale } from "@/types/sales"

export default function HomePage() {
  const [today, setToday] = useState(format(new Date(), "yyyy-MM-dd"))
  const [sales, setSales] = useState<Sale[]>([])

  const loadSales = async (date: string) => {
    const res = await fetch(`/api/sales?date=${date}`)
    const data = await res.json()
    setSales(data)
  }

  useEffect(() => {
    loadSales(today)
  }, [today])

  // 🔁 Auto refresh when date changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = format(new Date(), "yyyy-MM-dd")
      if (newDate !== today) {
        setToday(newDate)
        setSales([])
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [today])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-8">
          <DateHeader date={today} />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <DailyTotalCard sales={sales} />
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold mb-2">📊 Daily Summary</h3>
              <p className="text-sm opacity-90">Transactions: {sales.length}</p>
              <p className="text-sm opacity-90">Last updated: {format(new Date(), "HH:mm")}</p>
            </div>
          </div>

          <SalesInputRow onAdded={() => loadSales(today)} />

          <div className="mt-5">
            <ExportSection />
          </div>

          <div className="mt-5">
            <SalesTable sales={sales} />
          </div>


        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          <p>💰 Sales Tracking System • Auto-updates every minute</p>
        </div>
      </div>
    </main>
  )
}