
var notWhiteMatch = /\S+/g;

cash.fn.extend({

  addClass: function(className){ // TODO: tear out into module for IE9
    var classes = className.match( notWhiteMatch ), spacedName, l;
    this.each(function(v){
      l = classes.length;
      if(v.classList) {
        while(l--) {
          v.classList.add(classes[l]);
        }
      } else {
        while(l--) {
          spacedName = " "+v.className+" ";
          if(spacedName.indexOf(" "+classes[l]+" ") === -1) {
            v.className += " " + classes[l];
          }
        }
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

  removeClass: function(className) { // TODO: tear out into module for IE9
    var classes = className.match( notWhiteMatch ),
    l, newClassName;
    this.each(function(v){
      l = classes.length;
      if(v.classList) {
        while(l--) {
          v.classList.remove(classes[l]);
        }
      } else {
        newClassName = " "+v.className+" ";
        while(l--) {
          newClassName = newClassName.replace(" "+classes[l]+" "," ");
        }
        v.className = newClassName.trim();
      }
    });
    return this;
  }

});
