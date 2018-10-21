
// @require core/cash.ts
// @require ./on.ts

interface Cash {
  one ( events: plainObject ): this;
  one ( events: string, callback: Function ): this;
  one ( events: string, selector: string | Function, callback: Function ): this;
}

function one ( this: Cash, eventFullName: plainObject ): Cash;
function one ( this: Cash, eventFullName: string, callback: Function ): Cash;
function one ( this: Cash, eventFullName: string, selector: string | Function, callback: Function ): Cash;
function one ( this: Cash, eventFullName: string | plainObject, selector?: string | Function, callback?: Function ) {
  return this.on ( ( eventFullName as string ), selector, callback, true ); //TSC
};

Cash.prototype.one = one;
