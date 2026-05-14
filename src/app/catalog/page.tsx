import { prisma } from "@/lib/prisma"
import Link from "next/link"

// Next/Image використовується для оптимізації зображень
import Image from "next/image" 

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {

  // Отримання параметрів із URL
  const params = await searchParams

  // Поточна категорія
  const category = params?.category

  // Поточне сортування
  const sort = params?.sort

  // Отримання товарів із бази даних
  const products = await prisma.product.findMany({

    // Фільтрація товарів за категорією
    where: category
      ? {
          category: {
            name: category,
          },
        }
      : {},

    // Підключення інформації про категорію
    include: {
      category: true,
    },

    // Сортування товарів за ціною
    orderBy:
      sort === "price_asc"
        ? { price: "asc" }

        : sort === "price_desc"
        ? { price: "desc" }

        : undefined,
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Заголовок сторінки */}
      <div className="mt-6 mb-6">

        <h1 className="text-4xl font-bold text-gray-800">

          {/* Якщо є категорія — показуємо її назву */}
          {category
            ? `Категорія: ${category}`
            : "Всі товари"}

        </h1>

        {/* Декоративна лінія */}
        <div
          className="
            w-24 h-1 mt-3
            bg-gradient-to-r
            from-[#3F5F56]
            to-[#D9A5A0]
            rounded-full
          "
        />

      </div>

      {/* Кнопки сортування */}
      <div className="mb-8 flex flex-wrap gap-3">

        {/* Сортування від дешевих */}
        <Link
          href={`/catalog?${
            category ? `category=${category}&` : ""
          }sort=price_asc`}

          className={`
            px-4 py-2 rounded-lg
            border transition
            ${
              sort === "price_asc"
                ? "bg-[#3F5F56] text-white"
                : "hover:bg-gray-100"
            }
          `}
        >
          💸 Дешеві спочатку
        </Link>

        {/* Сортування від дорогих */}
        <Link
          href={`/catalog?${
            category ? `category=${category}&` : ""
          }sort=price_desc`}

          className={`
            px-4 py-2 rounded-lg
            border transition
            ${
              sort === "price_desc"
                ? "bg-[#D9A5A0] text-white"
                : "hover:bg-gray-100"
            }
          `}
        >
          💎 Дорогі спочатку
        </Link>

        {/* Скидання фільтрів */}
        <Link
          href={`/catalog${
            category ? `?category=${category}` : ""
          }`}

          className="
            px-4 py-2 rounded-lg
            border hover:bg-gray-100
          "
        >
          🔄 Скинути
        </Link>

      </div>

      {/* Якщо товарів немає */}
      {products.length === 0 && (
        <p className="text-gray-500 text-lg">
          Товарів поки немає 😢
        </p>
      )}

      {/* Сітка товарів */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
        "
      >

        {products.map((p) => {

          // Перевірка, чи є знижка
          const hasDiscount =
            p.discount !== null && p.discount > 0

          // Обчислення нової ціни зі знижкою
          const newPrice = hasDiscount
            ? Math.round(
                p.price * (1 - p.discount! / 100)
              )
            : null

          return (
            <div
              key={p.id}

              className="
                bg-white
                rounded-2xl
                shadow-md
                hover:shadow-xl
                hover:-translate-y-1
                transition
                overflow-hidden
                border border-gray-100
              "
            >

              {/* Блок зображення */}
              <div
                className="
                  relative
                  h-64 w-full
                  bg-gray-100
                  overflow-hidden
                "
              >

                {/* Оптимізоване зображення */}
                <Image
                  src={p.image}
                  alt={p.name}
                  fill

                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    25vw
                  "

                  className="
                    object-contain
                    transition
                    hover:scale-105
                  "
                />

                {/* Badge зі знижкою */}
                {hasDiscount && (
                  <span
                    className="
                      absolute top-2 left-2 z-20
                      bg-red-500 text-white text-xs
                      px-2 py-1 rounded-lg shadow
                    "
                  >
                    -{p.discount}%
                  </span>
                )}

              </div>

              {/* Інформація про товар */}
              <div className="p-4 flex flex-col gap-2">

                <h3 className="font-semibold text-gray-800">
                  {p.name}
                </h3>

                {/* Блок ціни */}
                <div className="flex items-center gap-2">

                  {hasDiscount ? (
                    <>

                      {/* Стара ціна */}
                      <p
                        className="
                          line-through
                          text-gray-400
                          text-sm
                        "
                      >
                        {p.price} грн
                      </p>

                      {/* Нова ціна */}
                      <p
                        className="
                          text-red-500
                          font-bold text-lg
                        "
                      >
                        {newPrice} грн
                      </p>

                    </>
                  ) : (

                    // Якщо знижки немає
                    <p
                      className="
                        text-[#D9A5A0]
                        font-bold text-lg
                      "
                    >
                      {p.price} грн
                    </p>
                  )}

                </div>

                {/* Назва категорії */}
                <p className="text-sm text-gray-500">
                  {p.category.name}
                </p>

                {/* Перехід на сторінку товару */}
                <Link
                  href={`/product/${p.id}`}

                  className="
                    mt-3 text-center
                    bg-gradient-to-r
                    from-[#3F5F56]
                    to-[#D9A5A0]
                    text-white py-2 rounded-lg
                    hover:scale-105
                    transition
                  "
                >
                  Детальніше
                </Link>

              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}