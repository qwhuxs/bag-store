import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const products = await prisma.product.findMany()

  const productUrls = products.map((product) => ({
    url: `http://localhost:3000/products/${product.id}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: "http://localhost:3000",
      lastModified: new Date(),
    },

    {
      url: "http://localhost:3000/catalog",
      lastModified: new Date(),
    },

    {
      url: "http://localhost:3000/categories",
      lastModified: new Date(),
    },

    {
      url: "http://localhost:3000/sale",
      lastModified: new Date(),
    },

    ...productUrls,
  ]
}