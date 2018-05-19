
// @require ./variables.js

function find ( selector, context = doc ) {

  return classRe.test ( selector )
           ? context.getElementsByClassName ( selector.slice ( 1 ) )
           : tagRe.test ( selector )
             ? context.getElementsByTagName ( selector )
             : context.querySelectorAll ( selector );

}
