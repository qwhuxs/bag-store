// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// NextResponse для API-відповідей
import { NextResponse } from "next/server"

// Отримання сесії користувача
import { getServerSession } from "next-auth"

// Налаштування NextAuth
import { authOptions } from "@/lib/auth"

// POST API route
// для створення відгуку
export async function POST(
  req: Request
) {

  // Отримання сесії
  const session =
    await getServerSession(authOptions)

  // Якщо користувач не авторизований
  if (!session?.user?.email) {

    return NextResponse.json(

      {
        error: "Unauthorized",
      },

      {
        status: 401,
      }
    )
  }

  // Отримання даних із body
  const {

    comment,
    rating,
    productId,

  } = await req.json()

  // Пошук користувача
  const user =
    await prisma.user.findUnique({

      where: {
        email:
          session.user.email,
      },
    })

  // Якщо користувача не знайдено
  if (!user) {

    return NextResponse.json(

      {
        error:
          "User not found",
      },

      {
        status: 404,
      }
    )
  }

  // Створення відгуку
  const review =
    await prisma.review.create({

      data: {

        // Текст відгуку
        comment,

        // Оцінка
        rating,

        // id товару
        productId,

        // id користувача
        userId: user.id,
      },
    })

  // Повернення створеного відгуку
  return NextResponse.json(
    review
  )
}