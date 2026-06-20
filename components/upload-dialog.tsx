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
import { ImagePlus, X } from "lucide-react"
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
  const [previews, setPreviews] = useState<string[]>([])
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [mood, setMood] = useState(MOODS[0])
  const [caption, setCaption] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function reset() {
    setPreviews([])
    setDate(new Date().toISOString().slice(0, 10))
    setMood(MOODS[0])
    setCaption("")
    if (fileRef.current) fileRef.current.value = ""
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const remaining = 5 - previews.length
    const toAdd = files.slice(0, remaining).map((f) => URL.createObjectURL(f))
    setPreviews((prev) => [...prev, ...toAdd])
    if (fileRef.current) fileRef.current.value = ""
  }

  function removePreview(index: number) {
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (previews.length === 0) return
    onAdd({
      id: crypto.randomUUID(),
      images: previews,
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
          <DialogTitle className="font-sans text-2xl">
            추억 남기기
          </DialogTitle>
          <DialogDescription>
            사진과 그날의 기분, 짧은 글귀를 함께 남겨보세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* image picker */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              사진 <span className="text-foreground">{previews.length}</span>/5
            </span>
            <div className="grid grid-cols-5 gap-2">
              {previews.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-md bg-muted"
                >
                  <Image
                    src={src}
                    alt={`사진 ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePreview(i)}
                    className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm"
                    aria-label="삭제"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
              {previews.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="aspect-square flex items-center justify-center rounded-md border border-dashed border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted"
                  aria-label="사진 추가"
                >
                  <ImagePlus className="size-5" />
                </button>
              )}
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
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
            <Button type="submit" disabled={previews.length === 0} className="w-full">
              기록 남기기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
