
const doc = document;
const win = window;
const docEle = doc.documentElement;
const createElement = doc.createElement.bind ( doc );
const div = createElement ( 'div' );
const table = createElement ( 'table' );
const tbody = createElement ( 'tbody' );
const tr = createElement ( 'tr' );
const {isArray, prototype: ArrayPrototype} = Array;
const {concat, filter, indexOf, map, push, slice, some, splice} = ArrayPrototype;

const idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/;
const classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/;
const htmlRe = /<.+>/;
const tagRe = /^\w+$/;
