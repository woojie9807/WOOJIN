import { Truck, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const deliveries = [
  { id: 'DL-2026-0618', destination: '강남점', carrier: 'CJ대한통운', trackingNo: '1234567890', departure: '2026-06-18', eta: '2026-06-19', status: '배송중' },
  { id: 'DL-2026-0617', destination: '홍대점', carrier: '한진택배', trackingNo: '0987654321', departure: '2026-06-17', eta: '2026-06-18', status: '배송완료' },
  { id: 'DL-2026-0616', destination: '부산본점', carrier: 'CJ대한통운', trackingNo: '1122334455', departure: '2026-06-16', eta: '2026-06-17', status: '배송완료' },
  { id: 'DL-2026-0615', destination: '대전점', carrier: '롯데택배', trackingNo: '5544332211', departure: '2026-06-19', eta: '2026-06-20', status: '출고대기' },
]

const statusStyle: Record<string, string> = {
  '출고대기': 'bg-gray-100 text-gray-600',
  '배송중': 'bg-blue-100 text-blue-700',
  '배송완료': 'bg-green-100 text-green-700',
  '배송지연': 'bg-red-100 text-red-700',
}

export default function DeliveryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">배송 관리</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">출고 및 배송 현황 추적</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus className="size-4" />
          배송 등록
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '이번 달 출고', value: '28건' },
          { label: '출고대기', value: '5건' },
          { label: '배송중', value: '11건' },
          { label: '배송완료', value: '12건' },
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
            <Truck className="size-4 text-muted-foreground" />
            배송 목록
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">배송번호</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">도착지</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">택배사</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">운송장번호</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">출고일</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">도착예정</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">상태</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{d.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{d.destination}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.carrier}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{d.trackingNo}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.departure}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.eta}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${statusStyle[d.status]}`}>
                      {d.status}
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
