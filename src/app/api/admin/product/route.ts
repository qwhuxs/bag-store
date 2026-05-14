// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// POST API route
// для створення нового товару
export async function POST(
  req: Request
) {

  // Отримання даних із body
  const data =
    await req.json()

  // Формування об’єкта товару
  const productData = {

    ...data,

    // Якщо ціна > 3000
    // автоматично додається знижка 10%
    discount:
      data.price > 3000
        ? 10
        : null,
  }

  // Створення товару у БД
  await prisma.product.create({

    data: productData,
  })

  // Повернення успішної відповіді
  return Response.json({

    ok: true,
  })
}