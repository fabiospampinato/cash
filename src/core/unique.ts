
// @require ./cash.ts
// @require ./variables

function unique<T> ( arr: ArrayLike<T> ): ArrayLike<T> {
  return arr.length > 1 ? filter.call ( arr, ( item: T, index: number, self: ArrayLike<T> ) => indexOf.call ( self, item ) === index ) : arr;
}

interface CashStatic {
  unique<T> ( arr: ArrayLike<T> ): ArrayLike<T>;
}

cash.unique = unique;
