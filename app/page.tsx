"use client"

import { useState } from "react"
import { LockScreen } from "@/components/lock-screen"
import { SiteHeader } from "@/components/site-header"
import { MemoryGrid } from "@/components/memory-grid"
import { MemoryDetail } from "@/components/memory-detail"
import { UploadDialog } from "@/components/upload-dialog"
import { SAMPLE_MEMORIES, type Memory } from "@/lib/posts"

export default function Page() {
  const [unlocked, setUnlocked] = useState(false)
  const [memories, setMemories] = useState<Memory[]>(SAMPLE_MEMORIES)
  const [selected, setSelected] = useState<Memory | null>(null)
  const [uploadOpen, setUploadOpen] = useState(false)

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />
  }

  function handleAdd(memory: Memory) {
    setMemories((prev) => [memory, ...prev])
  }

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader count={memories.length} onUpload={() => setUploadOpen(true)} />
      <MemoryGrid memories={memories} onSelect={setSelected} />
      <footer className="border-t border-border py-10 text-center">
        <p className="font-serif text-lg text-muted-foreground">
          우리 둘만의 작은 기록
        </p>
      </footer>

      <MemoryDetail
        memory={selected}
        onClose={() => setSelected(null)}
      />
      <UploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onAdd={handleAdd}
      />
    </main>
  )
}
