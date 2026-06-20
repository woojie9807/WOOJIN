import { Bell, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const notices = [
  { id: 1, title: '2026년 7월 물류 센터 임시 운영 안내', author: '관리자', date: '2026-06-18', important: true },
  { id: 2, title: '발주 시스템 업데이트 안내 (v2.1)', author: '관리자', date: '2026-06-15', important: false },
  { id: 3, title: '반품 처리 기준 변경 안내', author: '물류팀', date: '2026-06-10', important: true },
  { id: 4, title: '6월 판매장 정기 점검 일정 공유', author: '영업팀', date: '2026-06-05', important: false },
]

export default function NoticesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">공지사항</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">전체 공지 및 업무 안내 사항</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus className="size-4" />
          공지 등록
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-4 text-muted-foreground" />
            공지 목록
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground w-12">번호</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">제목</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground w-24">작성자</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground w-28">등록일</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer">
                  <td className="px-4 py-3 text-muted-foreground">{notice.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {notice.important && (
                        <span className="rounded-md bg-destructive/10 px-1.5 py-0.5 text-xs font-medium text-destructive">
                          중요
                        </span>
                      )}
                      <span className="text-foreground">{notice.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{notice.author}</td>
                  <td className="px-4 py-3 text-muted-foreground">{notice.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
