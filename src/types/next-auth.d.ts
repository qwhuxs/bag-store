// Імпортуємо тип стандартної сесії з next-auth
import type {
  DefaultSession,
} from "next-auth"

// Розширення типів для next-auth
declare module "next-auth" {

  // Описуємо власну структуру Session
  interface Session {

    user: {

      // Унікальний ID користувача
      id: string

      // Роль користувача (USER / ADMIN)
      role?: string

      // Додаємо стандартні поля user (name, email, image)
    } & DefaultSession["user"]
  }
}

// Розширення типів JWT токена
declare module "next-auth/jwt" {

  interface JWT {

    // ID користувача в токені
    id?: string

    // Роль користувача
    role?: string

    // Фото профілю користувача
    picture?: string | null
  }
}