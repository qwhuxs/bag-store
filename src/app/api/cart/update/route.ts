import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) return Response.json(null)

  const { itemId, quantity } = await req.json()

  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  })

  return Response.json({ ok: true })
}