import "@testing-library/jest-dom"

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, ...props }) => {
    return <img {...props} />
  },
}))