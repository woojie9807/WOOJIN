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
        <h2 className="text-balance font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
          우리가 함께 지나온 날들
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          사진 한 장마다 그날의 기분과 짧은 글을 담았어요.
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
                src={m.image || "/placeholder.svg"}
                alt={m.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/85 text-base backdrop-blur-sm">
                <span aria-hidden="true">{m.mood}</span>
              </span>
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
