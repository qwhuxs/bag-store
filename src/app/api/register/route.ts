import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      age,
      city,
      phone,
      email,
      password,
    } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Заповніть всі поля" },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { error: "user_exists" },
        { status: 400 }
      )
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        firstName,
        lastName,
        age,
        city,
        phone,
        name: `${firstName || ""} ${lastName || ""}`.trim(),
      },
    })

    return NextResponse.json(user)
  } catch (e) {
    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    )
  }
}