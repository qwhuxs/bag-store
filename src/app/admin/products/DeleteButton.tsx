"use client"

import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmDelete = confirm("Ти впевнена, що хочеш видалити товар? 🗑")

    if (!confirmDelete) return

    try {
      const res = await fetch(`/api/admin/product/${id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("SERVER ERROR:", data)
        throw new Error(data.error)
      }

      toast.success("Товар видалено 🗑")

      router.refresh()
    } catch {
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