"use client"

// SessionProvider з next-auth
// використовується для роботи з авторизацією
import {
  SessionProvider,
} from "next-auth/react"

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    // Провайдер сесії
    // робить дані авторизації
    // доступними у всьому застосунку
    <SessionProvider>

      {children}

    </SessionProvider>
  )
}