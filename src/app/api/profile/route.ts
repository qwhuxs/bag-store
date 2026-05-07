import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const {
      firstName,
      lastName,
      age,
      city,
      phone,
      image,
      currentPassword,
      newPassword,
    } = await req.json()

    const existingUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: "Користувача не знайдено" },
        { status: 404 }
      )
    }

    let hashedPassword = existingUser.password

    // 🔐 зміна пароля
    if (
      currentPassword &&
      newPassword &&
      existingUser.password
    ) {
      const isValidPassword = await bcrypt.compare(
        currentPassword,
        existingUser.password
      )

      if (!isValidPassword) {
        return NextResponse.json(
          { error: "Невірний поточний пароль" },
          { status: 400 }
        )
      }

      hashedPassword = await bcrypt.hash(
        newPassword,
        10
      )
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },

      data: {
        firstName,
        lastName,
        age: age ? Number(age) : null,
        city,
        phone,
        image,
        password: hashedPassword,
        name: `${firstName || ""} ${lastName || ""}`.trim(),
      },
    })

    return NextResponse.json(updatedUser)

  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    )
  }
}