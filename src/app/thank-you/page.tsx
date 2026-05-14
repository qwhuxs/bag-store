export default function ThankYouPage() {
  return (

    // Основний контейнер сторінки
    <div
      className="
        min-h-[70vh]
        flex items-center justify-center
        px-4
      "
    >

      {/* Карточка повідомлення */}
      <div
        className="
          max-w-xl
          w-full
          bg-white
          rounded-3xl
          shadow-xl
          p-10
          text-center
        "
      >

        {/* Emoji */}
        <div className="text-6xl mb-6">
          🎉
        </div>

        {/* Заголовок */}
        <h1 className="text-4xl font-bold mb-4">
          Дякуємо за замовлення!
        </h1>

        {/* Текст повідомлення */}
        <p className="text-gray-600 text-lg mb-8">

          Ваше замовлення успішно оформлено.

          Найближчим часом менеджер
          зв’яжеться з вами.

        </p>

        {/* Кнопка повернення */}
        <a
          href="/"

          className="
            inline-block
            bg-[#3F5F56]
            text-white
            px-8 py-3
            rounded-xl
            hover:opacity-90
            transition
          "
        >
          Повернутися на головну
        </a>

      </div>
    </div>
  )
}