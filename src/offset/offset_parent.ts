
// @require core/cash.ts
// @require collection/map.ts
// @require css/helpers/compute_style.ts

interface Cash {
  offsetParent (): Cash;
}

fn.offsetParent = function ( this: Cash ) {

  return this.map ( ( i, ele ) => {

    let offsetParent = ele.offsetParent;

    while ( offsetParent && computeStyle ( offsetParent, 'position' ) === 'static' ) {

      offsetParent = offsetParent.offsetParent;

    }

    return offsetParent || docEle;

  });

};
