import { prisma } from "@/lib/prisma"

// Функція перевірки прав адміністратора
import { requireAdmin } from "@/lib/isAdmin"

import ConfirmButton from "./ConfirmButton"

export default async function AdminOrders() {

  // Перевірка, чи користувач є адміністратором
  const admin = await requireAdmin()

  // Якщо користувач не адмін — показуємо повідомлення
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

  // Отримання всіх замовлень із бази даних
  const orders = await prisma.order.findMany({

    // Сортування від нових до старих
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Заголовок сторінки */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          🧾 Замовлення
        </h1>

        {/* Декоративна лінія */}
        <div
          className="
            w-16 h-1
            bg-gradient-to-r
            from-[#3F5F56]
            to-[#D9A5A0]
            mt-2 rounded-full
          "
        />

      </div>

      {/* Список замовлень */}
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

            {/* Верхня частина картки */}
            <div className="flex justify-between mb-2">

              {/* Номер замовлення */}
              <p className="font-semibold">
                Замовлення #{o.orderNumber ?? o.id.slice(0, 6)}
              </p>

              {/* Загальна сума */}
              <p className="text-[#D9A5A0] font-bold">
                {o.total} грн
              </p>

            </div>

            {/* Email користувача */}
            <p className="text-sm text-gray-500">
              {o.email}
            </p>

            {/* Статус замовлення */}
            <p className="mt-2">
              Статус:{" "}

              <span className="font-semibold">
                {o.status}
              </span>
            </p>

            {/* Кнопка підтвердження */}
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