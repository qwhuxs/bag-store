import { prisma } from "@/lib/prisma"
import Link from "next/link"
import ProductSlider from "@/components/ProductSlider"

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 20,
  })

  const shuffled = products.sort(() => 0.5 - Math.random())

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* 🔥 HERO */}
      <div className="
        rounded-2xl
        bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
        p-12 text-center text-white mb-14 shadow-lg
      ">
        <h1 className="text-4xl font-bold mb-4">
          Стильні сумки від Euphoria
        </h1>

        <p className="mb-6 text-lg opacity-90">
          Знайди ідеальний аксесуар для будь-якого випадку
        </p>

        <Link
          href="/catalog"
          className="
            bg-white text-black px-6 py-3 rounded-lg
            font-medium hover:scale-105 transition
          "
        >
          Перейти до каталогу
        </Link>
      </div>

      {/* 🛍️ РЕКОМЕНДОВАНІ */}
      <div className="flex justify-center mb-10">
        <div className="p-[2px] bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] rounded-xl">
          <div className="bg-white px-10 py-4 rounded-xl">
            <h2 className="text-2xl font-semibold text-center tracking-wide">
              Рекомендовані товари
            </h2>
          </div>
        </div>
      </div>

      <ProductSlider products={shuffled} />

      {/* 🎯 КАТЕГОРІЇ */}
      <div className="flex justify-center mt-16 mb-10">
        <div className="p-[2px] bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] rounded-xl">
          <div className="bg-white px-10 py-4 rounded-xl">
            <h2 className="text-2xl font-semibold text-center tracking-wide">
              Категорії
            </h2>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 w-max">

          {[
            { name: "Рюкзаки", img: "/images/foto1.jpg" },
            { name: "Сумки через плече", img: "/images/foto20.jpg" },
            { name: "Клатчі", img: "/images/foto30.jpg" },
            { name: "Сумки-тоут", img: "/images/foto40.jpg" },
            { name: "Спортивні сумки", img: "/images/foto50.jpg" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/categories/${encodeURIComponent(cat.name)}`}
              className="
                relative min-w-[260px] h-40
                rounded-xl overflow-hidden group
                shadow-md hover:shadow-xl transition
              "
            >
              <img
                src={cat.img}
                className="
                  absolute w-full h-full object-cover
                  group-hover:scale-110 transition duration-500
                "
              />

              <div className="
                absolute inset-0 bg-black/40
                flex items-center justify-center
              ">
                <span className="
                  text-white text-lg font-semibold
                  group-hover:scale-110 transition
                ">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}

        </div>
      </div>

    </div>
  )
}