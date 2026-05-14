// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// NextResponse для API-відповідей
import { NextResponse } from "next/server"

// GET API route
// для отримання всіх товарів
export async function GET() {

  // Отримання товарів із БД
  const products =
    await prisma.product.findMany({

      // Отримання категорії товару
      include: {

        category: true,
      },
    })

  // Повернення списку товарів
  return NextResponse.json(
    products
  )
}