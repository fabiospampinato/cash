
const queryEncodeSpaceRe = /%20/g;

function queryEncode ( prop, value ) {

  return `&${encodeURIComponent ( prop )}=${encodeURIComponent ( value ).replace ( queryEncodeSpaceRe, '+' )}`;

}
