"use client"

import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

// 목업용 공유 비밀번호. 실제 배포 시 백엔드 인증으로 교체하세요.
const SHARED_PASSWORD = "0211"

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value.trim() === SHARED_PASSWORD) {
      onUnlock()
    } else {
      setError(true)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-8 flex size-12 items-center justify-center rounded-full border border-border text-muted-foreground">
          <Lock className="size-5" aria-hidden="true" />
        </div>

        <h1 className="font-sans text-6xl leading-none tracking-tight text-foreground">
          Record
        </h1>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
          둘만 아는 비밀번호를 입력하면
          <br />
          우리의 기록으로 들어갈 수 있어요.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <Input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError(false)
            }}
            placeholder="공유 비밀번호"
            aria-label="공유 비밀번호"
            className="h-12 bg-card text-center text-base"
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive">
              비밀번호가 맞지 않아요. 다시 시도해 주세요.
            </p>
          )}
          <Button type="submit" className="h-12 text-base">
            들어가기
          </Button>
        </form>

      </div>
    </main>
  )
}
