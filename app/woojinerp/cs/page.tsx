import { Headphones, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const tickets = [
  { id: 'CS-2026-0618', customer: '홍길동', store: '강남점', category: '상품문의', title: '상품 A 재입고 문의', assignee: '김상담', date: '2026-06-18', status: '접수' },
  { id: 'CS-2026-0617', customer: '이영희', store: '홍대점', category: '배송문의', title: '배송 지연 관련 문의', assignee: '박상담', date: '2026-06-17', status: '처리중' },
  { id: 'CS-2026-0616', customer: '박철수', store: '부산본점', category: '교환/환불', title: '상품 불량으로 인한 교환 요청', assignee: '김상담', date: '2026-06-16', status: '완료' },
  { id: 'CS-2026-0615', customer: '최민지', store: '대전점', category: '불만접수', title: '직원 응대 불만 접수', assignee: '이매니저', date: '2026-06-15', status: '완료' },
  { id: 'CS-2026-0614', customer: '정수호', store: '인천점', category: '기타', title: '영업시간 문의', assignee: '-', date: '2026-06-14', status: '접수' },
]

const statusStyle: Record<string, string> = {
  '접수': 'bg-blue-100 text-blue-700',
  '처리중': 'bg-yellow-100 text-yellow-700',
  '완료': 'bg-green-100 text-green-700',
  '보류': 'bg-gray-100 text-gray-600',
}

const categoryStyle: Record<string, string> = {
  '상품문의': 'bg-purple-100 text-purple-700',
  '배송문의': 'bg-blue-100 text-blue-700',
  '교환/환불': 'bg-orange-100 text-orange-700',
  '불만접수': 'bg-red-100 text-red-700',
  '기타': 'bg-gray-100 text-gray-600',
}

export default function CsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">CS 관리</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">고객 문의 및 불만 접수 처리</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus className="size-4" />
          문의 등록
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '이번 달 접수', value: '47건' },
          { label: '미처리', value: '12건' },
          { label: '처리중', value: '18건' },
          { label: '처리완료', value: '17건' },
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
            <Headphones className="size-4 text-muted-foreground" />
            CS 목록
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">티켓번호</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">고객명</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">판매장</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">분류</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">제목</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">담당자</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">접수일</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">상태</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{t.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{t.customer}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.store}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${categoryStyle[t.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground">{t.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.assignee}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${statusStyle[t.status]}`}>
                      {t.status}
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
