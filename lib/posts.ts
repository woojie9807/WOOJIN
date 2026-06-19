export type Memory = {
  id: string
  image: string
  date: string // ISO date string
  mood: string // emoji
  caption: string
}

export const MOODS = ["💛", "🥰", "😊", "🌙", "🌊", "🌸", "☕", "✨", "🍿", "🏔️"]

export const SAMPLE_MEMORIES: Memory[] = [
  {
    id: "1",
    image: "/memories/seaside.png",
    date: "2025-06-14",
    mood: "🌊",
    caption: "노을 지는 해변을 끝없이 걸었던 날. 손 잡고 있어서 하나도 안 추웠어.",
  },
  {
    id: "2",
    image: "/memories/coffee.png",
    date: "2025-05-28",
    mood: "☕",
    caption: "단골 카페 창가 자리. 오늘도 네 라떼 반은 내가 마셨지.",
  },
  {
    id: "3",
    image: "/memories/picnic.png",
    date: "2025-05-11",
    mood: "🌸",
    caption: "한강 돗자리 피크닉. 책은 한 장도 못 읽고 낮잠만 잤다.",
  },
  {
    id: "4",
    image: "/memories/citynight.png",
    date: "2025-04-22",
    mood: "🌙",
    caption: "비 오는 밤거리, 우산 하나 같이 쓰고 천천히.",
  },
  {
    id: "5",
    image: "/memories/mountain.png",
    date: "2025-04-05",
    mood: "🏔️",
    caption: "정상에서 본 안개 낀 능선. 힘들었지만 같이라서 다 좋았어.",
  },
  {
    id: "6",
    image: "/memories/cooking.png",
    date: "2025-03-19",
    mood: "🥰",
    caption: "둘이 처음 만든 파스타. 소금은 좀 많았지만 맛있었어.",
  },
  {
    id: "7",
    image: "/memories/flowers.png",
    date: "2025-03-02",
    mood: "🌸",
    caption: "네가 사다 준 들꽃. 창가에 두니까 방이 환해졌어.",
  },
  {
    id: "8",
    image: "/memories/movie.png",
    date: "2025-02-14",
    mood: "🍿",
    caption: "이불 속 영화 마라톤. 결국 둘 다 중간에 잠들었지만.",
  },
]

export function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
