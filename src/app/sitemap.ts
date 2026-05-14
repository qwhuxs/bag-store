// Тип для sitemap.xml у Next.js
import { MetadataRoute } from "next"

// Prisma ORM для роботи з базою даних
import { prisma } from "@/lib/prisma"

// Генерація sitemap
export default async function sitemap():
Promise<MetadataRoute.Sitemap> {

  // Отримання всіх товарів
  const products =
    await prisma.product.findMany()

  // Формування URL товарів
  const productUrls = products.map(
    (product) => ({

      // Посилання на товар
      url:
        `http://localhost:3000/products/${product.id}`,

      // Дата останнього оновлення
      lastModified: new Date(),
    })
  )

  return [

    // Головна сторінка
    {
      url: "http://localhost:3000",

      lastModified: new Date(),
    },

    // Каталог товарів
    {
      url: "http://localhost:3000/catalog",

      lastModified: new Date(),
    },

    // Категорії
    {
      url: "http://localhost:3000/categories",

      lastModified: new Date(),
    },

    // Сторінка знижок
    {
      url: "http://localhost:3000/sale",

      lastModified: new Date(),
    },

    // Додавання URL товарів
    ...productUrls,
  ]
}