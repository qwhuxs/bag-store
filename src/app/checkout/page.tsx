"use client"

import { useState } from "react"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)

  const [deliveryType, setDeliveryType] =
    useState("nova")

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    branch: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleOrder = async () => {
    setLoading(true)

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          deliveryType,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Помилка")
        setLoading(false)
        return
      }

      toast.success("Замовлення оформлено 🎉")

      window.location.href = "/thank-you"

    } catch (error) {
      toast.error("Помилка сервера")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">

      <h1 className="text-4xl font-bold mb-8">
        🧾 Оформлення замовлення
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow space-y-4">

        {/* 👤 USER INFO */}

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

        {/* 🚚 DELIVERY */}

        <div className="pt-4">
          <h2 className="text-xl font-semibold mb-3">
            🚚 Доставка
          </h2>

          <select
            value={deliveryType}
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

        <input
          name="branch"
          onChange={handleChange}
          placeholder={
            deliveryType === "nova"
              ? "Відділення Нової пошти"
              : "Відділення Укрпошти"
          }
          className="w-full border p-3 rounded-lg"
        />

        {/* ✅ BUTTON */}

        <button
          onClick={handleOrder}
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
          {loading
            ? "Оформлення..."
            : "Підтвердити замовлення"}
        </button>

      </div>
    </div>
  )
}