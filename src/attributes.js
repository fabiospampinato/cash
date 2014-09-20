
_.addClass = function(className){
  this.each(function(v){
    if(!v.classList.contains(className)) {
      v.classList.add(className);
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

_.hasClass = function(className){
  return this[0].classList.contains(className);
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

_.removeClass = function(className){
  this.each(function(v){
    if(v.classList.contains(className)) {
      v.classList.remove(className);
    }
  });
  return this;
};