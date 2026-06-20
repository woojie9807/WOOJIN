import { Store, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stores = [
  { id: 'S001', name: '강남점', region: '서울', manager: '김민준', phone: '02-1234-5678', status: '운영중' },
  { id: 'S002', name: '홍대점', region: '서울', manager: '이수연', phone: '02-2345-6789', status: '운영중' },
  { id: 'S003', name: '부산본점', region: '부산', manager: '박지훈', phone: '051-345-6789', status: '운영중' },
  { id: 'S004', name: '인천점', region: '인천', manager: '최예린', phone: '032-456-7890', status: '임시휴업' },
  { id: 'S005', name: '대전점', region: '대전', manager: '정도현', phone: '042-567-8901', status: '운영중' },
]

const statusStyle: Record<string, string> = {
  '운영중': 'bg-green-100 text-green-700',
  '임시휴업': 'bg-yellow-100 text-yellow-700',
  '폐점': 'bg-red-100 text-red-700',
}

export default function StoresPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">판매장 관리</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">전국 판매장 현황 및 관리</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus className="size-4" />
          판매장 등록
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '전체 판매장', value: '5개' },
          { label: '운영중', value: '4개' },
          { label: '임시휴업', value: '1개' },
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
            <Store className="size-4 text-muted-foreground" />
            판매장 목록
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">코드</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">판매장명</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">지역</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">담당자</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">연락처</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">상태</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer">
                  <td className="px-4 py-3 font-mono text-muted-foreground">{store.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{store.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{store.region}</td>
                  <td className="px-4 py-3 text-muted-foreground">{store.manager}</td>
                  <td className="px-4 py-3 text-muted-foreground">{store.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${statusStyle[store.status]}`}>
                      {store.status}
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
