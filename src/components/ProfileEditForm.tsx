"use client"

// useState для керування станом
import { useState } from "react"

// useRouter для оновлення сторінки
import { useRouter } from "next/navigation"

export default function ProfileEditForm({
  user,
}: any) {

  // Router Next.js
  const router = useRouter()

  // Стан режиму редагування
  const [isEditing, setIsEditing] =
    useState(false)

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
  })

  // Стан завантаження
  const [loading, setLoading] =
    useState(false)

  // Оновлення значень input
  const handleChange = (e: any) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,
    })
  }

  // Збереження змін
  const handleSave = async () => {

    // Увімкнення loading
    setLoading(true)

    // PUT-запит до API
    const res = await fetch(
      "/api/profile",
      {

        method: "PUT",

        // Передача даних форми
        body: JSON.stringify(form),
      }
    )

    // Вимкнення loading
    setLoading(false)

    // Якщо оновлення успішне
    if (res.ok) {

      // Закриття режиму редагування
      setIsEditing(false)

      // Оновлення сторінки
      router.refresh()
    }
  }

  return (

    // Карточка профілю
    <div
      className="
        bg-white
        p-6
        rounded-xl
        shadow
        mb-8
      "
    >

      {/* Кнопка редагування */}
      {!isEditing && (

        <div className="flex justify-end">

          <button
            onClick={() =>
              setIsEditing(true)
            }

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

      {/* Форма редагування */}
      {isEditing && (

        <>

          {/* Заголовок */}
          <h2
            className="
              text-xl
              font-bold
              mb-4
            "
          >
            Редагувати профіль
          </h2>

          {/* Grid форма */}
          <div
            className="
              grid
              grid-cols-2
              gap-4
            "
          >

            {/* Ім’я */}
            <input
              name="firstName"

              value={form.firstName}

              onChange={handleChange}

              placeholder="Ім'я"

              className="
                border
                p-3
                rounded-lg
              "
            />

            {/* Прізвище */}
            <input
              name="lastName"

              value={form.lastName}

              onChange={handleChange}

              placeholder="Прізвище"

              className="
                border
                p-3
                rounded-lg
              "
            />

            {/* Вік */}
            <input
              name="age"

              value={form.age}

              onChange={handleChange}

              placeholder="Вік"

              className="
                border
                p-3
                rounded-lg
              "
            />

            {/* Місто */}
            <input
              name="city"

              value={form.city}

              onChange={handleChange}

              placeholder="Місто"

              className="
                border
                p-3
                rounded-lg
              "
            />

            {/* Телефон */}
            <input
              name="phone"

              value={form.phone}

              onChange={handleChange}

              placeholder="Телефон"

              className="
                border
                p-3
                rounded-lg
                col-span-2
              "
            />

          </div>

          {/* Кнопки */}
          <div
            className="
              flex gap-3
              mt-5
            "
          >

            {/* Зберегти */}
            <button
              onClick={handleSave}

              disabled={loading}

              className="
                flex-1
                bg-gradient-to-r
                from-[#3F5F56]
                to-[#D9A5A0]
                text-white
                py-3
                rounded-lg
                hover:scale-105
                transition
              "
            >

              {/* Текст кнопки */}
              {loading
                ? "Збереження..."
                : "Зберегти"}

            </button>

            {/* Скасувати */}
            <button
              onClick={() =>
                setIsEditing(false)
              }

              className="
                flex-1
                border border-gray-300
                py-3
                rounded-lg
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