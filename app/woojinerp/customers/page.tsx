import { Users, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const customers = [
  { id: 'C001', name: '홍길동', phone: '010-1234-5678', email: 'hong@email.com', store: '강남점', grade: 'VIP', joinDate: '2024-03-15', lastVisit: '2026-06-17' },
  { id: 'C002', name: '이영희', phone: '010-2345-6789', email: 'lee@email.com', store: '홍대점', grade: '일반', joinDate: '2025-01-20', lastVisit: '2026-06-10' },
  { id: 'C003', name: '박철수', phone: '010-3456-7890', email: 'park@email.com', store: '부산본점', grade: '우수', joinDate: '2024-09-05', lastVisit: '2026-06-15' },
  { id: 'C004', name: '최민지', phone: '010-4567-8901', email: 'choi@email.com', store: '대전점', grade: '일반', joinDate: '2025-06-01', lastVisit: '2026-05-30' },
  { id: 'C005', name: '정수호', phone: '010-5678-9012', email: 'jung@email.com', store: '강남점', grade: 'VIP', joinDate: '2023-11-10', lastVisit: '2026-06-18' },
]

const gradeStyle: Record<string, string> = {
  'VIP': 'bg-yellow-100 text-yellow-700',
  '우수': 'bg-blue-100 text-blue-700',
  '일반': 'bg-gray-100 text-gray-600',
}

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">고객 관리</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">고객 정보 및 등급 관리</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus className="size-4" />
          고객 등록
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '전체 고객', value: '1,248명' },
          { label: 'VIP', value: '87명' },
          { label: '우수', value: '312명' },
          { label: '이번 달 신규', value: '43명' },
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
            <Users className="size-4 text-muted-foreground" />
            고객 목록
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">코드</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">이름</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">연락처</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">이메일</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">담당판매장</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">등급</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">가입일</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">최근방문</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer">
                  <td className="px-4 py-3 font-mono text-muted-foreground">{c.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.store}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${gradeStyle[c.grade]}`}>
                      {c.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.joinDate}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
