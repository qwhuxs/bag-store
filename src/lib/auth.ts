// NextAuth — бібліотека для авторизації
import NextAuth, {
  NextAuthOptions,
} from "next-auth"

// OAuth провайдери
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"

// Авторизація через email + пароль
import CredentialsProvider from "next-auth/providers/credentials"

// Prisma adapter для збереження користувачів у БД
import {
  PrismaAdapter,
} from "@next-auth/prisma-adapter"

// Prisma client
import { prisma } from "./prisma"

// bcrypt для перевірки паролів
import bcrypt from "bcryptjs"

// Налаштування NextAuth
export const authOptions:
  NextAuthOptions = {

  // Підключення Prisma
  adapter: PrismaAdapter(prisma),

  // JWT стратегія сесії
  session: {
    strategy: "jwt",
  },

  // Провайдери авторизації
  providers: [

    // GitHub авторизація
    GitHubProvider({

      clientId:
        process.env.GITHUB_ID!,

      clientSecret:
        process.env.GITHUB_SECRET!,
    }),

    // Google авторизація
    GoogleProvider({

      clientId:
        process.env.GOOGLE_CLIENT_ID!,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Discord авторизація
    DiscordProvider({

      clientId:
        process.env.DISCORD_CLIENT_ID!,

      clientSecret:
        process.env.DISCORD_CLIENT_SECRET!,
    }),

    // Авторизація через email + пароль
    CredentialsProvider({

      name: "Credentials",

      // Поля форми
      credentials: {

        email: {},

        password: {},
      },

      // Перевірка користувача
      async authorize(credentials) {

        try {

          // Перевірка на пусті поля
          if (
            !credentials?.email ||
            !credentials?.password
          ) return null

          // Пошук користувача
          const user =
            await prisma.user.findUnique({

              where: {
                email:
                  credentials.email,
              },
            })

          // Якщо користувача нема
          // або нема пароля
          if (
            !user ||
            !user.password
          ) return null

          // Перевірка пароля
          const isValid =
            await bcrypt.compare(

              credentials.password,

              user.password
            )

          // Якщо пароль невірний
          if (!isValid) return null

          // Дані користувача
          return {

            id: user.id,

            email: user.email,

            role: user.role,
          }

        } catch (e) {

          // Помилка авторизації
          console.error(
            "AUTH ERROR:",
            e
          )

          return null
        }
      },
    }),
  ],

  // Callback функції
  callbacks: {

    // JWT callback
    async jwt({
      token,
      user,
    }) {

      // Якщо користувач є
      if (user) {

        // Збереження id
        token.id =
          (user as any).id

        // Збереження email
        token.email =
          (user as any).email

        // Збереження ролі
        token.role =
          (user as any).role

        // Збереження фото профілю
        token.picture =
          (user as any).image
      }

      return token
    },

    // Session callback
    async session({
      session,
      token,
    }) {

      // Якщо є user
      if (session.user) {

        // Передача id
        session.user.id =
          token.id as string

        // Передача email
        session.user.email =
          token.email as string

        // Передача ролі
        ;(session.user as any).role =
          token.role

        // Передача фото профілю
        session.user.image =
          token.picture as string
      }

      return session
    },
  },

  // Кастомна сторінка логіну
  pages: {
    signIn: "/login",
  },

  // Secret ключ NextAuth
  secret:
    process.env.NEXTAUTH_SECRET,
}

// Створення handler
const handler =
  NextAuth(authOptions)

// Export API route
export {
  handler as GET,
  handler as POST,
}