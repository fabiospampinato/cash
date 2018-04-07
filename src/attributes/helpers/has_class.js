
function hasClass ( ele, cls ) { //FIXME: The regex won't work for classes containing special characters, sush as `$`
  return ele.classList ? ele.classList.contains ( cls ) : new RegExp ( `(^| )${cls}( |$)`, 'gi' ).test ( ele.className );
}
