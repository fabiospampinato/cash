
function removeClass ( ele, cls ) {
  if ( ele.classList ) {
    ele.classList.remove ( cls );
  } else {
    ele.className = ele.className.replace ( cls, '' );
  }
}
