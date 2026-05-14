import pkg from "@prisma/client"
const { PrismaClient } = pkg

// Підключення Prisma ORM
const prisma = new PrismaClient()

// Масиви зображень для кожної категорії
const categoryImages = {
  "Рюкзаки": Array.from({ length: 14 }, (_, i) => `/images/foto${i + 1}.jpg`),
}

// Прикметники для генерації назв товарів
const adjectives = [
  "Стильна",
  "Модна",
  "Елегантна",
]

async function main() {

  // Створення категорій, якщо вони ще не існують
  for (const name of Object.keys(categoryImages)) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }

  // Отримання всіх категорій
  const categories = await prisma.category.findMany()

  for (const category of categories) {

    // Перевірка, чи є вже товари у категорії
    const existingCount = await prisma.product.count({
      where: { categoryId: category.id },
    })

    // Якщо товари існують — пропускаємо
    if (existingCount > 0) continue

    const imgs = categoryImages[category.name]

    // Генерація тестових товарів
    for (let i = 0; i < 12; i++) {
      await prisma.product.create({
        data: {

          // Випадкова назва товару
          name: `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${category.name}`,

          description: "Якісна стильна сумка",

          // Випадкова ціна
          price: 800 + Math.floor(Math.random() * 4000),

          image: imgs[i % imgs.length],

          // Зв'язок з категорією
          categoryId: category.id,

          // Кількість товару на складі
          stock: Math.floor(Math.random() * 10),

          // Випадкова знижка
          discount: Math.random() > 0.6 ? 10 : null,
        },
      })
    }
  }

  console.log("✅ Seed завершено")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())