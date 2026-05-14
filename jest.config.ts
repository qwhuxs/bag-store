import nextJest from "next/jest"

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
  ],
}

export default createJestConfig(
  customJestConfig
)