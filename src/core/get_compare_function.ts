
// @require ./matches.ts
// @require ./type_checking.ts

function getCompareFunction ( comparator: Comparator ): Function {

  return isString ( comparator )
           ? ( i: number, ele: Ele ) => matches ( ele, comparator )
           : isFunction ( comparator )
             ? comparator
             : isCash ( comparator )
               ? ( i: number, ele: Ele ) => comparator.is ( ele )
               : ( i: number, ele: Ele ) => ele === comparator;

}
