import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image" 

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const params = await searchParams
  const category = params?.category
  const sort = params?.sort

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
    orderBy:
      sort === "price_asc"
        ? { price: "asc" }
        : sort === "price_desc"
        ? { price: "desc" }
        : undefined,
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="mt-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          {category ? `Категорія: ${category}` : "Всі товари"}
        </h1>

        <div className="w-24 h-1 mt-3 bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] rounded-full" />
      </div>

      <div className="mb-8 flex flex-wrap gap-3">

        <Link
          href={`/catalog?${category ? `category=${category}&` : ""}sort=price_asc`}
          className={`px-4 py-2 rounded-lg border transition ${
            sort === "price_asc"
              ? "bg-[#3F5F56] text-white"
              : "hover:bg-gray-100"
          }`}
        >
          💸 Дешеві спочатку
        </Link>

        <Link
          href={`/catalog?${category ? `category=${category}&` : ""}sort=price_desc`}
          className={`px-4 py-2 rounded-lg border transition ${
            sort === "price_desc"
              ? "bg-[#D9A5A0] text-white"
              : "hover:bg-gray-100"
          }`}
        >
          💎 Дорогі спочатку
        </Link>

        <Link
          href={`/catalog${category ? `?category=${category}` : ""}`}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100"
        >
          🔄 Скинути
        </Link>

      </div>

      {products.length === 0 && (
        <p className="text-gray-500 text-lg">
          Товарів поки немає 😢
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products.map((p) => {
          const hasDiscount = p.discount !== null && p.discount > 0

          const newPrice = hasDiscount
            ? Math.round(p.price * (1 - p.discount! / 100))
            : null

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition overflow-hidden border border-gray-100"
            >

              {/* 🔥 IMAGE + BADGE */}
              <div className="relative h-64 w-full bg-gray-100 overflow-hidden">

                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain transition hover:scale-105"
                />

                {hasDiscount && (
                  <span className="
                    absolute top-2 left-2 z-20
                    bg-red-500 text-white text-xs
                    px-2 py-1 rounded-lg shadow
                  ">
                    -{p.discount}%
                  </span>
                )}

              </div>

              <div className="p-4 flex flex-col gap-2">

                <h3 className="font-semibold text-gray-800">
                  {p.name}
                </h3>

                <div className="flex items-center gap-2">

                  {hasDiscount ? (
                    <>
                      <p className="line-through text-gray-400 text-sm">
                        {p.price} грн
                      </p>

                      <p className="text-red-500 font-bold text-lg">
                        {newPrice} грн
                      </p>
                    </>
                  ) : (
                    <p className="text-[#D9A5A0] font-bold text-lg">
                      {p.price} грн
                    </p>
                  )}

                </div>

                <p className="text-sm text-gray-500">
                  {p.category.name}
                </p>

                <Link
                  href={`/product/${p.id}`}
                  className="mt-3 text-center bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] text-white py-2 rounded-lg hover:scale-105 transition"
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