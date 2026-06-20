'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Building2,
  Bell,
  Store,
  Package,
  Truck,
  RotateCcw,
  Headphones,
  Users,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/app/actions/auth'

const navItems = [
  { href: '/woojinerp/notices', label: '공지사항', icon: Bell },
  { href: '/woojinerp/stores', label: '판매장 관리', icon: Store },
  { href: '/woojinerp/orders', label: '발주 관리', icon: Package },
  { href: '/woojinerp/delivery', label: '배송 관리', icon: Truck },
  { href: '/woojinerp/returns', label: '반품 관리', icon: RotateCcw },
  { href: '/woojinerp/cs', label: 'CS 관리', icon: Headphones },
  { href: '/woojinerp/customers', label: '고객 관리', icon: Users },
]

export function ErpSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Building2 className="size-4" />
        </div>
        <span className="font-semibold text-sm text-card-foreground">ERP 시스템</span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-2">
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-4 shrink-0" />
            로그아웃
          </button>
        </form>
      </div>
    </aside>
  )
}
