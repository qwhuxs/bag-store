"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ProfileClient({ user }: any) {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    age: user.age || "",
    city: user.city || "",
    phone: user.phone || "",
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    const res = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify(form),
    })

    if (res.ok) {
      toast.success("Дані успішно оновлені ✅")
      setIsEditing(false)
      router.refresh()
    } else {
      toast.error("Помилка оновлення ❌")
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Профіль</h1>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            ✏️ Змінити
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><b>Email:</b> {user.email}</p>
          <p><b>Ім’я:</b> {user.firstName || "-"}</p>

          <p><b>Прізвище:</b> {user.lastName || "-"}</p>
          <p><b>Вік:</b> {user.age || "-"}</p>

          <p><b>Місто:</b> {user.city || "-"}</p>
          <p><b>Телефон:</b> {user.phone || "-"}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">

            <input name="firstName" value={form.firstName} onChange={handleChange}
              placeholder="Ім'я" className="border p-3 rounded-lg" />

            <input name="lastName" value={form.lastName} onChange={handleChange}
              placeholder="Прізвище" className="border p-3 rounded-lg" />

            <input name="age" value={form.age} onChange={handleChange}
              placeholder="Вік" className="border p-3 rounded-lg" />

            <input name="city" value={form.city} onChange={handleChange}
              placeholder="Місто" className="border p-3 rounded-lg" />

            <input name="phone" value={form.phone} onChange={handleChange}
              placeholder="Телефон" className="border p-3 rounded-lg col-span-2" />

          </div>

          <div className="flex gap-3 mt-5">

            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] text-white py-3 rounded-lg"
            >
              Зберегти
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 border py-3 rounded-lg"
            >
              Скасувати
            </button>

          </div>
        </>
      )}

    </div>
  )
}