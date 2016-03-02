function insertElement(el,child,prepend){
  if ( prepend ) {
    var first = el.childNodes[0];
    el.insertBefore(child,first);
  } else {
    el.appendChild(child);
  }
}

function insertContent(parent,child,prepend){

  var str = isString(child);

  if ( !str && child.length ) {
    each(child, function(){ insertContent(parent,this,prepend); });
    return;
  }

  parent.each(
    str ? function(){ this.insertAdjacentHTML( prepend ? 'afterbegin' : 'beforeend', child); } :
    function(el,i) { insertElement(el,( i === 0 ? child : child.cloneNode(true) ), prepend); }
  );
}

fn.extend({

  append(content) {
    insertContent(this,content);
    return this;
  },

  appendTo(parent) {
    insertContent(cash(parent),this);
    return this;
  },

  clone() {
    return cash(this.map(v => { return v.cloneNode(true); }));
  },

  empty() {
    this.html('');
    return this;
  },

  html(content) {
    var source;
    if ( content === undefined ) { return this[0].innerHTML; }
    source = ( content.nodeType ? content[0].outerHTML : content );
    return this.each(v => v.innerHTML = source);
  },

  insertAfter(selector) {
    cash(selector)[0].insertAdjacentHTML('afterend', this[0].outerHTML);
    return this;
  },

  insertBefore(selector) {
    cash(selector)[0].insertAdjacentHTML('beforebegin', this[0].outerHTML);
    return this;
  },

  prepend(content) {
    insertContent(this,content,true);
    return this;
  },

  prependTo(parent) {
    insertContent(cash(parent),this,true);
    return this;
  },

  remove() {
    return this.each(v => v.parentNode.removeChild(v));
  },

  text(content) {
    if (!content) { return this[0].textContent; }
    return this.each(v => v.textContent = content);
  }

});
