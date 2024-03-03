
// @require core/attempt.ts
// @require core/camel_case.ts

function setData ( ele: EleLoose, key: string, value: any ): void {

  ele.dataset[camelCase ( key )] = attempt ( JSON.stringify, value );

}
