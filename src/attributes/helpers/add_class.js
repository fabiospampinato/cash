
// @require ./has_class.js

function addClass ( ele, cls ) {
  if ( ele.classList ) {
    ele.classList.add ( cls );
  } else if ( !hasClass ( ele, cls ) ) {
    ele.className += ` ${cls}`;
  }
}
