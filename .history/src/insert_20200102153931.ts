import Hasura from "./hasura-orm";
interface InserType {
  [key: string]: [value:any]
}
export default class Insert extends Hasura {
  private _object: any = ''
  insert(...args: any) {


    args.forEach(field => {
      this._object+= ` `
    });
  }
}
