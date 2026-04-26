"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string
  disabled?: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (loading) return

    try {
      setLoading(true)

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.error === "NOT_AUTHORIZED") {
          toast.error("Увійдіть у профіль, щоб додати товар 🛍️")

          setTimeout(() => {
            router.push("/login")
          }, 1500)

          return
        }

        toast.error("Помилка додавання")
        return
      }

      toast.success("Товар додано в кошик 🛒")

      router.refresh()

    } catch (e) {
      toast.error("Щось пішло не так")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      disabled={disabled || loading}
      onClick={handleAdd}
      className={`
        px-6 py-3 rounded-lg transition w-full mt-4
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#3F5F56] text-white hover:scale-105"
        }
      `}
    >
      {disabled
        ? "Немає в наявності"
        : loading
        ? "Додаємо..."
        : "Додати в кошик"}
    </button>
  )
}