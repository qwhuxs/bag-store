import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import CartItem from "@/components/CartItem"

export default async function CartPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return <div className="p-6">Увійдіть у свій акаунт</div>
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      cart: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  })

  if (!user?.cart || user.cart.items.length === 0) {
    return <div className="p-6">Кошик пустий 🛒</div>
  }

  const total = user.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Кошик</h1>

      {/* 📦 Список товарів */}
      <div className="flex flex-col gap-6">
        {user.cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* 💳 Підсумок */}
      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <h2 className="text-xl font-bold">
          Всього: {total} грн
        </h2>

        <button className="bg-[#3F5F56] text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
          Оформити замовлення
        </button>
      </div>
    </div>
  )
}