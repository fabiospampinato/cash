
// @require ./matches.ts
// @require ./type_checking.ts

function getCompareFunction ( comparator: Comparator ): Function {

  return isString ( comparator )
           ? ( i, ele ) => matches ( ele, comparator )
           : isFunction ( comparator )
             ? comparator
             : isCash ( comparator )
               ? ( i, ele ) => comparator.is ( ele )
               : ( i, ele ) => ele === comparator;

}
