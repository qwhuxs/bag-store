"use client"

// useState використовується для збереження стану поля вводу
import { useState } from "react"

// useRouter потрібен для оновлення сторінки без перезавантаження
import { useRouter } from "next/navigation"

// Бібліотека для показу повідомлень (toast)
import toast from "react-hot-toast"

export default function CategoriesClient({
  categories,
}: any) {

  // Router для оновлення даних після створення/видалення
  const router = useRouter()

  // Стан для збереження назви нової категорії
  const [name, setName] = useState("")

  // Функція створення категорії
  const handleCreate = async () => {

    // Перевірка, чи введена назва
    if (!name)
      return toast.error("Введи назву 😅")

    try {

      // POST-запит до API для створення категорії
      const res = await fetch(
        "/api/admin/category",
        {
          method: "POST",

          // Передача назви категорії
          body: JSON.stringify({ name }),
        }
      )

      // Якщо сталася помилка
      if (!res.ok) throw new Error()

      // Повідомлення про успішне створення
      toast.success(
        "Категорію створено ✅"
      )

      // Очищення input
      setName("")

      // Оновлення сторінки
      router.refresh()

    } catch {

      // Повідомлення про помилку
      toast.error("Помилка ❌")
    }
  }

  // Функція видалення категорії
  const handleDelete = async (
    id: string
  ) => {

    // Підтвердження видалення
    if (
      !confirm("Видалити категорію?")
    ) return

    try {

      // DELETE-запит до API
      const res = await fetch(
        `/api/admin/category/${id}`,
        {
          method: "DELETE",
        }
      )

      // Якщо помилка
      if (!res.ok) throw new Error()

      // Повідомлення про успішне видалення
      toast.success("Видалено 🗑")

      // Оновлення сторінки
      router.refresh()

    } catch {

      // Повідомлення про помилку
      toast.error("Помилка ❌")
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">

      {/* Заголовок сторінки */}
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

        {/* Декоративна лінія */}
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

      {/* Блок створення категорії */}
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

          {/* Input для введення назви */}
          <input
            value={name}

            // Оновлення стану при введенні тексту
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

          {/* Кнопка створення */}
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

      {/* Список категорій */}
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

              {/* Інформація про категорію */}
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

                {/* Кількість товарів у категорії */}
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

              {/* Кнопка видалення */}
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