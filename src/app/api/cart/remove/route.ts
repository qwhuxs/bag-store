// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// POST API route
// для видалення товару з кошика
export async function POST(
  req: Request
) {

  // Отримання itemId
  const { itemId } =
    await req.json()

  // Видалення товару з кошика
  await prisma.cartItem.delete({

    where: {
      id: itemId,
    },
  })

  // Повернення успішної відповіді
  return Response.json({

    ok: true,
  })
}