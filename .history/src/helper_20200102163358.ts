export function transform(value: any) {
  if (!['object', 'undefined', 'function'].includes(typeof value)) {
    return value
  } else if (typeof value === 'undefined') {
    throw new Error('Undefined value')
  }
  let result = '[ '
  if (Array.isArray(value)) {

    value.forEach(val => {
      result += parseObject(val);
    });

  } else {
    result += parseObject(value);
  }

  result += ' ]'
  return result;

}

export function parseObject(value: any) {
  let obj = ''
  Object.keys(value).forEach(key => {
    obj += `{ ${key}:  ${typeof value[key] === 'string' ? '"' + value[key] + '"' : value[key]} }`
  })
  return obj;
}

function stringify(obj_from_json){
	if(typeof obj_from_json !== "object" || Array.isArray(obj_from_json)){
    	// not an object, stringify using native function
    	return JSON.stringify(obj_from_json);
    }
    // Implements recursive object serialization according to JSON spec
    // but without quotes around the keys.
    let props = Object
    	.keys(obj_from_json)
        .map(key => `${key}:${stringify(obj_from_json[key])}`)
        .join(",");
    return `{${props}}`;
}