import Query from "../src/query"

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("DummyClass is instantiable", () => {
    expect( console.log(new Query('products'));).toBeInstanceOf(DummyClass)
  })
})
