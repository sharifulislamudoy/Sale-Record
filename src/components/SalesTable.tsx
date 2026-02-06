import { Sale } from "@/types/sales"

interface Props {
  sales: Sale[]
}

export default function SalesTable({ sales }: Props) {
  if (!sales.length) {
    return (
      <div className="mt-8 text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📊</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-600">No sales recorded today</h3>
        <p className="text-gray-500 mt-2">Add your first sale using the form above</p>
      </div>
    )
  }

  const total = sales.reduce((sum, s) => sum + s.amount, 0)

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">📋 Today's Sales</h3>
          <span className="bg-white/20 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {sales.length} items
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <span className="mr-2">🕒</span>
                  Time
                </div>
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <span className="mr-2">💰</span>
                  Amount
                </div>
              </th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                <div className="flex items-center">
                  <span className="mr-2">📝</span>
                  Note
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sales.map((s, i) => (
              <tr 
                key={i}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="font-medium text-gray-800">{s.time}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-bold text-lg text-blue-600">
                    {s.amount.toLocaleString()} ৳
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-lg text-sm">
                    {s.note || "-"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <td className="py-4 px-6 font-bold text-gray-800">Total</td>
              <td className="py-4 px-6">
                <span className="font-bold text-2xl text-green-600">
                  {total.toLocaleString()} ৳
                </span>
              </td>
              <td className="py-4 px-6"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}