export type Holding = {
  ticker: string
  name: string
  sector: string
  quantity: number
  avgPrice: number
  currentPrice: number
}

// 샘플 보유 종목 (KRW)
export const holdings: Holding[] = [
  { ticker: "005930", name: "삼성전자", sector: "반도체", quantity: 120, avgPrice: 68500, currentPrice: 74200 },
  { ticker: "000660", name: "SK하이닉스", sector: "반도체", quantity: 35, avgPrice: 142000, currentPrice: 189500 },
  { ticker: "035420", name: "NAVER", sector: "인터넷", quantity: 18, avgPrice: 215000, currentPrice: 198000 },
  { ticker: "035720", name: "카카오", sector: "인터넷", quantity: 60, avgPrice: 52300, currentPrice: 44800 },
  { ticker: "207940", name: "삼성바이오로직스", sector: "바이오", quantity: 8, avgPrice: 760000, currentPrice: 985000 },
  { ticker: "005380", name: "현대차", sector: "자동차", quantity: 22, avgPrice: 198000, currentPrice: 246500 },
  { ticker: "051910", name: "LG화학", sector: "2차전지", quantity: 14, avgPrice: 425000, currentPrice: 372000 },
  { ticker: "068270", name: "셀트리온", sector: "바이오", quantity: 40, avgPrice: 168000, currentPrice: 181500 },
]

// 현금 잔고
export const cashBalance = 4_350_000

// 최근 12개월 자산 평가액 추이 (KRW)
export const assetHistory = [
  { month: "1월", value: 38200000 },
  { month: "2월", value: 39850000 },
  { month: "3월", value: 37600000 },
  { month: "4월", value: 41200000 },
  { month: "5월", value: 43750000 },
  { month: "6월", value: 42100000 },
  { month: "7월", value: 45300000 },
  { month: "8월", value: 47800000 },
  { month: "9월", value: 46200000 },
  { month: "10월", value: 49100000 },
  { month: "11월", value: 51400000 },
  { month: "12월", value: 53850000 },
]

export type Trade = {
  date: string
  type: "매수" | "매도"
  name: string
  quantity: number
  price: number
}

export const recentTrades: Trade[] = [
  { date: "2026-06-12", type: "매수", name: "삼성전자", quantity: 20, price: 73800 },
  { date: "2026-06-10", type: "매도", name: "카카오", quantity: 15, price: 45200 },
  { date: "2026-06-05", type: "매수", name: "현대차", quantity: 5, price: 244000 },
  { date: "2026-05-28", type: "매수", name: "SK하이닉스", quantity: 10, price: 185000 },
  { date: "2026-05-22", type: "매도", name: "LG화학", quantity: 6, price: 380000 },
]

// 파생 계산 유틸
export function holdingMetrics(h: Holding) {
  const marketValue = h.quantity * h.currentPrice
  const costBasis = h.quantity * h.avgPrice
  const pl = marketValue - costBasis
  const plRate = (pl / costBasis) * 100
  return { marketValue, costBasis, pl, plRate }
}

export function portfolioSummary() {
  let marketValue = 0
  let costBasis = 0
  for (const h of holdings) {
    const m = holdingMetrics(h)
    marketValue += m.marketValue
    costBasis += m.costBasis
  }
  const totalAssets = marketValue + cashBalance
  const totalPl = marketValue - costBasis
  const totalPlRate = (totalPl / costBasis) * 100

  // 전일 대비 (샘플: 마지막 두 달 차이를 일간 변동처럼 사용)
  const dayChange = 642_000
  const dayChangeRate = (dayChange / (totalAssets - dayChange)) * 100

  return {
    totalAssets,
    marketValue,
    costBasis,
    cashBalance,
    totalPl,
    totalPlRate,
    dayChange,
    dayChangeRate,
  }
}

export function formatKRW(value: number, withSign = false) {
  const sign = withSign && value > 0 ? "+" : ""
  return `${sign}${value.toLocaleString("ko-KR")}원`
}

export function formatPct(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}
