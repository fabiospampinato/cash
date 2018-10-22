
// @require core/cash.ts
// @require ./helpers/variables.ts

function hasData ( ele: HTMLElement ): boolean {
  return dataNamespace in ele;
}

interface CashStatic {
  hasData ( ele: HTMLElement ): boolean;
}

cash.hasData = hasData;
