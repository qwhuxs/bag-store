"use client"

// useState використовується для збереження стану
import { useState } from "react"

// signIn використовується для автоматичного входу
import { signIn } from "next-auth/react"

// Бібліотека для повідомлень
import toast from "react-hot-toast"

export default function RegisterPage() {

  // Дані користувача
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Стан завантаження
  const [loading, setLoading] = useState(false)

  // Функція реєстрації
  const handleRegister = async () => {

    // Увімкнення loading
    setLoading(true)

    try {

      // POST-запит до API реєстрації
      const res = await fetch("/api/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Передача даних форми
        body: JSON.stringify({
          firstName,
          lastName,

          // Перетворення age у number
          age: age ? Number(age) : null,

          city,
          phone,
          email,
          password,
        }),
      })

      // Отримання відповіді сервера
      const data = await res.json()

      // Якщо реєстрація неуспішна
      if (!res.ok) {

        toast.error(
          data.error || "Помилка реєстрації"
        )

        setLoading(false)

        return
      }

      // Повідомлення про успішну реєстрацію
      toast.success("Реєстрація успішна 🎉")

      // Автоматичний вхід після реєстрації
      const login = await signIn("credentials", {
        email,
        password,

        // Без автоматичного redirect
        redirect: false,
      })

      // Якщо помилка входу
      if (login?.error) {

        toast.error("Помилка входу")

        setLoading(false)

        return
      }

      // Перехід у профіль
      window.location.href = "/profile"

    } catch {

      // Помилка сервера
      toast.error("Помилка сервера")
    }

    // Вимкнення loading
    setLoading(false)
  }

  return (
    <div
      className="
        flex items-center justify-center
        min-h-[calc(100vh-80px)]
      "
    >

      {/* Контейнер форми */}
      <div
        className="
          w-full max-w-md
          bg-white
          p-8
          rounded-2xl
          shadow-xl
        "
      >

        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Реєстрація
        </h1>

        {/* Поле імені */}
        <input
          placeholder="Ім’я"
          className="input"

          onChange={(e) =>
            setFirstName(e.target.value)
          }
        />

        {/* Поле прізвища */}
        <input
          placeholder="Прізвище"
          className="input mt-3"

          onChange={(e) =>
            setLastName(e.target.value)
          }
        />

        {/* Поле віку */}
        <input
          placeholder="Вік"
          className="input mt-3"

          onChange={(e) =>
            setAge(e.target.value)
          }
        />

        {/* Поле міста */}
        <input
          placeholder="Місто"
          className="input mt-3"

          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        {/* Поле телефону */}
        <input
          placeholder="Телефон"
          className="input mt-3"

          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        {/* Поле email */}
        <input
          placeholder="Email"
          className="input mt-3"

          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* Поле пароля */}
        <input
          type="password"
          placeholder="Пароль"
          className="input mt-3"

          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* Кнопка реєстрації */}
        <button
          onClick={handleRegister}

          // Блокування кнопки під час loading
          disabled={loading}

          className="
            mt-4
            w-full
            bg-[#3F5F56]
            text-white
            py-3
            rounded-lg
            hover:opacity-90
            transition
          "
        >

          {/* Зміна тексту кнопки */}
          {loading
            ? "Завантаження..."
            : "Зареєструватися"}

        </button>

      </div>
    </div>
  )
}