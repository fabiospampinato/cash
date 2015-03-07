var notWhiteMatch = /\S+/g;

fn.extend({

  addClass(className) {
    var classes = className.match(notWhiteMatch),
      spacedName, l;

    this.each(v => {
      l = classes.length;

      if (v.classList) {
        while (l--) {
          v.classList.add(classes[l]);
        }
      } else {
        while (l--) {
          spacedName = ` ${v.className} `;

          if (spacedName.indexOf(` ${classes[l]} `) === -1) {
            v.className += ' ' + classes[l];
          }
        }
      }
    });

    return this;
  },

  attr(name, value) {
    if (!value) {
      return this[0].getAttribute(name);
    } else {
      this.each(v => v.setAttribute(name, value));

      return this;
    }
  },

  hasClass(className) {

    if(!this.length || typeof className !== 'string' || !className) {
      return false;
    }

    var classes = className.match(notWhiteMatch),
      spacedName, l, has = true;

    this.each(v => {
      l = classes.length;

      if (v.classList) {
        while (l--) {
          if( !v.classList.contains(classes[l]) ) {
            has = false;
          }
        }
      } else {
        while (l--) {
          spacedName = ` ${v.className} `;

          if (spacedName.indexOf(` ${classes[l]} `) === -1) {
            has = false;
          }
        }
      }

    });

    return has;

  },

  prop(name) {
    return this[0][name];
  },

  removeAttr(name) {
    this.each(v => v.removeAttribute(name));
    return this;
  },

  removeClass(className) { // TODO: tear out into module for IE9
    var classes = className.match(notWhiteMatch),
      l, newClassName;

    this.each(v => {
      l = classes.length;

      if (v.classList) {
        while (l--) {
          v.classList.remove(classes[l]);
        }
      } else {
        newClassName = ` ${v.className} `;

        while (l--) {
          newClassName = newClassName.replace(` ${classes[l]} `, ' ');
        }

        v.className = newClassName.trim();
      }
    });

    return this;
  },

  toggleClass(className) {

    var classes = className.match(notWhiteMatch), l;

    this.each(v => {
      l = classes.length;

      while(l--) {
        if (cash(v).hasClass(classes[l])) {
          cash(v).removeClass(classes[l]);
        } else {
          cash(v).addClass(classes[l]);
        }
      }
    });

    return this;
    
  }

});
