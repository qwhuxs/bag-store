"use client"

// Компонент для навігації між сторінками
import Link from "next/link"

// useSession для отримання даних авторизації
// signOut для виходу з акаунта
import {
  useSession,
  signOut,
} from "next-auth/react"

// useState для керування станом меню
import { useState } from "react"

export default function Header() {

  // Отримання сесії користувача
  const { data: session } = useSession()

  // Стан відкриття адмін-меню
  const [adminOpen, setAdminOpen] =
    useState(false)

  // Перевірка,
  // чи користувач є адміністратором
  const isAdmin =
    session?.user &&
    "role" in session.user &&
    session.user.role === "ADMIN"

  return (

    // Header сайту
    <header
      className="
        bg-white
        shadow-md
        px-8 py-5
        sticky top-0 z-50
      "
    >

      {/* Контейнер */}
      <div
        className="
          max-w-7xl mx-auto
          flex justify-between items-center
        "
      >

        {/* Логотип */}
        <Link
          href="/"

          className="
            text-3xl
            font-black
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

        {/* Навігація */}
        <nav
          className="
            flex items-center
            gap-8
            text-[17px]
          "
        >

          {/* Головна */}
          <Link
            href="/"
            className="hover:text-[#3F5F56] transition"
          >
            Головна
          </Link>

          {/* Каталог */}
          <Link
            href="/catalog"
            className="hover:text-[#3F5F56] transition"
          >
            Товари
          </Link>

          {/* Категорії */}
          <Link
            href="/categories"
            className="hover:text-[#3F5F56] transition"
          >
            Категорії
          </Link>

          {/* Хіти продажу */}
          <Link
            href="/hits"
            className="hover:text-[#3F5F56] transition"
          >
            🔥 Хіти
          </Link>

          {/* Знижки */}
          <Link
            href="/sale"
            className="hover:text-[#3F5F56] transition"
          >
            💰 Знижки
          </Link>

         {/* Адмін-меню */}
{isAdmin && (

  <div className="relative">

    {/* Кнопка відкриття меню */}
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

      {/* Іконка стрілки */}
      <span
        className={`
          transition duration-300
          ${adminOpen ? "rotate-180" : ""}
        `}
      >
        ▼
      </span>

    </button>

    {/* Dropdown меню */}
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

          {/* Управління товарами */}
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

          {/* Управління замовленнями */}
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

          {/* Управління категоріями */}
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

          {/* Блок користувача */}
          {session ? (

            <>

              {/* Кошик */}
              <Link
                href="/cart"

                className="
                  hover:text-[#3F5F56]
                  transition
                "
              >
                🛒 Кошик
              </Link>

              {/* Профіль */}
              <Link
                href="/profile"

                className="
                  hover:text-[#3F5F56]
                  transition
                "
              >
                👤 Профіль
              </Link>

              {/* Email користувача */}
              <span className="text-gray-500 text-sm">

                {session.user?.email}

              </span>

              {/* Кнопка виходу */}
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

            // Якщо користувач не авторизований
            <div className="flex gap-3">

              {/* Вхід */}
              <Link
                href="/login"

                className="
                  hover:text-[#3F5F56]
                  transition
                "
              >
                Увійти
              </Link>

              {/* Реєстрація */}
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