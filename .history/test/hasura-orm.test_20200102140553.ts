import Query from "../src/query"

/**
 * Query test
 */
describe("Query test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("Query is instantiable", () => {
    expect(new Query('products')).toBeInstanceOf(Query)
  })

  it("Query where error", () => {
    expect(new Query('products').where('rest', 'gte', '1', '2')).toThrowE(Error)
  })

  it('Query select', () => {
    expect(new Query('products').select('1,2,3')).toBeInstanceOf(Query)
    console.log(new Query('products').select('id,rest,price')
      .where('rest', 'gte', '1')
      .with('product_locales', (query) => {
        return query.select('name')
          .where('locales_id', '1')
      })
      .orderBy({ rest: 'asc' })
      .distinct('rest')
      .paginate(5, 0)
      .query());
  })
})
