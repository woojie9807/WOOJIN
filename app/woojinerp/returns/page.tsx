import { RotateCcw, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const returns = [
  { id: 'RT-2026-0618', store: '강남점', items: '상품 A', qty: 3, reason: '불량', amount: '30,000원', date: '2026-06-18', status: '접수' },
  { id: 'RT-2026-0617', store: '홍대점', items: '상품 B 외 1종', qty: 5, reason: '단순변심', amount: '52,000원', date: '2026-06-17', status: '처리중' },
  { id: 'RT-2026-0615', store: '부산본점', items: '상품 C', qty: 10, reason: '파손', amount: '105,000원', date: '2026-06-15', status: '완료' },
  { id: 'RT-2026-0612', store: '대전점', items: '상품 A', qty: 2, reason: '오배송', amount: '20,000원', date: '2026-06-12', status: '완료' },
]

const statusStyle: Record<string, string> = {
  '접수': 'bg-blue-100 text-blue-700',
  '처리중': 'bg-yellow-100 text-yellow-700',
  '완료': 'bg-green-100 text-green-700',
  '반려': 'bg-red-100 text-red-700',
}

const reasonStyle: Record<string, string> = {
  '불량': 'bg-red-100 text-red-600',
  '파손': 'bg-red-100 text-red-600',
  '오배송': 'bg-orange-100 text-orange-600',
  '단순변심': 'bg-gray-100 text-gray-600',
}

export default function ReturnsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">반품 관리</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">반품 접수 및 처리 현황</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus className="size-4" />
          반품 접수
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '이번 달 반품', value: '14건' },
          { label: '접수', value: '3건' },
          { label: '처리중', value: '5건' },
          { label: '완료', value: '6건' },
        ].map((stat) => (
          <Card key={stat.label} size="sm">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="size-4 text-muted-foreground" />
            반품 목록
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">반품번호</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">판매장</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">품목</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">수량</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">사유</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">금액</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">접수일</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">상태</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{r.store}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.items}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.qty}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${reasonStyle[r.reason] ?? 'bg-gray-100 text-gray-600'}`}>
                      {r.reason}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground">{r.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${statusStyle[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
