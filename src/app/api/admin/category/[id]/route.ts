// Prisma client для роботи з базою даних
import { prisma } from "@/lib/prisma"

// Функція перевірки адміністратора
import { requireAdmin } from "@/lib/isAdmin"

// DELETE API route
// для видалення категорії
export async function DELETE(

  req: Request,

  context: {
    params: Promise<{
      id: string
    }>
  }
) {

  // Перевірка,
  // чи користувач адміністратор
  await requireAdmin()

  // Отримання id категорії
  const { id } =
    await context.params

  // Видалення категорії з БД
  await prisma.category.delete({

    where: { id },
  })

  // Повернення успішної відповіді
  return Response.json({

    success: true,
  })
}