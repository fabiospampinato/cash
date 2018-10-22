
// @require ./variables.ts

function getDataCache ( ele: HTMLElement ): plainObject {
  return ele[dataNamespace] = ( ele[dataNamespace] || {} );
}
