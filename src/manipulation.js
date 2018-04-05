function insertElement(el, child, prepend){
  if ( prepend ) {
    var first = el.childNodes[0];
    el.insertBefore(child,first);
  } else {
    el.appendChild(child);
  }
}

function insertContent(parent, child, prepend){
  var str = isString(child);

  if ( !str && child.length ) {
    each(child, v => insertContent(parent, v, prepend) );
    return;
  }

  each(parent,
    str ? v => v.insertAdjacentHTML( prepend ? 'afterbegin' : 'beforeend', child) :
    (v,i) => insertElement(v,( i === 0 ? child : child.cloneNode(true) ), prepend)
  );
}

fn.extend({

  after(selector) {
    cash(selector).insertAfter(this);
    return this;
  },

  append(content) {
    insertContent(this,content);
    return this;
  },

  appendTo(parent) {
    insertContent(cash(parent),this);
    return this;
  },

  before(selector) {
    cash(selector).insertBefore(this);
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
    if ( content === undefined ) { return this[0] ? this[0].innerHTML : undefined; }
    var source = ( content.nodeType ? content[0].outerHTML : content );
    return this.each(v => v.innerHTML = source);
  },

  insertAfter(selector) {

    cash(selector).each((el,i) => {
      var parent = el.parentNode,
          sibling = el.nextSibling;
      this.each(v => { parent.insertBefore(( i === 0 ? v : v.cloneNode(true) ),sibling); });
    });

    return this;
  },

  insertBefore(selector) {
    cash(selector).each((el,i) => {
      var parent = el.parentNode;
      this.each(v => { parent.insertBefore(( i === 0 ? v : v.cloneNode(true) ),el); });
    });
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

  detach () {
    return this.each(v => v.parentNode.removeChild(v));
  },

  remove() {
    return this.detach ().off ();
  },

  text(content) {
    if ( content === undefined ) { return this[0] ? this[0].textContent : ''; }
    return this.each(v => v.textContent = content);
  },

	replaceWith(content) {
    return this.each(v=>{
      var parent = v.parentNode;
      if ( !parent ) { return false; }
      var $eles = cash(content);
      if ( !$eles[0] ) {
        this.remove ();
        return false;
      }
      parent.replaceChild ( $eles[0], v );
      cash($eles[0]).after($eles.slice(1));
    });
  },

  replaceAll(content) {
    cash(content).replaceWith(this);
    return this;
  }

});
