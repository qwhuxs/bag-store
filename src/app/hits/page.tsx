import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

export default async function HitsPage() {
  let products = await prisma.product.findMany({
    take: 20,
  })

  products = products
    .sort(() => 0.5 - Math.random())
    .slice(0, 8)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <h1
        className="
          text-3xl md:text-5xl
          font-black
          mb-10
          text-center md:text-left
          text-[#1f2d4d]
        "
      >
        🔥 Хіти продажу
      </h1>

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-5
        "
      >

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

            {/* IMAGE */}

            <div className="relative h-52 w-full overflow-hidden">

              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="
                  object-cover
                  group-hover:scale-110
                  transition duration-500
                "
              />

            </div>

            {/* CONTENT */}

            <div className="p-4 flex flex-col flex-1">

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

              <p className="text-xs text-gray-400 mt-1">
                Продано: {p.sales}
              </p>

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