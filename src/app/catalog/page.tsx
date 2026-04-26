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
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        {category ? `Категорія: ${category}` : "Всі товари"}
      </h1>

      {products.length === 0 && (
        <p className="text-gray-500">
          Товарів поки немає 😢
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
          >
           <div className="h-80 w-full overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
  <img
    src={p.image}
    alt={p.name}
    className="h-full w-full object-contain transition hover:scale-105"
  />
</div>

            <h3 className="mt-2 font-medium">
              {p.name}
            </h3>

            <p className="text-[#D9A5A0] font-bold">
              {p.price} грн
            </p>

            <p className="text-sm text-gray-500">
              {p.category.name}
            </p>

            <Link
              href={`/product/${p.id}`}
              className="mt-3 block text-center bg-[#D9A5A0] text-white py-1 rounded hover:opacity-90 transition"
            >
              Детальніше
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}