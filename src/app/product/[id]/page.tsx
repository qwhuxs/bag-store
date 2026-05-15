import { prisma } from "@/lib/prisma"

// Функція для показу сторінки 404
import { notFound } from "next/navigation"

// Кнопка додавання товару в кошик
import AddToCartButton from "@/components/AddToCartButton"

// Компонент форми відгуку
import ReviewForm from "@/components/ReviewForm"

// Компонент Next.js для оптимізації зображень
import Image from "next/image" 

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  // Отримання id товару з URL
  const { id } = await params

  // Пошук товару в базі даних
  const product = await prisma.product.findUnique({
    where: { id },

    include: {

      // Підключення категорії
      category: true,

      // Підключення відгуків
      reviews: {

        include: {

          // Підключення користувача,
          // який залишив відгук
          user: true,
        },

        // Сортування від нових до старих
        orderBy: {
          id: "desc",
        },
      },
    },
  })

  // Якщо товар не знайдено — 404
  if (!product) return notFound()

  // Обчислення середнього рейтингу
  const avgRating =
    product.reviews.length > 0
      ? (
          product.reviews.reduce(
            (sum, r) => sum + r.rating,
            0
          ) / product.reviews.length
        ).toFixed(1)
      : null

  // Перевірка наявності знижки
  const hasDiscount =
    product.discount !== null &&
    product.discount > 0

  // Обчислення ціни зі знижкою
  const discountedPrice = hasDiscount
    ? Math.round(
        product.price *
        (1 - product.discount! / 100)
      )
    : null

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Блок товару */}
      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* Блок зображення */}
        <div className="
          relative h-[500px] w-full
          rounded-2xl
          bg-gradient-to-br from-gray-50 to-gray-200
          shadow-xl
          flex items-center justify-center
          overflow-hidden group
        ">

          {/* Badge зі знижкою */}
          {hasDiscount && (
            <div
              className="
                absolute top-4 left-4 z-20
                bg-red-500 text-white
                px-3 py-1 rounded-full
                text-sm font-bold shadow
              "
            >
              -{product.discount}%
            </div>
          )}

          {/* Ефект при наведенні */}
          <div className="
            absolute inset-0
            bg-gradient-to-tr
            from-[#D9A5A0]/20
            to-[#3F5F56]/20
            opacity-0
            group-hover:opacity-100
            transition duration-500
          " />

          {/* Фото товару */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority

            sizes="
              (max-width: 768px) 100vw,
              50vw
            "

            className="
              h-[85%]
              object-contain
              transition duration-500
              group-hover:scale-110
            "
          />
        </div>

        {/* Інформація про товар */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">

          {/* Назва товару */}
          <h1 className="text-3xl font-bold mb-2">
            {product.name}
          </h1>

          {/* Середній рейтинг */}
          {avgRating && (
            <p className="text-yellow-500 mb-2">
              ⭐ {avgRating} / 5
            </p>
          )}

          {/* Блок ціни */}
          <div className="mb-4">

            {hasDiscount ? (
              <div className="flex items-center gap-3">

                {/* Нова ціна */}
                <span
                  className="
                    text-2xl
                    text-red-500
                    font-bold
                  "
                >
                  {discountedPrice} грн
                </span>

                {/* Стара ціна */}
                <span
                  className="
                    text-gray-400
                    line-through
                  "
                >
                  {product.price} грн
                </span>

              </div>
            ) : (

              // Якщо знижки немає
              <p
                className="
                  text-[#D9A5A0]
                  text-2xl
                  font-semibold
                "
              >
                {product.price} грн
              </p>
            )}

          </div>

          {/* Опис товару */}
          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          {/* Категорія */}
          <p className="text-sm text-gray-500 mb-4">
            Категорія: {product.category.name}
          </p>

          {/* Статус наявності */}
          <div className="mb-4">

            {product.stock === 0 ? (

              // Якщо товар закінчився
              <p className="text-red-500 font-semibold">
                ❌ Немає в наявності
              </p>

            ) : product.stock <= 5 ? (

              // Якщо залишилось мало товару
              <p className="text-yellow-600 font-semibold">
                ⚠️ Залишилось {product.stock} шт
              </p>

            ) : (

              // Якщо товар є в наявності
              <p className="text-green-600 font-medium">
                ✅ В наявності
              </p>
            )}

          </div>

          {/* Кнопка додавання в кошик */}
          <AddToCartButton
            productId={product.id}

            // Блокування кнопки,
            // якщо товару немає
            disabled={product.stock === 0}
          />

        </div>
      </div>

      {/* Блок відгуків */}
      <div className="mt-16">

        <h2 className="text-2xl font-bold mb-6">
          Відгуки
        </h2>

        {/* Якщо відгуків немає */}
        {product.reviews.length === 0 ? (

          <p className="text-gray-500">
            Поки що немає відгуків
          </p>

        ) : (

          // Виведення всіх відгуків
          <div className="space-y-4">

            {product.reviews.map((review) => (
              <div
                key={review.id}

                className="
                  bg-white
                  p-4 rounded-xl
                  shadow
                "
              >

                {/* Верхня частина відгуку */}
                <div className="flex justify-between mb-2">

                  {/* Ім’я користувача */}
                  <span className="font-medium">
                    {review.user?.name ||
                      "Користувач"}
                  </span>

                  {/* Рейтинг у вигляді зірок */}
                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>

                </div>

                {/* Текст відгуку */}
                <p
  className="
    text-gray-700
    text-sm
    break-words
    whitespace-pre-wrap
  "
>
  {review.comment}
</p>

              </div>
            ))}

          </div>
        )}

        {/* Форма додавання відгуку */}
        <ReviewForm productId={product.id} />

      </div>
    </div>
  )
}