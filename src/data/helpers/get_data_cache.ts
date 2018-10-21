
// @require ./variables.ts

function getDataCache ( ele ) {
  return ele[dataNamespace] = ( ele[dataNamespace] || {} );
}
