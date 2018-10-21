
// @require ./cash.ts

function unique ( arr: any[] ) {
  return arr.filter ( ( item, index, self ) => self.indexOf ( item ) === index );
}

interface CashStatic {
  unique ( arr: any[] ): any[];
}

cash.unique = unique;
