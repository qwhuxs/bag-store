"use client"

// Провайдер NextAuth для роботи із сесіями
import { SessionProvider } from "next-auth/react"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    // SessionProvider надає доступ
    // до даних авторизації
    <SessionProvider

      // Оновлення сесії при поверненні у вкладку
      refetchOnWindowFocus={true}

      // Інтервал автоматичного оновлення
      // 0 = вимкнено
      refetchInterval={0}
    >

      {/* Вкладені компоненти */}
      {children}

    </SessionProvider>
  )
}