function insertElement(el,child,prepend){
  if ( prepend ) {
    var first = el.childNodes[0];
    el.insertBefore(child,first);
  } else {
    el.appendChild(child);
  }
};

function insertContent(parent,child,prepend,sibling){

	var str = isString(child);

	if ( !str && child.length ) {
		cash.each(child, function(){ insertContent(parent,this,prepend); });
		return;
	}

  parent.each(
	  str ? function(){ this.insertAdjacentHTML( prepend ? 'afterbegin' : 'beforeend', child); } :
    function(el,i) { insertElement(el,( i === 0 ? child : child.cloneNode(true) ), prepend, sibling); }
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
	  var elems = [];

    this.each(v => { elems.push(v.cloneNode(true)); });

    return cash(elems);
  },

  empty() {
    this.each(v => v.innerHTML = '');
    return this;
  },

  html(content) {
    var source;

    if ( content === undefined ) {
      return this[0].innerHTML;
    } else {
      source = typeof content === 'object' ? cash(content)[0].outerHTML : content;
      this.each(v => v.innerHTML = `${source}`);
      return this;
    }
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
    this.each(v => v.parentNode.removeChild(v));
  },

  text(content) {
    if (!content) {
      return this[0].textContent;
    } else {
      this.each(v => v.textContent = content);
      return this;
    }
  }

});
