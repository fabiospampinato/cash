
_.append = function(content) {
  return this[0].appendChild($(content)[0]);
};


_.appendTo = function(content) {
  return $(content)[0].appendChild(this[0]);
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
  if(!content) {
    return this[0].innerHTML;
  } else {
    this.each(function(v){
      v.innerHTML = $(content)[0].outerHTML;
    });
    return this;
  }
};

_.insertAfter = function(selector){
  return $(selector)[0].insertAdjacentHTML("afterend",this[0].outerHTML);
};

_.insertBefore = function(selector){
  return $(selector)[0].insertAdjacentHTML("beforebegin",this[0].outerHTML);
};

_.prepend = function(selector){
  return $(this)[0].insertAdjacentHTML("afterBegin",$(selector)[0].outerHTML);
};

_.prependTo = function(selector){
  return $(selector)[0].insertAdjacentHTML("afterBegin",this[0].outerHTML);
};

_.remove = function(){
  this.each(function(v){
    v.parentNode.removeChild(v);
  });
};

_.text = function(content){
  if(!content) {
    return this[0].innerText;
  } else {
    this.each(function(v){
      v.innerText = content;
    });
  }
};