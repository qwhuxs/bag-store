"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CartItem({ item }: any) {
  const router = useRouter()

  const [qty, setQty] = useState(item.quantity)

  async function updateQuantity(newQty: number) {
    if (newQty < 1) return

    setQty(newQty)

    await fetch("/api/cart/update", {
      method: "POST",
      body: JSON.stringify({
        itemId: item.id,
        quantity: newQty,
      }),
    })

    router.refresh()
  }

  async function removeItem() {
    await fetch("/api/cart/remove", {
      method: "POST",
      body: JSON.stringify({
        itemId: item.id,
      }),
    })

    router.refresh()
  }

  return (
    <div className="flex items-center gap-6 bg-white p-4 rounded-xl shadow hover:shadow-lg transition">

      {/* 🖼️ Фото */}
      <img
        src={item.product.image}
        className="w-24 h-24 object-cover rounded-lg"
      />

      {/* 📦 Інфо */}
      <div className="flex-1">
        <h2 className="font-semibold text-lg">
          {item.product.name}
        </h2>

        <p className="text-gray-500">
          {item.product.price} грн
        </p>

        {/* 🔢 КІЛЬКІСТЬ */}
        <div className="flex items-center gap-3 mt-3">

          {/* ➖ */}
          <button
            onClick={() => updateQuantity(qty - 1)}
            disabled={qty <= 1}
            className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100 hover:scale-110 transition disabled:opacity-30"
          >
            -
          </button>

          <span className="font-semibold text-lg">
            {qty}
          </span>

          {/* ➕ */}
          <button
            onClick={() => updateQuantity(qty + 1)}
            className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-100 hover:scale-110 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* 💰 СУМА */}
      <div className="font-bold text-lg">
        {item.product.price * qty} грн
      </div>

      {/* ❌ Видалити */}
      <button
        onClick={removeItem}
        className="text-red-500 text-xl hover:scale-125 hover:text-red-700 transition"
      >
        ✕
      </button>
    </div>
  )
}