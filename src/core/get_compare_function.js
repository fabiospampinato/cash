
// @require ./matches.js
// @require ./type_checking.js

function getCompareFunction ( selector ) {

  return isString ( selector )
           ? ( i, ele ) => matches ( ele, selector )
           : selector.__cash
             ? ( i, ele ) => selector.is ( ele )
             : ( i, ele, selector ) => ele === selector;

}
