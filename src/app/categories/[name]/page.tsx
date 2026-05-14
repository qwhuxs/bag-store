import { prisma } from "@/lib/prisma"
import Link from "next/link"

// Компонент Next.js для оптимізації зображень
import Image from "next/image" 

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {

  // Отримання назви категорії з URL
  const { name } = await params

  // Декодування URL
  const categoryName = decodeURIComponent(name)

  // Отримання товарів поточної категорії
  const products = await prisma.product.findMany({
    where: {

      // Фільтрація за назвою категорії
      category: {
        name: categoryName,
      },
    },

    // Підключення інформації про категорію
    include: {
      category: true,
    },
  })

  return (
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

  {/* Виведення всіх товарів */}
  {products.map((product) => (
    <div
      key={product.id}

      className="
        group border rounded-xl
        p-4 bg-white
        hover:shadow-xl
        hover:-translate-y-1
        transition
      "
    >

      {/* Блок зображення */}
      <div
        className="
          h-40 relative
          bg-gray-100
          rounded-lg overflow-hidden
        "
      >

        {/* Оптимізоване зображення */}
        <Image
          src={product.image}
          alt={product.name}
          fill

          sizes="(max-width: 768px) 100vw, 25vw"

          className="
            object-contain
            group-hover:scale-110
            transition
          "
        />

      </div>

      {/* Назва товару */}
      <h3
        className="
          mt-3 font-semibold
          group-hover:text-[#D9A5A0]
          transition
        "
      >
        {product.name}
      </h3>

      {/* Ціна товару */}
      <p className="text-[#3F5F56] font-bold">
        {product.price} грн
      </p>

      {/* Кнопка переходу */}
      <Link
        href={`/product/${product.id}`}

        className="
          block mt-3 text-center
          bg-[#3F5F56]
          text-white py-2 rounded-lg
          hover:scale-105
          hover:shadow-md
          transition
        "
      >
        Детальніше
      </Link>

    </div>
  ))}

</div>
  )
}