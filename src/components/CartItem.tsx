"use client"

import { useRouter } from "next/navigation"

export default function CartItem({ item }: any) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-6 border p-4 rounded-lg">

      {/* 🖼️ Фото */}
      <img
        src={item.product.image}
        className="w-24 h-24 object-cover rounded"
      />

      {/* 📦 Інфо */}
      <div className="flex-1">
        <h2 className="font-semibold">
          {item.product.name}
        </h2>

        <p className="text-gray-500">
          {item.product.price} грн
        </p>

        {/* 🔢 Кількість */}
        <div className="flex items-center gap-2 mt-2">

          {/* ➖ */}
          <button
            onClick={async () => {
              await fetch("/api/cart/update", {
                method: "POST",
                body: JSON.stringify({
                  itemId: item.id,
                  quantity: item.quantity - 1,
                }),
              })

              router.refresh()
            }}
            disabled={item.quantity <= 1}
            className="px-2 border"
          >
            -
          </button>

          <span>{item.quantity}</span>

          {/* ➕ */}
          <button
            onClick={async () => {
              await fetch("/api/cart/update", {
                method: "POST",
                body: JSON.stringify({
                  itemId: item.id,
                  quantity: item.quantity + 1,
                }),
              })

              router.refresh()
            }}
            className="px-2 border"
          >
            +
          </button>
        </div>
      </div>

      {/* 💰 Сума */}
      <div className="font-semibold">
        {item.product.price * item.quantity} грн
      </div>

      {/* ❌ Видалити */}
      <button
        onClick={async () => {
          await fetch("/api/cart/remove", {
            method: "POST",
            body: JSON.stringify({
              itemId: item.id,
            }),
          })

          router.refresh()
        }}
        className="text-red-500"
      >
        ✕
      </button>
    </div>
  )
}