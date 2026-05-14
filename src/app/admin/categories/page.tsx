import { prisma } from "@/lib/prisma"

// Функція перевірки адміністратора
import { requireAdmin } from "@/lib/isAdmin"

import CategoriesClient from "./CategoriesClient"

export default async function Page() {

  // Перевірка, чи користувач є адміністратором
  const admin = await requireAdmin()

  // Якщо ні — сторінка не відображається
  if (!admin) return null

  // Отримання всіх категорій із товарами
  const categories = await prisma.category.findMany({
    include: {

      // Підключення пов'язаних товарів
      products: true,
    },
  })

  // Передача даних у клієнтський компонент
  return <CategoriesClient categories={categories} />
}