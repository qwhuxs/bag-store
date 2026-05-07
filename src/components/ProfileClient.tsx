"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Image from "next/image"

export default function ProfileClient({
  user,
}: any) {

  const router = useRouter()

  const [isEditing, setIsEditing] =
    useState(false)

  const [avatar, setAvatar] =
    useState(user.image || "")

  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    age: user.age || "",
    city: user.city || "",
    phone: user.phone || "",
    image: user.image || "",
  })

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageUpload = (
    e: any
  ) => {

    const file = e.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {

      setAvatar(reader.result as string)

      setForm({
        ...form,
        image: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }

  const handleSave = async () => {

    const res = await fetch(
      "/api/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    )

    if (res.ok) {

      toast.success(
        "Профіль оновлено ✅"
      )

      setIsEditing(false)

      router.refresh()

    } else {
      toast.error("Помилка ❌")
    }
  }

  return (
    <div
      className="
        max-w-6xl mx-auto
        px-4 py-8
      "
    >

      <div
        className="
          bg-white
          rounded-[35px]
          shadow-xl
          p-5 md:p-10
        "
      >

        {/* HEADER */}

        <div
          className="
            flex flex-col md:flex-row
            md:items-center
            md:justify-between
            gap-6
            mb-10
          "
        >

          <div
            className="
              flex flex-col md:flex-row
              items-center
              gap-5
            "
          >

            {/* AVATAR */}

            <div
              className="
                relative
                w-28 h-28
                rounded-full
                overflow-hidden
                border-4 border-white
                shadow-lg
              "
            >

              <Image
                src={
                  avatar ||
                  "/images/default-avatar.png"
                }
                alt="avatar"
                fill
                className="object-cover"
              />

            </div>

            <h1
              className="
                text-4xl md:text-5xl
                font-black
                text-[#1f2d4d]
                text-center md:text-left
              "
            >
              Профіль
            </h1>

          </div>

          {!isEditing && (
            <button
              onClick={() =>
                setIsEditing(true)
              }
              className="
                border
                px-6 py-3
                rounded-2xl
                hover:bg-gray-100
                transition
                font-medium
              "
            >
              ✏️ Змінити
            </button>
          )}

        </div>

        {!isEditing ? (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
              text-lg
            "
          >

            <div className="space-y-4">

              <p>
                <span className="font-bold">
                  Email:
                </span>
                {" "}
                {user.email}
              </p>

              <p>
                <span className="font-bold">
                  Ім’я:
                </span>
                {" "}
                {user.firstName || "-"}
              </p>

              <p>
                <span className="font-bold">
                  Прізвище:
                </span>
                {" "}
                {user.lastName || "-"}
              </p>

            </div>

            <div className="space-y-4">

              <p>
                <span className="font-bold">
                  Вік:
                </span>
                {" "}
                {user.age || "-"}
              </p>

              <p>
                <span className="font-bold">
                  Місто:
                </span>
                {" "}
                {user.city || "-"}
              </p>

              <p>
                <span className="font-bold">
                  Телефон:
                </span>
                {" "}
                {user.phone || "-"}
              </p>

            </div>

          </div>

        ) : (

          <>
            {/* FORM */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
              "
            >

              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Ім’я"
                className="input"
              />

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Прізвище"
                className="input"
              />

              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Вік"
                className="input"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Місто"
                className="input"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Телефон"
                className="input"
              />

              <input
                value={user.email}
                disabled
                className="
                  input
                  bg-gray-100
                "
              />

            </div>

            {/* IMAGE */}

            <div className="mt-6">

              <p className="font-semibold mb-3">
                Фото профілю
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />

            </div>

            {/* BUTTONS */}

            <div
              className="
                flex flex-col md:flex-row
                gap-4
                mt-8
              "
            >

              <button
                onClick={handleSave}
                className="
                  flex-1
                  bg-gradient-to-r
                  from-[#3F5F56]
                  to-[#D9A5A0]
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  hover:scale-105
                  transition
                "
              >
                Зберегти
              </button>

              <button
                onClick={() =>
                  setIsEditing(false)
                }
                className="
                  flex-1
                  border
                  py-4
                  rounded-2xl
                  hover:bg-gray-100
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