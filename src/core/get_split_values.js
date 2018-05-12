
// @require ./type_checking.js

const splitValuesRe = /\S+/g;

function getSplitValues ( str ) {
  return isString ( str ) ? str.match ( splitValuesRe ) || [] : [];
}
