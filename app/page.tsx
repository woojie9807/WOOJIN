'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import { Building2 } from 'lucide-react'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <main className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Building2 className="size-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">ERP 시스템</h1>
          <p className="mt-1 text-sm text-muted-foreground">계정 정보를 입력하여 로그인하세요</p>
        </div>

        <div className="rounded-xl bg-card ring-1 ring-foreground/10 p-6 shadow-sm">
          <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                name="id"
                type="text"
                required
                autoComplete="username"
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none transition-shadow focus:border-ring focus:ring-3 focus:ring-ring/50"
                placeholder="아이디를 입력하세요"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none transition-shadow focus:border-ring focus:ring-3 focus:ring-ring/50"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {state?.error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 h-10 w-full rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
