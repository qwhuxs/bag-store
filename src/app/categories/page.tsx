import Link from "next/link"

const categories = [
  { name: "Сумки через плече", description: "Зручні повсякденні сумки через плече" },
  { name: "Клатчі", description: "Невеликі елегантні сумки для вечірок" },
  { name: "Рюкзаки", description: "Стильні міські рюкзаки" },
  { name: "Сумки-тоут", description: "Місткі сумки для покупок або офісу" },
  { name: "Спортивні сумки", description: "Сумки для спорту та фітнесу" },
  { name: "Сумки на пояс", description: "Компактні сумки для пояса" },
  { name: "Сумки-хобо", description: "М'які сумки незвичної форми" },
  { name: "Дорожні сумки", description: "Великі сумки для подорожей" },
  { name: "Еко-сумки", description: "Сумки з натуральних матеріалів" },
  { name: "Сумки ручної роботи", description: "Ексклюзивні вироби ручної роботи" },
]

export default function CategoriesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Категорії товарів
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {categories.map((cat) => (
          <div
            key={cat.name}
            className="
              group relative bg-white rounded-2xl p-6 border border-gray-200
              shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 overflow-hidden
            "
          >

            {/* FIX: overlay не блокує кліки */}
            <div className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0]
              opacity-0 group-hover:opacity-10 transition
            " />

            <h2 className="
              text-xl font-semibold text-[#3F5F56]
              group-hover:text-[#D9A5A0] transition relative z-10
            ">
              {cat.name}
            </h2>

            <p className="text-gray-600 mt-2 text-sm relative z-10">
              {cat.description}
            </p>

            <Link
              href={`/catalog?category=${encodeURIComponent(cat.name)}`}
              className="
                relative z-10
                inline-block mt-5
                bg-gradient-to-r from-[#D9A5A0] to-[#B97E7B]
                text-white px-5 py-2 rounded-lg text-sm
                shadow-sm hover:scale-105 hover:shadow-md transition
              "
            >
              Переглянути товари
            </Link>

          </div>
        ))}

      </div>
    </div>
  )
}