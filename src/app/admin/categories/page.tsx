import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"
import CategoriesClient from "./CategoriesClient"

export default async function Page() {
  const admin = await requireAdmin()
  if (!admin) return null

  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  })

  return <CategoriesClient categories={categories} />
}