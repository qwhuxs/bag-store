// Prisma client для роботи з БД
import { prisma } from "@/lib/prisma"

// NextResponse для API-відповідей
import { NextResponse } from "next/server"

// GET API route
// для отримання всіх категорій
export async function GET() {

  // Отримання категорій із БД
  const categories =
    await prisma.category.findMany()

  // Повернення списку категорій
  return NextResponse.json(
    categories
  )
}