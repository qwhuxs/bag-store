import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const category = params?.category

  const products = await prisma.product.findMany({
    where: category
      ? {
          category: {
            name: category,
          },
        }
      : {},
    include: {
      category: true,
    },
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* 🔥 ЗАГОЛОВОК ЯК У КАТЕГОРІЯХ */}
      <div className="mt-6 mb-10">

        <h1 className="
          text-4xl font-bold
          text-gray-800
        ">
          {category ? `Категорія: ${category}` : "Всі товари"}
        </h1>

        <div className="
          w-24 h-1 mt-3
          bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
          rounded-full
        " />

      </div>

      {/* ❌ Немає товарів */}
      {products.length === 0 && (
        <p className="text-gray-500 text-lg">
          Товарів поки немає 😢
        </p>
      )}

      {/* 🛍 ТОВАРИ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products.map((p) => (
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

            {/* 🖼 IMAGE */}
            <div className="h-64 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-contain transition hover:scale-105"
              />
            </div>

            {/* 📄 CONTENT */}
            <div className="p-4 flex flex-col gap-2">

              <h3 className="font-semibold text-gray-800">
                {p.name}
              </h3>

              <p className="text-[#D9A5A0] font-bold text-lg">
                {p.price} грн
              </p>

              <p className="text-sm text-gray-500">
                {p.category.name}
              </p>

              <Link
                href={`/product/${p.id}`}
                className="
                  mt-3 text-center
                  bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
                  text-white py-2 rounded-lg
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