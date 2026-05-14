"use client"

// useState використовується для збереження стану
import { useState } from "react"

// useRouter потрібен для оновлення сторінки
import { useRouter } from "next/navigation"

// Бібліотека для toast-повідомлень
import toast from "react-hot-toast"

export default function CategoriesClient({
  categories,
}: any) {

  // Router для оновлення даних
  const router = useRouter()

  // Назва категорії
  const [name, setName] = useState("")

  // Фото категорії
  const [image, setImage] =
    useState<File | null>(null)

  // Loading під час upload
  const [loading, setLoading] =
    useState(false)

  // 🔥 СТВОРЕННЯ КАТЕГОРІЇ
  const handleCreate = async () => {

    // Перевірка назви
    if (!name.trim()) {
      toast.error("Введи назву 😅")
      return
    }

    try {

      setLoading(true)

      let imageUrl = ""

      // Якщо фото вибране
      if (image) {

        // FormData потрібен для upload файлів
        const formData = new FormData()

        // Додаємо файл
        formData.append("file", image)

        // Запит на upload API
        const uploadRes = await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData,
          }
        )

        // Отримання відповіді
        const uploadData =
          await uploadRes.json()

        // URL завантаженого фото
        imageUrl = uploadData.url
      }

      // 🗂 СТВОРЕННЯ КАТЕГОРІЇ
      const res = await fetch(
        "/api/admin/category",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            // Назва категорії
            name,

            // Фото категорії
            image: imageUrl,
          }),
        }
      )

      // Якщо помилка
      if (!res.ok) {
        throw new Error()
      }

      // Success toast
      toast.success(
        "Категорію створено ✅"
      )

      // Очищення полів
      setName("")
      setImage(null)

      // Оновлення сторінки
      router.refresh()

    } catch {

      // Error toast
      toast.error("Помилка ❌")

    } finally {

      // Вимкнення loading
      setLoading(false)
    }
  }

  // 🔥 ВИДАЛЕННЯ КАТЕГОРІЇ
  const handleDelete = async (
    id: string
  ) => {

    // Підтвердження видалення
    const confirmDelete = confirm(
      "Видалити категорію?"
    )

    if (!confirmDelete) return

    try {

      // DELETE request
      const res = await fetch(
        `/api/admin/category/${id}`,
        {
          method: "DELETE",
        }
      )

      // Якщо помилка
      if (!res.ok) {
        throw new Error()
      }

      // Success toast
      toast.success("Видалено 🗑")

      // Оновлення сторінки
      router.refresh()

    } catch {

      // Error toast
      toast.error("Помилка ❌")
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">

      {/* 🔥 HEADER */}
      <div className="mb-10">

        <h1
          className="
            text-4xl md:text-5xl
            font-black
            text-[#1f2d4d]
          "
        >
          🗂 Категорії
        </h1>

        {/* Лінія */}
        <div
          className="
            w-24 h-1.5
            bg-gradient-to-r
            from-[#3F5F56]
            to-[#D9A5A0]
            mt-3 rounded-full
          "
        />

      </div>

      {/* 🔥 CREATE CATEGORY */}
      <div
        className="
          bg-white
          rounded-3xl
          shadow-md
          p-5
          mb-8
        "
      >

        <div
          className="
            flex flex-col
            gap-4
          "
        >

          {/* 📝 НАЗВА */}
          <input
            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            placeholder="Нова категорія"

            className="
              border border-gray-200
              p-4
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-[#3F5F56]
            "
          />

          {/* 📤 UPLOAD ФОТО */}
          <input
            type="file"

            accept="image/*"

            onChange={(e) => {

              // Якщо файл вибраний
              if (
                e.target.files?.[0]
              ) {

                // Збереження файлу
                setImage(
                  e.target.files[0]
                )
              }
            }}

            className="
              border border-gray-200
              p-4
              rounded-2xl
            "
          />

          {/* ➕ BUTTON */}
          <button
            onClick={handleCreate}

            disabled={loading}

            className="
              bg-gradient-to-r
              from-green-500
              to-emerald-500
              text-white
              px-8 py-4
              rounded-2xl
              font-semibold
              hover:scale-105
              transition
            "
          >
            {loading
              ? "Завантаження..."
              : "+ Додати"}
          </button>

        </div>

      </div>

      {/* 🔥 LIST */}
      <div className="grid gap-5">

        {categories.map((cat: any) => (

          <div
            key={cat.id}

            className="
              bg-white
              rounded-3xl
              shadow-md
              hover:shadow-xl
              transition
              p-6
            "
          >

            <div
              className="
                flex flex-col md:flex-row
                md:items-center
                md:justify-between
                gap-5
              "
            >

              {/* 📦 INFO */}
              <div>

                {/* 📝 NAME */}
                <h2
                  className="
                    text-2xl
                    font-bold
                    text-gray-800
                    mb-2
                  "
                >
                  {cat.name}
                </h2>

                {/* 📦 PRODUCTS COUNT */}
                <p
                  className="
                    text-gray-500
                    text-lg
                  "
                >
                  Товарів:

                  {" "}

                  <span className="font-semibold">
                    {cat.products.length}
                  </span>
                </p>

              </div>

              {/* ❌ DELETE */}
              <button
                onClick={() =>
                  handleDelete(cat.id)
                }

                className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-6 py-3
                  rounded-2xl
                  font-medium
                  transition
                  w-full md:w-auto
                "
              >
                Видалити
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}