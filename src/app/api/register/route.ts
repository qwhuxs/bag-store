// NextResponse для API-відповідей
import { NextResponse } from "next/server"

// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// bcrypt для хешування паролів
import bcrypt from "bcryptjs"

// POST API route
// для реєстрації нового користувача
export async function POST(
  req: Request
) {

  try {

    // Отримання даних із body
    const {

      firstName,
      lastName,
      age,
      city,
      phone,
      email,
      password,

    } = await req.json()

    // 🔍 Перевірка полів
    if (

      !firstName?.trim() ||
      !lastName?.trim() ||
      !city?.trim() ||
      !phone?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {

      return NextResponse.json(

        {
          error:
            "Заповніть всі поля",
        },

        {
          status: 400,
        }
      )
    }

    // Перетворення віку у number
    const parsedAge =
      Number(age)

    // Якщо вік введений неправильно
    if (isNaN(parsedAge)) {

      return NextResponse.json(

        {
          error:
            "Невірний вік",
        },

        {
          status: 400,
        }
      )
    }

    // 🔍 Перевірка,
    // чи користувач вже існує
    const existing =
      await prisma.user.findUnique({

        where: { email },
      })

    // Якщо email вже використовується
    if (existing) {

      return NextResponse.json(

        {
          error:
            "Користувач вже існує",
        },

        {
          status: 400,
        }
      )
    }

    // 🔐 Хешування пароля
    const hashedPassword =
      await bcrypt.hash(

        password,
        10
      )

    // ✅ Створення користувача
    const user =
      await prisma.user.create({

        data: {
          email,
          password:
            hashedPassword,
          firstName,
          lastName,
          age: parsedAge,
          city,
          phone,
          name:
            `${firstName} ${lastName}`,
        },
      })

    // Повернення створеного користувача
    return NextResponse.json(user)

  } catch (error) {

    // Виведення помилки
    console.log(
      "REGISTER ERROR:",
      error
    )

    // Server error
    return NextResponse.json(

      {
        error:
          "Помилка сервера",
      },

      {
        status: 500,
      }
    )
  }
}