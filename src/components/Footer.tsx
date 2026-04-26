export default function Footer() {
  return (
    <footer className="mt-20">

      {/* фон на всю ширину */}
      <div className="bg-gradient-to-r from-[#3F5F56] to-[#D9A5A0] text-white py-10 px-6">

        {/* ❗ ОСЬ ТУТ обмеження ширини */}
        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-3 gap-8">

            {/* 👜 Бренд */}
            <div>
              <h3 className="text-xl font-bold mb-3">
                Euphoria Bags
              </h3>
              <p className="opacity-90 text-sm">
                Інтернет-магазин модних сумок та аксесуарів
              </p>
            </div>

            {/* 📞 Контакти */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Контакти
              </h3>
              <p className="text-sm opacity-90">
                +380 931 354 729
              </p>
              <p className="text-sm opacity-90">
                info@euphoria.com
              </p>
            </div>

            {/* ⏰ Час роботи */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Час роботи
              </h3>
              <p className="text-sm opacity-90">
                Пн–Пт: 9:00 – 18:00
              </p>
              <p className="text-sm opacity-90">
                Сб–Нд: вихідний
              </p>
            </div>

          </div>

          {/* нижня частина */}
          <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm opacity-80">
            © {new Date().getFullYear()} Euphoria. Всі права захищені.
          </div>

        </div>
      </div>
    </footer>
  )
}