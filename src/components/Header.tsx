"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

export default function Header() {
  const { data: session } = useSession()

  const [adminOpen, setAdminOpen] =
    useState(false)

  const isAdmin =
    session?.user &&
    "role" in session.user &&
    session.user.role === "ADMIN"

  return (
    <header
      className="
        bg-white
        shadow-md
        px-8 py-5
        sticky top-0 z-50
      "
    >

      <div
        className="
          max-w-7xl mx-auto
          flex justify-between items-center
        "
      >

        {/* 👜 LOGO */}

        <Link
          href="/"
          className="
            text-3xl font-black
            tracking-tight
            bg-gradient-to-r
            from-[#3F5F56]
            to-[#D9A5A0]
            bg-clip-text
            text-transparent
          "
        >
          Euphoria Bags
        </Link>

        {/* 🔗 NAVIGATION */}

        <nav className="flex items-center gap-8 text-[17px]">

          <Link
            href="/"
            className="hover:text-[#3F5F56] transition"
          >
            Головна
          </Link>

          <Link
            href="/catalog"
            className="hover:text-[#3F5F56] transition"
          >
            Товари
          </Link>

          <Link
            href="/categories"
            className="hover:text-[#3F5F56] transition"
          >
            Категорії
          </Link>

          <Link
            href="/hits"
            className="hover:text-[#3F5F56] transition"
          >
            🔥 Хіти
          </Link>

          <Link
            href="/sale"
            className="hover:text-[#3F5F56] transition"
          >
            💰 Знижки
          </Link>

         {/* 👑 ADMIN MENU */}

{isAdmin && (
  <div className="relative">

    <button
      onClick={() =>
        setAdminOpen(!adminOpen)
      }
      className="
        flex items-center gap-2
        font-semibold
        text-[#3F5F56]
        hover:text-[#2f4741]
        transition
      "
    >
      ⚙️ Управління

      <span
        className={`
          transition duration-300
          ${adminOpen ? "rotate-180" : ""}
        `}
      >
        ▼
      </span>
    </button>

    {adminOpen && (
      <div
        className="
          absolute right-0 mt-4
          bg-white
          border border-gray-100
          rounded-2xl
          shadow-2xl
          w-64
          overflow-hidden
          z-50
        "
      >

        <div className="p-2">

          <Link
            href="/admin/products"
            className="
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              hover:bg-gray-100
              transition
            "
          >
            📦 Товари
          </Link>

          <Link
            href="/admin/orders"
            className="
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              hover:bg-gray-100
              transition
            "
          >
            🧾 Замовлення
          </Link>

          <Link
            href="/admin/categories"
            className="
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              hover:bg-gray-100
              transition
            "
          >
            🗂 Категорії
          </Link>

        </div>

      </div>
    )}

  </div>
)}

          {/* 🛒 USER */}

          {session ? (
            <>
              <Link
                href="/cart"
                className="
                  hover:text-[#3F5F56]
                  transition
                "
              >
                🛒 Кошик
              </Link>

              <Link
                href="/profile"
                className="
                  hover:text-[#3F5F56]
                  transition
                "
              >
                👤 Профіль
              </Link>

              <span className="text-gray-500 text-sm">
                {session.user?.email}
              </span>

              <button
                onClick={() => signOut()}
                className="
                  text-red-500
                  hover:text-red-700
                  transition
                  font-medium
                "
              >
                Вийти
              </button>
            </>
          ) : (
            <div className="flex gap-3">

              <Link
                href="/login"
                className="
                  hover:text-[#3F5F56]
                  transition
                "
              >
                Увійти
              </Link>

              <Link
                href="/register"
                className="
                  bg-[#D9A5A0]
                  text-white
                  px-5 py-2
                  rounded-xl
                  hover:opacity-90
                  transition
                "
              >
                Реєстрація
              </Link>

            </div>
          )}

        </nav>

      </div>
    </header>
  )
}