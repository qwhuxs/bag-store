import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image" 

export default async function NewPage() {
  let products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  products = products.sort(() => 0.5 - Math.random()).slice(0, 8)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🆕 Новинки</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="
              border p-4 rounded-xl
              hover:shadow-lg transition
              flex flex-col justify-between
            "
          >
            <div>
              {/* ✅ ЗАМІНЕНО */}
              <div className="relative h-40 w-full">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>

              <p className="mt-2 font-semibold">{p.name}</p>

              <p className="text-[#D9A5A0] font-bold">
                {p.price} грн
              </p>
            </div>

            {/* 🔥 КНОПКА */}
            <Link
              href={`/product/${p.id}`}
              className="
                mt-4 text-center
                bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
                text-white py-2 rounded-lg
                hover:scale-105 transition
              "
            >
              Детальніше
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}