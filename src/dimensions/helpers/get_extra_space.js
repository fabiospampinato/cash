
// @require css/helpers/compute_style_int.js

function getExtraSpace ( ele, xAxis ) {
  return computeStyleInt ( ele, `border${ xAxis ? 'Left' : 'Top' }Width` ) + computeStyleInt ( ele, `padding${ xAxis ? 'Left' : 'Top' }` ) + computeStyleInt ( ele, `padding${ xAxis ? 'Right' : 'Bottom' }` ) + computeStyleInt ( ele, `border${ xAxis ? 'Right' : 'Bottom' }Width` );
}
