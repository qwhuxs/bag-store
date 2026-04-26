import Providers from "./providers"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "Euphoria Bags — стильні сумки, рюкзаки та аксесуари",
  description:
    "Інтернет-магазин стильних сумок, рюкзаків та аксесуарів. Хіти продажу, новинки та знижки до -10%.",

  openGraph: {
    title: "Euphoria Bags",
    description:
      "Стильні сумки, рюкзаки та аксесуари онлайн",
    images: ["/images/foto1.jpg"],
  },

  keywords: [
    "сумки",
    "рюкзаки",
    "аксесуари",
    "магазин сумок",
    "жіночі сумки",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body
        className="
          fade-in
          flex flex-col min-h-screen
          bg-gradient-to-br from-[#f5f3f2] to-[#e9e4e1]
          text-gray-800
        "
      >

        <Providers>

          {/* 🔔 TOAST */}
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ top: 20 }}
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "14px",
                padding: "14px 18px",
                fontSize: "14px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              },
              success: {
                style: {
                  background: "linear-gradient(135deg, #3F5F56, #6e8f86)",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "linear-gradient(135deg, #ef4444, #f87171)",
                  color: "#fff",
                },
              },
            }}
          />

          <Navbar />

          <main className="flex-grow w-full px-4 md:px-6 py-10">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>

          <Footer />

        </Providers>

      </body>
    </html>
  )
}