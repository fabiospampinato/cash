
// @require ./variables.ts

function find ( selector: string, context: Context = doc ) {

  return classRe.test ( selector )
           ? context.getElementsByClassName ( selector.slice ( 1 ) )
           : tagRe.test ( selector )
             ? context.getElementsByTagName ( selector )
             : context.querySelectorAll ( selector );

}
