import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image" 

export default async function SalePage() {
  const products = await prisma.product.findMany({
    where: {
      discount: {
        not: null,
      },
    },
  })

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">💰 Знижки</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((p) => {
          const newPrice = Math.round(
            p.price * (1 - p.discount! / 100)
          )

          return (
            <div
              key={p.id}
              className="border p-4 rounded-xl flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>

                {/* ✅ ВИПРАВЛЕНИЙ IMAGE + БЕЙДЖ */}
                <div className="relative h-40 w-full">

                  {/* IMAGE */}
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover rounded-lg"
                  />

                  {/* BADGE */}
                  {p.discount && (
                    <span className="
                      absolute top-2 left-2 z-20
                      bg-red-500 text-white text-xs
                      px-2 py-1 rounded-lg shadow
                    ">
                      -{p.discount}%
                    </span>
                  )}

                </div>

                <p className="mt-2 font-semibold">{p.name}</p>

                <p className="line-through text-gray-400">
                  {p.price} грн
                </p>

                <p className="text-red-500 font-bold text-lg">
                  {newPrice} грн
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
          )
        })}
      </div>
    </div>
  )
}