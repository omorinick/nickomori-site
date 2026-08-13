'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { PricePoint } from '@/data/projects/compliant-market'

const GREEN = '#00bb29'

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-border bg-surface-overlay px-3 py-2 text-sm shadow-xl">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">${payload[0].value}</p>
    </div>
  )
}

export default function DrugXMarketChart({
  data,
  min,
  max,
}: {
  data: PricePoint[]
  min: number
  max: number
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis
          dataKey="date"
          tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[min, max]}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `$${value}`}
          width={40}
        />
        <Tooltip content={<ChartTooltip />} />
        <Line
          type="linear"
          dataKey="price"
          stroke={GREEN}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: GREEN, stroke: 'var(--card)', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
