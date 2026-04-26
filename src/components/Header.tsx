"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      {/* 🔹 Назва магазину */}
      <Link href="/" className="text-2xl font-bold tracking-wide">
        Euphoria Bags
      </Link>

      {/* 🔹 Навігація */}
      <nav className="flex gap-4 items-center">
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/cart">Cart</Link>

        {session ? (
          <button
            onClick={() => signOut()}
            className="text-red-500"
          >
            Logout
          </button>
        ) : (
          <Link href="/">Login</Link>
        )}
      </nav>
    </header>
  )
}