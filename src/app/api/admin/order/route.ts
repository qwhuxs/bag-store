// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// PUT API route
// для підтвердження замовлення
export async function PUT(
  req: Request
) {

  // Отримання id замовлення
  const { id } =
    await req.json()

  // Оновлення статусу замовлення
  await prisma.order.update({

    where: { id },

    data: {

      status: "confirmed",
    },
  })

  // Повернення успішної відповіді
  return Response.json({

    ok: true,
  })
}