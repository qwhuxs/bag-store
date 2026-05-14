"use client"

// useRouter для оновлення сторінки
import { useRouter } from "next/navigation"

// useState для збереження стану
import { useState } from "react"

// Тип товару в кошику
type CartItemType = {
  id: string
  quantity: number

  product: {
    id: string
    name: string
    image: string
    price: number
    stock: number
  }
}

export default function CartItem({
  item,
}: {
  item: CartItemType
}) {

  // Router Next.js
  const router = useRouter()

  // Поточна кількість товару
  const [qty, setQty] =
    useState(item.quantity)

  // Функція оновлення кількості
  async function updateQuantity(
    newQty: number
  ) {

    // Мінімальна кількість = 1
    if (newQty < 1) return

    // Оновлення локального state
    setQty(newQty)

    // POST-запит до API
    await fetch("/api/cart/update", {
      method: "POST",

      body: JSON.stringify({

        // ID елемента кошика
        itemId: item.id,

        // Нова кількість
        quantity: newQty,
      }),
    })

    // Оновлення сторінки
    router.refresh()
  }

  // Функція видалення товару
  async function removeItem() {

    // POST-запит до API
    await fetch("/api/cart/remove", {
      method: "POST",

      body: JSON.stringify({

        // ID елемента кошика
        itemId: item.id,
      }),
    })

    // Оновлення сторінки
    router.refresh()
  }

  return (

    // Карточка товару
    <div
      className="
        flex items-center gap-6
        bg-white
        p-4
        rounded-xl
        shadow
        hover:shadow-lg
        transition
      "
    >

      {/* Фото товару */}
      <img
        src={item.product.image}
        alt="Product"

        className="
          w-24 h-24
          object-cover
          rounded-lg
        "
      />

      {/* Інформація про товар */}
      <div className="flex-1">

        {/* Назва товару */}
        <h2 className="font-semibold text-lg">
          {item.product.name}
        </h2>

        {/* Ціна */}
        <p className="text-gray-500">
          {item.product.price} грн
        </p>

        {/* Залишок на складі */}
        <p className="text-sm text-gray-400 mt-1">

          На складі:
          {" "}
          {item.product.stock} шт

        </p>

        {/* Блок керування кількістю */}
        <div className="flex items-center gap-3 mt-3">

          {/* Кнопка зменшення */}
          <button
            onClick={() =>
              updateQuantity(qty - 1)
            }

            // Блокування при qty <= 1
            disabled={qty <= 1}

            className="
              w-8 h-8
              flex items-center justify-center
              border rounded-lg
              hover:bg-gray-100
              hover:scale-110
              transition
              disabled:opacity-30
              disabled:cursor-not-allowed
            "
          >
            -
          </button>

          {/* Поточна кількість */}
          <span className="font-semibold text-lg">
            {qty}
          </span>

          {/* Кнопка збільшення */}
          <button
            onClick={() => {

              // Заборона перевищення stock
              if (
                qty >= item.product.stock
              ) return

              updateQuantity(qty + 1)
            }}

            // Блокування кнопки,
            // якщо досягнуто stock
            disabled={
              qty >= item.product.stock
            }

            className="
              w-8 h-8
              flex items-center justify-center
              border rounded-lg
              hover:bg-gray-100
              hover:scale-110
              transition
              disabled:opacity-30
              disabled:cursor-not-allowed
            "
          >
            +
          </button>

        </div>

        {/* Повідомлення,
            якщо товар закінчився */}
        {qty >= item.product.stock && (

          <p className="text-red-500 text-sm mt-2">

            На складі більше немає товару

          </p>
        )}

      </div>

      {/* Загальна сума */}
      <div className="font-bold text-lg">

        {item.product.price * qty} грн

      </div>

      {/* Кнопка видалення */}
      <button
        onClick={removeItem}

        className="
          text-red-500
          text-xl
          hover:scale-125
          hover:text-red-700
          transition
        "
      >
        ✕
      </button>

    </div>
  )
}