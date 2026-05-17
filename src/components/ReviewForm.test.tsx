import { render, screen } from "@testing-library/react"
import ReviewForm from "./ReviewForm"

test("renders login message", () => {
  render(
    <ReviewForm
      productId="1"
      isAuthenticated={false}
    />
  )

  expect(
    screen.getByText(/Увійдіть в акаунт/i)
  ).toBeInTheDocument()
})