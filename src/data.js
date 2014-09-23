
_.data = function(key,value){ // TODO: tear out into module for IE9
  if(!value){
    return this[0].dataset ? this[0].dataset[key] : $(this[0]).attr("data-"+key);
  } else {
    this.each(function(v){
      if(v.dataset) {
        v.dataset[key] = value;
      } else {
        $(v).attr("data-"+key,value);
      }
    });
    return this;
  }
};

 _.removeData = function(name){ // TODO: tear out into module for IE9
  this.each(function(v){
    if(v.dataset) {
      delete v.dataset[name];
    } else {
      $(v).removeAttr("data-"+name);
    }
  });
  return this;
};