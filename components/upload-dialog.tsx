"use client"

import { useRef, useState, type FormEvent } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MOODS, type Memory } from "@/lib/posts"
import { ImagePlus } from "lucide-react"
import { cn } from "@/lib/utils"

export function UploadDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (memory: Memory) => void
}) {
  const [preview, setPreview] = useState<string | null>(null)
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [mood, setMood] = useState(MOODS[0])
  const [caption, setCaption] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function reset() {
    setPreview(null)
    setDate(new Date().toISOString().slice(0, 10))
    setMood(MOODS[0])
    setCaption("")
    if (fileRef.current) fileRef.current.value = ""
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!preview) return
    onAdd({
      id: crypto.randomUUID(),
      image: preview,
      date,
      mood,
      caption: caption.trim() || "오늘의 기록",
    })
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset()
        onOpenChange(o)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            추억 남기기
          </DialogTitle>
          <DialogDescription>
            사진과 그날의 기분, 짧은 글귀를 함께 남겨보세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* image picker */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-md border border-dashed border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted"
          >
            {preview ? (
              <Image
                src={preview || "/placeholder.svg"}
                alt="미리보기"
                fill
                className="object-cover"
              />
            ) : (
              <span className="flex flex-col items-center gap-2 text-sm">
                <ImagePlus className="size-6" aria-hidden="true" />
                사진 선택하기
              </span>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />

          {/* date */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="date" className="text-xs font-medium text-muted-foreground">
              날짜
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-card"
            />
          </div>

          {/* mood */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              그날의 기분
            </span>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border text-lg transition-colors",
                    mood === m
                      ? "border-foreground bg-secondary"
                      : "border-border hover:bg-muted",
                  )}
                  aria-label={`기분 ${m}`}
                  aria-pressed={mood === m}
                >
                  <span aria-hidden="true">{m}</span>
                </button>
              ))}
            </div>
          </div>

          {/* caption */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="caption" className="text-xs font-medium text-muted-foreground">
              글귀
            </label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="이 순간을 한 줄로 남겨보세요."
              rows={3}
              className="resize-none bg-card"
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!preview} className="w-full">
              기록 남기기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
