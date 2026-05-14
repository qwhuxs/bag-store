"use client"

// useState використовується для збереження стану форми
import { useState } from "react"

// useRouter потрібен для навігації між сторінками
import { useRouter } from "next/navigation"

// Бібліотека для показу повідомлень
import toast from "react-hot-toast"

// Типи props компонента
type Props = {
  product: {
    id: string
    name: string
    price: number
    stock: number
    categoryId: string
  }

  categories: {
    id: string
    name: string
  }[]
}

export default function EditProductClient({
  product,
  categories,
}: Props) {

  // Router для переходу та оновлення сторінки
  const router = useRouter()

  // Стан форми з початковими даними товару
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,

    // categoryId потрібен для зміни категорії товару
    categoryId: product.categoryId,
  })

  // Функція оновлення даних форми
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // Функція збереження змін
  const handleSave = async () => {
    try {

      // PUT-запит для оновлення товару
      const res = await fetch(
        `/api/admin/product/${product.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          // Передача оновлених даних
          body: JSON.stringify({
            ...form,

            // Перетворення значень у number
            price: Number(form.price),
            stock: Number(form.stock),
          }),
        }
      )

      // Отримання відповіді сервера
      const data = await res.json()

      // Перевірка на помилки
      if (!res.ok) {
        console.error("SERVER ERROR:", data)
        throw new Error(data.error)
      }

      // Повідомлення про успішне оновлення
      toast.success("Товар оновлено ✅")

      // Повернення до списку товарів
      router.push("/admin/products")

      // Оновлення сторінки
      router.refresh()

    } catch {

      // Повідомлення про помилку
      toast.error("Помилка при оновленні ❌")
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

          <h1 className="text-4xl font-bold">
            ✏️ Редагування товару
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

        {/* Форма редагування */}
        <div
          className="
            bg-white
            p-8
            rounded-2xl
            shadow-xl
            space-y-5
          "
        >

          {/* Назва товару */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Ціна */}
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Кількість товару */}
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Вибір категорії */}
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >

            {/* Виведення всіх категорій */}
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}

          </select>

          {/* Кнопка збереження */}
          <button
            onClick={handleSave}

            className="
              w-full
              bg-gradient-to-r
              from-[#3F5F56]
              to-[#D9A5A0]
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