import { render } from "@testing-library/react"

import SessionProviderWrapper
from "./SessionProviderWrapper"

test("renders provider", () => {

  render(

    <SessionProviderWrapper>

      <div>Test</div>

    </SessionProviderWrapper>
  )
})