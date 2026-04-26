import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing data" },
      { status: 400 }
    )
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  })

  if (existing) {
    return NextResponse.json(
      { error: "User exists" },
      { status: 400 }
    )
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      name: name || "User",
      password: hashed,
    },
  })

  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
  })
}