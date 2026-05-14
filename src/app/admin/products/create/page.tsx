import { prisma } from "@/lib/prisma"

// Функція перевірки адміністратора
import { requireAdmin } from "@/lib/isAdmin"

import Create from "./Create"

export default async function Page() {

  // Перевірка прав адміністратора
  const admin = await requireAdmin()

  // Якщо користувач не адмін — сторінка не відображається
  if (!admin) return null

  // Отримання всіх категорій із бази даних
  const categories = await prisma.category.findMany()

  // Передача категорій у компонент форми
  return <Create categories={categories} />
}