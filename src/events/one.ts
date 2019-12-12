
// @require core/cash.ts
// @require ./on.ts

interface Cash {
  one ( events: plainObject ): this;
  one ( events: string, callback: EventCallback ): this;
  one ( events: string, selector: string | EventCallback, callback: EventCallback ): this;
}

function one ( this: Cash, eventFullName: plainObject ): Cash;
function one ( this: Cash, eventFullName: string, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string, selector: string | EventCallback, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string | plainObject, selector?: string | EventCallback, callback?: EventCallback ) {

  return this.on ( eventFullName as string, selector, callback, true ); //TSC

};

fn.one = one;
