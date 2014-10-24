
cash.fn.extend({

  append: function(content) {
    this[0].appendChild($(content)[0]);
    return this;
  },

  appendTo: function(content) {
    $(content)[0].appendChild(this[0]);
    return this;
  },

  clone: function() {
    return $(this[0].cloneNode(true));
  },

  empty: function(){
    this.each(function(v){
      v.innerHTML = "";
    });
    return this;
  },

  html: function(content){
    var source;
    if(!content) {
      return this[0].innerHTML;
    } else {
      source = (function(content) {
        if(typeof content === "string") return content;
        if(typeof content === "number") return String(content);
        return $(content)[0].outerHTML;
      })(content);
      this.each(function(v){
        v.innerHTML = source;
      });
      return this;
    }
  },

  insertAfter: function(selector){
    $(selector)[0].insertAdjacentHTML("afterend",this[0].outerHTML);
    return this;
  },

  insertBefore: function(selector){
    $(selector)[0].insertAdjacentHTML("beforebegin",this[0].outerHTML);
    return this;
  },

  prepend: function(selector){
    $(this)[0].insertAdjacentHTML("afterBegin",$(selector)[0].outerHTML);
    return this;
  },

  prependTo: function(selector){
    $(selector)[0].insertAdjacentHTML("afterBegin",this[0].outerHTML);
    return this;
  },

  remove: function(){
    this.each(function(v){
      v.parentNode.removeChild(v);
    });
  },

  text: function(content){
    if(!content) {
      return this[0].textContent;
    } else {
      this.each(function(v){
        v.textContent = content;
      });
      return this;
    }
  }

});
