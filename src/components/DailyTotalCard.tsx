import { Sale } from "@/types/sales"

interface Props {
  sales: Sale[]
}

export default function DailyTotalCard({ sales }: Props) {
  const total = sales.reduce((sum, s) => sum + s.amount, 0)
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium mb-1">Today's Total</p>
          <h3 className="text-4xl font-bold">{total.toLocaleString()} ৳</h3>
          <p className="text-sm opacity-90 mt-2">{sales.length} transactions</p>
        </div>
        <div className="bg-white/20 p-4 rounded-xl">
          <span className="text-3xl">💰</span>
        </div>
      </div>
    </div>
  )
}