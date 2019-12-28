
for ( prop in jQuery ) {

  if ( ['fn', 'each', 'extend'].indexOf ( prop ) >= 0 ) continue;

  cash[prop] = jQuery[prop];

}

cash.extend ( cash.fn, jQuery.fn );
