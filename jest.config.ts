import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {

  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.tsx",
  ],

  testEnvironment: "jsdom",

collectCoverageFrom: [
  "src/components/**/*.{ts,tsx}",
  "src/lib/**/*.{ts,tsx}",

  "!src/**/*.test.{ts,tsx}",

  "!src/components/ProfileClient.tsx",
  "!src/components/ProfileEditForm.tsx",
  "!src/components/Header.tsx",

  "!src/lib/auth.ts",
  "!src/lib/prisma.ts",
  "!src/lib/isAdmin.ts",
],
}

export default createJestConfig(
  customJestConfig
)