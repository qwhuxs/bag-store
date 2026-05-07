"use client"

import Link from "next/link"
import {
  useSession,
  signOut,
} from "next-auth/react"

import { useState } from "react"

export default function Navbar() {
  const { data: session } = useSession()

  const [adminOpen, setAdminOpen] =
    useState(false)

  const isAdmin =
    (session?.user as any)?.role === "ADMIN"

  return (
    <nav
      className="
        sticky top-0 z-50
        backdrop-blur
        bg-white/90
        border-b border-gray-200
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-4 md:px-6 py-4
        "
      >

        {/* 🔹 LOGO */}

        <div className="flex justify-center mb-4 md:hidden">
          <Link
            href="/"
            className="
              text-4xl font-extrabold
              bg-gradient-to-r
              from-[#3F5F56]
              to-[#D9A5A0]
              bg-clip-text
              text-transparent
              text-center
            "
          >
            Euphoria Bags
          </Link>
        </div>

        <div
          className="
            hidden md:flex
            justify-between items-center
          "
        >

          <Link
            href="/"
            className="
              text-3xl font-extrabold
              bg-gradient-to-r
              from-[#3F5F56]
              to-[#D9A5A0]
              bg-clip-text
              text-transparent
            "
          >
            Euphoria Bags
          </Link>

          <div className="flex gap-6 items-center text-sm font-medium">

            <Link href="/">
              Головна
            </Link>

            <Link href="/catalog">
              Товари
            </Link>

            <Link href="/categories">
              Категорії
            </Link>

            <Link href="/hits">
              🔥 Хіти
            </Link>

            <Link href="/new">
              🆕 Новинки
            </Link>

            <Link href="/sale">
              💰 Знижки
            </Link>

            {/* 👑 ADMIN */}

            {isAdmin && (
              <div className="relative z-50">

                <button
                  onClick={() =>
                    setAdminOpen(!adminOpen)
                  }
                  className="
                    flex items-center gap-2
                    text-green-600
                    font-semibold
                  "
                >
                  ⚙️ Управління

                  <span
                    className={`
                      transition
                      ${
                        adminOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  >
                    ▼
                  </span>
                </button>

                {adminOpen && (
                  <div
                    className="
                      absolute right-0 top-12
                      w-56
                      bg-white
                      rounded-2xl
                      shadow-2xl
                      border border-gray-100
                      p-2
                      flex flex-col gap-1
                    "
                  >

                    <Link
                      href="/admin/products"
                      onClick={() =>
                        setAdminOpen(false)
                      }
                      className="
                        px-4 py-3 rounded-xl
                        hover:bg-gray-100
                        transition
                      "
                    >
                      📦 Товари
                    </Link>

                    <Link
                      href="/admin/orders"
                      onClick={() =>
                        setAdminOpen(false)
                      }
                      className="
                        px-4 py-3 rounded-xl
                        hover:bg-gray-100
                        transition
                      "
                    >
                      🧾 Замовлення
                    </Link>

                    <Link
                      href="/admin/categories"
                      onClick={() =>
                        setAdminOpen(false)
                      }
                      className="
                        px-4 py-3 rounded-xl
                        hover:bg-gray-100
                        transition
                      "
                    >
                      🗂 Категорії
                    </Link>

                  </div>
                )}
              </div>
            )}

            {!session ? (
              <>
                <Link href="/login">
                  Увійти
                </Link>

                <Link
                  href="/register"
                  className="
                    bg-[#D9A5A0]
                    text-white
                    px-4 py-2
                    rounded-xl
                  "
                >
                  Реєстрація
                </Link>
              </>
            ) : (
              <>
                <Link href="/cart">
                  🛒 Кошик
                </Link>

                <Link href="/profile">
                  👤 Профіль
                </Link>

                <span className="text-gray-500 text-xs">
                  {session.user?.email}
                </span>

                {isAdmin && (
                  <span
                    className="
                      bg-green-100
                      text-green-700
                      px-2 py-1
                      rounded-full
                      text-xs
                      font-bold
                    "
                  >
                    ADMIN
                  </span>
                )}

                <button
                  onClick={() => signOut()}
                  className="
                    text-red-500
                    hover:text-red-700
                  "
                >
                  Вийти
                </button>
              </>
            )}

          </div>
        </div>

        {/* 📱 MOBILE */}

        <div
          className="
            flex md:hidden
            flex-wrap
            justify-center
            gap-4
            text-sm font-semibold
          "
        >

          <Link href="/">Головна</Link>
          <Link href="/catalog">Товари</Link>
          <Link href="/categories">Категорії</Link>
          <Link href="/hits">🔥 Хіти</Link>
          <Link href="/new">🆕 Новинки</Link>
          <Link href="/sale">💰 Знижки</Link>

          {isAdmin && (
            <div className="relative z-50">

              <button
                onClick={() =>
                  setAdminOpen(!adminOpen)
                }
                className="
                  flex items-center gap-2
                  text-green-600
                  font-semibold
                "
              >
                ⚙️ Управління

                <span
                  className={`
                    transition
                    ${
                      adminOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                >
                  ▼
                </span>
              </button>

              {adminOpen && (
                <div
                  className="
                    absolute left-1/2
                    -translate-x-1/2
                    top-10
                    w-52
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border border-gray-100
                    p-2
                    flex flex-col gap-1
                  "
                >

                  <Link
                    href="/admin/products"
                    onClick={() =>
                      setAdminOpen(false)
                    }
                    className="
                      px-4 py-3 rounded-xl
                      hover:bg-gray-100
                    "
                  >
                    📦 Товари
                  </Link>

                  <Link
                    href="/admin/orders"
                    onClick={() =>
                      setAdminOpen(false)
                    }
                    className="
                      px-4 py-3 rounded-xl
                      hover:bg-gray-100
                    "
                  >
                    🧾 Замовлення
                  </Link>

                  <Link
                    href="/admin/categories"
                    onClick={() =>
                      setAdminOpen(false)
                    }
                    className="
                      px-4 py-3 rounded-xl
                      hover:bg-gray-100
                    "
                  >
                    🗂 Категорії
                  </Link>

                </div>
              )}
            </div>
          )}

          {session ? (
            <>
              <Link href="/cart">
                🛒 Кошик
              </Link>

              <Link href="/profile">
                👤 Профіль
              </Link>

              <span className="text-gray-500 text-xs">
                {session.user?.email}
              </span>

              <button
                onClick={() => signOut()}
                className="text-red-500"
              >
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                Увійти
              </Link>

              <Link href="/register">
                Реєстрація
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  )
}