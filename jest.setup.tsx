import React from "react"

import "@testing-library/jest-dom"

// fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock

// next/image mock
jest.mock("next/image", () => ({
  __esModule: true,

  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {

    return <img {...props} />
  },
}))

// next/navigation mock
jest.mock("next/navigation", () => ({
  useRouter() {

    return {
      push: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
}))

// next-auth mock
jest.mock("next-auth/react", () => ({
  __esModule: true,

  useSession: jest.fn(() => ({
    data: null,
    status: "unauthenticated",
  })),

  signIn: jest.fn(),

  signOut: jest.fn(),

  SessionProvider: ({
    children,
  }: {
    children: React.ReactNode
  }) => children,
}))