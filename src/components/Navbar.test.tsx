import { render, screen } from "@testing-library/react"

import Navbar from "./Navbar"

import { SessionProvider } from "next-auth/react"

test("renders navigation", () => {

  render(

    <SessionProvider session={null}>
      <Navbar />
    </SessionProvider>
  )

  expect(
    screen.getAllByText(/Головна/i)[0]
  ).toBeInTheDocument()
})