// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// Node.js модулі для роботи з файлами
import fs from "fs/promises"

import path from "path"

// POST API route
// для створення нового товару
export async function POST(
  req: Request
) {

  try {

    // Отримання formData
    const data = await req.formData()

    // Отримання полів
    const name =
      data.get("name") as string

    const description =
      data.get("description") as string

    const categoryId =
      data.get("categoryId") as string

    const price = Number(
      data.get("price")
    )

    const stock = Number(
      data.get("stock")
    )

    // Отримання файла
    const file =
      data.get("image") as File

    // Якщо файл не вибраний
    if (!file || file.size === 0) {

      return Response.json(
        {
          error: "Фото не вибране",
        },
        {
          status: 400,
        }
      )
    }

    // Конвертація файла в buffer
    const bytes =
      await file.arrayBuffer()

    const buffer =
      Buffer.from(bytes)

    // Унікальна назва файла
    const fileName =
      `${Date.now()}-${file.name}`

    // Шлях збереження
    const uploadPath = path.join(
      process.cwd(),
      "public/uploads",
      fileName
    )

    // Збереження файла
    await fs.writeFile(
      uploadPath,
      buffer
    )

    // Шлях для БД
    const imagePath =
      `/uploads/${fileName}`

    // Формування об’єкта товару
    const productData = {

      name,

      description,

      categoryId,

      price,

      stock,

      image: imagePath,

      // Якщо ціна > 3000
      // автоматично додається знижка 10%
      discount:
        price > 3000
          ? 10
          : null,
    }

    // Створення товару у БД
    await prisma.product.create({

      data: productData,
    })

    // Повернення успішної відповіді
    return Response.json({

      ok: true,
    })

  } catch (error) {

    console.error(error)

    return Response.json(
      {
        error:
          "Помилка створення товару",
      },
      {
        status: 500,
      }
    )
  }
}