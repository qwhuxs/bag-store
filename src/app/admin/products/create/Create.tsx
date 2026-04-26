"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function Create({ categories }: any) {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    categoryId: "",
    stock: "",
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCreate = async () => {
    try {
      const res = await fetch("/api/admin/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock || 0),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("SERVER ERROR:", data)
        throw new Error(data.error)
      }

      toast.success("Товар створено ✅")

      router.push("/admin/products")
      router.refresh()
    } catch {
      toast.error("Помилка при створенні ❌")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3f2] to-[#e9e4e1] py-12 px-4">

      <div className="max-w-xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
            <span className="text-5xl">➕</span>
            Додати товар
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* 🧾 FORM CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-5">

          {/* Назва */}
          <input
            name="name"
            placeholder="Назва товару"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#3F5F56] outline-none transition"
          />

          {/* Ціна */}
          <input
            name="price"
            type="number"
            placeholder="Ціна (грн)"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#3F5F56] outline-none transition"
          />

          {/* Картинка */}
          <input
            name="image"
            placeholder="Посилання на картинку"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#3F5F56] outline-none transition"
          />

          {/* Опис */}
          <textarea
            name="description"
            placeholder="Опис товару"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#3F5F56] outline-none transition"
          />

          {/* КІЛЬКІСТЬ */}
          <input
            name="stock"
            type="number"
            placeholder="Кількість на складі"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#3F5F56] outline-none transition"
          />

          {/* КАТЕГОРІЯ */}
          <select
            name="categoryId"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#3F5F56] outline-none transition"
          >
            <option value="">Оберіть категорію</option>

            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* КНОПКА */}
          <button
            onClick={handleCreate}
            className="
              w-full mt-4
              bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
              text-white py-3 rounded-lg
              font-semibold
              hover:scale-105 hover:shadow-lg
              transition
            "
          >
            Створити товар
          </button>

        </div>

      </div>
    </div>
  )
}