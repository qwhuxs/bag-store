"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* 🔹 ЛОГО */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] bg-clip-text text-transparent tracking-wide"
        >
          Euphoria Bags
        </Link>

        {/* 🔹 МЕНЮ */}
        <div className="flex gap-6 items-center text-sm font-medium">

          <Link href="/" className="hover:text-[#D9A5A0] transition">
            Головна
          </Link>

          <Link href="/catalog" className="hover:text-[#D9A5A0] transition">
            Товари
          </Link>

          <Link href="/categories" className="hover:text-[#D9A5A0] transition">
            Категорії
          </Link>

          {/* 🔐 Якщо НЕ залогінений */}
          {!session ? (
            <>
              <Link
                href="/login"
                className="hover:text-[#D9A5A0] transition"
              >
                Увійти
              </Link>

              <Link
                href="/register"
                className="bg-[#D9A5A0] text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition"
              >
                Реєстрація
              </Link>
            </>
          ) : (
            <>
              {/* 🛒 КОШИК */}
              <Link
                href="/cart"
                className="hover:text-[#D9A5A0] transition"
              >
                🛒 Кошик
              </Link>

              {/* 👤 ПРОФІЛЬ */}
              <Link
                href="/profile"
                className="hover:text-[#D9A5A0] transition"
              >
                Профіль
              </Link>

              {/* 📧 EMAIL */}
              <span className="text-gray-600 text-xs">
                {session.user?.email}
              </span>

              {/* 🚪 ВИЙТИ */}
              <button
                onClick={() => signOut()}
                className="text-red-500 hover:underline"
              >
                Вийти
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}