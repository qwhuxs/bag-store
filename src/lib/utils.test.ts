function getDiscountPrice(price: number, discount: number) {
  return Math.round(price * (1 - discount / 100))
}

test("calculates discount correctly", () => {
  expect(getDiscountPrice(1000, 10)).toBe(900)
})

test("no discount returns same price", () => {
  expect(getDiscountPrice(500, 0)).toBe(500)
})