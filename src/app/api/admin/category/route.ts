// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// Функція перевірки адміністратора
import { requireAdmin } from "@/lib/isAdmin"

// POST API route
// для створення нової категорії
export async function POST(
  req: Request
) {

  // Перевірка,
  // чи користувач адміністратор
  await requireAdmin()

  // Отримання даних із body
  const { name } =
    await req.json()

  // Створення категорії у БД
  const category =
    await prisma.category.create({

      data: { name },
    })

  // Повернення створеної категорії
  return Response.json(category)
}