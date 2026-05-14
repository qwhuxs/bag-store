// Отримання сесії користувача
import { getServerSession } from "next-auth"

// Налаштування NextAuth
import { authOptions } from "@/lib/auth"

// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// POST API route
// для додавання товару у кошик
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
            "NOT_AUTHORIZED",
        },

        {
          status: 401,
        }
      )
    }

    // Отримання productId
    const { productId } =
      await req.json()

    // Якщо productId немає
    if (!productId) {

      return Response.json(

        {
          error:
            "NO_PRODUCT_ID",
        },

        {
          status: 400,
        }
      )
    }

    // Пошук користувача
    let user =
      await prisma.user.findUnique({

        where: {
          email:
            session.user.email,
        },

        include: {
          cart: true,
        },
      })

    // Якщо користувача немає
    if (!user) {

      return Response.json(

        {
          error:
            "USER_NOT_FOUND",
        },

        {
          status: 404,
        }
      )
    }

    // Якщо кошика немає — створюємо
    if (!user.cart) {

      user =
        await prisma.user.update({

          where: {
            email:
              session.user.email,
          },

          data: {

            cart: {
              create: {},
            },
          },

          include: {
            cart: true,
          },
        })
    }

    // Перевірка,
    // чи товар вже є у кошику
    const existing =
      await prisma.cartItem.findUnique({

        where: {

          cartId_productId: {

            cartId:
              user.cart!.id,

            productId,
          },
        },
      })

    // Якщо товар вже існує
    if (existing) {

      // Збільшення кількості
      await prisma.cartItem.update({

        where: {
          id: existing.id,
        },

        data: {

          quantity: {
            increment: 1,
          },
        },
      })

    } else {

      // Якщо товару немає — створення нового item
      await prisma.cartItem.create({

        data: {

          cartId:
            user.cart!.id,

          productId,

          quantity: 1,
        },
      })
    }

    // Успішна відповідь
    return Response.json({

      ok: true,
    })

  } catch (error) {

    // Виведення помилки
    console.error(
      "CART ERROR:",
      error
    )

    // Server error
    return Response.json(

      {
        error:
          "SERVER_ERROR",
      },

      {
        status: 500,
      }
    )
  }
}