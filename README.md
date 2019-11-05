# scrollTrigger

Simple and easy to use jQuery plugin to observe document scroll. It executes two callbacks: first when document reach defined offset and second when document scrolled back.

## Usage


### Basic

Based on offset of the element in DOM.

``` js
$('.somediv').scrollTrigger({
    gap: 20,
    on: function () {
      // do some job here.
    },
    off: function () {
      // do some job here.
    }
});
```


<a href="http://www.dimko.org/scrolltrigger/demo/basic/">Example</a>



### Static offset

Based on pre-defined static offset.

``` js
$.fn.scrollTrigger({
  offset: 1000,
  on: function (instance, offset) {
    // do some job here.
  },
  off: function (instance, offset) {
    // do some job here.
  }
});
```

<a href="http://www.dimko.org/scrolltrigger/demo/static/">Example</a>


### Dynamic offset

Use function to calculate offset.

``` js
$.fn.scrollTrigger({
  offset: function () {
    return $('.somediv').offset().top - 100;
  },
  on: function (instance, offset) {
    // do some job here.
  },
  off: function (instance, offset) {
    // do some job here.
  }
});
```

<a href="http://www.dimko.org/scrolltrigger/demo/dynamic/">Example</a>


### Handle instance

Attach to variable,

``` js
var instance = $('.somediv').scrollTrigger({
  on: function (instance, offset) {
    // do some job here.
  },
  off: function (instance, offset) {
    // do some job here.
  }
});
```

Check state:

``` js
console.log(instance.triggered);
```

Run callbacks manually:

``` js
// Run on callback
instance.on();

// Run off callback
instance.off();
```

By default manual execution of callbacks does not change state. Pass Bool value in order to change instance state:

``` js
// Run on callback and change instance state.
instance.on(true);

// Run off callback and change instance state.
instance.off(false);
```


## Options

- `offset` - set value when callbacks shoud be executed.
- `gap` - gap between defined offset and current document offset.
- `once` - callbacks will be executed once.
- `customEvents` - adds events which scrollTrigger should react (By default: ready, touchmove, scroll).
