import "@testing-library/jest-dom"

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock

jest.mock("next/image", () => ({
  __esModule: true,

  default: (props: any) => {

    const {
      fill,
      ...rest
    } = props

    return <img {...rest} />
  },
}))