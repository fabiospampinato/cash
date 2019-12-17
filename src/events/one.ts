
// @require core/cash.ts
// @require ./on.ts

interface Cash {
  one ( events: Record<string, EventCallback> ): this;
  one ( events: string, callback: EventCallback ): this;
  one ( events: string, selector: string | EventCallback, callback: EventCallback ): this;
}

function one ( this: Cash, eventFullName: Record<string, EventCallback> ): Cash;
function one ( this: Cash, eventFullName: string, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string, selector: string | EventCallback, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string | Record<string, EventCallback>, selector?: string | EventCallback, callback?: EventCallback ) {

  return this.on ( eventFullName, selector, callback, true );

};

fn.one = one;
