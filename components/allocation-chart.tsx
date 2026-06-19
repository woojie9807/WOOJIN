"use client"

import { Card } from "@/components/ui/card"
import { holdings, holdingMetrics } from "@/lib/portfolio-data"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export function AllocationChart() {
  // 섹터별 비중 집계
  const sectorMap = new Map<string, number>()
  let total = 0
  for (const h of holdings) {
    const { marketValue } = holdingMetrics(h)
    sectorMap.set(h.sector, (sectorMap.get(h.sector) ?? 0) + marketValue)
    total += marketValue
  }

  const data = Array.from(sectorMap.entries())
    .map(([name, value]) => ({ name, value, pct: (value / total) * 100 }))
    .sort((a, b) => b.value - a.value)

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div>
        <h2 className="font-semibold text-card-foreground">자산 배분</h2>
        <p className="text-sm text-muted-foreground">섹터별 비중</p>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={88}
                paddingAngle={2}
                strokeWidth={0}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex w-full flex-col gap-2.5">
          {data.map((d, i) => (
            <li key={d.name} className="flex items-center gap-3 text-sm">
              <span
                className="size-3 shrink-0 rounded-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
                aria-hidden
              />
              <span className="flex-1 text-card-foreground">{d.name}</span>
              <span className="font-medium text-card-foreground tabular-nums">
                {d.pct.toFixed(1)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
