interface Props {
  date: string
}

export default function DateHeader({ date }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Sales Dashboard</h1>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white">📅</span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700">{date}</h2>
        </div>
      </div>
      <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg">
        Live
      </div>
    </div>
  )
}