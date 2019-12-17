
// @require core/cash.ts
// @require core/each.ts
// @require events/on.ts
// @require events/trigger.ts

type shorthandEventName = 'blur' | 'focus' | 'focusin' | 'focusout' | 'resize' | 'scroll' | 'click' | 'dblclick' | 'mousedown' | 'mouseup' | 'mousemove' | 'mouseover' | 'mouseout' | 'mouseenter' | 'mouseleave' | 'change' | 'select' | 'submit' | 'keydown' | 'keypress' | 'keyup' | 'contextmenu';

interface Cash {
  blur ( handler?: Function ): Cash;
  focus ( handler?: Function ): Cash;
  focusin ( handler?: Function ): Cash;
  focusout ( handler?: Function ): Cash;
  resize ( handler?: Function ): Cash;
  scroll ( handler?: Function ): Cash;
  click ( handler?: Function ): Cash;
  dblclick ( handler?: Function ): Cash;
  mousedown ( handler?: Function ): Cash;
  mouseup ( handler?: Function ): Cash;
  mousemove ( handler?: Function ): Cash;
  mouseover ( handler?: Function ): Cash;
  mouseout ( handler?: Function ): Cash;
  mouseenter ( handler?: Function ): Cash;
  mouseleave ( handler?: Function ): Cash;
  change ( handler?: Function ): Cash;
  select ( handler?: Function ): Cash;
  submit ( handler?: Function ): Cash;
  keydown ( handler?: Function ): Cash;
  keypress ( handler?: Function ): Cash;
  keyup ( handler?: Function ): Cash;
  contextmenu ( handler?: Function ): Cash;
}

cash.each ( 'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split ( ' ' ), ( i, event: shorthandEventName ) => {

  cash.fn[event] = function ( this: Cash, callback?: EventCallback ) {

    if ( callback ) return this.on ( event, callback );

    return this.trigger ( event );

  };

});
