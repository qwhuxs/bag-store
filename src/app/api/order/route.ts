import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return Response.json(
        { error: "Не авторизовано" },
        { status: 401 }
      )
    }

    const body = await req.json()

    const {
      firstName,
      lastName,
      phone,
      city,
      deliveryType,
      branch,
    } = body

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !city ||
      !deliveryType ||
      !branch
    ) {
      return Response.json(
        { error: "Заповніть всі поля" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    })

    if (!user?.cart || user.cart.items.length === 0) {
      return Response.json(
        { error: "Кошик порожній" },
        { status: 400 }
      )
    }

    const total = user.cart.items.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    )

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total,

        firstName,
        lastName,
        phone,
        city,

        email: session.user.email,

        deliveryType,
        branch,

        items: {
          create: user.cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    })

    await prisma.cartItem.deleteMany({
      where: { cartId: user.cart.id },
    })

    return Response.json(order)

  } catch (error) {
    console.error(error)

    return Response.json(
      { error: "Помилка сервера" },
      { status: 500 }
    )
  }
}