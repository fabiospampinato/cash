
// @require ./variables.ts

function pluck ( arr: ArrayLike<any>, prop: string ): ArrayLike<any> {

  return filter.call ( map.call ( arr, ele => ele[prop] ), ele => ele != null );

}
