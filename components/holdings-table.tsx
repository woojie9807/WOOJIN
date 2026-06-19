import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { holdings, holdingMetrics, formatKRW, formatPct } from "@/lib/portfolio-data"

function plColor(value: number) {
  return value > 0 ? "text-gain" : value < 0 ? "text-loss" : "text-muted-foreground"
}

export function HoldingsTable() {
  const rows = holdings
    .map((h) => ({ ...h, ...holdingMetrics(h) }))
    .sort((a, b) => b.marketValue - a.marketValue)

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div>
        <h2 className="font-semibold text-card-foreground">보유 종목</h2>
        <p className="text-sm text-muted-foreground">총 {holdings.length}개 종목</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>종목</TableHead>
              <TableHead className="text-right">수량</TableHead>
              <TableHead className="text-right">평균단가</TableHead>
              <TableHead className="text-right">현재가</TableHead>
              <TableHead className="text-right">평가금액</TableHead>
              <TableHead className="text-right">손익</TableHead>
              <TableHead className="text-right">수익률</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.ticker}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-card-foreground">{r.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {r.ticker} · {r.sector}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums">{r.quantity.toLocaleString("ko-KR")}</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {r.avgPrice.toLocaleString("ko-KR")}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {r.currentPrice.toLocaleString("ko-KR")}
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {r.marketValue.toLocaleString("ko-KR")}
                </TableCell>
                <TableCell className={cn("text-right tabular-nums font-medium", plColor(r.pl))}>
                  {formatKRW(r.pl, true)}
                </TableCell>
                <TableCell className={cn("text-right tabular-nums font-medium", plColor(r.plRate))}>
                  {formatPct(r.plRate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
