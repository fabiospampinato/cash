
// @require core/index.js

function getClasses ( cls ) {
  return isString ( cls ) && cls.match ( notWhitespaceRe );
}
