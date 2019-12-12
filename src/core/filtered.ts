
// @require collection/filter.ts

function filtered ( collection: Cash, comparator?: Comparator ): Cash {

  return !comparator ? collection : collection.filter ( comparator );

}
