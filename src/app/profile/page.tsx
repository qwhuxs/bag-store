import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProfileClient from "@/components/ProfileClient"
import ReviewFormInline from "@/components/ReviewFormInline"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      reviews: true,
      orders: {
        orderBy: { createdAt: "desc" },
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

  if (!user) redirect("/login")

  return (
    <div>

      {/* 👤 PROFILE */}
      <ProfileClient user={user} />

      {/* 📦 ORDERS */}
      <h2 className="text-2xl font-bold mb-6">
        Мої замовлення
      </h2>

      {!user.orders.length ? (
        <p className="text-gray-500">
          У вас ще немає замовлень
        </p>
      ) : (
        <div className="flex flex-col gap-6">

          {user.orders.map((order) => (
            <div
              key={order.id}
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
                border border-gray-100
                hover:shadow-lg
                transition
              "
            >

              {/* HEADER */}
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold text-lg">
                    🧾 Замовлення #
                    {order.orderNumber
                      ? String(order.orderNumber).padStart(4, "0")
                      : order.id.slice(0, 6)}
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <p className="font-bold text-lg">
                  {order.total} грн
                </p>
              </div>

          

              {/* ITEMS */}
              {order.items.map((item) => {
                const alreadyReviewed = user.reviews.some(
                  (r) => r.productId === item.product.id
                )

                return (
                  <div key={item.id} className="flex gap-4 items-center mt-3">

                    <img
                      src={item.product.image}
                      className="w-16 h-16 rounded-lg object-cover shadow-sm"
                    />

                    <div className="flex-1">
                      <p className="font-medium">
                        {item.product.name}
                      </p>

                      {alreadyReviewed ? (
                        <p className="text-green-600 text-sm mt-1">
                          ✔ Відгук вже є
                        </p>
                      ) : (
                        <div className="mt-2">
                          <ReviewFormInline productId={item.product.id} />
                        </div>
                      )}
                    </div>

                  </div>
                )
              })}

            </div>
          ))}

        </div>
      )}
    </div>
  )
}