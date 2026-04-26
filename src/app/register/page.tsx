"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        age: age ? Number(age) : null,
        city,
        phone,
        email,
        password,
      }),
    })

    const login = await signIn("credentials", {
  email,
  password,
  redirect: false,
})

if (login?.error) {
  toast.error("Помилка входу")
  return
}

window.location.href = "/profile"

    const data = await res.json()

    if (!res.ok) {
      toast.error(data.error || "Помилка реєстрації")
      setLoading(false)
      return
    }

    toast.success("Реєстрація успішна 🎉")

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/profile",
    })
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Реєстрація
        </h1>

        <input placeholder="Ім’я" className="input" onChange={(e)=>setFirstName(e.target.value)} />
        <input placeholder="Прізвище" className="input mt-3" onChange={(e)=>setLastName(e.target.value)} />
        <input placeholder="Вік" className="input mt-3" onChange={(e)=>setAge(e.target.value)} />
        <input placeholder="Місто" className="input mt-3" onChange={(e)=>setCity(e.target.value)} />
        <input placeholder="Телефон" className="input mt-3" onChange={(e)=>setPhone(e.target.value)} />
        <input placeholder="Email" className="input mt-3" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Пароль" className="input mt-3" onChange={(e)=>setPassword(e.target.value)} />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="mt-4 w-full bg-[#3F5F56] text-white py-3 rounded-lg"
        >
          {loading ? "Завантаження..." : "Зареєструватися"}
        </button>

      </div>
    </div>
  )
}