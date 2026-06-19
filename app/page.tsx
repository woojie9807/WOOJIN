import { SummaryCards } from "@/components/summary-cards"
import { AssetChart } from "@/components/asset-chart"
import { AllocationChart } from "@/components/allocation-chart"
import { HoldingsTable } from "@/components/holdings-table"
import { RecentTrades } from "@/components/recent-trades"
import { WatchlistChart } from "@/components/watchlist-chart"
import { ChartLine } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ChartLine className="size-5" />
            </div>
            <div>
              <h1 className="font-semibold tracking-tight text-card-foreground">우지니 주식 계좌</h1>
              <p className="text-xs text-muted-foreground">포트폴리오 대시보드</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">기준일</p>
            <p className="text-sm font-medium text-card-foreground">2026.06.15</p>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6">
        <SummaryCards />

        {/* 2행 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <HoldingsTable />
          </div>

          <div className="lg:col-span-2">
            <AssetChart />
          </div>
        </div>

        {/* 3행 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div>
            <WatchlistChart />
          </div>

          <div>
            <RecentTrades />
          </div>

          <div>
            <AllocationChart />
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          표시된 데이터는 샘플이며 실제 시세와 다를 수 있습니다.
        </p>
      </div>
    </main>
  )
}
