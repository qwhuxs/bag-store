"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"

type Product = {
  id: string // ✅ ФІКС
  name: string
  price: number
  image: string
}

export default function ProductSlider({
  products,
}: {
  products: Product[]
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const { clientWidth } = scrollRef.current
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const interval = setInterval(() => {
      container.scrollBy({
        left: 250,
        behavior: "smooth",
      })

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* ⬅️ */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10
        bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow hover:scale-110"
      >
        ◀
      </button>

      {/* ➡️ */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10
        bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow hover:scale-110"
      >
        ▶
      </button>

      {/* 🛍️ */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-2"
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="min-w-[220px] max-w-[220px] bg-white rounded-xl shadow-md
            hover:shadow-xl transition p-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />

            <h3 className="font-semibold text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>

            <p className="text-lg font-bold">
              {product.price} грн
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}