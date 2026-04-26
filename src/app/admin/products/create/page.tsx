import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"
import Create from "./Create"

export default async function Page() {
  const admin = await requireAdmin()
  if (!admin) return null

  const categories = await prisma.category.findMany()

  return <Create categories={categories} />
}