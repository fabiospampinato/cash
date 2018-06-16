
const doc = document,
      win = window,
      {filter, indexOf, map, push, reverse, slice, splice} = Array.prototype;

const idRe = /^#[\w-]*$/,
      classRe = /^\.[\w-]*$/,
      htmlRe = /<.+>/,
      tagRe = /^\w+$/;
