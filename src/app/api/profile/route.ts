import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { firstName, lastName, age, city, phone } = await req.json()

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      firstName,
      lastName,
      age: age ? Number(age) : null,
      city,
      phone,
      name: `${firstName || ""} ${lastName || ""}`.trim(),
    },
  })

  return NextResponse.json(user)
}