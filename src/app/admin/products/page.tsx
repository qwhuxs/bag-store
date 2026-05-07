import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/isAdmin"
import DeleteButton from "./DeleteButton"
import Link from "next/link"
import Image from "next/image"

export default async function AdminProducts() {
  const admin = await requireAdmin()

  if (!admin) return null

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  })

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">

      {/* 🔝 HEADER */}

      <div
        className="
          flex flex-col md:flex-row
          md:justify-between
          md:items-center
          gap-5
          mb-10
        "
      >

        <div>

          <h1
            className="
              text-4xl md:text-5xl
              font-black
              text-[#1f2d4d]
            "
          >
            📦 Товари
          </h1>

          <div
            className="
              w-24 h-1.5
              bg-gradient-to-r
              from-[#3F5F56]
              to-[#D9A5A0]
              mt-3 rounded-full
            "
          />

        </div>

        <Link
          href="/admin/products/create"
          className="
            bg-gradient-to-r
            from-green-500
            to-emerald-500
            text-white
            px-6 py-3
            rounded-2xl
            text-center
            font-semibold
            shadow-lg
            hover:scale-105
            transition
          "
        >
          + Додати товар
        </Link>

      </div>

      {/* 📦 PRODUCTS */}

      <div className="flex flex-col gap-6">

        {products.map((p) => (
          <div
            key={p.id}
            className="
              bg-white
              rounded-3xl
              shadow-md
              hover:shadow-xl
              transition
              overflow-hidden
              p-5
            "
          >

            <div
              className="
                flex flex-col md:flex-row
                gap-6
                md:items-center
              "
            >

              {/* 🖼 IMAGE */}

              <div
                className="
                  relative
                  w-full md:w-40
                  h-56 md:h-40
                  rounded-2xl
                  overflow-hidden
                  bg-gray-100
                  flex-shrink-0
                "
              >

                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 160px"
                  className="object-cover"
                />

              </div>

              {/* 📄 INFO */}

              <div className="flex-1">

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-gray-800
                    mb-3
                  "
                >
                  {p.name}
                </h2>

                <p
                  className="
                    text-[#D9A5A0]
                    font-black
                    text-2xl
                  "
                >
                  {p.price} грн
                </p>

                <p className="text-gray-500 mt-2">
                  Stock: {p.stock}
                </p>

              </div>

              {/* ⚙️ ACTIONS */}

              <div
                className="
                  flex flex-col sm:flex-row
                  gap-3
                  md:w-auto
                "
              >

                <Link
                  href={`/admin/products/edit/${p.id}`}
                  className="
                    px-5 py-3
                    bg-blue-500
                    text-white
                    rounded-xl
                    text-center
                    font-medium
                    hover:opacity-90
                    transition
                  "
                >
                  Редагувати
                </Link>

                <DeleteButton id={p.id} />

              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  )
}