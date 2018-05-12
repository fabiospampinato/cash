
// @require ./variables.js

function getDataCache ( ele ) {
  return ele[dataNamespace] = ( ele[dataNamespace] || {} );
}
