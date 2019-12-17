
// @require ./matches.ts
// @require ./type_checking.ts

function getCompareFunction ( comparator?: Comparator ): (( i: number, ele: EleLoose ) => boolean) {

  return isString ( comparator )
           ? ( i: number, ele: EleLoose ) => matches ( ele, comparator )
           : isFunction ( comparator )
             ? comparator
             : isCash ( comparator )
               ? ( i: number, ele: EleLoose ) => comparator.is ( ele )
               : !comparator
                 ? () => false
                 : ( i: number, ele: EleLoose ) => ele === comparator;

}
