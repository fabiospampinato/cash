
// @require ./variables.ts

function find ( selector: string, context: Context = doc ) {

  return context !== doc && context.nodeType !== 1
           ? []
           : classRe.test ( selector )
             ? context.getElementsByClassName ( selector.slice ( 1 ) )
             : tagRe.test ( selector )
               ? context.getElementsByTagName ( selector )
               : context.querySelectorAll ( selector );

}
