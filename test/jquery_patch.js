
for ( prop in cash ) {

  if ( ['fn', 'each', 'extend'].indexOf ( prop ) >= 0 ) continue;

  jQuery[prop] = cash[prop];

}

jQuery.extend ( jQuery.fn, cash.fn );
