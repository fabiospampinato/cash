
_.each = Array.prototype.forEach;

_.eq = function(index){
  return $(this[index]);
};

_.filter = function(){
  if(typeof arguments[0] === "string") {
    var selector = arguments[0];
    return Array.prototype.filter.call(this, function(e){
      return $.matches(e, selector);
    });
  } else {
    return Array.prototype.filter.call(this, arguments[0]);
  }
};

_.first = function(){
  return this[0];
};

_.get = function( num ) {
  return num != null ?
    ( num < 0 ? this[ num + this.length ] : this[ num ] ) :
    slice.call( this );
};

_.index = function(elem){
  if(!elem) {
    return Array.prototype.slice.call($(this[0]).parent().children()).indexOf(this[0]);
  } else {
    return Array.prototype.slice.call($(elem).children()).indexOf(this[0]);
  }
};

_.last = function(){
  return this[this.length -1];
};