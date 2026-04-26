"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ProfileClient({ user }: any) {
  const router = useRouter()

  // 🔥 DEBUG
  useEffect(() => {
    console.log("PROFILE CLIENT WORKING")
  }, [])

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      toast.success("Дані оновлено ✅")
      setIsEditing(false)
      router.refresh()
    } else {
      toast.error("Помилка ❌")
    }
  }

  return (
    <div className="
      bg-white
      rounded-3xl
      shadow-lg
      p-8
      mb-10
      border border-gray-100
      relative
      overflow-hidden
    ">

      {/* 🎨 фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3F5F56]/10 to-[#D9A5A0]/10 opacity-50" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            👤 Профіль
          </h1>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="
                flex items-center gap-2
                px-4 py-2
                border rounded-xl
                hover:bg-gray-50
                transition
              "
            >
              ✏️ Змінити
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">

            <div className="space-y-3">
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Ім’я:</span> {user.firstName || "-"}</p>
              <p><span className="font-semibold">Прізвище:</span> {user.lastName || "-"}</p>
            </div>

            <div className="space-y-3">
              <p><span className="font-semibold">Вік:</span> {user.age || "-"}</p>
              <p><span className="font-semibold">Місто:</span> {user.city || "-"}</p>
              <p><span className="font-semibold">Телефон:</span> {user.phone || "-"}</p>
            </div>

          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-4">

              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Ім'я"
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F5F56]"
              />

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Прізвище"
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F5F56]"
              />

              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Вік"
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F5F56]"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Місто"
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3F5F56]"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Телефон"
                className="border p-3 rounded-lg col-span-2 focus:outline-none focus:ring-2 focus:ring-[#3F5F56]"
              />

            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={handleSave}
                className="
                  flex-1
                  bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
                  text-white py-3 rounded-lg
                  hover:scale-105 transition
                "
              >
                Зберегти
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="
                  flex-1
                  border py-3 rounded-lg
                  hover:bg-gray-50 transition
                "
              >
                Скасувати
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  )
}