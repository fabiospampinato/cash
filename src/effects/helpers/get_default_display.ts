
// @require css/helpers/compute_style.ts

const defaultDisplay: { [tagName: string]: string } = {};

function getDefaultDisplay ( tagName: string ): string {

  if ( defaultDisplay[tagName] ) return defaultDisplay[tagName];

  const ele = createElement ( tagName );

  doc.body.insertBefore ( ele, null );

  const display = computeStyle ( ele, 'display' );

  doc.body.removeChild ( ele );

  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';

}
