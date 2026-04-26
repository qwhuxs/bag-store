import { render, screen } from "@testing-library/react"
import ProductSlider from "./ProductSlider"

const mockProducts = [
  {
    id: "1",
    name: "Test Bag",
    price: 100,
    image: "/images/foto1.jpg",
  },
]

test("renders product slider", () => {
  render(<ProductSlider products={mockProducts} />)

  expect(screen.getByText("Test Bag")).toBeInTheDocument()
})