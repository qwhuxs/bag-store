"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import toast from "react-hot-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })

  const validate = () => {
    let ok = true
    const newErrors = { email: "", password: "", general: "" }

    if (!email.includes("@")) {
      newErrors.email = "Введіть коректний email"
      ok = false
    }

    if (password.length < 5) {
      newErrors.password = "Пароль має бути мінімум 5 символів"
      ok = false
    }

    setErrors(newErrors)
    return ok
  }
const handleLogin = async () => {
  if (!validate()) return

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
    callbackUrl: "/profile",
  })

  if (res?.error) {
    toast.error("Невірний email або пароль")
    return
  }

  window.location.href = "/profile"
}

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#f5f3f2] to-[#e9e4e1] px-4 py-10">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] text-transparent bg-clip-text">
          Вхід
        </h1>

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}

        {/* PASSWORD */}
        <div className="relative mt-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            👁
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}

        {/* REMEMBER */}
        <label className="flex items-center gap-2 mt-4 text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Запам’ятати мене
        </label>

        {/* LOGIN */}
        <button
          onClick={handleLogin}
          className="mt-4 w-full bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] text-white py-3 rounded-lg hover:scale-105 transition"
        >
          Увійти
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="text-gray-400 text-sm">або</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* 🔥 SOCIAL LOGIN */}
        <div className="flex flex-col gap-3">

          <button
            onClick={() => signIn("google", { callbackUrl: "/profile" })}
            className="border py-2 rounded-lg hover:bg-gray-50"
          >
            Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/profile" })}
            className="border py-2 rounded-lg hover:bg-gray-50"
          >
            GitHub
          </button>

          <button
            onClick={() => signIn("discord", { callbackUrl: "/profile" })}
            className="bg-indigo-500 text-white py-2 rounded-lg"
          >
            Discord
          </button>

        </div>

      </div>
    </div>
  )
}