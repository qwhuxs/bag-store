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

  // Стан форми
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null as File | null,
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

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // Функція створення товару
  const handleCreate = async () => {

    try {

      // Створення FormData
      const formData = new FormData()

      formData.append(
        "name",
        form.name
      )

      formData.append(
        "price",
        form.price
      )

      formData.append(
        "description",
        form.description
      )

      formData.append(
        "categoryId",
        form.categoryId
      )

      formData.append(
        "stock",
        form.stock
      )

      // Додавання фото
      if (form.image) {

        formData.append(
          "image",
          form.image
        )
      }

      // POST-запит до API
      const res = await fetch(
        "/api/admin/product",
        {
          method: "POST",

          body: formData,
        }
      )

      // Отримання відповіді
      const data = await res.json()

      // Якщо помилка
      if (!res.ok) {

        console.error(data)

        throw new Error(data.error)
      }

      // Повідомлення про успіх
      toast.success(
        "Товар створено ✅"
      )

      // Перехід до товарів
      router.push(
        "/admin/products"
      )

      // Оновлення сторінки
      router.refresh()

    } catch {

      // Повідомлення про помилку
      toast.error(
        "Помилка при створенні ❌"
      )
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

        {/* Заголовок */}
        <div className="mb-8 text-center">

          <h1
            className="
              text-4xl
              font-bold
              flex items-center
              justify-center gap-2
            "
          >
            <span className="text-5xl">
              ➕
            </span>

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

        {/* Форма */}
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

          {/* Назва */}
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

          {/* Ціна */}
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

          {/* 📤 UPLOAD ФОТО */}
<label
  className="
    flex items-center justify-center
    gap-3
    cursor-pointer
    border-2 border-dashed
    border-gray-300
    hover:border-[#3F5F56]
    bg-gray-50
    hover:bg-gray-100
    transition
    rounded-2xl
    p-5
    text-gray-600
    font-medium
  "
>
  📷 {form.image
    ? form.image.name
    : "Вибрати фото"}

  <input
    type="file"
    accept="image/*"
    hidden

    onChange={(e) => {

      const file =
        e.target.files?.[0]

      if (!file) return

      setForm({
        ...form,
        image: file,
      })
    }}
  />
</label>

          {/* Опис */}
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

          {/* Кількість */}
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

          {/* Категорії */}
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

            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </option>
            ))}

          </select>

          {/* Кнопка */}
          <button
            onClick={handleCreate}

            className="
              w-full mt-4
              bg-gradient-to-r
              from-[#3F5F56]
              to-[#D9A5A0]
              text-white py-3 rounded-lg
              font-semibold
              hover:scale-105
              hover:shadow-lg
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