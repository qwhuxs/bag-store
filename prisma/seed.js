import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

const categoryImages = {
  "Рюкзаки": Array.from({ length: 14 }, (_, i) => `/images/foto${i + 1}.jpg`),

  "Сумки через плече": Array.from({ length: 14 }, (_, i) => `/images/foto${i + 15}.jpg`),

  "Клатчі": Array.from({ length: 11 }, (_, i) => `/images/foto${i + 29}.jpg`),

  "Сумки-тоут": Array.from({ length: 10 }, (_, i) => `/images/foto${i + 40}.jpg`),

  "Спортивні сумки": Array.from({ length: 9 }, (_, i) => `/images/foto${i + 50}.jpg`),

  "Сумки на пояс": Array.from({ length: 10 }, (_, i) => `/images/foto${i + 59}.jpg`),

  "Сумки-хобо": Array.from({ length: 8 }, (_, i) => `/images/foto${i + 69}.jpg`),

  "Дорожні сумки": Array.from({ length: 8 }, (_, i) => `/images/foto${i + 77}.jpg`),

  "Еко-сумки": Array.from({ length: 8 }, (_, i) => `/images/foto${i + 85}.jpg`),

  "Сумки ручної роботи": Array.from({ length: 7 }, (_, i) => `/images/foto${i + 93}.jpg`),
}

const adjectives = ["Стильна", "Модна", "Елегантна", "Преміум", "Класична"]

async function main() {
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  await prisma.category.createMany({
    data: Object.keys(categoryImages).map((name) => ({ name })),
  })

  const categories = await prisma.category.findMany()

  for (const category of categories) {
    const imgs = categoryImages[category.name]

for (let i = 0; i < 12; i++) {
  await prisma.product.create({
    data: {
      name: `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${category.name}`,
      description: "Якісна стильна сумка",
      price: 800 + Math.floor(Math.random() * 4000),
      image: imgs[i % imgs.length], 
      categoryId: category.id,
    },
  })
}
  }

  console.log("🔥 Seed виконано")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())