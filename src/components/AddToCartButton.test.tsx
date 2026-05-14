import {
  render,
  screen,
} from "@testing-library/react"

import AddToCartButton
from "./AddToCartButton"

// Mock router
jest.mock(
  "next/navigation",
  () => ({
    useRouter() {
      return {
        push: jest.fn(),
        refresh: jest.fn(),
      }
    },
  })
)

test("renders add button", () => {

  render(

    <AddToCartButton
      productId="1"
    />
  )

  expect(

    screen.getByText(
      /додати/i
    )

  ).toBeInTheDocument()
})