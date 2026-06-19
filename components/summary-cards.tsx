import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { portfolioSummary, formatKRW, formatPct } from "@/lib/portfolio-data"
import { ArrowDownRight, ArrowUpRight, Wallet, TrendingUp, Coins } from "lucide-react"

function plColor(value: number) {
  return value > 0 ? "text-gain" : value < 0 ? "text-loss" : "text-muted-foreground"
}

export function SummaryCards() {
  const s = portfolioSummary()

  const cards = [
    {
      label: "총 자산",
      value: formatKRW(s.totalAssets),
      icon: Wallet,
      sub: (
        <span className={cn("inline-flex items-center gap-1 font-medium", plColor(s.dayChange))}>
          {s.dayChange > 0 ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
          {formatKRW(s.dayChange, true)} ({formatPct(s.dayChangeRate)})
        </span>
      ),
      subLabel: "전일 대비",
      highlight: true,
    },
    {
      label: "주식 평가액",
      value: formatKRW(s.marketValue),
      icon: TrendingUp,
      sub: <span className="text-muted-foreground">매입원가 {formatKRW(s.costBasis)}</span>,
      subLabel: "보유 8종목",
    },
    {
      label: "평가 손익",
      value: (
        <span className={plColor(s.totalPl)}>{formatKRW(s.totalPl, true)}</span>
      ),
      icon: TrendingUp,
      sub: (
        <span className={cn("font-medium", plColor(s.totalPlRate))}>
          수익률 {formatPct(s.totalPlRate)}
        </span>
      ),
      subLabel: "누적 기준",
    },
    {
      label: "예수금",
      value: formatKRW(s.cashBalance),
      icon: Coins,
      sub: <span className="text-muted-foreground">투자 가능 현금</span>,
      subLabel: "원화",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Card
          key={c.label}
          className={cn(
            "flex flex-col gap-3 p-5",
            c.highlight && "bg-primary text-primary-foreground",
          )}
        >
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-sm font-medium",
                c.highlight ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              {c.label}
            </span>
            <c.icon
              className={cn(
                "size-5",
                c.highlight ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            />
          </div>
          <div className="text-2xl font-semibold tracking-tight text-balance">{c.value}</div>
          <div className="flex flex-col gap-0.5 text-sm">
            <span>{c.sub}</span>
            <span
              className={cn(
                "text-xs",
                c.highlight ? "text-primary-foreground/70" : "text-muted-foreground",
              )}
            >
              {c.subLabel}
            </span>
          </div>
        </Card>
      ))}
    </div>
  )
}
