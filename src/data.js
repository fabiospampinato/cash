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

  data(name, value) {

    if ( isString(name) ) {
      return ( value === undefined ?
          getData(this[0],name) :
          this.each(v => setData(v,name,value) )
        );
    }

    for (var key in name) {
      this.data(key,name[key]);
    }

    return this;
  },

  removeData(key) {
    return this.each(v => removeData(v,key) );
  }

});
