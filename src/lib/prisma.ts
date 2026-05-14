// PrismaClient для роботи з базою даних
import { PrismaClient } from "@prisma/client"

// Створення глобального типу
// для збереження Prisma instance
const globalForPrisma =
  global as unknown as {

    prisma: PrismaClient
  }

// Створення Prisma client
export const prisma =

  // Якщо prisma вже існує — використовуємо її
  globalForPrisma.prisma ||

  // Інакше створюємо новий екземпляр
  new PrismaClient()

// Перевірка,
// чи застосунок НЕ у production
if (
  process.env.NODE_ENV !== "production"
) {

  // Збереження prisma у global
  // щоб уникнути створення
  // багатьох підключень до БД
  globalForPrisma.prisma =
    prisma
}