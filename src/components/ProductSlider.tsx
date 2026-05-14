"use client"

// useRef для доступу до DOM елемента
// useEffect для автоматичного запуску слайдера
import { useRef, useEffect } from "react"

// Компонент для навігації між сторінками
import Link from "next/link"

// Компонент Next.js для оптимізації зображень
import Image from "next/image" 

// Тип даних товару
type Product = {

  id: string
  name: string
  price: number
  image: string
}

export default function ProductSlider({
  products,
}: {
  products: Product[]
}) {

  // Ref для контейнера слайдера
  const scrollRef =
    useRef<HTMLDivElement>(null)

  // Функція прокрутки
  const scroll = (
    direction: "left" | "right"
  ) => {

    // Якщо контейнер не знайдено
    if (!scrollRef.current) return

    // Ширина контейнера
    const { clientWidth } =
      scrollRef.current

    // Напрямок прокрутки
    const scrollAmount =
      direction === "left"
        ? -clientWidth
        : clientWidth

    // Плавна прокрутка
    scrollRef.current.scrollBy({

      left: scrollAmount,

      behavior: "smooth",
    })
  }

  // Автоматичний autoplay
  useEffect(() => {

    const container =
      scrollRef.current

    if (!container) return

    // Інтервал автопрокрутки
    const interval = setInterval(() => {

      // Прокрутка вправо
      container.scrollBy({

        left: 250,

        behavior: "smooth",
      })

      // Якщо досягли кінця
      if (

        container.scrollLeft +
        container.clientWidth >=

        container.scrollWidth - 10
      ) {

        // Повернення на початок
        container.scrollTo({

          left: 0,

          behavior: "smooth",
        })
      }

    }, 5000)

    // Очищення interval
    return () =>
      clearInterval(interval)

  }, [])

  return (

    <div className="relative">

      {/* Кнопка вліво */}
      <button

        aria-label="Прокрутити вліво"

        onClick={() => scroll("left")}

        className="
          absolute left-0 top-1/2
          -translate-y-1/2
          z-10
          bg-white/80
          backdrop-blur
          px-3 py-2
          rounded-full
          shadow
          hover:scale-110
        "
      >
        ◀
      </button>

      {/* Кнопка вправо */}
      <button

        aria-label="Прокрутити вправо"

        onClick={() => scroll("right")}

        className="
          absolute right-0 top-1/2
          -translate-y-1/2
          z-10
          bg-white/80
          backdrop-blur
          px-3 py-2
          rounded-full
          shadow
          hover:scale-110
        "
      >
        ▶
      </button>

      {/* Контейнер слайдера */}
      <div

        ref={scrollRef}

        className="
          flex gap-6
          overflow-x-auto
          scroll-smooth
          no-scrollbar
          py-2
        "
      >

        {/* Виведення товарів */}
        {products.map((product) => (

          <Link
            key={product.id}

            href={`/product/${product.id}`}

            className="
              min-w-[220px]
              max-w-[220px]
              bg-white
              rounded-xl
              shadow-md
              hover:shadow-xl
              transition
              p-3
            "
          >

            {/* Фото товару */}
            <div
              className="
                relative
                w-full h-48
                mb-3
              "
            >

              <Image
                src={product.image}

                alt={product.name}

                fill

                sizes="
                  (max-width: 768px) 50vw,
                  220px
                "

                className="
                  object-cover
                  rounded-lg
                "
              />

            </div>

            {/* Назва товару */}
            <h3
              className="
                font-semibold
                text-sm
                mb-1
                line-clamp-2
              "
            >
              {product.name}
            </h3>

            {/* Ціна */}
            <p className="text-lg font-bold">

              {product.price} грн

            </p>

          </Link>
        ))}

      </div>
    </div>
  )
}