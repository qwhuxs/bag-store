"use client"

import { useState } from "react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  return (
    <div className="flex flex-col gap-2 p-10">
      <input onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}