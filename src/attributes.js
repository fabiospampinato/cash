
_.addClass = function(className){ // TODO: tear out into module for IE9
  this.each(function(v){
    if(v.classList) {
      v.classList.add(className);
    } else {
      v.className += " " + className;
    }
  });
  return this;
};

_.attr = function(attr,value) {
  if(!value){
    return this[0].getAttribute(attr);
  } else {
    this.each(function(v){
      v.setAttribute(attr,value);
    });
    return this;
  }
};

_.hasClass = function(className){ // TODO: tear out into module for IE9
  if(this[0].classList) {
    return this[0].classList.contains(className);
  } else {
    return this[0].className.indexOf(className) !== -1;
  }
};

_.prop = function(prop){
  return this[0][prop];
}; 

_.removeAttr = function(attr){
  this.each(function(v){
    v.removeAttribute(attr);
  });
  return this;
};

_.removeClass = function(className){ // TODO: tear out into module for IE9
  this.each(function(v){
    if(v.classList) {
      v.classList.remove(className);
    } else {
      v.className = v.className.replace(className,"");
    }
  });
  return this;
};