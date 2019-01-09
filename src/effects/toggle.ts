
// @require core/cash.ts
// @require ./helpers/is_hidden.ts

interface Cash {
  toggle ( force?: boolean ): this;
}

const CASH_HIDDEN_CLASS = 'cash-hidden';


const styleElement = document.createElement('style');

styleElement.sheet.insertRule(`.${CASH_HIDDEN_CLASS} { display: none !important; }`);

document.head.appendChild(styleElement);


Cash.prototype.toggle = function ( this: Cash, force?: boolean ) {

  return this.each ( ( i, ele ) => {

    const _force = force !== undefined ? force : isHidden ( ele );

    ele.classList.toggle(CASH_HIDDEN_CLASS, _force);

  });

};
