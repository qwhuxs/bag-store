// Тип для robots.txt у Next.js
import { MetadataRoute } from "next"

// Генерація robots.txt
export default function robots(): MetadataRoute.Robots {

  return {

    // Правила для пошукових роботів
    rules: {

      // Для всіх user-agent
      userAgent: "*",

      // Дозволити індексацію всіх сторінок
      allow: "/",
    },
  }
}