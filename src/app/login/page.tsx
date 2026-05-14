"use client"

// signIn використовується для авторизації через NextAuth
import { signIn } from "next-auth/react"

// useState для збереження стану компоненту
import { useState } from "react"

// Бібліотека для повідомлень
import toast from "react-hot-toast"

export default function LoginPage() {

  // Стан email
  const [email, setEmail] = useState("")

  // Стан пароля
  const [password, setPassword] = useState("")

  // Показ/приховування пароля
  const [showPassword, setShowPassword] = useState(false)

  // Checkbox "Запам’ятати мене"
  const [remember, setRemember] = useState(false)

  // Стан помилок валідації
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })

  // Функція перевірки форми
  const validate = () => {

    let ok = true

    const newErrors = {
      email: "",
      password: "",
      general: "",
    }

    // Перевірка email
    if (!email.includes("@")) {
      newErrors.email =
        "Введіть коректний email"

      ok = false
    }

    // Перевірка довжини пароля
    if (password.length < 5) {
      newErrors.password =
        "Пароль має бути мінімум 5 символів"

      ok = false
    }

    // Оновлення стану помилок
    setErrors(newErrors)

    return ok
  }

  // Функція входу
const handleLogin = async () => {

  // Якщо валідація не пройдена
  if (!validate()) return

  // Авторизація через CredentialsProvider
  const res = await signIn("credentials", {
    email,
    password,

    // Без автоматичного redirect
    redirect: false,

    // Сторінка після входу
    callbackUrl: "/profile",
  })

  // Якщо помилка авторизації
  if (res?.error) {

    toast.error(
      "Невірний email або пароль"
    )

    return
  }

  // Перехід у профіль
  window.location.href = "/profile"
}

  return (
    <div
      className="
        flex items-center justify-center
        min-h-[calc(100vh-80px)]
        bg-gradient-to-br
        from-[#f5f3f2]
        to-[#e9e4e1]
        px-4 py-10
      "
    >

      {/* Карточка форми */}
      <div
        className="
          w-full max-w-md
          bg-white
          p-8
          rounded-2xl
          shadow-xl
          border border-gray-100
        "
      >

        {/* Заголовок */}
        <h1
          className="
            text-3xl font-bold
            text-center mb-6
            bg-gradient-to-r
            from-[#3F5F56]
            to-[#D9A5A0]
            text-transparent bg-clip-text
          "
        >
          Вхід
        </h1>

        {/* Поле email */}
        <input
          placeholder="Email"
          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          className="
            w-full border
            p-3 rounded-lg
          "
        />

        {/* Помилка email */}
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email}
          </p>
        )}

        {/* Поле пароля */}
        <div className="relative mt-4">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }

            placeholder="Пароль"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            className="
              w-full border
              p-3 rounded-lg pr-10
            "
          />

          {/* Кнопка показу пароля */}
          <button
            type="button"

            onClick={() =>
              setShowPassword(!showPassword)
            }

            className="
              absolute right-3 top-3
              text-gray-500
            "
          >
            👁
          </button>

        </div>

        {/* Помилка пароля */}
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password}
          </p>
        )}

        {/* Checkbox */}
        <label
          className="
            flex items-center
            gap-2 mt-4 text-sm
          "
        >

          <input
            type="checkbox"

            checked={remember}

            onChange={() =>
              setRemember(!remember)
            }
          />

          Запам’ятати мене

        </label>

        {/* Кнопка входу */}
        <button
          onClick={handleLogin}

          className="
            mt-4 w-full
            bg-gradient-to-r
            from-[#3F5F56]
            to-[#D9A5A0]
            text-white py-3
            rounded-lg
            hover:scale-105
            transition
          "
        >
          Увійти
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">

          <div className="flex-1 h-[1px] bg-gray-200"></div>

          <span className="text-gray-400 text-sm">
            або
          </span>

          <div className="flex-1 h-[1px] bg-gray-200"></div>

        </div>

        {/* Авторизація через соцмережі */}
        <div className="flex flex-col gap-3">

          {/* Google login */}
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/profile",
              })
            }

            className="
              border py-2 rounded-lg
              hover:bg-gray-50
            "
          >
            Google
          </button>

          {/* GitHub login */}
          <button
            onClick={() =>
              signIn("github", {
                callbackUrl: "/profile",
              })
            }

            className="
              border py-2 rounded-lg
              hover:bg-gray-50
            "
          >
            GitHub
          </button>

          {/* Discord login */}
          <button
            onClick={() =>
              signIn("discord", {
                callbackUrl: "/profile",
              })
            }

            className="
              bg-indigo-500
              text-white
              py-2 rounded-lg
            "
          >
            Discord
          </button>

        </div>

      </div>
    </div>
  )
}