import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"
import ConfirmButton from "./ConfirmButton"

export default async function AdminOrders() {
  const admin = await requireAdmin()

  // 🔐 якщо не адмін — не ламаємо сайт
  if (!admin) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">
          🚫 Доступ заборонено
        </h1>
        <p className="text-gray-500 mt-2">
          У вас немає прав адміністратора
        </p>
      </div>
    )
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* 🔝 HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🧾 Замовлення
        </h1>

        <div className="w-16 h-1 bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] mt-2 rounded-full" />
      </div>

      {/* 📦 LIST */}
      <div className="grid gap-4">

        {orders.map((o) => (
          <div
            key={o.id}
            className="
              bg-white border border-gray-100
              p-5 rounded-xl shadow-sm
              hover:shadow-md transition
            "
          >

            <div className="flex justify-between mb-2">
              <p className="font-semibold">
                Замовлення #{o.orderNumber ?? o.id.slice(0, 6)}
              </p>

              <p className="text-[#D9A5A0] font-bold">
                {o.total} грн
              </p>
            </div>

            <p className="text-sm text-gray-500">
              {o.email}
            </p>

            <p className="mt-2">
              Статус:{" "}
              <span className="font-semibold">
                {o.status}
              </span>
            </p>

            {o.status !== "confirmed" && (
              <div className="mt-3">
                <ConfirmButton id={o.id} />
              </div>
            )}

          </div>
        ))}

      </div>

    </div>
  )
}