
// @require core/cash.ts
// @require core/each.ts
// @require collection/each.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/remove_event.ts

fn.off = function ( eventFullName, callback ) {

  if ( eventFullName === undefined ) {

    this.each ( ( i, ele ) => removeEvent ( ele ) );

  } else {

    each ( getSplitValues ( eventFullName ), eventFullName => {

      const [name, namespaces] = parseEventName ( eventFullName );

      this.each ( ( i, ele ) => removeEvent ( ele, name, namespaces, callback ) );

    });

  }

  return this;

};
