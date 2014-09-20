
_.data = function(key,value){
  if(!value){
    return this[0].dataset[key];
  } else {
    this.each(function(v){
      v.dataset[key] = value;
    });
    return this;
  }
};

 _.removeData = function(name){
  this.each(function(v){
    if(v.dataset[name]) {
      delete v.dataset[name];
    }
  });
  return this;
};