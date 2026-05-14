// Отримання сесії авторизованого користувача
import { getServerSession } from "next-auth"

// Налаштування NextAuth
import { authOptions } from "@/lib/auth"

// Prisma ORM для роботи з базою даних
import { prisma } from "@/lib/prisma"

// Компонент окремого товару в кошику
import CartItem from "@/components/CartItem"

import Link from "next/link"

export default async function CartPage() {

  // Отримання поточної сесії користувача
  const session = await getServerSession(authOptions)

  // Якщо користувач не авторизований
  if (!session?.user?.email) {
    return (
      <div className="p-10 text-center">

        <h2 className="text-xl mb-4">
          Увійдіть у свій акаунт
        </h2>

        {/* Перехід на сторінку входу */}
        <Link
          href="/login"
          className="text-blue-500 underline"
        >
          Перейти до входу
        </Link>

      </div>
    )
  }

  // Пошук користувача та його кошика
  const user = await prisma.user.findUnique({
    where: {

      // Пошук за email із сесії
      email: session.user.email,
    },

    include: {
      cart: {

        include: {
          items: {

            // Підключення інформації про товари
            include: { product: true },
          },
        },
      },
    },
  })

  // Якщо кошик порожній
  if (!user?.cart || user.cart.items.length === 0) {
    return (
      <div
        className="
          flex flex-col
          items-center justify-center
          py-20 text-center
        "
      >

        <div className="text-6xl mb-4">
          🛒
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          Ваш кошик порожній
        </h2>

        <p className="text-gray-500 mb-6">
          Додайте товари, щоб оформити замовлення
        </p>

        {/* Перехід до каталогу */}
        <Link
          href="/catalog"

          className="
            bg-[#3F5F56]
            text-white
            px-6 py-3
            rounded-lg
            hover:opacity-90
            transition
          "
        >
          Перейти до товарів
        </Link>

      </div>
    )
  }

  // Обчислення загальної суми замовлення
  const total = user.cart.items.reduce(

    // sum — накопичена сума
    // item — поточний товар
    (sum, item) =>

      // Ціна товару × кількість
      sum + item.product.price * item.quantity,

    0
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Заголовок сторінки */}
      <h1 className="text-3xl font-bold mb-8">
        🛒 Ваш кошик
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Список товарів */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* Виведення всіх товарів у кошику */}
          {user.cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}

        </div>

        {/* Блок підсумку */}
        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow
            h-fit
            sticky top-20
          "
        >

          <h2 className="text-xl font-semibold mb-4">
            Підсумок
          </h2>

          {/* Загальна кількість товарів */}
          <div
            className="
              flex justify-between
              mb-2 text-gray-600
            "
          >

            <span>Товарів:</span>

            <span>
              {
                user.cart.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )
              }{" "}
              шт
            </span>

          </div>

          {/* Загальна сума */}
          <div
            className="
              flex justify-between
              mb-4 text-gray-600
            "
          >

            <span>Сума:</span>

            <span>{total} грн</span>

          </div>

          {/* Фінальний блок суми */}
          <div
            className="
              border-t pt-4
              flex justify-between
              font-bold text-lg
            "
          >

            <span>Всього:</span>

            <span>{total} грн</span>

          </div>

          {/* Перехід до оформлення замовлення */}
          <Link
            href="/checkout"

            className="
              block mt-6
              text-center
              bg-[#3F5F56]
              text-white
              py-3 rounded-lg
              hover:scale-105
              hover:shadow-md
              transition
            "
          >
            Оформити замовлення
          </Link>

        </div>
      </div>
    </div>
  )
}