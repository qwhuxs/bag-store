"use client"

// useRouter використовується для оновлення сторінки
import { useRouter } from "next/navigation"

export default function ConfirmButton({ id }: { id: string }) {

  // Router для оновлення даних після зміни статусу
  const router = useRouter()

  // Функція підтвердження замовлення
  const confirmOrder = async () => {

    // PUT-запит до API для зміни статусу замовлення
    await fetch("/api/admin/order", {
      method: "PUT",

      // Передача id замовлення
      body: JSON.stringify({ id }),
    })

    // Оновлення сторінки без перезавантаження
    router.refresh()
  }

  return (
    <button
      onClick={confirmOrder}

      className="
        mt-2
        bg-green-500
        text-white
        px-3 py-1
        rounded
      "
    >
      Підтвердити
    </button>
  )
}