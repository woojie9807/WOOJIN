import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { recentTrades, formatKRW } from "@/lib/portfolio-data"

export function RecentTrades() {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <div>
        <h2 className="font-semibold text-card-foreground">최근 거래 내역</h2>
        <p className="text-sm text-muted-foreground">최근 5건</p>
      </div>
      <ul className="flex flex-col gap-3">
        {recentTrades.map((t, i) => {
          const isBuy = t.type === "매수"
          return (
            <li key={i} className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={cn(
                  "shrink-0 border-0 font-medium",
                  isBuy ? "bg-gain/10 text-gain" : "bg-loss/10 text-loss",
                )}
              >
                {t.type}
              </Badge>
              <div className="flex flex-1 flex-col">
                <span className="font-medium text-card-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.date}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-sm font-medium tabular-nums text-card-foreground">
                  {t.quantity}주
                </span>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {formatKRW(t.price)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
