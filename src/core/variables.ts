
const doc = document,
      win = window,
      div = doc.createElement ( 'div' ),
      {filter, indexOf, map, push, reverse, slice, some, splice} = Array.prototype;

const idRe = /^#[\w-]*$/,
      classRe = /^\.[\w-]*$/,
      htmlRe = /<.+>/,
      tagRe = /^\w+$/;
