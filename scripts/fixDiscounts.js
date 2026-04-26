const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  await prisma.product.updateMany({
    where: {
      price: {
        gt: 3000,
      },
    },
    data: {
      discount: 10,
    },
  })

  console.log("✅ Знижки додані")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())