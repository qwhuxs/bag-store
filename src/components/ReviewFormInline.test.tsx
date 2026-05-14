import { render, screen }
from "@testing-library/react"

import ReviewFormInline
from "./ReviewFormInline"

test("renders review button", () => {

  render(

    <ReviewFormInline
      productId="1"
    />
  )

  expect(

    screen.getByText(/відгук/i)

  ).toBeInTheDocument()
})