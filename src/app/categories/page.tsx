// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// Link для переходів
import Link from "next/link"

// Next/Image для оптимізованих фото
import Image from "next/image"

export default async function CategoriesPage() {

  // Отримання категорій
  const categories =
    await prisma.category.findMany()

  const categoryImages:
    Record<string, string> = {

    "Рюкзаки":
      "/images/foto1.jpg",

    "Сумки через плече":
      "/images/foto20.jpg",

    "Клатчі":
      "/images/foto30.jpg",

    "Сумки-тоут":
      "/images/foto40.jpg",

    "Спортивні сумки":
      "/images/foto50.jpg",

    "Сумки на пояс":
      "/images/foto60.jpg",

    "Сумки-хобо":
      "/images/foto70.jpg",

    "Дорожні сумки":
      "/images/foto80.jpg",

    "Еко-сумки":
      "/images/foto90.jpg",

    "Сумки ручної роботи":
      "/images/foto97.jpg",
  }

  return (

    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-6
      "
    >

      {categories.map((cat) => (

        <Link
          key={cat.id}

          href={`/categories/${encodeURIComponent(cat.name)}`}

          className="
            relative
            h-48
            rounded-xl
            overflow-hidden
            group
            shadow-md
            hover:shadow-xl
            transition
          "
        >

          {/* 🖼️ ФОТО */}
          <Image
            src={
              // 🔥 спочатку upload фото
              cat.image ||

              // 🔥 якщо нема —
              // беремо старе фото
              categoryImages[cat.name] ||

              // fallback
              "/images/fallback.jpg"
            }

            alt={cat.name}

            fill

            sizes="
              (max-width: 768px) 100vw,
              25vw
            "

            className="
object-cover
  w-full
  h-full
  group-hover:scale-110
  transition
  duration-500
            "
          />

          {/* 🌑 OVERLAY */}
          <div
            className="
              absolute inset-0
              bg-black/40
              flex items-center
              justify-center
            "
          >

            <span
              className="
                text-white
                text-lg
                font-semibold
                group-hover:scale-110
                transition
              "
            >
              {cat.name}
            </span>

          </div>

        </Link>
      ))}

    </div>
  )
}