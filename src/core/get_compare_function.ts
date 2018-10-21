
// @require ./matches.ts
// @require ./type_checking.ts

function getCompareFunction ( selector ) {

  return isString ( selector )
           ? ( i, ele ) => matches ( ele, selector )
           : selector.__cash
             ? ( i, ele ) => selector.is ( ele )
             : ( i, ele, selector ) => ele === selector;

}
