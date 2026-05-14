// Провайдери для NextAuth та інших глобальних станів
import Providers from "./providers"

// Глобальні стилі проєкту
import "./globals.css"

// Навігаційна панель
import Navbar from "@/components/Navbar"

// Footer сайту
import Footer from "@/components/Footer"

// Компонент повідомлень
import { Toaster } from "react-hot-toast"

// SEO metadata сайту
export const metadata = {

  // Базова URL-адреса сайту
  metadataBase: new URL(
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000"
  ),

  // Заголовок сайту
  title:
    "Euphoria Bags — стильні сумки, рюкзаки та аксесуари",

  // Опис сайту
  description:
    "Інтернет-магазин стильних сумок, рюкзаків та аксесуарів. Хіти продажу, новинки та знижки до -10%.",

  // Open Graph для соцмереж
  openGraph: {

    title: "Euphoria Bags",

    description:
      "Стильні сумки, рюкзаки та аксесуари онлайн",

    // Головна сторінка
    url: "/",

    // Назва сайту
    siteName: "Euphoria Bags",

    // Зображення прев’ю
    images: [
      {
        url: "/images/foto1.jpg",
        width: 1200,
        height: 630,
        alt: "Euphoria Bags",
      },
    ],

    // Мова сайту
    locale: "uk_UA",

    // Тип сторінки
    type: "website",
  },

  // Налаштування Twitter preview
  twitter: {

    card: "summary_large_image",

    title: "Euphoria Bags",

    description:
      "Стильні сумки онлайн",

    images: ["/images/foto1.jpg"],
  },

  // Ключові слова для SEO
  keywords: [
    "сумки",
    "рюкзаки",
    "аксесуари",
    "магазин сумок",
    "жіночі сумки",
  ],

  // Favicon сайту
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    // ✅ ДОДАНО data-scroll-behavior
    <html
      lang="uk"
      data-scroll-behavior="smooth"
    >

      <body
        className="
          fade-in
          flex flex-col min-h-screen
          bg-gradient-to-br
          from-[#f5f3f2]
          to-[#e9e4e1]
          text-gray-800
        "
      >

        {/* Глобальні провайдери */}
        <Providers>

          {/* Toast повідомлення */}
          <Toaster

            // Позиція повідомлень
            position="top-center"

            // Відстань між toast
            gutter={12}

            // Відступ зверху
            containerStyle={{ top: 20 }}

            // Налаштування стилів toast
            toastOptions={{

              // Час показу
              duration: 3000,

              style: {
                borderRadius: "14px",
                padding: "14px 18px",
                fontSize: "14px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.1)",
              },

              // Стилі success toast
              success: {
                style: {
                  background:
                    "linear-gradient(135deg, #3F5F56, #6e8f86)",

                  color: "#fff",
                },
              },

              // Стилі error toast
              error: {
                style: {
                  background:
                    "linear-gradient(135deg, #ef4444, #f87171)",

                  color: "#fff",
                },
              },
            }}
          />

          {/* Верхня панель сайту */}
          <Navbar />

          {/* Основний контент */}
          <main
            className="
              flex-grow
              w-full
              px-4 md:px-6
              py-10
            "
          >

            {/* Обмеження ширини контенту */}
            <div className="max-w-6xl mx-auto">

              {children}

            </div>

          </main>

          {/* Footer */}
          <Footer />

        </Providers>

      </body>
    </html>
  )
}