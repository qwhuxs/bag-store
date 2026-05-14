"use client"

// useState використовується для збереження стану
import { useState } from "react"

// Бібліотека для показу повідомлень
import toast from "react-hot-toast"

export default function CheckoutPage() {

  // Стан завантаження під час оформлення
  const [loading, setLoading] = useState(false)

  // Тип доставки
  const [deliveryType, setDeliveryType] =
    useState("nova")

  // Дані форми оформлення
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    branch: "",
  })

  // Функція оновлення значень input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,

      // Оновлення конкретного поля
      [e.target.name]: e.target.value,
    })
  }

  // Функція оформлення замовлення
  const handleOrder = async () => {

    // Увімкнення стану loading
    setLoading(true)

    try {

      // POST-запит до API
      const res = await fetch("/api/order", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Передача даних форми
        body: JSON.stringify({
          ...form,

          // Тип доставки
          deliveryType,
        }),
      })

      // Отримання відповіді сервера
      const data = await res.json()

      // Якщо сервер повернув помилку
      if (!res.ok) {

        toast.error(data.error || "Помилка")

        setLoading(false)

        return
      }

      // Повідомлення про успішне оформлення
      toast.success("Замовлення оформлено 🎉")

      // Перехід на сторінку подяки
      window.location.href = "/thank-you"

    } catch (error) {

      // Помилка сервера
      toast.error("Помилка сервера")
    }

    // Вимкнення loading
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">

      {/* Заголовок сторінки */}
      <h1 className="text-4xl font-bold mb-8">
        🧾 Оформлення замовлення
      </h1>

      {/* Контейнер форми */}
      <div className="bg-white p-8 rounded-2xl shadow space-y-4">

        {/* Дані користувача */}

        <input
          name="firstName"
          placeholder="Ім’я"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="lastName"
          placeholder="Прізвище"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="phone"
          placeholder="Телефон"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="city"
          placeholder="Місто"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* Вибір доставки */}
        <div className="pt-4">

          <h2 className="text-xl font-semibold mb-3">
            🚚 Доставка
          </h2>

          <select
            value={deliveryType}

            // Зміна типу доставки
            onChange={(e) =>
              setDeliveryType(e.target.value)
            }

            className="w-full border p-3 rounded-lg"
          >

            <option value="nova">
              Нова пошта
            </option>

            <option value="ukr">
              Укрпошта
            </option>

          </select>

        </div>

        {/* Відділення доставки */}
        <input
          name="branch"
          onChange={handleChange}

          // Placeholder залежить від типу доставки
          placeholder={
            deliveryType === "nova"
              ? "Відділення Нової пошти"
              : "Відділення Укрпошти"
          }

          className="w-full border p-3 rounded-lg"
        />

        {/* Кнопка оформлення */}
        <button
          onClick={handleOrder}

          // Блокування кнопки під час loading
          disabled={loading}

          className="
            w-full
            bg-[#3F5F56]
            text-white
            py-3
            rounded-lg
            hover:opacity-90
            transition
          "
        >

          {/* Зміна тексту кнопки */}
          {loading
            ? "Оформлення..."
            : "Підтвердити замовлення"}

        </button>

      </div>
    </div>
  )
}