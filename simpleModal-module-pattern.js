/* simpleModal.js */

;(function(w) {

  'use strict';

  // Module ∫
  var simpleModal = function(id, opt) {
    
    
    function open() {
      console.log(el.id, 'open');
      (opt.effect) ? el.style.opacity = 1 : el.style.display = 'block';
      trigger('sm_open');
    }

    

    function close() {
      console.log(el.id, 'close');
      (opt.effect) ? el.style.opacity = 0 : el.style.display = 'none';
      trigger('sm_close');
    }


    
    function trigger(eventName) {
      // Create the event
      var ev = document.createEvent('Event');
      // Define the event name
      ev.initEvent(eventName, true, true);
      // Fire the event on using the simpleModal element as target
      // works in ie > 9
      this.el.dispatchEvent(ev);
    }

    

    var el = document.getElementById(id),
        opt = opt || {},
        closeBtn = el.querySelectorAll('.js-sm__close'),
        i = closeBtn.length;
      
    

    while(i--)
      closeBtn[i].onclick = close;

    
    if(opt.effect)
      el.classList.add(opt.effect);


    return {
      open: open,
      close: close
    };
  };


  w.simpleModal = simpleModal;

})(this);

