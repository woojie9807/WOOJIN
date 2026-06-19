"use client"

import Image from "next/image"
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
  return (
    <Dialog open={!!memory} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-3xl">
        {memory && (
          <div className="grid md:grid-cols-[1.3fr_1fr]">
            <div className="relative aspect-square w-full bg-muted md:aspect-auto">
              <Image
                src={memory.image || "/placeholder.svg"}
                alt={memory.caption}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
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
                <p className="text-pretty font-serif text-2xl leading-snug text-foreground">
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
