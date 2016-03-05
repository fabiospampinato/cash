var docEl = doc.documentElement;

fn.extend({

  position(){
    var el = this[0];
    return {
      left: el.offsetLeft,
      top: el.offsetTop
    };
  },

  offset(){
    var rect = this[0].getBoundingClientRect();
    return {
      top: rect.top + win.pageYOffset - docEl.clientTop,
      left: rect.left + win.pageXOffset - docEl.clientLeft
    };
  },

  offsetParent(){ return cash(this[0].offsetParent); }

});
