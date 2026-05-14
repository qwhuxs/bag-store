"use client"

// Компонент для навігації між сторінками
import Link from "next/link"

// useSession для отримання даних сесії
// signOut для виходу з акаунта
import {
  useSession,
  signOut,
} from "next-auth/react"

// useState для відкриття/закриття меню
import { useState } from "react"

export default function Navbar() {

  // Отримання поточної сесії
  const { data: session } = useSession()

  // Стан відкриття адмін-меню
  const [adminOpen, setAdminOpen] =
    useState(false)

  // Перевірка,
  // чи користувач адміністратор
  const isAdmin =
  (session?.user as {
    role?: string
  })?.role === "ADMIN"

  return (

    // Navbar
    <nav
      className="
        sticky top-0 z-50
        backdrop-blur
        bg-white/90
        border-b border-gray-200
      "
    >

      {/* Контейнер */}
      <div
        className="
          max-w-7xl mx-auto
          px-4 md:px-6 py-4
        "
      >

        {/* Логотип для мобільної версії */}
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

        {/* Desktop navbar */}
        <div
          className="
            hidden md:flex
            justify-between items-center
          "
        >

          {/* Логотип */}
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

          {/* Навігаційне меню */}
          <div
            className="
              flex gap-6 items-center
              text-sm font-medium
            "
          >

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

            {/* Адмін-меню */}
            {isAdmin && (

              <div className="relative z-50">

                {/* Кнопка відкриття меню */}
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

                  {/* Анімація стрілки */}
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

                {/* Dropdown меню */}
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

                    {/* Сторінка товарів */}
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

                    {/* Сторінка замовлень */}
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

                    {/* Сторінка категорій */}
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

            {/* Якщо користувач НЕ авторизований */}
            {!session ? (

              <>

                {/* Вхід */}
                <Link href="/login">
                  Увійти
                </Link>

                {/* Реєстрація */}
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

              // Якщо користувач авторизований
              <>

                {/* Кошик */}
                <Link href="/cart">
                  🛒 Кошик
                </Link>

                {/* Профіль */}
                <Link href="/profile">
                  👤 Профіль
                </Link>

                {/* Email користувача */}
                <span className="text-gray-500 text-xs">

                  {session.user?.email}

                </span>

                {/* Badge ADMIN */}
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

                {/* Вихід */}
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

        {/* Мобільна версія navbar */}
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

          {/* Мобільне адмін-меню */}
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

              {/* Dropdown для мобільної версії */}
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

          {/* Блок користувача для мобільної версії */}
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