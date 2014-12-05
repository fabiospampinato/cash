fn.extend({

  append(content) {
    this[0].appendChild(cash(content)[0]);
    return this;
  },

  appendTo(content) {
    cash(content)[0].appendChild(this[0]);
    return this;
  },

  clone() {
    return cash(this[0].cloneNode(true));
  },

  empty() {
    this.each(v => v.innerHTML = '');
    return this;
  },

  html(content) {
    var source;

    if (content === 'undefined') {
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

  prepend(selector) {
    cash(this)[0].insertAdjacentHTML('afterBegin', cash(selector)[0].outerHTML);
    return this;
  },

  prependTo(selector) {
    cash(selector)[0].insertAdjacentHTML('afterBegin', this[0].outerHTML);
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
