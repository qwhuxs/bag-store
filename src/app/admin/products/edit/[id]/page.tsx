import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"
import EditProductClient from "./EditProductClient"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const admin = await requireAdmin()
  if (!admin) return null

  const { id } = await params

  if (!id) {
    return <div className="p-6">❌ Немає ID</div>
  }

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    return <div className="p-6">❌ Товар не знайдено</div>
  }

  const categories = await prisma.category.findMany()

  return (
    <EditProductClient
      product={product}
      categories={categories}
    />
  )
}