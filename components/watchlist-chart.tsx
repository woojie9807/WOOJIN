"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const stocks = [
  {
    name: "삼성전자",
    price: 76000,
    change: 4.1,
    data: [
      { day: "월", value: 73000 },
      { day: "화", value: 73500 },
      { day: "수", value: 72800 },
      { day: "목", value: 74200 },
      { day: "금", value: 74800 },
      { day: "오늘", value: 76000 },
    ],
  },
]

export function WatchlistChart() {
  const stock = stocks[0]

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">
            관심 종목
          </h2>

          <p className="text-sm text-muted-foreground">
            {stock.name}
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">
            {stock.price.toLocaleString()}원
          </p>

          <p className="text-sm text-gain">
            +{stock.change}%
          </p>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stock.data}>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              hide
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--chart-1)"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}