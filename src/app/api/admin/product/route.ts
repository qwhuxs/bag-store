import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const data = await req.json()

  const productData = {
    ...data,
    discount: data.price > 3000 ? 10 : null,
  }

  await prisma.product.create({
    data: productData,
  })

  return Response.json({ ok: true })
}

export async function DELETE(req: Request) {
  const { id } = await req.json()

  await prisma.product.delete({
    where: { id },
  })

  return Response.json({ ok: true })
}