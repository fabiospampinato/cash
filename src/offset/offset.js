
// @require core/index.js

fn.offset = function () {

  const ele = this[0];

  if ( !ele ) return;

  const rect = ele.getBoundingClientRect ();

  return {
    top: rect.top + win.pageYOffset - docEl.clientTop,
    left: rect.left + win.pageXOffset - docEl.clientLeft
  };

};
