var notWhiteMatch = /\S+/g;

fn.extend({

  addClass(c){
    var classes = c.match(notWhiteMatch);

		return this.each(v => {
      var spacedName = ` ${v.className} `;
			cash.each(classes,c => {
        if (v.classList) { v.classList.add(c); }
        else if ( spacedName.indexOf(` ${c} `) ) { v.className += ' ' + c; }
      });
    });
  },

  attr(name, value) {
    if ( !value ) {
      return this[0].getAttribute(name);
    } else {
      this.each(v => v.setAttribute(name, value));

      return this;
    }
  },

  hasClass(c) {
    var check = false;
    this.each(v => {
      check = ( v.classList ?
      	v.classList.contains(c) :
      	new RegExp('(^| )' + c + '( |$)', 'gi').test(v.className)
      );
      return !check;
    });
    return check;
  },

  prop(name) {
    return this[0][name];
  },

  removeAttr(name) {
    this.each(v => v.removeAttribute(name));
    return this;
  },

  removeClass(c){
    var classes = c.match(notWhiteMatch);

    return this.each(v => {
	    cash.each(classes,c => {
        if (v.classList) { v.classList.remove(c); }
        else { v.className = v.className.replace(c,''); }
      });
    });
  },

});
