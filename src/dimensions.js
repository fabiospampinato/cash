
_.height = function(){
  return this[0].getBoundingClientRect().height;
};

_.innerWidth = function(){
  return this[0].clientWidth;
};

_.innerHeight = function(){
  return this[0].clientHeight;
};

_.outerWidth = function(margins){
  if(margins === true){
    return this[0].offsetWidth +
      (parseInt(getComputed(this,"margin-left"), 10) || 0) +
      (parseInt(getComputed(this,"margin-right"), 10) || 0);
  }
  return this[0].offsetWidth;
};

_.outerHeight = function(margins){
  if(margins === true){
    return this[0].offsetHeight +
      (parseInt(getComputed(this,"margin-top"), 10) || 0) +
      (parseInt(getComputed(this,"margin-bottom"), 10) || 0 );
  }
  return this[0].offsetHeight;
};

_.width = function(){
  return this[0].getBoundingClientRect().width;
};

function getComputed(el, prop) {
  var computed;
  computed = window.getComputedStyle(el[0],null);
  return computed[prop];
}