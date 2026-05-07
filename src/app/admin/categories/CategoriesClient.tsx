"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function CategoriesClient({
  categories,
}: any) {

  const router = useRouter()

  const [name, setName] = useState("")

  const handleCreate = async () => {
    if (!name)
      return toast.error("Введи назву 😅")

    try {
      const res = await fetch(
        "/api/admin/category",
        {
          method: "POST",
          body: JSON.stringify({ name }),
        }
      )

      if (!res.ok) throw new Error()

      toast.success(
        "Категорію створено ✅"
      )

      setName("")
      router.refresh()

    } catch {
      toast.error("Помилка ❌")
    }
  }

  const handleDelete = async (
    id: string
  ) => {

    if (
      !confirm("Видалити категорію?")
    ) return

    try {
      const res = await fetch(
        `/api/admin/category/${id}`,
        {
          method: "DELETE",
        }
      )

      if (!res.ok) throw new Error()

      toast.success("Видалено 🗑")

      router.refresh()

    } catch {
      toast.error("Помилка ❌")
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">

      {/* 🔝 HEADER */}

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

      {/* ➕ CREATE */}

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
            flex flex-col md:flex-row
            gap-4
          "
        >

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Нова категорія"
            className="
              flex-1
              border border-gray-200
              p-4
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-[#3F5F56]
            "
          />

          <button
            onClick={handleCreate}
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
            + Додати
          </button>

        </div>

      </div>

      {/* 📋 LIST */}

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

              {/* 📄 INFO */}

              <div>

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

              {/* 🗑 ACTION */}

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