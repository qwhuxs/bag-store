import Link from "next/link"

const categories = [
  { name: "Сумки через плече", description: "Зручні повсякденні сумки через плече", img: "/images/foto20.jpg" },
  { name: "Клатчі", description: "Невеликі елегантні сумки для вечірок", img: "/images/foto30.jpg" },
  { name: "Рюкзаки", description: "Стильні міські рюкзаки", img: "/images/foto1.jpg" },
  { name: "Сумки-тоут", description: "Місткі сумки для покупок або офісу", img: "/images/foto40.jpg" },
  { name: "Спортивні сумки", description: "Сумки для спорту та фітнесу", img: "/images/foto50.jpg" },
  { name: "Сумки на пояс", description: "Компактні сумки для пояса", img: "/images/foto60.jpg" },
  { name: "Сумки-хобо", description: "М'які сумки незвичної форми", img: "/images/foto70.jpg" },
  { name: "Дорожні сумки", description: "Великі сумки для подорожей", img: "/images/foto80.jpg" },
  { name: "Еко-сумки", description: "Сумки з натуральних матеріалів", img: "/images/foto85.jpg" },
  { name: "Сумки ручної роботи", description: "Ексклюзивні вироби ручної роботи", img: "/images/foto93.jpg" },
]

export default function CategoriesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* 🔥 Заголовок */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Категорії товарів
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] mt-3 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/categories/${encodeURIComponent(cat.name)}`}
            className="group relative h-56 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition"
          >

            {/* 🖼️ фон */}
            <img
              src={cat.img}
              className="absolute w-full h-full object-cover group-hover:scale-110 transition"
            />

            {/* 🌫 overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

            {/* 📝 текст */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h2 className="text-2xl font-bold">
                {cat.name}
              </h2>

              <p className="text-sm opacity-80 mt-1">
                {cat.description}
              </p>
            </div>

          </Link>
        ))}

      </div>
    </div>
  )
}