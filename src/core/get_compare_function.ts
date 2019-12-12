
// @require ./matches.ts
// @require ./type_checking.ts

function getCompareFunction ( comparator?: Comparator ): (( i: number, ele: Ele ) => boolean) {

  return isString ( comparator )
           ? ( i: number, ele: Ele ) => matches ( ele, comparator )
           : isFunction ( comparator )
             ? comparator
             : isCash ( comparator )
               ? ( i: number, ele: Ele ) => comparator.is ( ele )
               : !comparator
                 ? () => false
                 : ( i: number, ele: Ele ) => ele === comparator;

}
