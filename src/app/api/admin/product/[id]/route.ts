import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()

    const { id } = await context.params

    if (!id) {
      return NextResponse.json(
        { error: "No ID provided" },
        { status: 400 }
      )
    }

    const body = await req.json()

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        price: Number(body.price),
        stock: Number(body.stock),
        categoryId: body.categoryId,
        discount: Number(body.price) > 3000 ? 10 : null,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("UPDATE ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}