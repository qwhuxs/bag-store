import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"

export async function POST(req: Request) {
  await requireAdmin()

  const { name } = await req.json()

  const category = await prisma.category.create({
    data: { name },
  })

  return Response.json(category)
}