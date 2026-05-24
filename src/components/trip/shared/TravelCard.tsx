import type { TravelSegment } from '@/data/trips/japan-2026'

export default function TravelCard({ segment }: { segment: TravelSegment }) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm mb-3 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">🚄 Getting There</span>
        <span className="text-xs text-gray-500">{segment.from} → {segment.to}</span>
      </div>
      <div className="px-4 py-2 space-y-1">
        {segment.rows.map((row, i) => (
          <div key={i} className="flex gap-2 text-xs py-1 border-b border-gray-50 last:border-0">
            <span className="text-gray-400 w-28 flex-shrink-0">{row.label}</span>
            <span className="text-gray-800">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
