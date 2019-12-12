
// @require core/cash.ts
// @require ./toggle.ts

interface Cash {
  show (): this;
}

fn.show = function ( this: Cash ) {

  return this.toggle ( true );

};
