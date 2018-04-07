
// @require core/index.js

function queryEncode ( prop, value ) {

  return `&${encodeURIComponent ( prop )}=${encodeURIComponent ( value ).replace ( querySpaceRe, '+' )}`;

}
