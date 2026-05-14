"use client"

// useState для керування станом компонента
import { useState } from "react"

export default function ReviewFormInline({
  productId,
}: {
  productId: string
}) {

  // Стан відкриття/закриття форми
  const [open, setOpen] =
    useState(false)

  // Стан тексту відгуку
  const [comment, setComment] =
    useState("")

  // Стан рейтингу
  const [rating, setRating] =
    useState(5)

  // Стан завантаження
  const [loading, setLoading] =
    useState(false)

  // Функція відправки відгуку
  const submit = async () => {

    // Перевірка на пустий коментар
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

  // Якщо форма закрита
  if (!open) {

    return (

      // Кнопка відкриття форми
      <button

        onClick={() =>
          setOpen(true)
        }

        className="
          mt-2 inline-block
          text-sm font-medium
          px-4 py-1.5
          rounded-lg
          bg-gradient-to-r
          from-[#3F5F56]
          to-[#D9A5A0]
          text-white
          shadow-sm
          hover:shadow-md
          hover:scale-105
          transition
        "
      >
        ✍️ Залишити відгук
      </button>
    )
  }

  return (

    // Блок форми відгуку
    <div
      className="
        mt-3
        bg-gray-50
        p-4
        rounded-xl
        shadow-sm
        animate-fade-in
      "
    >

      {/* Поле введення коментаря */}
      <textarea

        className="
          w-full
          border
          p-3
          rounded-lg
          mb-3
          focus:outline-none
          focus:ring-2
          focus:ring-[#3F5F56]
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

        <span className="text-sm">
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
            rounded-lg
          "
        >

          {/* Генерація варіантів оцінки */}
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

      {/* Кнопки */}
      <div className="flex gap-2">

        {/* Кнопка відправки */}
        <button

          onClick={submit}

          disabled={loading}

          className="
            bg-gradient-to-r
            from-[#3F5F56]
            to-[#D9A5A0]
            text-white
            px-4 py-2
            rounded-lg
            hover:scale-105
            transition
          "
        >

          {/* Текст кнопки */}
          {loading
            ? "Відправка..."
            : "Відправити"}

        </button>

        {/* Кнопка скасування */}
        <button

          onClick={() =>
            setOpen(false)
          }

          className="
            px-4 py-2
            rounded-lg
            border
            hover:bg-gray-100
            transition
          "
        >
          Скасувати
        </button>

      </div>
    </div>
  )
}