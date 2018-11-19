
// @require core/cash.ts
// @require core/each.ts
// @require collection/each.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/remove_event.ts

interface Cash {
  off ( events?: string, callback?: Function ): this;
}

Cash.prototype.off = function ( this: Cash, eventFullName?: string, callback?: Function ) {

  if ( eventFullName === undefined ) {

    this.each ( ( i, ele ) => removeEvent ( ele ) );

  } else {

    each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

      const [name, namespaces] = parseEventName ( getEventNameBubbling ( eventFullName ) );

      this.each ( ( i, ele ) => removeEvent ( ele, name, namespaces, callback ) );

    });

  }

  return this;

};
