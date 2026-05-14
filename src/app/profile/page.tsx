// Отримання сесії авторизованого користувача
import { getServerSession } from "next-auth/next"

// Налаштування NextAuth
import { authOptions } from "@/lib/auth"

// Prisma ORM для роботи з базою даних
import { prisma } from "@/lib/prisma"

// redirect використовується для перенаправлення
import { redirect } from "next/navigation"

// Компонент профілю користувача
import ProfileClient from "@/components/ProfileClient"

// Форма швидкого додавання відгуку
import ReviewFormInline from "@/components/ReviewFormInline"

export default async function ProfilePage() {

  // Отримання поточної сесії
  const session = await getServerSession(authOptions)

  // Якщо користувач не авторизований
  if (!session?.user?.email) {

    // Перенаправлення на сторінку логіну
    redirect("/login")
  }

  // Пошук користувача в базі даних
  const user = await prisma.user.findUnique({
    where: {

      // Пошук за email
      email: session.user.email,
    },

    include: {

      // Підключення відгуків користувача
      reviews: true,

      // Підключення замовлень
      orders: {

        // Сортування замовлень
        orderBy: {
          createdAt: "desc",
        },

        include: {
          items: {

            include: {

              // Підключення товарів у замовленні
              product: true,
            },
          },
        },
      },
    },
  })

  // Якщо користувача не знайдено
  if (!user) redirect("/login")

return (
  <div>

    {/* Профіль користувача */}
    <ProfileClient
      user={{
        email: user.email,

        firstName:
          user.firstName || "",

        lastName:
          user.lastName || "",

        age:
          user.age || "",

        city:
          user.city || "",

        phone:
          user.phone || "",

        image:
          user.image || "",
      }}
    />

{/* Адмін-панель */}
{user.role === "ADMIN" && (
  <div className="mt-12 mb-12">

    <h2 className="text-2xl font-bold mb-6">
      🛠 Адмін-панель
    </h2>

    {/* Посилання для адміністратора */}
    <div className="grid md:grid-cols-3 gap-6">

      {/* Керування товарами */}
      <a
        href="/admin/products"

        className="
          p-6 bg-white
          rounded-xl shadow
          hover:shadow-lg
          transition
        "
      >

        <h3 className="font-semibold text-lg">
          📦 Товари
        </h3>

        <p className="text-sm text-gray-500">
          Додати / редагувати / видалити
        </p>

      </a>

      {/* Керування замовленнями */}
      <a
        href="/admin/orders"

        className="
          p-6 bg-white
          rounded-xl shadow
          hover:shadow-lg
          transition
        "
      >

        <h3 className="font-semibold text-lg">
          🧾 Замовлення
        </h3>

        <p className="text-sm text-gray-500">
          Підтвердження замовлень
        </p>

      </a>

      {/* Керування категоріями */}
      <a
        href="/admin/categories"

        className="
          p-6 bg-white
          rounded-xl shadow
          hover:shadow-lg
          transition
        "
      >

        <h3 className="font-semibold text-lg">
          🗂 Категорії
        </h3>

        <p className="text-sm text-gray-500">
          Створення та видалення категорій
        </p>

      </a>

    </div>

  </div>
)}

    {/* Заголовок замовлень */}
    <h2 className="text-2xl font-bold mb-6">
      Мої замовлення
    </h2>

    {/* Якщо замовлень немає */}
    {!user.orders.length ? (

      <p className="text-gray-500">
        У вас ще немає замовлень
      </p>

    ) : (

      // Список замовлень
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

            {/* Верхня частина картки */}
            <div className="flex justify-between mb-4">

              <div>

                {/* Номер замовлення */}
                <p className="font-semibold text-lg">

                  🧾 Замовлення #

                  {order.orderNumber

                    ? String(order.orderNumber)
                        .padStart(4, "0")

                    : order.id.slice(0, 6)}

                </p>

                {/* Дата створення */}
                <p className="text-sm text-gray-400">

                  {new Date(
                    order.createdAt
                  ).toLocaleString()}

                </p>

              </div>

              {/* Загальна сума */}
              <p className="font-bold text-lg">
                {order.total} грн
              </p>

            </div>

            {/* Список товарів у замовленні */}
            {order.items.map((item) => {

              // Перевірка,
              // чи користувач уже залишав відгук
              const alreadyReviewed =
                user.reviews.some(
                  (r) =>
                    r.productId ===
                    item.product.id
                )

              return (
                <div
                  key={item.id}

                  className="
                    flex gap-4
                    items-center mt-3
                  "
                >

                  {/* Фото товару */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}

                    className="
                      w-16 h-16
                      rounded-lg
                      object-cover
                      shadow-sm
                    "
                  />

                  <div className="flex-1">

                    {/* Назва товару */}
                    <p className="font-medium">
                      {item.product.name}
                    </p>

                    {/* Якщо відгук уже є */}
                    {alreadyReviewed ? (

                      <p
                        className="
                          text-green-600
                          text-sm mt-1
                        "
                      >
                        ✔ Відгук вже є
                      </p>

                    ) : (

                      // Форма додавання відгуку
                      <div className="mt-2">

                        <ReviewFormInline
                          productId={item.product.id}
                        />

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