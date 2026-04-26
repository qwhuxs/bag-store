"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function CategoriesClient({ categories }: any) {
  const router = useRouter()
  const [name, setName] = useState("")

  const handleCreate = async () => {
    if (!name) return toast.error("Введи назву 😅")

    try {
      const res = await fetch("/api/admin/category", {
        method: "POST",
        body: JSON.stringify({ name }),
      })

      if (!res.ok) throw new Error()

      toast.success("Категорію створено ✅")
      setName("")
      router.refresh()
    } catch {
      toast.error("Помилка ❌")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Видалити категорію?")) return

    try {
      const res = await fetch(`/api/admin/category/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error()

      toast.success("Видалено 🗑")
      router.refresh()
    } catch {
      toast.error("Помилка ❌")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        🗂 Категорії
      </h1>

      {/* ➕ CREATE */}
      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Нова категорія"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 rounded"
        >
          +
        </button>
      </div>

      {/* 📋 LIST */}
      <div className="space-y-3">

        {categories.map((cat: any) => (
          <div
            key={cat.id}
            className="flex justify-between items-center border p-4 rounded-lg"
          >
            <div>
              <p className="font-semibold">{cat.name}</p>
              <p className="text-sm text-gray-500">
                Товарів: {cat.products.length}
              </p>
            </div>

            <button
              onClick={() => handleDelete(cat.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Видалити
            </button>
          </div>
        ))}

      </div>

    </div>
  )
}