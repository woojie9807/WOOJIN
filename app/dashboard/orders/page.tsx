import { Package, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const orders = [
  { id: 'PO-2026-0618', store: '강남점', items: '상품 A 외 3종', qty: 120, amount: '1,240,000원', date: '2026-06-18', status: '발주완료' },
  { id: 'PO-2026-0617', store: '홍대점', items: '상품 B 외 1종', qty: 50, amount: '520,000원', date: '2026-06-17', status: '입고완료' },
  { id: 'PO-2026-0616', store: '부산본점', items: '상품 C', qty: 200, amount: '2,100,000원', date: '2026-06-16', status: '처리중' },
  { id: 'PO-2026-0615', store: '대전점', items: '상품 A 외 5종', qty: 80, amount: '890,000원', date: '2026-06-15', status: '입고완료' },
]

const statusStyle: Record<string, string> = {
  '발주완료': 'bg-blue-100 text-blue-700',
  '처리중': 'bg-yellow-100 text-yellow-700',
  '입고완료': 'bg-green-100 text-green-700',
  '취소': 'bg-red-100 text-red-700',
}

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">발주 관리</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">판매장별 발주 현황 및 처리</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus className="size-4" />
          발주 등록
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '이번 달 발주', value: '32건' },
          { label: '처리중', value: '8건' },
          { label: '발주완료', value: '15건' },
          { label: '입고완료', value: '9건' },
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
            <Package className="size-4 text-muted-foreground" />
            발주 목록
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">발주번호</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">판매장</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">발주품목</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">수량</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">금액</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">발주일</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">상태</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{order.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{order.store}</td>
                  <td className="px-4 py-3 text-muted-foreground">{order.items}</td>
                  <td className="px-4 py-3 text-muted-foreground">{order.qty}</td>
                  <td className="px-4 py-3 text-foreground">{order.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${statusStyle[order.status]}`}>
                      {order.status}
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
