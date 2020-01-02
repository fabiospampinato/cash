
// @require core/cash.ts
// @require ./on.ts

interface Cash {
  one ( events: Record<string, EventCallback> ): this;
  one ( events: Record<string, EventCallback>, selector: string ): this;
  one ( events: Record<string, EventCallback>, data: any ): this;
  one ( events: Record<string, EventCallback>, selector: string | null | undefined, data: any ): this;
  one ( events: string, callback: EventCallback ): this;
  one ( events: string, selector: string, callback: EventCallback ): this;
  one ( events: string, data: any, callback: EventCallback ): this;
  one ( events: string, selector: string | null | undefined, data: any, callback: EventCallback ): this;
}

function one ( this: Cash, eventFullName: Record<string, EventCallback> ): Cash;
function one ( this: Cash, eventFullName: Record<string, EventCallback>, selector: string ): Cash;
function one ( this: Cash, eventFullName: Record<string, EventCallback>, data: any ): Cash;
function one ( this: Cash, eventFullName: Record<string, EventCallback>, selector: string | null | undefined, data: any ): Cash;
function one ( this: Cash, eventFullName: string, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string, selector: string, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string, data: any, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string, selector: string | null | undefined, data: any, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: Record<string, EventCallback> | string, selector?: any, data?: any, callback?: EventCallback ) {

  return this.on ( eventFullName, selector, data, callback, true );

};

fn.one = one;
