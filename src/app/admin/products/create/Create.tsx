"use client"

// useState використовується для збереження стану форми
import { useState } from "react"

// useRouter потрібен для навігації та оновлення сторінки
import { useRouter } from "next/navigation"

// Бібліотека для показу повідомлень
import toast from "react-hot-toast"

// Тип для категорій
type Props = {
  categories: {
    id: string
    name: string
  }[]
}

export default function Create({
  categories,
}: Props) {

  // Router для переходу між сторінками
  const router = useRouter()

  // Стан форми для збереження введених даних
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    categoryId: "",
    stock: "",
  })

  // Функція зміни даних у form
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    // Оновлюється лише поле,
    // яке зараз змінює користувач
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // Функція створення товару
  const handleCreate = async () => {
    try {

      // POST-запит до API
      const res = await fetch("/api/admin/product", {
        method: "POST",

        // Тип даних JSON
        headers: {
          "Content-Type": "application/json",
        },

        // Передача даних форми
        body: JSON.stringify({

          ...form,

          // Перетворення ціни в number
          price: Number(form.price),

          // Перетворення stock в number
          stock: Number(form.stock || 0),
        }),
      })

      // Отримання відповіді сервера
      const data = await res.json()

      // Якщо виникла помилка
      if (!res.ok) {
        console.error("SERVER ERROR:", data)
        throw new Error(data.error)
      }

      // Повідомлення про успішне створення
      toast.success("Товар створено ✅")

      // Перехід до списку товарів
      router.push("/admin/products")

      // Оновлення сторінки
      router.refresh()

    } catch {

      // Повідомлення про помилку
      toast.error("Помилка при створенні ❌")
    }
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#f5f3f2]
        to-[#e9e4e1]
        py-12 px-4
      "
    >

      <div className="max-w-xl mx-auto">

        {/* Заголовок сторінки */}
        <div className="mb-8 text-center">

          <h1
            className="
              text-4xl
              font-bold
              flex items-center
              justify-center gap-2
            "
          >
            <span className="text-5xl">➕</span>
            Додати товар
          </h1>

          {/* Декоративна лінія */}
          <div
            className="
              w-24 h-1
              bg-gradient-to-r
              from-[#3F5F56]
              to-[#D9A5A0]
              mx-auto mt-3 rounded-full
            "
          />

        </div>

        {/* Форма створення товару */}
        <div
          className="
            bg-white
            p-8
            rounded-2xl
            shadow-xl
            border border-gray-100
            space-y-5
          "
        >

          {/* Поле назви */}
          <input
            name="name"
            placeholder="Назва товару"
            onChange={handleChange}

            className="
              w-full border p-3 rounded-lg
              focus:ring-2
              focus:ring-[#3F5F56]
              outline-none transition
            "
          />

          {/* Поле ціни */}
          <input
            name="price"
            type="number"
            placeholder="Ціна (грн)"
            onChange={handleChange}

            className="
              w-full border p-3 rounded-lg
              focus:ring-2
              focus:ring-[#3F5F56]
              outline-none transition
            "
          />

          {/* Поле зображення */}
          <input
            name="image"
            placeholder="Посилання на картинку"
            onChange={handleChange}

            className="
              w-full border p-3 rounded-lg
              focus:ring-2
              focus:ring-[#3F5F56]
              outline-none transition
            "
          />

          {/* Поле опису */}
          <textarea
            name="description"
            placeholder="Опис товару"
            onChange={handleChange}

            className="
              w-full border p-3 rounded-lg
              focus:ring-2
              focus:ring-[#3F5F56]
              outline-none transition
            "
          />

          {/* Поле кількості товару */}
          <input
            name="stock"
            type="number"
            placeholder="Кількість на складі"
            onChange={handleChange}

            className="
              w-full border p-3 rounded-lg
              focus:ring-2
              focus:ring-[#3F5F56]
              outline-none transition
            "
          />

          {/* Вибір категорії */}
          <select
            name="categoryId"
            onChange={handleChange}

            className="
              w-full border p-3 rounded-lg
              focus:ring-2
              focus:ring-[#3F5F56]
              outline-none transition
            "
          >

            <option value="">
              Оберіть категорію
            </option>

            {/* Виведення категорій із бази даних */}
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}

          </select>

          {/* Кнопка створення */}
          <button
            onClick={handleCreate}

            className="
              w-full mt-4
              bg-gradient-to-r
              from-[#3F5F56]
              to-[#D9A5A0]
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