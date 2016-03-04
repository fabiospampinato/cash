var uid = cash.uid = '_cash'+Date.now();

function getDataCache(node) {
  return (node[uid] = node[uid] || {});
}

function setData(node, key, value) {
  return (getDataCache(node)[key] = value);
}

function getData(node, key) {
  var c = getDataCache(node);
  if ( c[key] === undefined ) {
    c[key] = node.dataset ? node.dataset[key] : cash(node).attr('data-'+key);
  }
  return c[key];
}

function removeData(node, key) {
  var c = getDataCache(node);
  if ( c ) { delete c[key]; }
  else if ( node.dataset ) { delete node.dataset[key]; }
  else { cash(node).removeAttr('data-' + name); }
}

fn.extend({

  data(key, value) { // TODO: tear out into module for IE9
    if (!value) { return getData(this[0],key); }
    return this.each(v => setData(v,key,value) );
  },

  removeData(key) { // TODO: tear out into module for IE9
    return this.each(v => removeData(v,key) );
  }

});
