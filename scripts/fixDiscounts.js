import prisma from "@/lib/prisma"

async function main() {

  // Оновлення всіх товарів,
  // у яких ціна більша за 3000 грн
  await prisma.product.updateMany({

    // Умова вибірки товарів
    where: {
      price: {
        gt: 3000,
      },
    },

    // Дані для оновлення
    data: {
      discount: 10,
    },
  })

  // Повідомлення про успішне виконання
  console.log("✅ Знижки додані")
}

// Виклик основної функції
main()

  // Обробка можливих помилок
  .catch(console.error)

  // Відключення від бази даних після завершення
  .finally(() => prisma.$disconnect())