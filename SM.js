;(function (w, doc) {

  'use strict';

  // Polyfill Function.prototype.bind
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP    = function() {},
          fBound  = function() {
            return fToBind.apply(this instanceof fNOP && oThis
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
          };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
      return fBound;
    };
  }
  
  

  // simpleModal plugin. Uses the Constructor with Prototypes Pattern.
  // http://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript

  var simpleModal = (function() {

    
    
    // Constructor

    function SimpleModal(id, opt) {
      
      // enforces new
      if (!(this instanceof SimpleModal)) {
        return new SimpleModal(id, opt);
      }

      // Public properties
      this.id = id;
      this.opt = opt || {};
      this.el = doc.getElementById(id);

      // Initialize the plugin
      this.init();
      
    }

    

    // Methods

    SimpleModal.prototype.init = function() {

      var closeBtn = this.el.querySelectorAll('.js-sm__close'),
          i = closeBtn.length;
     
      // Attacth a click event listener to the close button(s)
      while(i--){
        closeBtn[i].onclick = this.close.bind(this);
      }
      
      // add the effect css class to the modal
      if(this.opt.effect){
        this.el.className += ' ' + this.opt.effect;
      }  
    };


    SimpleModal.prototype.open = function() {
      // show this modal
      (this.opt.effect) ? this.el.style.opacity = 1 : this.el.style.display = 'block';
      // Fire the open event
      this.trigger('sm_open');
    };

    
    SimpleModal.prototype.close = function() {
      // hide this modal
      (this.opt.effect) ? this.el.style.opacity = 0 : this.el.style.display = 'none';
      // Fire the close event
      this.trigger('sm_close');
    };

    
    SimpleModal.prototype.trigger = function(eventName) {
      // Create the event
      var ev = doc.createEvent('Event');
      // Define the event name
      ev.initEvent(eventName, true, true);
      // Fire the event on using the simpleModal element as target
      // works in ie > 9
      this.el.dispatchEvent(ev);
    };

    return SimpleModal;

  }());

  

  /* Expose simpleModal */

  if(typeof module === "object" && typeof module.exports === "object"){
    // CommonJS, just export
    module.exports = simpleModal;
  }
  
  else if(typeof define === "object" && define.amd){
    // AMD support
    define( function(){ return simpleModal; } );
  }
  
  else if(typeof w === "object"){
    // If no AMD and we are in the browser, attach to window
    w.simpleModal = simpleModal;
  }
  
}(this, this.document));
