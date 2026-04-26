import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 8,
  })

  return (
    <div className="p-6 space-y-10">

      <div className="bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] text-white p-10 rounded-xl text-center">
        <h1 className="text-4xl font-bold mb-3">
          Стильні сумки від Euphoria
        </h1>

        <p className="mb-5 text-lg">
          Знайди ідеальний аксесуар для будь-якого випадку
        </p>

        <Link
          href="/catalog"
          className="bg-white text-[#3F5F56] px-6 py-2 rounded-md font-medium"
        >
          Перейти до каталогу
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Рекомендовані товари
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl p-3 shadow-sm hover:shadow-lg transition"
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

              <Link
                href={`/product/${p.id}`}
                className="mt-2 block text-center w-full bg-[#D9A5A0] text-white py-1 rounded"
              >
                Детальніше
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}