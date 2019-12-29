
for ( prop in cash ) {

  if ( jQuery[prop] ) continue;

  jQuery[prop] = cash[prop];

}

window.$ = jQuery;
