import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return Response.json({ error: "Not authorized" })
  }

  const { productId } = await req.json()

  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { cart: true },
  })

  if (!user) {
    return Response.json({ error: "User not found" })
  }

  if (!user.cart) {
    user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        cart: {
          create: {},
        },
      },
      include: { cart: true },
    })
  }

  // ❗ тут TypeScript не впевнений → ставимо !
  await prisma.cartItem.create({
    data: {
      cartId: user.cart!.id,
      productId,
    },
  })

  return Response.json({ ok: true })
}