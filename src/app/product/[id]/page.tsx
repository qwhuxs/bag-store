import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/AddToCartButton"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  })

  if (!product) return notFound()

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <div className="grid md:grid-cols-2 gap-8">

        {/* 🖼️ КАРТИНКА */}
<div className="h-[500px] w-full overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
  <img
    src={product.image}
    alt={product.name}
    className="h-full w-full object-contain transition hover:scale-105"
  />
</div>

        {/* 📦 ІНФО */}
        <div>
          <h1 className="text-3xl font-bold mb-3">
            {product.name}
          </h1>

          <p className="text-[#D9A5A0] text-2xl font-semibold mb-4">
            {product.price} грн
          </p>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Категорія: {product.category.name}
          </p>

          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  )
}