"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function EditProductClient({ product, categories }: any) {
  const router = useRouter()

  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    categoryId: product.categoryId, // 🔥 ДОДАЛИ
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/admin/product/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("SERVER ERROR:", data)
        throw new Error(data.error)
      }

      toast.success("Товар оновлено ✅")

      router.push("/admin/products")
      router.refresh()
    } catch {
      toast.error("Помилка при оновленні ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3f2] to-[#e9e4e1] py-12 px-4">

      <div className="max-w-xl mx-auto">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">
            ✏️ Редагування товару
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-5">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* 🔥 НОВЕ — КАТЕГОРІЯ */}
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className="
              w-full
              bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
              text-white py-3 rounded-lg
              hover:scale-105 transition
            "
          >
            Зберегти
          </button>

        </div>

      </div>
    </div>
  )
}