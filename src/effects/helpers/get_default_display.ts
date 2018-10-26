
// @require css/helpers/compute_style.ts

const defaultDisplay = {};

function getDefaultDisplay ( tagName: string ): string {

  if ( defaultDisplay[tagName] ) return defaultDisplay[tagName];

  const ele = doc.createElement ( tagName );

  doc.body.appendChild ( ele );

  const display = computeStyle ( ele, 'display' );

  doc.body.removeChild ( ele );

  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';

}
