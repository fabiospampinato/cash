
// @require core/attempt.ts
// @require core/camel_case.ts

function setData ( ele: EleLoose, key: string, value: any ): void {

  value = attempt ( JSON.stringify, value );

  ele.dataset[camelCase ( key )] = value;

}
