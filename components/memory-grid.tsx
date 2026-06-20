"use client"

import Image from "next/image"
import { formatDate, type Memory } from "@/lib/posts"

export function MemoryGrid({
  memories,
  onSelect,
}: {
  memories: Memory[]
  onSelect: (m: Memory) => void
}) {
  return (
    <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6">
      <div className="mb-10 max-w-xl">
        <h2 className="text-balance font-sans text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
          지금 이 순간을 공유해요 👀
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          사진과 함께 짧은 글을 남기실 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {memories.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m)}
            className="group text-left"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
              <Image
                src={m.images[0] || "/placeholder.svg"}
                alt={m.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/85 text-base backdrop-blur-sm">
                <span aria-hidden="true">{m.mood}</span>
              </span>
              {m.images.length > 1 && (
                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-xs backdrop-blur-sm">
                  📷 {m.images.length}
                </span>
              )}
            </div>
            <div className="mt-3">
              <time className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {formatDate(m.date)}
              </time>
              <p className="mt-1.5 line-clamp-2 text-pretty text-sm leading-relaxed text-foreground">
                {m.caption}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
