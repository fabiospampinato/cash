
function hasNamespaces ( ns1: string[], ns2: string[] ): boolean {

  return !ns2 || !some.call ( ns2, ns => ns1.indexOf ( ns ) < 0 );

}
