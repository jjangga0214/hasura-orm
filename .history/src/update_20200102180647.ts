import Hasura from "./hasura-orm";
import { transform, stringify, hasRelation } from "./helper";

interface InserType {
  [key: string]: any
}
export default class Insert extends Hasura {
  private _object: any = ''
  constructor(_schema: string) {
    super('update_' + _schema);
  }

  update(set: any , where) {
    this._object += '{'
    args.forEach((value: any) => {
      this._object += stringify(hasRelation(value))
    })
    this._object += '}'

    return this;
  }


  parsed() {
    return ` ${this._schema} ${'(objects:[' + this._schemaArguments + '])'}{  ${this._fields ? ' returning { ' + this._fields + ' }' : 'affected_rows'} }`
  }

  query() {
    this._schemaArguments += this._object;
    return `mutation {  ${this.parsed()}  }`
  }
}
