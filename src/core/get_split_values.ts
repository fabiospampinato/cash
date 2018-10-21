
// @require ./type_checking.ts

const splitValuesRe = /\S+/g;

function getSplitValues ( str ) {
  return isString ( str ) ? str.match ( splitValuesRe ) || [] : [];
}
