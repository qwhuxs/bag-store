// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// Функція перевірки адміністратора
import { requireAdmin } from "@/lib/isAdmin"

// NextResponse для API-відповідей
import { NextResponse } from "next/server"

// PUT API route
// для оновлення товару
export async function PUT(

  req: Request,

  context: {
    params: Promise<{
      id: string
    }>
  }
) {

  try {

    // Перевірка,
    // чи користувач адміністратор
    await requireAdmin()

    // Отримання id товару
    const { id } =
      await context.params

    // Якщо id немає
    if (!id) {

      return NextResponse.json(

        {
          error:
            "No ID provided",
        },

        {
          status: 400,
        }
      )
    }

    // Отримання body
    const body =
      await req.json()

    // Оновлення товару
    const updatedProduct =
      await prisma.product.update({

        where: { id },

        data: {

          // Назва товару
          name: body.name,

          // Ціна
          price:
            Number(body.price),

          // Кількість на складі
          stock:
            Number(body.stock),

          // Категорія
          categoryId:
            body.categoryId,

          // Автоматична знижка
          discount:
            Number(body.price) > 3000
              ? 10
              : null,
        },
      })

    // Повернення оновленого товару
    return NextResponse.json(
      updatedProduct
    )

  } catch (error) {

    // Виведення помилки у console
    console.error(
      "UPDATE ERROR:",
      error
    )

    // Server error
    return NextResponse.json(

      {
        error:
          "Server error",
      },

      {
        status: 500,
      }
    )
  }
}