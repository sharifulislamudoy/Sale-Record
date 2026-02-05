type Props = {
  total: number;
};

export default function TotalSummary({ total }: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm font-medium">TOTAL SALE</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            ৳ {total.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
        </div>
      </div>
    </div>
  );
}