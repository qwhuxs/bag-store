import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image" 

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const categoryName = decodeURIComponent(name)

  const products = await prisma.product.findMany({
    where: {
      category: {
        name: categoryName,
      },
    },
    include: {
      category: true,
    },
  })

  return (
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

  {products.map((product) => (
    <div
      key={product.id}
      className="group border rounded-xl p-4 bg-white hover:shadow-xl hover:-translate-y-1 transition"
    >

      {/* 📷 Фото */}
      <div className="h-40 relative bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-contain group-hover:scale-110 transition"
        />
      </div>

      {/* 📦 Назва */}
      <h3 className="mt-3 font-semibold group-hover:text-[#D9A5A0] transition">
        {product.name}
      </h3>

      {/* 💰 Ціна */}
      <p className="text-[#3F5F56] font-bold">
        {product.price} грн
      </p>

      {/* 🔘 КНОПКА */}
      <Link
        href={`/product/${product.id}`}
        className="
          block mt-3 text-center
          bg-[#3F5F56] text-white py-2 rounded-lg
          hover:scale-105 hover:shadow-md transition
        "
      >
        Детальніше
      </Link>

    </div>
  ))}

</div>
  )
}