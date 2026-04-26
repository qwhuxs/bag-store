import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import CartItem from "@/components/CartItem"
import Link from "next/link"

export default async function CartPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl mb-4">Увійдіть у свій акаунт</h2>
        <Link href="/login" className="text-blue-500 underline">
          Перейти до входу
        </Link>
      </div>
    )
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cart: {
        include: {
          items: {
            include: { product: true },
          },
        },
      },
    },
  })

  if (!user?.cart || user.cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-semibold mb-2">
          Ваш кошик порожній
        </h2>
        <p className="text-gray-500 mb-6">
          Додайте товари, щоб оформити замовлення
        </p>
        <Link
          href="/catalog"
          className="bg-[#3F5F56] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Перейти до товарів
        </Link>
      </div>
    )
  }

  const total = user.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        🛒 Ваш кошик
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* ТОВАРИ */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {user.cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* ПІДСУМОК */}
        <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-20">

          <h2 className="text-xl font-semibold mb-4">
            Підсумок
          </h2>

<div className="flex justify-between mb-2 text-gray-600">
  <span>Товарів:</span>
  <span>
    {user.cart.items.reduce((sum, item) => sum + item.quantity, 0)} шт
  </span>
</div>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Сума:</span>
            <span>{total} грн</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Всього:</span>
            <span>{total} грн</span>
          </div>

          <Link
            href="/checkout"
            className="block mt-6 text-center bg-[#3F5F56] text-white py-3 rounded-lg hover:scale-105 hover:shadow-md transition"
          >
            Оформити замовлення
          </Link>
        </div>
      </div>
    </div>
  )
}