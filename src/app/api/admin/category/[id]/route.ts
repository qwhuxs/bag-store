import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await requireAdmin()

  const { id } = params

  await prisma.category.delete({
    where: { id },
  })

  return Response.json({ success: true })
}