import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return Response.json(
        { error: "NOT_AUTHORIZED" },
        { status: 401 }
      )
    }

    const { productId } = await req.json()

    if (!productId) {
      return Response.json(
        { error: "NO_PRODUCT_ID" },
        { status: 400 }
      )
    }

    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: true },
    })

    if (!user) {
      return Response.json(
        { error: "USER_NOT_FOUND" },
        { status: 404 }
      )
    }

    if (!user.cart) {
      user = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          cart: { create: {} },
        },
        include: { cart: true },
      })
    }

    const existing = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: user.cart!.id,
          productId,
        },
      },
    })

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: { increment: 1 },
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: user.cart!.id,
          productId,
          quantity: 1,
        },
      })
    }

    return Response.json({ ok: true })

  } catch (error) {
    console.error("CART ERROR:", error)

    return Response.json(
      { error: "SERVER_ERROR" },
      { status: 500 }
    )
  }
}