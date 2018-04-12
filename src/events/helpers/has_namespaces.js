
function hasNamespaces ( ns1, ns2 ) {
  for ( let i = 0, l = ns2.length; i < l; i++ ) {
    if ( ns1.indexOf ( ns2[i] ) < 0 ) return false;
  }
  return true;
}
