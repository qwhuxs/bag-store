"use client"

// useState для керування станом
import { useState } from "react"

// useRouter для оновлення сторінки
import { useRouter } from "next/navigation"

// Toast повідомлення
import toast from "react-hot-toast"

// Компонент Next.js для оптимізації зображень
import Image from "next/image"

// Тип користувача
type UserType = {
  email: string

  firstName?: string
  lastName?: string
  age?: string | number
  city?: string
  phone?: string
  image?: string
}

export default function ProfileClient({
  user,
}: {
  user: UserType
}) {

  // Router Next.js
  const router = useRouter()

  // Стан режиму редагування
  const [isEditing, setIsEditing] =
    useState(false)

  // Стан аватара
  const [avatar, setAvatar] =
    useState(user.image || "")

  // Стан форми
  const [form, setForm] = useState({

    firstName:
      user.firstName || "",

    lastName:
      user.lastName || "",

    age:
      user.age || "",

    city:
      user.city || "",

    phone:
      user.phone || "",

    image:
      user.image || "",
  })

  // Оновлення значень input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,
    })
  }

  // Завантаження фото профілю
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    // Отримання файлу
    const file =
      e.target.files?.[0]

    if (!file) return

    // FileReader для конвертації фото
    const reader =
      new FileReader()

    reader.onloadend = () => {

      // Збереження фото
      setAvatar(
        reader.result as string
      )

      // Додавання фото у form
      setForm({

        ...form,

        image:
          reader.result as string,
      })
    }

    // Читання файлу
    reader.readAsDataURL(file)
  }

  // Збереження змін профілю
  const handleSave = async () => {

    // PUT-запит до API
    const res = await fetch(
      "/api/profile",
      {

        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        // Передача даних форми
        body: JSON.stringify(form),
      }
    )

    // Якщо все успішно
    if (res.ok) {

      toast.success(
        "Профіль оновлено ✅"
      )

      // Вихід з режиму редагування
      setIsEditing(false)

      // Оновлення сторінки
      router.refresh()

    } else {

      // Помилка
      toast.error("Помилка ❌")
    }
  }

  return (

    // Контейнер сторінки
    <div
      className="
        max-w-6xl mx-auto
        px-4 py-8
      "
    >

      {/* Карточка профілю */}
      <div
        className="
          bg-white
          rounded-[35px]
          shadow-xl
          p-5 md:p-10
        "
      >

        {/* Header */}
        <div
          className="
            flex flex-col md:flex-row
            md:items-center
            md:justify-between
            gap-6
            mb-10
          "
        >

          {/* Ліва частина */}
          <div
            className="
              flex flex-col md:flex-row
              items-center
              gap-5
            "
          >

            {/* Аватар */}
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

                sizes="112px"

                className="object-cover"
              />

            </div>

            {/* Заголовок */}
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

          {/* Кнопка редагування */}
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

        {/* Режим перегляду */}
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

            {/* Ліва колонка */}
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

            {/* Права колонка */}
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