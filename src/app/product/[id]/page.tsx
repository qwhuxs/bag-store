import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/AddToCartButton"
import ReviewForm from "@/components/ReviewForm"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: {
        include: {
          user: true,
        },
        orderBy: {
          id: "desc",
        },
      },
    },
  })

  if (!product) return notFound()

  const avgRating =
    product.reviews.length > 0
      ? (
          product.reviews.reduce((sum, r) => sum + r.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : null

  const discountedPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : null

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* 🔝 ПРОДУКТ */}
      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* 🖼️ КАРТИНКА */}
        <div className="
          relative h-[500px] w-full
          rounded-2xl
          bg-gradient-to-br from-gray-50 to-gray-200
          shadow-xl
          flex items-center justify-center
          overflow-hidden group
        ">
          {/* 🔥 DISCOUNT BADGE */}
          {product.discount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow">
              -{product.discount}%
            </div>
          )}

          <div className="
            absolute inset-0
            bg-gradient-to-tr from-[#D9A5A0]/20 to-[#3F5F56]/20
            opacity-0 group-hover:opacity-100
            transition duration-500
          " />

          <img
            src={product.image}
            alt={product.name}
            className="
              h-[85%]
              object-contain
              transition duration-500
              group-hover:scale-110
            "
          />
        </div>

        {/* 📦 ІНФО */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h1 className="text-3xl font-bold mb-2">
            {product.name}
          </h1>

          {/* ⭐ РЕЙТИНГ */}
          {avgRating && (
            <p className="text-yellow-500 mb-2">
              ⭐ {avgRating} / 5
            </p>
          )}

          {/* 💰 ЦІНИ */}
          <div className="mb-4">
            {product.discount ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl text-red-500 font-bold">
                  {discountedPrice} грн
                </span>

                <span className="text-gray-400 line-through">
                  {product.price} грн
                </span>
              </div>
            ) : (
              <p className="text-[#D9A5A0] text-2xl font-semibold">
                {product.price} грн
              </p>
            )}
          </div>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Категорія: {product.category.name}
          </p>

          {/* 📦 СТАТУС */}
          <div className="mb-4">
            {product.stock === 0 ? (
              <p className="text-red-500 font-semibold">
                ❌ Немає в наявності
              </p>
            ) : product.stock <= 5 ? (
              <p className="text-yellow-600 font-semibold">
                ⚠️ Залишилось {product.stock} шт
              </p>
            ) : (
              <p className="text-green-600 font-medium">
                ✅ В наявності
              </p>
            )}
          </div>

          <AddToCartButton
            productId={product.id}
            disabled={product.stock === 0}
          />
        </div>
      </div>

      {/* ⭐ ВІДГУКИ */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Відгуки
        </h2>

        {product.reviews.length === 0 ? (
          <p className="text-gray-500">
            Поки що немає відгуків
          </p>
        ) : (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-4 rounded-xl shadow"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    {review.user?.name || "Користувач"}
                  </span>

                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>
                </div>

                <p className="text-gray-700 text-sm">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}

        <ReviewForm productId={product.id} />
      </div>
    </div>
  )
}