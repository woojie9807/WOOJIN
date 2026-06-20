"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { formatDate, type Memory } from "@/lib/posts"

export function MemoryDetail({
  memory,
  onClose,
}: {
  memory: Memory | null
  onClose: () => void
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => { setIdx(0) }, [memory?.id])

  const images = memory?.images ?? []
  const hasMultiple = images.length > 1

  return (
    <Dialog open={!!memory} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-4xl">
        {memory && (
          <div className="grid md:grid-cols-[1.5fr_1fr]">
            <div className="relative aspect-square w-full bg-muted md:aspect-auto md:min-h-[460px]">
              <Image
                src={images[idx] || "/placeholder.svg"}
                alt={memory.caption}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
              {hasMultiple && (
                <>
                  <button
                    onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
                    aria-label="이전 사진"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    onClick={() => setIdx((i) => (i + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
                    aria-label="다음 사진"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIdx(i)}
                        className={`size-2 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/40"}`}
                        aria-label={`사진 ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {memory.mood}
                </span>
                <DialogTitle asChild>
                  <time className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {formatDate(memory.date)}
                  </time>
                </DialogTitle>
              </div>
              <DialogDescription asChild>
                <p className="text-pretty font-sans text-2xl leading-snug text-foreground">
                  {memory.caption}
                </p>
              </DialogDescription>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
