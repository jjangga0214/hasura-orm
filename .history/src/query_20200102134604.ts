import OrderBy from "./orderBy";

export default class Query {
  private _fields: string = ''
  private _limit: number = 0;
  private _orderBy: OrderBy = {};
  private _schema: string
  private _where = ''
  private _schemaArguments = '';
  private _with = ''

  constructor(schema: string) {
    this._schema = schema;
  }

  select(fields: string) {
    this._fields = fields.replace(/,/g, " ");
    return this;
  }
  limit(limit: number) {
    this._limit = limit
    this._schemaArguments + `{ limit:${limit} }`
    return this;
  }

  orderBy(...args: OrderBy[]): Query {
    if (args.length % 2 != 0) {
      throw new Error("args must be pairs");
    }
    this._orderBy = Object.assign(this._orderBy, ...args)
    // this._schemaArguments = { orderBy: this._orderBy }
    return this;
  }

  where(...condition: any) {
    if (!condition || condition.length < 2 || condition.length > 3) {
      throw new Error("where need min: 2 and max: 3 args");

    }
    let where = {};
    if (condition.length == 2) {
      where = `
        ${condition[0]}: {
          _eq: ${condition[1]}
        }
      `;
    }
    if (condition.length == 3) {
      where = `
        ${condition[0]}: {
          _${condition[1]}: ${Array.isArray(condition[2]) ? '[' + condition[2] + ']' : condition[2]}
        }
      `;
    }

    this._where += where;
    this._schemaArguments = ` where: {${this._where}}`
    return this;
  }

  with(schema: string, callback: (query: Query) => Query) {
    let qr = callback(new Query(schema))
    this._with += qr.parsed()

    return this;
  }
  private parsed() {
    return `${this._schema}${Object.keys(this._schemaArguments).length > 0 ? '(' + this._schemaArguments + ')' : ''}{ ${this._fields} ${this._with} }`
  }

  paginate(limit, offset){
    return ` ${this._schema}_aggregate{
      aggregate {
        count
      }
    }`
  }
  query() {
    return `query { ${this.parsed()} }
      `
  }
}