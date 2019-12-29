
for ( prop in cash ) {

  if ( ['fn', 'each', 'extend'].indexOf ( prop ) >= 0 ) continue;

  jQuery[prop] = cash[prop];

}

for ( prop in cash.fn ) {

  if ( ['init'].indexOf ( prop ) >= 0 ) continue;

  jQuery.fn[prop] = cash.fn[prop];

}

for ( prop in jQuery.fn ) {

  if ( cash.fn[prop] ) continue;

  cash.fn[prop] = jQuery.fn[prop];

}

window.$ = jQuery;
