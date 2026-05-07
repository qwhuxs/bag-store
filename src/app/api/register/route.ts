import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

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

    // 🔍 перевірка полів
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !city?.trim() ||
      !phone?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
      return NextResponse.json(
        { error: "Заповніть всі поля" },
        { status: 400 }
      )
    }

    const parsedAge = Number(age)

    if (isNaN(parsedAge)) {
      return NextResponse.json(
        { error: "Невірний вік" },
        { status: 400 }
      )
    }

    // 🔍 чи існує користувач
    const existing = await prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Користувач вже існує" },
        { status: 400 }
      )
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // ✅ create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,

        firstName,
        lastName,
        age: parsedAge,
        city,
        phone,

        name: `${firstName} ${lastName}`,
      },
    })

    return NextResponse.json(user)

  } catch (error) {
    console.log("REGISTER ERROR:", error)

    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    )
  }
}