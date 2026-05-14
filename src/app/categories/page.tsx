import { prisma } from "@/lib/prisma"
import Link from "next/link"

// Компонент Next.js для оптимізації зображень
import Image from "next/image"

export default async function CategoriesPage() {

  // Отримання всіх категорій із бази даних
  const categories = await prisma.category.findMany()

  // Об'єкт із зображеннями для кожної категорії
  const categoryImages: Record<string, string> = {
    "Рюкзаки": "/images/foto1.jpg",
    "Сумки через плече": "/images/foto20.jpg",
    "Клатчі": "/images/foto30.jpg",
    "Сумки-тоут": "/images/foto40.jpg",
    "Спортивні сумки": "/images/foto50.jpg",
    "Сумки на пояс": "/images/foto60.jpg",
    "Сумки-хобо": "/images/foto70.jpg",
    "Дорожні сумки": "/images/foto80.jpg",
    "Еко-сумки": "/images/foto90.jpg",
    "Сумки ручної роботи": "/images/foto97.jpg",
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {/* Виведення всіх категорій */}
      {categories.map((cat) => (
        <Link
          key={cat.id}

          // Перехід на сторінку категорії
          href={`/categories/${encodeURIComponent(cat.name)}`}

          className="
            relative h-40
            rounded-xl overflow-hidden
            group shadow-md
            hover:shadow-xl transition
          "
        >

          {/* Зображення категорії */}
          <Image
            src={
              // Якщо зображення не знайдено — fallback
              categoryImages[cat.name] ||
              "/images/fallback.jpg"
            }

            alt={cat.name}
            fill

            sizes="(max-width: 768px) 100vw, 25vw"

            className="
              object-cover
              group-hover:scale-110
              transition duration-500
            "
          />

          {/* Затемнення поверх картинки */}
          <div
            className="
              absolute inset-0
              bg-black/40
              flex items-center justify-center
            "
          >

            {/* Назва категорії */}
            <span
              className="
                text-white
                text-lg font-semibold
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