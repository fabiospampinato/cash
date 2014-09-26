
_.append = function(content) {
  this[0].appendChild($(content)[0]);
  return this;
};


_.appendTo = function(content) {
  $(content)[0].appendChild(this[0]);
  return this;
};

_.clone = function() {
  return $(this[0].cloneNode(true));
};

_.empty = function(){
  this.each(function(v){
    v.innerHTML = "";
  });
  return this;
};

_.html = function(content){
  var source;
  if(!content) {
    return this[0].innerHTML;
  } else {
    source = typeof content === "string" ? content : $(content)[0].outerHTML;
    this.each(function(v){
      v.innerHTML = source; 
    });
    return this;
  }
};

_.insertAfter = function(selector){
  $(selector)[0].insertAdjacentHTML("afterend",this[0].outerHTML);
  return this;
};

_.insertBefore = function(selector){
  $(selector)[0].insertAdjacentHTML("beforebegin",this[0].outerHTML);
  return this;
};

_.prepend = function(selector){
  $(this)[0].insertAdjacentHTML("afterBegin",$(selector)[0].outerHTML);
  return this;
};

_.prependTo = function(selector){
  $(selector)[0].insertAdjacentHTML("afterBegin",this[0].outerHTML);
  return this;
};

_.remove = function(){
  this.each(function(v){
    v.parentNode.removeChild(v);
  });
};

_.text = function(content){
  if(!content) {
    return this[0].textContent;
  } else {
    this.each(function(v){
      v.textContent = content;
    });
    return this;
  }
};