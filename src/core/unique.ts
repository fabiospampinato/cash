
// @require ./cash.ts
// @require ./variables

function unique ( arr: ArrayLike<any> ): ArrayLike<any> {
  return filter.call ( arr, ( item, index, self ) => indexOf.call ( self, item ) === index );
}

interface CashStatic {
  unique ( arr: ArrayLike<any> ): ArrayLike<any>;
}

cash.unique = unique;
