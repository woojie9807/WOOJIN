"use client"

import { Card } from "@/components/ui/card"
import { assetHistory } from "@/lib/portfolio-data"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function formatCompact(value: number) {
  return `${(value / 10000).toLocaleString("ko-KR")}만`
}

type TooltipProps = {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-popover-foreground">{label}</p>
      <p className="text-muted-foreground">
        {payload[0].value.toLocaleString("ko-KR")}원
      </p>
    </div>
  )
}

export function AssetChart() {
  const first = assetHistory[0].value
  const last = assetHistory[assetHistory.length - 1].value
  const growth = (((last - first) / first) * 100).toFixed(1)

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-card-foreground">자산 추이</h2>
          <p className="text-sm text-muted-foreground">최근 12개월 평가액</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">연간 성장률</p>
          <p className="text-lg font-semibold text-gain">+{growth}%</p>
        </div>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={assetHistory} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="assetFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={56}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickFormatter={formatCompact}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--chart-1)"
              strokeWidth={2.5}
              fill="url(#assetFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
