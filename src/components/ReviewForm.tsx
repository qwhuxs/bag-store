"use client"

// useState для керування станом
import { useState } from "react"

export default function ReviewForm({
  productId,
}: {
  productId: string
}) {

  // Стан тексту відгуку
  const [comment, setComment] =
    useState("")

  // Стан рейтингу
  const [rating, setRating] =
    useState(5)

  // Стан завантаження
  const [loading, setLoading] =
    useState(false)

  // Відправка відгуку
  const handleSubmit = async () => {

    // Перевірка на пустий текст
    if (!comment.trim()) return

    // Увімкнення loading
    setLoading(true)

    // POST-запит до API
    await fetch("/api/reviews", {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      // Передача даних відгуку
      body: JSON.stringify({

        comment,

        rating,

        productId,
      }),
    })

    // Вимкнення loading
    setLoading(false)

    // Оновлення сторінки
    location.reload()
  }

  return (

    // Карточка форми
    <div
      className="
        mt-10
        bg-white
        p-5
        rounded-xl
        shadow
      "
    >

      {/* Заголовок */}
      <h3
        className="
          text-lg
          font-semibold
          mb-3
        "
      >
        Додати відгук
      </h3>

      {/* Поле коментаря */}
      <textarea

        className="
          w-full
          border
          p-3
          rounded
          mb-3
        "

        placeholder="Напишіть свій відгук..."

        value={comment}

        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      {/* Вибір рейтингу */}
      <div
        className="
          flex items-center
          gap-3
          mb-3
        "
      >

        <span>
          Оцінка:
        </span>

        <select

          value={rating}

          onChange={(e) =>
            setRating(
              Number(e.target.value)
            )
          }

          className="
            border
            p-2
            rounded
          "
        >

          {/* Варіанти рейтингу */}
          {[1, 2, 3, 4, 5].map((n) => (

            <option
              key={n}
              value={n}
            >

              {n} ⭐

            </option>
          ))}

        </select>

      </div>

      {/* Кнопка відправки */}
      <button

        onClick={handleSubmit}

        disabled={loading}

        className="
          bg-black
          text-white
          px-4 py-2
          rounded
          hover:opacity-90
        "
      >

        {/* Текст кнопки */}
        {loading
          ? "Відправка..."
          : "Відправити"}

      </button>

    </div>
  )
}