import { render, screen } from "@testing-library/react"
import CartItem from "./CartItem"

const mockItem = {
  id: "1",
  quantity: 1,

  product: {
    id: "1",
    name: "Test Bag",
    image: "/test.jpg",
    price: 1000,
    stock: 5,
  },
}

test("renders cart item", () => {
  render(<CartItem item={mockItem} />)

  expect(
    screen.getByText("Test Bag")
  ).toBeInTheDocument()
})