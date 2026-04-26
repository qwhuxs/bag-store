"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfileEditForm({ user }: any) {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    age: user.age || "",
    city: user.city || "",
    phone: user.phone || "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setLoading(true)

    const res = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (res.ok) {
      setIsEditing(false)
      router.refresh() // 🔥 без reload
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">

      {/* 🔘 BUTTON */}
      {!isEditing && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="
              px-4 py-2
              border border-gray-300
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >
            ✏️ Змінити дані
          </button>
        </div>
      )}

      {/* 📝 FORM */}
      {isEditing && (
        <>
          <h2 className="text-xl font-bold mb-4">
            Редагувати профіль
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <input name="firstName" value={form.firstName} onChange={handleChange}
              placeholder="Ім'я"
              className="border p-3 rounded-lg" />

            <input name="lastName" value={form.lastName} onChange={handleChange}
              placeholder="Прізвище"
              className="border p-3 rounded-lg" />

            <input name="age" value={form.age} onChange={handleChange}
              placeholder="Вік"
              className="border p-3 rounded-lg" />

            <input name="city" value={form.city} onChange={handleChange}
              placeholder="Місто"
              className="border p-3 rounded-lg" />

            <input name="phone" value={form.phone} onChange={handleChange}
              placeholder="Телефон"
              className="border p-3 rounded-lg col-span-2" />

          </div>

          {/* 🔘 ACTIONS */}
          <div className="flex gap-3 mt-5">

            <button
              onClick={handleSave}
              disabled={loading}
              className="
                flex-1
                bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
                text-white py-3 rounded-lg
                hover:scale-105 transition
              "
            >
              {loading ? "Збереження..." : "Зберегти"}
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="
                flex-1
                border border-gray-300
                py-3 rounded-lg
                hover:bg-gray-100
                transition
              "
            >
              Скасувати
            </button>

          </div>
        </>
      )}

    </div>
  )
}