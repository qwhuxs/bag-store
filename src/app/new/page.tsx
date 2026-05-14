import { prisma } from "@/lib/prisma"
import Link from "next/link"

// Компонент Next.js для оптимізації зображень
import Image from "next/image"

export default async function NewPage() {

  // Отримання нових товарів із бази даних
  let products = await prisma.product.findMany({

    // Сортування від нових до старих
    orderBy: { createdAt: "desc" },

    // Максимальна кількість товарів
    take: 20,
  })

  // Випадкове перемішування товарів
  products = products

    // Random сортування
    .sort(() => 0.5 - Math.random())

    // Вибір перших 8 товарів
    .slice(0, 8)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Заголовок сторінки */}
      <h1
        className="
          text-3xl md:text-5xl
          font-black
          mb-10
          text-center md:text-left
          text-[#1f2d4d]
        "
      >
        🆕 Новинки
      </h1>

      {/* Сітка товарів */}
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-5
        "
      >

        {/* Виведення товарів */}
        {products.map((p) => (
          <div
            key={p.id}

            className="
              bg-white
              rounded-3xl
              shadow-md
              hover:shadow-2xl
              transition
              overflow-hidden
              flex flex-col
              group
            "
          >

            {/* Блок зображення */}
            <div
              className="
                relative
                h-52 w-full
                overflow-hidden
              "
            >

              {/* Оптимізоване зображення */}
              <Image
                src={p.image}
                alt={p.name}
                fill

                sizes="
                  (max-width: 768px) 50vw,
                  25vw
                "

                className="
                  object-cover
                  group-hover:scale-110
                  transition duration-500
                "
              />

            </div>

            {/* Контент картки */}
            <div className="p-4 flex flex-col flex-1">

              {/* Назва товару */}
              <h2
                className="
                  font-bold
                  text-sm md:text-lg
                  line-clamp-2
                  text-gray-800
                  min-h-[48px]
                "
              >
                {p.name}
              </h2>

              {/* Ціна товару */}
              <p
                className="
                  text-[#D9A5A0]
                  font-extrabold
                  text-lg md:text-2xl
                  mt-2
                "
              >
                {p.price} грн
              </p>

              {/* Кнопка переходу */}
              <Link
                href={`/product/${p.id}`}

                className="
                  mt-4
                  text-center
                  bg-gradient-to-r
                  from-[#3F5F56]
                  to-[#D9A5A0]
                  text-white
                  py-3
                  rounded-xl
                  font-medium
                  hover:scale-105
                  transition
                "
              >
                Детальніше
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}