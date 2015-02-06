var idMatch    = /^#[\w-]*$/,
    classMatch = /^\.[\w-]*$/,
    singlet    = /^[\w-]*$/;

function cash(selector, context) {
  return new cash.fn.init(selector, context);
}

var fn = cash.fn = cash.prototype = {
  cash: true,
  length: 0
};

fn.init = function(selector, context) {
  var result = [],
      matcher, elem;

  if (!selector) {
    return this;
  }

  this.length = 1;

  if (typeof selector !== 'string') {
    if (selector.cash) {
      return selector;
    }

    this[0] = selector;
    return this;
  }

  if (selector.charAt(0) === '<' &&
      selector.charAt(selector.length - 1) === '>' &&
      selector.length >= 3) {
    result = cash.parseHTML(selector);
  } else {
    matcher = idMatch.test(selector);
    elem = selector.slice(1);

    if (!context && matcher) {
      this[0] = doc.getElementById(elem);
      return this;
    } else {
      context = (cash(context)[0] || doc);

      result = slice.call(
        singlet.test(elem) ?
        classMatch.test(selector) ? doc.getElementsByClassName(elem) :
        doc.getElementsByTagName(selector) :
        context.querySelectorAll(selector)
      );
    }
  }

  this.length = 0;
  cash.merge(this, result);
  return this;
};

fn.init.prototype = fn;
