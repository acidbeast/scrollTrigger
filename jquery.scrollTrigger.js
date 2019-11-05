(function ($) {


  $.fn.scrollTrigger = function (options) {


    /* Options */
    var options = $.extend({
      customEvents: ''
    }, options || {});


    /* Instance */
    var instance = {
      version: '0.6',
      triggered: false
    };


    /* Variables */
    var element = $(this);


    /* Check Offset */
    if (options.offset === undefined && element.length > 0) {
      options.offset = element.offset().top;
    }


    /* Throw Error if offset is undefined */
    if (options.offset === undefined) {
      throw new Error('scrollTrigger.js: please, define offset property in plugin initialization, or attach it to DOM element.');
    }


    /* Check Gap */
    options.gap = !isNaN(parseInt(options.gap)) ? options.gap : 0;


    function getOffset () {
      var
        value = options.offset instanceof Function ? options.offset() : parseInt(options.offset);
      if (isNaN(parseInt(value))) {
        throw new Error('scrollTrigger.js: offset value is NaN.');
      }
      return value - options.gap;
    }


    function runCallback (callback, offset, triggered) {
        if (Object.prototype.toString.call(triggered) === "[object Boolean]") {
          instance.triggered = triggered;
        }
        if (callback instanceof Function) {
          callback(instance, offset, options);
        }
        if (options.once === true) {
          unbindEvent();
        }
    }


    function runCallbackManually (callback) {
      return function (changeState) {
        var offsetTop = $(window).scrollTop();
        var state = Object.prototype.toString.call(changeState) === "[object Boolean]" ? changeState : undefined;
        runCallback(callback, offsetTop, state);
      }
    }


    /* Instance 'on' property */
    if (options.on instanceof Function) {
      instance.on = function (changeState) {
        runCallbackManually(options.on)(changeState);
      }
    }


    /* Instance 'off' property */
    if (options.off instanceof Function) {
      instance.off = function (changeState) {
        runCallbackManually(options.off)(changeState);
      }
    }


    function eventHandler () {


      /* Get window scrolltop */
      var offsetTop = $(window).scrollTop();
      var offset = getOffset();


      /* Runs callback on */
      if (offsetTop > offset && instance.triggered === false) {
        runCallback(options.on, offsetTop, true);
      }


      /* Runs callback off */
      else if (offsetTop < offset && instance.triggered === true) {
        runCallback(options.off, offsetTop, false);
      }


    }


    function unbindEvent () {
      $(document).off('ready touchmove scroll ' + options.customEvents, eventHandler);
    }


    /* Events bindings */
    $(document).on('ready touchmove scroll ' + options.customEvents, eventHandler);


    return instance;


  }


})(jQuery);
