var docEl = doc.documentElement;

fn.extend({

  position(){
    var el = this[0];
    if ( !el ) {
      return;
    }
    return {
      left: el.offsetLeft,
      top: el.offsetTop
    };
  },

  offset(){
    if ( !this[0] ) {
      return;
    }
    var rect = this[0].getBoundingClientRect();
    return {
      top: rect.top + win.pageYOffset - docEl.clientTop,
      left: rect.left + win.pageXOffset - docEl.clientLeft
    };
  },

  offsetParent(){ return cash(this[0].offsetParent); }

});
