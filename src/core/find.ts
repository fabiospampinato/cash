
// @require ./variables.ts

function find ( selector: string, context: Ele ): ArrayLike<Element> {

  const isFragment = isDocumentFragment ( context );

  return !selector || ( !isFragment && !isDocument ( context ) && !isElement ( context ) )
           ? []
           : !isFragment && classRe.test ( selector )
             ? context.getElementsByClassName ( selector.slice ( 1 ).replace ( /\\/g, '' ) )
             : !isFragment && tagRe.test ( selector )
               ? context.getElementsByTagName ( selector )
               : context.querySelectorAll ( selector );

}
