import { render, screen } from "@testing-library/react"
import ReviewForm from "./ReviewForm"

test("renders review form", () => {
  render(<ReviewForm productId="1" />)

  expect(
    screen.getByText(/Додати відгук/i)
  ).toBeInTheDocument()
})