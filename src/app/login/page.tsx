"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f3f2]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[380px] flex flex-col gap-5">

        <h1 className="text-2xl font-bold text-center text-[#3F5F56]">
          Вхід
        </h1>

        <input
          placeholder="Email"
          className="border p-3 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          className="border p-3 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() =>
            signIn("credentials", {
              email,
              password,
              callbackUrl: "/profile",
            })
          }
          className="bg-pink-400 text-white py-2 rounded-lg"
        >
          Увійти
        </button>

        <div className="text-center text-gray-400">або</div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
          className="border py-2 rounded-lg"
        >
          Google
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/profile" })}
          className="border py-2 rounded-lg"
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
  )
}