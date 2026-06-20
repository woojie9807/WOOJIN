"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function SiteHeader({
  count,
  onUpload,
}: {
  count: number
  onUpload: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-6">
        <div className="flex items-baseline gap-3">
          <span className="font-sans text-3xl leading-none tracking-tight text-foreground">
            Record
          </span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            {count}개의 기록
          </span>
        </div>

        <Button onClick={onUpload} size="sm" className="gap-1.5">
          <Plus className="size-4" aria-hidden="true" />
          추억 남기기
        </Button>
      </div>
    </header>
  )
}
