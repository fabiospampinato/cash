
const doc = document,
      docEl = doc.documentElement,
      win = window,
      {filter, indexOf, map, push, slice} = Array.prototype;

const idRe = /^#[\w-]*$/,
      classRe = /^\.[\w-]*$/,
      htmlRe = /<.+>/,
      tagRe = /^\w+$/,
      notWhitespaceRe = /\S+/g,
      eventsSeparatorRe = /[,\s]+/g,
      querySpaceRe = /%20/g;

const eventsNamespacesSeparator = '.';

const datasNamespace = '__cash_datas__',
      eventsNamespace = '__cash_events__';
