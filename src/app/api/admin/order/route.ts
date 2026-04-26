import { prisma } from "@/lib/prisma"

export async function PUT(req: Request) {
  const { id } = await req.json()

  await prisma.order.update({
    where: { id },
    data: { status: "confirmed" },
  })

  return Response.json({ ok: true })
}