export default class Query {
  private fields: string
  private limit: number
  private schema: string
  constructor(schema: string) {
    this.schema = schema;
  }

  select(fields: string) {
    this.fields = fields.replace(/,/g, " ");
    return this;
  }
  limit(limit: number) {
    this.limit = limit
    return this;
  }

  where(...condition) {
    if (!condition || condition.length < 2 || condition.length > 3) {
      throw new Error("where need min: 2 and max: 3 args");
      return;
    }
    let where = {};
    if (condition.length == 2) {
      where = {
        [condition[0]]: {
          _eq: condition[1]
        }
      };
    }
    if (condition.length == 3) {
      where = {
        [condition[0]]: {
          ["_" + condition[1]]: condition[2]
        }
      };
    }

    return this;
  }
}
