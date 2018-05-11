
// @require ./escape_regexp.js

function hasClass ( ele, cls ) {
  return ele.classList ? ele.classList.contains ( cls ) : new RegExp ( `(^| )${escapeRegExp ( cls )}( |$)`, 'gi' ).test ( ele.className );
}
