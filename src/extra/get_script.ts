
// @require core/cash.ts
// @require core/variables.ts

function getScript ( url: string, success?: Function ): void {

  const script = doc.createElement ( 'script' ),
        $anchor = cash ( 'script' );

  script.async = true;
  script.src = url;

  if ( success ) script.onload = () => success ();

  $anchor.before ( script );

}

interface CashStatic {
  getScript ( url: string, success?: Function ): void;
}

cash.getScript = getScript;
