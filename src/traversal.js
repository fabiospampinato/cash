
_.children = function(selector) {
  if(!selector){
    var children = this[0].children;
    $.extend(children, _);
    return children;
  } else {
    return $.sibling($(selector).firstChild);
  }
};

_.find = function(selector){
  var result;
  result = this[0].querySelectorAll(selector);
  $.extend(result, _);
  return result;
};

_.has = function(selector){
  return Array.prototype.filter.call(this, function(el){
    return $(el).find(selector).length !== 0;
  });
};

_.next = function(){
  return $(this[0].nextElementSibling);
};

_.not = function(selector) {
  return Array.prototype.filter.call(this, function(el){
    return $(el).parent().find(selector).length === 0;
  });
};

_.parent = function(){
  return $(this[0].parentElement);
};

_.parents = function(selector){
  if(!selector){
    return this.parent();
  } else {
    if($.matches(this.parent()[0],selector)) {
      return this.parent();
    } else {
      return this.parent().parents(selector);
    }
  }
};

_.prev = function(){
  return $(this[0].previousElementSibling);
};

_.siblings = function(){
  var collection = this.parent().children(), el = this[0];
  return Array.prototype.filter.call(collection,function(i){
    return i !== el;
  });
};