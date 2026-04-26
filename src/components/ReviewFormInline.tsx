"use client"

import { useState } from "react"

export default function ReviewFormInline({
  productId,
}: {
  productId: string
}) {
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!comment.trim()) return

    setLoading(true)

    await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        rating,
        productId,
      }),
    })

    setLoading(false)
    location.reload()
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="
          mt-2 inline-block
          text-sm font-medium
          px-4 py-1.5
          rounded-lg
          bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
          text-white
          shadow-sm
          hover:shadow-md
          hover:scale-105
          transition
        "
      >
        ✍️ Залишити відгук
      </button>
    )
  }

  return (
    <div className="mt-3 bg-gray-50 p-4 rounded-xl shadow-sm animate-fade-in">
      
      <textarea
        className="
          w-full border p-3 rounded-lg mb-3
          focus:outline-none focus:ring-2 focus:ring-[#3F5F56]
        "
        placeholder="Напишіть свій відгук..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm">Оцінка:</span>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded-lg"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} ⭐
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        {/* 🚀 ВІДПРАВИТИ */}
        <button
          onClick={submit}
          disabled={loading}
          className="
            bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
            text-white px-4 py-2 rounded-lg
            hover:scale-105 transition
          "
        >
          {loading ? "Відправка..." : "Відправити"}
        </button>

        {/* ❌ СКАСУВАТИ */}
        <button
          onClick={() => setOpen(false)}
          className="
            px-4 py-2 rounded-lg border
            hover:bg-gray-100 transition
          "
        >
          Скасувати
        </button>
      </div>
    </div>
  )
}