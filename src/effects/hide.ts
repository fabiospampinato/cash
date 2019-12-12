
// @require core/cash.ts
// @require ./toggle.ts

interface Cash {
  hide (): this;
}

fn.hide = function ( this: Cash ) {

  return this.toggle ( false );

};
