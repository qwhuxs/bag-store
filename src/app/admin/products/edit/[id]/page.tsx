import { prisma } from "@/lib/prisma"

// Функція перевірки адміністратора
import { requireAdmin } from "@/lib/isAdmin"

import EditProductClient from "./EditProductClient"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  // Перевірка прав адміністратора
  const admin = await requireAdmin()

  // Якщо користувач не адмін — сторінка не відображається
  if (!admin) return null

  // Отримання id товару з URL
  const { id } = await params

  // Перевірка на наявність id
  if (!id) {
    return (
      <div className="p-6">
        ❌ Немає ID
      </div>
    )
  }

  // Пошук товару в базі даних
  const product = await prisma.product.findUnique({
    where: { id },
  })

  // Якщо товар не знайдено
  if (!product) {
    return (
      <div className="p-6">
        ❌ Товар не знайдено
      </div>
    )
  }

  // Отримання всіх категорій
  const categories = await prisma.category.findMany()

  // Передача даних у клієнтський компонент
  return (
    <EditProductClient
      product={product}
      categories={categories}
    />
  )
}