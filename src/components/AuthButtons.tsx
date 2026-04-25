"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa"

export default function AuthButtons() {
  const { data: session } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // 👉 якщо користувач залогінений
  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <p className="text-lg font-medium">
            Welcome, {session.user?.email}
          </p>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  // 👉 форма логіну
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-xl font-semibold text-center">
          Login
        </h2>

        <input
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
          onClick={() =>
            signIn("credentials", { email, password })
          }
        >
          Login
        </button>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-300"></div>
          or
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          className="flex items-center justify-center gap-2 border p-3 rounded-lg hover:bg-gray-100 transition"
          onClick={() => signIn("google")}
        >
          <FaGoogle /> Sign in with Google
        </button>

        <button
          className="flex items-center justify-center gap-2 border p-3 rounded-lg hover:bg-gray-100 transition"
          onClick={() => signIn("github")}
        >
          <FaGithub /> Sign in with GitHub
        </button>

        <button
          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={() => signIn("facebook")}
        >
          <FaFacebook /> Sign in with Facebook
        </button>

      </div>
    </div>
  )
}