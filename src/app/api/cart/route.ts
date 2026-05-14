// Отримання поточної сесії користувача
import { getServerSession } from "next-auth"

// Налаштування NextAuth
import { authOptions } from "@/lib/auth"

// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// GET API route
// для отримання кошика користувача
export async function GET() {

  // Отримання сесії
  const session =
    await getServerSession(authOptions)

  // Якщо користувач не авторизований
  if (!session?.user?.email) {

    return Response.json(null)
  }

  // Пошук користувача
  const user =
    await prisma.user.findUnique({

      where: {
        email:
          session.user.email,
      },

      // Отримання кошика
      include: {

        cart: {

          include: {

            items: {

              // Отримання товарів у кошику
              include: {
                product: true,
              },
            },
          },
        },
      },
    })

  // Якщо користувача або кошика немає
  if (
    !user ||
    !user.cart
  ) {

    return Response.json(null)
  }

  // Повернення кошика
  return Response.json(
    user.cart
  )
}