// Отримання сесії користувача
import { getServerSession } from "next-auth"

// Налаштування NextAuth
import { authOptions } from "@/lib/auth"

// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// POST API route
// для оновлення кількості товару у кошику
export async function POST(
  req: Request
) {

  // Отримання сесії
  const session =
    await getServerSession(authOptions)

  // Якщо користувач не авторизований
  if (!session?.user?.email)
    return Response.json(null)

  // Отримання itemId та quantity
  const {
    itemId,
    quantity,
  } = await req.json()

  // Оновлення кількості товару
  await prisma.cartItem.update({

    where: {
      id: itemId,
    },

    data: {
      quantity,
    },
  })

  // Повернення успішної відповіді
  return Response.json({

    ok: true,
  })
}