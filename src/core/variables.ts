
const doc = document,
      win = window,
      docEle = doc.documentElement,
      createElement = doc.createElement.bind ( doc ),
      div = createElement ( 'div' ),
      table = createElement ( 'table' ),
      tbody = createElement ( 'tbody' ),
      tr = createElement ( 'tr' ),
      {isArray, prototype: ArrayPrototype} = Array,
      {concat, filter, indexOf, map, push, slice, some, splice} = ArrayPrototype;

const idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,
      classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,
      htmlRe = /<.+>/,
      tagRe = /^\w+$/;
