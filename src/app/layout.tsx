import Providers from "./providers"
import "./globals.css"
import Navbar from "@/components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className="fade-in">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}