import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  await requireAdmin()

  const id = context.params.id

  await prisma.category.delete({
    where: { id },
  })

  return Response.json({ success: true })
}