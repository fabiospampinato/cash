
cash.fn.extend({

  addClass: function(className){ // TODO: tear out into module for IE9
    this.each(function(v){
      if(v.classList) {
        v.classList.add(className);
      } else {
        v.className += " " + className;
      }
    });
    return this;
  },

  attr: function(attr,value) {
    if(!value){
      return this[0].getAttribute(attr);
    } else {
      this.each(function(v){
        v.setAttribute(attr,value);
      });
      return this;
    }
  },

  hasClass: function(className){ // TODO: tear out into module for IE9
    if(this[0].classList) {
      return this[0].classList.contains(className);
    } else {
      return this[0].className.indexOf(className) !== -1;
    }
  },

  prop: function(prop){
    return this[0][prop];
  },

  removeAttr: function(attr){
    this.each(function(v){
      v.removeAttribute(attr);
    });
    return this;
  },

  removeClass: function(className){ // TODO: tear out into module for IE9
    this.each(function(v){
      if(v.classList) {
        v.classList.remove(className);
      } else {
        v.className = v.className.replace(className,"");
      }
    });
    return this;
  }

});
