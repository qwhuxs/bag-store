import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await requireAdmin()

  const { id } = await context.params 

  await prisma.category.delete({
    where: { id },
  })

  return Response.json({ success: true })
}