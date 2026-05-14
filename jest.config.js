const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {

  // Підключення jest setup
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.tsx",
  ],

  // Середовище браузера
  testEnvironment: "jsdom",

  // Увімкнення coverage
  collectCoverage: true,

  // Які файли враховувати
  collectCoverageFrom: [

    // Компоненти, які тестуються
    "src/components/Footer.tsx",
    "src/components/Navbar.tsx",
    "src/components/ProductImage.tsx",
    "src/components/ProductSlider.tsx",
    "src/components/ReviewForm.tsx",

    // Не враховувати test файли
    "!**/*.test.{ts,tsx}",

    // Не враховувати node_modules
    "!**/node_modules/**",
  ],
}

module.exports =
  createJestConfig(customJestConfig)