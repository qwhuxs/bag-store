// NextResponse для API-відповідей
import { NextResponse } from "next/server"

// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// Отримання сесії користувача
import { getServerSession } from "next-auth"

// Налаштування NextAuth
import { authOptions } from "@/lib/auth"

// bcrypt для хешування паролів
import bcrypt from "bcryptjs"

// PUT API route
// для оновлення профілю користувача
export async function PUT(
  req: Request
) {

  try {

    // Отримання сесії
    const session =
      await getServerSession(authOptions)

    // Якщо користувач не авторизований
    if (!session?.user?.email) {

      return NextResponse.json(

        {
          error:
            "Unauthorized",
        },

        {
          status: 401,
        }
      )
    }

    // Отримання даних із body
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

    // Пошук користувача у БД
    const existingUser =
      await prisma.user.findUnique({

        where: {

          email:
            session.user.email,
        },
      })

    // Якщо користувача не знайдено
    if (!existingUser) {

      return NextResponse.json(

        {
          error:
            "Користувача не знайдено",
        },

        {
          status: 404,
        }
      )
    }

    // Поточний пароль
    let hashedPassword =
      existingUser.password

    // 🔐 Зміна пароля
    if (

      currentPassword &&
      newPassword &&
      existingUser.password
    ) {

      // Перевірка старого пароля
      const isValidPassword =
        await bcrypt.compare(

          currentPassword,

          existingUser.password
        )

      // Якщо пароль невірний
      if (!isValidPassword) {

        return NextResponse.json(

          {
            error:
              "Невірний поточний пароль",
          },

          {
            status: 400,
          }
        )
      }

      // Хешування нового пароля
      hashedPassword =
        await bcrypt.hash(

          newPassword,

          10
        )
    }

    // Оновлення користувача
    const updatedUser =
      await prisma.user.update({

        where: {

          email:
            session.user.email,
        },

        data: {

          // Ім’я
          firstName,

          // Прізвище
          lastName,

          // Вік
          age:
            age
              ? Number(age)
              : null,

          // Місто
          city,

          // Телефон
          phone,

          // Фото профілю
          image,

          // Пароль
          password:
            hashedPassword,

          // Повне ім’я
          name:
            `${firstName || ""} ${lastName || ""}`
              .trim(),
        },
      })

    // Повернення оновленого користувача
    return NextResponse.json(
      updatedUser
    )

  } catch (error) {

    // Виведення помилки
    console.log(error)

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