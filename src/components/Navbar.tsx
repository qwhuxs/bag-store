"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  const isAdmin = (session?.user as any)?.role === "ADMIN"

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

          {/* 🔥 НОВІ СЕКЦІЇ */}
          <Link href="/hits" className="hover:text-[#ff6b6b] transition">
            🔥 Хіти
          </Link>

          <Link href="/new" className="hover:text-[#3F5F56] transition">
            🆕 Новинки
          </Link>

          <Link href="/sale" className="hover:text-green-600 transition">
            💰 Знижки
          </Link>

          {/* 🔥 ADMIN MENU */}
          {isAdmin && (
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">

              <Link
                href="/admin/products"
                className="text-green-600 hover:underline"
              >
                ⚙️ Товари
              </Link>

              <Link
                href="/admin/orders"
                className="text-green-600 hover:underline"
              >
                📦 Замовлення
              </Link>

              <Link
                href="/admin/categories"
                className="text-green-600 hover:underline"
              >
                🗂 Категорії
              </Link>

            </div>
          )}

          {!session ? (
            <>
              <Link href="/login" className="hover:text-[#D9A5A0] transition">
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
              <Link href="/cart" className="hover:text-[#D9A5A0] transition">
                🛒 Кошик
              </Link>

              <Link href="/profile" className="hover:text-[#D9A5A0] transition">
                👤 Профіль
              </Link>

              <div className="flex items-center gap-2 text-xs">

                <span className="text-gray-600">
                  {session.user?.email}
                </span>

                {isAdmin && (
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    ADMIN
                  </span>
                )}
              </div>

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