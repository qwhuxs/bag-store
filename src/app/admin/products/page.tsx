import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"
import DeleteButton from "./DeleteButton"
import Link from "next/link"

export default async function AdminProducts() {
  const admin = await requireAdmin()
  if (!admin) return null

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  })

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* 🔝 HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            📦 Товари
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] mt-2 rounded-full" />
        </div>

        <Link
          href="/admin/products/create"
          className="
            bg-gradient-to-r from-green-500 to-emerald-500
            text-white px-5 py-2 rounded-lg
            hover:scale-105 transition
          "
        >
          + Додати
        </Link>
      </div>

      {/* 📦 LIST */}
      <div className="flex flex-col gap-5">

        {products.map((p) => (
          <div
            key={p.id}
            className="
              flex items-center gap-5
              bg-white border border-gray-100
              p-4 rounded-xl shadow-sm
              hover:shadow-md transition
            "
          >

            {/* 🖼 IMAGE */}
            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* 📄 INFO */}
            <div className="flex-1">

              <p className="font-semibold text-gray-800 text-lg">
                {p.name}
              </p>

              <p className="text-[#D9A5A0] font-bold">
                {p.price} грн
              </p>

              <p className="text-sm text-gray-500">
                Stock: {p.stock}
              </p>

            </div>

            {/* ⚙️ ACTIONS */}
            <div className="flex gap-2">

              <Link
                href={`/admin/products/edit/${p.id}`}
                className="
                  px-4 py-2 bg-blue-500 text-white rounded-lg
                  hover:opacity-90 transition
                "
              >
                Редагувати
              </Link>

              <DeleteButton id={p.id} />

            </div>

          </div>
        ))}

      </div>
    </div>
  )
}