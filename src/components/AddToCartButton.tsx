"use client"

// useState для збереження стану
import { useState } from "react"

// useRouter для навігації та оновлення сторінки
import { useRouter } from "next/navigation"

// Бібліотека для toast повідомлень
import toast from "react-hot-toast"

export default function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string

  // disabled робить кнопку неактивною
  disabled?: boolean
}) {

  // Router Next.js
  const router = useRouter()

  // Стан завантаження
  const [loading, setLoading] =
    useState(false)

  // Функція додавання товару в кошик
  const handleAdd = async () => {

    // Захист від повторного кліку
    if (loading) return

    try {

      // Увімкнення loading
      setLoading(true)

      // POST-запит до API
      const res = await fetch("/api/cart/add", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Передача productId
        body: JSON.stringify({ productId }),
      })

      // Отримання відповіді сервера
      const data = await res.json()

      // Якщо сервер повернув помилку
      if (!res.ok) {

        // Якщо користувач не авторизований
        if (data.error === "NOT_AUTHORIZED") {

          toast.error(
            "Увійдіть у профіль, щоб додати товар 🛍️"
          )

          // Перехід на login через 1.5 сек
          setTimeout(() => {
            router.push("/login")
          }, 1500)

          return
        }

        // Інша помилка
        toast.error("Помилка додавання")

        return
      }

      // Успішне додавання
      toast.success(
        "Товар додано в кошик 🛒"
      )

      // Оновлення сторінки
      router.refresh()

    } catch {

      // Помилка сервера
      toast.error("Щось пішло не так")

    } finally {

      // Вимкнення loading
      setLoading(false)
    }
  }

  return (

    // Кнопка додавання
    <button

      // Блокування кнопки
      disabled={disabled || loading}

      onClick={handleAdd}

      className={`
        px-6 py-3
        rounded-lg
        transition
        w-full mt-4

        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#3F5F56] text-white hover:scale-105"
        }
      `}
    >

      {/* Зміна тексту кнопки */}
      {disabled
        ? "Немає в наявності"
        : loading
        ? "Додаємо..."
        : "Додати в кошик"}

    </button>
  )
}