"use client"

// useRouter використовується для оновлення сторінки
import { useRouter } from "next/navigation"

// Бібліотека для показу повідомлень
import toast from "react-hot-toast"

export default function DeleteButton({ id }: { id: string }) {

  // Router для оновлення даних після видалення
  const router = useRouter()

  // Функція видалення товару
  const handleDelete = async () => {

    // Підтвердження видалення
    const confirmDelete = confirm(
      "Ти впевнена, що хочеш видалити товар? 🗑"
    )

    // Якщо користувач скасував — вихід
    if (!confirmDelete) return

    try {

      // DELETE-запит до API
      const res = await fetch(
        `/api/admin/product/${id}`,
        {
          method: "DELETE",
        }
      )

      // Отримання відповіді сервера
      const data = await res.json()

      // Якщо сервер повернув помилку
      if (!res.ok) {
        console.error("SERVER ERROR:", data)
        throw new Error(data.error)
      }

      // Повідомлення про успішне видалення
      toast.success("Товар видалено 🗑")

      // Оновлення сторінки
      router.refresh()

    } catch {

      // Повідомлення про помилку
      toast.error("Помилка при видаленні ❌")
    }
  }

  return (
    <button
      onClick={handleDelete}

      className="
        px-3 py-1
        bg-red-500 text-white
        rounded-lg
        hover:bg-red-600
        transition
      "
    >
      Видалити
    </button>
  )
}