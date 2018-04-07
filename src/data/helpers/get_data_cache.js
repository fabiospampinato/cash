
function getDataCache ( ele ) {
  return ele[datasNamespace] = ( ele[datasNamespace] || {} );
}
