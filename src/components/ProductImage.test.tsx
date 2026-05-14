import { render, screen } from "@testing-library/react"
import ProductImage from "./ProductImage"

test("renders image", () => {
  render(
    <ProductImage src="/test.jpg" />
  )

  expect(
    screen.getByAltText(/product/i)
  ).toBeInTheDocument()
})