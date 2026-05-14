// Отримання поточної сесії користувача
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { prisma } from "./prisma"

// Функція перевірки адміністратора
export async function requireAdmin() {

  // Отримання сесії
  const session =
    await getServerSession(authOptions)

  // Якщо користувач не авторизований
  if (!session?.user?.email)
    return null

  // Пошук користувача у БД
  const user =
    await prisma.user.findUnique({

      where: {
        email:
          session.user.email,
      },
    })

  // Якщо користувача нема
  // або роль не ADMIN
  if (
    !user ||
    user.role !== "ADMIN"
  ) {

    return null
  }

  // Повернення адміністратора
  return user
}