
// @require core/cash.ts
// @require core/variables.ts

interface CashStatic {
  getScript ( url: string, success?: Function ): void;
}

cash.getScript = function ( url: string, success?: Function ): void {

  const script = createElement ( 'script' );
  const $anchor = cash ( 'script' );

  script.async = true;
  script.src = url;

  if ( success ) script.onload = () => { success () };

  $anchor.before ( script );

};
