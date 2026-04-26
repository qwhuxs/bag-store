"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    email: "",
    deliveryType: "nova",
    branch: "",
  })

  const handleSubmit = async () => {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      toast.error(data.error || "Помилка оформлення")
      return
    }

    toast.success("Замовлення оформлено!")

    setTimeout(() => {
      router.push("/success")
    }, 1000)
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Оформлення замовлення
      </h1>

      <div className="flex flex-col gap-4">

        <input
          placeholder="Ім’я"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />

        <input
          placeholder="Прізвище"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
        />

        <input
          placeholder="Телефон"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="Місто"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        />

        {/* 📦 доставка */}
        <select
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, deliveryType: e.target.value })
          }
        >
          <option value="nova">Нова пошта</option>
          <option value="ukr">Укр пошта</option>
        </select>

        <input
          placeholder="Відділення"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, branch: e.target.value })
          }
        />

        {/* 📧 email */}
        <input
          placeholder="Email"
          className="border p-3 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="
            bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
            text-white py-3 rounded-lg
            hover:scale-105 transition
          "
        >
          Підтвердити замовлення
        </button>

      </div>
    </div>
  )
}