"use client"

import { useState } from "react"

export default function ReviewForm({ productId }: { productId: string }) {
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
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

  return (
    <div className="mt-10 bg-white p-5 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3">
        Додати відгук
      </h3>

      <textarea
        className="w-full border p-3 rounded mb-3"
        placeholder="Напишіть свій відгук..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex items-center gap-3 mb-3">
        <span>Оцінка:</span>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n} ⭐</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
      >
        {loading ? "Відправка..." : "Відправити"}
      </button>
    </div>
  )
}