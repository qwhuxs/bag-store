// Отримання сесії користувача
import { getServerSession } from "next-auth"

// Налаштування NextAuth
import { authOptions } from "@/lib/auth"

// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// POST API route
// для оформлення замовлення
export async function POST(
  req: Request
) {

  try {

    // Отримання сесії
    const session =
      await getServerSession(authOptions)

    // Якщо користувач не авторизований
    if (!session?.user?.email) {

      return Response.json(

        {
          error:
            "Не авторизовано",
        },

        {
          status: 401,
        }
      )
    }

    // Отримання body
    const body =
      await req.json()

    // Отримання даних форми
    const {

      firstName,
      lastName,
      phone,
      city,
      deliveryType,
      branch,

    } = body

    // Перевірка заповнення полів
    if (

      !firstName ||
      !lastName ||
      !phone ||
      !city ||
      !deliveryType ||
      !branch
    ) {

      return Response.json(

        {
          error:
            "Заповніть всі поля",
        },

        {
          status: 400,
        }
      )
    }

    // Пошук користувача
    const user =
      await prisma.user.findUnique({

        where: {
          email:
            session.user.email,
        },

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

    // Якщо кошик порожній
    if (
      !user?.cart ||
      user.cart.items.length === 0
    ) {

      return Response.json(

        {
          error:
            "Кошик порожній",
        },

        {
          status: 400,
        }
      )
    }

    // Розрахунок загальної суми
    const total =
      user.cart.items.reduce(

        (sum, item) =>

          sum +
          item.product.price *
          item.quantity,

        0
      )

    // Отримання останнього номера замовлення
    const lastOrder =
      await prisma.order.findFirst({

        where: {

          orderNumber: {
            not: null,
          },
        },

        orderBy: {

          orderNumber: "desc",
        },
      })

    // Генерація нового номера замовлення
    const nextOrderNumber =
      (lastOrder?.orderNumber ?? 0) + 1

    // Перевірка кількості товарів на складі
    for (const item of user.cart.items) {

      if (
        item.quantity >
        item.product.stock
      ) {

        return Response.json(

          {
            error:
              `Недостатньо товару: ${item.product.name}`,
          },

          {
            status: 400,
          }
        )
      }
    }

    // Створення замовлення
    const order =
      await prisma.order.create({

        data: {

          // id користувача
          userId: user.id,

          // Загальна сума
          total,

          // Номер замовлення
          orderNumber:
            nextOrderNumber,

          // Дані користувача
          firstName,
          lastName,
          phone,
          city,

          // Email користувача
          email:
            session.user.email,

          // Дані доставки
          deliveryType,
          branch,

          // Створення товарів замовлення
          items: {

            create:
              user.cart.items.map(

                (item) => ({

                  productId:
                    item.productId,

                  quantity:
                    item.quantity,
                })
              ),
          },
        },
      })

    // Оновлення товарів після покупки
    for (const item of user.cart.items) {

      await prisma.product.update({

        where: {
          id: item.productId,
        },

        data: {

          // Зменшення кількості на складі
          stock: {

            decrement:
              item.quantity,
          },

          // Збільшення кількості продажів
          sales: {

            increment:
              item.quantity,
          },
        },
      })
    }

    // Очищення кошика
    await prisma.cartItem.deleteMany({

      where: {
        cartId:
          user.cart.id,
      },
    })

    // Повернення створеного замовлення
    return Response.json(order)

  } catch (error) {

    // Виведення помилки
    console.error(
      "ORDER ERROR:",
      error
    )

    // Server error
    return Response.json(

      {
        error:
          "Помилка сервера",
      },

      {
        status: 500,
      }
    )
  }
}