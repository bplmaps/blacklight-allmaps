var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var leafletSrc = {exports: {}};

/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
leafletSrc.exports;

(function (module, exports) {
	(function (global, factory) {
	  factory(exports) ;
	})(commonjsGlobal, (function (exports) {
	  var version = "1.9.4";

	  /*
	   * @namespace Util
	   *
	   * Various utility functions, used by Leaflet internally.
	   */

	  // @function extend(dest: Object, src?: Object): Object
	  // Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. Has an `L.extend` shortcut.
	  function extend(dest) {
	  	var i, j, len, src;

	  	for (j = 1, len = arguments.length; j < len; j++) {
	  		src = arguments[j];
	  		for (i in src) {
	  			dest[i] = src[i];
	  		}
	  	}
	  	return dest;
	  }

	  // @function create(proto: Object, properties?: Object): Object
	  // Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
	  var create$2 = Object.create || (function () {
	  	function F() {}
	  	return function (proto) {
	  		F.prototype = proto;
	  		return new F();
	  	};
	  })();

	  // @function bind(fn: Function, …): Function
	  // Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	  // Has a `L.bind()` shortcut.
	  function bind(fn, obj) {
	  	var slice = Array.prototype.slice;

	  	if (fn.bind) {
	  		return fn.bind.apply(fn, slice.call(arguments, 1));
	  	}

	  	var args = slice.call(arguments, 2);

	  	return function () {
	  		return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
	  	};
	  }

	  // @property lastId: Number
	  // Last unique ID used by [`stamp()`](#util-stamp)
	  var lastId = 0;

	  // @function stamp(obj: Object): Number
	  // Returns the unique ID of an object, assigning it one if it doesn't have it.
	  function stamp(obj) {
	  	if (!('_leaflet_id' in obj)) {
	  		obj['_leaflet_id'] = ++lastId;
	  	}
	  	return obj._leaflet_id;
	  }

	  // @function throttle(fn: Function, time: Number, context: Object): Function
	  // Returns a function which executes function `fn` with the given scope `context`
	  // (so that the `this` keyword refers to `context` inside `fn`'s code). The function
	  // `fn` will be called no more than one time per given amount of `time`. The arguments
	  // received by the bound function will be any arguments passed when binding the
	  // function, followed by any arguments passed when invoking the bound function.
	  // Has an `L.throttle` shortcut.
	  function throttle(fn, time, context) {
	  	var lock, args, wrapperFn, later;

	  	later = function () {
	  		// reset lock and call if queued
	  		lock = false;
	  		if (args) {
	  			wrapperFn.apply(context, args);
	  			args = false;
	  		}
	  	};

	  	wrapperFn = function () {
	  		if (lock) {
	  			// called too soon, queue to call later
	  			args = arguments;

	  		} else {
	  			// call and lock until later
	  			fn.apply(context, arguments);
	  			setTimeout(later, time);
	  			lock = true;
	  		}
	  	};

	  	return wrapperFn;
	  }

	  // @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
	  // Returns the number `num` modulo `range` in such a way so it lies within
	  // `range[0]` and `range[1]`. The returned value will be always smaller than
	  // `range[1]` unless `includeMax` is set to `true`.
	  function wrapNum(x, range, includeMax) {
	  	var max = range[1],
	  	    min = range[0],
	  	    d = max - min;
	  	return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
	  }

	  // @function falseFn(): Function
	  // Returns a function which always returns `false`.
	  function falseFn() { return false; }

	  // @function formatNum(num: Number, precision?: Number|false): Number
	  // Returns the number `num` rounded with specified `precision`.
	  // The default `precision` value is 6 decimal places.
	  // `false` can be passed to skip any processing (can be useful to avoid round-off errors).
	  function formatNum(num, precision) {
	  	if (precision === false) { return num; }
	  	var pow = Math.pow(10, precision === undefined ? 6 : precision);
	  	return Math.round(num * pow) / pow;
	  }

	  // @function trim(str: String): String
	  // Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
	  function trim(str) {
	  	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	  }

	  // @function splitWords(str: String): String[]
	  // Trims and splits the string on whitespace and returns the array of parts.
	  function splitWords(str) {
	  	return trim(str).split(/\s+/);
	  }

	  // @function setOptions(obj: Object, options: Object): Object
	  // Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
	  function setOptions(obj, options) {
	  	if (!Object.prototype.hasOwnProperty.call(obj, 'options')) {
	  		obj.options = obj.options ? create$2(obj.options) : {};
	  	}
	  	for (var i in options) {
	  		obj.options[i] = options[i];
	  	}
	  	return obj.options;
	  }

	  // @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
	  // Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
	  // translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
	  // be appended at the end. If `uppercase` is `true`, the parameter names will
	  // be uppercased (e.g. `'?A=foo&B=bar'`)
	  function getParamString(obj, existingUrl, uppercase) {
	  	var params = [];
	  	for (var i in obj) {
	  		params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
	  	}
	  	return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
	  }

	  var templateRe = /\{ *([\w_ -]+) *\}/g;

	  // @function template(str: String, data: Object): String
	  // Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
	  // and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
	  // `('Hello foo, bar')`. You can also specify functions instead of strings for
	  // data values — they will be evaluated passing `data` as an argument.
	  function template(str, data) {
	  	return str.replace(templateRe, function (str, key) {
	  		var value = data[key];

	  		if (value === undefined) {
	  			throw new Error('No value provided for variable ' + str);

	  		} else if (typeof value === 'function') {
	  			value = value(data);
	  		}
	  		return value;
	  	});
	  }

	  // @function isArray(obj): Boolean
	  // Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
	  var isArray = Array.isArray || function (obj) {
	  	return (Object.prototype.toString.call(obj) === '[object Array]');
	  };

	  // @function indexOf(array: Array, el: Object): Number
	  // Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
	  function indexOf(array, el) {
	  	for (var i = 0; i < array.length; i++) {
	  		if (array[i] === el) { return i; }
	  	}
	  	return -1;
	  }

	  // @property emptyImageUrl: String
	  // Data URI string containing a base64-encoded empty GIF image.
	  // Used as a hack to free memory from unused images on WebKit-powered
	  // mobile devices (by setting image `src` to this string).
	  var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

	  // inspired by https://paulirish.com/2011/requestanimationframe-for-smart-animating/

	  function getPrefixed(name) {
	  	return window['webkit' + name] || window['moz' + name] || window['ms' + name];
	  }

	  var lastTime = 0;

	  // fallback for IE 7-8
	  function timeoutDefer(fn) {
	  	var time = +new Date(),
	  	    timeToCall = Math.max(0, 16 - (time - lastTime));

	  	lastTime = time + timeToCall;
	  	return window.setTimeout(fn, timeToCall);
	  }

	  var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer;
	  var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
	  		getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };

	  // @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
	  // Schedules `fn` to be executed when the browser repaints. `fn` is bound to
	  // `context` if given. When `immediate` is set, `fn` is called immediately if
	  // the browser doesn't have native support for
	  // [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
	  // otherwise it's delayed. Returns a request ID that can be used to cancel the request.
	  function requestAnimFrame(fn, context, immediate) {
	  	if (immediate && requestFn === timeoutDefer) {
	  		fn.call(context);
	  	} else {
	  		return requestFn.call(window, bind(fn, context));
	  	}
	  }

	  // @function cancelAnimFrame(id: Number): undefined
	  // Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
	  function cancelAnimFrame(id) {
	  	if (id) {
	  		cancelFn.call(window, id);
	  	}
	  }

	  var Util = {
	    __proto__: null,
	    extend: extend,
	    create: create$2,
	    bind: bind,
	    get lastId () { return lastId; },
	    stamp: stamp,
	    throttle: throttle,
	    wrapNum: wrapNum,
	    falseFn: falseFn,
	    formatNum: formatNum,
	    trim: trim,
	    splitWords: splitWords,
	    setOptions: setOptions,
	    getParamString: getParamString,
	    template: template,
	    isArray: isArray,
	    indexOf: indexOf,
	    emptyImageUrl: emptyImageUrl,
	    requestFn: requestFn,
	    cancelFn: cancelFn,
	    requestAnimFrame: requestAnimFrame,
	    cancelAnimFrame: cancelAnimFrame
	  };

	  // @class Class
	  // @aka L.Class

	  // @section
	  // @uninheritable

	  // Thanks to John Resig and Dean Edwards for inspiration!

	  function Class() {}

	  Class.extend = function (props) {

	  	// @function extend(props: Object): Function
	  	// [Extends the current class](#class-inheritance) given the properties to be included.
	  	// Returns a Javascript function that is a class constructor (to be called with `new`).
	  	var NewClass = function () {

	  		setOptions(this);

	  		// call the constructor
	  		if (this.initialize) {
	  			this.initialize.apply(this, arguments);
	  		}

	  		// call all constructor hooks
	  		this.callInitHooks();
	  	};

	  	var parentProto = NewClass.__super__ = this.prototype;

	  	var proto = create$2(parentProto);
	  	proto.constructor = NewClass;

	  	NewClass.prototype = proto;

	  	// inherit parent's statics
	  	for (var i in this) {
	  		if (Object.prototype.hasOwnProperty.call(this, i) && i !== 'prototype' && i !== '__super__') {
	  			NewClass[i] = this[i];
	  		}
	  	}

	  	// mix static properties into the class
	  	if (props.statics) {
	  		extend(NewClass, props.statics);
	  	}

	  	// mix includes into the prototype
	  	if (props.includes) {
	  		checkDeprecatedMixinEvents(props.includes);
	  		extend.apply(null, [proto].concat(props.includes));
	  	}

	  	// mix given properties into the prototype
	  	extend(proto, props);
	  	delete proto.statics;
	  	delete proto.includes;

	  	// merge options
	  	if (proto.options) {
	  		proto.options = parentProto.options ? create$2(parentProto.options) : {};
	  		extend(proto.options, props.options);
	  	}

	  	proto._initHooks = [];

	  	// add method for calling all hooks
	  	proto.callInitHooks = function () {

	  		if (this._initHooksCalled) { return; }

	  		if (parentProto.callInitHooks) {
	  			parentProto.callInitHooks.call(this);
	  		}

	  		this._initHooksCalled = true;

	  		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
	  			proto._initHooks[i].call(this);
	  		}
	  	};

	  	return NewClass;
	  };


	  // @function include(properties: Object): this
	  // [Includes a mixin](#class-includes) into the current class.
	  Class.include = function (props) {
	  	var parentOptions = this.prototype.options;
	  	extend(this.prototype, props);
	  	if (props.options) {
	  		this.prototype.options = parentOptions;
	  		this.mergeOptions(props.options);
	  	}
	  	return this;
	  };

	  // @function mergeOptions(options: Object): this
	  // [Merges `options`](#class-options) into the defaults of the class.
	  Class.mergeOptions = function (options) {
	  	extend(this.prototype.options, options);
	  	return this;
	  };

	  // @function addInitHook(fn: Function): this
	  // Adds a [constructor hook](#class-constructor-hooks) to the class.
	  Class.addInitHook = function (fn) { // (Function) || (String, args...)
	  	var args = Array.prototype.slice.call(arguments, 1);

	  	var init = typeof fn === 'function' ? fn : function () {
	  		this[fn].apply(this, args);
	  	};

	  	this.prototype._initHooks = this.prototype._initHooks || [];
	  	this.prototype._initHooks.push(init);
	  	return this;
	  };

	  function checkDeprecatedMixinEvents(includes) {
	  	/* global L: true */
	  	if (typeof L === 'undefined' || !L || !L.Mixin) { return; }

	  	includes = isArray(includes) ? includes : [includes];

	  	for (var i = 0; i < includes.length; i++) {
	  		if (includes[i] === L.Mixin.Events) {
	  			console.warn('Deprecated include of L.Mixin.Events: ' +
	  				'this property will be removed in future releases, ' +
	  				'please inherit from L.Evented instead.', new Error().stack);
	  		}
	  	}
	  }

	  /*
	   * @class Evented
	   * @aka L.Evented
	   * @inherits Class
	   *
	   * A set of methods shared between event-powered classes (like `Map` and `Marker`). Generally, events allow you to execute some function when something happens with an object (e.g. the user clicks on the map, causing the map to fire `'click'` event).
	   *
	   * @example
	   *
	   * ```js
	   * map.on('click', function(e) {
	   * 	alert(e.latlng);
	   * } );
	   * ```
	   *
	   * Leaflet deals with event listeners by reference, so if you want to add a listener and then remove it, define it as a function:
	   *
	   * ```js
	   * function onClick(e) { ... }
	   *
	   * map.on('click', onClick);
	   * map.off('click', onClick);
	   * ```
	   */

	  var Events = {
	  	/* @method on(type: String, fn: Function, context?: Object): this
	  	 * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
	  	 *
	  	 * @alternative
	  	 * @method on(eventMap: Object): this
	  	 * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	  	 */
	  	on: function (types, fn, context) {

	  		// types can be a map of types/handlers
	  		if (typeof types === 'object') {
	  			for (var type in types) {
	  				// we don't process space-separated events here for performance;
	  				// it's a hot path since Layer uses the on(obj) syntax
	  				this._on(type, types[type], fn);
	  			}

	  		} else {
	  			// types can be a string of space-separated words
	  			types = splitWords(types);

	  			for (var i = 0, len = types.length; i < len; i++) {
	  				this._on(types[i], fn, context);
	  			}
	  		}

	  		return this;
	  	},

	  	/* @method off(type: String, fn?: Function, context?: Object): this
	  	 * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
	  	 *
	  	 * @alternative
	  	 * @method off(eventMap: Object): this
	  	 * Removes a set of type/listener pairs.
	  	 *
	  	 * @alternative
	  	 * @method off: this
	  	 * Removes all listeners to all events on the object. This includes implicitly attached events.
	  	 */
	  	off: function (types, fn, context) {

	  		if (!arguments.length) {
	  			// clear all listeners if called without arguments
	  			delete this._events;

	  		} else if (typeof types === 'object') {
	  			for (var type in types) {
	  				this._off(type, types[type], fn);
	  			}

	  		} else {
	  			types = splitWords(types);

	  			var removeAll = arguments.length === 1;
	  			for (var i = 0, len = types.length; i < len; i++) {
	  				if (removeAll) {
	  					this._off(types[i]);
	  				} else {
	  					this._off(types[i], fn, context);
	  				}
	  			}
	  		}

	  		return this;
	  	},

	  	// attach listener (without syntactic sugar now)
	  	_on: function (type, fn, context, _once) {
	  		if (typeof fn !== 'function') {
	  			console.warn('wrong listener type: ' + typeof fn);
	  			return;
	  		}

	  		// check if fn already there
	  		if (this._listens(type, fn, context) !== false) {
	  			return;
	  		}

	  		if (context === this) {
	  			// Less memory footprint.
	  			context = undefined;
	  		}

	  		var newListener = {fn: fn, ctx: context};
	  		if (_once) {
	  			newListener.once = true;
	  		}

	  		this._events = this._events || {};
	  		this._events[type] = this._events[type] || [];
	  		this._events[type].push(newListener);
	  	},

	  	_off: function (type, fn, context) {
	  		var listeners,
	  		    i,
	  		    len;

	  		if (!this._events) {
	  			return;
	  		}

	  		listeners = this._events[type];
	  		if (!listeners) {
	  			return;
	  		}

	  		if (arguments.length === 1) { // remove all
	  			if (this._firingCount) {
	  				// Set all removed listeners to noop
	  				// so they are not called if remove happens in fire
	  				for (i = 0, len = listeners.length; i < len; i++) {
	  					listeners[i].fn = falseFn;
	  				}
	  			}
	  			// clear all listeners for a type if function isn't specified
	  			delete this._events[type];
	  			return;
	  		}

	  		if (typeof fn !== 'function') {
	  			console.warn('wrong listener type: ' + typeof fn);
	  			return;
	  		}

	  		// find fn and remove it
	  		var index = this._listens(type, fn, context);
	  		if (index !== false) {
	  			var listener = listeners[index];
	  			if (this._firingCount) {
	  				// set the removed listener to noop so that's not called if remove happens in fire
	  				listener.fn = falseFn;

	  				/* copy array in case events are being fired */
	  				this._events[type] = listeners = listeners.slice();
	  			}
	  			listeners.splice(index, 1);
	  		}
	  	},

	  	// @method fire(type: String, data?: Object, propagate?: Boolean): this
	  	// Fires an event of the specified type. You can optionally provide a data
	  	// object — the first argument of the listener function will contain its
	  	// properties. The event can optionally be propagated to event parents.
	  	fire: function (type, data, propagate) {
	  		if (!this.listens(type, propagate)) { return this; }

	  		var event = extend({}, data, {
	  			type: type,
	  			target: this,
	  			sourceTarget: data && data.sourceTarget || this
	  		});

	  		if (this._events) {
	  			var listeners = this._events[type];
	  			if (listeners) {
	  				this._firingCount = (this._firingCount + 1) || 1;
	  				for (var i = 0, len = listeners.length; i < len; i++) {
	  					var l = listeners[i];
	  					// off overwrites l.fn, so we need to copy fn to a var
	  					var fn = l.fn;
	  					if (l.once) {
	  						this.off(type, fn, l.ctx);
	  					}
	  					fn.call(l.ctx || this, event);
	  				}

	  				this._firingCount--;
	  			}
	  		}

	  		if (propagate) {
	  			// propagate the event to parents (set with addEventParent)
	  			this._propagateEvent(event);
	  		}

	  		return this;
	  	},

	  	// @method listens(type: String, propagate?: Boolean): Boolean
	  	// @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
	  	// Returns `true` if a particular event type has any listeners attached to it.
	  	// The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
	  	listens: function (type, fn, context, propagate) {
	  		if (typeof type !== 'string') {
	  			console.warn('"string" type argument expected');
	  		}

	  		// we don't overwrite the input `fn` value, because we need to use it for propagation
	  		var _fn = fn;
	  		if (typeof fn !== 'function') {
	  			propagate = !!fn;
	  			_fn = undefined;
	  			context = undefined;
	  		}

	  		var listeners = this._events && this._events[type];
	  		if (listeners && listeners.length) {
	  			if (this._listens(type, _fn, context) !== false) {
	  				return true;
	  			}
	  		}

	  		if (propagate) {
	  			// also check parents for listeners if event propagates
	  			for (var id in this._eventParents) {
	  				if (this._eventParents[id].listens(type, fn, context, propagate)) { return true; }
	  			}
	  		}
	  		return false;
	  	},

	  	// returns the index (number) or false
	  	_listens: function (type, fn, context) {
	  		if (!this._events) {
	  			return false;
	  		}

	  		var listeners = this._events[type] || [];
	  		if (!fn) {
	  			return !!listeners.length;
	  		}

	  		if (context === this) {
	  			// Less memory footprint.
	  			context = undefined;
	  		}

	  		for (var i = 0, len = listeners.length; i < len; i++) {
	  			if (listeners[i].fn === fn && listeners[i].ctx === context) {
	  				return i;
	  			}
	  		}
	  		return false;

	  	},

	  	// @method once(…): this
	  	// Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
	  	once: function (types, fn, context) {

	  		// types can be a map of types/handlers
	  		if (typeof types === 'object') {
	  			for (var type in types) {
	  				// we don't process space-separated events here for performance;
	  				// it's a hot path since Layer uses the on(obj) syntax
	  				this._on(type, types[type], fn, true);
	  			}

	  		} else {
	  			// types can be a string of space-separated words
	  			types = splitWords(types);

	  			for (var i = 0, len = types.length; i < len; i++) {
	  				this._on(types[i], fn, context, true);
	  			}
	  		}

	  		return this;
	  	},

	  	// @method addEventParent(obj: Evented): this
	  	// Adds an event parent - an `Evented` that will receive propagated events
	  	addEventParent: function (obj) {
	  		this._eventParents = this._eventParents || {};
	  		this._eventParents[stamp(obj)] = obj;
	  		return this;
	  	},

	  	// @method removeEventParent(obj: Evented): this
	  	// Removes an event parent, so it will stop receiving propagated events
	  	removeEventParent: function (obj) {
	  		if (this._eventParents) {
	  			delete this._eventParents[stamp(obj)];
	  		}
	  		return this;
	  	},

	  	_propagateEvent: function (e) {
	  		for (var id in this._eventParents) {
	  			this._eventParents[id].fire(e.type, extend({
	  				layer: e.target,
	  				propagatedFrom: e.target
	  			}, e), true);
	  		}
	  	}
	  };

	  // aliases; we should ditch those eventually

	  // @method addEventListener(…): this
	  // Alias to [`on(…)`](#evented-on)
	  Events.addEventListener = Events.on;

	  // @method removeEventListener(…): this
	  // Alias to [`off(…)`](#evented-off)

	  // @method clearAllEventListeners(…): this
	  // Alias to [`off()`](#evented-off)
	  Events.removeEventListener = Events.clearAllEventListeners = Events.off;

	  // @method addOneTimeEventListener(…): this
	  // Alias to [`once(…)`](#evented-once)
	  Events.addOneTimeEventListener = Events.once;

	  // @method fireEvent(…): this
	  // Alias to [`fire(…)`](#evented-fire)
	  Events.fireEvent = Events.fire;

	  // @method hasEventListeners(…): Boolean
	  // Alias to [`listens(…)`](#evented-listens)
	  Events.hasEventListeners = Events.listens;

	  var Evented = Class.extend(Events);

	  /*
	   * @class Point
	   * @aka L.Point
	   *
	   * Represents a point with `x` and `y` coordinates in pixels.
	   *
	   * @example
	   *
	   * ```js
	   * var point = L.point(200, 300);
	   * ```
	   *
	   * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
	   *
	   * ```js
	   * map.panBy([200, 300]);
	   * map.panBy(L.point(200, 300));
	   * ```
	   *
	   * Note that `Point` does not inherit from Leaflet's `Class` object,
	   * which means new classes can't inherit from it, and new methods
	   * can't be added to it with the `include` function.
	   */

	  function Point(x, y, round) {
	  	// @property x: Number; The `x` coordinate of the point
	  	this.x = (round ? Math.round(x) : x);
	  	// @property y: Number; The `y` coordinate of the point
	  	this.y = (round ? Math.round(y) : y);
	  }

	  var trunc = Math.trunc || function (v) {
	  	return v > 0 ? Math.floor(v) : Math.ceil(v);
	  };

	  Point.prototype = {

	  	// @method clone(): Point
	  	// Returns a copy of the current point.
	  	clone: function () {
	  		return new Point(this.x, this.y);
	  	},

	  	// @method add(otherPoint: Point): Point
	  	// Returns the result of addition of the current and the given points.
	  	add: function (point) {
	  		// non-destructive, returns a new point
	  		return this.clone()._add(toPoint(point));
	  	},

	  	_add: function (point) {
	  		// destructive, used directly for performance in situations where it's safe to modify existing point
	  		this.x += point.x;
	  		this.y += point.y;
	  		return this;
	  	},

	  	// @method subtract(otherPoint: Point): Point
	  	// Returns the result of subtraction of the given point from the current.
	  	subtract: function (point) {
	  		return this.clone()._subtract(toPoint(point));
	  	},

	  	_subtract: function (point) {
	  		this.x -= point.x;
	  		this.y -= point.y;
	  		return this;
	  	},

	  	// @method divideBy(num: Number): Point
	  	// Returns the result of division of the current point by the given number.
	  	divideBy: function (num) {
	  		return this.clone()._divideBy(num);
	  	},

	  	_divideBy: function (num) {
	  		this.x /= num;
	  		this.y /= num;
	  		return this;
	  	},

	  	// @method multiplyBy(num: Number): Point
	  	// Returns the result of multiplication of the current point by the given number.
	  	multiplyBy: function (num) {
	  		return this.clone()._multiplyBy(num);
	  	},

	  	_multiplyBy: function (num) {
	  		this.x *= num;
	  		this.y *= num;
	  		return this;
	  	},

	  	// @method scaleBy(scale: Point): Point
	  	// Multiply each coordinate of the current point by each coordinate of
	  	// `scale`. In linear algebra terms, multiply the point by the
	  	// [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
	  	// defined by `scale`.
	  	scaleBy: function (point) {
	  		return new Point(this.x * point.x, this.y * point.y);
	  	},

	  	// @method unscaleBy(scale: Point): Point
	  	// Inverse of `scaleBy`. Divide each coordinate of the current point by
	  	// each coordinate of `scale`.
	  	unscaleBy: function (point) {
	  		return new Point(this.x / point.x, this.y / point.y);
	  	},

	  	// @method round(): Point
	  	// Returns a copy of the current point with rounded coordinates.
	  	round: function () {
	  		return this.clone()._round();
	  	},

	  	_round: function () {
	  		this.x = Math.round(this.x);
	  		this.y = Math.round(this.y);
	  		return this;
	  	},

	  	// @method floor(): Point
	  	// Returns a copy of the current point with floored coordinates (rounded down).
	  	floor: function () {
	  		return this.clone()._floor();
	  	},

	  	_floor: function () {
	  		this.x = Math.floor(this.x);
	  		this.y = Math.floor(this.y);
	  		return this;
	  	},

	  	// @method ceil(): Point
	  	// Returns a copy of the current point with ceiled coordinates (rounded up).
	  	ceil: function () {
	  		return this.clone()._ceil();
	  	},

	  	_ceil: function () {
	  		this.x = Math.ceil(this.x);
	  		this.y = Math.ceil(this.y);
	  		return this;
	  	},

	  	// @method trunc(): Point
	  	// Returns a copy of the current point with truncated coordinates (rounded towards zero).
	  	trunc: function () {
	  		return this.clone()._trunc();
	  	},

	  	_trunc: function () {
	  		this.x = trunc(this.x);
	  		this.y = trunc(this.y);
	  		return this;
	  	},

	  	// @method distanceTo(otherPoint: Point): Number
	  	// Returns the cartesian distance between the current and the given points.
	  	distanceTo: function (point) {
	  		point = toPoint(point);

	  		var x = point.x - this.x,
	  		    y = point.y - this.y;

	  		return Math.sqrt(x * x + y * y);
	  	},

	  	// @method equals(otherPoint: Point): Boolean
	  	// Returns `true` if the given point has the same coordinates.
	  	equals: function (point) {
	  		point = toPoint(point);

	  		return point.x === this.x &&
	  		       point.y === this.y;
	  	},

	  	// @method contains(otherPoint: Point): Boolean
	  	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
	  	contains: function (point) {
	  		point = toPoint(point);

	  		return Math.abs(point.x) <= Math.abs(this.x) &&
	  		       Math.abs(point.y) <= Math.abs(this.y);
	  	},

	  	// @method toString(): String
	  	// Returns a string representation of the point for debugging purposes.
	  	toString: function () {
	  		return 'Point(' +
	  		        formatNum(this.x) + ', ' +
	  		        formatNum(this.y) + ')';
	  	}
	  };

	  // @factory L.point(x: Number, y: Number, round?: Boolean)
	  // Creates a Point object with the given `x` and `y` coordinates. If optional `round` is set to true, rounds the `x` and `y` values.

	  // @alternative
	  // @factory L.point(coords: Number[])
	  // Expects an array of the form `[x, y]` instead.

	  // @alternative
	  // @factory L.point(coords: Object)
	  // Expects a plain object of the form `{x: Number, y: Number}` instead.
	  function toPoint(x, y, round) {
	  	if (x instanceof Point) {
	  		return x;
	  	}
	  	if (isArray(x)) {
	  		return new Point(x[0], x[1]);
	  	}
	  	if (x === undefined || x === null) {
	  		return x;
	  	}
	  	if (typeof x === 'object' && 'x' in x && 'y' in x) {
	  		return new Point(x.x, x.y);
	  	}
	  	return new Point(x, y, round);
	  }

	  /*
	   * @class Bounds
	   * @aka L.Bounds
	   *
	   * Represents a rectangular area in pixel coordinates.
	   *
	   * @example
	   *
	   * ```js
	   * var p1 = L.point(10, 10),
	   * p2 = L.point(40, 60),
	   * bounds = L.bounds(p1, p2);
	   * ```
	   *
	   * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
	   *
	   * ```js
	   * otherBounds.intersects([[10, 10], [40, 60]]);
	   * ```
	   *
	   * Note that `Bounds` does not inherit from Leaflet's `Class` object,
	   * which means new classes can't inherit from it, and new methods
	   * can't be added to it with the `include` function.
	   */

	  function Bounds(a, b) {
	  	if (!a) { return; }

	  	var points = b ? [a, b] : a;

	  	for (var i = 0, len = points.length; i < len; i++) {
	  		this.extend(points[i]);
	  	}
	  }

	  Bounds.prototype = {
	  	// @method extend(point: Point): this
	  	// Extends the bounds to contain the given point.

	  	// @alternative
	  	// @method extend(otherBounds: Bounds): this
	  	// Extend the bounds to contain the given bounds
	  	extend: function (obj) {
	  		var min2, max2;
	  		if (!obj) { return this; }

	  		if (obj instanceof Point || typeof obj[0] === 'number' || 'x' in obj) {
	  			min2 = max2 = toPoint(obj);
	  		} else {
	  			obj = toBounds(obj);
	  			min2 = obj.min;
	  			max2 = obj.max;

	  			if (!min2 || !max2) { return this; }
	  		}

	  		// @property min: Point
	  		// The top left corner of the rectangle.
	  		// @property max: Point
	  		// The bottom right corner of the rectangle.
	  		if (!this.min && !this.max) {
	  			this.min = min2.clone();
	  			this.max = max2.clone();
	  		} else {
	  			this.min.x = Math.min(min2.x, this.min.x);
	  			this.max.x = Math.max(max2.x, this.max.x);
	  			this.min.y = Math.min(min2.y, this.min.y);
	  			this.max.y = Math.max(max2.y, this.max.y);
	  		}
	  		return this;
	  	},

	  	// @method getCenter(round?: Boolean): Point
	  	// Returns the center point of the bounds.
	  	getCenter: function (round) {
	  		return toPoint(
	  		        (this.min.x + this.max.x) / 2,
	  		        (this.min.y + this.max.y) / 2, round);
	  	},

	  	// @method getBottomLeft(): Point
	  	// Returns the bottom-left point of the bounds.
	  	getBottomLeft: function () {
	  		return toPoint(this.min.x, this.max.y);
	  	},

	  	// @method getTopRight(): Point
	  	// Returns the top-right point of the bounds.
	  	getTopRight: function () { // -> Point
	  		return toPoint(this.max.x, this.min.y);
	  	},

	  	// @method getTopLeft(): Point
	  	// Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
	  	getTopLeft: function () {
	  		return this.min; // left, top
	  	},

	  	// @method getBottomRight(): Point
	  	// Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
	  	getBottomRight: function () {
	  		return this.max; // right, bottom
	  	},

	  	// @method getSize(): Point
	  	// Returns the size of the given bounds
	  	getSize: function () {
	  		return this.max.subtract(this.min);
	  	},

	  	// @method contains(otherBounds: Bounds): Boolean
	  	// Returns `true` if the rectangle contains the given one.
	  	// @alternative
	  	// @method contains(point: Point): Boolean
	  	// Returns `true` if the rectangle contains the given point.
	  	contains: function (obj) {
	  		var min, max;

	  		if (typeof obj[0] === 'number' || obj instanceof Point) {
	  			obj = toPoint(obj);
	  		} else {
	  			obj = toBounds(obj);
	  		}

	  		if (obj instanceof Bounds) {
	  			min = obj.min;
	  			max = obj.max;
	  		} else {
	  			min = max = obj;
	  		}

	  		return (min.x >= this.min.x) &&
	  		       (max.x <= this.max.x) &&
	  		       (min.y >= this.min.y) &&
	  		       (max.y <= this.max.y);
	  	},

	  	// @method intersects(otherBounds: Bounds): Boolean
	  	// Returns `true` if the rectangle intersects the given bounds. Two bounds
	  	// intersect if they have at least one point in common.
	  	intersects: function (bounds) { // (Bounds) -> Boolean
	  		bounds = toBounds(bounds);

	  		var min = this.min,
	  		    max = this.max,
	  		    min2 = bounds.min,
	  		    max2 = bounds.max,
	  		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
	  		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

	  		return xIntersects && yIntersects;
	  	},

	  	// @method overlaps(otherBounds: Bounds): Boolean
	  	// Returns `true` if the rectangle overlaps the given bounds. Two bounds
	  	// overlap if their intersection is an area.
	  	overlaps: function (bounds) { // (Bounds) -> Boolean
	  		bounds = toBounds(bounds);

	  		var min = this.min,
	  		    max = this.max,
	  		    min2 = bounds.min,
	  		    max2 = bounds.max,
	  		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
	  		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

	  		return xOverlaps && yOverlaps;
	  	},

	  	// @method isValid(): Boolean
	  	// Returns `true` if the bounds are properly initialized.
	  	isValid: function () {
	  		return !!(this.min && this.max);
	  	},


	  	// @method pad(bufferRatio: Number): Bounds
	  	// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
	  	// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
	  	// Negative values will retract the bounds.
	  	pad: function (bufferRatio) {
	  		var min = this.min,
	  		max = this.max,
	  		heightBuffer = Math.abs(min.x - max.x) * bufferRatio,
	  		widthBuffer = Math.abs(min.y - max.y) * bufferRatio;


	  		return toBounds(
	  			toPoint(min.x - heightBuffer, min.y - widthBuffer),
	  			toPoint(max.x + heightBuffer, max.y + widthBuffer));
	  	},


	  	// @method equals(otherBounds: Bounds): Boolean
	  	// Returns `true` if the rectangle is equivalent to the given bounds.
	  	equals: function (bounds) {
	  		if (!bounds) { return false; }

	  		bounds = toBounds(bounds);

	  		return this.min.equals(bounds.getTopLeft()) &&
	  			this.max.equals(bounds.getBottomRight());
	  	},
	  };


	  // @factory L.bounds(corner1: Point, corner2: Point)
	  // Creates a Bounds object from two corners coordinate pairs.
	  // @alternative
	  // @factory L.bounds(points: Point[])
	  // Creates a Bounds object from the given array of points.
	  function toBounds(a, b) {
	  	if (!a || a instanceof Bounds) {
	  		return a;
	  	}
	  	return new Bounds(a, b);
	  }

	  /*
	   * @class LatLngBounds
	   * @aka L.LatLngBounds
	   *
	   * Represents a rectangular geographical area on a map.
	   *
	   * @example
	   *
	   * ```js
	   * var corner1 = L.latLng(40.712, -74.227),
	   * corner2 = L.latLng(40.774, -74.125),
	   * bounds = L.latLngBounds(corner1, corner2);
	   * ```
	   *
	   * All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
	   *
	   * ```js
	   * map.fitBounds([
	   * 	[40.712, -74.227],
	   * 	[40.774, -74.125]
	   * ]);
	   * ```
	   *
	   * Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners _outside_ the [-180, 180] degrees longitude range.
	   *
	   * Note that `LatLngBounds` does not inherit from Leaflet's `Class` object,
	   * which means new classes can't inherit from it, and new methods
	   * can't be added to it with the `include` function.
	   */

	  function LatLngBounds(corner1, corner2) { // (LatLng, LatLng) or (LatLng[])
	  	if (!corner1) { return; }

	  	var latlngs = corner2 ? [corner1, corner2] : corner1;

	  	for (var i = 0, len = latlngs.length; i < len; i++) {
	  		this.extend(latlngs[i]);
	  	}
	  }

	  LatLngBounds.prototype = {

	  	// @method extend(latlng: LatLng): this
	  	// Extend the bounds to contain the given point

	  	// @alternative
	  	// @method extend(otherBounds: LatLngBounds): this
	  	// Extend the bounds to contain the given bounds
	  	extend: function (obj) {
	  		var sw = this._southWest,
	  		    ne = this._northEast,
	  		    sw2, ne2;

	  		if (obj instanceof LatLng) {
	  			sw2 = obj;
	  			ne2 = obj;

	  		} else if (obj instanceof LatLngBounds) {
	  			sw2 = obj._southWest;
	  			ne2 = obj._northEast;

	  			if (!sw2 || !ne2) { return this; }

	  		} else {
	  			return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
	  		}

	  		if (!sw && !ne) {
	  			this._southWest = new LatLng(sw2.lat, sw2.lng);
	  			this._northEast = new LatLng(ne2.lat, ne2.lng);
	  		} else {
	  			sw.lat = Math.min(sw2.lat, sw.lat);
	  			sw.lng = Math.min(sw2.lng, sw.lng);
	  			ne.lat = Math.max(ne2.lat, ne.lat);
	  			ne.lng = Math.max(ne2.lng, ne.lng);
	  		}

	  		return this;
	  	},

	  	// @method pad(bufferRatio: Number): LatLngBounds
	  	// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
	  	// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
	  	// Negative values will retract the bounds.
	  	pad: function (bufferRatio) {
	  		var sw = this._southWest,
	  		    ne = this._northEast,
	  		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
	  		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

	  		return new LatLngBounds(
	  		        new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
	  		        new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
	  	},

	  	// @method getCenter(): LatLng
	  	// Returns the center point of the bounds.
	  	getCenter: function () {
	  		return new LatLng(
	  		        (this._southWest.lat + this._northEast.lat) / 2,
	  		        (this._southWest.lng + this._northEast.lng) / 2);
	  	},

	  	// @method getSouthWest(): LatLng
	  	// Returns the south-west point of the bounds.
	  	getSouthWest: function () {
	  		return this._southWest;
	  	},

	  	// @method getNorthEast(): LatLng
	  	// Returns the north-east point of the bounds.
	  	getNorthEast: function () {
	  		return this._northEast;
	  	},

	  	// @method getNorthWest(): LatLng
	  	// Returns the north-west point of the bounds.
	  	getNorthWest: function () {
	  		return new LatLng(this.getNorth(), this.getWest());
	  	},

	  	// @method getSouthEast(): LatLng
	  	// Returns the south-east point of the bounds.
	  	getSouthEast: function () {
	  		return new LatLng(this.getSouth(), this.getEast());
	  	},

	  	// @method getWest(): Number
	  	// Returns the west longitude of the bounds
	  	getWest: function () {
	  		return this._southWest.lng;
	  	},

	  	// @method getSouth(): Number
	  	// Returns the south latitude of the bounds
	  	getSouth: function () {
	  		return this._southWest.lat;
	  	},

	  	// @method getEast(): Number
	  	// Returns the east longitude of the bounds
	  	getEast: function () {
	  		return this._northEast.lng;
	  	},

	  	// @method getNorth(): Number
	  	// Returns the north latitude of the bounds
	  	getNorth: function () {
	  		return this._northEast.lat;
	  	},

	  	// @method contains(otherBounds: LatLngBounds): Boolean
	  	// Returns `true` if the rectangle contains the given one.

	  	// @alternative
	  	// @method contains (latlng: LatLng): Boolean
	  	// Returns `true` if the rectangle contains the given point.
	  	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
	  		if (typeof obj[0] === 'number' || obj instanceof LatLng || 'lat' in obj) {
	  			obj = toLatLng(obj);
	  		} else {
	  			obj = toLatLngBounds(obj);
	  		}

	  		var sw = this._southWest,
	  		    ne = this._northEast,
	  		    sw2, ne2;

	  		if (obj instanceof LatLngBounds) {
	  			sw2 = obj.getSouthWest();
	  			ne2 = obj.getNorthEast();
	  		} else {
	  			sw2 = ne2 = obj;
	  		}

	  		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
	  		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	  	},

	  	// @method intersects(otherBounds: LatLngBounds): Boolean
	  	// Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
	  	intersects: function (bounds) {
	  		bounds = toLatLngBounds(bounds);

	  		var sw = this._southWest,
	  		    ne = this._northEast,
	  		    sw2 = bounds.getSouthWest(),
	  		    ne2 = bounds.getNorthEast(),

	  		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
	  		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

	  		return latIntersects && lngIntersects;
	  	},

	  	// @method overlaps(otherBounds: LatLngBounds): Boolean
	  	// Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
	  	overlaps: function (bounds) {
	  		bounds = toLatLngBounds(bounds);

	  		var sw = this._southWest,
	  		    ne = this._northEast,
	  		    sw2 = bounds.getSouthWest(),
	  		    ne2 = bounds.getNorthEast(),

	  		    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
	  		    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);

	  		return latOverlaps && lngOverlaps;
	  	},

	  	// @method toBBoxString(): String
	  	// Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
	  	toBBoxString: function () {
	  		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	  	},

	  	// @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
	  	// Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
	  	equals: function (bounds, maxMargin) {
	  		if (!bounds) { return false; }

	  		bounds = toLatLngBounds(bounds);

	  		return this._southWest.equals(bounds.getSouthWest(), maxMargin) &&
	  		       this._northEast.equals(bounds.getNorthEast(), maxMargin);
	  	},

	  	// @method isValid(): Boolean
	  	// Returns `true` if the bounds are properly initialized.
	  	isValid: function () {
	  		return !!(this._southWest && this._northEast);
	  	}
	  };

	  // TODO International date line?

	  // @factory L.latLngBounds(corner1: LatLng, corner2: LatLng)
	  // Creates a `LatLngBounds` object by defining two diagonally opposite corners of the rectangle.

	  // @alternative
	  // @factory L.latLngBounds(latlngs: LatLng[])
	  // Creates a `LatLngBounds` object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with [`fitBounds`](#map-fitbounds).
	  function toLatLngBounds(a, b) {
	  	if (a instanceof LatLngBounds) {
	  		return a;
	  	}
	  	return new LatLngBounds(a, b);
	  }

	  /* @class LatLng
	   * @aka L.LatLng
	   *
	   * Represents a geographical point with a certain latitude and longitude.
	   *
	   * @example
	   *
	   * ```
	   * var latlng = L.latLng(50.5, 30.5);
	   * ```
	   *
	   * All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:
	   *
	   * ```
	   * map.panTo([50, 30]);
	   * map.panTo({lon: 30, lat: 50});
	   * map.panTo({lat: 50, lng: 30});
	   * map.panTo(L.latLng(50, 30));
	   * ```
	   *
	   * Note that `LatLng` does not inherit from Leaflet's `Class` object,
	   * which means new classes can't inherit from it, and new methods
	   * can't be added to it with the `include` function.
	   */

	  function LatLng(lat, lng, alt) {
	  	if (isNaN(lat) || isNaN(lng)) {
	  		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
	  	}

	  	// @property lat: Number
	  	// Latitude in degrees
	  	this.lat = +lat;

	  	// @property lng: Number
	  	// Longitude in degrees
	  	this.lng = +lng;

	  	// @property alt: Number
	  	// Altitude in meters (optional)
	  	if (alt !== undefined) {
	  		this.alt = +alt;
	  	}
	  }

	  LatLng.prototype = {
	  	// @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
	  	// Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
	  	equals: function (obj, maxMargin) {
	  		if (!obj) { return false; }

	  		obj = toLatLng(obj);

	  		var margin = Math.max(
	  		        Math.abs(this.lat - obj.lat),
	  		        Math.abs(this.lng - obj.lng));

	  		return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
	  	},

	  	// @method toString(): String
	  	// Returns a string representation of the point (for debugging purposes).
	  	toString: function (precision) {
	  		return 'LatLng(' +
	  		        formatNum(this.lat, precision) + ', ' +
	  		        formatNum(this.lng, precision) + ')';
	  	},

	  	// @method distanceTo(otherLatLng: LatLng): Number
	  	// Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
	  	distanceTo: function (other) {
	  		return Earth.distance(this, toLatLng(other));
	  	},

	  	// @method wrap(): LatLng
	  	// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
	  	wrap: function () {
	  		return Earth.wrapLatLng(this);
	  	},

	  	// @method toBounds(sizeInMeters: Number): LatLngBounds
	  	// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
	  	toBounds: function (sizeInMeters) {
	  		var latAccuracy = 180 * sizeInMeters / 40075017,
	  		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

	  		return toLatLngBounds(
	  		        [this.lat - latAccuracy, this.lng - lngAccuracy],
	  		        [this.lat + latAccuracy, this.lng + lngAccuracy]);
	  	},

	  	clone: function () {
	  		return new LatLng(this.lat, this.lng, this.alt);
	  	}
	  };



	  // @factory L.latLng(latitude: Number, longitude: Number, altitude?: Number): LatLng
	  // Creates an object representing a geographical point with the given latitude and longitude (and optionally altitude).

	  // @alternative
	  // @factory L.latLng(coords: Array): LatLng
	  // Expects an array of the form `[Number, Number]` or `[Number, Number, Number]` instead.

	  // @alternative
	  // @factory L.latLng(coords: Object): LatLng
	  // Expects an plain object of the form `{lat: Number, lng: Number}` or `{lat: Number, lng: Number, alt: Number}` instead.

	  function toLatLng(a, b, c) {
	  	if (a instanceof LatLng) {
	  		return a;
	  	}
	  	if (isArray(a) && typeof a[0] !== 'object') {
	  		if (a.length === 3) {
	  			return new LatLng(a[0], a[1], a[2]);
	  		}
	  		if (a.length === 2) {
	  			return new LatLng(a[0], a[1]);
	  		}
	  		return null;
	  	}
	  	if (a === undefined || a === null) {
	  		return a;
	  	}
	  	if (typeof a === 'object' && 'lat' in a) {
	  		return new LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
	  	}
	  	if (b === undefined) {
	  		return null;
	  	}
	  	return new LatLng(a, b, c);
	  }

	  /*
	   * @namespace CRS
	   * @crs L.CRS.Base
	   * Object that defines coordinate reference systems for projecting
	   * geographical points into pixel (screen) coordinates and back (and to
	   * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
	   * [spatial reference system](https://en.wikipedia.org/wiki/Spatial_reference_system).
	   *
	   * Leaflet defines the most usual CRSs by default. If you want to use a
	   * CRS not defined by default, take a look at the
	   * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
	   *
	   * Note that the CRS instances do not inherit from Leaflet's `Class` object,
	   * and can't be instantiated. Also, new classes can't inherit from them,
	   * and methods can't be added to them with the `include` function.
	   */

	  var CRS = {
	  	// @method latLngToPoint(latlng: LatLng, zoom: Number): Point
	  	// Projects geographical coordinates into pixel coordinates for a given zoom.
	  	latLngToPoint: function (latlng, zoom) {
	  		var projectedPoint = this.projection.project(latlng),
	  		    scale = this.scale(zoom);

	  		return this.transformation._transform(projectedPoint, scale);
	  	},

	  	// @method pointToLatLng(point: Point, zoom: Number): LatLng
	  	// The inverse of `latLngToPoint`. Projects pixel coordinates on a given
	  	// zoom into geographical coordinates.
	  	pointToLatLng: function (point, zoom) {
	  		var scale = this.scale(zoom),
	  		    untransformedPoint = this.transformation.untransform(point, scale);

	  		return this.projection.unproject(untransformedPoint);
	  	},

	  	// @method project(latlng: LatLng): Point
	  	// Projects geographical coordinates into coordinates in units accepted for
	  	// this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
	  	project: function (latlng) {
	  		return this.projection.project(latlng);
	  	},

	  	// @method unproject(point: Point): LatLng
	  	// Given a projected coordinate returns the corresponding LatLng.
	  	// The inverse of `project`.
	  	unproject: function (point) {
	  		return this.projection.unproject(point);
	  	},

	  	// @method scale(zoom: Number): Number
	  	// Returns the scale used when transforming projected coordinates into
	  	// pixel coordinates for a particular zoom. For example, it returns
	  	// `256 * 2^zoom` for Mercator-based CRS.
	  	scale: function (zoom) {
	  		return 256 * Math.pow(2, zoom);
	  	},

	  	// @method zoom(scale: Number): Number
	  	// Inverse of `scale()`, returns the zoom level corresponding to a scale
	  	// factor of `scale`.
	  	zoom: function (scale) {
	  		return Math.log(scale / 256) / Math.LN2;
	  	},

	  	// @method getProjectedBounds(zoom: Number): Bounds
	  	// Returns the projection's bounds scaled and transformed for the provided `zoom`.
	  	getProjectedBounds: function (zoom) {
	  		if (this.infinite) { return null; }

	  		var b = this.projection.bounds,
	  		    s = this.scale(zoom),
	  		    min = this.transformation.transform(b.min, s),
	  		    max = this.transformation.transform(b.max, s);

	  		return new Bounds(min, max);
	  	},

	  	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
	  	// Returns the distance between two geographical coordinates.

	  	// @property code: String
	  	// Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
	  	//
	  	// @property wrapLng: Number[]
	  	// An array of two numbers defining whether the longitude (horizontal) coordinate
	  	// axis wraps around a given range and how. Defaults to `[-180, 180]` in most
	  	// geographical CRSs. If `undefined`, the longitude axis does not wrap around.
	  	//
	  	// @property wrapLat: Number[]
	  	// Like `wrapLng`, but for the latitude (vertical) axis.

	  	// wrapLng: [min, max],
	  	// wrapLat: [min, max],

	  	// @property infinite: Boolean
	  	// If true, the coordinate space will be unbounded (infinite in both axes)
	  	infinite: false,

	  	// @method wrapLatLng(latlng: LatLng): LatLng
	  	// Returns a `LatLng` where lat and lng has been wrapped according to the
	  	// CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
	  	wrapLatLng: function (latlng) {
	  		var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
	  		    lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
	  		    alt = latlng.alt;

	  		return new LatLng(lat, lng, alt);
	  	},

	  	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
	  	// Returns a `LatLngBounds` with the same size as the given one, ensuring
	  	// that its center is within the CRS's bounds.
	  	// Only accepts actual `L.LatLngBounds` instances, not arrays.
	  	wrapLatLngBounds: function (bounds) {
	  		var center = bounds.getCenter(),
	  		    newCenter = this.wrapLatLng(center),
	  		    latShift = center.lat - newCenter.lat,
	  		    lngShift = center.lng - newCenter.lng;

	  		if (latShift === 0 && lngShift === 0) {
	  			return bounds;
	  		}

	  		var sw = bounds.getSouthWest(),
	  		    ne = bounds.getNorthEast(),
	  		    newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift),
	  		    newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);

	  		return new LatLngBounds(newSw, newNe);
	  	}
	  };

	  /*
	   * @namespace CRS
	   * @crs L.CRS.Earth
	   *
	   * Serves as the base for CRS that are global such that they cover the earth.
	   * Can only be used as the base for other CRS and cannot be used directly,
	   * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
	   * meters.
	   */

	  var Earth = extend({}, CRS, {
	  	wrapLng: [-180, 180],

	  	// Mean Earth Radius, as recommended for use by
	  	// the International Union of Geodesy and Geophysics,
	  	// see https://rosettacode.org/wiki/Haversine_formula
	  	R: 6371000,

	  	// distance between two geographical points using spherical law of cosines approximation
	  	distance: function (latlng1, latlng2) {
	  		var rad = Math.PI / 180,
	  		    lat1 = latlng1.lat * rad,
	  		    lat2 = latlng2.lat * rad,
	  		    sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2),
	  		    sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2),
	  		    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
	  		    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  		return this.R * c;
	  	}
	  });

	  /*
	   * @namespace Projection
	   * @projection L.Projection.SphericalMercator
	   *
	   * Spherical Mercator projection — the most common projection for online maps,
	   * used by almost all free and commercial tile providers. Assumes that Earth is
	   * a sphere. Used by the `EPSG:3857` CRS.
	   */

	  var earthRadius = 6378137;

	  var SphericalMercator = {

	  	R: earthRadius,
	  	MAX_LATITUDE: 85.0511287798,

	  	project: function (latlng) {
	  		var d = Math.PI / 180,
	  		    max = this.MAX_LATITUDE,
	  		    lat = Math.max(Math.min(max, latlng.lat), -max),
	  		    sin = Math.sin(lat * d);

	  		return new Point(
	  			this.R * latlng.lng * d,
	  			this.R * Math.log((1 + sin) / (1 - sin)) / 2);
	  	},

	  	unproject: function (point) {
	  		var d = 180 / Math.PI;

	  		return new LatLng(
	  			(2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
	  			point.x * d / this.R);
	  	},

	  	bounds: (function () {
	  		var d = earthRadius * Math.PI;
	  		return new Bounds([-d, -d], [d, d]);
	  	})()
	  };

	  /*
	   * @class Transformation
	   * @aka L.Transformation
	   *
	   * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
	   * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
	   * the reverse. Used by Leaflet in its projections code.
	   *
	   * @example
	   *
	   * ```js
	   * var transformation = L.transformation(2, 5, -1, 10),
	   * 	p = L.point(1, 2),
	   * 	p2 = transformation.transform(p), //  L.point(7, 8)
	   * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
	   * ```
	   */


	  // factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
	  // Creates a `Transformation` object with the given coefficients.
	  function Transformation(a, b, c, d) {
	  	if (isArray(a)) {
	  		// use array properties
	  		this._a = a[0];
	  		this._b = a[1];
	  		this._c = a[2];
	  		this._d = a[3];
	  		return;
	  	}
	  	this._a = a;
	  	this._b = b;
	  	this._c = c;
	  	this._d = d;
	  }

	  Transformation.prototype = {
	  	// @method transform(point: Point, scale?: Number): Point
	  	// Returns a transformed point, optionally multiplied by the given scale.
	  	// Only accepts actual `L.Point` instances, not arrays.
	  	transform: function (point, scale) { // (Point, Number) -> Point
	  		return this._transform(point.clone(), scale);
	  	},

	  	// destructive transform (faster)
	  	_transform: function (point, scale) {
	  		scale = scale || 1;
	  		point.x = scale * (this._a * point.x + this._b);
	  		point.y = scale * (this._c * point.y + this._d);
	  		return point;
	  	},

	  	// @method untransform(point: Point, scale?: Number): Point
	  	// Returns the reverse transformation of the given point, optionally divided
	  	// by the given scale. Only accepts actual `L.Point` instances, not arrays.
	  	untransform: function (point, scale) {
	  		scale = scale || 1;
	  		return new Point(
	  		        (point.x / scale - this._b) / this._a,
	  		        (point.y / scale - this._d) / this._c);
	  	}
	  };

	  // factory L.transformation(a: Number, b: Number, c: Number, d: Number)

	  // @factory L.transformation(a: Number, b: Number, c: Number, d: Number)
	  // Instantiates a Transformation object with the given coefficients.

	  // @alternative
	  // @factory L.transformation(coefficients: Array): Transformation
	  // Expects an coefficients array of the form
	  // `[a: Number, b: Number, c: Number, d: Number]`.

	  function toTransformation(a, b, c, d) {
	  	return new Transformation(a, b, c, d);
	  }

	  /*
	   * @namespace CRS
	   * @crs L.CRS.EPSG3857
	   *
	   * The most common CRS for online maps, used by almost all free and commercial
	   * tile providers. Uses Spherical Mercator projection. Set in by default in
	   * Map's `crs` option.
	   */

	  var EPSG3857 = extend({}, Earth, {
	  	code: 'EPSG:3857',
	  	projection: SphericalMercator,

	  	transformation: (function () {
	  		var scale = 0.5 / (Math.PI * SphericalMercator.R);
	  		return toTransformation(scale, 0.5, -scale, 0.5);
	  	}())
	  });

	  var EPSG900913 = extend({}, EPSG3857, {
	  	code: 'EPSG:900913'
	  });

	  // @namespace SVG; @section
	  // There are several static functions which can be called without instantiating L.SVG:

	  // @function create(name: String): SVGElement
	  // Returns a instance of [SVGElement](https://developer.mozilla.org/docs/Web/API/SVGElement),
	  // corresponding to the class name passed. For example, using 'line' will return
	  // an instance of [SVGLineElement](https://developer.mozilla.org/docs/Web/API/SVGLineElement).
	  function svgCreate(name) {
	  	return document.createElementNS('http://www.w3.org/2000/svg', name);
	  }

	  // @function pointsToPath(rings: Point[], closed: Boolean): String
	  // Generates a SVG path string for multiple rings, with each ring turning
	  // into "M..L..L.." instructions
	  function pointsToPath(rings, closed) {
	  	var str = '',
	  	i, j, len, len2, points, p;

	  	for (i = 0, len = rings.length; i < len; i++) {
	  		points = rings[i];

	  		for (j = 0, len2 = points.length; j < len2; j++) {
	  			p = points[j];
	  			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
	  		}

	  		// closes the ring for polygons; "x" is VML syntax
	  		str += closed ? (Browser.svg ? 'z' : 'x') : '';
	  	}

	  	// SVG complains about empty path strings
	  	return str || 'M0 0';
	  }

	  /*
	   * @namespace Browser
	   * @aka L.Browser
	   *
	   * A namespace with static properties for browser/feature detection used by Leaflet internally.
	   *
	   * @example
	   *
	   * ```js
	   * if (L.Browser.ielt9) {
	   *   alert('Upgrade your browser, dude!');
	   * }
	   * ```
	   */

	  var style = document.documentElement.style;

	  // @property ie: Boolean; `true` for all Internet Explorer versions (not Edge).
	  var ie = 'ActiveXObject' in window;

	  // @property ielt9: Boolean; `true` for Internet Explorer versions less than 9.
	  var ielt9 = ie && !document.addEventListener;

	  // @property edge: Boolean; `true` for the Edge web browser.
	  var edge = 'msLaunchUri' in navigator && !('documentMode' in document);

	  // @property webkit: Boolean;
	  // `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
	  var webkit = userAgentContains('webkit');

	  // @property android: Boolean
	  // **Deprecated.** `true` for any browser running on an Android platform.
	  var android = userAgentContains('android');

	  // @property android23: Boolean; **Deprecated.** `true` for browsers running on Android 2 or Android 3.
	  var android23 = userAgentContains('android 2') || userAgentContains('android 3');

	  /* See https://stackoverflow.com/a/17961266 for details on detecting stock Android */
	  var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10); // also matches AppleWebKit
	  // @property androidStock: Boolean; **Deprecated.** `true` for the Android stock browser (i.e. not Chrome)
	  var androidStock = android && userAgentContains('Google') && webkitVer < 537 && !('AudioNode' in window);

	  // @property opera: Boolean; `true` for the Opera browser
	  var opera = !!window.opera;

	  // @property chrome: Boolean; `true` for the Chrome browser.
	  var chrome = !edge && userAgentContains('chrome');

	  // @property gecko: Boolean; `true` for gecko-based browsers like Firefox.
	  var gecko = userAgentContains('gecko') && !webkit && !opera && !ie;

	  // @property safari: Boolean; `true` for the Safari browser.
	  var safari = !chrome && userAgentContains('safari');

	  var phantom = userAgentContains('phantom');

	  // @property opera12: Boolean
	  // `true` for the Opera browser supporting CSS transforms (version 12 or later).
	  var opera12 = 'OTransition' in style;

	  // @property win: Boolean; `true` when the browser is running in a Windows platform
	  var win = navigator.platform.indexOf('Win') === 0;

	  // @property ie3d: Boolean; `true` for all Internet Explorer versions supporting CSS transforms.
	  var ie3d = ie && ('transition' in style);

	  // @property webkit3d: Boolean; `true` for webkit-based browsers supporting CSS transforms.
	  var webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23;

	  // @property gecko3d: Boolean; `true` for gecko-based browsers supporting CSS transforms.
	  var gecko3d = 'MozPerspective' in style;

	  // @property any3d: Boolean
	  // `true` for all browsers supporting CSS transforms.
	  var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;

	  // @property mobile: Boolean; `true` for all browsers running in a mobile device.
	  var mobile = typeof orientation !== 'undefined' || userAgentContains('mobile');

	  // @property mobileWebkit: Boolean; `true` for all webkit-based browsers in a mobile device.
	  var mobileWebkit = mobile && webkit;

	  // @property mobileWebkit3d: Boolean
	  // `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
	  var mobileWebkit3d = mobile && webkit3d;

	  // @property msPointer: Boolean
	  // `true` for browsers implementing the Microsoft touch events model (notably IE10).
	  var msPointer = !window.PointerEvent && window.MSPointerEvent;

	  // @property pointer: Boolean
	  // `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
	  var pointer = !!(window.PointerEvent || msPointer);

	  // @property touchNative: Boolean
	  // `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
	  // **This does not necessarily mean** that the browser is running in a computer with
	  // a touchscreen, it only means that the browser is capable of understanding
	  // touch events.
	  var touchNative = 'ontouchstart' in window || !!window.TouchEvent;

	  // @property touch: Boolean
	  // `true` for all browsers supporting either [touch](#browser-touch) or [pointer](#browser-pointer) events.
	  // Note: pointer events will be preferred (if available), and processed for all `touch*` listeners.
	  var touch = !window.L_NO_TOUCH && (touchNative || pointer);

	  // @property mobileOpera: Boolean; `true` for the Opera browser in a mobile device.
	  var mobileOpera = mobile && opera;

	  // @property mobileGecko: Boolean
	  // `true` for gecko-based browsers running in a mobile device.
	  var mobileGecko = mobile && gecko;

	  // @property retina: Boolean
	  // `true` for browsers on a high-resolution "retina" screen or on any screen when browser's display zoom is more than 100%.
	  var retina = (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1;

	  // @property passiveEvents: Boolean
	  // `true` for browsers that support passive events.
	  var passiveEvents = (function () {
	  	var supportsPassiveOption = false;
	  	try {
	  		var opts = Object.defineProperty({}, 'passive', {
	  			get: function () { // eslint-disable-line getter-return
	  				supportsPassiveOption = true;
	  			}
	  		});
	  		window.addEventListener('testPassiveEventSupport', falseFn, opts);
	  		window.removeEventListener('testPassiveEventSupport', falseFn, opts);
	  	} catch (e) {
	  		// Errors can safely be ignored since this is only a browser support test.
	  	}
	  	return supportsPassiveOption;
	  }());

	  // @property canvas: Boolean
	  // `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
	  var canvas$1 = (function () {
	  	return !!document.createElement('canvas').getContext;
	  }());

	  // @property svg: Boolean
	  // `true` when the browser supports [SVG](https://developer.mozilla.org/docs/Web/SVG).
	  var svg$1 = !!(document.createElementNS && svgCreate('svg').createSVGRect);

	  var inlineSvg = !!svg$1 && (function () {
	  	var div = document.createElement('div');
	  	div.innerHTML = '<svg/>';
	  	return (div.firstChild && div.firstChild.namespaceURI) === 'http://www.w3.org/2000/svg';
	  })();

	  // @property vml: Boolean
	  // `true` if the browser supports [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language).
	  var vml = !svg$1 && (function () {
	  	try {
	  		var div = document.createElement('div');
	  		div.innerHTML = '<v:shape adj="1"/>';

	  		var shape = div.firstChild;
	  		shape.style.behavior = 'url(#default#VML)';

	  		return shape && (typeof shape.adj === 'object');

	  	} catch (e) {
	  		return false;
	  	}
	  }());


	  // @property mac: Boolean; `true` when the browser is running in a Mac platform
	  var mac = navigator.platform.indexOf('Mac') === 0;

	  // @property mac: Boolean; `true` when the browser is running in a Linux platform
	  var linux = navigator.platform.indexOf('Linux') === 0;

	  function userAgentContains(str) {
	  	return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
	  }


	  var Browser = {
	  	ie: ie,
	  	ielt9: ielt9,
	  	edge: edge,
	  	webkit: webkit,
	  	android: android,
	  	android23: android23,
	  	androidStock: androidStock,
	  	opera: opera,
	  	chrome: chrome,
	  	gecko: gecko,
	  	safari: safari,
	  	phantom: phantom,
	  	opera12: opera12,
	  	win: win,
	  	ie3d: ie3d,
	  	webkit3d: webkit3d,
	  	gecko3d: gecko3d,
	  	any3d: any3d,
	  	mobile: mobile,
	  	mobileWebkit: mobileWebkit,
	  	mobileWebkit3d: mobileWebkit3d,
	  	msPointer: msPointer,
	  	pointer: pointer,
	  	touch: touch,
	  	touchNative: touchNative,
	  	mobileOpera: mobileOpera,
	  	mobileGecko: mobileGecko,
	  	retina: retina,
	  	passiveEvents: passiveEvents,
	  	canvas: canvas$1,
	  	svg: svg$1,
	  	vml: vml,
	  	inlineSvg: inlineSvg,
	  	mac: mac,
	  	linux: linux
	  };

	  /*
	   * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
	   */

	  var POINTER_DOWN =   Browser.msPointer ? 'MSPointerDown'   : 'pointerdown';
	  var POINTER_MOVE =   Browser.msPointer ? 'MSPointerMove'   : 'pointermove';
	  var POINTER_UP =     Browser.msPointer ? 'MSPointerUp'     : 'pointerup';
	  var POINTER_CANCEL = Browser.msPointer ? 'MSPointerCancel' : 'pointercancel';
	  var pEvent = {
	  	touchstart  : POINTER_DOWN,
	  	touchmove   : POINTER_MOVE,
	  	touchend    : POINTER_UP,
	  	touchcancel : POINTER_CANCEL
	  };
	  var handle = {
	  	touchstart  : _onPointerStart,
	  	touchmove   : _handlePointer,
	  	touchend    : _handlePointer,
	  	touchcancel : _handlePointer
	  };
	  var _pointers = {};
	  var _pointerDocListener = false;

	  // Provides a touch events wrapper for (ms)pointer events.
	  // ref https://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

	  function addPointerListener(obj, type, handler) {
	  	if (type === 'touchstart') {
	  		_addPointerDocListener();
	  	}
	  	if (!handle[type]) {
	  		console.warn('wrong event specified:', type);
	  		return falseFn;
	  	}
	  	handler = handle[type].bind(this, handler);
	  	obj.addEventListener(pEvent[type], handler, false);
	  	return handler;
	  }

	  function removePointerListener(obj, type, handler) {
	  	if (!pEvent[type]) {
	  		console.warn('wrong event specified:', type);
	  		return;
	  	}
	  	obj.removeEventListener(pEvent[type], handler, false);
	  }

	  function _globalPointerDown(e) {
	  	_pointers[e.pointerId] = e;
	  }

	  function _globalPointerMove(e) {
	  	if (_pointers[e.pointerId]) {
	  		_pointers[e.pointerId] = e;
	  	}
	  }

	  function _globalPointerUp(e) {
	  	delete _pointers[e.pointerId];
	  }

	  function _addPointerDocListener() {
	  	// need to keep track of what pointers and how many are active to provide e.touches emulation
	  	if (!_pointerDocListener) {
	  		// we listen document as any drags that end by moving the touch off the screen get fired there
	  		document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
	  		document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
	  		document.addEventListener(POINTER_UP, _globalPointerUp, true);
	  		document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);

	  		_pointerDocListener = true;
	  	}
	  }

	  function _handlePointer(handler, e) {
	  	if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || 'mouse')) { return; }

	  	e.touches = [];
	  	for (var i in _pointers) {
	  		e.touches.push(_pointers[i]);
	  	}
	  	e.changedTouches = [e];

	  	handler(e);
	  }

	  function _onPointerStart(handler, e) {
	  	// IE10 specific: MsTouch needs preventDefault. See #2000
	  	if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
	  		preventDefault(e);
	  	}
	  	_handlePointer(handler, e);
	  }

	  /*
	   * Extends the event handling code with double tap support for mobile browsers.
	   *
	   * Note: currently most browsers fire native dblclick, with only a few exceptions
	   * (see https://github.com/Leaflet/Leaflet/issues/7012#issuecomment-595087386)
	   */

	  function makeDblclick(event) {
	  	// in modern browsers `type` cannot be just overridden:
	  	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only
	  	var newEvent = {},
	  	    prop, i;
	  	for (i in event) {
	  		prop = event[i];
	  		newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
	  	}
	  	event = newEvent;
	  	newEvent.type = 'dblclick';
	  	newEvent.detail = 2;
	  	newEvent.isTrusted = false;
	  	newEvent._simulated = true; // for debug purposes
	  	return newEvent;
	  }

	  var delay = 200;
	  function addDoubleTapListener(obj, handler) {
	  	// Most browsers handle double tap natively
	  	obj.addEventListener('dblclick', handler);

	  	// On some platforms the browser doesn't fire native dblclicks for touch events.
	  	// It seems that in all such cases `detail` property of `click` event is always `1`.
	  	// So here we rely on that fact to avoid excessive 'dblclick' simulation when not needed.
	  	var last = 0,
	  	    detail;
	  	function simDblclick(e) {
	  		if (e.detail !== 1) {
	  			detail = e.detail; // keep in sync to avoid false dblclick in some cases
	  			return;
	  		}

	  		if (e.pointerType === 'mouse' ||
	  			(e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents)) {

	  			return;
	  		}

	  		// When clicking on an <input>, the browser generates a click on its
	  		// <label> (and vice versa) triggering two clicks in quick succession.
	  		// This ignores clicks on elements which are a label with a 'for'
	  		// attribute (or children of such a label), but not children of
	  		// a <input>.
	  		var path = getPropagationPath(e);
	  		if (path.some(function (el) {
	  			return el instanceof HTMLLabelElement && el.attributes.for;
	  		}) &&
	  			!path.some(function (el) {
	  				return (
	  					el instanceof HTMLInputElement ||
	  					el instanceof HTMLSelectElement
	  				);
	  			})
	  		) {
	  			return;
	  		}

	  		var now = Date.now();
	  		if (now - last <= delay) {
	  			detail++;
	  			if (detail === 2) {
	  				handler(makeDblclick(e));
	  			}
	  		} else {
	  			detail = 1;
	  		}
	  		last = now;
	  	}

	  	obj.addEventListener('click', simDblclick);

	  	return {
	  		dblclick: handler,
	  		simDblclick: simDblclick
	  	};
	  }

	  function removeDoubleTapListener(obj, handlers) {
	  	obj.removeEventListener('dblclick', handlers.dblclick);
	  	obj.removeEventListener('click', handlers.simDblclick);
	  }

	  /*
	   * @namespace DomUtil
	   *
	   * Utility functions to work with the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
	   * tree, used by Leaflet internally.
	   *
	   * Most functions expecting or returning a `HTMLElement` also work for
	   * SVG elements. The only difference is that classes refer to CSS classes
	   * in HTML and SVG classes in SVG.
	   */


	  // @property TRANSFORM: String
	  // Vendor-prefixed transform style name (e.g. `'webkitTransform'` for WebKit).
	  var TRANSFORM = testProp(
	  	['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

	  // webkitTransition comes first because some browser versions that drop vendor prefix don't do
	  // the same for the transitionend event, in particular the Android 4.1 stock browser

	  // @property TRANSITION: String
	  // Vendor-prefixed transition style name.
	  var TRANSITION = testProp(
	  	['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

	  // @property TRANSITION_END: String
	  // Vendor-prefixed transitionend event name.
	  var TRANSITION_END =
	  	TRANSITION === 'webkitTransition' || TRANSITION === 'OTransition' ? TRANSITION + 'End' : 'transitionend';


	  // @function get(id: String|HTMLElement): HTMLElement
	  // Returns an element given its DOM id, or returns the element itself
	  // if it was passed directly.
	  function get(id) {
	  	return typeof id === 'string' ? document.getElementById(id) : id;
	  }

	  // @function getStyle(el: HTMLElement, styleAttrib: String): String
	  // Returns the value for a certain style attribute on an element,
	  // including computed values or values set through CSS.
	  function getStyle(el, style) {
	  	var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

	  	if ((!value || value === 'auto') && document.defaultView) {
	  		var css = document.defaultView.getComputedStyle(el, null);
	  		value = css ? css[style] : null;
	  	}
	  	return value === 'auto' ? null : value;
	  }

	  // @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
	  // Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
	  function create$1(tagName, className, container) {
	  	var el = document.createElement(tagName);
	  	el.className = className || '';

	  	if (container) {
	  		container.appendChild(el);
	  	}
	  	return el;
	  }

	  // @function remove(el: HTMLElement)
	  // Removes `el` from its parent element
	  function remove(el) {
	  	var parent = el.parentNode;
	  	if (parent) {
	  		parent.removeChild(el);
	  	}
	  }

	  // @function empty(el: HTMLElement)
	  // Removes all of `el`'s children elements from `el`
	  function empty(el) {
	  	while (el.firstChild) {
	  		el.removeChild(el.firstChild);
	  	}
	  }

	  // @function toFront(el: HTMLElement)
	  // Makes `el` the last child of its parent, so it renders in front of the other children.
	  function toFront(el) {
	  	var parent = el.parentNode;
	  	if (parent && parent.lastChild !== el) {
	  		parent.appendChild(el);
	  	}
	  }

	  // @function toBack(el: HTMLElement)
	  // Makes `el` the first child of its parent, so it renders behind the other children.
	  function toBack(el) {
	  	var parent = el.parentNode;
	  	if (parent && parent.firstChild !== el) {
	  		parent.insertBefore(el, parent.firstChild);
	  	}
	  }

	  // @function hasClass(el: HTMLElement, name: String): Boolean
	  // Returns `true` if the element's class attribute contains `name`.
	  function hasClass(el, name) {
	  	if (el.classList !== undefined) {
	  		return el.classList.contains(name);
	  	}
	  	var className = getClass(el);
	  	return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
	  }

	  // @function addClass(el: HTMLElement, name: String)
	  // Adds `name` to the element's class attribute.
	  function addClass(el, name) {
	  	if (el.classList !== undefined) {
	  		var classes = splitWords(name);
	  		for (var i = 0, len = classes.length; i < len; i++) {
	  			el.classList.add(classes[i]);
	  		}
	  	} else if (!hasClass(el, name)) {
	  		var className = getClass(el);
	  		setClass(el, (className ? className + ' ' : '') + name);
	  	}
	  }

	  // @function removeClass(el: HTMLElement, name: String)
	  // Removes `name` from the element's class attribute.
	  function removeClass(el, name) {
	  	if (el.classList !== undefined) {
	  		el.classList.remove(name);
	  	} else {
	  		setClass(el, trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
	  	}
	  }

	  // @function setClass(el: HTMLElement, name: String)
	  // Sets the element's class.
	  function setClass(el, name) {
	  	if (el.className.baseVal === undefined) {
	  		el.className = name;
	  	} else {
	  		// in case of SVG element
	  		el.className.baseVal = name;
	  	}
	  }

	  // @function getClass(el: HTMLElement): String
	  // Returns the element's class.
	  function getClass(el) {
	  	// Check if the element is an SVGElementInstance and use the correspondingElement instead
	  	// (Required for linked SVG elements in IE11.)
	  	if (el.correspondingElement) {
	  		el = el.correspondingElement;
	  	}
	  	return el.className.baseVal === undefined ? el.className : el.className.baseVal;
	  }

	  // @function setOpacity(el: HTMLElement, opacity: Number)
	  // Set the opacity of an element (including old IE support).
	  // `opacity` must be a number from `0` to `1`.
	  function setOpacity(el, value) {
	  	if ('opacity' in el.style) {
	  		el.style.opacity = value;
	  	} else if ('filter' in el.style) {
	  		_setOpacityIE(el, value);
	  	}
	  }

	  function _setOpacityIE(el, value) {
	  	var filter = false,
	  	    filterName = 'DXImageTransform.Microsoft.Alpha';

	  	// filters collection throws an error if we try to retrieve a filter that doesn't exist
	  	try {
	  		filter = el.filters.item(filterName);
	  	} catch (e) {
	  		// don't set opacity to 1 if we haven't already set an opacity,
	  		// it isn't needed and breaks transparent pngs.
	  		if (value === 1) { return; }
	  	}

	  	value = Math.round(value * 100);

	  	if (filter) {
	  		filter.Enabled = (value !== 100);
	  		filter.Opacity = value;
	  	} else {
	  		el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
	  	}
	  }

	  // @function testProp(props: String[]): String|false
	  // Goes through the array of style names and returns the first name
	  // that is a valid style name for an element. If no such name is found,
	  // it returns false. Useful for vendor-prefixed styles like `transform`.
	  function testProp(props) {
	  	var style = document.documentElement.style;

	  	for (var i = 0; i < props.length; i++) {
	  		if (props[i] in style) {
	  			return props[i];
	  		}
	  	}
	  	return false;
	  }

	  // @function setTransform(el: HTMLElement, offset: Point, scale?: Number)
	  // Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
	  // and optionally scaled by `scale`. Does not have an effect if the
	  // browser doesn't support 3D CSS transforms.
	  function setTransform(el, offset, scale) {
	  	var pos = offset || new Point(0, 0);

	  	el.style[TRANSFORM] =
	  		(Browser.ie3d ?
	  			'translate(' + pos.x + 'px,' + pos.y + 'px)' :
	  			'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
	  		(scale ? ' scale(' + scale + ')' : '');
	  }

	  // @function setPosition(el: HTMLElement, position: Point)
	  // Sets the position of `el` to coordinates specified by `position`,
	  // using CSS translate or top/left positioning depending on the browser
	  // (used by Leaflet internally to position its layers).
	  function setPosition(el, point) {

	  	/*eslint-disable */
	  	el._leaflet_pos = point;
	  	/* eslint-enable */

	  	if (Browser.any3d) {
	  		setTransform(el, point);
	  	} else {
	  		el.style.left = point.x + 'px';
	  		el.style.top = point.y + 'px';
	  	}
	  }

	  // @function getPosition(el: HTMLElement): Point
	  // Returns the coordinates of an element previously positioned with setPosition.
	  function getPosition(el) {
	  	// this method is only used for elements previously positioned using setPosition,
	  	// so it's safe to cache the position for performance

	  	return el._leaflet_pos || new Point(0, 0);
	  }

	  // @function disableTextSelection()
	  // Prevents the user from generating `selectstart` DOM events, usually generated
	  // when the user drags the mouse through a page with text. Used internally
	  // by Leaflet to override the behaviour of any click-and-drag interaction on
	  // the map. Affects drag interactions on the whole document.

	  // @function enableTextSelection()
	  // Cancels the effects of a previous [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection).
	  var disableTextSelection;
	  var enableTextSelection;
	  var _userSelect;
	  if ('onselectstart' in document) {
	  	disableTextSelection = function () {
	  		on(window, 'selectstart', preventDefault);
	  	};
	  	enableTextSelection = function () {
	  		off(window, 'selectstart', preventDefault);
	  	};
	  } else {
	  	var userSelectProperty = testProp(
	  		['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

	  	disableTextSelection = function () {
	  		if (userSelectProperty) {
	  			var style = document.documentElement.style;
	  			_userSelect = style[userSelectProperty];
	  			style[userSelectProperty] = 'none';
	  		}
	  	};
	  	enableTextSelection = function () {
	  		if (userSelectProperty) {
	  			document.documentElement.style[userSelectProperty] = _userSelect;
	  			_userSelect = undefined;
	  		}
	  	};
	  }

	  // @function disableImageDrag()
	  // As [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection), but
	  // for `dragstart` DOM events, usually generated when the user drags an image.
	  function disableImageDrag() {
	  	on(window, 'dragstart', preventDefault);
	  }

	  // @function enableImageDrag()
	  // Cancels the effects of a previous [`L.DomUtil.disableImageDrag`](#domutil-disabletextselection).
	  function enableImageDrag() {
	  	off(window, 'dragstart', preventDefault);
	  }

	  var _outlineElement, _outlineStyle;
	  // @function preventOutline(el: HTMLElement)
	  // Makes the [outline](https://developer.mozilla.org/docs/Web/CSS/outline)
	  // of the element `el` invisible. Used internally by Leaflet to prevent
	  // focusable elements from displaying an outline when the user performs a
	  // drag interaction on them.
	  function preventOutline(element) {
	  	while (element.tabIndex === -1) {
	  		element = element.parentNode;
	  	}
	  	if (!element.style) { return; }
	  	restoreOutline();
	  	_outlineElement = element;
	  	_outlineStyle = element.style.outlineStyle;
	  	element.style.outlineStyle = 'none';
	  	on(window, 'keydown', restoreOutline);
	  }

	  // @function restoreOutline()
	  // Cancels the effects of a previous [`L.DomUtil.preventOutline`]().
	  function restoreOutline() {
	  	if (!_outlineElement) { return; }
	  	_outlineElement.style.outlineStyle = _outlineStyle;
	  	_outlineElement = undefined;
	  	_outlineStyle = undefined;
	  	off(window, 'keydown', restoreOutline);
	  }

	  // @function getSizedParentNode(el: HTMLElement): HTMLElement
	  // Finds the closest parent node which size (width and height) is not null.
	  function getSizedParentNode(element) {
	  	do {
	  		element = element.parentNode;
	  	} while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
	  	return element;
	  }

	  // @function getScale(el: HTMLElement): Object
	  // Computes the CSS scale currently applied on the element.
	  // Returns an object with `x` and `y` members as horizontal and vertical scales respectively,
	  // and `boundingClientRect` as the result of [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).
	  function getScale(element) {
	  	var rect = element.getBoundingClientRect(); // Read-only in old browsers.

	  	return {
	  		x: rect.width / element.offsetWidth || 1,
	  		y: rect.height / element.offsetHeight || 1,
	  		boundingClientRect: rect
	  	};
	  }

	  var DomUtil = {
	    __proto__: null,
	    TRANSFORM: TRANSFORM,
	    TRANSITION: TRANSITION,
	    TRANSITION_END: TRANSITION_END,
	    get: get,
	    getStyle: getStyle,
	    create: create$1,
	    remove: remove,
	    empty: empty,
	    toFront: toFront,
	    toBack: toBack,
	    hasClass: hasClass,
	    addClass: addClass,
	    removeClass: removeClass,
	    setClass: setClass,
	    getClass: getClass,
	    setOpacity: setOpacity,
	    testProp: testProp,
	    setTransform: setTransform,
	    setPosition: setPosition,
	    getPosition: getPosition,
	    get disableTextSelection () { return disableTextSelection; },
	    get enableTextSelection () { return enableTextSelection; },
	    disableImageDrag: disableImageDrag,
	    enableImageDrag: enableImageDrag,
	    preventOutline: preventOutline,
	    restoreOutline: restoreOutline,
	    getSizedParentNode: getSizedParentNode,
	    getScale: getScale
	  };

	  /*
	   * @namespace DomEvent
	   * Utility functions to work with the [DOM events](https://developer.mozilla.org/docs/Web/API/Event), used by Leaflet internally.
	   */

	  // Inspired by John Resig, Dean Edwards and YUI addEvent implementations.

	  // @function on(el: HTMLElement, types: String, fn: Function, context?: Object): this
	  // Adds a listener function (`fn`) to a particular DOM event type of the
	  // element `el`. You can optionally specify the context of the listener
	  // (object the `this` keyword will point to). You can also pass several
	  // space-separated types (e.g. `'click dblclick'`).

	  // @alternative
	  // @function on(el: HTMLElement, eventMap: Object, context?: Object): this
	  // Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	  function on(obj, types, fn, context) {

	  	if (types && typeof types === 'object') {
	  		for (var type in types) {
	  			addOne(obj, type, types[type], fn);
	  		}
	  	} else {
	  		types = splitWords(types);

	  		for (var i = 0, len = types.length; i < len; i++) {
	  			addOne(obj, types[i], fn, context);
	  		}
	  	}

	  	return this;
	  }

	  var eventsKey = '_leaflet_events';

	  // @function off(el: HTMLElement, types: String, fn: Function, context?: Object): this
	  // Removes a previously added listener function.
	  // Note that if you passed a custom context to on, you must pass the same
	  // context to `off` in order to remove the listener.

	  // @alternative
	  // @function off(el: HTMLElement, eventMap: Object, context?: Object): this
	  // Removes a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`

	  // @alternative
	  // @function off(el: HTMLElement, types: String): this
	  // Removes all previously added listeners of given types.

	  // @alternative
	  // @function off(el: HTMLElement): this
	  // Removes all previously added listeners from given HTMLElement
	  function off(obj, types, fn, context) {

	  	if (arguments.length === 1) {
	  		batchRemove(obj);
	  		delete obj[eventsKey];

	  	} else if (types && typeof types === 'object') {
	  		for (var type in types) {
	  			removeOne(obj, type, types[type], fn);
	  		}

	  	} else {
	  		types = splitWords(types);

	  		if (arguments.length === 2) {
	  			batchRemove(obj, function (type) {
	  				return indexOf(types, type) !== -1;
	  			});
	  		} else {
	  			for (var i = 0, len = types.length; i < len; i++) {
	  				removeOne(obj, types[i], fn, context);
	  			}
	  		}
	  	}

	  	return this;
	  }

	  function batchRemove(obj, filterFn) {
	  	for (var id in obj[eventsKey]) {
	  		var type = id.split(/\d/)[0];
	  		if (!filterFn || filterFn(type)) {
	  			removeOne(obj, type, null, null, id);
	  		}
	  	}
	  }

	  var mouseSubst = {
	  	mouseenter: 'mouseover',
	  	mouseleave: 'mouseout',
	  	wheel: !('onwheel' in window) && 'mousewheel'
	  };

	  function addOne(obj, type, fn, context) {
	  	var id = type + stamp(fn) + (context ? '_' + stamp(context) : '');

	  	if (obj[eventsKey] && obj[eventsKey][id]) { return this; }

	  	var handler = function (e) {
	  		return fn.call(context || obj, e || window.event);
	  	};

	  	var originalHandler = handler;

	  	if (!Browser.touchNative && Browser.pointer && type.indexOf('touch') === 0) {
	  		// Needs DomEvent.Pointer.js
	  		handler = addPointerListener(obj, type, handler);

	  	} else if (Browser.touch && (type === 'dblclick')) {
	  		handler = addDoubleTapListener(obj, handler);

	  	} else if ('addEventListener' in obj) {

	  		if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' ||  type === 'mousewheel') {
	  			obj.addEventListener(mouseSubst[type] || type, handler, Browser.passiveEvents ? {passive: false} : false);

	  		} else if (type === 'mouseenter' || type === 'mouseleave') {
	  			handler = function (e) {
	  				e = e || window.event;
	  				if (isExternalTarget(obj, e)) {
	  					originalHandler(e);
	  				}
	  			};
	  			obj.addEventListener(mouseSubst[type], handler, false);

	  		} else {
	  			obj.addEventListener(type, originalHandler, false);
	  		}

	  	} else {
	  		obj.attachEvent('on' + type, handler);
	  	}

	  	obj[eventsKey] = obj[eventsKey] || {};
	  	obj[eventsKey][id] = handler;
	  }

	  function removeOne(obj, type, fn, context, id) {
	  	id = id || type + stamp(fn) + (context ? '_' + stamp(context) : '');
	  	var handler = obj[eventsKey] && obj[eventsKey][id];

	  	if (!handler) { return this; }

	  	if (!Browser.touchNative && Browser.pointer && type.indexOf('touch') === 0) {
	  		removePointerListener(obj, type, handler);

	  	} else if (Browser.touch && (type === 'dblclick')) {
	  		removeDoubleTapListener(obj, handler);

	  	} else if ('removeEventListener' in obj) {

	  		obj.removeEventListener(mouseSubst[type] || type, handler, false);

	  	} else {
	  		obj.detachEvent('on' + type, handler);
	  	}

	  	obj[eventsKey][id] = null;
	  }

	  // @function stopPropagation(ev: DOMEvent): this
	  // Stop the given event from propagation to parent elements. Used inside the listener functions:
	  // ```js
	  // L.DomEvent.on(div, 'click', function (ev) {
	  // 	L.DomEvent.stopPropagation(ev);
	  // });
	  // ```
	  function stopPropagation(e) {

	  	if (e.stopPropagation) {
	  		e.stopPropagation();
	  	} else if (e.originalEvent) {  // In case of Leaflet event.
	  		e.originalEvent._stopped = true;
	  	} else {
	  		e.cancelBubble = true;
	  	}

	  	return this;
	  }

	  // @function disableScrollPropagation(el: HTMLElement): this
	  // Adds `stopPropagation` to the element's `'wheel'` events (plus browser variants).
	  function disableScrollPropagation(el) {
	  	addOne(el, 'wheel', stopPropagation);
	  	return this;
	  }

	  // @function disableClickPropagation(el: HTMLElement): this
	  // Adds `stopPropagation` to the element's `'click'`, `'dblclick'`, `'contextmenu'`,
	  // `'mousedown'` and `'touchstart'` events (plus browser variants).
	  function disableClickPropagation(el) {
	  	on(el, 'mousedown touchstart dblclick contextmenu', stopPropagation);
	  	el['_leaflet_disable_click'] = true;
	  	return this;
	  }

	  // @function preventDefault(ev: DOMEvent): this
	  // Prevents the default action of the DOM Event `ev` from happening (such as
	  // following a link in the href of the a element, or doing a POST request
	  // with page reload when a `<form>` is submitted).
	  // Use it inside listener functions.
	  function preventDefault(e) {
	  	if (e.preventDefault) {
	  		e.preventDefault();
	  	} else {
	  		e.returnValue = false;
	  	}
	  	return this;
	  }

	  // @function stop(ev: DOMEvent): this
	  // Does `stopPropagation` and `preventDefault` at the same time.
	  function stop(e) {
	  	preventDefault(e);
	  	stopPropagation(e);
	  	return this;
	  }

	  // @function getPropagationPath(ev: DOMEvent): Array
	  // Compatibility polyfill for [`Event.composedPath()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath).
	  // Returns an array containing the `HTMLElement`s that the given DOM event
	  // should propagate to (if not stopped).
	  function getPropagationPath(ev) {
	  	if (ev.composedPath) {
	  		return ev.composedPath();
	  	}

	  	var path = [];
	  	var el = ev.target;

	  	while (el) {
	  		path.push(el);
	  		el = el.parentNode;
	  	}
	  	return path;
	  }


	  // @function getMousePosition(ev: DOMEvent, container?: HTMLElement): Point
	  // Gets normalized mouse position from a DOM event relative to the
	  // `container` (border excluded) or to the whole page if not specified.
	  function getMousePosition(e, container) {
	  	if (!container) {
	  		return new Point(e.clientX, e.clientY);
	  	}

	  	var scale = getScale(container),
	  	    offset = scale.boundingClientRect; // left and top  values are in page scale (like the event clientX/Y)

	  	return new Point(
	  		// offset.left/top values are in page scale (like clientX/Y),
	  		// whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
	  		(e.clientX - offset.left) / scale.x - container.clientLeft,
	  		(e.clientY - offset.top) / scale.y - container.clientTop
	  	);
	  }


	  //  except , Safari and
	  // We need double the scroll pixels (see #7403 and #4538) for all Browsers
	  // except OSX (Mac) -> 3x, Chrome running on Linux 1x

	  var wheelPxFactor =
	  	(Browser.linux && Browser.chrome) ? window.devicePixelRatio :
	  	Browser.mac ? window.devicePixelRatio * 3 :
	  	window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
	  // @function getWheelDelta(ev: DOMEvent): Number
	  // Gets normalized wheel delta from a wheel DOM event, in vertical
	  // pixels scrolled (negative if scrolling down).
	  // Events from pointing devices without precise scrolling are mapped to
	  // a best guess of 60 pixels.
	  function getWheelDelta(e) {
	  	return (Browser.edge) ? e.wheelDeltaY / 2 : // Don't trust window-geometry-based delta
	  	       (e.deltaY && e.deltaMode === 0) ? -e.deltaY / wheelPxFactor : // Pixels
	  	       (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 : // Lines
	  	       (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 : // Pages
	  	       (e.deltaX || e.deltaZ) ? 0 :	// Skip horizontal/depth wheel events
	  	       e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : // Legacy IE pixels
	  	       (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 : // Legacy Moz lines
	  	       e.detail ? e.detail / -32765 * 60 : // Legacy Moz pages
	  	       0;
	  }

	  // check if element really left/entered the event target (for mouseenter/mouseleave)
	  function isExternalTarget(el, e) {

	  	var related = e.relatedTarget;

	  	if (!related) { return true; }

	  	try {
	  		while (related && (related !== el)) {
	  			related = related.parentNode;
	  		}
	  	} catch (err) {
	  		return false;
	  	}
	  	return (related !== el);
	  }

	  var DomEvent = {
	    __proto__: null,
	    on: on,
	    off: off,
	    stopPropagation: stopPropagation,
	    disableScrollPropagation: disableScrollPropagation,
	    disableClickPropagation: disableClickPropagation,
	    preventDefault: preventDefault,
	    stop: stop,
	    getPropagationPath: getPropagationPath,
	    getMousePosition: getMousePosition,
	    getWheelDelta: getWheelDelta,
	    isExternalTarget: isExternalTarget,
	    addListener: on,
	    removeListener: off
	  };

	  /*
	   * @class PosAnimation
	   * @aka L.PosAnimation
	   * @inherits Evented
	   * Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.
	   *
	   * @example
	   * ```js
	   * var myPositionMarker = L.marker([48.864716, 2.294694]).addTo(map);
	   *
	   * myPositionMarker.on("click", function() {
	   * 	var pos = map.latLngToLayerPoint(myPositionMarker.getLatLng());
	   * 	pos.y -= 25;
	   * 	var fx = new L.PosAnimation();
	   *
	   * 	fx.once('end',function() {
	   * 		pos.y += 25;
	   * 		fx.run(myPositionMarker._icon, pos, 0.8);
	   * 	});
	   *
	   * 	fx.run(myPositionMarker._icon, pos, 0.3);
	   * });
	   *
	   * ```
	   *
	   * @constructor L.PosAnimation()
	   * Creates a `PosAnimation` object.
	   *
	   */

	  var PosAnimation = Evented.extend({

	  	// @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
	  	// Run an animation of a given element to a new position, optionally setting
	  	// duration in seconds (`0.25` by default) and easing linearity factor (3rd
	  	// argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
	  	// `0.5` by default).
	  	run: function (el, newPos, duration, easeLinearity) {
	  		this.stop();

	  		this._el = el;
	  		this._inProgress = true;
	  		this._duration = duration || 0.25;
	  		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

	  		this._startPos = getPosition(el);
	  		this._offset = newPos.subtract(this._startPos);
	  		this._startTime = +new Date();

	  		// @event start: Event
	  		// Fired when the animation starts
	  		this.fire('start');

	  		this._animate();
	  	},

	  	// @method stop()
	  	// Stops the animation (if currently running).
	  	stop: function () {
	  		if (!this._inProgress) { return; }

	  		this._step(true);
	  		this._complete();
	  	},

	  	_animate: function () {
	  		// animation loop
	  		this._animId = requestAnimFrame(this._animate, this);
	  		this._step();
	  	},

	  	_step: function (round) {
	  		var elapsed = (+new Date()) - this._startTime,
	  		    duration = this._duration * 1000;

	  		if (elapsed < duration) {
	  			this._runFrame(this._easeOut(elapsed / duration), round);
	  		} else {
	  			this._runFrame(1);
	  			this._complete();
	  		}
	  	},

	  	_runFrame: function (progress, round) {
	  		var pos = this._startPos.add(this._offset.multiplyBy(progress));
	  		if (round) {
	  			pos._round();
	  		}
	  		setPosition(this._el, pos);

	  		// @event step: Event
	  		// Fired continuously during the animation.
	  		this.fire('step');
	  	},

	  	_complete: function () {
	  		cancelAnimFrame(this._animId);

	  		this._inProgress = false;
	  		// @event end: Event
	  		// Fired when the animation ends.
	  		this.fire('end');
	  	},

	  	_easeOut: function (t) {
	  		return 1 - Math.pow(1 - t, this._easeOutPower);
	  	}
	  });

	  /*
	   * @class Map
	   * @aka L.Map
	   * @inherits Evented
	   *
	   * The central class of the API — it is used to create a map on a page and manipulate it.
	   *
	   * @example
	   *
	   * ```js
	   * // initialize the map on the "map" div with a given center and zoom
	   * var map = L.map('map', {
	   * 	center: [51.505, -0.09],
	   * 	zoom: 13
	   * });
	   * ```
	   *
	   */

	  var Map = Evented.extend({

	  	options: {
	  		// @section Map State Options
	  		// @option crs: CRS = L.CRS.EPSG3857
	  		// The [Coordinate Reference System](#crs) to use. Don't change this if you're not
	  		// sure what it means.
	  		crs: EPSG3857,

	  		// @option center: LatLng = undefined
	  		// Initial geographic center of the map
	  		center: undefined,

	  		// @option zoom: Number = undefined
	  		// Initial map zoom level
	  		zoom: undefined,

	  		// @option minZoom: Number = *
	  		// Minimum zoom level of the map.
	  		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
	  		// the lowest of their `minZoom` options will be used instead.
	  		minZoom: undefined,

	  		// @option maxZoom: Number = *
	  		// Maximum zoom level of the map.
	  		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
	  		// the highest of their `maxZoom` options will be used instead.
	  		maxZoom: undefined,

	  		// @option layers: Layer[] = []
	  		// Array of layers that will be added to the map initially
	  		layers: [],

	  		// @option maxBounds: LatLngBounds = null
	  		// When this option is set, the map restricts the view to the given
	  		// geographical bounds, bouncing the user back if the user tries to pan
	  		// outside the view. To set the restriction dynamically, use
	  		// [`setMaxBounds`](#map-setmaxbounds) method.
	  		maxBounds: undefined,

	  		// @option renderer: Renderer = *
	  		// The default method for drawing vector layers on the map. `L.SVG`
	  		// or `L.Canvas` by default depending on browser support.
	  		renderer: undefined,


	  		// @section Animation Options
	  		// @option zoomAnimation: Boolean = true
	  		// Whether the map zoom animation is enabled. By default it's enabled
	  		// in all browsers that support CSS3 Transitions except Android.
	  		zoomAnimation: true,

	  		// @option zoomAnimationThreshold: Number = 4
	  		// Won't animate zoom if the zoom difference exceeds this value.
	  		zoomAnimationThreshold: 4,

	  		// @option fadeAnimation: Boolean = true
	  		// Whether the tile fade animation is enabled. By default it's enabled
	  		// in all browsers that support CSS3 Transitions except Android.
	  		fadeAnimation: true,

	  		// @option markerZoomAnimation: Boolean = true
	  		// Whether markers animate their zoom with the zoom animation, if disabled
	  		// they will disappear for the length of the animation. By default it's
	  		// enabled in all browsers that support CSS3 Transitions except Android.
	  		markerZoomAnimation: true,

	  		// @option transform3DLimit: Number = 2^23
	  		// Defines the maximum size of a CSS translation transform. The default
	  		// value should not be changed unless a web browser positions layers in
	  		// the wrong place after doing a large `panBy`.
	  		transform3DLimit: 8388608, // Precision limit of a 32-bit float

	  		// @section Interaction Options
	  		// @option zoomSnap: Number = 1
	  		// Forces the map's zoom level to always be a multiple of this, particularly
	  		// right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
	  		// By default, the zoom level snaps to the nearest integer; lower values
	  		// (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
	  		// means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
	  		zoomSnap: 1,

	  		// @option zoomDelta: Number = 1
	  		// Controls how much the map's zoom level will change after a
	  		// [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
	  		// or `-` on the keyboard, or using the [zoom controls](#control-zoom).
	  		// Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
	  		zoomDelta: 1,

	  		// @option trackResize: Boolean = true
	  		// Whether the map automatically handles browser window resize to update itself.
	  		trackResize: true
	  	},

	  	initialize: function (id, options) { // (HTMLElement or String, Object)
	  		options = setOptions(this, options);

	  		// Make sure to assign internal flags at the beginning,
	  		// to avoid inconsistent state in some edge cases.
	  		this._handlers = [];
	  		this._layers = {};
	  		this._zoomBoundLayers = {};
	  		this._sizeChanged = true;

	  		this._initContainer(id);
	  		this._initLayout();

	  		// hack for https://github.com/Leaflet/Leaflet/issues/1980
	  		this._onResize = bind(this._onResize, this);

	  		this._initEvents();

	  		if (options.maxBounds) {
	  			this.setMaxBounds(options.maxBounds);
	  		}

	  		if (options.zoom !== undefined) {
	  			this._zoom = this._limitZoom(options.zoom);
	  		}

	  		if (options.center && options.zoom !== undefined) {
	  			this.setView(toLatLng(options.center), options.zoom, {reset: true});
	  		}

	  		this.callInitHooks();

	  		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
	  		this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera &&
	  				this.options.zoomAnimation;

	  		// zoom transitions run with the same duration for all layers, so if one of transitionend events
	  		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
	  		if (this._zoomAnimated) {
	  			this._createAnimProxy();
	  			on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
	  		}

	  		this._addLayers(this.options.layers);
	  	},


	  	// @section Methods for modifying map state

	  	// @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
	  	// Sets the view of the map (geographical center and zoom) with the given
	  	// animation options.
	  	setView: function (center, zoom, options) {

	  		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
	  		center = this._limitCenter(toLatLng(center), zoom, this.options.maxBounds);
	  		options = options || {};

	  		this._stop();

	  		if (this._loaded && !options.reset && options !== true) {

	  			if (options.animate !== undefined) {
	  				options.zoom = extend({animate: options.animate}, options.zoom);
	  				options.pan = extend({animate: options.animate, duration: options.duration}, options.pan);
	  			}

	  			// try animating pan or zoom
	  			var moved = (this._zoom !== zoom) ?
	  				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
	  				this._tryAnimatedPan(center, options.pan);

	  			if (moved) {
	  				// prevent resize handler call, the view will refresh after animation anyway
	  				clearTimeout(this._sizeTimer);
	  				return this;
	  			}
	  		}

	  		// animation didn't start, just reset the map view
	  		this._resetView(center, zoom, options.pan && options.pan.noMoveStart);

	  		return this;
	  	},

	  	// @method setZoom(zoom: Number, options?: Zoom/pan options): this
	  	// Sets the zoom of the map.
	  	setZoom: function (zoom, options) {
	  		if (!this._loaded) {
	  			this._zoom = zoom;
	  			return this;
	  		}
	  		return this.setView(this.getCenter(), zoom, {zoom: options});
	  	},

	  	// @method zoomIn(delta?: Number, options?: Zoom options): this
	  	// Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
	  	zoomIn: function (delta, options) {
	  		delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
	  		return this.setZoom(this._zoom + delta, options);
	  	},

	  	// @method zoomOut(delta?: Number, options?: Zoom options): this
	  	// Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
	  	zoomOut: function (delta, options) {
	  		delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
	  		return this.setZoom(this._zoom - delta, options);
	  	},

	  	// @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
	  	// Zooms the map while keeping a specified geographical point on the map
	  	// stationary (e.g. used internally for scroll zoom and double-click zoom).
	  	// @alternative
	  	// @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
	  	// Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
	  	setZoomAround: function (latlng, zoom, options) {
	  		var scale = this.getZoomScale(zoom),
	  		    viewHalf = this.getSize().divideBy(2),
	  		    containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng),

	  		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
	  		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

	  		return this.setView(newCenter, zoom, {zoom: options});
	  	},

	  	_getBoundsCenterZoom: function (bounds, options) {

	  		options = options || {};
	  		bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);

	  		var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
	  		    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),

	  		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

	  		zoom = (typeof options.maxZoom === 'number') ? Math.min(options.maxZoom, zoom) : zoom;

	  		if (zoom === Infinity) {
	  			return {
	  				center: bounds.getCenter(),
	  				zoom: zoom
	  			};
	  		}

	  		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

	  		    swPoint = this.project(bounds.getSouthWest(), zoom),
	  		    nePoint = this.project(bounds.getNorthEast(), zoom),
	  		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

	  		return {
	  			center: center,
	  			zoom: zoom
	  		};
	  	},

	  	// @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
	  	// Sets a map view that contains the given geographical bounds with the
	  	// maximum zoom level possible.
	  	fitBounds: function (bounds, options) {

	  		bounds = toLatLngBounds(bounds);

	  		if (!bounds.isValid()) {
	  			throw new Error('Bounds are not valid.');
	  		}

	  		var target = this._getBoundsCenterZoom(bounds, options);
	  		return this.setView(target.center, target.zoom, options);
	  	},

	  	// @method fitWorld(options?: fitBounds options): this
	  	// Sets a map view that mostly contains the whole world with the maximum
	  	// zoom level possible.
	  	fitWorld: function (options) {
	  		return this.fitBounds([[-90, -180], [90, 180]], options);
	  	},

	  	// @method panTo(latlng: LatLng, options?: Pan options): this
	  	// Pans the map to a given center.
	  	panTo: function (center, options) { // (LatLng)
	  		return this.setView(center, this._zoom, {pan: options});
	  	},

	  	// @method panBy(offset: Point, options?: Pan options): this
	  	// Pans the map by a given number of pixels (animated).
	  	panBy: function (offset, options) {
	  		offset = toPoint(offset).round();
	  		options = options || {};

	  		if (!offset.x && !offset.y) {
	  			return this.fire('moveend');
	  		}
	  		// If we pan too far, Chrome gets issues with tiles
	  		// and makes them disappear or appear in the wrong place (slightly offset) #2602
	  		if (options.animate !== true && !this.getSize().contains(offset)) {
	  			this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
	  			return this;
	  		}

	  		if (!this._panAnim) {
	  			this._panAnim = new PosAnimation();

	  			this._panAnim.on({
	  				'step': this._onPanTransitionStep,
	  				'end': this._onPanTransitionEnd
	  			}, this);
	  		}

	  		// don't fire movestart if animating inertia
	  		if (!options.noMoveStart) {
	  			this.fire('movestart');
	  		}

	  		// animate pan unless animate: false specified
	  		if (options.animate !== false) {
	  			addClass(this._mapPane, 'leaflet-pan-anim');

	  			var newPos = this._getMapPanePos().subtract(offset).round();
	  			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
	  		} else {
	  			this._rawPanBy(offset);
	  			this.fire('move').fire('moveend');
	  		}

	  		return this;
	  	},

	  	// @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
	  	// Sets the view of the map (geographical center and zoom) performing a smooth
	  	// pan-zoom animation.
	  	flyTo: function (targetCenter, targetZoom, options) {

	  		options = options || {};
	  		if (options.animate === false || !Browser.any3d) {
	  			return this.setView(targetCenter, targetZoom, options);
	  		}

	  		this._stop();

	  		var from = this.project(this.getCenter()),
	  		    to = this.project(targetCenter),
	  		    size = this.getSize(),
	  		    startZoom = this._zoom;

	  		targetCenter = toLatLng(targetCenter);
	  		targetZoom = targetZoom === undefined ? startZoom : targetZoom;

	  		var w0 = Math.max(size.x, size.y),
	  		    w1 = w0 * this.getZoomScale(startZoom, targetZoom),
	  		    u1 = (to.distanceTo(from)) || 1,
	  		    rho = 1.42,
	  		    rho2 = rho * rho;

	  		function r(i) {
	  			var s1 = i ? -1 : 1,
	  			    s2 = i ? w1 : w0,
	  			    t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1,
	  			    b1 = 2 * s2 * rho2 * u1,
	  			    b = t1 / b1,
	  			    sq = Math.sqrt(b * b + 1) - b;

	  			    // workaround for floating point precision bug when sq = 0, log = -Infinite,
	  			    // thus triggering an infinite loop in flyTo
	  			    var log = sq < 0.000000001 ? -18 : Math.log(sq);

	  			return log;
	  		}

	  		function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
	  		function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
	  		function tanh(n) { return sinh(n) / cosh(n); }

	  		var r0 = r(0);

	  		function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
	  		function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }

	  		function easeOut(t) { return 1 - Math.pow(1 - t, 1.5); }

	  		var start = Date.now(),
	  		    S = (r(1) - r0) / rho,
	  		    duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;

	  		function frame() {
	  			var t = (Date.now() - start) / duration,
	  			    s = easeOut(t) * S;

	  			if (t <= 1) {
	  				this._flyToFrame = requestAnimFrame(frame, this);

	  				this._move(
	  					this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
	  					this.getScaleZoom(w0 / w(s), startZoom),
	  					{flyTo: true});

	  			} else {
	  				this
	  					._move(targetCenter, targetZoom)
	  					._moveEnd(true);
	  			}
	  		}

	  		this._moveStart(true, options.noMoveStart);

	  		frame.call(this);
	  		return this;
	  	},

	  	// @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
	  	// Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
	  	// but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
	  	flyToBounds: function (bounds, options) {
	  		var target = this._getBoundsCenterZoom(bounds, options);
	  		return this.flyTo(target.center, target.zoom, options);
	  	},

	  	// @method setMaxBounds(bounds: LatLngBounds): this
	  	// Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
	  	setMaxBounds: function (bounds) {
	  		bounds = toLatLngBounds(bounds);

	  		if (this.listens('moveend', this._panInsideMaxBounds)) {
	  			this.off('moveend', this._panInsideMaxBounds);
	  		}

	  		if (!bounds.isValid()) {
	  			this.options.maxBounds = null;
	  			return this;
	  		}

	  		this.options.maxBounds = bounds;

	  		if (this._loaded) {
	  			this._panInsideMaxBounds();
	  		}

	  		return this.on('moveend', this._panInsideMaxBounds);
	  	},

	  	// @method setMinZoom(zoom: Number): this
	  	// Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
	  	setMinZoom: function (zoom) {
	  		var oldZoom = this.options.minZoom;
	  		this.options.minZoom = zoom;

	  		if (this._loaded && oldZoom !== zoom) {
	  			this.fire('zoomlevelschange');

	  			if (this.getZoom() < this.options.minZoom) {
	  				return this.setZoom(zoom);
	  			}
	  		}

	  		return this;
	  	},

	  	// @method setMaxZoom(zoom: Number): this
	  	// Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
	  	setMaxZoom: function (zoom) {
	  		var oldZoom = this.options.maxZoom;
	  		this.options.maxZoom = zoom;

	  		if (this._loaded && oldZoom !== zoom) {
	  			this.fire('zoomlevelschange');

	  			if (this.getZoom() > this.options.maxZoom) {
	  				return this.setZoom(zoom);
	  			}
	  		}

	  		return this;
	  	},

	  	// @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
	  	// Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
	  	panInsideBounds: function (bounds, options) {
	  		this._enforcingBounds = true;
	  		var center = this.getCenter(),
	  		    newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));

	  		if (!center.equals(newCenter)) {
	  			this.panTo(newCenter, options);
	  		}

	  		this._enforcingBounds = false;
	  		return this;
	  	},

	  	// @method panInside(latlng: LatLng, options?: padding options): this
	  	// Pans the map the minimum amount to make the `latlng` visible. Use
	  	// padding options to fit the display to more restricted bounds.
	  	// If `latlng` is already within the (optionally padded) display bounds,
	  	// the map will not be panned.
	  	panInside: function (latlng, options) {
	  		options = options || {};

	  		var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
	  		    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),
	  		    pixelCenter = this.project(this.getCenter()),
	  		    pixelPoint = this.project(latlng),
	  		    pixelBounds = this.getPixelBounds(),
	  		    paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]),
	  		    paddedSize = paddedBounds.getSize();

	  		if (!paddedBounds.contains(pixelPoint)) {
	  			this._enforcingBounds = true;
	  			var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
	  			var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
	  			pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
	  			pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
	  			this.panTo(this.unproject(pixelCenter), options);
	  			this._enforcingBounds = false;
	  		}
	  		return this;
	  	},

	  	// @method invalidateSize(options: Zoom/pan options): this
	  	// Checks if the map container size changed and updates the map if so —
	  	// call it after you've changed the map size dynamically, also animating
	  	// pan by default. If `options.pan` is `false`, panning will not occur.
	  	// If `options.debounceMoveend` is `true`, it will delay `moveend` event so
	  	// that it doesn't happen often even if the method is called many
	  	// times in a row.

	  	// @alternative
	  	// @method invalidateSize(animate: Boolean): this
	  	// Checks if the map container size changed and updates the map if so —
	  	// call it after you've changed the map size dynamically, also animating
	  	// pan by default.
	  	invalidateSize: function (options) {
	  		if (!this._loaded) { return this; }

	  		options = extend({
	  			animate: false,
	  			pan: true
	  		}, options === true ? {animate: true} : options);

	  		var oldSize = this.getSize();
	  		this._sizeChanged = true;
	  		this._lastCenter = null;

	  		var newSize = this.getSize(),
	  		    oldCenter = oldSize.divideBy(2).round(),
	  		    newCenter = newSize.divideBy(2).round(),
	  		    offset = oldCenter.subtract(newCenter);

	  		if (!offset.x && !offset.y) { return this; }

	  		if (options.animate && options.pan) {
	  			this.panBy(offset);

	  		} else {
	  			if (options.pan) {
	  				this._rawPanBy(offset);
	  			}

	  			this.fire('move');

	  			if (options.debounceMoveend) {
	  				clearTimeout(this._sizeTimer);
	  				this._sizeTimer = setTimeout(bind(this.fire, this, 'moveend'), 200);
	  			} else {
	  				this.fire('moveend');
	  			}
	  		}

	  		// @section Map state change events
	  		// @event resize: ResizeEvent
	  		// Fired when the map is resized.
	  		return this.fire('resize', {
	  			oldSize: oldSize,
	  			newSize: newSize
	  		});
	  	},

	  	// @section Methods for modifying map state
	  	// @method stop(): this
	  	// Stops the currently running `panTo` or `flyTo` animation, if any.
	  	stop: function () {
	  		this.setZoom(this._limitZoom(this._zoom));
	  		if (!this.options.zoomSnap) {
	  			this.fire('viewreset');
	  		}
	  		return this._stop();
	  	},

	  	// @section Geolocation methods
	  	// @method locate(options?: Locate options): this
	  	// Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
	  	// event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
	  	// and optionally sets the map view to the user's location with respect to
	  	// detection accuracy (or to the world view if geolocation failed).
	  	// Note that, if your page doesn't use HTTPS, this method will fail in
	  	// modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
	  	// See `Locate options` for more details.
	  	locate: function (options) {

	  		options = this._locateOptions = extend({
	  			timeout: 10000,
	  			watch: false
	  			// setView: false
	  			// maxZoom: <Number>
	  			// maximumAge: 0
	  			// enableHighAccuracy: false
	  		}, options);

	  		if (!('geolocation' in navigator)) {
	  			this._handleGeolocationError({
	  				code: 0,
	  				message: 'Geolocation not supported.'
	  			});
	  			return this;
	  		}

	  		var onResponse = bind(this._handleGeolocationResponse, this),
	  		    onError = bind(this._handleGeolocationError, this);

	  		if (options.watch) {
	  			this._locationWatchId =
	  			        navigator.geolocation.watchPosition(onResponse, onError, options);
	  		} else {
	  			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
	  		}
	  		return this;
	  	},

	  	// @method stopLocate(): this
	  	// Stops watching location previously initiated by `map.locate({watch: true})`
	  	// and aborts resetting the map view if map.locate was called with
	  	// `{setView: true}`.
	  	stopLocate: function () {
	  		if (navigator.geolocation && navigator.geolocation.clearWatch) {
	  			navigator.geolocation.clearWatch(this._locationWatchId);
	  		}
	  		if (this._locateOptions) {
	  			this._locateOptions.setView = false;
	  		}
	  		return this;
	  	},

	  	_handleGeolocationError: function (error) {
	  		if (!this._container._leaflet_id) { return; }

	  		var c = error.code,
	  		    message = error.message ||
	  		            (c === 1 ? 'permission denied' :
	  		            (c === 2 ? 'position unavailable' : 'timeout'));

	  		if (this._locateOptions.setView && !this._loaded) {
	  			this.fitWorld();
	  		}

	  		// @section Location events
	  		// @event locationerror: ErrorEvent
	  		// Fired when geolocation (using the [`locate`](#map-locate) method) failed.
	  		this.fire('locationerror', {
	  			code: c,
	  			message: 'Geolocation error: ' + message + '.'
	  		});
	  	},

	  	_handleGeolocationResponse: function (pos) {
	  		if (!this._container._leaflet_id) { return; }

	  		var lat = pos.coords.latitude,
	  		    lng = pos.coords.longitude,
	  		    latlng = new LatLng(lat, lng),
	  		    bounds = latlng.toBounds(pos.coords.accuracy * 2),
	  		    options = this._locateOptions;

	  		if (options.setView) {
	  			var zoom = this.getBoundsZoom(bounds);
	  			this.setView(latlng, options.maxZoom ? Math.min(zoom, options.maxZoom) : zoom);
	  		}

	  		var data = {
	  			latlng: latlng,
	  			bounds: bounds,
	  			timestamp: pos.timestamp
	  		};

	  		for (var i in pos.coords) {
	  			if (typeof pos.coords[i] === 'number') {
	  				data[i] = pos.coords[i];
	  			}
	  		}

	  		// @event locationfound: LocationEvent
	  		// Fired when geolocation (using the [`locate`](#map-locate) method)
	  		// went successfully.
	  		this.fire('locationfound', data);
	  	},

	  	// TODO Appropriate docs section?
	  	// @section Other Methods
	  	// @method addHandler(name: String, HandlerClass: Function): this
	  	// Adds a new `Handler` to the map, given its name and constructor function.
	  	addHandler: function (name, HandlerClass) {
	  		if (!HandlerClass) { return this; }

	  		var handler = this[name] = new HandlerClass(this);

	  		this._handlers.push(handler);

	  		if (this.options[name]) {
	  			handler.enable();
	  		}

	  		return this;
	  	},

	  	// @method remove(): this
	  	// Destroys the map and clears all related event listeners.
	  	remove: function () {

	  		this._initEvents(true);
	  		if (this.options.maxBounds) { this.off('moveend', this._panInsideMaxBounds); }

	  		if (this._containerId !== this._container._leaflet_id) {
	  			throw new Error('Map container is being reused by another instance');
	  		}

	  		try {
	  			// throws error in IE6-8
	  			delete this._container._leaflet_id;
	  			delete this._containerId;
	  		} catch (e) {
	  			/*eslint-disable */
	  			this._container._leaflet_id = undefined;
	  			/* eslint-enable */
	  			this._containerId = undefined;
	  		}

	  		if (this._locationWatchId !== undefined) {
	  			this.stopLocate();
	  		}

	  		this._stop();

	  		remove(this._mapPane);

	  		if (this._clearControlPos) {
	  			this._clearControlPos();
	  		}
	  		if (this._resizeRequest) {
	  			cancelAnimFrame(this._resizeRequest);
	  			this._resizeRequest = null;
	  		}

	  		this._clearHandlers();

	  		if (this._loaded) {
	  			// @section Map state change events
	  			// @event unload: Event
	  			// Fired when the map is destroyed with [remove](#map-remove) method.
	  			this.fire('unload');
	  		}

	  		var i;
	  		for (i in this._layers) {
	  			this._layers[i].remove();
	  		}
	  		for (i in this._panes) {
	  			remove(this._panes[i]);
	  		}

	  		this._layers = [];
	  		this._panes = [];
	  		delete this._mapPane;
	  		delete this._renderer;

	  		return this;
	  	},

	  	// @section Other Methods
	  	// @method createPane(name: String, container?: HTMLElement): HTMLElement
	  	// Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
	  	// then returns it. The pane is created as a child of `container`, or
	  	// as a child of the main map pane if not set.
	  	createPane: function (name, container) {
	  		var className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''),
	  		    pane = create$1('div', className, container || this._mapPane);

	  		if (name) {
	  			this._panes[name] = pane;
	  		}
	  		return pane;
	  	},

	  	// @section Methods for Getting Map State

	  	// @method getCenter(): LatLng
	  	// Returns the geographical center of the map view
	  	getCenter: function () {
	  		this._checkIfLoaded();

	  		if (this._lastCenter && !this._moved()) {
	  			return this._lastCenter.clone();
	  		}
	  		return this.layerPointToLatLng(this._getCenterLayerPoint());
	  	},

	  	// @method getZoom(): Number
	  	// Returns the current zoom level of the map view
	  	getZoom: function () {
	  		return this._zoom;
	  	},

	  	// @method getBounds(): LatLngBounds
	  	// Returns the geographical bounds visible in the current map view
	  	getBounds: function () {
	  		var bounds = this.getPixelBounds(),
	  		    sw = this.unproject(bounds.getBottomLeft()),
	  		    ne = this.unproject(bounds.getTopRight());

	  		return new LatLngBounds(sw, ne);
	  	},

	  	// @method getMinZoom(): Number
	  	// Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
	  	getMinZoom: function () {
	  		return this.options.minZoom === undefined ? this._layersMinZoom || 0 : this.options.minZoom;
	  	},

	  	// @method getMaxZoom(): Number
	  	// Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
	  	getMaxZoom: function () {
	  		return this.options.maxZoom === undefined ?
	  			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
	  			this.options.maxZoom;
	  	},

	  	// @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
	  	// Returns the maximum zoom level on which the given bounds fit to the map
	  	// view in its entirety. If `inside` (optional) is set to `true`, the method
	  	// instead returns the minimum zoom level on which the map view fits into
	  	// the given bounds in its entirety.
	  	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
	  		bounds = toLatLngBounds(bounds);
	  		padding = toPoint(padding || [0, 0]);

	  		var zoom = this.getZoom() || 0,
	  		    min = this.getMinZoom(),
	  		    max = this.getMaxZoom(),
	  		    nw = bounds.getNorthWest(),
	  		    se = bounds.getSouthEast(),
	  		    size = this.getSize().subtract(padding),
	  		    boundsSize = toBounds(this.project(se, zoom), this.project(nw, zoom)).getSize(),
	  		    snap = Browser.any3d ? this.options.zoomSnap : 1,
	  		    scalex = size.x / boundsSize.x,
	  		    scaley = size.y / boundsSize.y,
	  		    scale = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);

	  		zoom = this.getScaleZoom(scale, zoom);

	  		if (snap) {
	  			zoom = Math.round(zoom / (snap / 100)) * (snap / 100); // don't jump if within 1% of a snap level
	  			zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
	  		}

	  		return Math.max(min, Math.min(max, zoom));
	  	},

	  	// @method getSize(): Point
	  	// Returns the current size of the map container (in pixels).
	  	getSize: function () {
	  		if (!this._size || this._sizeChanged) {
	  			this._size = new Point(
	  				this._container.clientWidth || 0,
	  				this._container.clientHeight || 0);

	  			this._sizeChanged = false;
	  		}
	  		return this._size.clone();
	  	},

	  	// @method getPixelBounds(): Bounds
	  	// Returns the bounds of the current map view in projected pixel
	  	// coordinates (sometimes useful in layer and overlay implementations).
	  	getPixelBounds: function (center, zoom) {
	  		var topLeftPoint = this._getTopLeftPoint(center, zoom);
	  		return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
	  	},

	  	// TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
	  	// the map pane? "left point of the map layer" can be confusing, specially
	  	// since there can be negative offsets.
	  	// @method getPixelOrigin(): Point
	  	// Returns the projected pixel coordinates of the top left point of
	  	// the map layer (useful in custom layer and overlay implementations).
	  	getPixelOrigin: function () {
	  		this._checkIfLoaded();
	  		return this._pixelOrigin;
	  	},

	  	// @method getPixelWorldBounds(zoom?: Number): Bounds
	  	// Returns the world's bounds in pixel coordinates for zoom level `zoom`.
	  	// If `zoom` is omitted, the map's current zoom level is used.
	  	getPixelWorldBounds: function (zoom) {
	  		return this.options.crs.getProjectedBounds(zoom === undefined ? this.getZoom() : zoom);
	  	},

	  	// @section Other Methods

	  	// @method getPane(pane: String|HTMLElement): HTMLElement
	  	// Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
	  	getPane: function (pane) {
	  		return typeof pane === 'string' ? this._panes[pane] : pane;
	  	},

	  	// @method getPanes(): Object
	  	// Returns a plain object containing the names of all [panes](#map-pane) as keys and
	  	// the panes as values.
	  	getPanes: function () {
	  		return this._panes;
	  	},

	  	// @method getContainer: HTMLElement
	  	// Returns the HTML element that contains the map.
	  	getContainer: function () {
	  		return this._container;
	  	},


	  	// @section Conversion Methods

	  	// @method getZoomScale(toZoom: Number, fromZoom: Number): Number
	  	// Returns the scale factor to be applied to a map transition from zoom level
	  	// `fromZoom` to `toZoom`. Used internally to help with zoom animations.
	  	getZoomScale: function (toZoom, fromZoom) {
	  		// TODO replace with universal implementation after refactoring projections
	  		var crs = this.options.crs;
	  		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
	  		return crs.scale(toZoom) / crs.scale(fromZoom);
	  	},

	  	// @method getScaleZoom(scale: Number, fromZoom: Number): Number
	  	// Returns the zoom level that the map would end up at, if it is at `fromZoom`
	  	// level and everything is scaled by a factor of `scale`. Inverse of
	  	// [`getZoomScale`](#map-getZoomScale).
	  	getScaleZoom: function (scale, fromZoom) {
	  		var crs = this.options.crs;
	  		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
	  		var zoom = crs.zoom(scale * crs.scale(fromZoom));
	  		return isNaN(zoom) ? Infinity : zoom;
	  	},

	  	// @method project(latlng: LatLng, zoom: Number): Point
	  	// Projects a geographical coordinate `LatLng` according to the projection
	  	// of the map's CRS, then scales it according to `zoom` and the CRS's
	  	// `Transformation`. The result is pixel coordinate relative to
	  	// the CRS origin.
	  	project: function (latlng, zoom) {
	  		zoom = zoom === undefined ? this._zoom : zoom;
	  		return this.options.crs.latLngToPoint(toLatLng(latlng), zoom);
	  	},

	  	// @method unproject(point: Point, zoom: Number): LatLng
	  	// Inverse of [`project`](#map-project).
	  	unproject: function (point, zoom) {
	  		zoom = zoom === undefined ? this._zoom : zoom;
	  		return this.options.crs.pointToLatLng(toPoint(point), zoom);
	  	},

	  	// @method layerPointToLatLng(point: Point): LatLng
	  	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
	  	// returns the corresponding geographical coordinate (for the current zoom level).
	  	layerPointToLatLng: function (point) {
	  		var projectedPoint = toPoint(point).add(this.getPixelOrigin());
	  		return this.unproject(projectedPoint);
	  	},

	  	// @method latLngToLayerPoint(latlng: LatLng): Point
	  	// Given a geographical coordinate, returns the corresponding pixel coordinate
	  	// relative to the [origin pixel](#map-getpixelorigin).
	  	latLngToLayerPoint: function (latlng) {
	  		var projectedPoint = this.project(toLatLng(latlng))._round();
	  		return projectedPoint._subtract(this.getPixelOrigin());
	  	},

	  	// @method wrapLatLng(latlng: LatLng): LatLng
	  	// Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
	  	// map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
	  	// CRS's bounds.
	  	// By default this means longitude is wrapped around the dateline so its
	  	// value is between -180 and +180 degrees.
	  	wrapLatLng: function (latlng) {
	  		return this.options.crs.wrapLatLng(toLatLng(latlng));
	  	},

	  	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
	  	// Returns a `LatLngBounds` with the same size as the given one, ensuring that
	  	// its center is within the CRS's bounds.
	  	// By default this means the center longitude is wrapped around the dateline so its
	  	// value is between -180 and +180 degrees, and the majority of the bounds
	  	// overlaps the CRS's bounds.
	  	wrapLatLngBounds: function (latlng) {
	  		return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
	  	},

	  	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
	  	// Returns the distance between two geographical coordinates according to
	  	// the map's CRS. By default this measures distance in meters.
	  	distance: function (latlng1, latlng2) {
	  		return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
	  	},

	  	// @method containerPointToLayerPoint(point: Point): Point
	  	// Given a pixel coordinate relative to the map container, returns the corresponding
	  	// pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
	  	containerPointToLayerPoint: function (point) { // (Point)
	  		return toPoint(point).subtract(this._getMapPanePos());
	  	},

	  	// @method layerPointToContainerPoint(point: Point): Point
	  	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
	  	// returns the corresponding pixel coordinate relative to the map container.
	  	layerPointToContainerPoint: function (point) { // (Point)
	  		return toPoint(point).add(this._getMapPanePos());
	  	},

	  	// @method containerPointToLatLng(point: Point): LatLng
	  	// Given a pixel coordinate relative to the map container, returns
	  	// the corresponding geographical coordinate (for the current zoom level).
	  	containerPointToLatLng: function (point) {
	  		var layerPoint = this.containerPointToLayerPoint(toPoint(point));
	  		return this.layerPointToLatLng(layerPoint);
	  	},

	  	// @method latLngToContainerPoint(latlng: LatLng): Point
	  	// Given a geographical coordinate, returns the corresponding pixel coordinate
	  	// relative to the map container.
	  	latLngToContainerPoint: function (latlng) {
	  		return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
	  	},

	  	// @method mouseEventToContainerPoint(ev: MouseEvent): Point
	  	// Given a MouseEvent object, returns the pixel coordinate relative to the
	  	// map container where the event took place.
	  	mouseEventToContainerPoint: function (e) {
	  		return getMousePosition(e, this._container);
	  	},

	  	// @method mouseEventToLayerPoint(ev: MouseEvent): Point
	  	// Given a MouseEvent object, returns the pixel coordinate relative to
	  	// the [origin pixel](#map-getpixelorigin) where the event took place.
	  	mouseEventToLayerPoint: function (e) {
	  		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	  	},

	  	// @method mouseEventToLatLng(ev: MouseEvent): LatLng
	  	// Given a MouseEvent object, returns geographical coordinate where the
	  	// event took place.
	  	mouseEventToLatLng: function (e) { // (MouseEvent)
	  		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
	  	},


	  	// map initialization methods

	  	_initContainer: function (id) {
	  		var container = this._container = get(id);

	  		if (!container) {
	  			throw new Error('Map container not found.');
	  		} else if (container._leaflet_id) {
	  			throw new Error('Map container is already initialized.');
	  		}

	  		on(container, 'scroll', this._onScroll, this);
	  		this._containerId = stamp(container);
	  	},

	  	_initLayout: function () {
	  		var container = this._container;

	  		this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;

	  		addClass(container, 'leaflet-container' +
	  			(Browser.touch ? ' leaflet-touch' : '') +
	  			(Browser.retina ? ' leaflet-retina' : '') +
	  			(Browser.ielt9 ? ' leaflet-oldie' : '') +
	  			(Browser.safari ? ' leaflet-safari' : '') +
	  			(this._fadeAnimated ? ' leaflet-fade-anim' : ''));

	  		var position = getStyle(container, 'position');

	  		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed' && position !== 'sticky') {
	  			container.style.position = 'relative';
	  		}

	  		this._initPanes();

	  		if (this._initControlPos) {
	  			this._initControlPos();
	  		}
	  	},

	  	_initPanes: function () {
	  		var panes = this._panes = {};
	  		this._paneRenderers = {};

	  		// @section
	  		//
	  		// Panes are DOM elements used to control the ordering of layers on the map. You
	  		// can access panes with [`map.getPane`](#map-getpane) or
	  		// [`map.getPanes`](#map-getpanes) methods. New panes can be created with the
	  		// [`map.createPane`](#map-createpane) method.
	  		//
	  		// Every map has the following default panes that differ only in zIndex.
	  		//
	  		// @pane mapPane: HTMLElement = 'auto'
	  		// Pane that contains all other map panes

	  		this._mapPane = this.createPane('mapPane', this._container);
	  		setPosition(this._mapPane, new Point(0, 0));

	  		// @pane tilePane: HTMLElement = 200
	  		// Pane for `GridLayer`s and `TileLayer`s
	  		this.createPane('tilePane');
	  		// @pane overlayPane: HTMLElement = 400
	  		// Pane for vectors (`Path`s, like `Polyline`s and `Polygon`s), `ImageOverlay`s and `VideoOverlay`s
	  		this.createPane('overlayPane');
	  		// @pane shadowPane: HTMLElement = 500
	  		// Pane for overlay shadows (e.g. `Marker` shadows)
	  		this.createPane('shadowPane');
	  		// @pane markerPane: HTMLElement = 600
	  		// Pane for `Icon`s of `Marker`s
	  		this.createPane('markerPane');
	  		// @pane tooltipPane: HTMLElement = 650
	  		// Pane for `Tooltip`s.
	  		this.createPane('tooltipPane');
	  		// @pane popupPane: HTMLElement = 700
	  		// Pane for `Popup`s.
	  		this.createPane('popupPane');

	  		if (!this.options.markerZoomAnimation) {
	  			addClass(panes.markerPane, 'leaflet-zoom-hide');
	  			addClass(panes.shadowPane, 'leaflet-zoom-hide');
	  		}
	  	},


	  	// private methods that modify map state

	  	// @section Map state change events
	  	_resetView: function (center, zoom, noMoveStart) {
	  		setPosition(this._mapPane, new Point(0, 0));

	  		var loading = !this._loaded;
	  		this._loaded = true;
	  		zoom = this._limitZoom(zoom);

	  		this.fire('viewprereset');

	  		var zoomChanged = this._zoom !== zoom;
	  		this
	  			._moveStart(zoomChanged, noMoveStart)
	  			._move(center, zoom)
	  			._moveEnd(zoomChanged);

	  		// @event viewreset: Event
	  		// Fired when the map needs to redraw its content (this usually happens
	  		// on map zoom or load). Very useful for creating custom overlays.
	  		this.fire('viewreset');

	  		// @event load: Event
	  		// Fired when the map is initialized (when its center and zoom are set
	  		// for the first time).
	  		if (loading) {
	  			this.fire('load');
	  		}
	  	},

	  	_moveStart: function (zoomChanged, noMoveStart) {
	  		// @event zoomstart: Event
	  		// Fired when the map zoom is about to change (e.g. before zoom animation).
	  		// @event movestart: Event
	  		// Fired when the view of the map starts changing (e.g. user starts dragging the map).
	  		if (zoomChanged) {
	  			this.fire('zoomstart');
	  		}
	  		if (!noMoveStart) {
	  			this.fire('movestart');
	  		}
	  		return this;
	  	},

	  	_move: function (center, zoom, data, supressEvent) {
	  		if (zoom === undefined) {
	  			zoom = this._zoom;
	  		}
	  		var zoomChanged = this._zoom !== zoom;

	  		this._zoom = zoom;
	  		this._lastCenter = center;
	  		this._pixelOrigin = this._getNewPixelOrigin(center);

	  		if (!supressEvent) {
	  			// @event zoom: Event
	  			// Fired repeatedly during any change in zoom level,
	  			// including zoom and fly animations.
	  			if (zoomChanged || (data && data.pinch)) {	// Always fire 'zoom' if pinching because #3530
	  				this.fire('zoom', data);
	  			}

	  			// @event move: Event
	  			// Fired repeatedly during any movement of the map,
	  			// including pan and fly animations.
	  			this.fire('move', data);
	  		} else if (data && data.pinch) {	// Always fire 'zoom' if pinching because #3530
	  			this.fire('zoom', data);
	  		}
	  		return this;
	  	},

	  	_moveEnd: function (zoomChanged) {
	  		// @event zoomend: Event
	  		// Fired when the map zoom changed, after any animations.
	  		if (zoomChanged) {
	  			this.fire('zoomend');
	  		}

	  		// @event moveend: Event
	  		// Fired when the center of the map stops changing
	  		// (e.g. user stopped dragging the map or after non-centered zoom).
	  		return this.fire('moveend');
	  	},

	  	_stop: function () {
	  		cancelAnimFrame(this._flyToFrame);
	  		if (this._panAnim) {
	  			this._panAnim.stop();
	  		}
	  		return this;
	  	},

	  	_rawPanBy: function (offset) {
	  		setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
	  	},

	  	_getZoomSpan: function () {
	  		return this.getMaxZoom() - this.getMinZoom();
	  	},

	  	_panInsideMaxBounds: function () {
	  		if (!this._enforcingBounds) {
	  			this.panInsideBounds(this.options.maxBounds);
	  		}
	  	},

	  	_checkIfLoaded: function () {
	  		if (!this._loaded) {
	  			throw new Error('Set map center and zoom first.');
	  		}
	  	},

	  	// DOM event handling

	  	// @section Interaction events
	  	_initEvents: function (remove) {
	  		this._targets = {};
	  		this._targets[stamp(this._container)] = this;

	  		var onOff = remove ? off : on;

	  		// @event click: MouseEvent
	  		// Fired when the user clicks (or taps) the map.
	  		// @event dblclick: MouseEvent
	  		// Fired when the user double-clicks (or double-taps) the map.
	  		// @event mousedown: MouseEvent
	  		// Fired when the user pushes the mouse button on the map.
	  		// @event mouseup: MouseEvent
	  		// Fired when the user releases the mouse button on the map.
	  		// @event mouseover: MouseEvent
	  		// Fired when the mouse enters the map.
	  		// @event mouseout: MouseEvent
	  		// Fired when the mouse leaves the map.
	  		// @event mousemove: MouseEvent
	  		// Fired while the mouse moves over the map.
	  		// @event contextmenu: MouseEvent
	  		// Fired when the user pushes the right mouse button on the map, prevents
	  		// default browser context menu from showing if there are listeners on
	  		// this event. Also fired on mobile when the user holds a single touch
	  		// for a second (also called long press).
	  		// @event keypress: KeyboardEvent
	  		// Fired when the user presses a key from the keyboard that produces a character value while the map is focused.
	  		// @event keydown: KeyboardEvent
	  		// Fired when the user presses a key from the keyboard while the map is focused. Unlike the `keypress` event,
	  		// the `keydown` event is fired for keys that produce a character value and for keys
	  		// that do not produce a character value.
	  		// @event keyup: KeyboardEvent
	  		// Fired when the user releases a key from the keyboard while the map is focused.
	  		onOff(this._container, 'click dblclick mousedown mouseup ' +
	  			'mouseover mouseout mousemove contextmenu keypress keydown keyup', this._handleDOMEvent, this);

	  		if (this.options.trackResize) {
	  			onOff(window, 'resize', this._onResize, this);
	  		}

	  		if (Browser.any3d && this.options.transform3DLimit) {
	  			(remove ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
	  		}
	  	},

	  	_onResize: function () {
	  		cancelAnimFrame(this._resizeRequest);
	  		this._resizeRequest = requestAnimFrame(
	  		        function () { this.invalidateSize({debounceMoveend: true}); }, this);
	  	},

	  	_onScroll: function () {
	  		this._container.scrollTop  = 0;
	  		this._container.scrollLeft = 0;
	  	},

	  	_onMoveEnd: function () {
	  		var pos = this._getMapPanePos();
	  		if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
	  			// https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
	  			// a pixel offset on very high values, see: https://jsfiddle.net/dg6r5hhb/
	  			this._resetView(this.getCenter(), this.getZoom());
	  		}
	  	},

	  	_findEventTargets: function (e, type) {
	  		var targets = [],
	  		    target,
	  		    isHover = type === 'mouseout' || type === 'mouseover',
	  		    src = e.target || e.srcElement,
	  		    dragging = false;

	  		while (src) {
	  			target = this._targets[stamp(src)];
	  			if (target && (type === 'click' || type === 'preclick') && this._draggableMoved(target)) {
	  				// Prevent firing click after you just dragged an object.
	  				dragging = true;
	  				break;
	  			}
	  			if (target && target.listens(type, true)) {
	  				if (isHover && !isExternalTarget(src, e)) { break; }
	  				targets.push(target);
	  				if (isHover) { break; }
	  			}
	  			if (src === this._container) { break; }
	  			src = src.parentNode;
	  		}
	  		if (!targets.length && !dragging && !isHover && this.listens(type, true)) {
	  			targets = [this];
	  		}
	  		return targets;
	  	},

	  	_isClickDisabled: function (el) {
	  		while (el && el !== this._container) {
	  			if (el['_leaflet_disable_click']) { return true; }
	  			el = el.parentNode;
	  		}
	  	},

	  	_handleDOMEvent: function (e) {
	  		var el = (e.target || e.srcElement);
	  		if (!this._loaded || el['_leaflet_disable_events'] || e.type === 'click' && this._isClickDisabled(el)) {
	  			return;
	  		}

	  		var type = e.type;

	  		if (type === 'mousedown') {
	  			// prevents outline when clicking on keyboard-focusable element
	  			preventOutline(el);
	  		}

	  		this._fireDOMEvent(e, type);
	  	},

	  	_mouseEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'],

	  	_fireDOMEvent: function (e, type, canvasTargets) {

	  		if (e.type === 'click') {
	  			// Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
	  			// @event preclick: MouseEvent
	  			// Fired before mouse click on the map (sometimes useful when you
	  			// want something to happen on click before any existing click
	  			// handlers start running).
	  			var synth = extend({}, e);
	  			synth.type = 'preclick';
	  			this._fireDOMEvent(synth, synth.type, canvasTargets);
	  		}

	  		// Find the layer the event is propagating from and its parents.
	  		var targets = this._findEventTargets(e, type);

	  		if (canvasTargets) {
	  			var filtered = []; // pick only targets with listeners
	  			for (var i = 0; i < canvasTargets.length; i++) {
	  				if (canvasTargets[i].listens(type, true)) {
	  					filtered.push(canvasTargets[i]);
	  				}
	  			}
	  			targets = filtered.concat(targets);
	  		}

	  		if (!targets.length) { return; }

	  		if (type === 'contextmenu') {
	  			preventDefault(e);
	  		}

	  		var target = targets[0];
	  		var data = {
	  			originalEvent: e
	  		};

	  		if (e.type !== 'keypress' && e.type !== 'keydown' && e.type !== 'keyup') {
	  			var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
	  			data.containerPoint = isMarker ?
	  				this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
	  			data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
	  			data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
	  		}

	  		for (i = 0; i < targets.length; i++) {
	  			targets[i].fire(type, data, true);
	  			if (data.originalEvent._stopped ||
	  				(targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1)) { return; }
	  		}
	  	},

	  	_draggableMoved: function (obj) {
	  		obj = obj.dragging && obj.dragging.enabled() ? obj : this;
	  		return (obj.dragging && obj.dragging.moved()) || (this.boxZoom && this.boxZoom.moved());
	  	},

	  	_clearHandlers: function () {
	  		for (var i = 0, len = this._handlers.length; i < len; i++) {
	  			this._handlers[i].disable();
	  		}
	  	},

	  	// @section Other Methods

	  	// @method whenReady(fn: Function, context?: Object): this
	  	// Runs the given function `fn` when the map gets initialized with
	  	// a view (center and zoom) and at least one layer, or immediately
	  	// if it's already initialized, optionally passing a function context.
	  	whenReady: function (callback, context) {
	  		if (this._loaded) {
	  			callback.call(context || this, {target: this});
	  		} else {
	  			this.on('load', callback, context);
	  		}
	  		return this;
	  	},


	  	// private methods for getting map state

	  	_getMapPanePos: function () {
	  		return getPosition(this._mapPane) || new Point(0, 0);
	  	},

	  	_moved: function () {
	  		var pos = this._getMapPanePos();
	  		return pos && !pos.equals([0, 0]);
	  	},

	  	_getTopLeftPoint: function (center, zoom) {
	  		var pixelOrigin = center && zoom !== undefined ?
	  			this._getNewPixelOrigin(center, zoom) :
	  			this.getPixelOrigin();
	  		return pixelOrigin.subtract(this._getMapPanePos());
	  	},

	  	_getNewPixelOrigin: function (center, zoom) {
	  		var viewHalf = this.getSize()._divideBy(2);
	  		return this.project(center, zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
	  	},

	  	_latLngToNewLayerPoint: function (latlng, zoom, center) {
	  		var topLeft = this._getNewPixelOrigin(center, zoom);
	  		return this.project(latlng, zoom)._subtract(topLeft);
	  	},

	  	_latLngBoundsToNewLayerBounds: function (latLngBounds, zoom, center) {
	  		var topLeft = this._getNewPixelOrigin(center, zoom);
	  		return toBounds([
	  			this.project(latLngBounds.getSouthWest(), zoom)._subtract(topLeft),
	  			this.project(latLngBounds.getNorthWest(), zoom)._subtract(topLeft),
	  			this.project(latLngBounds.getSouthEast(), zoom)._subtract(topLeft),
	  			this.project(latLngBounds.getNorthEast(), zoom)._subtract(topLeft)
	  		]);
	  	},

	  	// layer point of the current center
	  	_getCenterLayerPoint: function () {
	  		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	  	},

	  	// offset of the specified place to the current center in pixels
	  	_getCenterOffset: function (latlng) {
	  		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
	  	},

	  	// adjust center for view to get inside bounds
	  	_limitCenter: function (center, zoom, bounds) {

	  		if (!bounds) { return center; }

	  		var centerPoint = this.project(center, zoom),
	  		    viewHalf = this.getSize().divideBy(2),
	  		    viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
	  		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

	  		// If offset is less than a pixel, ignore.
	  		// This prevents unstable projections from getting into
	  		// an infinite loop of tiny offsets.
	  		if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) {
	  			return center;
	  		}

	  		return this.unproject(centerPoint.add(offset), zoom);
	  	},

	  	// adjust offset for view to get inside bounds
	  	_limitOffset: function (offset, bounds) {
	  		if (!bounds) { return offset; }

	  		var viewBounds = this.getPixelBounds(),
	  		    newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

	  		return offset.add(this._getBoundsOffset(newBounds, bounds));
	  	},

	  	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
	  	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
	  		var projectedMaxBounds = toBounds(
	  		        this.project(maxBounds.getNorthEast(), zoom),
	  		        this.project(maxBounds.getSouthWest(), zoom)
	  		    ),
	  		    minOffset = projectedMaxBounds.min.subtract(pxBounds.min),
	  		    maxOffset = projectedMaxBounds.max.subtract(pxBounds.max),

	  		    dx = this._rebound(minOffset.x, -maxOffset.x),
	  		    dy = this._rebound(minOffset.y, -maxOffset.y);

	  		return new Point(dx, dy);
	  	},

	  	_rebound: function (left, right) {
	  		return left + right > 0 ?
	  			Math.round(left - right) / 2 :
	  			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
	  	},

	  	_limitZoom: function (zoom) {
	  		var min = this.getMinZoom(),
	  		    max = this.getMaxZoom(),
	  		    snap = Browser.any3d ? this.options.zoomSnap : 1;
	  		if (snap) {
	  			zoom = Math.round(zoom / snap) * snap;
	  		}
	  		return Math.max(min, Math.min(max, zoom));
	  	},

	  	_onPanTransitionStep: function () {
	  		this.fire('move');
	  	},

	  	_onPanTransitionEnd: function () {
	  		removeClass(this._mapPane, 'leaflet-pan-anim');
	  		this.fire('moveend');
	  	},

	  	_tryAnimatedPan: function (center, options) {
	  		// difference between the new and current centers in pixels
	  		var offset = this._getCenterOffset(center)._trunc();

	  		// don't animate too far unless animate: true specified in options
	  		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

	  		this.panBy(offset, options);

	  		return true;
	  	},

	  	_createAnimProxy: function () {

	  		var proxy = this._proxy = create$1('div', 'leaflet-proxy leaflet-zoom-animated');
	  		this._panes.mapPane.appendChild(proxy);

	  		this.on('zoomanim', function (e) {
	  			var prop = TRANSFORM,
	  			    transform = this._proxy.style[prop];

	  			setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));

	  			// workaround for case when transform is the same and so transitionend event is not fired
	  			if (transform === this._proxy.style[prop] && this._animatingZoom) {
	  				this._onZoomTransitionEnd();
	  			}
	  		}, this);

	  		this.on('load moveend', this._animMoveEnd, this);

	  		this._on('unload', this._destroyAnimProxy, this);
	  	},

	  	_destroyAnimProxy: function () {
	  		remove(this._proxy);
	  		this.off('load moveend', this._animMoveEnd, this);
	  		delete this._proxy;
	  	},

	  	_animMoveEnd: function () {
	  		var c = this.getCenter(),
	  		    z = this.getZoom();
	  		setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
	  	},

	  	_catchTransitionEnd: function (e) {
	  		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
	  			this._onZoomTransitionEnd();
	  		}
	  	},

	  	_nothingToAnimate: function () {
	  		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
	  	},

	  	_tryAnimatedZoom: function (center, zoom, options) {

	  		if (this._animatingZoom) { return true; }

	  		options = options || {};

	  		// don't animate if disabled, not supported or zoom difference is too large
	  		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
	  		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

	  		// offset is the pixel coords of the zoom origin relative to the current center
	  		var scale = this.getZoomScale(zoom),
	  		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);

	  		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
	  		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

	  		requestAnimFrame(function () {
	  			this
	  			    ._moveStart(true, options.noMoveStart || false)
	  			    ._animateZoom(center, zoom, true);
	  		}, this);

	  		return true;
	  	},

	  	_animateZoom: function (center, zoom, startAnim, noUpdate) {
	  		if (!this._mapPane) { return; }

	  		if (startAnim) {
	  			this._animatingZoom = true;

	  			// remember what center/zoom to set after animation
	  			this._animateToCenter = center;
	  			this._animateToZoom = zoom;

	  			addClass(this._mapPane, 'leaflet-zoom-anim');
	  		}

	  		// @section Other Events
	  		// @event zoomanim: ZoomAnimEvent
	  		// Fired at least once per zoom animation. For continuous zoom, like pinch zooming, fired once per frame during zoom.
	  		this.fire('zoomanim', {
	  			center: center,
	  			zoom: zoom,
	  			noUpdate: noUpdate
	  		});

	  		if (!this._tempFireZoomEvent) {
	  			this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
	  		}

	  		this._move(this._animateToCenter, this._animateToZoom, undefined, true);

	  		// Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
	  		setTimeout(bind(this._onZoomTransitionEnd, this), 250);
	  	},

	  	_onZoomTransitionEnd: function () {
	  		if (!this._animatingZoom) { return; }

	  		if (this._mapPane) {
	  			removeClass(this._mapPane, 'leaflet-zoom-anim');
	  		}

	  		this._animatingZoom = false;

	  		this._move(this._animateToCenter, this._animateToZoom, undefined, true);

	  		if (this._tempFireZoomEvent) {
	  			this.fire('zoom');
	  		}
	  		delete this._tempFireZoomEvent;

	  		this.fire('move');

	  		this._moveEnd(true);
	  	}
	  });

	  // @section

	  // @factory L.map(id: String, options?: Map options)
	  // Instantiates a map object given the DOM ID of a `<div>` element
	  // and optionally an object literal with `Map options`.
	  //
	  // @alternative
	  // @factory L.map(el: HTMLElement, options?: Map options)
	  // Instantiates a map object given an instance of a `<div>` HTML element
	  // and optionally an object literal with `Map options`.
	  function createMap(id, options) {
	  	return new Map(id, options);
	  }

	  /*
	   * @class Control
	   * @aka L.Control
	   * @inherits Class
	   *
	   * L.Control is a base class for implementing map controls. Handles positioning.
	   * All other controls extend from this class.
	   */

	  var Control = Class.extend({
	  	// @section
	  	// @aka Control Options
	  	options: {
	  		// @option position: String = 'topright'
	  		// The position of the control (one of the map corners). Possible values are `'topleft'`,
	  		// `'topright'`, `'bottomleft'` or `'bottomright'`
	  		position: 'topright'
	  	},

	  	initialize: function (options) {
	  		setOptions(this, options);
	  	},

	  	/* @section
	  	 * Classes extending L.Control will inherit the following methods:
	  	 *
	  	 * @method getPosition: string
	  	 * Returns the position of the control.
	  	 */
	  	getPosition: function () {
	  		return this.options.position;
	  	},

	  	// @method setPosition(position: string): this
	  	// Sets the position of the control.
	  	setPosition: function (position) {
	  		var map = this._map;

	  		if (map) {
	  			map.removeControl(this);
	  		}

	  		this.options.position = position;

	  		if (map) {
	  			map.addControl(this);
	  		}

	  		return this;
	  	},

	  	// @method getContainer: HTMLElement
	  	// Returns the HTMLElement that contains the control.
	  	getContainer: function () {
	  		return this._container;
	  	},

	  	// @method addTo(map: Map): this
	  	// Adds the control to the given map.
	  	addTo: function (map) {
	  		this.remove();
	  		this._map = map;

	  		var container = this._container = this.onAdd(map),
	  		    pos = this.getPosition(),
	  		    corner = map._controlCorners[pos];

	  		addClass(container, 'leaflet-control');

	  		if (pos.indexOf('bottom') !== -1) {
	  			corner.insertBefore(container, corner.firstChild);
	  		} else {
	  			corner.appendChild(container);
	  		}

	  		this._map.on('unload', this.remove, this);

	  		return this;
	  	},

	  	// @method remove: this
	  	// Removes the control from the map it is currently active on.
	  	remove: function () {
	  		if (!this._map) {
	  			return this;
	  		}

	  		remove(this._container);

	  		if (this.onRemove) {
	  			this.onRemove(this._map);
	  		}

	  		this._map.off('unload', this.remove, this);
	  		this._map = null;

	  		return this;
	  	},

	  	_refocusOnMap: function (e) {
	  		// if map exists and event is not a keyboard event
	  		if (this._map && e && e.screenX > 0 && e.screenY > 0) {
	  			this._map.getContainer().focus();
	  		}
	  	}
	  });

	  var control = function (options) {
	  	return new Control(options);
	  };

	  /* @section Extension methods
	   * @uninheritable
	   *
	   * Every control should extend from `L.Control` and (re-)implement the following methods.
	   *
	   * @method onAdd(map: Map): HTMLElement
	   * Should return the container DOM element for the control and add listeners on relevant map events. Called on [`control.addTo(map)`](#control-addTo).
	   *
	   * @method onRemove(map: Map)
	   * Optional method. Should contain all clean up code that removes the listeners previously added in [`onAdd`](#control-onadd). Called on [`control.remove()`](#control-remove).
	   */

	  /* @namespace Map
	   * @section Methods for Layers and Controls
	   */
	  Map.include({
	  	// @method addControl(control: Control): this
	  	// Adds the given control to the map
	  	addControl: function (control) {
	  		control.addTo(this);
	  		return this;
	  	},

	  	// @method removeControl(control: Control): this
	  	// Removes the given control from the map
	  	removeControl: function (control) {
	  		control.remove();
	  		return this;
	  	},

	  	_initControlPos: function () {
	  		var corners = this._controlCorners = {},
	  		    l = 'leaflet-',
	  		    container = this._controlContainer =
	  		            create$1('div', l + 'control-container', this._container);

	  		function createCorner(vSide, hSide) {
	  			var className = l + vSide + ' ' + l + hSide;

	  			corners[vSide + hSide] = create$1('div', className, container);
	  		}

	  		createCorner('top', 'left');
	  		createCorner('top', 'right');
	  		createCorner('bottom', 'left');
	  		createCorner('bottom', 'right');
	  	},

	  	_clearControlPos: function () {
	  		for (var i in this._controlCorners) {
	  			remove(this._controlCorners[i]);
	  		}
	  		remove(this._controlContainer);
	  		delete this._controlCorners;
	  		delete this._controlContainer;
	  	}
	  });

	  /*
	   * @class Control.Layers
	   * @aka L.Control.Layers
	   * @inherits Control
	   *
	   * The layers control gives users the ability to switch between different base layers and switch overlays on/off (check out the [detailed example](https://leafletjs.com/examples/layers-control/)). Extends `Control`.
	   *
	   * @example
	   *
	   * ```js
	   * var baseLayers = {
	   * 	"Mapbox": mapbox,
	   * 	"OpenStreetMap": osm
	   * };
	   *
	   * var overlays = {
	   * 	"Marker": marker,
	   * 	"Roads": roadsLayer
	   * };
	   *
	   * L.control.layers(baseLayers, overlays).addTo(map);
	   * ```
	   *
	   * The `baseLayers` and `overlays` parameters are object literals with layer names as keys and `Layer` objects as values:
	   *
	   * ```js
	   * {
	   *     "<someName1>": layer1,
	   *     "<someName2>": layer2
	   * }
	   * ```
	   *
	   * The layer names can contain HTML, which allows you to add additional styling to the items:
	   *
	   * ```js
	   * {"<img src='my-layer-icon' /> <span class='my-layer-item'>My Layer</span>": myLayer}
	   * ```
	   */

	  var Layers = Control.extend({
	  	// @section
	  	// @aka Control.Layers options
	  	options: {
	  		// @option collapsed: Boolean = true
	  		// If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
	  		collapsed: true,
	  		position: 'topright',

	  		// @option autoZIndex: Boolean = true
	  		// If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
	  		autoZIndex: true,

	  		// @option hideSingleBase: Boolean = false
	  		// If `true`, the base layers in the control will be hidden when there is only one.
	  		hideSingleBase: false,

	  		// @option sortLayers: Boolean = false
	  		// Whether to sort the layers. When `false`, layers will keep the order
	  		// in which they were added to the control.
	  		sortLayers: false,

	  		// @option sortFunction: Function = *
	  		// A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
	  		// that will be used for sorting the layers, when `sortLayers` is `true`.
	  		// The function receives both the `L.Layer` instances and their names, as in
	  		// `sortFunction(layerA, layerB, nameA, nameB)`.
	  		// By default, it sorts layers alphabetically by their name.
	  		sortFunction: function (layerA, layerB, nameA, nameB) {
	  			return nameA < nameB ? -1 : (nameB < nameA ? 1 : 0);
	  		}
	  	},

	  	initialize: function (baseLayers, overlays, options) {
	  		setOptions(this, options);

	  		this._layerControlInputs = [];
	  		this._layers = [];
	  		this._lastZIndex = 0;
	  		this._handlingClick = false;
	  		this._preventClick = false;

	  		for (var i in baseLayers) {
	  			this._addLayer(baseLayers[i], i);
	  		}

	  		for (i in overlays) {
	  			this._addLayer(overlays[i], i, true);
	  		}
	  	},

	  	onAdd: function (map) {
	  		this._initLayout();
	  		this._update();

	  		this._map = map;
	  		map.on('zoomend', this._checkDisabledLayers, this);

	  		for (var i = 0; i < this._layers.length; i++) {
	  			this._layers[i].layer.on('add remove', this._onLayerChange, this);
	  		}

	  		return this._container;
	  	},

	  	addTo: function (map) {
	  		Control.prototype.addTo.call(this, map);
	  		// Trigger expand after Layers Control has been inserted into DOM so that is now has an actual height.
	  		return this._expandIfNotCollapsed();
	  	},

	  	onRemove: function () {
	  		this._map.off('zoomend', this._checkDisabledLayers, this);

	  		for (var i = 0; i < this._layers.length; i++) {
	  			this._layers[i].layer.off('add remove', this._onLayerChange, this);
	  		}
	  	},

	  	// @method addBaseLayer(layer: Layer, name: String): this
	  	// Adds a base layer (radio button entry) with the given name to the control.
	  	addBaseLayer: function (layer, name) {
	  		this._addLayer(layer, name);
	  		return (this._map) ? this._update() : this;
	  	},

	  	// @method addOverlay(layer: Layer, name: String): this
	  	// Adds an overlay (checkbox entry) with the given name to the control.
	  	addOverlay: function (layer, name) {
	  		this._addLayer(layer, name, true);
	  		return (this._map) ? this._update() : this;
	  	},

	  	// @method removeLayer(layer: Layer): this
	  	// Remove the given layer from the control.
	  	removeLayer: function (layer) {
	  		layer.off('add remove', this._onLayerChange, this);

	  		var obj = this._getLayer(stamp(layer));
	  		if (obj) {
	  			this._layers.splice(this._layers.indexOf(obj), 1);
	  		}
	  		return (this._map) ? this._update() : this;
	  	},

	  	// @method expand(): this
	  	// Expand the control container if collapsed.
	  	expand: function () {
	  		addClass(this._container, 'leaflet-control-layers-expanded');
	  		this._section.style.height = null;
	  		var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
	  		if (acceptableHeight < this._section.clientHeight) {
	  			addClass(this._section, 'leaflet-control-layers-scrollbar');
	  			this._section.style.height = acceptableHeight + 'px';
	  		} else {
	  			removeClass(this._section, 'leaflet-control-layers-scrollbar');
	  		}
	  		this._checkDisabledLayers();
	  		return this;
	  	},

	  	// @method collapse(): this
	  	// Collapse the control container if expanded.
	  	collapse: function () {
	  		removeClass(this._container, 'leaflet-control-layers-expanded');
	  		return this;
	  	},

	  	_initLayout: function () {
	  		var className = 'leaflet-control-layers',
	  		    container = this._container = create$1('div', className),
	  		    collapsed = this.options.collapsed;

	  		// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
	  		container.setAttribute('aria-haspopup', true);

	  		disableClickPropagation(container);
	  		disableScrollPropagation(container);

	  		var section = this._section = create$1('section', className + '-list');

	  		if (collapsed) {
	  			this._map.on('click', this.collapse, this);

	  			on(container, {
	  				mouseenter: this._expandSafely,
	  				mouseleave: this.collapse
	  			}, this);
	  		}

	  		var link = this._layersLink = create$1('a', className + '-toggle', container);
	  		link.href = '#';
	  		link.title = 'Layers';
	  		link.setAttribute('role', 'button');

	  		on(link, {
	  			keydown: function (e) {
	  				if (e.keyCode === 13) {
	  					this._expandSafely();
	  				}
	  			},
	  			// Certain screen readers intercept the key event and instead send a click event
	  			click: function (e) {
	  				preventDefault(e);
	  				this._expandSafely();
	  			}
	  		}, this);

	  		if (!collapsed) {
	  			this.expand();
	  		}

	  		this._baseLayersList = create$1('div', className + '-base', section);
	  		this._separator = create$1('div', className + '-separator', section);
	  		this._overlaysList = create$1('div', className + '-overlays', section);

	  		container.appendChild(section);
	  	},

	  	_getLayer: function (id) {
	  		for (var i = 0; i < this._layers.length; i++) {

	  			if (this._layers[i] && stamp(this._layers[i].layer) === id) {
	  				return this._layers[i];
	  			}
	  		}
	  	},

	  	_addLayer: function (layer, name, overlay) {
	  		if (this._map) {
	  			layer.on('add remove', this._onLayerChange, this);
	  		}

	  		this._layers.push({
	  			layer: layer,
	  			name: name,
	  			overlay: overlay
	  		});

	  		if (this.options.sortLayers) {
	  			this._layers.sort(bind(function (a, b) {
	  				return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
	  			}, this));
	  		}

	  		if (this.options.autoZIndex && layer.setZIndex) {
	  			this._lastZIndex++;
	  			layer.setZIndex(this._lastZIndex);
	  		}

	  		this._expandIfNotCollapsed();
	  	},

	  	_update: function () {
	  		if (!this._container) { return this; }

	  		empty(this._baseLayersList);
	  		empty(this._overlaysList);

	  		this._layerControlInputs = [];
	  		var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;

	  		for (i = 0; i < this._layers.length; i++) {
	  			obj = this._layers[i];
	  			this._addItem(obj);
	  			overlaysPresent = overlaysPresent || obj.overlay;
	  			baseLayersPresent = baseLayersPresent || !obj.overlay;
	  			baseLayersCount += !obj.overlay ? 1 : 0;
	  		}

	  		// Hide base layers section if there's only one layer.
	  		if (this.options.hideSingleBase) {
	  			baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
	  			this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
	  		}

	  		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';

	  		return this;
	  	},

	  	_onLayerChange: function (e) {
	  		if (!this._handlingClick) {
	  			this._update();
	  		}

	  		var obj = this._getLayer(stamp(e.target));

	  		// @namespace Map
	  		// @section Layer events
	  		// @event baselayerchange: LayersControlEvent
	  		// Fired when the base layer is changed through the [layers control](#control-layers).
	  		// @event overlayadd: LayersControlEvent
	  		// Fired when an overlay is selected through the [layers control](#control-layers).
	  		// @event overlayremove: LayersControlEvent
	  		// Fired when an overlay is deselected through the [layers control](#control-layers).
	  		// @namespace Control.Layers
	  		var type = obj.overlay ?
	  			(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
	  			(e.type === 'add' ? 'baselayerchange' : null);

	  		if (type) {
	  			this._map.fire(type, obj);
	  		}
	  	},

	  	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
	  	_createRadioElement: function (name, checked) {

	  		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' +
	  				name + '"' + (checked ? ' checked="checked"' : '') + '/>';

	  		var radioFragment = document.createElement('div');
	  		radioFragment.innerHTML = radioHtml;

	  		return radioFragment.firstChild;
	  	},

	  	_addItem: function (obj) {
	  		var label = document.createElement('label'),
	  		    checked = this._map.hasLayer(obj.layer),
	  		    input;

	  		if (obj.overlay) {
	  			input = document.createElement('input');
	  			input.type = 'checkbox';
	  			input.className = 'leaflet-control-layers-selector';
	  			input.defaultChecked = checked;
	  		} else {
	  			input = this._createRadioElement('leaflet-base-layers_' + stamp(this), checked);
	  		}

	  		this._layerControlInputs.push(input);
	  		input.layerId = stamp(obj.layer);

	  		on(input, 'click', this._onInputClick, this);

	  		var name = document.createElement('span');
	  		name.innerHTML = ' ' + obj.name;

	  		// Helps from preventing layer control flicker when checkboxes are disabled
	  		// https://github.com/Leaflet/Leaflet/issues/2771
	  		var holder = document.createElement('span');

	  		label.appendChild(holder);
	  		holder.appendChild(input);
	  		holder.appendChild(name);

	  		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
	  		container.appendChild(label);

	  		this._checkDisabledLayers();
	  		return label;
	  	},

	  	_onInputClick: function () {
	  		// expanding the control on mobile with a click can cause adding a layer - we don't want this
	  		if (this._preventClick) {
	  			return;
	  		}

	  		var inputs = this._layerControlInputs,
	  		    input, layer;
	  		var addedLayers = [],
	  		    removedLayers = [];

	  		this._handlingClick = true;

	  		for (var i = inputs.length - 1; i >= 0; i--) {
	  			input = inputs[i];
	  			layer = this._getLayer(input.layerId).layer;

	  			if (input.checked) {
	  				addedLayers.push(layer);
	  			} else if (!input.checked) {
	  				removedLayers.push(layer);
	  			}
	  		}

	  		// Bugfix issue 2318: Should remove all old layers before readding new ones
	  		for (i = 0; i < removedLayers.length; i++) {
	  			if (this._map.hasLayer(removedLayers[i])) {
	  				this._map.removeLayer(removedLayers[i]);
	  			}
	  		}
	  		for (i = 0; i < addedLayers.length; i++) {
	  			if (!this._map.hasLayer(addedLayers[i])) {
	  				this._map.addLayer(addedLayers[i]);
	  			}
	  		}

	  		this._handlingClick = false;

	  		this._refocusOnMap();
	  	},

	  	_checkDisabledLayers: function () {
	  		var inputs = this._layerControlInputs,
	  		    input,
	  		    layer,
	  		    zoom = this._map.getZoom();

	  		for (var i = inputs.length - 1; i >= 0; i--) {
	  			input = inputs[i];
	  			layer = this._getLayer(input.layerId).layer;
	  			input.disabled = (layer.options.minZoom !== undefined && zoom < layer.options.minZoom) ||
	  			                 (layer.options.maxZoom !== undefined && zoom > layer.options.maxZoom);

	  		}
	  	},

	  	_expandIfNotCollapsed: function () {
	  		if (this._map && !this.options.collapsed) {
	  			this.expand();
	  		}
	  		return this;
	  	},

	  	_expandSafely: function () {
	  		var section = this._section;
	  		this._preventClick = true;
	  		on(section, 'click', preventDefault);
	  		this.expand();
	  		var that = this;
	  		setTimeout(function () {
	  			off(section, 'click', preventDefault);
	  			that._preventClick = false;
	  		});
	  	}

	  });


	  // @factory L.control.layers(baselayers?: Object, overlays?: Object, options?: Control.Layers options)
	  // Creates a layers control with the given layers. Base layers will be switched with radio buttons, while overlays will be switched with checkboxes. Note that all base layers should be passed in the base layers object, but only one should be added to the map during map instantiation.
	  var layers = function (baseLayers, overlays, options) {
	  	return new Layers(baseLayers, overlays, options);
	  };

	  /*
	   * @class Control.Zoom
	   * @aka L.Control.Zoom
	   * @inherits Control
	   *
	   * A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its [`zoomControl` option](#map-zoomcontrol) to `false`. Extends `Control`.
	   */

	  var Zoom = Control.extend({
	  	// @section
	  	// @aka Control.Zoom options
	  	options: {
	  		position: 'topleft',

	  		// @option zoomInText: String = '<span aria-hidden="true">+</span>'
	  		// The text set on the 'zoom in' button.
	  		zoomInText: '<span aria-hidden="true">+</span>',

	  		// @option zoomInTitle: String = 'Zoom in'
	  		// The title set on the 'zoom in' button.
	  		zoomInTitle: 'Zoom in',

	  		// @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
	  		// The text set on the 'zoom out' button.
	  		zoomOutText: '<span aria-hidden="true">&#x2212;</span>',

	  		// @option zoomOutTitle: String = 'Zoom out'
	  		// The title set on the 'zoom out' button.
	  		zoomOutTitle: 'Zoom out'
	  	},

	  	onAdd: function (map) {
	  		var zoomName = 'leaflet-control-zoom',
	  		    container = create$1('div', zoomName + ' leaflet-bar'),
	  		    options = this.options;

	  		this._zoomInButton  = this._createButton(options.zoomInText, options.zoomInTitle,
	  		        zoomName + '-in',  container, this._zoomIn);
	  		this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
	  		        zoomName + '-out', container, this._zoomOut);

	  		this._updateDisabled();
	  		map.on('zoomend zoomlevelschange', this._updateDisabled, this);

	  		return container;
	  	},

	  	onRemove: function (map) {
	  		map.off('zoomend zoomlevelschange', this._updateDisabled, this);
	  	},

	  	disable: function () {
	  		this._disabled = true;
	  		this._updateDisabled();
	  		return this;
	  	},

	  	enable: function () {
	  		this._disabled = false;
	  		this._updateDisabled();
	  		return this;
	  	},

	  	_zoomIn: function (e) {
	  		if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
	  			this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
	  		}
	  	},

	  	_zoomOut: function (e) {
	  		if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
	  			this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
	  		}
	  	},

	  	_createButton: function (html, title, className, container, fn) {
	  		var link = create$1('a', className, container);
	  		link.innerHTML = html;
	  		link.href = '#';
	  		link.title = title;

	  		/*
	  		 * Will force screen readers like VoiceOver to read this as "Zoom in - button"
	  		 */
	  		link.setAttribute('role', 'button');
	  		link.setAttribute('aria-label', title);

	  		disableClickPropagation(link);
	  		on(link, 'click', stop);
	  		on(link, 'click', fn, this);
	  		on(link, 'click', this._refocusOnMap, this);

	  		return link;
	  	},

	  	_updateDisabled: function () {
	  		var map = this._map,
	  		    className = 'leaflet-disabled';

	  		removeClass(this._zoomInButton, className);
	  		removeClass(this._zoomOutButton, className);
	  		this._zoomInButton.setAttribute('aria-disabled', 'false');
	  		this._zoomOutButton.setAttribute('aria-disabled', 'false');

	  		if (this._disabled || map._zoom === map.getMinZoom()) {
	  			addClass(this._zoomOutButton, className);
	  			this._zoomOutButton.setAttribute('aria-disabled', 'true');
	  		}
	  		if (this._disabled || map._zoom === map.getMaxZoom()) {
	  			addClass(this._zoomInButton, className);
	  			this._zoomInButton.setAttribute('aria-disabled', 'true');
	  		}
	  	}
	  });

	  // @namespace Map
	  // @section Control options
	  // @option zoomControl: Boolean = true
	  // Whether a [zoom control](#control-zoom) is added to the map by default.
	  Map.mergeOptions({
	  	zoomControl: true
	  });

	  Map.addInitHook(function () {
	  	if (this.options.zoomControl) {
	  		// @section Controls
	  		// @property zoomControl: Control.Zoom
	  		// The default zoom control (only available if the
	  		// [`zoomControl` option](#map-zoomcontrol) was `true` when creating the map).
	  		this.zoomControl = new Zoom();
	  		this.addControl(this.zoomControl);
	  	}
	  });

	  // @namespace Control.Zoom
	  // @factory L.control.zoom(options: Control.Zoom options)
	  // Creates a zoom control
	  var zoom = function (options) {
	  	return new Zoom(options);
	  };

	  /*
	   * @class Control.Scale
	   * @aka L.Control.Scale
	   * @inherits Control
	   *
	   * A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems. Extends `Control`.
	   *
	   * @example
	   *
	   * ```js
	   * L.control.scale().addTo(map);
	   * ```
	   */

	  var Scale = Control.extend({
	  	// @section
	  	// @aka Control.Scale options
	  	options: {
	  		position: 'bottomleft',

	  		// @option maxWidth: Number = 100
	  		// Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
	  		maxWidth: 100,

	  		// @option metric: Boolean = True
	  		// Whether to show the metric scale line (m/km).
	  		metric: true,

	  		// @option imperial: Boolean = True
	  		// Whether to show the imperial scale line (mi/ft).
	  		imperial: true

	  		// @option updateWhenIdle: Boolean = false
	  		// If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
	  	},

	  	onAdd: function (map) {
	  		var className = 'leaflet-control-scale',
	  		    container = create$1('div', className),
	  		    options = this.options;

	  		this._addScales(options, className + '-line', container);

	  		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	  		map.whenReady(this._update, this);

	  		return container;
	  	},

	  	onRemove: function (map) {
	  		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	  	},

	  	_addScales: function (options, className, container) {
	  		if (options.metric) {
	  			this._mScale = create$1('div', className, container);
	  		}
	  		if (options.imperial) {
	  			this._iScale = create$1('div', className, container);
	  		}
	  	},

	  	_update: function () {
	  		var map = this._map,
	  		    y = map.getSize().y / 2;

	  		var maxMeters = map.distance(
	  			map.containerPointToLatLng([0, y]),
	  			map.containerPointToLatLng([this.options.maxWidth, y]));

	  		this._updateScales(maxMeters);
	  	},

	  	_updateScales: function (maxMeters) {
	  		if (this.options.metric && maxMeters) {
	  			this._updateMetric(maxMeters);
	  		}
	  		if (this.options.imperial && maxMeters) {
	  			this._updateImperial(maxMeters);
	  		}
	  	},

	  	_updateMetric: function (maxMeters) {
	  		var meters = this._getRoundNum(maxMeters),
	  		    label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';

	  		this._updateScale(this._mScale, label, meters / maxMeters);
	  	},

	  	_updateImperial: function (maxMeters) {
	  		var maxFeet = maxMeters * 3.2808399,
	  		    maxMiles, miles, feet;

	  		if (maxFeet > 5280) {
	  			maxMiles = maxFeet / 5280;
	  			miles = this._getRoundNum(maxMiles);
	  			this._updateScale(this._iScale, miles + ' mi', miles / maxMiles);

	  		} else {
	  			feet = this._getRoundNum(maxFeet);
	  			this._updateScale(this._iScale, feet + ' ft', feet / maxFeet);
	  		}
	  	},

	  	_updateScale: function (scale, text, ratio) {
	  		scale.style.width = Math.round(this.options.maxWidth * ratio) + 'px';
	  		scale.innerHTML = text;
	  	},

	  	_getRoundNum: function (num) {
	  		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
	  		    d = num / pow10;

	  		d = d >= 10 ? 10 :
	  		    d >= 5 ? 5 :
	  		    d >= 3 ? 3 :
	  		    d >= 2 ? 2 : 1;

	  		return pow10 * d;
	  	}
	  });


	  // @factory L.control.scale(options?: Control.Scale options)
	  // Creates an scale control with the given options.
	  var scale = function (options) {
	  	return new Scale(options);
	  };

	  var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';


	  /*
	   * @class Control.Attribution
	   * @aka L.Control.Attribution
	   * @inherits Control
	   *
	   * The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its [`attributionControl` option](#map-attributioncontrol) to `false`, and it fetches attribution texts from layers with the [`getAttribution` method](#layer-getattribution) automatically. Extends Control.
	   */

	  var Attribution = Control.extend({
	  	// @section
	  	// @aka Control.Attribution options
	  	options: {
	  		position: 'bottomright',

	  		// @option prefix: String|false = 'Leaflet'
	  		// The HTML text shown before the attributions. Pass `false` to disable.
	  		prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + ' ' : '') + 'Leaflet</a>'
	  	},

	  	initialize: function (options) {
	  		setOptions(this, options);

	  		this._attributions = {};
	  	},

	  	onAdd: function (map) {
	  		map.attributionControl = this;
	  		this._container = create$1('div', 'leaflet-control-attribution');
	  		disableClickPropagation(this._container);

	  		// TODO ugly, refactor
	  		for (var i in map._layers) {
	  			if (map._layers[i].getAttribution) {
	  				this.addAttribution(map._layers[i].getAttribution());
	  			}
	  		}

	  		this._update();

	  		map.on('layeradd', this._addAttribution, this);

	  		return this._container;
	  	},

	  	onRemove: function (map) {
	  		map.off('layeradd', this._addAttribution, this);
	  	},

	  	_addAttribution: function (ev) {
	  		if (ev.layer.getAttribution) {
	  			this.addAttribution(ev.layer.getAttribution());
	  			ev.layer.once('remove', function () {
	  				this.removeAttribution(ev.layer.getAttribution());
	  			}, this);
	  		}
	  	},

	  	// @method setPrefix(prefix: String|false): this
	  	// The HTML text shown before the attributions. Pass `false` to disable.
	  	setPrefix: function (prefix) {
	  		this.options.prefix = prefix;
	  		this._update();
	  		return this;
	  	},

	  	// @method addAttribution(text: String): this
	  	// Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
	  	addAttribution: function (text) {
	  		if (!text) { return this; }

	  		if (!this._attributions[text]) {
	  			this._attributions[text] = 0;
	  		}
	  		this._attributions[text]++;

	  		this._update();

	  		return this;
	  	},

	  	// @method removeAttribution(text: String): this
	  	// Removes an attribution text.
	  	removeAttribution: function (text) {
	  		if (!text) { return this; }

	  		if (this._attributions[text]) {
	  			this._attributions[text]--;
	  			this._update();
	  		}

	  		return this;
	  	},

	  	_update: function () {
	  		if (!this._map) { return; }

	  		var attribs = [];

	  		for (var i in this._attributions) {
	  			if (this._attributions[i]) {
	  				attribs.push(i);
	  			}
	  		}

	  		var prefixAndAttribs = [];

	  		if (this.options.prefix) {
	  			prefixAndAttribs.push(this.options.prefix);
	  		}
	  		if (attribs.length) {
	  			prefixAndAttribs.push(attribs.join(', '));
	  		}

	  		this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
	  	}
	  });

	  // @namespace Map
	  // @section Control options
	  // @option attributionControl: Boolean = true
	  // Whether a [attribution control](#control-attribution) is added to the map by default.
	  Map.mergeOptions({
	  	attributionControl: true
	  });

	  Map.addInitHook(function () {
	  	if (this.options.attributionControl) {
	  		new Attribution().addTo(this);
	  	}
	  });

	  // @namespace Control.Attribution
	  // @factory L.control.attribution(options: Control.Attribution options)
	  // Creates an attribution control.
	  var attribution = function (options) {
	  	return new Attribution(options);
	  };

	  Control.Layers = Layers;
	  Control.Zoom = Zoom;
	  Control.Scale = Scale;
	  Control.Attribution = Attribution;

	  control.layers = layers;
	  control.zoom = zoom;
	  control.scale = scale;
	  control.attribution = attribution;

	  /*
	  	L.Handler is a base class for handler classes that are used internally to inject
	  	interaction features like dragging to classes like Map and Marker.
	  */

	  // @class Handler
	  // @aka L.Handler
	  // Abstract class for map interaction handlers

	  var Handler = Class.extend({
	  	initialize: function (map) {
	  		this._map = map;
	  	},

	  	// @method enable(): this
	  	// Enables the handler
	  	enable: function () {
	  		if (this._enabled) { return this; }

	  		this._enabled = true;
	  		this.addHooks();
	  		return this;
	  	},

	  	// @method disable(): this
	  	// Disables the handler
	  	disable: function () {
	  		if (!this._enabled) { return this; }

	  		this._enabled = false;
	  		this.removeHooks();
	  		return this;
	  	},

	  	// @method enabled(): Boolean
	  	// Returns `true` if the handler is enabled
	  	enabled: function () {
	  		return !!this._enabled;
	  	}

	  	// @section Extension methods
	  	// Classes inheriting from `Handler` must implement the two following methods:
	  	// @method addHooks()
	  	// Called when the handler is enabled, should add event hooks.
	  	// @method removeHooks()
	  	// Called when the handler is disabled, should remove the event hooks added previously.
	  });

	  // @section There is static function which can be called without instantiating L.Handler:
	  // @function addTo(map: Map, name: String): this
	  // Adds a new Handler to the given map with the given name.
	  Handler.addTo = function (map, name) {
	  	map.addHandler(name, this);
	  	return this;
	  };

	  var Mixin = {Events: Events};

	  /*
	   * @class Draggable
	   * @aka L.Draggable
	   * @inherits Evented
	   *
	   * A class for making DOM elements draggable (including touch support).
	   * Used internally for map and marker dragging. Only works for elements
	   * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
	   *
	   * @example
	   * ```js
	   * var draggable = new L.Draggable(elementToDrag);
	   * draggable.enable();
	   * ```
	   */

	  var START = Browser.touch ? 'touchstart mousedown' : 'mousedown';

	  var Draggable = Evented.extend({

	  	options: {
	  		// @section
	  		// @aka Draggable options
	  		// @option clickTolerance: Number = 3
	  		// The max number of pixels a user can shift the mouse pointer during a click
	  		// for it to be considered a valid click (as opposed to a mouse drag).
	  		clickTolerance: 3
	  	},

	  	// @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
	  	// Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
	  	initialize: function (element, dragStartTarget, preventOutline, options) {
	  		setOptions(this, options);

	  		this._element = element;
	  		this._dragStartTarget = dragStartTarget || element;
	  		this._preventOutline = preventOutline;
	  	},

	  	// @method enable()
	  	// Enables the dragging ability
	  	enable: function () {
	  		if (this._enabled) { return; }

	  		on(this._dragStartTarget, START, this._onDown, this);

	  		this._enabled = true;
	  	},

	  	// @method disable()
	  	// Disables the dragging ability
	  	disable: function () {
	  		if (!this._enabled) { return; }

	  		// If we're currently dragging this draggable,
	  		// disabling it counts as first ending the drag.
	  		if (Draggable._dragging === this) {
	  			this.finishDrag(true);
	  		}

	  		off(this._dragStartTarget, START, this._onDown, this);

	  		this._enabled = false;
	  		this._moved = false;
	  	},

	  	_onDown: function (e) {
	  		// Ignore the event if disabled; this happens in IE11
	  		// under some circumstances, see #3666.
	  		if (!this._enabled) { return; }

	  		this._moved = false;

	  		if (hasClass(this._element, 'leaflet-zoom-anim')) { return; }

	  		if (e.touches && e.touches.length !== 1) {
	  			// Finish dragging to avoid conflict with touchZoom
	  			if (Draggable._dragging === this) {
	  				this.finishDrag();
	  			}
	  			return;
	  		}

	  		if (Draggable._dragging || e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }
	  		Draggable._dragging = this;  // Prevent dragging multiple objects at once.

	  		if (this._preventOutline) {
	  			preventOutline(this._element);
	  		}

	  		disableImageDrag();
	  		disableTextSelection();

	  		if (this._moving) { return; }

	  		// @event down: Event
	  		// Fired when a drag is about to start.
	  		this.fire('down');

	  		var first = e.touches ? e.touches[0] : e,
	  		    sizedParent = getSizedParentNode(this._element);

	  		this._startPoint = new Point(first.clientX, first.clientY);
	  		this._startPos = getPosition(this._element);

	  		// Cache the scale, so that we can continuously compensate for it during drag (_onMove).
	  		this._parentScale = getScale(sizedParent);

	  		var mouseevent = e.type === 'mousedown';
	  		on(document, mouseevent ? 'mousemove' : 'touchmove', this._onMove, this);
	  		on(document, mouseevent ? 'mouseup' : 'touchend touchcancel', this._onUp, this);
	  	},

	  	_onMove: function (e) {
	  		// Ignore the event if disabled; this happens in IE11
	  		// under some circumstances, see #3666.
	  		if (!this._enabled) { return; }

	  		if (e.touches && e.touches.length > 1) {
	  			this._moved = true;
	  			return;
	  		}

	  		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
	  		    offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);

	  		if (!offset.x && !offset.y) { return; }
	  		if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) { return; }

	  		// We assume that the parent container's position, border and scale do not change for the duration of the drag.
	  		// Therefore there is no need to account for the position and border (they are eliminated by the subtraction)
	  		// and we can use the cached value for the scale.
	  		offset.x /= this._parentScale.x;
	  		offset.y /= this._parentScale.y;

	  		preventDefault(e);

	  		if (!this._moved) {
	  			// @event dragstart: Event
	  			// Fired when a drag starts
	  			this.fire('dragstart');

	  			this._moved = true;

	  			addClass(document.body, 'leaflet-dragging');

	  			this._lastTarget = e.target || e.srcElement;
	  			// IE and Edge do not give the <use> element, so fetch it
	  			// if necessary
	  			if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
	  				this._lastTarget = this._lastTarget.correspondingUseElement;
	  			}
	  			addClass(this._lastTarget, 'leaflet-drag-target');
	  		}

	  		this._newPos = this._startPos.add(offset);
	  		this._moving = true;

	  		this._lastEvent = e;
	  		this._updatePosition();
	  	},

	  	_updatePosition: function () {
	  		var e = {originalEvent: this._lastEvent};

	  		// @event predrag: Event
	  		// Fired continuously during dragging *before* each corresponding
	  		// update of the element's position.
	  		this.fire('predrag', e);
	  		setPosition(this._element, this._newPos);

	  		// @event drag: Event
	  		// Fired continuously during dragging.
	  		this.fire('drag', e);
	  	},

	  	_onUp: function () {
	  		// Ignore the event if disabled; this happens in IE11
	  		// under some circumstances, see #3666.
	  		if (!this._enabled) { return; }
	  		this.finishDrag();
	  	},

	  	finishDrag: function (noInertia) {
	  		removeClass(document.body, 'leaflet-dragging');

	  		if (this._lastTarget) {
	  			removeClass(this._lastTarget, 'leaflet-drag-target');
	  			this._lastTarget = null;
	  		}

	  		off(document, 'mousemove touchmove', this._onMove, this);
	  		off(document, 'mouseup touchend touchcancel', this._onUp, this);

	  		enableImageDrag();
	  		enableTextSelection();

	  		var fireDragend = this._moved && this._moving;

	  		this._moving = false;
	  		Draggable._dragging = false;

	  		if (fireDragend) {
	  			// @event dragend: DragEndEvent
	  			// Fired when the drag ends.
	  			this.fire('dragend', {
	  				noInertia: noInertia,
	  				distance: this._newPos.distanceTo(this._startPos)
	  			});
	  		}
	  	}

	  });

	  /*
	   * @namespace PolyUtil
	   * Various utility functions for polygon geometries.
	   */

	  /* @function clipPolygon(points: Point[], bounds: Bounds, round?: Boolean): Point[]
	   * Clips the polygon geometry defined by the given `points` by the given bounds (using the [Sutherland-Hodgman algorithm](https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm)).
	   * Used by Leaflet to only show polygon points that are on the screen or near, increasing
	   * performance. Note that polygon points needs different algorithm for clipping
	   * than polyline, so there's a separate method for it.
	   */
	  function clipPolygon(points, bounds, round) {
	  	var clippedPoints,
	  	    edges = [1, 4, 2, 8],
	  	    i, j, k,
	  	    a, b,
	  	    len, edge, p;

	  	for (i = 0, len = points.length; i < len; i++) {
	  		points[i]._code = _getBitCode(points[i], bounds);
	  	}

	  	// for each edge (left, bottom, right, top)
	  	for (k = 0; k < 4; k++) {
	  		edge = edges[k];
	  		clippedPoints = [];

	  		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
	  			a = points[i];
	  			b = points[j];

	  			// if a is inside the clip window
	  			if (!(a._code & edge)) {
	  				// if b is outside the clip window (a->b goes out of screen)
	  				if (b._code & edge) {
	  					p = _getEdgeIntersection(b, a, edge, bounds, round);
	  					p._code = _getBitCode(p, bounds);
	  					clippedPoints.push(p);
	  				}
	  				clippedPoints.push(a);

	  			// else if b is inside the clip window (a->b enters the screen)
	  			} else if (!(b._code & edge)) {
	  				p = _getEdgeIntersection(b, a, edge, bounds, round);
	  				p._code = _getBitCode(p, bounds);
	  				clippedPoints.push(p);
	  			}
	  		}
	  		points = clippedPoints;
	  	}

	  	return points;
	  }

	  /* @function polygonCenter(latlngs: LatLng[], crs: CRS): LatLng
	   * Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the passed LatLngs (first ring) from a polygon.
	   */
	  function polygonCenter(latlngs, crs) {
	  	var i, j, p1, p2, f, area, x, y, center;

	  	if (!latlngs || latlngs.length === 0) {
	  		throw new Error('latlngs not passed');
	  	}

	  	if (!isFlat(latlngs)) {
	  		console.warn('latlngs are not flat! Only the first ring will be used');
	  		latlngs = latlngs[0];
	  	}

	  	var centroidLatLng = toLatLng([0, 0]);

	  	var bounds = toLatLngBounds(latlngs);
	  	var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
	  	// tests showed that below 1700 rounding errors are happening
	  	if (areaBounds < 1700) {
	  		// getting a inexact center, to move the latlngs near to [0, 0] to prevent rounding errors
	  		centroidLatLng = centroid(latlngs);
	  	}

	  	var len = latlngs.length;
	  	var points = [];
	  	for (i = 0; i < len; i++) {
	  		var latlng = toLatLng(latlngs[i]);
	  		points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
	  	}

	  	area = x = y = 0;

	  	// polygon centroid algorithm;
	  	for (i = 0, j = len - 1; i < len; j = i++) {
	  		p1 = points[i];
	  		p2 = points[j];

	  		f = p1.y * p2.x - p2.y * p1.x;
	  		x += (p1.x + p2.x) * f;
	  		y += (p1.y + p2.y) * f;
	  		area += f * 3;
	  	}

	  	if (area === 0) {
	  		// Polygon is so small that all points are on same pixel.
	  		center = points[0];
	  	} else {
	  		center = [x / area, y / area];
	  	}

	  	var latlngCenter = crs.unproject(toPoint(center));
	  	return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
	  }

	  /* @function centroid(latlngs: LatLng[]): LatLng
	   * Returns the 'center of mass' of the passed LatLngs.
	   */
	  function centroid(coords) {
	  	var latSum = 0;
	  	var lngSum = 0;
	  	var len = 0;
	  	for (var i = 0; i < coords.length; i++) {
	  		var latlng = toLatLng(coords[i]);
	  		latSum += latlng.lat;
	  		lngSum += latlng.lng;
	  		len++;
	  	}
	  	return toLatLng([latSum / len, lngSum / len]);
	  }

	  var PolyUtil = {
	    __proto__: null,
	    clipPolygon: clipPolygon,
	    polygonCenter: polygonCenter,
	    centroid: centroid
	  };

	  /*
	   * @namespace LineUtil
	   *
	   * Various utility functions for polyline points processing, used by Leaflet internally to make polylines lightning-fast.
	   */

	  // Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	  // Improves rendering performance dramatically by lessening the number of points to draw.

	  // @function simplify(points: Point[], tolerance: Number): Point[]
	  // Dramatically reduces the number of points in a polyline while retaining
	  // its shape and returns a new array of simplified points, using the
	  // [Ramer-Douglas-Peucker algorithm](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm).
	  // Used for a huge performance boost when processing/displaying Leaflet polylines for
	  // each zoom level and also reducing visual noise. tolerance affects the amount of
	  // simplification (lesser value means higher quality but slower and with more points).
	  // Also released as a separated micro-library [Simplify.js](https://mourner.github.io/simplify-js/).
	  function simplify(points, tolerance) {
	  	if (!tolerance || !points.length) {
	  		return points.slice();
	  	}

	  	var sqTolerance = tolerance * tolerance;

	  	    // stage 1: vertex reduction
	  	    points = _reducePoints(points, sqTolerance);

	  	    // stage 2: Douglas-Peucker simplification
	  	    points = _simplifyDP(points, sqTolerance);

	  	return points;
	  }

	  // @function pointToSegmentDistance(p: Point, p1: Point, p2: Point): Number
	  // Returns the distance between point `p` and segment `p1` to `p2`.
	  function pointToSegmentDistance(p, p1, p2) {
	  	return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
	  }

	  // @function closestPointOnSegment(p: Point, p1: Point, p2: Point): Number
	  // Returns the closest point from a point `p` on a segment `p1` to `p2`.
	  function closestPointOnSegment(p, p1, p2) {
	  	return _sqClosestPointOnSegment(p, p1, p2);
	  }

	  // Ramer-Douglas-Peucker simplification, see https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm
	  function _simplifyDP(points, sqTolerance) {

	  	var len = points.length,
	  	    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
	  	    markers = new ArrayConstructor(len);

	  	    markers[0] = markers[len - 1] = 1;

	  	_simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

	  	var i,
	  	    newPoints = [];

	  	for (i = 0; i < len; i++) {
	  		if (markers[i]) {
	  			newPoints.push(points[i]);
	  		}
	  	}

	  	return newPoints;
	  }

	  function _simplifyDPStep(points, markers, sqTolerance, first, last) {

	  	var maxSqDist = 0,
	  	index, i, sqDist;

	  	for (i = first + 1; i <= last - 1; i++) {
	  		sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);

	  		if (sqDist > maxSqDist) {
	  			index = i;
	  			maxSqDist = sqDist;
	  		}
	  	}

	  	if (maxSqDist > sqTolerance) {
	  		markers[index] = 1;

	  		_simplifyDPStep(points, markers, sqTolerance, first, index);
	  		_simplifyDPStep(points, markers, sqTolerance, index, last);
	  	}
	  }

	  // reduce points that are too close to each other to a single point
	  function _reducePoints(points, sqTolerance) {
	  	var reducedPoints = [points[0]];

	  	for (var i = 1, prev = 0, len = points.length; i < len; i++) {
	  		if (_sqDist(points[i], points[prev]) > sqTolerance) {
	  			reducedPoints.push(points[i]);
	  			prev = i;
	  		}
	  	}
	  	if (prev < len - 1) {
	  		reducedPoints.push(points[len - 1]);
	  	}
	  	return reducedPoints;
	  }

	  var _lastCode;

	  // @function clipSegment(a: Point, b: Point, bounds: Bounds, useLastCode?: Boolean, round?: Boolean): Point[]|Boolean
	  // Clips the segment a to b by rectangular bounds with the
	  // [Cohen-Sutherland algorithm](https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm)
	  // (modifying the segment points directly!). Used by Leaflet to only show polyline
	  // points that are on the screen or near, increasing performance.
	  function clipSegment(a, b, bounds, useLastCode, round) {
	  	var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds),
	  	    codeB = _getBitCode(b, bounds),

	  	    codeOut, p, newCode;

	  	    // save 2nd code to avoid calculating it on the next segment
	  	    _lastCode = codeB;

	  	while (true) {
	  		// if a,b is inside the clip window (trivial accept)
	  		if (!(codeA | codeB)) {
	  			return [a, b];
	  		}

	  		// if a,b is outside the clip window (trivial reject)
	  		if (codeA & codeB) {
	  			return false;
	  		}

	  		// other cases
	  		codeOut = codeA || codeB;
	  		p = _getEdgeIntersection(a, b, codeOut, bounds, round);
	  		newCode = _getBitCode(p, bounds);

	  		if (codeOut === codeA) {
	  			a = p;
	  			codeA = newCode;
	  		} else {
	  			b = p;
	  			codeB = newCode;
	  		}
	  	}
	  }

	  function _getEdgeIntersection(a, b, code, bounds, round) {
	  	var dx = b.x - a.x,
	  	    dy = b.y - a.y,
	  	    min = bounds.min,
	  	    max = bounds.max,
	  	    x, y;

	  	if (code & 8) { // top
	  		x = a.x + dx * (max.y - a.y) / dy;
	  		y = max.y;

	  	} else if (code & 4) { // bottom
	  		x = a.x + dx * (min.y - a.y) / dy;
	  		y = min.y;

	  	} else if (code & 2) { // right
	  		x = max.x;
	  		y = a.y + dy * (max.x - a.x) / dx;

	  	} else if (code & 1) { // left
	  		x = min.x;
	  		y = a.y + dy * (min.x - a.x) / dx;
	  	}

	  	return new Point(x, y, round);
	  }

	  function _getBitCode(p, bounds) {
	  	var code = 0;

	  	if (p.x < bounds.min.x) { // left
	  		code |= 1;
	  	} else if (p.x > bounds.max.x) { // right
	  		code |= 2;
	  	}

	  	if (p.y < bounds.min.y) { // bottom
	  		code |= 4;
	  	} else if (p.y > bounds.max.y) { // top
	  		code |= 8;
	  	}

	  	return code;
	  }

	  // square distance (to avoid unnecessary Math.sqrt calls)
	  function _sqDist(p1, p2) {
	  	var dx = p2.x - p1.x,
	  	    dy = p2.y - p1.y;
	  	return dx * dx + dy * dy;
	  }

	  // return closest point on segment or distance to that point
	  function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
	  	var x = p1.x,
	  	    y = p1.y,
	  	    dx = p2.x - x,
	  	    dy = p2.y - y,
	  	    dot = dx * dx + dy * dy,
	  	    t;

	  	if (dot > 0) {
	  		t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

	  		if (t > 1) {
	  			x = p2.x;
	  			y = p2.y;
	  		} else if (t > 0) {
	  			x += dx * t;
	  			y += dy * t;
	  		}
	  	}

	  	dx = p.x - x;
	  	dy = p.y - y;

	  	return sqDist ? dx * dx + dy * dy : new Point(x, y);
	  }


	  // @function isFlat(latlngs: LatLng[]): Boolean
	  // Returns true if `latlngs` is a flat array, false is nested.
	  function isFlat(latlngs) {
	  	return !isArray(latlngs[0]) || (typeof latlngs[0][0] !== 'object' && typeof latlngs[0][0] !== 'undefined');
	  }

	  function _flat(latlngs) {
	  	console.warn('Deprecated use of _flat, please use L.LineUtil.isFlat instead.');
	  	return isFlat(latlngs);
	  }

	  /* @function polylineCenter(latlngs: LatLng[], crs: CRS): LatLng
	   * Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the passed LatLngs (first ring) from a polyline.
	   */
	  function polylineCenter(latlngs, crs) {
	  	var i, halfDist, segDist, dist, p1, p2, ratio, center;

	  	if (!latlngs || latlngs.length === 0) {
	  		throw new Error('latlngs not passed');
	  	}

	  	if (!isFlat(latlngs)) {
	  		console.warn('latlngs are not flat! Only the first ring will be used');
	  		latlngs = latlngs[0];
	  	}

	  	var centroidLatLng = toLatLng([0, 0]);

	  	var bounds = toLatLngBounds(latlngs);
	  	var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
	  	// tests showed that below 1700 rounding errors are happening
	  	if (areaBounds < 1700) {
	  		// getting a inexact center, to move the latlngs near to [0, 0] to prevent rounding errors
	  		centroidLatLng = centroid(latlngs);
	  	}

	  	var len = latlngs.length;
	  	var points = [];
	  	for (i = 0; i < len; i++) {
	  		var latlng = toLatLng(latlngs[i]);
	  		points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
	  	}

	  	for (i = 0, halfDist = 0; i < len - 1; i++) {
	  		halfDist += points[i].distanceTo(points[i + 1]) / 2;
	  	}

	  	// The line is so small in the current view that all points are on the same pixel.
	  	if (halfDist === 0) {
	  		center = points[0];
	  	} else {
	  		for (i = 0, dist = 0; i < len - 1; i++) {
	  			p1 = points[i];
	  			p2 = points[i + 1];
	  			segDist = p1.distanceTo(p2);
	  			dist += segDist;

	  			if (dist > halfDist) {
	  				ratio = (dist - halfDist) / segDist;
	  				center = [
	  					p2.x - ratio * (p2.x - p1.x),
	  					p2.y - ratio * (p2.y - p1.y)
	  				];
	  				break;
	  			}
	  		}
	  	}

	  	var latlngCenter = crs.unproject(toPoint(center));
	  	return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
	  }

	  var LineUtil = {
	    __proto__: null,
	    simplify: simplify,
	    pointToSegmentDistance: pointToSegmentDistance,
	    closestPointOnSegment: closestPointOnSegment,
	    clipSegment: clipSegment,
	    _getEdgeIntersection: _getEdgeIntersection,
	    _getBitCode: _getBitCode,
	    _sqClosestPointOnSegment: _sqClosestPointOnSegment,
	    isFlat: isFlat,
	    _flat: _flat,
	    polylineCenter: polylineCenter
	  };

	  /*
	   * @namespace Projection
	   * @section
	   * Leaflet comes with a set of already defined Projections out of the box:
	   *
	   * @projection L.Projection.LonLat
	   *
	   * Equirectangular, or Plate Carree projection — the most simple projection,
	   * mostly used by GIS enthusiasts. Directly maps `x` as longitude, and `y` as
	   * latitude. Also suitable for flat worlds, e.g. game maps. Used by the
	   * `EPSG:4326` and `Simple` CRS.
	   */

	  var LonLat = {
	  	project: function (latlng) {
	  		return new Point(latlng.lng, latlng.lat);
	  	},

	  	unproject: function (point) {
	  		return new LatLng(point.y, point.x);
	  	},

	  	bounds: new Bounds([-180, -90], [180, 90])
	  };

	  /*
	   * @namespace Projection
	   * @projection L.Projection.Mercator
	   *
	   * Elliptical Mercator projection — more complex than Spherical Mercator. Assumes that Earth is an ellipsoid. Used by the EPSG:3395 CRS.
	   */

	  var Mercator = {
	  	R: 6378137,
	  	R_MINOR: 6356752.314245179,

	  	bounds: new Bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),

	  	project: function (latlng) {
	  		var d = Math.PI / 180,
	  		    r = this.R,
	  		    y = latlng.lat * d,
	  		    tmp = this.R_MINOR / r,
	  		    e = Math.sqrt(1 - tmp * tmp),
	  		    con = e * Math.sin(y);

	  		var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
	  		y = -r * Math.log(Math.max(ts, 1E-10));

	  		return new Point(latlng.lng * d * r, y);
	  	},

	  	unproject: function (point) {
	  		var d = 180 / Math.PI,
	  		    r = this.R,
	  		    tmp = this.R_MINOR / r,
	  		    e = Math.sqrt(1 - tmp * tmp),
	  		    ts = Math.exp(-point.y / r),
	  		    phi = Math.PI / 2 - 2 * Math.atan(ts);

	  		for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
	  			con = e * Math.sin(phi);
	  			con = Math.pow((1 - con) / (1 + con), e / 2);
	  			dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
	  			phi += dphi;
	  		}

	  		return new LatLng(phi * d, point.x * d / r);
	  	}
	  };

	  /*
	   * @class Projection

	   * An object with methods for projecting geographical coordinates of the world onto
	   * a flat surface (and back). See [Map projection](https://en.wikipedia.org/wiki/Map_projection).

	   * @property bounds: Bounds
	   * The bounds (specified in CRS units) where the projection is valid

	   * @method project(latlng: LatLng): Point
	   * Projects geographical coordinates into a 2D point.
	   * Only accepts actual `L.LatLng` instances, not arrays.

	   * @method unproject(point: Point): LatLng
	   * The inverse of `project`. Projects a 2D point into a geographical location.
	   * Only accepts actual `L.Point` instances, not arrays.

	   * Note that the projection instances do not inherit from Leaflet's `Class` object,
	   * and can't be instantiated. Also, new classes can't inherit from them,
	   * and methods can't be added to them with the `include` function.

	   */

	  var index = {
	    __proto__: null,
	    LonLat: LonLat,
	    Mercator: Mercator,
	    SphericalMercator: SphericalMercator
	  };

	  /*
	   * @namespace CRS
	   * @crs L.CRS.EPSG3395
	   *
	   * Rarely used by some commercial tile providers. Uses Elliptical Mercator projection.
	   */
	  var EPSG3395 = extend({}, Earth, {
	  	code: 'EPSG:3395',
	  	projection: Mercator,

	  	transformation: (function () {
	  		var scale = 0.5 / (Math.PI * Mercator.R);
	  		return toTransformation(scale, 0.5, -scale, 0.5);
	  	}())
	  });

	  /*
	   * @namespace CRS
	   * @crs L.CRS.EPSG4326
	   *
	   * A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.
	   *
	   * Leaflet 1.0.x complies with the [TMS coordinate scheme for EPSG:4326](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#global-geodetic),
	   * which is a breaking change from 0.7.x behaviour.  If you are using a `TileLayer`
	   * with this CRS, ensure that there are two 256x256 pixel tiles covering the
	   * whole earth at zoom level zero, and that the tile coordinate origin is (-180,+90),
	   * or (-180,-90) for `TileLayer`s with [the `tms` option](#tilelayer-tms) set.
	   */

	  var EPSG4326 = extend({}, Earth, {
	  	code: 'EPSG:4326',
	  	projection: LonLat,
	  	transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
	  });

	  /*
	   * @namespace CRS
	   * @crs L.CRS.Simple
	   *
	   * A simple CRS that maps longitude and latitude into `x` and `y` directly.
	   * May be used for maps of flat surfaces (e.g. game maps). Note that the `y`
	   * axis should still be inverted (going from bottom to top). `distance()` returns
	   * simple euclidean distance.
	   */

	  var Simple = extend({}, CRS, {
	  	projection: LonLat,
	  	transformation: toTransformation(1, 0, -1, 0),

	  	scale: function (zoom) {
	  		return Math.pow(2, zoom);
	  	},

	  	zoom: function (scale) {
	  		return Math.log(scale) / Math.LN2;
	  	},

	  	distance: function (latlng1, latlng2) {
	  		var dx = latlng2.lng - latlng1.lng,
	  		    dy = latlng2.lat - latlng1.lat;

	  		return Math.sqrt(dx * dx + dy * dy);
	  	},

	  	infinite: true
	  });

	  CRS.Earth = Earth;
	  CRS.EPSG3395 = EPSG3395;
	  CRS.EPSG3857 = EPSG3857;
	  CRS.EPSG900913 = EPSG900913;
	  CRS.EPSG4326 = EPSG4326;
	  CRS.Simple = Simple;

	  /*
	   * @class Layer
	   * @inherits Evented
	   * @aka L.Layer
	   * @aka ILayer
	   *
	   * A set of methods from the Layer base class that all Leaflet layers use.
	   * Inherits all methods, options and events from `L.Evented`.
	   *
	   * @example
	   *
	   * ```js
	   * var layer = L.marker(latlng).addTo(map);
	   * layer.addTo(map);
	   * layer.remove();
	   * ```
	   *
	   * @event add: Event
	   * Fired after the layer is added to a map
	   *
	   * @event remove: Event
	   * Fired after the layer is removed from a map
	   */


	  var Layer = Evented.extend({

	  	// Classes extending `L.Layer` will inherit the following options:
	  	options: {
	  		// @option pane: String = 'overlayPane'
	  		// By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
	  		pane: 'overlayPane',

	  		// @option attribution: String = null
	  		// String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
	  		attribution: null,

	  		bubblingMouseEvents: true
	  	},

	  	/* @section
	  	 * Classes extending `L.Layer` will inherit the following methods:
	  	 *
	  	 * @method addTo(map: Map|LayerGroup): this
	  	 * Adds the layer to the given map or layer group.
	  	 */
	  	addTo: function (map) {
	  		map.addLayer(this);
	  		return this;
	  	},

	  	// @method remove: this
	  	// Removes the layer from the map it is currently active on.
	  	remove: function () {
	  		return this.removeFrom(this._map || this._mapToAdd);
	  	},

	  	// @method removeFrom(map: Map): this
	  	// Removes the layer from the given map
	  	//
	  	// @alternative
	  	// @method removeFrom(group: LayerGroup): this
	  	// Removes the layer from the given `LayerGroup`
	  	removeFrom: function (obj) {
	  		if (obj) {
	  			obj.removeLayer(this);
	  		}
	  		return this;
	  	},

	  	// @method getPane(name? : String): HTMLElement
	  	// Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
	  	getPane: function (name) {
	  		return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
	  	},

	  	addInteractiveTarget: function (targetEl) {
	  		this._map._targets[stamp(targetEl)] = this;
	  		return this;
	  	},

	  	removeInteractiveTarget: function (targetEl) {
	  		delete this._map._targets[stamp(targetEl)];
	  		return this;
	  	},

	  	// @method getAttribution: String
	  	// Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
	  	getAttribution: function () {
	  		return this.options.attribution;
	  	},

	  	_layerAdd: function (e) {
	  		var map = e.target;

	  		// check in case layer gets added and then removed before the map is ready
	  		if (!map.hasLayer(this)) { return; }

	  		this._map = map;
	  		this._zoomAnimated = map._zoomAnimated;

	  		if (this.getEvents) {
	  			var events = this.getEvents();
	  			map.on(events, this);
	  			this.once('remove', function () {
	  				map.off(events, this);
	  			}, this);
	  		}

	  		this.onAdd(map);

	  		this.fire('add');
	  		map.fire('layeradd', {layer: this});
	  	}
	  });

	  /* @section Extension methods
	   * @uninheritable
	   *
	   * Every layer should extend from `L.Layer` and (re-)implement the following methods.
	   *
	   * @method onAdd(map: Map): this
	   * Should contain code that creates DOM elements for the layer, adds them to `map panes` where they should belong and puts listeners on relevant map events. Called on [`map.addLayer(layer)`](#map-addlayer).
	   *
	   * @method onRemove(map: Map): this
	   * Should contain all clean up code that removes the layer's elements from the DOM and removes listeners previously added in [`onAdd`](#layer-onadd). Called on [`map.removeLayer(layer)`](#map-removelayer).
	   *
	   * @method getEvents(): Object
	   * This optional method should return an object like `{ viewreset: this._reset }` for [`addEventListener`](#evented-addeventlistener). The event handlers in this object will be automatically added and removed from the map with your layer.
	   *
	   * @method getAttribution(): String
	   * This optional method should return a string containing HTML to be shown on the `Attribution control` whenever the layer is visible.
	   *
	   * @method beforeAdd(map: Map): this
	   * Optional method. Called on [`map.addLayer(layer)`](#map-addlayer), before the layer is added to the map, before events are initialized, without waiting until the map is in a usable state. Use for early initialization only.
	   */


	  /* @namespace Map
	   * @section Layer events
	   *
	   * @event layeradd: LayerEvent
	   * Fired when a new layer is added to the map.
	   *
	   * @event layerremove: LayerEvent
	   * Fired when some layer is removed from the map
	   *
	   * @section Methods for Layers and Controls
	   */
	  Map.include({
	  	// @method addLayer(layer: Layer): this
	  	// Adds the given layer to the map
	  	addLayer: function (layer) {
	  		if (!layer._layerAdd) {
	  			throw new Error('The provided object is not a Layer.');
	  		}

	  		var id = stamp(layer);
	  		if (this._layers[id]) { return this; }
	  		this._layers[id] = layer;

	  		layer._mapToAdd = this;

	  		if (layer.beforeAdd) {
	  			layer.beforeAdd(this);
	  		}

	  		this.whenReady(layer._layerAdd, layer);

	  		return this;
	  	},

	  	// @method removeLayer(layer: Layer): this
	  	// Removes the given layer from the map.
	  	removeLayer: function (layer) {
	  		var id = stamp(layer);

	  		if (!this._layers[id]) { return this; }

	  		if (this._loaded) {
	  			layer.onRemove(this);
	  		}

	  		delete this._layers[id];

	  		if (this._loaded) {
	  			this.fire('layerremove', {layer: layer});
	  			layer.fire('remove');
	  		}

	  		layer._map = layer._mapToAdd = null;

	  		return this;
	  	},

	  	// @method hasLayer(layer: Layer): Boolean
	  	// Returns `true` if the given layer is currently added to the map
	  	hasLayer: function (layer) {
	  		return stamp(layer) in this._layers;
	  	},

	  	/* @method eachLayer(fn: Function, context?: Object): this
	  	 * Iterates over the layers of the map, optionally specifying context of the iterator function.
	  	 * ```
	  	 * map.eachLayer(function(layer){
	  	 *     layer.bindPopup('Hello');
	  	 * });
	  	 * ```
	  	 */
	  	eachLayer: function (method, context) {
	  		for (var i in this._layers) {
	  			method.call(context, this._layers[i]);
	  		}
	  		return this;
	  	},

	  	_addLayers: function (layers) {
	  		layers = layers ? (isArray(layers) ? layers : [layers]) : [];

	  		for (var i = 0, len = layers.length; i < len; i++) {
	  			this.addLayer(layers[i]);
	  		}
	  	},

	  	_addZoomLimit: function (layer) {
	  		if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
	  			this._zoomBoundLayers[stamp(layer)] = layer;
	  			this._updateZoomLevels();
	  		}
	  	},

	  	_removeZoomLimit: function (layer) {
	  		var id = stamp(layer);

	  		if (this._zoomBoundLayers[id]) {
	  			delete this._zoomBoundLayers[id];
	  			this._updateZoomLevels();
	  		}
	  	},

	  	_updateZoomLevels: function () {
	  		var minZoom = Infinity,
	  		    maxZoom = -Infinity,
	  		    oldZoomSpan = this._getZoomSpan();

	  		for (var i in this._zoomBoundLayers) {
	  			var options = this._zoomBoundLayers[i].options;

	  			minZoom = options.minZoom === undefined ? minZoom : Math.min(minZoom, options.minZoom);
	  			maxZoom = options.maxZoom === undefined ? maxZoom : Math.max(maxZoom, options.maxZoom);
	  		}

	  		this._layersMaxZoom = maxZoom === -Infinity ? undefined : maxZoom;
	  		this._layersMinZoom = minZoom === Infinity ? undefined : minZoom;

	  		// @section Map state change events
	  		// @event zoomlevelschange: Event
	  		// Fired when the number of zoomlevels on the map is changed due
	  		// to adding or removing a layer.
	  		if (oldZoomSpan !== this._getZoomSpan()) {
	  			this.fire('zoomlevelschange');
	  		}

	  		if (this.options.maxZoom === undefined && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
	  			this.setZoom(this._layersMaxZoom);
	  		}
	  		if (this.options.minZoom === undefined && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
	  			this.setZoom(this._layersMinZoom);
	  		}
	  	}
	  });

	  /*
	   * @class LayerGroup
	   * @aka L.LayerGroup
	   * @inherits Interactive layer
	   *
	   * Used to group several layers and handle them as one. If you add it to the map,
	   * any layers added or removed from the group will be added/removed on the map as
	   * well. Extends `Layer`.
	   *
	   * @example
	   *
	   * ```js
	   * L.layerGroup([marker1, marker2])
	   * 	.addLayer(polyline)
	   * 	.addTo(map);
	   * ```
	   */

	  var LayerGroup = Layer.extend({

	  	initialize: function (layers, options) {
	  		setOptions(this, options);

	  		this._layers = {};

	  		var i, len;

	  		if (layers) {
	  			for (i = 0, len = layers.length; i < len; i++) {
	  				this.addLayer(layers[i]);
	  			}
	  		}
	  	},

	  	// @method addLayer(layer: Layer): this
	  	// Adds the given layer to the group.
	  	addLayer: function (layer) {
	  		var id = this.getLayerId(layer);

	  		this._layers[id] = layer;

	  		if (this._map) {
	  			this._map.addLayer(layer);
	  		}

	  		return this;
	  	},

	  	// @method removeLayer(layer: Layer): this
	  	// Removes the given layer from the group.
	  	// @alternative
	  	// @method removeLayer(id: Number): this
	  	// Removes the layer with the given internal ID from the group.
	  	removeLayer: function (layer) {
	  		var id = layer in this._layers ? layer : this.getLayerId(layer);

	  		if (this._map && this._layers[id]) {
	  			this._map.removeLayer(this._layers[id]);
	  		}

	  		delete this._layers[id];

	  		return this;
	  	},

	  	// @method hasLayer(layer: Layer): Boolean
	  	// Returns `true` if the given layer is currently added to the group.
	  	// @alternative
	  	// @method hasLayer(id: Number): Boolean
	  	// Returns `true` if the given internal ID is currently added to the group.
	  	hasLayer: function (layer) {
	  		var layerId = typeof layer === 'number' ? layer : this.getLayerId(layer);
	  		return layerId in this._layers;
	  	},

	  	// @method clearLayers(): this
	  	// Removes all the layers from the group.
	  	clearLayers: function () {
	  		return this.eachLayer(this.removeLayer, this);
	  	},

	  	// @method invoke(methodName: String, …): this
	  	// Calls `methodName` on every layer contained in this group, passing any
	  	// additional parameters. Has no effect if the layers contained do not
	  	// implement `methodName`.
	  	invoke: function (methodName) {
	  		var args = Array.prototype.slice.call(arguments, 1),
	  		    i, layer;

	  		for (i in this._layers) {
	  			layer = this._layers[i];

	  			if (layer[methodName]) {
	  				layer[methodName].apply(layer, args);
	  			}
	  		}

	  		return this;
	  	},

	  	onAdd: function (map) {
	  		this.eachLayer(map.addLayer, map);
	  	},

	  	onRemove: function (map) {
	  		this.eachLayer(map.removeLayer, map);
	  	},

	  	// @method eachLayer(fn: Function, context?: Object): this
	  	// Iterates over the layers of the group, optionally specifying context of the iterator function.
	  	// ```js
	  	// group.eachLayer(function (layer) {
	  	// 	layer.bindPopup('Hello');
	  	// });
	  	// ```
	  	eachLayer: function (method, context) {
	  		for (var i in this._layers) {
	  			method.call(context, this._layers[i]);
	  		}
	  		return this;
	  	},

	  	// @method getLayer(id: Number): Layer
	  	// Returns the layer with the given internal ID.
	  	getLayer: function (id) {
	  		return this._layers[id];
	  	},

	  	// @method getLayers(): Layer[]
	  	// Returns an array of all the layers added to the group.
	  	getLayers: function () {
	  		var layers = [];
	  		this.eachLayer(layers.push, layers);
	  		return layers;
	  	},

	  	// @method setZIndex(zIndex: Number): this
	  	// Calls `setZIndex` on every layer contained in this group, passing the z-index.
	  	setZIndex: function (zIndex) {
	  		return this.invoke('setZIndex', zIndex);
	  	},

	  	// @method getLayerId(layer: Layer): Number
	  	// Returns the internal ID for a layer
	  	getLayerId: function (layer) {
	  		return stamp(layer);
	  	}
	  });


	  // @factory L.layerGroup(layers?: Layer[], options?: Object)
	  // Create a layer group, optionally given an initial set of layers and an `options` object.
	  var layerGroup = function (layers, options) {
	  	return new LayerGroup(layers, options);
	  };

	  /*
	   * @class FeatureGroup
	   * @aka L.FeatureGroup
	   * @inherits LayerGroup
	   *
	   * Extended `LayerGroup` that makes it easier to do the same thing to all its member layers:
	   *  * [`bindPopup`](#layer-bindpopup) binds a popup to all of the layers at once (likewise with [`bindTooltip`](#layer-bindtooltip))
	   *  * Events are propagated to the `FeatureGroup`, so if the group has an event
	   * handler, it will handle events from any of the layers. This includes mouse events
	   * and custom events.
	   *  * Has `layeradd` and `layerremove` events
	   *
	   * @example
	   *
	   * ```js
	   * L.featureGroup([marker1, marker2, polyline])
	   * 	.bindPopup('Hello world!')
	   * 	.on('click', function() { alert('Clicked on a member of the group!'); })
	   * 	.addTo(map);
	   * ```
	   */

	  var FeatureGroup = LayerGroup.extend({

	  	addLayer: function (layer) {
	  		if (this.hasLayer(layer)) {
	  			return this;
	  		}

	  		layer.addEventParent(this);

	  		LayerGroup.prototype.addLayer.call(this, layer);

	  		// @event layeradd: LayerEvent
	  		// Fired when a layer is added to this `FeatureGroup`
	  		return this.fire('layeradd', {layer: layer});
	  	},

	  	removeLayer: function (layer) {
	  		if (!this.hasLayer(layer)) {
	  			return this;
	  		}
	  		if (layer in this._layers) {
	  			layer = this._layers[layer];
	  		}

	  		layer.removeEventParent(this);

	  		LayerGroup.prototype.removeLayer.call(this, layer);

	  		// @event layerremove: LayerEvent
	  		// Fired when a layer is removed from this `FeatureGroup`
	  		return this.fire('layerremove', {layer: layer});
	  	},

	  	// @method setStyle(style: Path options): this
	  	// Sets the given path options to each layer of the group that has a `setStyle` method.
	  	setStyle: function (style) {
	  		return this.invoke('setStyle', style);
	  	},

	  	// @method bringToFront(): this
	  	// Brings the layer group to the top of all other layers
	  	bringToFront: function () {
	  		return this.invoke('bringToFront');
	  	},

	  	// @method bringToBack(): this
	  	// Brings the layer group to the back of all other layers
	  	bringToBack: function () {
	  		return this.invoke('bringToBack');
	  	},

	  	// @method getBounds(): LatLngBounds
	  	// Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
	  	getBounds: function () {
	  		var bounds = new LatLngBounds();

	  		for (var id in this._layers) {
	  			var layer = this._layers[id];
	  			bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
	  		}
	  		return bounds;
	  	}
	  });

	  // @factory L.featureGroup(layers?: Layer[], options?: Object)
	  // Create a feature group, optionally given an initial set of layers and an `options` object.
	  var featureGroup = function (layers, options) {
	  	return new FeatureGroup(layers, options);
	  };

	  /*
	   * @class Icon
	   * @aka L.Icon
	   *
	   * Represents an icon to provide when creating a marker.
	   *
	   * @example
	   *
	   * ```js
	   * var myIcon = L.icon({
	   *     iconUrl: 'my-icon.png',
	   *     iconRetinaUrl: 'my-icon@2x.png',
	   *     iconSize: [38, 95],
	   *     iconAnchor: [22, 94],
	   *     popupAnchor: [-3, -76],
	   *     shadowUrl: 'my-icon-shadow.png',
	   *     shadowRetinaUrl: 'my-icon-shadow@2x.png',
	   *     shadowSize: [68, 95],
	   *     shadowAnchor: [22, 94]
	   * });
	   *
	   * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
	   * ```
	   *
	   * `L.Icon.Default` extends `L.Icon` and is the blue icon Leaflet uses for markers by default.
	   *
	   */

	  var Icon = Class.extend({

	  	/* @section
	  	 * @aka Icon options
	  	 *
	  	 * @option iconUrl: String = null
	  	 * **(required)** The URL to the icon image (absolute or relative to your script path).
	  	 *
	  	 * @option iconRetinaUrl: String = null
	  	 * The URL to a retina sized version of the icon image (absolute or relative to your
	  	 * script path). Used for Retina screen devices.
	  	 *
	  	 * @option iconSize: Point = null
	  	 * Size of the icon image in pixels.
	  	 *
	  	 * @option iconAnchor: Point = null
	  	 * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
	  	 * will be aligned so that this point is at the marker's geographical location. Centered
	  	 * by default if size is specified, also can be set in CSS with negative margins.
	  	 *
	  	 * @option popupAnchor: Point = [0, 0]
	  	 * The coordinates of the point from which popups will "open", relative to the icon anchor.
	  	 *
	  	 * @option tooltipAnchor: Point = [0, 0]
	  	 * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
	  	 *
	  	 * @option shadowUrl: String = null
	  	 * The URL to the icon shadow image. If not specified, no shadow image will be created.
	  	 *
	  	 * @option shadowRetinaUrl: String = null
	  	 *
	  	 * @option shadowSize: Point = null
	  	 * Size of the shadow image in pixels.
	  	 *
	  	 * @option shadowAnchor: Point = null
	  	 * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
	  	 * as iconAnchor if not specified).
	  	 *
	  	 * @option className: String = ''
	  	 * A custom class name to assign to both icon and shadow images. Empty by default.
	  	 */

	  	options: {
	  		popupAnchor: [0, 0],
	  		tooltipAnchor: [0, 0],

	  		// @option crossOrigin: Boolean|String = false
	  		// Whether the crossOrigin attribute will be added to the tiles.
	  		// If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
	  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
	  		crossOrigin: false
	  	},

	  	initialize: function (options) {
	  		setOptions(this, options);
	  	},

	  	// @method createIcon(oldIcon?: HTMLElement): HTMLElement
	  	// Called internally when the icon has to be shown, returns a `<img>` HTML element
	  	// styled according to the options.
	  	createIcon: function (oldIcon) {
	  		return this._createIcon('icon', oldIcon);
	  	},

	  	// @method createShadow(oldIcon?: HTMLElement): HTMLElement
	  	// As `createIcon`, but for the shadow beneath it.
	  	createShadow: function (oldIcon) {
	  		return this._createIcon('shadow', oldIcon);
	  	},

	  	_createIcon: function (name, oldIcon) {
	  		var src = this._getIconUrl(name);

	  		if (!src) {
	  			if (name === 'icon') {
	  				throw new Error('iconUrl not set in Icon options (see the docs).');
	  			}
	  			return null;
	  		}

	  		var img = this._createImg(src, oldIcon && oldIcon.tagName === 'IMG' ? oldIcon : null);
	  		this._setIconStyles(img, name);

	  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
	  			img.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
	  		}

	  		return img;
	  	},

	  	_setIconStyles: function (img, name) {
	  		var options = this.options;
	  		var sizeOption = options[name + 'Size'];

	  		if (typeof sizeOption === 'number') {
	  			sizeOption = [sizeOption, sizeOption];
	  		}

	  		var size = toPoint(sizeOption),
	  		    anchor = toPoint(name === 'shadow' && options.shadowAnchor || options.iconAnchor ||
	  		            size && size.divideBy(2, true));

	  		img.className = 'leaflet-marker-' + name + ' ' + (options.className || '');

	  		if (anchor) {
	  			img.style.marginLeft = (-anchor.x) + 'px';
	  			img.style.marginTop  = (-anchor.y) + 'px';
	  		}

	  		if (size) {
	  			img.style.width  = size.x + 'px';
	  			img.style.height = size.y + 'px';
	  		}
	  	},

	  	_createImg: function (src, el) {
	  		el = el || document.createElement('img');
	  		el.src = src;
	  		return el;
	  	},

	  	_getIconUrl: function (name) {
	  		return Browser.retina && this.options[name + 'RetinaUrl'] || this.options[name + 'Url'];
	  	}
	  });


	  // @factory L.icon(options: Icon options)
	  // Creates an icon instance with the given options.
	  function icon(options) {
	  	return new Icon(options);
	  }

	  /*
	   * @miniclass Icon.Default (Icon)
	   * @aka L.Icon.Default
	   * @section
	   *
	   * A trivial subclass of `Icon`, represents the icon to use in `Marker`s when
	   * no icon is specified. Points to the blue marker image distributed with Leaflet
	   * releases.
	   *
	   * In order to customize the default icon, just change the properties of `L.Icon.Default.prototype.options`
	   * (which is a set of `Icon options`).
	   *
	   * If you want to _completely_ replace the default icon, override the
	   * `L.Marker.prototype.options.icon` with your own icon instead.
	   */

	  var IconDefault = Icon.extend({

	  	options: {
	  		iconUrl:       'marker-icon.png',
	  		iconRetinaUrl: 'marker-icon-2x.png',
	  		shadowUrl:     'marker-shadow.png',
	  		iconSize:    [25, 41],
	  		iconAnchor:  [12, 41],
	  		popupAnchor: [1, -34],
	  		tooltipAnchor: [16, -28],
	  		shadowSize:  [41, 41]
	  	},

	  	_getIconUrl: function (name) {
	  		if (typeof IconDefault.imagePath !== 'string') {	// Deprecated, backwards-compatibility only
	  			IconDefault.imagePath = this._detectIconPath();
	  		}

	  		// @option imagePath: String
	  		// `Icon.Default` will try to auto-detect the location of the
	  		// blue icon images. If you are placing these images in a non-standard
	  		// way, set this option to point to the right path.
	  		return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
	  	},

	  	_stripUrl: function (path) {	// separate function to use in tests
	  		var strip = function (str, re, idx) {
	  			var match = re.exec(str);
	  			return match && match[idx];
	  		};
	  		path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
	  		return path && strip(path, /^(.*)marker-icon\.png$/, 1);
	  	},

	  	_detectIconPath: function () {
	  		var el = create$1('div',  'leaflet-default-icon-path', document.body);
	  		var path = getStyle(el, 'background-image') ||
	  		           getStyle(el, 'backgroundImage');	// IE8

	  		document.body.removeChild(el);
	  		path = this._stripUrl(path);
	  		if (path) { return path; }
	  		var link = document.querySelector('link[href$="leaflet.css"]');
	  		if (!link) { return ''; }
	  		return link.href.substring(0, link.href.length - 'leaflet.css'.length - 1);
	  	}
	  });

	  /*
	   * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
	   */


	  /* @namespace Marker
	   * @section Interaction handlers
	   *
	   * Interaction handlers are properties of a marker instance that allow you to control interaction behavior in runtime, enabling or disabling certain features such as dragging (see `Handler` methods). Example:
	   *
	   * ```js
	   * marker.dragging.disable();
	   * ```
	   *
	   * @property dragging: Handler
	   * Marker dragging handler (by both mouse and touch). Only valid when the marker is on the map (Otherwise set [`marker.options.draggable`](#marker-draggable)).
	   */

	  var MarkerDrag = Handler.extend({
	  	initialize: function (marker) {
	  		this._marker = marker;
	  	},

	  	addHooks: function () {
	  		var icon = this._marker._icon;

	  		if (!this._draggable) {
	  			this._draggable = new Draggable(icon, icon, true);
	  		}

	  		this._draggable.on({
	  			dragstart: this._onDragStart,
	  			predrag: this._onPreDrag,
	  			drag: this._onDrag,
	  			dragend: this._onDragEnd
	  		}, this).enable();

	  		addClass(icon, 'leaflet-marker-draggable');
	  	},

	  	removeHooks: function () {
	  		this._draggable.off({
	  			dragstart: this._onDragStart,
	  			predrag: this._onPreDrag,
	  			drag: this._onDrag,
	  			dragend: this._onDragEnd
	  		}, this).disable();

	  		if (this._marker._icon) {
	  			removeClass(this._marker._icon, 'leaflet-marker-draggable');
	  		}
	  	},

	  	moved: function () {
	  		return this._draggable && this._draggable._moved;
	  	},

	  	_adjustPan: function (e) {
	  		var marker = this._marker,
	  		    map = marker._map,
	  		    speed = this._marker.options.autoPanSpeed,
	  		    padding = this._marker.options.autoPanPadding,
	  		    iconPos = getPosition(marker._icon),
	  		    bounds = map.getPixelBounds(),
	  		    origin = map.getPixelOrigin();

	  		var panBounds = toBounds(
	  			bounds.min._subtract(origin).add(padding),
	  			bounds.max._subtract(origin).subtract(padding)
	  		);

	  		if (!panBounds.contains(iconPos)) {
	  			// Compute incremental movement
	  			var movement = toPoint(
	  				(Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) -
	  				(Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),

	  				(Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) -
	  				(Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
	  			).multiplyBy(speed);

	  			map.panBy(movement, {animate: false});

	  			this._draggable._newPos._add(movement);
	  			this._draggable._startPos._add(movement);

	  			setPosition(marker._icon, this._draggable._newPos);
	  			this._onDrag(e);

	  			this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
	  		}
	  	},

	  	_onDragStart: function () {
	  		// @section Dragging events
	  		// @event dragstart: Event
	  		// Fired when the user starts dragging the marker.

	  		// @event movestart: Event
	  		// Fired when the marker starts moving (because of dragging).

	  		this._oldLatLng = this._marker.getLatLng();

	  		// When using ES6 imports it could not be set when `Popup` was not imported as well
	  		this._marker.closePopup && this._marker.closePopup();

	  		this._marker
	  			.fire('movestart')
	  			.fire('dragstart');
	  	},

	  	_onPreDrag: function (e) {
	  		if (this._marker.options.autoPan) {
	  			cancelAnimFrame(this._panRequest);
	  			this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
	  		}
	  	},

	  	_onDrag: function (e) {
	  		var marker = this._marker,
	  		    shadow = marker._shadow,
	  		    iconPos = getPosition(marker._icon),
	  		    latlng = marker._map.layerPointToLatLng(iconPos);

	  		// update shadow position
	  		if (shadow) {
	  			setPosition(shadow, iconPos);
	  		}

	  		marker._latlng = latlng;
	  		e.latlng = latlng;
	  		e.oldLatLng = this._oldLatLng;

	  		// @event drag: Event
	  		// Fired repeatedly while the user drags the marker.
	  		marker
	  		    .fire('move', e)
	  		    .fire('drag', e);
	  	},

	  	_onDragEnd: function (e) {
	  		// @event dragend: DragEndEvent
	  		// Fired when the user stops dragging the marker.

	  		 cancelAnimFrame(this._panRequest);

	  		// @event moveend: Event
	  		// Fired when the marker stops moving (because of dragging).
	  		delete this._oldLatLng;
	  		this._marker
	  		    .fire('moveend')
	  		    .fire('dragend', e);
	  	}
	  });

	  /*
	   * @class Marker
	   * @inherits Interactive layer
	   * @aka L.Marker
	   * L.Marker is used to display clickable/draggable icons on the map. Extends `Layer`.
	   *
	   * @example
	   *
	   * ```js
	   * L.marker([50.5, 30.5]).addTo(map);
	   * ```
	   */

	  var Marker = Layer.extend({

	  	// @section
	  	// @aka Marker options
	  	options: {
	  		// @option icon: Icon = *
	  		// Icon instance to use for rendering the marker.
	  		// See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
	  		// If not specified, a common instance of `L.Icon.Default` is used.
	  		icon: new IconDefault(),

	  		// Option inherited from "Interactive layer" abstract class
	  		interactive: true,

	  		// @option keyboard: Boolean = true
	  		// Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
	  		keyboard: true,

	  		// @option title: String = ''
	  		// Text for the browser tooltip that appear on marker hover (no tooltip by default).
	  		// [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
	  		title: '',

	  		// @option alt: String = 'Marker'
	  		// Text for the `alt` attribute of the icon image.
	  		// [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
	  		alt: 'Marker',

	  		// @option zIndexOffset: Number = 0
	  		// By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
	  		zIndexOffset: 0,

	  		// @option opacity: Number = 1.0
	  		// The opacity of the marker.
	  		opacity: 1,

	  		// @option riseOnHover: Boolean = false
	  		// If `true`, the marker will get on top of others when you hover the mouse over it.
	  		riseOnHover: false,

	  		// @option riseOffset: Number = 250
	  		// The z-index offset used for the `riseOnHover` feature.
	  		riseOffset: 250,

	  		// @option pane: String = 'markerPane'
	  		// `Map pane` where the markers icon will be added.
	  		pane: 'markerPane',

	  		// @option shadowPane: String = 'shadowPane'
	  		// `Map pane` where the markers shadow will be added.
	  		shadowPane: 'shadowPane',

	  		// @option bubblingMouseEvents: Boolean = false
	  		// When `true`, a mouse event on this marker will trigger the same event on the map
	  		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
	  		bubblingMouseEvents: false,

	  		// @option autoPanOnFocus: Boolean = true
	  		// When `true`, the map will pan whenever the marker is focused (via
	  		// e.g. pressing `tab` on the keyboard) to ensure the marker is
	  		// visible within the map's bounds
	  		autoPanOnFocus: true,

	  		// @section Draggable marker options
	  		// @option draggable: Boolean = false
	  		// Whether the marker is draggable with mouse/touch or not.
	  		draggable: false,

	  		// @option autoPan: Boolean = false
	  		// Whether to pan the map when dragging this marker near its edge or not.
	  		autoPan: false,

	  		// @option autoPanPadding: Point = Point(50, 50)
	  		// Distance (in pixels to the left/right and to the top/bottom) of the
	  		// map edge to start panning the map.
	  		autoPanPadding: [50, 50],

	  		// @option autoPanSpeed: Number = 10
	  		// Number of pixels the map should pan by.
	  		autoPanSpeed: 10
	  	},

	  	/* @section
	  	 *
	  	 * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
	  	 */

	  	initialize: function (latlng, options) {
	  		setOptions(this, options);
	  		this._latlng = toLatLng(latlng);
	  	},

	  	onAdd: function (map) {
	  		this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;

	  		if (this._zoomAnimated) {
	  			map.on('zoomanim', this._animateZoom, this);
	  		}

	  		this._initIcon();
	  		this.update();
	  	},

	  	onRemove: function (map) {
	  		if (this.dragging && this.dragging.enabled()) {
	  			this.options.draggable = true;
	  			this.dragging.removeHooks();
	  		}
	  		delete this.dragging;

	  		if (this._zoomAnimated) {
	  			map.off('zoomanim', this._animateZoom, this);
	  		}

	  		this._removeIcon();
	  		this._removeShadow();
	  	},

	  	getEvents: function () {
	  		return {
	  			zoom: this.update,
	  			viewreset: this.update
	  		};
	  	},

	  	// @method getLatLng: LatLng
	  	// Returns the current geographical position of the marker.
	  	getLatLng: function () {
	  		return this._latlng;
	  	},

	  	// @method setLatLng(latlng: LatLng): this
	  	// Changes the marker position to the given point.
	  	setLatLng: function (latlng) {
	  		var oldLatLng = this._latlng;
	  		this._latlng = toLatLng(latlng);
	  		this.update();

	  		// @event move: Event
	  		// Fired when the marker is moved via [`setLatLng`](#marker-setlatlng) or by [dragging](#marker-dragging). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
	  		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
	  	},

	  	// @method setZIndexOffset(offset: Number): this
	  	// Changes the [zIndex offset](#marker-zindexoffset) of the marker.
	  	setZIndexOffset: function (offset) {
	  		this.options.zIndexOffset = offset;
	  		return this.update();
	  	},

	  	// @method getIcon: Icon
	  	// Returns the current icon used by the marker
	  	getIcon: function () {
	  		return this.options.icon;
	  	},

	  	// @method setIcon(icon: Icon): this
	  	// Changes the marker icon.
	  	setIcon: function (icon) {

	  		this.options.icon = icon;

	  		if (this._map) {
	  			this._initIcon();
	  			this.update();
	  		}

	  		if (this._popup) {
	  			this.bindPopup(this._popup, this._popup.options);
	  		}

	  		return this;
	  	},

	  	getElement: function () {
	  		return this._icon;
	  	},

	  	update: function () {

	  		if (this._icon && this._map) {
	  			var pos = this._map.latLngToLayerPoint(this._latlng).round();
	  			this._setPos(pos);
	  		}

	  		return this;
	  	},

	  	_initIcon: function () {
	  		var options = this.options,
	  		    classToAdd = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

	  		var icon = options.icon.createIcon(this._icon),
	  		    addIcon = false;

	  		// if we're not reusing the icon, remove the old one and init new one
	  		if (icon !== this._icon) {
	  			if (this._icon) {
	  				this._removeIcon();
	  			}
	  			addIcon = true;

	  			if (options.title) {
	  				icon.title = options.title;
	  			}

	  			if (icon.tagName === 'IMG') {
	  				icon.alt = options.alt || '';
	  			}
	  		}

	  		addClass(icon, classToAdd);

	  		if (options.keyboard) {
	  			icon.tabIndex = '0';
	  			icon.setAttribute('role', 'button');
	  		}

	  		this._icon = icon;

	  		if (options.riseOnHover) {
	  			this.on({
	  				mouseover: this._bringToFront,
	  				mouseout: this._resetZIndex
	  			});
	  		}

	  		if (this.options.autoPanOnFocus) {
	  			on(icon, 'focus', this._panOnFocus, this);
	  		}

	  		var newShadow = options.icon.createShadow(this._shadow),
	  		    addShadow = false;

	  		if (newShadow !== this._shadow) {
	  			this._removeShadow();
	  			addShadow = true;
	  		}

	  		if (newShadow) {
	  			addClass(newShadow, classToAdd);
	  			newShadow.alt = '';
	  		}
	  		this._shadow = newShadow;


	  		if (options.opacity < 1) {
	  			this._updateOpacity();
	  		}


	  		if (addIcon) {
	  			this.getPane().appendChild(this._icon);
	  		}
	  		this._initInteraction();
	  		if (newShadow && addShadow) {
	  			this.getPane(options.shadowPane).appendChild(this._shadow);
	  		}
	  	},

	  	_removeIcon: function () {
	  		if (this.options.riseOnHover) {
	  			this.off({
	  				mouseover: this._bringToFront,
	  				mouseout: this._resetZIndex
	  			});
	  		}

	  		if (this.options.autoPanOnFocus) {
	  			off(this._icon, 'focus', this._panOnFocus, this);
	  		}

	  		remove(this._icon);
	  		this.removeInteractiveTarget(this._icon);

	  		this._icon = null;
	  	},

	  	_removeShadow: function () {
	  		if (this._shadow) {
	  			remove(this._shadow);
	  		}
	  		this._shadow = null;
	  	},

	  	_setPos: function (pos) {

	  		if (this._icon) {
	  			setPosition(this._icon, pos);
	  		}

	  		if (this._shadow) {
	  			setPosition(this._shadow, pos);
	  		}

	  		this._zIndex = pos.y + this.options.zIndexOffset;

	  		this._resetZIndex();
	  	},

	  	_updateZIndex: function (offset) {
	  		if (this._icon) {
	  			this._icon.style.zIndex = this._zIndex + offset;
	  		}
	  	},

	  	_animateZoom: function (opt) {
	  		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

	  		this._setPos(pos);
	  	},

	  	_initInteraction: function () {

	  		if (!this.options.interactive) { return; }

	  		addClass(this._icon, 'leaflet-interactive');

	  		this.addInteractiveTarget(this._icon);

	  		if (MarkerDrag) {
	  			var draggable = this.options.draggable;
	  			if (this.dragging) {
	  				draggable = this.dragging.enabled();
	  				this.dragging.disable();
	  			}

	  			this.dragging = new MarkerDrag(this);

	  			if (draggable) {
	  				this.dragging.enable();
	  			}
	  		}
	  	},

	  	// @method setOpacity(opacity: Number): this
	  	// Changes the opacity of the marker.
	  	setOpacity: function (opacity) {
	  		this.options.opacity = opacity;
	  		if (this._map) {
	  			this._updateOpacity();
	  		}

	  		return this;
	  	},

	  	_updateOpacity: function () {
	  		var opacity = this.options.opacity;

	  		if (this._icon) {
	  			setOpacity(this._icon, opacity);
	  		}

	  		if (this._shadow) {
	  			setOpacity(this._shadow, opacity);
	  		}
	  	},

	  	_bringToFront: function () {
	  		this._updateZIndex(this.options.riseOffset);
	  	},

	  	_resetZIndex: function () {
	  		this._updateZIndex(0);
	  	},

	  	_panOnFocus: function () {
	  		var map = this._map;
	  		if (!map) { return; }

	  		var iconOpts = this.options.icon.options;
	  		var size = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
	  		var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);

	  		map.panInside(this._latlng, {
	  			paddingTopLeft: anchor,
	  			paddingBottomRight: size.subtract(anchor)
	  		});
	  	},

	  	_getPopupAnchor: function () {
	  		return this.options.icon.options.popupAnchor;
	  	},

	  	_getTooltipAnchor: function () {
	  		return this.options.icon.options.tooltipAnchor;
	  	}
	  });


	  // factory L.marker(latlng: LatLng, options? : Marker options)

	  // @factory L.marker(latlng: LatLng, options? : Marker options)
	  // Instantiates a Marker object given a geographical point and optionally an options object.
	  function marker(latlng, options) {
	  	return new Marker(latlng, options);
	  }

	  /*
	   * @class Path
	   * @aka L.Path
	   * @inherits Interactive layer
	   *
	   * An abstract class that contains options and constants shared between vector
	   * overlays (Polygon, Polyline, Circle). Do not use it directly. Extends `Layer`.
	   */

	  var Path = Layer.extend({

	  	// @section
	  	// @aka Path options
	  	options: {
	  		// @option stroke: Boolean = true
	  		// Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
	  		stroke: true,

	  		// @option color: String = '#3388ff'
	  		// Stroke color
	  		color: '#3388ff',

	  		// @option weight: Number = 3
	  		// Stroke width in pixels
	  		weight: 3,

	  		// @option opacity: Number = 1.0
	  		// Stroke opacity
	  		opacity: 1,

	  		// @option lineCap: String= 'round'
	  		// A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
	  		lineCap: 'round',

	  		// @option lineJoin: String = 'round'
	  		// A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
	  		lineJoin: 'round',

	  		// @option dashArray: String = null
	  		// A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
	  		dashArray: null,

	  		// @option dashOffset: String = null
	  		// A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
	  		dashOffset: null,

	  		// @option fill: Boolean = depends
	  		// Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
	  		fill: false,

	  		// @option fillColor: String = *
	  		// Fill color. Defaults to the value of the [`color`](#path-color) option
	  		fillColor: null,

	  		// @option fillOpacity: Number = 0.2
	  		// Fill opacity.
	  		fillOpacity: 0.2,

	  		// @option fillRule: String = 'evenodd'
	  		// A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
	  		fillRule: 'evenodd',

	  		// className: '',

	  		// Option inherited from "Interactive layer" abstract class
	  		interactive: true,

	  		// @option bubblingMouseEvents: Boolean = true
	  		// When `true`, a mouse event on this path will trigger the same event on the map
	  		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
	  		bubblingMouseEvents: true
	  	},

	  	beforeAdd: function (map) {
	  		// Renderer is set here because we need to call renderer.getEvents
	  		// before this.getEvents.
	  		this._renderer = map.getRenderer(this);
	  	},

	  	onAdd: function () {
	  		this._renderer._initPath(this);
	  		this._reset();
	  		this._renderer._addPath(this);
	  	},

	  	onRemove: function () {
	  		this._renderer._removePath(this);
	  	},

	  	// @method redraw(): this
	  	// Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
	  	redraw: function () {
	  		if (this._map) {
	  			this._renderer._updatePath(this);
	  		}
	  		return this;
	  	},

	  	// @method setStyle(style: Path options): this
	  	// Changes the appearance of a Path based on the options in the `Path options` object.
	  	setStyle: function (style) {
	  		setOptions(this, style);
	  		if (this._renderer) {
	  			this._renderer._updateStyle(this);
	  			if (this.options.stroke && style && Object.prototype.hasOwnProperty.call(style, 'weight')) {
	  				this._updateBounds();
	  			}
	  		}
	  		return this;
	  	},

	  	// @method bringToFront(): this
	  	// Brings the layer to the top of all path layers.
	  	bringToFront: function () {
	  		if (this._renderer) {
	  			this._renderer._bringToFront(this);
	  		}
	  		return this;
	  	},

	  	// @method bringToBack(): this
	  	// Brings the layer to the bottom of all path layers.
	  	bringToBack: function () {
	  		if (this._renderer) {
	  			this._renderer._bringToBack(this);
	  		}
	  		return this;
	  	},

	  	getElement: function () {
	  		return this._path;
	  	},

	  	_reset: function () {
	  		// defined in child classes
	  		this._project();
	  		this._update();
	  	},

	  	_clickTolerance: function () {
	  		// used when doing hit detection for Canvas layers
	  		return (this.options.stroke ? this.options.weight / 2 : 0) +
	  		  (this._renderer.options.tolerance || 0);
	  	}
	  });

	  /*
	   * @class CircleMarker
	   * @aka L.CircleMarker
	   * @inherits Path
	   *
	   * A circle of a fixed size with radius specified in pixels. Extends `Path`.
	   */

	  var CircleMarker = Path.extend({

	  	// @section
	  	// @aka CircleMarker options
	  	options: {
	  		fill: true,

	  		// @option radius: Number = 10
	  		// Radius of the circle marker, in pixels
	  		radius: 10
	  	},

	  	initialize: function (latlng, options) {
	  		setOptions(this, options);
	  		this._latlng = toLatLng(latlng);
	  		this._radius = this.options.radius;
	  	},

	  	// @method setLatLng(latLng: LatLng): this
	  	// Sets the position of a circle marker to a new location.
	  	setLatLng: function (latlng) {
	  		var oldLatLng = this._latlng;
	  		this._latlng = toLatLng(latlng);
	  		this.redraw();

	  		// @event move: Event
	  		// Fired when the marker is moved via [`setLatLng`](#circlemarker-setlatlng). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
	  		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
	  	},

	  	// @method getLatLng(): LatLng
	  	// Returns the current geographical position of the circle marker
	  	getLatLng: function () {
	  		return this._latlng;
	  	},

	  	// @method setRadius(radius: Number): this
	  	// Sets the radius of a circle marker. Units are in pixels.
	  	setRadius: function (radius) {
	  		this.options.radius = this._radius = radius;
	  		return this.redraw();
	  	},

	  	// @method getRadius(): Number
	  	// Returns the current radius of the circle
	  	getRadius: function () {
	  		return this._radius;
	  	},

	  	setStyle : function (options) {
	  		var radius = options && options.radius || this._radius;
	  		Path.prototype.setStyle.call(this, options);
	  		this.setRadius(radius);
	  		return this;
	  	},

	  	_project: function () {
	  		this._point = this._map.latLngToLayerPoint(this._latlng);
	  		this._updateBounds();
	  	},

	  	_updateBounds: function () {
	  		var r = this._radius,
	  		    r2 = this._radiusY || r,
	  		    w = this._clickTolerance(),
	  		    p = [r + w, r2 + w];
	  		this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
	  	},

	  	_update: function () {
	  		if (this._map) {
	  			this._updatePath();
	  		}
	  	},

	  	_updatePath: function () {
	  		this._renderer._updateCircle(this);
	  	},

	  	_empty: function () {
	  		return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
	  	},

	  	// Needed by the `Canvas` renderer for interactivity
	  	_containsPoint: function (p) {
	  		return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
	  	}
	  });


	  // @factory L.circleMarker(latlng: LatLng, options?: CircleMarker options)
	  // Instantiates a circle marker object given a geographical point, and an optional options object.
	  function circleMarker(latlng, options) {
	  	return new CircleMarker(latlng, options);
	  }

	  /*
	   * @class Circle
	   * @aka L.Circle
	   * @inherits CircleMarker
	   *
	   * A class for drawing circle overlays on a map. Extends `CircleMarker`.
	   *
	   * It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion).
	   *
	   * @example
	   *
	   * ```js
	   * L.circle([50.5, 30.5], {radius: 200}).addTo(map);
	   * ```
	   */

	  var Circle = CircleMarker.extend({

	  	initialize: function (latlng, options, legacyOptions) {
	  		if (typeof options === 'number') {
	  			// Backwards compatibility with 0.7.x factory (latlng, radius, options?)
	  			options = extend({}, legacyOptions, {radius: options});
	  		}
	  		setOptions(this, options);
	  		this._latlng = toLatLng(latlng);

	  		if (isNaN(this.options.radius)) { throw new Error('Circle radius cannot be NaN'); }

	  		// @section
	  		// @aka Circle options
	  		// @option radius: Number; Radius of the circle, in meters.
	  		this._mRadius = this.options.radius;
	  	},

	  	// @method setRadius(radius: Number): this
	  	// Sets the radius of a circle. Units are in meters.
	  	setRadius: function (radius) {
	  		this._mRadius = radius;
	  		return this.redraw();
	  	},

	  	// @method getRadius(): Number
	  	// Returns the current radius of a circle. Units are in meters.
	  	getRadius: function () {
	  		return this._mRadius;
	  	},

	  	// @method getBounds(): LatLngBounds
	  	// Returns the `LatLngBounds` of the path.
	  	getBounds: function () {
	  		var half = [this._radius, this._radiusY || this._radius];

	  		return new LatLngBounds(
	  			this._map.layerPointToLatLng(this._point.subtract(half)),
	  			this._map.layerPointToLatLng(this._point.add(half)));
	  	},

	  	setStyle: Path.prototype.setStyle,

	  	_project: function () {

	  		var lng = this._latlng.lng,
	  		    lat = this._latlng.lat,
	  		    map = this._map,
	  		    crs = map.options.crs;

	  		if (crs.distance === Earth.distance) {
	  			var d = Math.PI / 180,
	  			    latR = (this._mRadius / Earth.R) / d,
	  			    top = map.project([lat + latR, lng]),
	  			    bottom = map.project([lat - latR, lng]),
	  			    p = top.add(bottom).divideBy(2),
	  			    lat2 = map.unproject(p).lat,
	  			    lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) /
	  			            (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;

	  			if (isNaN(lngR) || lngR === 0) {
	  				lngR = latR / Math.cos(Math.PI / 180 * lat); // Fallback for edge case, #2425
	  			}

	  			this._point = p.subtract(map.getPixelOrigin());
	  			this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
	  			this._radiusY = p.y - top.y;

	  		} else {
	  			var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));

	  			this._point = map.latLngToLayerPoint(this._latlng);
	  			this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
	  		}

	  		this._updateBounds();
	  	}
	  });

	  // @factory L.circle(latlng: LatLng, options?: Circle options)
	  // Instantiates a circle object given a geographical point, and an options object
	  // which contains the circle radius.
	  // @alternative
	  // @factory L.circle(latlng: LatLng, radius: Number, options?: Circle options)
	  // Obsolete way of instantiating a circle, for compatibility with 0.7.x code.
	  // Do not use in new applications or plugins.
	  function circle(latlng, options, legacyOptions) {
	  	return new Circle(latlng, options, legacyOptions);
	  }

	  /*
	   * @class Polyline
	   * @aka L.Polyline
	   * @inherits Path
	   *
	   * A class for drawing polyline overlays on a map. Extends `Path`.
	   *
	   * @example
	   *
	   * ```js
	   * // create a red polyline from an array of LatLng points
	   * var latlngs = [
	   * 	[45.51, -122.68],
	   * 	[37.77, -122.43],
	   * 	[34.04, -118.2]
	   * ];
	   *
	   * var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
	   *
	   * // zoom the map to the polyline
	   * map.fitBounds(polyline.getBounds());
	   * ```
	   *
	   * You can also pass a multi-dimensional array to represent a `MultiPolyline` shape:
	   *
	   * ```js
	   * // create a red polyline from an array of arrays of LatLng points
	   * var latlngs = [
	   * 	[[45.51, -122.68],
	   * 	 [37.77, -122.43],
	   * 	 [34.04, -118.2]],
	   * 	[[40.78, -73.91],
	   * 	 [41.83, -87.62],
	   * 	 [32.76, -96.72]]
	   * ];
	   * ```
	   */


	  var Polyline = Path.extend({

	  	// @section
	  	// @aka Polyline options
	  	options: {
	  		// @option smoothFactor: Number = 1.0
	  		// How much to simplify the polyline on each zoom level. More means
	  		// better performance and smoother look, and less means more accurate representation.
	  		smoothFactor: 1.0,

	  		// @option noClip: Boolean = false
	  		// Disable polyline clipping.
	  		noClip: false
	  	},

	  	initialize: function (latlngs, options) {
	  		setOptions(this, options);
	  		this._setLatLngs(latlngs);
	  	},

	  	// @method getLatLngs(): LatLng[]
	  	// Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
	  	getLatLngs: function () {
	  		return this._latlngs;
	  	},

	  	// @method setLatLngs(latlngs: LatLng[]): this
	  	// Replaces all the points in the polyline with the given array of geographical points.
	  	setLatLngs: function (latlngs) {
	  		this._setLatLngs(latlngs);
	  		return this.redraw();
	  	},

	  	// @method isEmpty(): Boolean
	  	// Returns `true` if the Polyline has no LatLngs.
	  	isEmpty: function () {
	  		return !this._latlngs.length;
	  	},

	  	// @method closestLayerPoint(p: Point): Point
	  	// Returns the point closest to `p` on the Polyline.
	  	closestLayerPoint: function (p) {
	  		var minDistance = Infinity,
	  		    minPoint = null,
	  		    closest = _sqClosestPointOnSegment,
	  		    p1, p2;

	  		for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
	  			var points = this._parts[j];

	  			for (var i = 1, len = points.length; i < len; i++) {
	  				p1 = points[i - 1];
	  				p2 = points[i];

	  				var sqDist = closest(p, p1, p2, true);

	  				if (sqDist < minDistance) {
	  					minDistance = sqDist;
	  					minPoint = closest(p, p1, p2);
	  				}
	  			}
	  		}
	  		if (minPoint) {
	  			minPoint.distance = Math.sqrt(minDistance);
	  		}
	  		return minPoint;
	  	},

	  	// @method getCenter(): LatLng
	  	// Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
	  	getCenter: function () {
	  		// throws error when not yet added to map as this center calculation requires projected coordinates
	  		if (!this._map) {
	  			throw new Error('Must add layer to map before using getCenter()');
	  		}
	  		return polylineCenter(this._defaultShape(), this._map.options.crs);
	  	},

	  	// @method getBounds(): LatLngBounds
	  	// Returns the `LatLngBounds` of the path.
	  	getBounds: function () {
	  		return this._bounds;
	  	},

	  	// @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
	  	// Adds a given point to the polyline. By default, adds to the first ring of
	  	// the polyline in case of a multi-polyline, but can be overridden by passing
	  	// a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
	  	addLatLng: function (latlng, latlngs) {
	  		latlngs = latlngs || this._defaultShape();
	  		latlng = toLatLng(latlng);
	  		latlngs.push(latlng);
	  		this._bounds.extend(latlng);
	  		return this.redraw();
	  	},

	  	_setLatLngs: function (latlngs) {
	  		this._bounds = new LatLngBounds();
	  		this._latlngs = this._convertLatLngs(latlngs);
	  	},

	  	_defaultShape: function () {
	  		return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
	  	},

	  	// recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
	  	_convertLatLngs: function (latlngs) {
	  		var result = [],
	  		    flat = isFlat(latlngs);

	  		for (var i = 0, len = latlngs.length; i < len; i++) {
	  			if (flat) {
	  				result[i] = toLatLng(latlngs[i]);
	  				this._bounds.extend(result[i]);
	  			} else {
	  				result[i] = this._convertLatLngs(latlngs[i]);
	  			}
	  		}

	  		return result;
	  	},

	  	_project: function () {
	  		var pxBounds = new Bounds();
	  		this._rings = [];
	  		this._projectLatlngs(this._latlngs, this._rings, pxBounds);

	  		if (this._bounds.isValid() && pxBounds.isValid()) {
	  			this._rawPxBounds = pxBounds;
	  			this._updateBounds();
	  		}
	  	},

	  	_updateBounds: function () {
	  		var w = this._clickTolerance(),
	  		    p = new Point(w, w);

	  		if (!this._rawPxBounds) {
	  			return;
	  		}

	  		this._pxBounds = new Bounds([
	  			this._rawPxBounds.min.subtract(p),
	  			this._rawPxBounds.max.add(p)
	  		]);
	  	},

	  	// recursively turns latlngs into a set of rings with projected coordinates
	  	_projectLatlngs: function (latlngs, result, projectedBounds) {
	  		var flat = latlngs[0] instanceof LatLng,
	  		    len = latlngs.length,
	  		    i, ring;

	  		if (flat) {
	  			ring = [];
	  			for (i = 0; i < len; i++) {
	  				ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
	  				projectedBounds.extend(ring[i]);
	  			}
	  			result.push(ring);
	  		} else {
	  			for (i = 0; i < len; i++) {
	  				this._projectLatlngs(latlngs[i], result, projectedBounds);
	  			}
	  		}
	  	},

	  	// clip polyline by renderer bounds so that we have less to render for performance
	  	_clipPoints: function () {
	  		var bounds = this._renderer._bounds;

	  		this._parts = [];
	  		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
	  			return;
	  		}

	  		if (this.options.noClip) {
	  			this._parts = this._rings;
	  			return;
	  		}

	  		var parts = this._parts,
	  		    i, j, k, len, len2, segment, points;

	  		for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
	  			points = this._rings[i];

	  			for (j = 0, len2 = points.length; j < len2 - 1; j++) {
	  				segment = clipSegment(points[j], points[j + 1], bounds, j, true);

	  				if (!segment) { continue; }

	  				parts[k] = parts[k] || [];
	  				parts[k].push(segment[0]);

	  				// if segment goes out of screen, or it's the last one, it's the end of the line part
	  				if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
	  					parts[k].push(segment[1]);
	  					k++;
	  				}
	  			}
	  		}
	  	},

	  	// simplify each clipped part of the polyline for performance
	  	_simplifyPoints: function () {
	  		var parts = this._parts,
	  		    tolerance = this.options.smoothFactor;

	  		for (var i = 0, len = parts.length; i < len; i++) {
	  			parts[i] = simplify(parts[i], tolerance);
	  		}
	  	},

	  	_update: function () {
	  		if (!this._map) { return; }

	  		this._clipPoints();
	  		this._simplifyPoints();
	  		this._updatePath();
	  	},

	  	_updatePath: function () {
	  		this._renderer._updatePoly(this);
	  	},

	  	// Needed by the `Canvas` renderer for interactivity
	  	_containsPoint: function (p, closed) {
	  		var i, j, k, len, len2, part,
	  		    w = this._clickTolerance();

	  		if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

	  		// hit detection for polylines
	  		for (i = 0, len = this._parts.length; i < len; i++) {
	  			part = this._parts[i];

	  			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
	  				if (!closed && (j === 0)) { continue; }

	  				if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
	  					return true;
	  				}
	  			}
	  		}
	  		return false;
	  	}
	  });

	  // @factory L.polyline(latlngs: LatLng[], options?: Polyline options)
	  // Instantiates a polyline object given an array of geographical points and
	  // optionally an options object. You can create a `Polyline` object with
	  // multiple separate lines (`MultiPolyline`) by passing an array of arrays
	  // of geographic points.
	  function polyline(latlngs, options) {
	  	return new Polyline(latlngs, options);
	  }

	  // Retrocompat. Allow plugins to support Leaflet versions before and after 1.1.
	  Polyline._flat = _flat;

	  /*
	   * @class Polygon
	   * @aka L.Polygon
	   * @inherits Polyline
	   *
	   * A class for drawing polygon overlays on a map. Extends `Polyline`.
	   *
	   * Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one — it's better to filter out such points.
	   *
	   *
	   * @example
	   *
	   * ```js
	   * // create a red polygon from an array of LatLng points
	   * var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
	   *
	   * var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
	   *
	   * // zoom the map to the polygon
	   * map.fitBounds(polygon.getBounds());
	   * ```
	   *
	   * You can also pass an array of arrays of latlngs, with the first array representing the outer shape and the other arrays representing holes in the outer shape:
	   *
	   * ```js
	   * var latlngs = [
	   *   [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
	   *   [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
	   * ];
	   * ```
	   *
	   * Additionally, you can pass a multi-dimensional array to represent a MultiPolygon shape.
	   *
	   * ```js
	   * var latlngs = [
	   *   [ // first polygon
	   *     [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
	   *     [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
	   *   ],
	   *   [ // second polygon
	   *     [[41, -111.03],[45, -111.04],[45, -104.05],[41, -104.05]]
	   *   ]
	   * ];
	   * ```
	   */

	  var Polygon = Polyline.extend({

	  	options: {
	  		fill: true
	  	},

	  	isEmpty: function () {
	  		return !this._latlngs.length || !this._latlngs[0].length;
	  	},

	  	// @method getCenter(): LatLng
	  	// Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
	  	getCenter: function () {
	  		// throws error when not yet added to map as this center calculation requires projected coordinates
	  		if (!this._map) {
	  			throw new Error('Must add layer to map before using getCenter()');
	  		}
	  		return polygonCenter(this._defaultShape(), this._map.options.crs);
	  	},

	  	_convertLatLngs: function (latlngs) {
	  		var result = Polyline.prototype._convertLatLngs.call(this, latlngs),
	  		    len = result.length;

	  		// remove last point if it equals first one
	  		if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
	  			result.pop();
	  		}
	  		return result;
	  	},

	  	_setLatLngs: function (latlngs) {
	  		Polyline.prototype._setLatLngs.call(this, latlngs);
	  		if (isFlat(this._latlngs)) {
	  			this._latlngs = [this._latlngs];
	  		}
	  	},

	  	_defaultShape: function () {
	  		return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
	  	},

	  	_clipPoints: function () {
	  		// polygons need a different clipping algorithm so we redefine that

	  		var bounds = this._renderer._bounds,
	  		    w = this.options.weight,
	  		    p = new Point(w, w);

	  		// increase clip padding by stroke width to avoid stroke on clip edges
	  		bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));

	  		this._parts = [];
	  		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
	  			return;
	  		}

	  		if (this.options.noClip) {
	  			this._parts = this._rings;
	  			return;
	  		}

	  		for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
	  			clipped = clipPolygon(this._rings[i], bounds, true);
	  			if (clipped.length) {
	  				this._parts.push(clipped);
	  			}
	  		}
	  	},

	  	_updatePath: function () {
	  		this._renderer._updatePoly(this, true);
	  	},

	  	// Needed by the `Canvas` renderer for interactivity
	  	_containsPoint: function (p) {
	  		var inside = false,
	  		    part, p1, p2, i, j, k, len, len2;

	  		if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

	  		// ray casting algorithm for detecting if point is in polygon
	  		for (i = 0, len = this._parts.length; i < len; i++) {
	  			part = this._parts[i];

	  			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
	  				p1 = part[j];
	  				p2 = part[k];

	  				if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
	  					inside = !inside;
	  				}
	  			}
	  		}

	  		// also check if it's on polygon stroke
	  		return inside || Polyline.prototype._containsPoint.call(this, p, true);
	  	}

	  });


	  // @factory L.polygon(latlngs: LatLng[], options?: Polyline options)
	  function polygon(latlngs, options) {
	  	return new Polygon(latlngs, options);
	  }

	  /*
	   * @class GeoJSON
	   * @aka L.GeoJSON
	   * @inherits FeatureGroup
	   *
	   * Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse
	   * GeoJSON data and display it on the map. Extends `FeatureGroup`.
	   *
	   * @example
	   *
	   * ```js
	   * L.geoJSON(data, {
	   * 	style: function (feature) {
	   * 		return {color: feature.properties.color};
	   * 	}
	   * }).bindPopup(function (layer) {
	   * 	return layer.feature.properties.description;
	   * }).addTo(map);
	   * ```
	   */

	  var GeoJSON = FeatureGroup.extend({

	  	/* @section
	  	 * @aka GeoJSON options
	  	 *
	  	 * @option pointToLayer: Function = *
	  	 * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
	  	 * called when data is added, passing the GeoJSON point feature and its `LatLng`.
	  	 * The default is to spawn a default `Marker`:
	  	 * ```js
	  	 * function(geoJsonPoint, latlng) {
	  	 * 	return L.marker(latlng);
	  	 * }
	  	 * ```
	  	 *
	  	 * @option style: Function = *
	  	 * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
	  	 * called internally when data is added.
	  	 * The default value is to not override any defaults:
	  	 * ```js
	  	 * function (geoJsonFeature) {
	  	 * 	return {}
	  	 * }
	  	 * ```
	  	 *
	  	 * @option onEachFeature: Function = *
	  	 * A `Function` that will be called once for each created `Feature`, after it has
	  	 * been created and styled. Useful for attaching events and popups to features.
	  	 * The default is to do nothing with the newly created layers:
	  	 * ```js
	  	 * function (feature, layer) {}
	  	 * ```
	  	 *
	  	 * @option filter: Function = *
	  	 * A `Function` that will be used to decide whether to include a feature or not.
	  	 * The default is to include all features:
	  	 * ```js
	  	 * function (geoJsonFeature) {
	  	 * 	return true;
	  	 * }
	  	 * ```
	  	 * Note: dynamically changing the `filter` option will have effect only on newly
	  	 * added data. It will _not_ re-evaluate already included features.
	  	 *
	  	 * @option coordsToLatLng: Function = *
	  	 * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
	  	 * The default is the `coordsToLatLng` static method.
	  	 *
	  	 * @option markersInheritOptions: Boolean = false
	  	 * Whether default Markers for "Point" type Features inherit from group options.
	  	 */

	  	initialize: function (geojson, options) {
	  		setOptions(this, options);

	  		this._layers = {};

	  		if (geojson) {
	  			this.addData(geojson);
	  		}
	  	},

	  	// @method addData( <GeoJSON> data ): this
	  	// Adds a GeoJSON object to the layer.
	  	addData: function (geojson) {
	  		var features = isArray(geojson) ? geojson : geojson.features,
	  		    i, len, feature;

	  		if (features) {
	  			for (i = 0, len = features.length; i < len; i++) {
	  				// only add this if geometry or geometries are set and not null
	  				feature = features[i];
	  				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
	  					this.addData(feature);
	  				}
	  			}
	  			return this;
	  		}

	  		var options = this.options;

	  		if (options.filter && !options.filter(geojson)) { return this; }

	  		var layer = geometryToLayer(geojson, options);
	  		if (!layer) {
	  			return this;
	  		}
	  		layer.feature = asFeature(geojson);

	  		layer.defaultOptions = layer.options;
	  		this.resetStyle(layer);

	  		if (options.onEachFeature) {
	  			options.onEachFeature(geojson, layer);
	  		}

	  		return this.addLayer(layer);
	  	},

	  	// @method resetStyle( <Path> layer? ): this
	  	// Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
	  	// If `layer` is omitted, the style of all features in the current layer is reset.
	  	resetStyle: function (layer) {
	  		if (layer === undefined) {
	  			return this.eachLayer(this.resetStyle, this);
	  		}
	  		// reset any custom styles
	  		layer.options = extend({}, layer.defaultOptions);
	  		this._setLayerStyle(layer, this.options.style);
	  		return this;
	  	},

	  	// @method setStyle( <Function> style ): this
	  	// Changes styles of GeoJSON vector layers with the given style function.
	  	setStyle: function (style) {
	  		return this.eachLayer(function (layer) {
	  			this._setLayerStyle(layer, style);
	  		}, this);
	  	},

	  	_setLayerStyle: function (layer, style) {
	  		if (layer.setStyle) {
	  			if (typeof style === 'function') {
	  				style = style(layer.feature);
	  			}
	  			layer.setStyle(style);
	  		}
	  	}
	  });

	  // @section
	  // There are several static functions which can be called without instantiating L.GeoJSON:

	  // @function geometryToLayer(featureData: Object, options?: GeoJSON options): Layer
	  // Creates a `Layer` from a given GeoJSON feature. Can use a custom
	  // [`pointToLayer`](#geojson-pointtolayer) and/or [`coordsToLatLng`](#geojson-coordstolatlng)
	  // functions if provided as options.
	  function geometryToLayer(geojson, options) {

	  	var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
	  	    coords = geometry ? geometry.coordinates : null,
	  	    layers = [],
	  	    pointToLayer = options && options.pointToLayer,
	  	    _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng,
	  	    latlng, latlngs, i, len;

	  	if (!coords && !geometry) {
	  		return null;
	  	}

	  	switch (geometry.type) {
	  	case 'Point':
	  		latlng = _coordsToLatLng(coords);
	  		return _pointToLayer(pointToLayer, geojson, latlng, options);

	  	case 'MultiPoint':
	  		for (i = 0, len = coords.length; i < len; i++) {
	  			latlng = _coordsToLatLng(coords[i]);
	  			layers.push(_pointToLayer(pointToLayer, geojson, latlng, options));
	  		}
	  		return new FeatureGroup(layers);

	  	case 'LineString':
	  	case 'MultiLineString':
	  		latlngs = coordsToLatLngs(coords, geometry.type === 'LineString' ? 0 : 1, _coordsToLatLng);
	  		return new Polyline(latlngs, options);

	  	case 'Polygon':
	  	case 'MultiPolygon':
	  		latlngs = coordsToLatLngs(coords, geometry.type === 'Polygon' ? 1 : 2, _coordsToLatLng);
	  		return new Polygon(latlngs, options);

	  	case 'GeometryCollection':
	  		for (i = 0, len = geometry.geometries.length; i < len; i++) {
	  			var geoLayer = geometryToLayer({
	  				geometry: geometry.geometries[i],
	  				type: 'Feature',
	  				properties: geojson.properties
	  			}, options);

	  			if (geoLayer) {
	  				layers.push(geoLayer);
	  			}
	  		}
	  		return new FeatureGroup(layers);

	  	case 'FeatureCollection':
	  		for (i = 0, len = geometry.features.length; i < len; i++) {
	  			var featureLayer = geometryToLayer(geometry.features[i], options);

	  			if (featureLayer) {
	  				layers.push(featureLayer);
	  			}
	  		}
	  		return new FeatureGroup(layers);

	  	default:
	  		throw new Error('Invalid GeoJSON object.');
	  	}
	  }

	  function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
	  	return pointToLayerFn ?
	  		pointToLayerFn(geojson, latlng) :
	  		new Marker(latlng, options && options.markersInheritOptions && options);
	  }

	  // @function coordsToLatLng(coords: Array): LatLng
	  // Creates a `LatLng` object from an array of 2 numbers (longitude, latitude)
	  // or 3 numbers (longitude, latitude, altitude) used in GeoJSON for points.
	  function coordsToLatLng(coords) {
	  	return new LatLng(coords[1], coords[0], coords[2]);
	  }

	  // @function coordsToLatLngs(coords: Array, levelsDeep?: Number, coordsToLatLng?: Function): Array
	  // Creates a multidimensional array of `LatLng`s from a GeoJSON coordinates array.
	  // `levelsDeep` specifies the nesting level (0 is for an array of points, 1 for an array of arrays of points, etc., 0 by default).
	  // Can use a custom [`coordsToLatLng`](#geojson-coordstolatlng) function.
	  function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
	  	var latlngs = [];

	  	for (var i = 0, len = coords.length, latlng; i < len; i++) {
	  		latlng = levelsDeep ?
	  			coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) :
	  			(_coordsToLatLng || coordsToLatLng)(coords[i]);

	  		latlngs.push(latlng);
	  	}

	  	return latlngs;
	  }

	  // @function latLngToCoords(latlng: LatLng, precision?: Number|false): Array
	  // Reverse of [`coordsToLatLng`](#geojson-coordstolatlng)
	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function.
	  function latLngToCoords(latlng, precision) {
	  	latlng = toLatLng(latlng);
	  	return latlng.alt !== undefined ?
	  		[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] :
	  		[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
	  }

	  // @function latLngsToCoords(latlngs: Array, levelsDeep?: Number, closed?: Boolean, precision?: Number|false): Array
	  // Reverse of [`coordsToLatLngs`](#geojson-coordstolatlngs)
	  // `closed` determines whether the first point should be appended to the end of the array to close the feature, only used when `levelsDeep` is 0. False by default.
	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function.
	  function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
	  	var coords = [];

	  	for (var i = 0, len = latlngs.length; i < len; i++) {
	  		// Check for flat arrays required to ensure unbalanced arrays are correctly converted in recursion
	  		coords.push(levelsDeep ?
	  			latLngsToCoords(latlngs[i], isFlat(latlngs[i]) ? 0 : levelsDeep - 1, closed, precision) :
	  			latLngToCoords(latlngs[i], precision));
	  	}

	  	if (!levelsDeep && closed && coords.length > 0) {
	  		coords.push(coords[0].slice());
	  	}

	  	return coords;
	  }

	  function getFeature(layer, newGeometry) {
	  	return layer.feature ?
	  		extend({}, layer.feature, {geometry: newGeometry}) :
	  		asFeature(newGeometry);
	  }

	  // @function asFeature(geojson: Object): Object
	  // Normalize GeoJSON geometries/features into GeoJSON features.
	  function asFeature(geojson) {
	  	if (geojson.type === 'Feature' || geojson.type === 'FeatureCollection') {
	  		return geojson;
	  	}

	  	return {
	  		type: 'Feature',
	  		properties: {},
	  		geometry: geojson
	  	};
	  }

	  var PointToGeoJSON = {
	  	toGeoJSON: function (precision) {
	  		return getFeature(this, {
	  			type: 'Point',
	  			coordinates: latLngToCoords(this.getLatLng(), precision)
	  		});
	  	}
	  };

	  // @namespace Marker
	  // @section Other methods
	  // @method toGeoJSON(precision?: Number|false): Object
	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
	  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the marker (as a GeoJSON `Point` Feature).
	  Marker.include(PointToGeoJSON);

	  // @namespace CircleMarker
	  // @method toGeoJSON(precision?: Number|false): Object
	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
	  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the circle marker (as a GeoJSON `Point` Feature).
	  Circle.include(PointToGeoJSON);
	  CircleMarker.include(PointToGeoJSON);


	  // @namespace Polyline
	  // @method toGeoJSON(precision?: Number|false): Object
	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
	  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the polyline (as a GeoJSON `LineString` or `MultiLineString` Feature).
	  Polyline.include({
	  	toGeoJSON: function (precision) {
	  		var multi = !isFlat(this._latlngs);

	  		var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);

	  		return getFeature(this, {
	  			type: (multi ? 'Multi' : '') + 'LineString',
	  			coordinates: coords
	  		});
	  	}
	  });

	  // @namespace Polygon
	  // @method toGeoJSON(precision?: Number|false): Object
	  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
	  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the polygon (as a GeoJSON `Polygon` or `MultiPolygon` Feature).
	  Polygon.include({
	  	toGeoJSON: function (precision) {
	  		var holes = !isFlat(this._latlngs),
	  		    multi = holes && !isFlat(this._latlngs[0]);

	  		var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);

	  		if (!holes) {
	  			coords = [coords];
	  		}

	  		return getFeature(this, {
	  			type: (multi ? 'Multi' : '') + 'Polygon',
	  			coordinates: coords
	  		});
	  	}
	  });


	  // @namespace LayerGroup
	  LayerGroup.include({
	  	toMultiPoint: function (precision) {
	  		var coords = [];

	  		this.eachLayer(function (layer) {
	  			coords.push(layer.toGeoJSON(precision).geometry.coordinates);
	  		});

	  		return getFeature(this, {
	  			type: 'MultiPoint',
	  			coordinates: coords
	  		});
	  	},

	  	// @method toGeoJSON(precision?: Number|false): Object
	  	// Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
	  	// Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
	  	toGeoJSON: function (precision) {

	  		var type = this.feature && this.feature.geometry && this.feature.geometry.type;

	  		if (type === 'MultiPoint') {
	  			return this.toMultiPoint(precision);
	  		}

	  		var isGeometryCollection = type === 'GeometryCollection',
	  		    jsons = [];

	  		this.eachLayer(function (layer) {
	  			if (layer.toGeoJSON) {
	  				var json = layer.toGeoJSON(precision);
	  				if (isGeometryCollection) {
	  					jsons.push(json.geometry);
	  				} else {
	  					var feature = asFeature(json);
	  					// Squash nested feature collections
	  					if (feature.type === 'FeatureCollection') {
	  						jsons.push.apply(jsons, feature.features);
	  					} else {
	  						jsons.push(feature);
	  					}
	  				}
	  			}
	  		});

	  		if (isGeometryCollection) {
	  			return getFeature(this, {
	  				geometries: jsons,
	  				type: 'GeometryCollection'
	  			});
	  		}

	  		return {
	  			type: 'FeatureCollection',
	  			features: jsons
	  		};
	  	}
	  });

	  // @namespace GeoJSON
	  // @factory L.geoJSON(geojson?: Object, options?: GeoJSON options)
	  // Creates a GeoJSON layer. Optionally accepts an object in
	  // [GeoJSON format](https://tools.ietf.org/html/rfc7946) to display on the map
	  // (you can alternatively add it later with `addData` method) and an `options` object.
	  function geoJSON(geojson, options) {
	  	return new GeoJSON(geojson, options);
	  }

	  // Backward compatibility.
	  var geoJson = geoJSON;

	  /*
	   * @class ImageOverlay
	   * @aka L.ImageOverlay
	   * @inherits Interactive layer
	   *
	   * Used to load and display a single image over specific bounds of the map. Extends `Layer`.
	   *
	   * @example
	   *
	   * ```js
	   * var imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
	   * 	imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
	   * L.imageOverlay(imageUrl, imageBounds).addTo(map);
	   * ```
	   */

	  var ImageOverlay = Layer.extend({

	  	// @section
	  	// @aka ImageOverlay options
	  	options: {
	  		// @option opacity: Number = 1.0
	  		// The opacity of the image overlay.
	  		opacity: 1,

	  		// @option alt: String = ''
	  		// Text for the `alt` attribute of the image (useful for accessibility).
	  		alt: '',

	  		// @option interactive: Boolean = false
	  		// If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
	  		interactive: false,

	  		// @option crossOrigin: Boolean|String = false
	  		// Whether the crossOrigin attribute will be added to the image.
	  		// If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
	  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
	  		crossOrigin: false,

	  		// @option errorOverlayUrl: String = ''
	  		// URL to the overlay image to show in place of the overlay that failed to load.
	  		errorOverlayUrl: '',

	  		// @option zIndex: Number = 1
	  		// The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
	  		zIndex: 1,

	  		// @option className: String = ''
	  		// A custom class name to assign to the image. Empty by default.
	  		className: ''
	  	},

	  	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
	  		this._url = url;
	  		this._bounds = toLatLngBounds(bounds);

	  		setOptions(this, options);
	  	},

	  	onAdd: function () {
	  		if (!this._image) {
	  			this._initImage();

	  			if (this.options.opacity < 1) {
	  				this._updateOpacity();
	  			}
	  		}

	  		if (this.options.interactive) {
	  			addClass(this._image, 'leaflet-interactive');
	  			this.addInteractiveTarget(this._image);
	  		}

	  		this.getPane().appendChild(this._image);
	  		this._reset();
	  	},

	  	onRemove: function () {
	  		remove(this._image);
	  		if (this.options.interactive) {
	  			this.removeInteractiveTarget(this._image);
	  		}
	  	},

	  	// @method setOpacity(opacity: Number): this
	  	// Sets the opacity of the overlay.
	  	setOpacity: function (opacity) {
	  		this.options.opacity = opacity;

	  		if (this._image) {
	  			this._updateOpacity();
	  		}
	  		return this;
	  	},

	  	setStyle: function (styleOpts) {
	  		if (styleOpts.opacity) {
	  			this.setOpacity(styleOpts.opacity);
	  		}
	  		return this;
	  	},

	  	// @method bringToFront(): this
	  	// Brings the layer to the top of all overlays.
	  	bringToFront: function () {
	  		if (this._map) {
	  			toFront(this._image);
	  		}
	  		return this;
	  	},

	  	// @method bringToBack(): this
	  	// Brings the layer to the bottom of all overlays.
	  	bringToBack: function () {
	  		if (this._map) {
	  			toBack(this._image);
	  		}
	  		return this;
	  	},

	  	// @method setUrl(url: String): this
	  	// Changes the URL of the image.
	  	setUrl: function (url) {
	  		this._url = url;

	  		if (this._image) {
	  			this._image.src = url;
	  		}
	  		return this;
	  	},

	  	// @method setBounds(bounds: LatLngBounds): this
	  	// Update the bounds that this ImageOverlay covers
	  	setBounds: function (bounds) {
	  		this._bounds = toLatLngBounds(bounds);

	  		if (this._map) {
	  			this._reset();
	  		}
	  		return this;
	  	},

	  	getEvents: function () {
	  		var events = {
	  			zoom: this._reset,
	  			viewreset: this._reset
	  		};

	  		if (this._zoomAnimated) {
	  			events.zoomanim = this._animateZoom;
	  		}

	  		return events;
	  	},

	  	// @method setZIndex(value: Number): this
	  	// Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
	  	setZIndex: function (value) {
	  		this.options.zIndex = value;
	  		this._updateZIndex();
	  		return this;
	  	},

	  	// @method getBounds(): LatLngBounds
	  	// Get the bounds that this ImageOverlay covers
	  	getBounds: function () {
	  		return this._bounds;
	  	},

	  	// @method getElement(): HTMLElement
	  	// Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
	  	// used by this overlay.
	  	getElement: function () {
	  		return this._image;
	  	},

	  	_initImage: function () {
	  		var wasElementSupplied = this._url.tagName === 'IMG';
	  		var img = this._image = wasElementSupplied ? this._url : create$1('img');

	  		addClass(img, 'leaflet-image-layer');
	  		if (this._zoomAnimated) { addClass(img, 'leaflet-zoom-animated'); }
	  		if (this.options.className) { addClass(img, this.options.className); }

	  		img.onselectstart = falseFn;
	  		img.onmousemove = falseFn;

	  		// @event load: Event
	  		// Fired when the ImageOverlay layer has loaded its image
	  		img.onload = bind(this.fire, this, 'load');
	  		img.onerror = bind(this._overlayOnError, this, 'error');

	  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
	  			img.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
	  		}

	  		if (this.options.zIndex) {
	  			this._updateZIndex();
	  		}

	  		if (wasElementSupplied) {
	  			this._url = img.src;
	  			return;
	  		}

	  		img.src = this._url;
	  		img.alt = this.options.alt;
	  	},

	  	_animateZoom: function (e) {
	  		var scale = this._map.getZoomScale(e.zoom),
	  		    offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;

	  		setTransform(this._image, offset, scale);
	  	},

	  	_reset: function () {
	  		var image = this._image,
	  		    bounds = new Bounds(
	  		        this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
	  		        this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
	  		    size = bounds.getSize();

	  		setPosition(image, bounds.min);

	  		image.style.width  = size.x + 'px';
	  		image.style.height = size.y + 'px';
	  	},

	  	_updateOpacity: function () {
	  		setOpacity(this._image, this.options.opacity);
	  	},

	  	_updateZIndex: function () {
	  		if (this._image && this.options.zIndex !== undefined && this.options.zIndex !== null) {
	  			this._image.style.zIndex = this.options.zIndex;
	  		}
	  	},

	  	_overlayOnError: function () {
	  		// @event error: Event
	  		// Fired when the ImageOverlay layer fails to load its image
	  		this.fire('error');

	  		var errorUrl = this.options.errorOverlayUrl;
	  		if (errorUrl && this._url !== errorUrl) {
	  			this._url = errorUrl;
	  			this._image.src = errorUrl;
	  		}
	  	},

	  	// @method getCenter(): LatLng
	  	// Returns the center of the ImageOverlay.
	  	getCenter: function () {
	  		return this._bounds.getCenter();
	  	}
	  });

	  // @factory L.imageOverlay(imageUrl: String, bounds: LatLngBounds, options?: ImageOverlay options)
	  // Instantiates an image overlay object given the URL of the image and the
	  // geographical bounds it is tied to.
	  var imageOverlay = function (url, bounds, options) {
	  	return new ImageOverlay(url, bounds, options);
	  };

	  /*
	   * @class VideoOverlay
	   * @aka L.VideoOverlay
	   * @inherits ImageOverlay
	   *
	   * Used to load and display a video player over specific bounds of the map. Extends `ImageOverlay`.
	   *
	   * A video overlay uses the [`<video>`](https://developer.mozilla.org/docs/Web/HTML/Element/video)
	   * HTML5 element.
	   *
	   * @example
	   *
	   * ```js
	   * var videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
	   * 	videoBounds = [[ 32, -130], [ 13, -100]];
	   * L.videoOverlay(videoUrl, videoBounds ).addTo(map);
	   * ```
	   */

	  var VideoOverlay = ImageOverlay.extend({

	  	// @section
	  	// @aka VideoOverlay options
	  	options: {
	  		// @option autoplay: Boolean = true
	  		// Whether the video starts playing automatically when loaded.
	  		// On some browsers autoplay will only work with `muted: true`
	  		autoplay: true,

	  		// @option loop: Boolean = true
	  		// Whether the video will loop back to the beginning when played.
	  		loop: true,

	  		// @option keepAspectRatio: Boolean = true
	  		// Whether the video will save aspect ratio after the projection.
	  		// Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
	  		keepAspectRatio: true,

	  		// @option muted: Boolean = false
	  		// Whether the video starts on mute when loaded.
	  		muted: false,

	  		// @option playsInline: Boolean = true
	  		// Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
	  		playsInline: true
	  	},

	  	_initImage: function () {
	  		var wasElementSupplied = this._url.tagName === 'VIDEO';
	  		var vid = this._image = wasElementSupplied ? this._url : create$1('video');

	  		addClass(vid, 'leaflet-image-layer');
	  		if (this._zoomAnimated) { addClass(vid, 'leaflet-zoom-animated'); }
	  		if (this.options.className) { addClass(vid, this.options.className); }

	  		vid.onselectstart = falseFn;
	  		vid.onmousemove = falseFn;

	  		// @event load: Event
	  		// Fired when the video has finished loading the first frame
	  		vid.onloadeddata = bind(this.fire, this, 'load');

	  		if (wasElementSupplied) {
	  			var sourceElements = vid.getElementsByTagName('source');
	  			var sources = [];
	  			for (var j = 0; j < sourceElements.length; j++) {
	  				sources.push(sourceElements[j].src);
	  			}

	  			this._url = (sourceElements.length > 0) ? sources : [vid.src];
	  			return;
	  		}

	  		if (!isArray(this._url)) { this._url = [this._url]; }

	  		if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, 'objectFit')) {
	  			vid.style['objectFit'] = 'fill';
	  		}
	  		vid.autoplay = !!this.options.autoplay;
	  		vid.loop = !!this.options.loop;
	  		vid.muted = !!this.options.muted;
	  		vid.playsInline = !!this.options.playsInline;
	  		for (var i = 0; i < this._url.length; i++) {
	  			var source = create$1('source');
	  			source.src = this._url[i];
	  			vid.appendChild(source);
	  		}
	  	}

	  	// @method getElement(): HTMLVideoElement
	  	// Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
	  	// used by this overlay.
	  });


	  // @factory L.videoOverlay(video: String|Array|HTMLVideoElement, bounds: LatLngBounds, options?: VideoOverlay options)
	  // Instantiates an image overlay object given the URL of the video (or array of URLs, or even a video element) and the
	  // geographical bounds it is tied to.

	  function videoOverlay(video, bounds, options) {
	  	return new VideoOverlay(video, bounds, options);
	  }

	  /*
	   * @class SVGOverlay
	   * @aka L.SVGOverlay
	   * @inherits ImageOverlay
	   *
	   * Used to load, display and provide DOM access to an SVG file over specific bounds of the map. Extends `ImageOverlay`.
	   *
	   * An SVG overlay uses the [`<svg>`](https://developer.mozilla.org/docs/Web/SVG/Element/svg) element.
	   *
	   * @example
	   *
	   * ```js
	   * var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	   * svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
	   * svgElement.setAttribute('viewBox', "0 0 200 200");
	   * svgElement.innerHTML = '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';
	   * var svgElementBounds = [ [ 32, -130 ], [ 13, -100 ] ];
	   * L.svgOverlay(svgElement, svgElementBounds).addTo(map);
	   * ```
	   */

	  var SVGOverlay = ImageOverlay.extend({
	  	_initImage: function () {
	  		var el = this._image = this._url;

	  		addClass(el, 'leaflet-image-layer');
	  		if (this._zoomAnimated) { addClass(el, 'leaflet-zoom-animated'); }
	  		if (this.options.className) { addClass(el, this.options.className); }

	  		el.onselectstart = falseFn;
	  		el.onmousemove = falseFn;
	  	}

	  	// @method getElement(): SVGElement
	  	// Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
	  	// used by this overlay.
	  });


	  // @factory L.svgOverlay(svg: String|SVGElement, bounds: LatLngBounds, options?: SVGOverlay options)
	  // Instantiates an image overlay object given an SVG element and the geographical bounds it is tied to.
	  // A viewBox attribute is required on the SVG element to zoom in and out properly.

	  function svgOverlay(el, bounds, options) {
	  	return new SVGOverlay(el, bounds, options);
	  }

	  /*
	   * @class DivOverlay
	   * @inherits Interactive layer
	   * @aka L.DivOverlay
	   * Base model for L.Popup and L.Tooltip. Inherit from it for custom overlays like plugins.
	   */

	  // @namespace DivOverlay
	  var DivOverlay = Layer.extend({

	  	// @section
	  	// @aka DivOverlay options
	  	options: {
	  		// @option interactive: Boolean = false
	  		// If true, the popup/tooltip will listen to the mouse events.
	  		interactive: false,

	  		// @option offset: Point = Point(0, 0)
	  		// The offset of the overlay position.
	  		offset: [0, 0],

	  		// @option className: String = ''
	  		// A custom CSS class name to assign to the overlay.
	  		className: '',

	  		// @option pane: String = undefined
	  		// `Map pane` where the overlay will be added.
	  		pane: undefined,

	  		// @option content: String|HTMLElement|Function = ''
	  		// Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
	  		// passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
	  		content: ''
	  	},

	  	initialize: function (options, source) {
	  		if (options && (options instanceof LatLng || isArray(options))) {
	  			this._latlng = toLatLng(options);
	  			setOptions(this, source);
	  		} else {
	  			setOptions(this, options);
	  			this._source = source;
	  		}
	  		if (this.options.content) {
	  			this._content = this.options.content;
	  		}
	  	},

	  	// @method openOn(map: Map): this
	  	// Adds the overlay to the map.
	  	// Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
	  	openOn: function (map) {
	  		map = arguments.length ? map : this._source._map; // experimental, not the part of public api
	  		if (!map.hasLayer(this)) {
	  			map.addLayer(this);
	  		}
	  		return this;
	  	},

	  	// @method close(): this
	  	// Closes the overlay.
	  	// Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
	  	// and `layer.closePopup()`/`.closeTooltip()`.
	  	close: function () {
	  		if (this._map) {
	  			this._map.removeLayer(this);
	  		}
	  		return this;
	  	},

	  	// @method toggle(layer?: Layer): this
	  	// Opens or closes the overlay bound to layer depending on its current state.
	  	// Argument may be omitted only for overlay bound to layer.
	  	// Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
	  	toggle: function (layer) {
	  		if (this._map) {
	  			this.close();
	  		} else {
	  			if (arguments.length) {
	  				this._source = layer;
	  			} else {
	  				layer = this._source;
	  			}
	  			this._prepareOpen();

	  			// open the overlay on the map
	  			this.openOn(layer._map);
	  		}
	  		return this;
	  	},

	  	onAdd: function (map) {
	  		this._zoomAnimated = map._zoomAnimated;

	  		if (!this._container) {
	  			this._initLayout();
	  		}

	  		if (map._fadeAnimated) {
	  			setOpacity(this._container, 0);
	  		}

	  		clearTimeout(this._removeTimeout);
	  		this.getPane().appendChild(this._container);
	  		this.update();

	  		if (map._fadeAnimated) {
	  			setOpacity(this._container, 1);
	  		}

	  		this.bringToFront();

	  		if (this.options.interactive) {
	  			addClass(this._container, 'leaflet-interactive');
	  			this.addInteractiveTarget(this._container);
	  		}
	  	},

	  	onRemove: function (map) {
	  		if (map._fadeAnimated) {
	  			setOpacity(this._container, 0);
	  			this._removeTimeout = setTimeout(bind(remove, undefined, this._container), 200);
	  		} else {
	  			remove(this._container);
	  		}

	  		if (this.options.interactive) {
	  			removeClass(this._container, 'leaflet-interactive');
	  			this.removeInteractiveTarget(this._container);
	  		}
	  	},

	  	// @namespace DivOverlay
	  	// @method getLatLng: LatLng
	  	// Returns the geographical point of the overlay.
	  	getLatLng: function () {
	  		return this._latlng;
	  	},

	  	// @method setLatLng(latlng: LatLng): this
	  	// Sets the geographical point where the overlay will open.
	  	setLatLng: function (latlng) {
	  		this._latlng = toLatLng(latlng);
	  		if (this._map) {
	  			this._updatePosition();
	  			this._adjustPan();
	  		}
	  		return this;
	  	},

	  	// @method getContent: String|HTMLElement
	  	// Returns the content of the overlay.
	  	getContent: function () {
	  		return this._content;
	  	},

	  	// @method setContent(htmlContent: String|HTMLElement|Function): this
	  	// Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
	  	// The function should return a `String` or `HTMLElement` to be used in the overlay.
	  	setContent: function (content) {
	  		this._content = content;
	  		this.update();
	  		return this;
	  	},

	  	// @method getElement: String|HTMLElement
	  	// Returns the HTML container of the overlay.
	  	getElement: function () {
	  		return this._container;
	  	},

	  	// @method update: null
	  	// Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
	  	update: function () {
	  		if (!this._map) { return; }

	  		this._container.style.visibility = 'hidden';

	  		this._updateContent();
	  		this._updateLayout();
	  		this._updatePosition();

	  		this._container.style.visibility = '';

	  		this._adjustPan();
	  	},

	  	getEvents: function () {
	  		var events = {
	  			zoom: this._updatePosition,
	  			viewreset: this._updatePosition
	  		};

	  		if (this._zoomAnimated) {
	  			events.zoomanim = this._animateZoom;
	  		}
	  		return events;
	  	},

	  	// @method isOpen: Boolean
	  	// Returns `true` when the overlay is visible on the map.
	  	isOpen: function () {
	  		return !!this._map && this._map.hasLayer(this);
	  	},

	  	// @method bringToFront: this
	  	// Brings this overlay in front of other overlays (in the same map pane).
	  	bringToFront: function () {
	  		if (this._map) {
	  			toFront(this._container);
	  		}
	  		return this;
	  	},

	  	// @method bringToBack: this
	  	// Brings this overlay to the back of other overlays (in the same map pane).
	  	bringToBack: function () {
	  		if (this._map) {
	  			toBack(this._container);
	  		}
	  		return this;
	  	},

	  	// prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
	  	_prepareOpen: function (latlng) {
	  		var source = this._source;
	  		if (!source._map) { return false; }

	  		if (source instanceof FeatureGroup) {
	  			source = null;
	  			var layers = this._source._layers;
	  			for (var id in layers) {
	  				if (layers[id]._map) {
	  					source = layers[id];
	  					break;
	  				}
	  			}
	  			if (!source) { return false; } // Unable to get source layer.

	  			// set overlay source to this layer
	  			this._source = source;
	  		}

	  		if (!latlng) {
	  			if (source.getCenter) {
	  				latlng = source.getCenter();
	  			} else if (source.getLatLng) {
	  				latlng = source.getLatLng();
	  			} else if (source.getBounds) {
	  				latlng = source.getBounds().getCenter();
	  			} else {
	  				throw new Error('Unable to get source layer LatLng.');
	  			}
	  		}
	  		this.setLatLng(latlng);

	  		if (this._map) {
	  			// update the overlay (content, layout, etc...)
	  			this.update();
	  		}

	  		return true;
	  	},

	  	_updateContent: function () {
	  		if (!this._content) { return; }

	  		var node = this._contentNode;
	  		var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;

	  		if (typeof content === 'string') {
	  			node.innerHTML = content;
	  		} else {
	  			while (node.hasChildNodes()) {
	  				node.removeChild(node.firstChild);
	  			}
	  			node.appendChild(content);
	  		}

	  		// @namespace DivOverlay
	  		// @section DivOverlay events
	  		// @event contentupdate: Event
	  		// Fired when the content of the overlay is updated
	  		this.fire('contentupdate');
	  	},

	  	_updatePosition: function () {
	  		if (!this._map) { return; }

	  		var pos = this._map.latLngToLayerPoint(this._latlng),
	  		    offset = toPoint(this.options.offset),
	  		    anchor = this._getAnchor();

	  		if (this._zoomAnimated) {
	  			setPosition(this._container, pos.add(anchor));
	  		} else {
	  			offset = offset.add(pos).add(anchor);
	  		}

	  		var bottom = this._containerBottom = -offset.y,
	  		    left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;

	  		// bottom position the overlay in case the height of the overlay changes (images loading etc)
	  		this._container.style.bottom = bottom + 'px';
	  		this._container.style.left = left + 'px';
	  	},

	  	_getAnchor: function () {
	  		return [0, 0];
	  	}

	  });

	  Map.include({
	  	_initOverlay: function (OverlayClass, content, latlng, options) {
	  		var overlay = content;
	  		if (!(overlay instanceof OverlayClass)) {
	  			overlay = new OverlayClass(options).setContent(content);
	  		}
	  		if (latlng) {
	  			overlay.setLatLng(latlng);
	  		}
	  		return overlay;
	  	}
	  });


	  Layer.include({
	  	_initOverlay: function (OverlayClass, old, content, options) {
	  		var overlay = content;
	  		if (overlay instanceof OverlayClass) {
	  			setOptions(overlay, options);
	  			overlay._source = this;
	  		} else {
	  			overlay = (old && !options) ? old : new OverlayClass(options, this);
	  			overlay.setContent(content);
	  		}
	  		return overlay;
	  	}
	  });

	  /*
	   * @class Popup
	   * @inherits DivOverlay
	   * @aka L.Popup
	   * Used to open popups in certain places of the map. Use [Map.openPopup](#map-openpopup) to
	   * open popups while making sure that only one popup is open at one time
	   * (recommended for usability), or use [Map.addLayer](#map-addlayer) to open as many as you want.
	   *
	   * @example
	   *
	   * If you want to just bind a popup to marker click and then open it, it's really easy:
	   *
	   * ```js
	   * marker.bindPopup(popupContent).openPopup();
	   * ```
	   * Path overlays like polylines also have a `bindPopup` method.
	   *
	   * A popup can be also standalone:
	   *
	   * ```js
	   * var popup = L.popup()
	   * 	.setLatLng(latlng)
	   * 	.setContent('<p>Hello world!<br />This is a nice popup.</p>')
	   * 	.openOn(map);
	   * ```
	   * or
	   * ```js
	   * var popup = L.popup(latlng, {content: '<p>Hello world!<br />This is a nice popup.</p>')
	   * 	.openOn(map);
	   * ```
	   */


	  // @namespace Popup
	  var Popup = DivOverlay.extend({

	  	// @section
	  	// @aka Popup options
	  	options: {
	  		// @option pane: String = 'popupPane'
	  		// `Map pane` where the popup will be added.
	  		pane: 'popupPane',

	  		// @option offset: Point = Point(0, 7)
	  		// The offset of the popup position.
	  		offset: [0, 7],

	  		// @option maxWidth: Number = 300
	  		// Max width of the popup, in pixels.
	  		maxWidth: 300,

	  		// @option minWidth: Number = 50
	  		// Min width of the popup, in pixels.
	  		minWidth: 50,

	  		// @option maxHeight: Number = null
	  		// If set, creates a scrollable container of the given height
	  		// inside a popup if its content exceeds it.
	  		// The scrollable container can be styled using the
	  		// `leaflet-popup-scrolled` CSS class selector.
	  		maxHeight: null,

	  		// @option autoPan: Boolean = true
	  		// Set it to `false` if you don't want the map to do panning animation
	  		// to fit the opened popup.
	  		autoPan: true,

	  		// @option autoPanPaddingTopLeft: Point = null
	  		// The margin between the popup and the top left corner of the map
	  		// view after autopanning was performed.
	  		autoPanPaddingTopLeft: null,

	  		// @option autoPanPaddingBottomRight: Point = null
	  		// The margin between the popup and the bottom right corner of the map
	  		// view after autopanning was performed.
	  		autoPanPaddingBottomRight: null,

	  		// @option autoPanPadding: Point = Point(5, 5)
	  		// Equivalent of setting both top left and bottom right autopan padding to the same value.
	  		autoPanPadding: [5, 5],

	  		// @option keepInView: Boolean = false
	  		// Set it to `true` if you want to prevent users from panning the popup
	  		// off of the screen while it is open.
	  		keepInView: false,

	  		// @option closeButton: Boolean = true
	  		// Controls the presence of a close button in the popup.
	  		closeButton: true,

	  		// @option autoClose: Boolean = true
	  		// Set it to `false` if you want to override the default behavior of
	  		// the popup closing when another popup is opened.
	  		autoClose: true,

	  		// @option closeOnEscapeKey: Boolean = true
	  		// Set it to `false` if you want to override the default behavior of
	  		// the ESC key for closing of the popup.
	  		closeOnEscapeKey: true,

	  		// @option closeOnClick: Boolean = *
	  		// Set it if you want to override the default behavior of the popup closing when user clicks
	  		// on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.

	  		// @option className: String = ''
	  		// A custom CSS class name to assign to the popup.
	  		className: ''
	  	},

	  	// @namespace Popup
	  	// @method openOn(map: Map): this
	  	// Alternative to `map.openPopup(popup)`.
	  	// Adds the popup to the map and closes the previous one.
	  	openOn: function (map) {
	  		map = arguments.length ? map : this._source._map; // experimental, not the part of public api

	  		if (!map.hasLayer(this) && map._popup && map._popup.options.autoClose) {
	  			map.removeLayer(map._popup);
	  		}
	  		map._popup = this;

	  		return DivOverlay.prototype.openOn.call(this, map);
	  	},

	  	onAdd: function (map) {
	  		DivOverlay.prototype.onAdd.call(this, map);

	  		// @namespace Map
	  		// @section Popup events
	  		// @event popupopen: PopupEvent
	  		// Fired when a popup is opened in the map
	  		map.fire('popupopen', {popup: this});

	  		if (this._source) {
	  			// @namespace Layer
	  			// @section Popup events
	  			// @event popupopen: PopupEvent
	  			// Fired when a popup bound to this layer is opened
	  			this._source.fire('popupopen', {popup: this}, true);
	  			// For non-path layers, we toggle the popup when clicking
	  			// again the layer, so prevent the map to reopen it.
	  			if (!(this._source instanceof Path)) {
	  				this._source.on('preclick', stopPropagation);
	  			}
	  		}
	  	},

	  	onRemove: function (map) {
	  		DivOverlay.prototype.onRemove.call(this, map);

	  		// @namespace Map
	  		// @section Popup events
	  		// @event popupclose: PopupEvent
	  		// Fired when a popup in the map is closed
	  		map.fire('popupclose', {popup: this});

	  		if (this._source) {
	  			// @namespace Layer
	  			// @section Popup events
	  			// @event popupclose: PopupEvent
	  			// Fired when a popup bound to this layer is closed
	  			this._source.fire('popupclose', {popup: this}, true);
	  			if (!(this._source instanceof Path)) {
	  				this._source.off('preclick', stopPropagation);
	  			}
	  		}
	  	},

	  	getEvents: function () {
	  		var events = DivOverlay.prototype.getEvents.call(this);

	  		if (this.options.closeOnClick !== undefined ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
	  			events.preclick = this.close;
	  		}

	  		if (this.options.keepInView) {
	  			events.moveend = this._adjustPan;
	  		}

	  		return events;
	  	},

	  	_initLayout: function () {
	  		var prefix = 'leaflet-popup',
	  		    container = this._container = create$1('div',
	  			prefix + ' ' + (this.options.className || '') +
	  			' leaflet-zoom-animated');

	  		var wrapper = this._wrapper = create$1('div', prefix + '-content-wrapper', container);
	  		this._contentNode = create$1('div', prefix + '-content', wrapper);

	  		disableClickPropagation(container);
	  		disableScrollPropagation(this._contentNode);
	  		on(container, 'contextmenu', stopPropagation);

	  		this._tipContainer = create$1('div', prefix + '-tip-container', container);
	  		this._tip = create$1('div', prefix + '-tip', this._tipContainer);

	  		if (this.options.closeButton) {
	  			var closeButton = this._closeButton = create$1('a', prefix + '-close-button', container);
	  			closeButton.setAttribute('role', 'button'); // overrides the implicit role=link of <a> elements #7399
	  			closeButton.setAttribute('aria-label', 'Close popup');
	  			closeButton.href = '#close';
	  			closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';

	  			on(closeButton, 'click', function (ev) {
	  				preventDefault(ev);
	  				this.close();
	  			}, this);
	  		}
	  	},

	  	_updateLayout: function () {
	  		var container = this._contentNode,
	  		    style = container.style;

	  		style.width = '';
	  		style.whiteSpace = 'nowrap';

	  		var width = container.offsetWidth;
	  		width = Math.min(width, this.options.maxWidth);
	  		width = Math.max(width, this.options.minWidth);

	  		style.width = (width + 1) + 'px';
	  		style.whiteSpace = '';

	  		style.height = '';

	  		var height = container.offsetHeight,
	  		    maxHeight = this.options.maxHeight,
	  		    scrolledClass = 'leaflet-popup-scrolled';

	  		if (maxHeight && height > maxHeight) {
	  			style.height = maxHeight + 'px';
	  			addClass(container, scrolledClass);
	  		} else {
	  			removeClass(container, scrolledClass);
	  		}

	  		this._containerWidth = this._container.offsetWidth;
	  	},

	  	_animateZoom: function (e) {
	  		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
	  		    anchor = this._getAnchor();
	  		setPosition(this._container, pos.add(anchor));
	  	},

	  	_adjustPan: function () {
	  		if (!this.options.autoPan) { return; }
	  		if (this._map._panAnim) { this._map._panAnim.stop(); }

	  		// We can endlessly recurse if keepInView is set and the view resets.
	  		// Let's guard against that by exiting early if we're responding to our own autopan.
	  		if (this._autopanning) {
	  			this._autopanning = false;
	  			return;
	  		}

	  		var map = this._map,
	  		    marginBottom = parseInt(getStyle(this._container, 'marginBottom'), 10) || 0,
	  		    containerHeight = this._container.offsetHeight + marginBottom,
	  		    containerWidth = this._containerWidth,
	  		    layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);

	  		layerPos._add(getPosition(this._container));

	  		var containerPos = map.layerPointToContainerPoint(layerPos),
	  		    padding = toPoint(this.options.autoPanPadding),
	  		    paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding),
	  		    paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding),
	  		    size = map.getSize(),
	  		    dx = 0,
	  		    dy = 0;

	  		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
	  			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
	  		}
	  		if (containerPos.x - dx - paddingTL.x < 0) { // left
	  			dx = containerPos.x - paddingTL.x;
	  		}
	  		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
	  			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
	  		}
	  		if (containerPos.y - dy - paddingTL.y < 0) { // top
	  			dy = containerPos.y - paddingTL.y;
	  		}

	  		// @namespace Map
	  		// @section Popup events
	  		// @event autopanstart: Event
	  		// Fired when the map starts autopanning when opening a popup.
	  		if (dx || dy) {
	  			// Track that we're autopanning, as this function will be re-ran on moveend
	  			if (this.options.keepInView) {
	  				this._autopanning = true;
	  			}

	  			map
	  			    .fire('autopanstart')
	  			    .panBy([dx, dy]);
	  		}
	  	},

	  	_getAnchor: function () {
	  		// Where should we anchor the popup on the source layer?
	  		return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
	  	}

	  });

	  // @namespace Popup
	  // @factory L.popup(options?: Popup options, source?: Layer)
	  // Instantiates a `Popup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
	  // @alternative
	  // @factory L.popup(latlng: LatLng, options?: Popup options)
	  // Instantiates a `Popup` object given `latlng` where the popup will open and an optional `options` object that describes its appearance and location.
	  var popup = function (options, source) {
	  	return new Popup(options, source);
	  };


	  /* @namespace Map
	   * @section Interaction Options
	   * @option closePopupOnClick: Boolean = true
	   * Set it to `false` if you don't want popups to close when user clicks the map.
	   */
	  Map.mergeOptions({
	  	closePopupOnClick: true
	  });


	  // @namespace Map
	  // @section Methods for Layers and Controls
	  Map.include({
	  	// @method openPopup(popup: Popup): this
	  	// Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
	  	// @alternative
	  	// @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
	  	// Creates a popup with the specified content and options and opens it in the given point on a map.
	  	openPopup: function (popup, latlng, options) {
	  		this._initOverlay(Popup, popup, latlng, options)
	  		  .openOn(this);

	  		return this;
	  	},

	  	// @method closePopup(popup?: Popup): this
	  	// Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
	  	closePopup: function (popup) {
	  		popup = arguments.length ? popup : this._popup;
	  		if (popup) {
	  			popup.close();
	  		}
	  		return this;
	  	}
	  });

	  /*
	   * @namespace Layer
	   * @section Popup methods example
	   *
	   * All layers share a set of methods convenient for binding popups to it.
	   *
	   * ```js
	   * var layer = L.Polygon(latlngs).bindPopup('Hi There!').addTo(map);
	   * layer.openPopup();
	   * layer.closePopup();
	   * ```
	   *
	   * Popups will also be automatically opened when the layer is clicked on and closed when the layer is removed from the map or another popup is opened.
	   */

	  // @section Popup methods
	  Layer.include({

	  	// @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
	  	// Binds a popup to the layer with the passed `content` and sets up the
	  	// necessary event listeners. If a `Function` is passed it will receive
	  	// the layer as the first argument and should return a `String` or `HTMLElement`.
	  	bindPopup: function (content, options) {
	  		this._popup = this._initOverlay(Popup, this._popup, content, options);
	  		if (!this._popupHandlersAdded) {
	  			this.on({
	  				click: this._openPopup,
	  				keypress: this._onKeyPress,
	  				remove: this.closePopup,
	  				move: this._movePopup
	  			});
	  			this._popupHandlersAdded = true;
	  		}

	  		return this;
	  	},

	  	// @method unbindPopup(): this
	  	// Removes the popup previously bound with `bindPopup`.
	  	unbindPopup: function () {
	  		if (this._popup) {
	  			this.off({
	  				click: this._openPopup,
	  				keypress: this._onKeyPress,
	  				remove: this.closePopup,
	  				move: this._movePopup
	  			});
	  			this._popupHandlersAdded = false;
	  			this._popup = null;
	  		}
	  		return this;
	  	},

	  	// @method openPopup(latlng?: LatLng): this
	  	// Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
	  	openPopup: function (latlng) {
	  		if (this._popup) {
	  			if (!(this instanceof FeatureGroup)) {
	  				this._popup._source = this;
	  			}
	  			if (this._popup._prepareOpen(latlng || this._latlng)) {
	  				// open the popup on the map
	  				this._popup.openOn(this._map);
	  			}
	  		}
	  		return this;
	  	},

	  	// @method closePopup(): this
	  	// Closes the popup bound to this layer if it is open.
	  	closePopup: function () {
	  		if (this._popup) {
	  			this._popup.close();
	  		}
	  		return this;
	  	},

	  	// @method togglePopup(): this
	  	// Opens or closes the popup bound to this layer depending on its current state.
	  	togglePopup: function () {
	  		if (this._popup) {
	  			this._popup.toggle(this);
	  		}
	  		return this;
	  	},

	  	// @method isPopupOpen(): boolean
	  	// Returns `true` if the popup bound to this layer is currently open.
	  	isPopupOpen: function () {
	  		return (this._popup ? this._popup.isOpen() : false);
	  	},

	  	// @method setPopupContent(content: String|HTMLElement|Popup): this
	  	// Sets the content of the popup bound to this layer.
	  	setPopupContent: function (content) {
	  		if (this._popup) {
	  			this._popup.setContent(content);
	  		}
	  		return this;
	  	},

	  	// @method getPopup(): Popup
	  	// Returns the popup bound to this layer.
	  	getPopup: function () {
	  		return this._popup;
	  	},

	  	_openPopup: function (e) {
	  		if (!this._popup || !this._map) {
	  			return;
	  		}
	  		// prevent map click
	  		stop(e);

	  		var target = e.layer || e.target;
	  		if (this._popup._source === target && !(target instanceof Path)) {
	  			// treat it like a marker and figure out
	  			// if we should toggle it open/closed
	  			if (this._map.hasLayer(this._popup)) {
	  				this.closePopup();
	  			} else {
	  				this.openPopup(e.latlng);
	  			}
	  			return;
	  		}
	  		this._popup._source = target;
	  		this.openPopup(e.latlng);
	  	},

	  	_movePopup: function (e) {
	  		this._popup.setLatLng(e.latlng);
	  	},

	  	_onKeyPress: function (e) {
	  		if (e.originalEvent.keyCode === 13) {
	  			this._openPopup(e);
	  		}
	  	}
	  });

	  /*
	   * @class Tooltip
	   * @inherits DivOverlay
	   * @aka L.Tooltip
	   * Used to display small texts on top of map layers.
	   *
	   * @example
	   * If you want to just bind a tooltip to marker:
	   *
	   * ```js
	   * marker.bindTooltip("my tooltip text").openTooltip();
	   * ```
	   * Path overlays like polylines also have a `bindTooltip` method.
	   *
	   * A tooltip can be also standalone:
	   *
	   * ```js
	   * var tooltip = L.tooltip()
	   * 	.setLatLng(latlng)
	   * 	.setContent('Hello world!<br />This is a nice tooltip.')
	   * 	.addTo(map);
	   * ```
	   * or
	   * ```js
	   * var tooltip = L.tooltip(latlng, {content: 'Hello world!<br />This is a nice tooltip.'})
	   * 	.addTo(map);
	   * ```
	   *
	   *
	   * Note about tooltip offset. Leaflet takes two options in consideration
	   * for computing tooltip offsetting:
	   * - the `offset` Tooltip option: it defaults to [0, 0], and it's specific to one tooltip.
	   *   Add a positive x offset to move the tooltip to the right, and a positive y offset to
	   *   move it to the bottom. Negatives will move to the left and top.
	   * - the `tooltipAnchor` Icon option: this will only be considered for Marker. You
	   *   should adapt this value if you use a custom icon.
	   */


	  // @namespace Tooltip
	  var Tooltip = DivOverlay.extend({

	  	// @section
	  	// @aka Tooltip options
	  	options: {
	  		// @option pane: String = 'tooltipPane'
	  		// `Map pane` where the tooltip will be added.
	  		pane: 'tooltipPane',

	  		// @option offset: Point = Point(0, 0)
	  		// Optional offset of the tooltip position.
	  		offset: [0, 0],

	  		// @option direction: String = 'auto'
	  		// Direction where to open the tooltip. Possible values are: `right`, `left`,
	  		// `top`, `bottom`, `center`, `auto`.
	  		// `auto` will dynamically switch between `right` and `left` according to the tooltip
	  		// position on the map.
	  		direction: 'auto',

	  		// @option permanent: Boolean = false
	  		// Whether to open the tooltip permanently or only on mouseover.
	  		permanent: false,

	  		// @option sticky: Boolean = false
	  		// If true, the tooltip will follow the mouse instead of being fixed at the feature center.
	  		sticky: false,

	  		// @option opacity: Number = 0.9
	  		// Tooltip container opacity.
	  		opacity: 0.9
	  	},

	  	onAdd: function (map) {
	  		DivOverlay.prototype.onAdd.call(this, map);
	  		this.setOpacity(this.options.opacity);

	  		// @namespace Map
	  		// @section Tooltip events
	  		// @event tooltipopen: TooltipEvent
	  		// Fired when a tooltip is opened in the map.
	  		map.fire('tooltipopen', {tooltip: this});

	  		if (this._source) {
	  			this.addEventParent(this._source);

	  			// @namespace Layer
	  			// @section Tooltip events
	  			// @event tooltipopen: TooltipEvent
	  			// Fired when a tooltip bound to this layer is opened.
	  			this._source.fire('tooltipopen', {tooltip: this}, true);
	  		}
	  	},

	  	onRemove: function (map) {
	  		DivOverlay.prototype.onRemove.call(this, map);

	  		// @namespace Map
	  		// @section Tooltip events
	  		// @event tooltipclose: TooltipEvent
	  		// Fired when a tooltip in the map is closed.
	  		map.fire('tooltipclose', {tooltip: this});

	  		if (this._source) {
	  			this.removeEventParent(this._source);

	  			// @namespace Layer
	  			// @section Tooltip events
	  			// @event tooltipclose: TooltipEvent
	  			// Fired when a tooltip bound to this layer is closed.
	  			this._source.fire('tooltipclose', {tooltip: this}, true);
	  		}
	  	},

	  	getEvents: function () {
	  		var events = DivOverlay.prototype.getEvents.call(this);

	  		if (!this.options.permanent) {
	  			events.preclick = this.close;
	  		}

	  		return events;
	  	},

	  	_initLayout: function () {
	  		var prefix = 'leaflet-tooltip',
	  		    className = prefix + ' ' + (this.options.className || '') + ' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

	  		this._contentNode = this._container = create$1('div', className);

	  		this._container.setAttribute('role', 'tooltip');
	  		this._container.setAttribute('id', 'leaflet-tooltip-' + stamp(this));
	  	},

	  	_updateLayout: function () {},

	  	_adjustPan: function () {},

	  	_setPosition: function (pos) {
	  		var subX, subY,
	  		    map = this._map,
	  		    container = this._container,
	  		    centerPoint = map.latLngToContainerPoint(map.getCenter()),
	  		    tooltipPoint = map.layerPointToContainerPoint(pos),
	  		    direction = this.options.direction,
	  		    tooltipWidth = container.offsetWidth,
	  		    tooltipHeight = container.offsetHeight,
	  		    offset = toPoint(this.options.offset),
	  		    anchor = this._getAnchor();

	  		if (direction === 'top') {
	  			subX = tooltipWidth / 2;
	  			subY = tooltipHeight;
	  		} else if (direction === 'bottom') {
	  			subX = tooltipWidth / 2;
	  			subY = 0;
	  		} else if (direction === 'center') {
	  			subX = tooltipWidth / 2;
	  			subY = tooltipHeight / 2;
	  		} else if (direction === 'right') {
	  			subX = 0;
	  			subY = tooltipHeight / 2;
	  		} else if (direction === 'left') {
	  			subX = tooltipWidth;
	  			subY = tooltipHeight / 2;
	  		} else if (tooltipPoint.x < centerPoint.x) {
	  			direction = 'right';
	  			subX = 0;
	  			subY = tooltipHeight / 2;
	  		} else {
	  			direction = 'left';
	  			subX = tooltipWidth + (offset.x + anchor.x) * 2;
	  			subY = tooltipHeight / 2;
	  		}

	  		pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);

	  		removeClass(container, 'leaflet-tooltip-right');
	  		removeClass(container, 'leaflet-tooltip-left');
	  		removeClass(container, 'leaflet-tooltip-top');
	  		removeClass(container, 'leaflet-tooltip-bottom');
	  		addClass(container, 'leaflet-tooltip-' + direction);
	  		setPosition(container, pos);
	  	},

	  	_updatePosition: function () {
	  		var pos = this._map.latLngToLayerPoint(this._latlng);
	  		this._setPosition(pos);
	  	},

	  	setOpacity: function (opacity) {
	  		this.options.opacity = opacity;

	  		if (this._container) {
	  			setOpacity(this._container, opacity);
	  		}
	  	},

	  	_animateZoom: function (e) {
	  		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
	  		this._setPosition(pos);
	  	},

	  	_getAnchor: function () {
	  		// Where should we anchor the tooltip on the source layer?
	  		return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
	  	}

	  });

	  // @namespace Tooltip
	  // @factory L.tooltip(options?: Tooltip options, source?: Layer)
	  // Instantiates a `Tooltip` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the tooltip with a reference to the Layer to which it refers.
	  // @alternative
	  // @factory L.tooltip(latlng: LatLng, options?: Tooltip options)
	  // Instantiates a `Tooltip` object given `latlng` where the tooltip will open and an optional `options` object that describes its appearance and location.
	  var tooltip = function (options, source) {
	  	return new Tooltip(options, source);
	  };

	  // @namespace Map
	  // @section Methods for Layers and Controls
	  Map.include({

	  	// @method openTooltip(tooltip: Tooltip): this
	  	// Opens the specified tooltip.
	  	// @alternative
	  	// @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
	  	// Creates a tooltip with the specified content and options and open it.
	  	openTooltip: function (tooltip, latlng, options) {
	  		this._initOverlay(Tooltip, tooltip, latlng, options)
	  		  .openOn(this);

	  		return this;
	  	},

	  	// @method closeTooltip(tooltip: Tooltip): this
	  	// Closes the tooltip given as parameter.
	  	closeTooltip: function (tooltip) {
	  		tooltip.close();
	  		return this;
	  	}

	  });

	  /*
	   * @namespace Layer
	   * @section Tooltip methods example
	   *
	   * All layers share a set of methods convenient for binding tooltips to it.
	   *
	   * ```js
	   * var layer = L.Polygon(latlngs).bindTooltip('Hi There!').addTo(map);
	   * layer.openTooltip();
	   * layer.closeTooltip();
	   * ```
	   */

	  // @section Tooltip methods
	  Layer.include({

	  	// @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
	  	// Binds a tooltip to the layer with the passed `content` and sets up the
	  	// necessary event listeners. If a `Function` is passed it will receive
	  	// the layer as the first argument and should return a `String` or `HTMLElement`.
	  	bindTooltip: function (content, options) {

	  		if (this._tooltip && this.isTooltipOpen()) {
	  			this.unbindTooltip();
	  		}

	  		this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
	  		this._initTooltipInteractions();

	  		if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
	  			this.openTooltip();
	  		}

	  		return this;
	  	},

	  	// @method unbindTooltip(): this
	  	// Removes the tooltip previously bound with `bindTooltip`.
	  	unbindTooltip: function () {
	  		if (this._tooltip) {
	  			this._initTooltipInteractions(true);
	  			this.closeTooltip();
	  			this._tooltip = null;
	  		}
	  		return this;
	  	},

	  	_initTooltipInteractions: function (remove) {
	  		if (!remove && this._tooltipHandlersAdded) { return; }
	  		var onOff = remove ? 'off' : 'on',
	  		    events = {
	  			remove: this.closeTooltip,
	  			move: this._moveTooltip
	  		    };
	  		if (!this._tooltip.options.permanent) {
	  			events.mouseover = this._openTooltip;
	  			events.mouseout = this.closeTooltip;
	  			events.click = this._openTooltip;
	  			if (this._map) {
	  				this._addFocusListeners();
	  			} else {
	  				events.add = this._addFocusListeners;
	  			}
	  		} else {
	  			events.add = this._openTooltip;
	  		}
	  		if (this._tooltip.options.sticky) {
	  			events.mousemove = this._moveTooltip;
	  		}
	  		this[onOff](events);
	  		this._tooltipHandlersAdded = !remove;
	  	},

	  	// @method openTooltip(latlng?: LatLng): this
	  	// Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
	  	openTooltip: function (latlng) {
	  		if (this._tooltip) {
	  			if (!(this instanceof FeatureGroup)) {
	  				this._tooltip._source = this;
	  			}
	  			if (this._tooltip._prepareOpen(latlng)) {
	  				// open the tooltip on the map
	  				this._tooltip.openOn(this._map);

	  				if (this.getElement) {
	  					this._setAriaDescribedByOnLayer(this);
	  				} else if (this.eachLayer) {
	  					this.eachLayer(this._setAriaDescribedByOnLayer, this);
	  				}
	  			}
	  		}
	  		return this;
	  	},

	  	// @method closeTooltip(): this
	  	// Closes the tooltip bound to this layer if it is open.
	  	closeTooltip: function () {
	  		if (this._tooltip) {
	  			return this._tooltip.close();
	  		}
	  	},

	  	// @method toggleTooltip(): this
	  	// Opens or closes the tooltip bound to this layer depending on its current state.
	  	toggleTooltip: function () {
	  		if (this._tooltip) {
	  			this._tooltip.toggle(this);
	  		}
	  		return this;
	  	},

	  	// @method isTooltipOpen(): boolean
	  	// Returns `true` if the tooltip bound to this layer is currently open.
	  	isTooltipOpen: function () {
	  		return this._tooltip.isOpen();
	  	},

	  	// @method setTooltipContent(content: String|HTMLElement|Tooltip): this
	  	// Sets the content of the tooltip bound to this layer.
	  	setTooltipContent: function (content) {
	  		if (this._tooltip) {
	  			this._tooltip.setContent(content);
	  		}
	  		return this;
	  	},

	  	// @method getTooltip(): Tooltip
	  	// Returns the tooltip bound to this layer.
	  	getTooltip: function () {
	  		return this._tooltip;
	  	},

	  	_addFocusListeners: function () {
	  		if (this.getElement) {
	  			this._addFocusListenersOnLayer(this);
	  		} else if (this.eachLayer) {
	  			this.eachLayer(this._addFocusListenersOnLayer, this);
	  		}
	  	},

	  	_addFocusListenersOnLayer: function (layer) {
	  		var el = typeof layer.getElement === 'function' && layer.getElement();
	  		if (el) {
	  			on(el, 'focus', function () {
	  				this._tooltip._source = layer;
	  				this.openTooltip();
	  			}, this);
	  			on(el, 'blur', this.closeTooltip, this);
	  		}
	  	},

	  	_setAriaDescribedByOnLayer: function (layer) {
	  		var el = typeof layer.getElement === 'function' && layer.getElement();
	  		if (el) {
	  			el.setAttribute('aria-describedby', this._tooltip._container.id);
	  		}
	  	},


	  	_openTooltip: function (e) {
	  		if (!this._tooltip || !this._map) {
	  			return;
	  		}

	  		// If the map is moving, we will show the tooltip after it's done.
	  		if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
	  			this._openOnceFlag = true;
	  			var that = this;
	  			this._map.once('moveend', function () {
	  				that._openOnceFlag = false;
	  				that._openTooltip(e);
	  			});
	  			return;
	  		}

	  		this._tooltip._source = e.layer || e.target;

	  		this.openTooltip(this._tooltip.options.sticky ? e.latlng : undefined);
	  	},

	  	_moveTooltip: function (e) {
	  		var latlng = e.latlng, containerPoint, layerPoint;
	  		if (this._tooltip.options.sticky && e.originalEvent) {
	  			containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
	  			layerPoint = this._map.containerPointToLayerPoint(containerPoint);
	  			latlng = this._map.layerPointToLatLng(layerPoint);
	  		}
	  		this._tooltip.setLatLng(latlng);
	  	}
	  });

	  /*
	   * @class DivIcon
	   * @aka L.DivIcon
	   * @inherits Icon
	   *
	   * Represents a lightweight icon for markers that uses a simple `<div>`
	   * element instead of an image. Inherits from `Icon` but ignores the `iconUrl` and shadow options.
	   *
	   * @example
	   * ```js
	   * var myIcon = L.divIcon({className: 'my-div-icon'});
	   * // you can set .my-div-icon styles in CSS
	   *
	   * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
	   * ```
	   *
	   * By default, it has a 'leaflet-div-icon' CSS class and is styled as a little white square with a shadow.
	   */

	  var DivIcon = Icon.extend({
	  	options: {
	  		// @section
	  		// @aka DivIcon options
	  		iconSize: [12, 12], // also can be set through CSS

	  		// iconAnchor: (Point),
	  		// popupAnchor: (Point),

	  		// @option html: String|HTMLElement = ''
	  		// Custom HTML code to put inside the div element, empty by default. Alternatively,
	  		// an instance of `HTMLElement`.
	  		html: false,

	  		// @option bgPos: Point = [0, 0]
	  		// Optional relative position of the background, in pixels
	  		bgPos: null,

	  		className: 'leaflet-div-icon'
	  	},

	  	createIcon: function (oldIcon) {
	  		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
	  		    options = this.options;

	  		if (options.html instanceof Element) {
	  			empty(div);
	  			div.appendChild(options.html);
	  		} else {
	  			div.innerHTML = options.html !== false ? options.html : '';
	  		}

	  		if (options.bgPos) {
	  			var bgPos = toPoint(options.bgPos);
	  			div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
	  		}
	  		this._setIconStyles(div, 'icon');

	  		return div;
	  	},

	  	createShadow: function () {
	  		return null;
	  	}
	  });

	  // @factory L.divIcon(options: DivIcon options)
	  // Creates a `DivIcon` instance with the given options.
	  function divIcon(options) {
	  	return new DivIcon(options);
	  }

	  Icon.Default = IconDefault;

	  /*
	   * @class GridLayer
	   * @inherits Layer
	   * @aka L.GridLayer
	   *
	   * Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and replaces `TileLayer.Canvas`.
	   * GridLayer can be extended to create a tiled grid of HTML elements like `<canvas>`, `<img>` or `<div>`. GridLayer will handle creating and animating these DOM elements for you.
	   *
	   *
	   * @section Synchronous usage
	   * @example
	   *
	   * To create a custom layer, extend GridLayer and implement the `createTile()` method, which will be passed a `Point` object with the `x`, `y`, and `z` (zoom level) coordinates to draw your tile.
	   *
	   * ```js
	   * var CanvasLayer = L.GridLayer.extend({
	   *     createTile: function(coords){
	   *         // create a <canvas> element for drawing
	   *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
	   *
	   *         // setup tile width and height according to the options
	   *         var size = this.getTileSize();
	   *         tile.width = size.x;
	   *         tile.height = size.y;
	   *
	   *         // get a canvas context and draw something on it using coords.x, coords.y and coords.z
	   *         var ctx = tile.getContext('2d');
	   *
	   *         // return the tile so it can be rendered on screen
	   *         return tile;
	   *     }
	   * });
	   * ```
	   *
	   * @section Asynchronous usage
	   * @example
	   *
	   * Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the `done()` callback.
	   *
	   * ```js
	   * var CanvasLayer = L.GridLayer.extend({
	   *     createTile: function(coords, done){
	   *         var error;
	   *
	   *         // create a <canvas> element for drawing
	   *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
	   *
	   *         // setup tile width and height according to the options
	   *         var size = this.getTileSize();
	   *         tile.width = size.x;
	   *         tile.height = size.y;
	   *
	   *         // draw something asynchronously and pass the tile to the done() callback
	   *         setTimeout(function() {
	   *             done(error, tile);
	   *         }, 1000);
	   *
	   *         return tile;
	   *     }
	   * });
	   * ```
	   *
	   * @section
	   */


	  var GridLayer = Layer.extend({

	  	// @section
	  	// @aka GridLayer options
	  	options: {
	  		// @option tileSize: Number|Point = 256
	  		// Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
	  		tileSize: 256,

	  		// @option opacity: Number = 1.0
	  		// Opacity of the tiles. Can be used in the `createTile()` function.
	  		opacity: 1,

	  		// @option updateWhenIdle: Boolean = (depends)
	  		// Load new tiles only when panning ends.
	  		// `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
	  		// `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
	  		// [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
	  		updateWhenIdle: Browser.mobile,

	  		// @option updateWhenZooming: Boolean = true
	  		// By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
	  		updateWhenZooming: true,

	  		// @option updateInterval: Number = 200
	  		// Tiles will not update more than once every `updateInterval` milliseconds when panning.
	  		updateInterval: 200,

	  		// @option zIndex: Number = 1
	  		// The explicit zIndex of the tile layer.
	  		zIndex: 1,

	  		// @option bounds: LatLngBounds = undefined
	  		// If set, tiles will only be loaded inside the set `LatLngBounds`.
	  		bounds: null,

	  		// @option minZoom: Number = 0
	  		// The minimum zoom level down to which this layer will be displayed (inclusive).
	  		minZoom: 0,

	  		// @option maxZoom: Number = undefined
	  		// The maximum zoom level up to which this layer will be displayed (inclusive).
	  		maxZoom: undefined,

	  		// @option maxNativeZoom: Number = undefined
	  		// Maximum zoom number the tile source has available. If it is specified,
	  		// the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
	  		// from `maxNativeZoom` level and auto-scaled.
	  		maxNativeZoom: undefined,

	  		// @option minNativeZoom: Number = undefined
	  		// Minimum zoom number the tile source has available. If it is specified,
	  		// the tiles on all zoom levels lower than `minNativeZoom` will be loaded
	  		// from `minNativeZoom` level and auto-scaled.
	  		minNativeZoom: undefined,

	  		// @option noWrap: Boolean = false
	  		// Whether the layer is wrapped around the antimeridian. If `true`, the
	  		// GridLayer will only be displayed once at low zoom levels. Has no
	  		// effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
	  		// in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
	  		// tiles outside the CRS limits.
	  		noWrap: false,

	  		// @option pane: String = 'tilePane'
	  		// `Map pane` where the grid layer will be added.
	  		pane: 'tilePane',

	  		// @option className: String = ''
	  		// A custom class name to assign to the tile layer. Empty by default.
	  		className: '',

	  		// @option keepBuffer: Number = 2
	  		// When panning the map, keep this many rows and columns of tiles before unloading them.
	  		keepBuffer: 2
	  	},

	  	initialize: function (options) {
	  		setOptions(this, options);
	  	},

	  	onAdd: function () {
	  		this._initContainer();

	  		this._levels = {};
	  		this._tiles = {};

	  		this._resetView(); // implicit _update() call
	  	},

	  	beforeAdd: function (map) {
	  		map._addZoomLimit(this);
	  	},

	  	onRemove: function (map) {
	  		this._removeAllTiles();
	  		remove(this._container);
	  		map._removeZoomLimit(this);
	  		this._container = null;
	  		this._tileZoom = undefined;
	  	},

	  	// @method bringToFront: this
	  	// Brings the tile layer to the top of all tile layers.
	  	bringToFront: function () {
	  		if (this._map) {
	  			toFront(this._container);
	  			this._setAutoZIndex(Math.max);
	  		}
	  		return this;
	  	},

	  	// @method bringToBack: this
	  	// Brings the tile layer to the bottom of all tile layers.
	  	bringToBack: function () {
	  		if (this._map) {
	  			toBack(this._container);
	  			this._setAutoZIndex(Math.min);
	  		}
	  		return this;
	  	},

	  	// @method getContainer: HTMLElement
	  	// Returns the HTML element that contains the tiles for this layer.
	  	getContainer: function () {
	  		return this._container;
	  	},

	  	// @method setOpacity(opacity: Number): this
	  	// Changes the [opacity](#gridlayer-opacity) of the grid layer.
	  	setOpacity: function (opacity) {
	  		this.options.opacity = opacity;
	  		this._updateOpacity();
	  		return this;
	  	},

	  	// @method setZIndex(zIndex: Number): this
	  	// Changes the [zIndex](#gridlayer-zindex) of the grid layer.
	  	setZIndex: function (zIndex) {
	  		this.options.zIndex = zIndex;
	  		this._updateZIndex();

	  		return this;
	  	},

	  	// @method isLoading: Boolean
	  	// Returns `true` if any tile in the grid layer has not finished loading.
	  	isLoading: function () {
	  		return this._loading;
	  	},

	  	// @method redraw: this
	  	// Causes the layer to clear all the tiles and request them again.
	  	redraw: function () {
	  		if (this._map) {
	  			this._removeAllTiles();
	  			var tileZoom = this._clampZoom(this._map.getZoom());
	  			if (tileZoom !== this._tileZoom) {
	  				this._tileZoom = tileZoom;
	  				this._updateLevels();
	  			}
	  			this._update();
	  		}
	  		return this;
	  	},

	  	getEvents: function () {
	  		var events = {
	  			viewprereset: this._invalidateAll,
	  			viewreset: this._resetView,
	  			zoom: this._resetView,
	  			moveend: this._onMoveEnd
	  		};

	  		if (!this.options.updateWhenIdle) {
	  			// update tiles on move, but not more often than once per given interval
	  			if (!this._onMove) {
	  				this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
	  			}

	  			events.move = this._onMove;
	  		}

	  		if (this._zoomAnimated) {
	  			events.zoomanim = this._animateZoom;
	  		}

	  		return events;
	  	},

	  	// @section Extension methods
	  	// Layers extending `GridLayer` shall reimplement the following method.
	  	// @method createTile(coords: Object, done?: Function): HTMLElement
	  	// Called only internally, must be overridden by classes extending `GridLayer`.
	  	// Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
	  	// is specified, it must be called when the tile has finished loading and drawing.
	  	createTile: function () {
	  		return document.createElement('div');
	  	},

	  	// @section
	  	// @method getTileSize: Point
	  	// Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
	  	getTileSize: function () {
	  		var s = this.options.tileSize;
	  		return s instanceof Point ? s : new Point(s, s);
	  	},

	  	_updateZIndex: function () {
	  		if (this._container && this.options.zIndex !== undefined && this.options.zIndex !== null) {
	  			this._container.style.zIndex = this.options.zIndex;
	  		}
	  	},

	  	_setAutoZIndex: function (compare) {
	  		// go through all other layers of the same pane, set zIndex to max + 1 (front) or min - 1 (back)

	  		var layers = this.getPane().children,
	  		    edgeZIndex = -compare(-Infinity, Infinity); // -Infinity for max, Infinity for min

	  		for (var i = 0, len = layers.length, zIndex; i < len; i++) {

	  			zIndex = layers[i].style.zIndex;

	  			if (layers[i] !== this._container && zIndex) {
	  				edgeZIndex = compare(edgeZIndex, +zIndex);
	  			}
	  		}

	  		if (isFinite(edgeZIndex)) {
	  			this.options.zIndex = edgeZIndex + compare(-1, 1);
	  			this._updateZIndex();
	  		}
	  	},

	  	_updateOpacity: function () {
	  		if (!this._map) { return; }

	  		// IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
	  		if (Browser.ielt9) { return; }

	  		setOpacity(this._container, this.options.opacity);

	  		var now = +new Date(),
	  		    nextFrame = false,
	  		    willPrune = false;

	  		for (var key in this._tiles) {
	  			var tile = this._tiles[key];
	  			if (!tile.current || !tile.loaded) { continue; }

	  			var fade = Math.min(1, (now - tile.loaded) / 200);

	  			setOpacity(tile.el, fade);
	  			if (fade < 1) {
	  				nextFrame = true;
	  			} else {
	  				if (tile.active) {
	  					willPrune = true;
	  				} else {
	  					this._onOpaqueTile(tile);
	  				}
	  				tile.active = true;
	  			}
	  		}

	  		if (willPrune && !this._noPrune) { this._pruneTiles(); }

	  		if (nextFrame) {
	  			cancelAnimFrame(this._fadeFrame);
	  			this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
	  		}
	  	},

	  	_onOpaqueTile: falseFn,

	  	_initContainer: function () {
	  		if (this._container) { return; }

	  		this._container = create$1('div', 'leaflet-layer ' + (this.options.className || ''));
	  		this._updateZIndex();

	  		if (this.options.opacity < 1) {
	  			this._updateOpacity();
	  		}

	  		this.getPane().appendChild(this._container);
	  	},

	  	_updateLevels: function () {

	  		var zoom = this._tileZoom,
	  		    maxZoom = this.options.maxZoom;

	  		if (zoom === undefined) { return undefined; }

	  		for (var z in this._levels) {
	  			z = Number(z);
	  			if (this._levels[z].el.children.length || z === zoom) {
	  				this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
	  				this._onUpdateLevel(z);
	  			} else {
	  				remove(this._levels[z].el);
	  				this._removeTilesAtZoom(z);
	  				this._onRemoveLevel(z);
	  				delete this._levels[z];
	  			}
	  		}

	  		var level = this._levels[zoom],
	  		    map = this._map;

	  		if (!level) {
	  			level = this._levels[zoom] = {};

	  			level.el = create$1('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
	  			level.el.style.zIndex = maxZoom;

	  			level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
	  			level.zoom = zoom;

	  			this._setZoomTransform(level, map.getCenter(), map.getZoom());

	  			// force the browser to consider the newly added element for transition
	  			falseFn(level.el.offsetWidth);

	  			this._onCreateLevel(level);
	  		}

	  		this._level = level;

	  		return level;
	  	},

	  	_onUpdateLevel: falseFn,

	  	_onRemoveLevel: falseFn,

	  	_onCreateLevel: falseFn,

	  	_pruneTiles: function () {
	  		if (!this._map) {
	  			return;
	  		}

	  		var key, tile;

	  		var zoom = this._map.getZoom();
	  		if (zoom > this.options.maxZoom ||
	  			zoom < this.options.minZoom) {
	  			this._removeAllTiles();
	  			return;
	  		}

	  		for (key in this._tiles) {
	  			tile = this._tiles[key];
	  			tile.retain = tile.current;
	  		}

	  		for (key in this._tiles) {
	  			tile = this._tiles[key];
	  			if (tile.current && !tile.active) {
	  				var coords = tile.coords;
	  				if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
	  					this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
	  				}
	  			}
	  		}

	  		for (key in this._tiles) {
	  			if (!this._tiles[key].retain) {
	  				this._removeTile(key);
	  			}
	  		}
	  	},

	  	_removeTilesAtZoom: function (zoom) {
	  		for (var key in this._tiles) {
	  			if (this._tiles[key].coords.z !== zoom) {
	  				continue;
	  			}
	  			this._removeTile(key);
	  		}
	  	},

	  	_removeAllTiles: function () {
	  		for (var key in this._tiles) {
	  			this._removeTile(key);
	  		}
	  	},

	  	_invalidateAll: function () {
	  		for (var z in this._levels) {
	  			remove(this._levels[z].el);
	  			this._onRemoveLevel(Number(z));
	  			delete this._levels[z];
	  		}
	  		this._removeAllTiles();

	  		this._tileZoom = undefined;
	  	},

	  	_retainParent: function (x, y, z, minZoom) {
	  		var x2 = Math.floor(x / 2),
	  		    y2 = Math.floor(y / 2),
	  		    z2 = z - 1,
	  		    coords2 = new Point(+x2, +y2);
	  		coords2.z = +z2;

	  		var key = this._tileCoordsToKey(coords2),
	  		    tile = this._tiles[key];

	  		if (tile && tile.active) {
	  			tile.retain = true;
	  			return true;

	  		} else if (tile && tile.loaded) {
	  			tile.retain = true;
	  		}

	  		if (z2 > minZoom) {
	  			return this._retainParent(x2, y2, z2, minZoom);
	  		}

	  		return false;
	  	},

	  	_retainChildren: function (x, y, z, maxZoom) {

	  		for (var i = 2 * x; i < 2 * x + 2; i++) {
	  			for (var j = 2 * y; j < 2 * y + 2; j++) {

	  				var coords = new Point(i, j);
	  				coords.z = z + 1;

	  				var key = this._tileCoordsToKey(coords),
	  				    tile = this._tiles[key];

	  				if (tile && tile.active) {
	  					tile.retain = true;
	  					continue;

	  				} else if (tile && tile.loaded) {
	  					tile.retain = true;
	  				}

	  				if (z + 1 < maxZoom) {
	  					this._retainChildren(i, j, z + 1, maxZoom);
	  				}
	  			}
	  		}
	  	},

	  	_resetView: function (e) {
	  		var animating = e && (e.pinch || e.flyTo);
	  		this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
	  	},

	  	_animateZoom: function (e) {
	  		this._setView(e.center, e.zoom, true, e.noUpdate);
	  	},

	  	_clampZoom: function (zoom) {
	  		var options = this.options;

	  		if (undefined !== options.minNativeZoom && zoom < options.minNativeZoom) {
	  			return options.minNativeZoom;
	  		}

	  		if (undefined !== options.maxNativeZoom && options.maxNativeZoom < zoom) {
	  			return options.maxNativeZoom;
	  		}

	  		return zoom;
	  	},

	  	_setView: function (center, zoom, noPrune, noUpdate) {
	  		var tileZoom = Math.round(zoom);
	  		if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
	  		    (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
	  			tileZoom = undefined;
	  		} else {
	  			tileZoom = this._clampZoom(tileZoom);
	  		}

	  		var tileZoomChanged = this.options.updateWhenZooming && (tileZoom !== this._tileZoom);

	  		if (!noUpdate || tileZoomChanged) {

	  			this._tileZoom = tileZoom;

	  			if (this._abortLoading) {
	  				this._abortLoading();
	  			}

	  			this._updateLevels();
	  			this._resetGrid();

	  			if (tileZoom !== undefined) {
	  				this._update(center);
	  			}

	  			if (!noPrune) {
	  				this._pruneTiles();
	  			}

	  			// Flag to prevent _updateOpacity from pruning tiles during
	  			// a zoom anim or a pinch gesture
	  			this._noPrune = !!noPrune;
	  		}

	  		this._setZoomTransforms(center, zoom);
	  	},

	  	_setZoomTransforms: function (center, zoom) {
	  		for (var i in this._levels) {
	  			this._setZoomTransform(this._levels[i], center, zoom);
	  		}
	  	},

	  	_setZoomTransform: function (level, center, zoom) {
	  		var scale = this._map.getZoomScale(zoom, level.zoom),
	  		    translate = level.origin.multiplyBy(scale)
	  		        .subtract(this._map._getNewPixelOrigin(center, zoom)).round();

	  		if (Browser.any3d) {
	  			setTransform(level.el, translate, scale);
	  		} else {
	  			setPosition(level.el, translate);
	  		}
	  	},

	  	_resetGrid: function () {
	  		var map = this._map,
	  		    crs = map.options.crs,
	  		    tileSize = this._tileSize = this.getTileSize(),
	  		    tileZoom = this._tileZoom;

	  		var bounds = this._map.getPixelWorldBounds(this._tileZoom);
	  		if (bounds) {
	  			this._globalTileRange = this._pxBoundsToTileRange(bounds);
	  		}

	  		this._wrapX = crs.wrapLng && !this.options.noWrap && [
	  			Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
	  			Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
	  		];
	  		this._wrapY = crs.wrapLat && !this.options.noWrap && [
	  			Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
	  			Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
	  		];
	  	},

	  	_onMoveEnd: function () {
	  		if (!this._map || this._map._animatingZoom) { return; }

	  		this._update();
	  	},

	  	_getTiledPixelBounds: function (center) {
	  		var map = this._map,
	  		    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
	  		    scale = map.getZoomScale(mapZoom, this._tileZoom),
	  		    pixelCenter = map.project(center, this._tileZoom).floor(),
	  		    halfSize = map.getSize().divideBy(scale * 2);

	  		return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
	  	},

	  	// Private method to load tiles in the grid's active zoom level according to map bounds
	  	_update: function (center) {
	  		var map = this._map;
	  		if (!map) { return; }
	  		var zoom = this._clampZoom(map.getZoom());

	  		if (center === undefined) { center = map.getCenter(); }
	  		if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

	  		var pixelBounds = this._getTiledPixelBounds(center),
	  		    tileRange = this._pxBoundsToTileRange(pixelBounds),
	  		    tileCenter = tileRange.getCenter(),
	  		    queue = [],
	  		    margin = this.options.keepBuffer,
	  		    noPruneRange = new Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
	  		                              tileRange.getTopRight().add([margin, -margin]));

	  		// Sanity check: panic if the tile range contains Infinity somewhere.
	  		if (!(isFinite(tileRange.min.x) &&
	  		      isFinite(tileRange.min.y) &&
	  		      isFinite(tileRange.max.x) &&
	  		      isFinite(tileRange.max.y))) { throw new Error('Attempted to load an infinite number of tiles'); }

	  		for (var key in this._tiles) {
	  			var c = this._tiles[key].coords;
	  			if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
	  				this._tiles[key].current = false;
	  			}
	  		}

	  		// _update just loads more tiles. If the tile zoom level differs too much
	  		// from the map's, let _setView reset levels and prune old tiles.
	  		if (Math.abs(zoom - this._tileZoom) > 1) { this._setView(center, zoom); return; }

	  		// create a queue of coordinates to load tiles from
	  		for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
	  			for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
	  				var coords = new Point(i, j);
	  				coords.z = this._tileZoom;

	  				if (!this._isValidTile(coords)) { continue; }

	  				var tile = this._tiles[this._tileCoordsToKey(coords)];
	  				if (tile) {
	  					tile.current = true;
	  				} else {
	  					queue.push(coords);
	  				}
	  			}
	  		}

	  		// sort tile queue to load tiles in order of their distance to center
	  		queue.sort(function (a, b) {
	  			return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
	  		});

	  		if (queue.length !== 0) {
	  			// if it's the first batch of tiles to load
	  			if (!this._loading) {
	  				this._loading = true;
	  				// @event loading: Event
	  				// Fired when the grid layer starts loading tiles.
	  				this.fire('loading');
	  			}

	  			// create DOM fragment to append tiles in one batch
	  			var fragment = document.createDocumentFragment();

	  			for (i = 0; i < queue.length; i++) {
	  				this._addTile(queue[i], fragment);
	  			}

	  			this._level.el.appendChild(fragment);
	  		}
	  	},

	  	_isValidTile: function (coords) {
	  		var crs = this._map.options.crs;

	  		if (!crs.infinite) {
	  			// don't load tile if it's out of bounds and not wrapped
	  			var bounds = this._globalTileRange;
	  			if ((!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
	  			    (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))) { return false; }
	  		}

	  		if (!this.options.bounds) { return true; }

	  		// don't load tile if it doesn't intersect the bounds in options
	  		var tileBounds = this._tileCoordsToBounds(coords);
	  		return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
	  	},

	  	_keyToBounds: function (key) {
	  		return this._tileCoordsToBounds(this._keyToTileCoords(key));
	  	},

	  	_tileCoordsToNwSe: function (coords) {
	  		var map = this._map,
	  		    tileSize = this.getTileSize(),
	  		    nwPoint = coords.scaleBy(tileSize),
	  		    sePoint = nwPoint.add(tileSize),
	  		    nw = map.unproject(nwPoint, coords.z),
	  		    se = map.unproject(sePoint, coords.z);
	  		return [nw, se];
	  	},

	  	// converts tile coordinates to its geographical bounds
	  	_tileCoordsToBounds: function (coords) {
	  		var bp = this._tileCoordsToNwSe(coords),
	  		    bounds = new LatLngBounds(bp[0], bp[1]);

	  		if (!this.options.noWrap) {
	  			bounds = this._map.wrapLatLngBounds(bounds);
	  		}
	  		return bounds;
	  	},
	  	// converts tile coordinates to key for the tile cache
	  	_tileCoordsToKey: function (coords) {
	  		return coords.x + ':' + coords.y + ':' + coords.z;
	  	},

	  	// converts tile cache key to coordinates
	  	_keyToTileCoords: function (key) {
	  		var k = key.split(':'),
	  		    coords = new Point(+k[0], +k[1]);
	  		coords.z = +k[2];
	  		return coords;
	  	},

	  	_removeTile: function (key) {
	  		var tile = this._tiles[key];
	  		if (!tile) { return; }

	  		remove(tile.el);

	  		delete this._tiles[key];

	  		// @event tileunload: TileEvent
	  		// Fired when a tile is removed (e.g. when a tile goes off the screen).
	  		this.fire('tileunload', {
	  			tile: tile.el,
	  			coords: this._keyToTileCoords(key)
	  		});
	  	},

	  	_initTile: function (tile) {
	  		addClass(tile, 'leaflet-tile');

	  		var tileSize = this.getTileSize();
	  		tile.style.width = tileSize.x + 'px';
	  		tile.style.height = tileSize.y + 'px';

	  		tile.onselectstart = falseFn;
	  		tile.onmousemove = falseFn;

	  		// update opacity on tiles in IE7-8 because of filter inheritance problems
	  		if (Browser.ielt9 && this.options.opacity < 1) {
	  			setOpacity(tile, this.options.opacity);
	  		}
	  	},

	  	_addTile: function (coords, container) {
	  		var tilePos = this._getTilePos(coords),
	  		    key = this._tileCoordsToKey(coords);

	  		var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));

	  		this._initTile(tile);

	  		// if createTile is defined with a second argument ("done" callback),
	  		// we know that tile is async and will be ready later; otherwise
	  		if (this.createTile.length < 2) {
	  			// mark tile as ready, but delay one frame for opacity animation to happen
	  			requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
	  		}

	  		setPosition(tile, tilePos);

	  		// save tile in cache
	  		this._tiles[key] = {
	  			el: tile,
	  			coords: coords,
	  			current: true
	  		};

	  		container.appendChild(tile);
	  		// @event tileloadstart: TileEvent
	  		// Fired when a tile is requested and starts loading.
	  		this.fire('tileloadstart', {
	  			tile: tile,
	  			coords: coords
	  		});
	  	},

	  	_tileReady: function (coords, err, tile) {
	  		if (err) {
	  			// @event tileerror: TileErrorEvent
	  			// Fired when there is an error loading a tile.
	  			this.fire('tileerror', {
	  				error: err,
	  				tile: tile,
	  				coords: coords
	  			});
	  		}

	  		var key = this._tileCoordsToKey(coords);

	  		tile = this._tiles[key];
	  		if (!tile) { return; }

	  		tile.loaded = +new Date();
	  		if (this._map._fadeAnimated) {
	  			setOpacity(tile.el, 0);
	  			cancelAnimFrame(this._fadeFrame);
	  			this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
	  		} else {
	  			tile.active = true;
	  			this._pruneTiles();
	  		}

	  		if (!err) {
	  			addClass(tile.el, 'leaflet-tile-loaded');

	  			// @event tileload: TileEvent
	  			// Fired when a tile loads.
	  			this.fire('tileload', {
	  				tile: tile.el,
	  				coords: coords
	  			});
	  		}

	  		if (this._noTilesToLoad()) {
	  			this._loading = false;
	  			// @event load: Event
	  			// Fired when the grid layer loaded all visible tiles.
	  			this.fire('load');

	  			if (Browser.ielt9 || !this._map._fadeAnimated) {
	  				requestAnimFrame(this._pruneTiles, this);
	  			} else {
	  				// Wait a bit more than 0.2 secs (the duration of the tile fade-in)
	  				// to trigger a pruning.
	  				setTimeout(bind(this._pruneTiles, this), 250);
	  			}
	  		}
	  	},

	  	_getTilePos: function (coords) {
	  		return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
	  	},

	  	_wrapCoords: function (coords) {
	  		var newCoords = new Point(
	  			this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
	  			this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y);
	  		newCoords.z = coords.z;
	  		return newCoords;
	  	},

	  	_pxBoundsToTileRange: function (bounds) {
	  		var tileSize = this.getTileSize();
	  		return new Bounds(
	  			bounds.min.unscaleBy(tileSize).floor(),
	  			bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
	  	},

	  	_noTilesToLoad: function () {
	  		for (var key in this._tiles) {
	  			if (!this._tiles[key].loaded) { return false; }
	  		}
	  		return true;
	  	}
	  });

	  // @factory L.gridLayer(options?: GridLayer options)
	  // Creates a new instance of GridLayer with the supplied options.
	  function gridLayer(options) {
	  	return new GridLayer(options);
	  }

	  /*
	   * @class TileLayer
	   * @inherits GridLayer
	   * @aka L.TileLayer
	   * Used to load and display tile layers on the map. Note that most tile servers require attribution, which you can set under `Layer`. Extends `GridLayer`.
	   *
	   * @example
	   *
	   * ```js
	   * L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
	   * ```
	   *
	   * @section URL template
	   * @example
	   *
	   * A string of the following form:
	   *
	   * ```
	   * 'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
	   * ```
	   *
	   * `{s}` means one of the available subdomains (used sequentially to help with browser parallel requests per domain limitation; subdomain values are specified in options; `a`, `b` or `c` by default, can be omitted), `{z}` — zoom level, `{x}` and `{y}` — tile coordinates. `{r}` can be used to add "&commat;2x" to the URL to load retina tiles.
	   *
	   * You can use custom keys in the template, which will be [evaluated](#util-template) from TileLayer options, like this:
	   *
	   * ```
	   * L.tileLayer('https://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
	   * ```
	   */


	  var TileLayer = GridLayer.extend({

	  	// @section
	  	// @aka TileLayer options
	  	options: {
	  		// @option minZoom: Number = 0
	  		// The minimum zoom level down to which this layer will be displayed (inclusive).
	  		minZoom: 0,

	  		// @option maxZoom: Number = 18
	  		// The maximum zoom level up to which this layer will be displayed (inclusive).
	  		maxZoom: 18,

	  		// @option subdomains: String|String[] = 'abc'
	  		// Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
	  		subdomains: 'abc',

	  		// @option errorTileUrl: String = ''
	  		// URL to the tile image to show in place of the tile that failed to load.
	  		errorTileUrl: '',

	  		// @option zoomOffset: Number = 0
	  		// The zoom number used in tile URLs will be offset with this value.
	  		zoomOffset: 0,

	  		// @option tms: Boolean = false
	  		// If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
	  		tms: false,

	  		// @option zoomReverse: Boolean = false
	  		// If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
	  		zoomReverse: false,

	  		// @option detectRetina: Boolean = false
	  		// If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
	  		detectRetina: false,

	  		// @option crossOrigin: Boolean|String = false
	  		// Whether the crossOrigin attribute will be added to the tiles.
	  		// If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
	  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
	  		crossOrigin: false,

	  		// @option referrerPolicy: Boolean|String = false
	  		// Whether the referrerPolicy attribute will be added to the tiles.
	  		// If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
	  		// This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
	  		// (e.g. to validate an API token).
	  		// Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
	  		referrerPolicy: false
	  	},

	  	initialize: function (url, options) {

	  		this._url = url;

	  		options = setOptions(this, options);

	  		// detecting retina displays, adjusting tileSize and zoom levels
	  		if (options.detectRetina && Browser.retina && options.maxZoom > 0) {

	  			options.tileSize = Math.floor(options.tileSize / 2);

	  			if (!options.zoomReverse) {
	  				options.zoomOffset++;
	  				options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
	  			} else {
	  				options.zoomOffset--;
	  				options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
	  			}

	  			options.minZoom = Math.max(0, options.minZoom);
	  		} else if (!options.zoomReverse) {
	  			// make sure maxZoom is gte minZoom
	  			options.maxZoom = Math.max(options.minZoom, options.maxZoom);
	  		} else {
	  			// make sure minZoom is lte maxZoom
	  			options.minZoom = Math.min(options.maxZoom, options.minZoom);
	  		}

	  		if (typeof options.subdomains === 'string') {
	  			options.subdomains = options.subdomains.split('');
	  		}

	  		this.on('tileunload', this._onTileRemove);
	  	},

	  	// @method setUrl(url: String, noRedraw?: Boolean): this
	  	// Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
	  	// If the URL does not change, the layer will not be redrawn unless
	  	// the noRedraw parameter is set to false.
	  	setUrl: function (url, noRedraw) {
	  		if (this._url === url && noRedraw === undefined) {
	  			noRedraw = true;
	  		}

	  		this._url = url;

	  		if (!noRedraw) {
	  			this.redraw();
	  		}
	  		return this;
	  	},

	  	// @method createTile(coords: Object, done?: Function): HTMLElement
	  	// Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
	  	// to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
	  	// callback is called when the tile has been loaded.
	  	createTile: function (coords, done) {
	  		var tile = document.createElement('img');

	  		on(tile, 'load', bind(this._tileOnLoad, this, done, tile));
	  		on(tile, 'error', bind(this._tileOnError, this, done, tile));

	  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
	  			tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
	  		}

	  		// for this new option we follow the documented behavior
	  		// more closely by only setting the property when string
	  		if (typeof this.options.referrerPolicy === 'string') {
	  			tile.referrerPolicy = this.options.referrerPolicy;
	  		}

	  		// The alt attribute is set to the empty string,
	  		// allowing screen readers to ignore the decorative image tiles.
	  		// https://www.w3.org/WAI/tutorials/images/decorative/
	  		// https://www.w3.org/TR/html-aria/#el-img-empty-alt
	  		tile.alt = '';

	  		tile.src = this.getTileUrl(coords);

	  		return tile;
	  	},

	  	// @section Extension methods
	  	// @uninheritable
	  	// Layers extending `TileLayer` might reimplement the following method.
	  	// @method getTileUrl(coords: Object): String
	  	// Called only internally, returns the URL for a tile given its coordinates.
	  	// Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
	  	getTileUrl: function (coords) {
	  		var data = {
	  			r: Browser.retina ? '@2x' : '',
	  			s: this._getSubdomain(coords),
	  			x: coords.x,
	  			y: coords.y,
	  			z: this._getZoomForUrl()
	  		};
	  		if (this._map && !this._map.options.crs.infinite) {
	  			var invertedY = this._globalTileRange.max.y - coords.y;
	  			if (this.options.tms) {
	  				data['y'] = invertedY;
	  			}
	  			data['-y'] = invertedY;
	  		}

	  		return template(this._url, extend(data, this.options));
	  	},

	  	_tileOnLoad: function (done, tile) {
	  		// For https://github.com/Leaflet/Leaflet/issues/3332
	  		if (Browser.ielt9) {
	  			setTimeout(bind(done, this, null, tile), 0);
	  		} else {
	  			done(null, tile);
	  		}
	  	},

	  	_tileOnError: function (done, tile, e) {
	  		var errorUrl = this.options.errorTileUrl;
	  		if (errorUrl && tile.getAttribute('src') !== errorUrl) {
	  			tile.src = errorUrl;
	  		}
	  		done(e, tile);
	  	},

	  	_onTileRemove: function (e) {
	  		e.tile.onload = null;
	  	},

	  	_getZoomForUrl: function () {
	  		var zoom = this._tileZoom,
	  		maxZoom = this.options.maxZoom,
	  		zoomReverse = this.options.zoomReverse,
	  		zoomOffset = this.options.zoomOffset;

	  		if (zoomReverse) {
	  			zoom = maxZoom - zoom;
	  		}

	  		return zoom + zoomOffset;
	  	},

	  	_getSubdomain: function (tilePoint) {
	  		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
	  		return this.options.subdomains[index];
	  	},

	  	// stops loading all tiles in the background layer
	  	_abortLoading: function () {
	  		var i, tile;
	  		for (i in this._tiles) {
	  			if (this._tiles[i].coords.z !== this._tileZoom) {
	  				tile = this._tiles[i].el;

	  				tile.onload = falseFn;
	  				tile.onerror = falseFn;

	  				if (!tile.complete) {
	  					tile.src = emptyImageUrl;
	  					var coords = this._tiles[i].coords;
	  					remove(tile);
	  					delete this._tiles[i];
	  					// @event tileabort: TileEvent
	  					// Fired when a tile was loading but is now not wanted.
	  					this.fire('tileabort', {
	  						tile: tile,
	  						coords: coords
	  					});
	  				}
	  			}
	  		}
	  	},

	  	_removeTile: function (key) {
	  		var tile = this._tiles[key];
	  		if (!tile) { return; }

	  		// Cancels any pending http requests associated with the tile
	  		tile.el.setAttribute('src', emptyImageUrl);

	  		return GridLayer.prototype._removeTile.call(this, key);
	  	},

	  	_tileReady: function (coords, err, tile) {
	  		if (!this._map || (tile && tile.getAttribute('src') === emptyImageUrl)) {
	  			return;
	  		}

	  		return GridLayer.prototype._tileReady.call(this, coords, err, tile);
	  	}
	  });


	  // @factory L.tilelayer(urlTemplate: String, options?: TileLayer options)
	  // Instantiates a tile layer object given a `URL template` and optionally an options object.

	  function tileLayer(url, options) {
	  	return new TileLayer(url, options);
	  }

	  /*
	   * @class TileLayer.WMS
	   * @inherits TileLayer
	   * @aka L.TileLayer.WMS
	   * Used to display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map. Extends `TileLayer`.
	   *
	   * @example
	   *
	   * ```js
	   * var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
	   * 	layers: 'nexrad-n0r-900913',
	   * 	format: 'image/png',
	   * 	transparent: true,
	   * 	attribution: "Weather data © 2012 IEM Nexrad"
	   * });
	   * ```
	   */

	  var TileLayerWMS = TileLayer.extend({

	  	// @section
	  	// @aka TileLayer.WMS options
	  	// If any custom options not documented here are used, they will be sent to the
	  	// WMS server as extra parameters in each request URL. This can be useful for
	  	// [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
	  	defaultWmsParams: {
	  		service: 'WMS',
	  		request: 'GetMap',

	  		// @option layers: String = ''
	  		// **(required)** Comma-separated list of WMS layers to show.
	  		layers: '',

	  		// @option styles: String = ''
	  		// Comma-separated list of WMS styles.
	  		styles: '',

	  		// @option format: String = 'image/jpeg'
	  		// WMS image format (use `'image/png'` for layers with transparency).
	  		format: 'image/jpeg',

	  		// @option transparent: Boolean = false
	  		// If `true`, the WMS service will return images with transparency.
	  		transparent: false,

	  		// @option version: String = '1.1.1'
	  		// Version of the WMS service to use
	  		version: '1.1.1'
	  	},

	  	options: {
	  		// @option crs: CRS = null
	  		// Coordinate Reference System to use for the WMS requests, defaults to
	  		// map CRS. Don't change this if you're not sure what it means.
	  		crs: null,

	  		// @option uppercase: Boolean = false
	  		// If `true`, WMS request parameter keys will be uppercase.
	  		uppercase: false
	  	},

	  	initialize: function (url, options) {

	  		this._url = url;

	  		var wmsParams = extend({}, this.defaultWmsParams);

	  		// all keys that are not TileLayer options go to WMS params
	  		for (var i in options) {
	  			if (!(i in this.options)) {
	  				wmsParams[i] = options[i];
	  			}
	  		}

	  		options = setOptions(this, options);

	  		var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
	  		var tileSize = this.getTileSize();
	  		wmsParams.width = tileSize.x * realRetina;
	  		wmsParams.height = tileSize.y * realRetina;

	  		this.wmsParams = wmsParams;
	  	},

	  	onAdd: function (map) {

	  		this._crs = this.options.crs || map.options.crs;
	  		this._wmsVersion = parseFloat(this.wmsParams.version);

	  		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
	  		this.wmsParams[projectionKey] = this._crs.code;

	  		TileLayer.prototype.onAdd.call(this, map);
	  	},

	  	getTileUrl: function (coords) {

	  		var tileBounds = this._tileCoordsToNwSe(coords),
	  		    crs = this._crs,
	  		    bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])),
	  		    min = bounds.min,
	  		    max = bounds.max,
	  		    bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ?
	  		    [min.y, min.x, max.y, max.x] :
	  		    [min.x, min.y, max.x, max.y]).join(','),
	  		    url = TileLayer.prototype.getTileUrl.call(this, coords);
	  		return url +
	  			getParamString(this.wmsParams, url, this.options.uppercase) +
	  			(this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
	  	},

	  	// @method setParams(params: Object, noRedraw?: Boolean): this
	  	// Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
	  	setParams: function (params, noRedraw) {

	  		extend(this.wmsParams, params);

	  		if (!noRedraw) {
	  			this.redraw();
	  		}

	  		return this;
	  	}
	  });


	  // @factory L.tileLayer.wms(baseUrl: String, options: TileLayer.WMS options)
	  // Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object.
	  function tileLayerWMS(url, options) {
	  	return new TileLayerWMS(url, options);
	  }

	  TileLayer.WMS = TileLayerWMS;
	  tileLayer.wms = tileLayerWMS;

	  /*
	   * @class Renderer
	   * @inherits Layer
	   * @aka L.Renderer
	   *
	   * Base class for vector renderer implementations (`SVG`, `Canvas`). Handles the
	   * DOM container of the renderer, its bounds, and its zoom animation.
	   *
	   * A `Renderer` works as an implicit layer group for all `Path`s - the renderer
	   * itself can be added or removed to the map. All paths use a renderer, which can
	   * be implicit (the map will decide the type of renderer and use it automatically)
	   * or explicit (using the [`renderer`](#path-renderer) option of the path).
	   *
	   * Do not use this class directly, use `SVG` and `Canvas` instead.
	   *
	   * @event update: Event
	   * Fired when the renderer updates its bounds, center and zoom, for example when
	   * its map has moved
	   */

	  var Renderer = Layer.extend({

	  	// @section
	  	// @aka Renderer options
	  	options: {
	  		// @option padding: Number = 0.1
	  		// How much to extend the clip area around the map view (relative to its size)
	  		// e.g. 0.1 would be 10% of map view in each direction
	  		padding: 0.1
	  	},

	  	initialize: function (options) {
	  		setOptions(this, options);
	  		stamp(this);
	  		this._layers = this._layers || {};
	  	},

	  	onAdd: function () {
	  		if (!this._container) {
	  			this._initContainer(); // defined by renderer implementations

	  			// always keep transform-origin as 0 0
	  			addClass(this._container, 'leaflet-zoom-animated');
	  		}

	  		this.getPane().appendChild(this._container);
	  		this._update();
	  		this.on('update', this._updatePaths, this);
	  	},

	  	onRemove: function () {
	  		this.off('update', this._updatePaths, this);
	  		this._destroyContainer();
	  	},

	  	getEvents: function () {
	  		var events = {
	  			viewreset: this._reset,
	  			zoom: this._onZoom,
	  			moveend: this._update,
	  			zoomend: this._onZoomEnd
	  		};
	  		if (this._zoomAnimated) {
	  			events.zoomanim = this._onAnimZoom;
	  		}
	  		return events;
	  	},

	  	_onAnimZoom: function (ev) {
	  		this._updateTransform(ev.center, ev.zoom);
	  	},

	  	_onZoom: function () {
	  		this._updateTransform(this._map.getCenter(), this._map.getZoom());
	  	},

	  	_updateTransform: function (center, zoom) {
	  		var scale = this._map.getZoomScale(zoom, this._zoom),
	  		    viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding),
	  		    currentCenterPoint = this._map.project(this._center, zoom),

	  		    topLeftOffset = viewHalf.multiplyBy(-scale).add(currentCenterPoint)
	  				  .subtract(this._map._getNewPixelOrigin(center, zoom));

	  		if (Browser.any3d) {
	  			setTransform(this._container, topLeftOffset, scale);
	  		} else {
	  			setPosition(this._container, topLeftOffset);
	  		}
	  	},

	  	_reset: function () {
	  		this._update();
	  		this._updateTransform(this._center, this._zoom);

	  		for (var id in this._layers) {
	  			this._layers[id]._reset();
	  		}
	  	},

	  	_onZoomEnd: function () {
	  		for (var id in this._layers) {
	  			this._layers[id]._project();
	  		}
	  	},

	  	_updatePaths: function () {
	  		for (var id in this._layers) {
	  			this._layers[id]._update();
	  		}
	  	},

	  	_update: function () {
	  		// Update pixel bounds of renderer container (for positioning/sizing/clipping later)
	  		// Subclasses are responsible of firing the 'update' event.
	  		var p = this.options.padding,
	  		    size = this._map.getSize(),
	  		    min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();

	  		this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());

	  		this._center = this._map.getCenter();
	  		this._zoom = this._map.getZoom();
	  	}
	  });

	  /*
	   * @class Canvas
	   * @inherits Renderer
	   * @aka L.Canvas
	   *
	   * Allows vector layers to be displayed with [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
	   * Inherits `Renderer`.
	   *
	   * Due to [technical limitations](https://caniuse.com/canvas), Canvas is not
	   * available in all web browsers, notably IE8, and overlapping geometries might
	   * not display properly in some edge cases.
	   *
	   * @example
	   *
	   * Use Canvas by default for all paths in the map:
	   *
	   * ```js
	   * var map = L.map('map', {
	   * 	renderer: L.canvas()
	   * });
	   * ```
	   *
	   * Use a Canvas renderer with extra padding for specific vector geometries:
	   *
	   * ```js
	   * var map = L.map('map');
	   * var myRenderer = L.canvas({ padding: 0.5 });
	   * var line = L.polyline( coordinates, { renderer: myRenderer } );
	   * var circle = L.circle( center, { renderer: myRenderer } );
	   * ```
	   */

	  var Canvas = Renderer.extend({

	  	// @section
	  	// @aka Canvas options
	  	options: {
	  		// @option tolerance: Number = 0
	  		// How much to extend the click tolerance around a path/object on the map.
	  		tolerance: 0
	  	},

	  	getEvents: function () {
	  		var events = Renderer.prototype.getEvents.call(this);
	  		events.viewprereset = this._onViewPreReset;
	  		return events;
	  	},

	  	_onViewPreReset: function () {
	  		// Set a flag so that a viewprereset+moveend+viewreset only updates&redraws once
	  		this._postponeUpdatePaths = true;
	  	},

	  	onAdd: function () {
	  		Renderer.prototype.onAdd.call(this);

	  		// Redraw vectors since canvas is cleared upon removal,
	  		// in case of removing the renderer itself from the map.
	  		this._draw();
	  	},

	  	_initContainer: function () {
	  		var container = this._container = document.createElement('canvas');

	  		on(container, 'mousemove', this._onMouseMove, this);
	  		on(container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this);
	  		on(container, 'mouseout', this._handleMouseOut, this);
	  		container['_leaflet_disable_events'] = true;

	  		this._ctx = container.getContext('2d');
	  	},

	  	_destroyContainer: function () {
	  		cancelAnimFrame(this._redrawRequest);
	  		delete this._ctx;
	  		remove(this._container);
	  		off(this._container);
	  		delete this._container;
	  	},

	  	_updatePaths: function () {
	  		if (this._postponeUpdatePaths) { return; }

	  		var layer;
	  		this._redrawBounds = null;
	  		for (var id in this._layers) {
	  			layer = this._layers[id];
	  			layer._update();
	  		}
	  		this._redraw();
	  	},

	  	_update: function () {
	  		if (this._map._animatingZoom && this._bounds) { return; }

	  		Renderer.prototype._update.call(this);

	  		var b = this._bounds,
	  		    container = this._container,
	  		    size = b.getSize(),
	  		    m = Browser.retina ? 2 : 1;

	  		setPosition(container, b.min);

	  		// set canvas size (also clearing it); use double size on retina
	  		container.width = m * size.x;
	  		container.height = m * size.y;
	  		container.style.width = size.x + 'px';
	  		container.style.height = size.y + 'px';

	  		if (Browser.retina) {
	  			this._ctx.scale(2, 2);
	  		}

	  		// translate so we use the same path coordinates after canvas element moves
	  		this._ctx.translate(-b.min.x, -b.min.y);

	  		// Tell paths to redraw themselves
	  		this.fire('update');
	  	},

	  	_reset: function () {
	  		Renderer.prototype._reset.call(this);

	  		if (this._postponeUpdatePaths) {
	  			this._postponeUpdatePaths = false;
	  			this._updatePaths();
	  		}
	  	},

	  	_initPath: function (layer) {
	  		this._updateDashArray(layer);
	  		this._layers[stamp(layer)] = layer;

	  		var order = layer._order = {
	  			layer: layer,
	  			prev: this._drawLast,
	  			next: null
	  		};
	  		if (this._drawLast) { this._drawLast.next = order; }
	  		this._drawLast = order;
	  		this._drawFirst = this._drawFirst || this._drawLast;
	  	},

	  	_addPath: function (layer) {
	  		this._requestRedraw(layer);
	  	},

	  	_removePath: function (layer) {
	  		var order = layer._order;
	  		var next = order.next;
	  		var prev = order.prev;

	  		if (next) {
	  			next.prev = prev;
	  		} else {
	  			this._drawLast = prev;
	  		}
	  		if (prev) {
	  			prev.next = next;
	  		} else {
	  			this._drawFirst = next;
	  		}

	  		delete layer._order;

	  		delete this._layers[stamp(layer)];

	  		this._requestRedraw(layer);
	  	},

	  	_updatePath: function (layer) {
	  		// Redraw the union of the layer's old pixel
	  		// bounds and the new pixel bounds.
	  		this._extendRedrawBounds(layer);
	  		layer._project();
	  		layer._update();
	  		// The redraw will extend the redraw bounds
	  		// with the new pixel bounds.
	  		this._requestRedraw(layer);
	  	},

	  	_updateStyle: function (layer) {
	  		this._updateDashArray(layer);
	  		this._requestRedraw(layer);
	  	},

	  	_updateDashArray: function (layer) {
	  		if (typeof layer.options.dashArray === 'string') {
	  			var parts = layer.options.dashArray.split(/[, ]+/),
	  			    dashArray = [],
	  			    dashValue,
	  			    i;
	  			for (i = 0; i < parts.length; i++) {
	  				dashValue = Number(parts[i]);
	  				// Ignore dash array containing invalid lengths
	  				if (isNaN(dashValue)) { return; }
	  				dashArray.push(dashValue);
	  			}
	  			layer.options._dashArray = dashArray;
	  		} else {
	  			layer.options._dashArray = layer.options.dashArray;
	  		}
	  	},

	  	_requestRedraw: function (layer) {
	  		if (!this._map) { return; }

	  		this._extendRedrawBounds(layer);
	  		this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
	  	},

	  	_extendRedrawBounds: function (layer) {
	  		if (layer._pxBounds) {
	  			var padding = (layer.options.weight || 0) + 1;
	  			this._redrawBounds = this._redrawBounds || new Bounds();
	  			this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
	  			this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
	  		}
	  	},

	  	_redraw: function () {
	  		this._redrawRequest = null;

	  		if (this._redrawBounds) {
	  			this._redrawBounds.min._floor();
	  			this._redrawBounds.max._ceil();
	  		}

	  		this._clear(); // clear layers in redraw bounds
	  		this._draw(); // draw layers

	  		this._redrawBounds = null;
	  	},

	  	_clear: function () {
	  		var bounds = this._redrawBounds;
	  		if (bounds) {
	  			var size = bounds.getSize();
	  			this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
	  		} else {
	  			this._ctx.save();
	  			this._ctx.setTransform(1, 0, 0, 1, 0, 0);
	  			this._ctx.clearRect(0, 0, this._container.width, this._container.height);
	  			this._ctx.restore();
	  		}
	  	},

	  	_draw: function () {
	  		var layer, bounds = this._redrawBounds;
	  		this._ctx.save();
	  		if (bounds) {
	  			var size = bounds.getSize();
	  			this._ctx.beginPath();
	  			this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
	  			this._ctx.clip();
	  		}

	  		this._drawing = true;

	  		for (var order = this._drawFirst; order; order = order.next) {
	  			layer = order.layer;
	  			if (!bounds || (layer._pxBounds && layer._pxBounds.intersects(bounds))) {
	  				layer._updatePath();
	  			}
	  		}

	  		this._drawing = false;

	  		this._ctx.restore();  // Restore state before clipping.
	  	},

	  	_updatePoly: function (layer, closed) {
	  		if (!this._drawing) { return; }

	  		var i, j, len2, p,
	  		    parts = layer._parts,
	  		    len = parts.length,
	  		    ctx = this._ctx;

	  		if (!len) { return; }

	  		ctx.beginPath();

	  		for (i = 0; i < len; i++) {
	  			for (j = 0, len2 = parts[i].length; j < len2; j++) {
	  				p = parts[i][j];
	  				ctx[j ? 'lineTo' : 'moveTo'](p.x, p.y);
	  			}
	  			if (closed) {
	  				ctx.closePath();
	  			}
	  		}

	  		this._fillStroke(ctx, layer);

	  		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
	  	},

	  	_updateCircle: function (layer) {

	  		if (!this._drawing || layer._empty()) { return; }

	  		var p = layer._point,
	  		    ctx = this._ctx,
	  		    r = Math.max(Math.round(layer._radius), 1),
	  		    s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;

	  		if (s !== 1) {
	  			ctx.save();
	  			ctx.scale(1, s);
	  		}

	  		ctx.beginPath();
	  		ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);

	  		if (s !== 1) {
	  			ctx.restore();
	  		}

	  		this._fillStroke(ctx, layer);
	  	},

	  	_fillStroke: function (ctx, layer) {
	  		var options = layer.options;

	  		if (options.fill) {
	  			ctx.globalAlpha = options.fillOpacity;
	  			ctx.fillStyle = options.fillColor || options.color;
	  			ctx.fill(options.fillRule || 'evenodd');
	  		}

	  		if (options.stroke && options.weight !== 0) {
	  			if (ctx.setLineDash) {
	  				ctx.setLineDash(layer.options && layer.options._dashArray || []);
	  			}
	  			ctx.globalAlpha = options.opacity;
	  			ctx.lineWidth = options.weight;
	  			ctx.strokeStyle = options.color;
	  			ctx.lineCap = options.lineCap;
	  			ctx.lineJoin = options.lineJoin;
	  			ctx.stroke();
	  		}
	  	},

	  	// Canvas obviously doesn't have mouse events for individual drawn objects,
	  	// so we emulate that by calculating what's under the mouse on mousemove/click manually

	  	_onClick: function (e) {
	  		var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;

	  		for (var order = this._drawFirst; order; order = order.next) {
	  			layer = order.layer;
	  			if (layer.options.interactive && layer._containsPoint(point)) {
	  				if (!(e.type === 'click' || e.type === 'preclick') || !this._map._draggableMoved(layer)) {
	  					clickedLayer = layer;
	  				}
	  			}
	  		}
	  		this._fireEvent(clickedLayer ? [clickedLayer] : false, e);
	  	},

	  	_onMouseMove: function (e) {
	  		if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) { return; }

	  		var point = this._map.mouseEventToLayerPoint(e);
	  		this._handleMouseHover(e, point);
	  	},


	  	_handleMouseOut: function (e) {
	  		var layer = this._hoveredLayer;
	  		if (layer) {
	  			// if we're leaving the layer, fire mouseout
	  			removeClass(this._container, 'leaflet-interactive');
	  			this._fireEvent([layer], e, 'mouseout');
	  			this._hoveredLayer = null;
	  			this._mouseHoverThrottled = false;
	  		}
	  	},

	  	_handleMouseHover: function (e, point) {
	  		if (this._mouseHoverThrottled) {
	  			return;
	  		}

	  		var layer, candidateHoveredLayer;

	  		for (var order = this._drawFirst; order; order = order.next) {
	  			layer = order.layer;
	  			if (layer.options.interactive && layer._containsPoint(point)) {
	  				candidateHoveredLayer = layer;
	  			}
	  		}

	  		if (candidateHoveredLayer !== this._hoveredLayer) {
	  			this._handleMouseOut(e);

	  			if (candidateHoveredLayer) {
	  				addClass(this._container, 'leaflet-interactive'); // change cursor
	  				this._fireEvent([candidateHoveredLayer], e, 'mouseover');
	  				this._hoveredLayer = candidateHoveredLayer;
	  			}
	  		}

	  		this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e);

	  		this._mouseHoverThrottled = true;
	  		setTimeout(bind(function () {
	  			this._mouseHoverThrottled = false;
	  		}, this), 32);
	  	},

	  	_fireEvent: function (layers, e, type) {
	  		this._map._fireDOMEvent(e, type || e.type, layers);
	  	},

	  	_bringToFront: function (layer) {
	  		var order = layer._order;

	  		if (!order) { return; }

	  		var next = order.next;
	  		var prev = order.prev;

	  		if (next) {
	  			next.prev = prev;
	  		} else {
	  			// Already last
	  			return;
	  		}
	  		if (prev) {
	  			prev.next = next;
	  		} else if (next) {
	  			// Update first entry unless this is the
	  			// single entry
	  			this._drawFirst = next;
	  		}

	  		order.prev = this._drawLast;
	  		this._drawLast.next = order;

	  		order.next = null;
	  		this._drawLast = order;

	  		this._requestRedraw(layer);
	  	},

	  	_bringToBack: function (layer) {
	  		var order = layer._order;

	  		if (!order) { return; }

	  		var next = order.next;
	  		var prev = order.prev;

	  		if (prev) {
	  			prev.next = next;
	  		} else {
	  			// Already first
	  			return;
	  		}
	  		if (next) {
	  			next.prev = prev;
	  		} else if (prev) {
	  			// Update last entry unless this is the
	  			// single entry
	  			this._drawLast = prev;
	  		}

	  		order.prev = null;

	  		order.next = this._drawFirst;
	  		this._drawFirst.prev = order;
	  		this._drawFirst = order;

	  		this._requestRedraw(layer);
	  	}
	  });

	  // @factory L.canvas(options?: Renderer options)
	  // Creates a Canvas renderer with the given options.
	  function canvas(options) {
	  	return Browser.canvas ? new Canvas(options) : null;
	  }

	  /*
	   * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
	   */


	  var vmlCreate = (function () {
	  	try {
	  		document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
	  		return function (name) {
	  			return document.createElement('<lvml:' + name + ' class="lvml">');
	  		};
	  	} catch (e) {
	  		// Do not return fn from catch block so `e` can be garbage collected
	  		// See https://github.com/Leaflet/Leaflet/pull/7279
	  	}
	  	return function (name) {
	  		return document.createElement('<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
	  	};
	  })();


	  /*
	   * @class SVG
	   *
	   *
	   * VML was deprecated in 2012, which means VML functionality exists only for backwards compatibility
	   * with old versions of Internet Explorer.
	   */

	  // mixin to redefine some SVG methods to handle VML syntax which is similar but with some differences
	  var vmlMixin = {

	  	_initContainer: function () {
	  		this._container = create$1('div', 'leaflet-vml-container');
	  	},

	  	_update: function () {
	  		if (this._map._animatingZoom) { return; }
	  		Renderer.prototype._update.call(this);
	  		this.fire('update');
	  	},

	  	_initPath: function (layer) {
	  		var container = layer._container = vmlCreate('shape');

	  		addClass(container, 'leaflet-vml-shape ' + (this.options.className || ''));

	  		container.coordsize = '1 1';

	  		layer._path = vmlCreate('path');
	  		container.appendChild(layer._path);

	  		this._updateStyle(layer);
	  		this._layers[stamp(layer)] = layer;
	  	},

	  	_addPath: function (layer) {
	  		var container = layer._container;
	  		this._container.appendChild(container);

	  		if (layer.options.interactive) {
	  			layer.addInteractiveTarget(container);
	  		}
	  	},

	  	_removePath: function (layer) {
	  		var container = layer._container;
	  		remove(container);
	  		layer.removeInteractiveTarget(container);
	  		delete this._layers[stamp(layer)];
	  	},

	  	_updateStyle: function (layer) {
	  		var stroke = layer._stroke,
	  		    fill = layer._fill,
	  		    options = layer.options,
	  		    container = layer._container;

	  		container.stroked = !!options.stroke;
	  		container.filled = !!options.fill;

	  		if (options.stroke) {
	  			if (!stroke) {
	  				stroke = layer._stroke = vmlCreate('stroke');
	  			}
	  			container.appendChild(stroke);
	  			stroke.weight = options.weight + 'px';
	  			stroke.color = options.color;
	  			stroke.opacity = options.opacity;

	  			if (options.dashArray) {
	  				stroke.dashStyle = isArray(options.dashArray) ?
	  				    options.dashArray.join(' ') :
	  				    options.dashArray.replace(/( *, *)/g, ' ');
	  			} else {
	  				stroke.dashStyle = '';
	  			}
	  			stroke.endcap = options.lineCap.replace('butt', 'flat');
	  			stroke.joinstyle = options.lineJoin;

	  		} else if (stroke) {
	  			container.removeChild(stroke);
	  			layer._stroke = null;
	  		}

	  		if (options.fill) {
	  			if (!fill) {
	  				fill = layer._fill = vmlCreate('fill');
	  			}
	  			container.appendChild(fill);
	  			fill.color = options.fillColor || options.color;
	  			fill.opacity = options.fillOpacity;

	  		} else if (fill) {
	  			container.removeChild(fill);
	  			layer._fill = null;
	  		}
	  	},

	  	_updateCircle: function (layer) {
	  		var p = layer._point.round(),
	  		    r = Math.round(layer._radius),
	  		    r2 = Math.round(layer._radiusY || r);

	  		this._setPath(layer, layer._empty() ? 'M0 0' :
	  			'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r2 + ' 0,' + (65535 * 360));
	  	},

	  	_setPath: function (layer, path) {
	  		layer._path.v = path;
	  	},

	  	_bringToFront: function (layer) {
	  		toFront(layer._container);
	  	},

	  	_bringToBack: function (layer) {
	  		toBack(layer._container);
	  	}
	  };

	  var create = Browser.vml ? vmlCreate : svgCreate;

	  /*
	   * @class SVG
	   * @inherits Renderer
	   * @aka L.SVG
	   *
	   * Allows vector layers to be displayed with [SVG](https://developer.mozilla.org/docs/Web/SVG).
	   * Inherits `Renderer`.
	   *
	   * Due to [technical limitations](https://caniuse.com/svg), SVG is not
	   * available in all web browsers, notably Android 2.x and 3.x.
	   *
	   * Although SVG is not available on IE7 and IE8, these browsers support
	   * [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language)
	   * (a now deprecated technology), and the SVG renderer will fall back to VML in
	   * this case.
	   *
	   * @example
	   *
	   * Use SVG by default for all paths in the map:
	   *
	   * ```js
	   * var map = L.map('map', {
	   * 	renderer: L.svg()
	   * });
	   * ```
	   *
	   * Use a SVG renderer with extra padding for specific vector geometries:
	   *
	   * ```js
	   * var map = L.map('map');
	   * var myRenderer = L.svg({ padding: 0.5 });
	   * var line = L.polyline( coordinates, { renderer: myRenderer } );
	   * var circle = L.circle( center, { renderer: myRenderer } );
	   * ```
	   */

	  var SVG = Renderer.extend({

	  	_initContainer: function () {
	  		this._container = create('svg');

	  		// makes it possible to click through svg root; we'll reset it back in individual paths
	  		this._container.setAttribute('pointer-events', 'none');

	  		this._rootGroup = create('g');
	  		this._container.appendChild(this._rootGroup);
	  	},

	  	_destroyContainer: function () {
	  		remove(this._container);
	  		off(this._container);
	  		delete this._container;
	  		delete this._rootGroup;
	  		delete this._svgSize;
	  	},

	  	_update: function () {
	  		if (this._map._animatingZoom && this._bounds) { return; }

	  		Renderer.prototype._update.call(this);

	  		var b = this._bounds,
	  		    size = b.getSize(),
	  		    container = this._container;

	  		// set size of svg-container if changed
	  		if (!this._svgSize || !this._svgSize.equals(size)) {
	  			this._svgSize = size;
	  			container.setAttribute('width', size.x);
	  			container.setAttribute('height', size.y);
	  		}

	  		// movement: update container viewBox so that we don't have to change coordinates of individual layers
	  		setPosition(container, b.min);
	  		container.setAttribute('viewBox', [b.min.x, b.min.y, size.x, size.y].join(' '));

	  		this.fire('update');
	  	},

	  	// methods below are called by vector layers implementations

	  	_initPath: function (layer) {
	  		var path = layer._path = create('path');

	  		// @namespace Path
	  		// @option className: String = null
	  		// Custom class name set on an element. Only for SVG renderer.
	  		if (layer.options.className) {
	  			addClass(path, layer.options.className);
	  		}

	  		if (layer.options.interactive) {
	  			addClass(path, 'leaflet-interactive');
	  		}

	  		this._updateStyle(layer);
	  		this._layers[stamp(layer)] = layer;
	  	},

	  	_addPath: function (layer) {
	  		if (!this._rootGroup) { this._initContainer(); }
	  		this._rootGroup.appendChild(layer._path);
	  		layer.addInteractiveTarget(layer._path);
	  	},

	  	_removePath: function (layer) {
	  		remove(layer._path);
	  		layer.removeInteractiveTarget(layer._path);
	  		delete this._layers[stamp(layer)];
	  	},

	  	_updatePath: function (layer) {
	  		layer._project();
	  		layer._update();
	  	},

	  	_updateStyle: function (layer) {
	  		var path = layer._path,
	  		    options = layer.options;

	  		if (!path) { return; }

	  		if (options.stroke) {
	  			path.setAttribute('stroke', options.color);
	  			path.setAttribute('stroke-opacity', options.opacity);
	  			path.setAttribute('stroke-width', options.weight);
	  			path.setAttribute('stroke-linecap', options.lineCap);
	  			path.setAttribute('stroke-linejoin', options.lineJoin);

	  			if (options.dashArray) {
	  				path.setAttribute('stroke-dasharray', options.dashArray);
	  			} else {
	  				path.removeAttribute('stroke-dasharray');
	  			}

	  			if (options.dashOffset) {
	  				path.setAttribute('stroke-dashoffset', options.dashOffset);
	  			} else {
	  				path.removeAttribute('stroke-dashoffset');
	  			}
	  		} else {
	  			path.setAttribute('stroke', 'none');
	  		}

	  		if (options.fill) {
	  			path.setAttribute('fill', options.fillColor || options.color);
	  			path.setAttribute('fill-opacity', options.fillOpacity);
	  			path.setAttribute('fill-rule', options.fillRule || 'evenodd');
	  		} else {
	  			path.setAttribute('fill', 'none');
	  		}
	  	},

	  	_updatePoly: function (layer, closed) {
	  		this._setPath(layer, pointsToPath(layer._parts, closed));
	  	},

	  	_updateCircle: function (layer) {
	  		var p = layer._point,
	  		    r = Math.max(Math.round(layer._radius), 1),
	  		    r2 = Math.max(Math.round(layer._radiusY), 1) || r,
	  		    arc = 'a' + r + ',' + r2 + ' 0 1,0 ';

	  		// drawing a circle with two half-arcs
	  		var d = layer._empty() ? 'M0 0' :
	  			'M' + (p.x - r) + ',' + p.y +
	  			arc + (r * 2) + ',0 ' +
	  			arc + (-r * 2) + ',0 ';

	  		this._setPath(layer, d);
	  	},

	  	_setPath: function (layer, path) {
	  		layer._path.setAttribute('d', path);
	  	},

	  	// SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
	  	_bringToFront: function (layer) {
	  		toFront(layer._path);
	  	},

	  	_bringToBack: function (layer) {
	  		toBack(layer._path);
	  	}
	  });

	  if (Browser.vml) {
	  	SVG.include(vmlMixin);
	  }

	  // @namespace SVG
	  // @factory L.svg(options?: Renderer options)
	  // Creates a SVG renderer with the given options.
	  function svg(options) {
	  	return Browser.svg || Browser.vml ? new SVG(options) : null;
	  }

	  Map.include({
	  	// @namespace Map; @method getRenderer(layer: Path): Renderer
	  	// Returns the instance of `Renderer` that should be used to render the given
	  	// `Path`. It will ensure that the `renderer` options of the map and paths
	  	// are respected, and that the renderers do exist on the map.
	  	getRenderer: function (layer) {
	  		// @namespace Path; @option renderer: Renderer
	  		// Use this specific instance of `Renderer` for this path. Takes
	  		// precedence over the map's [default renderer](#map-renderer).
	  		var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;

	  		if (!renderer) {
	  			renderer = this._renderer = this._createRenderer();
	  		}

	  		if (!this.hasLayer(renderer)) {
	  			this.addLayer(renderer);
	  		}
	  		return renderer;
	  	},

	  	_getPaneRenderer: function (name) {
	  		if (name === 'overlayPane' || name === undefined) {
	  			return false;
	  		}

	  		var renderer = this._paneRenderers[name];
	  		if (renderer === undefined) {
	  			renderer = this._createRenderer({pane: name});
	  			this._paneRenderers[name] = renderer;
	  		}
	  		return renderer;
	  	},

	  	_createRenderer: function (options) {
	  		// @namespace Map; @option preferCanvas: Boolean = false
	  		// Whether `Path`s should be rendered on a `Canvas` renderer.
	  		// By default, all `Path`s are rendered in a `SVG` renderer.
	  		return (this.options.preferCanvas && canvas(options)) || svg(options);
	  	}
	  });

	  /*
	   * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
	   */

	  /*
	   * @class Rectangle
	   * @aka L.Rectangle
	   * @inherits Polygon
	   *
	   * A class for drawing rectangle overlays on a map. Extends `Polygon`.
	   *
	   * @example
	   *
	   * ```js
	   * // define rectangle geographical bounds
	   * var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
	   *
	   * // create an orange rectangle
	   * L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
	   *
	   * // zoom the map to the rectangle bounds
	   * map.fitBounds(bounds);
	   * ```
	   *
	   */


	  var Rectangle = Polygon.extend({
	  	initialize: function (latLngBounds, options) {
	  		Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
	  	},

	  	// @method setBounds(latLngBounds: LatLngBounds): this
	  	// Redraws the rectangle with the passed bounds.
	  	setBounds: function (latLngBounds) {
	  		return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
	  	},

	  	_boundsToLatLngs: function (latLngBounds) {
	  		latLngBounds = toLatLngBounds(latLngBounds);
	  		return [
	  			latLngBounds.getSouthWest(),
	  			latLngBounds.getNorthWest(),
	  			latLngBounds.getNorthEast(),
	  			latLngBounds.getSouthEast()
	  		];
	  	}
	  });


	  // @factory L.rectangle(latLngBounds: LatLngBounds, options?: Polyline options)
	  function rectangle(latLngBounds, options) {
	  	return new Rectangle(latLngBounds, options);
	  }

	  SVG.create = create;
	  SVG.pointsToPath = pointsToPath;

	  GeoJSON.geometryToLayer = geometryToLayer;
	  GeoJSON.coordsToLatLng = coordsToLatLng;
	  GeoJSON.coordsToLatLngs = coordsToLatLngs;
	  GeoJSON.latLngToCoords = latLngToCoords;
	  GeoJSON.latLngsToCoords = latLngsToCoords;
	  GeoJSON.getFeature = getFeature;
	  GeoJSON.asFeature = asFeature;

	  /*
	   * L.Handler.BoxZoom is used to add shift-drag zoom interaction to the map
	   * (zoom to a selected bounding box), enabled by default.
	   */

	  // @namespace Map
	  // @section Interaction Options
	  Map.mergeOptions({
	  	// @option boxZoom: Boolean = true
	  	// Whether the map can be zoomed to a rectangular area specified by
	  	// dragging the mouse while pressing the shift key.
	  	boxZoom: true
	  });

	  var BoxZoom = Handler.extend({
	  	initialize: function (map) {
	  		this._map = map;
	  		this._container = map._container;
	  		this._pane = map._panes.overlayPane;
	  		this._resetStateTimeout = 0;
	  		map.on('unload', this._destroy, this);
	  	},

	  	addHooks: function () {
	  		on(this._container, 'mousedown', this._onMouseDown, this);
	  	},

	  	removeHooks: function () {
	  		off(this._container, 'mousedown', this._onMouseDown, this);
	  	},

	  	moved: function () {
	  		return this._moved;
	  	},

	  	_destroy: function () {
	  		remove(this._pane);
	  		delete this._pane;
	  	},

	  	_resetState: function () {
	  		this._resetStateTimeout = 0;
	  		this._moved = false;
	  	},

	  	_clearDeferredResetState: function () {
	  		if (this._resetStateTimeout !== 0) {
	  			clearTimeout(this._resetStateTimeout);
	  			this._resetStateTimeout = 0;
	  		}
	  	},

	  	_onMouseDown: function (e) {
	  		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

	  		// Clear the deferred resetState if it hasn't executed yet, otherwise it
	  		// will interrupt the interaction and orphan a box element in the container.
	  		this._clearDeferredResetState();
	  		this._resetState();

	  		disableTextSelection();
	  		disableImageDrag();

	  		this._startPoint = this._map.mouseEventToContainerPoint(e);

	  		on(document, {
	  			contextmenu: stop,
	  			mousemove: this._onMouseMove,
	  			mouseup: this._onMouseUp,
	  			keydown: this._onKeyDown
	  		}, this);
	  	},

	  	_onMouseMove: function (e) {
	  		if (!this._moved) {
	  			this._moved = true;

	  			this._box = create$1('div', 'leaflet-zoom-box', this._container);
	  			addClass(this._container, 'leaflet-crosshair');

	  			this._map.fire('boxzoomstart');
	  		}

	  		this._point = this._map.mouseEventToContainerPoint(e);

	  		var bounds = new Bounds(this._point, this._startPoint),
	  		    size = bounds.getSize();

	  		setPosition(this._box, bounds.min);

	  		this._box.style.width  = size.x + 'px';
	  		this._box.style.height = size.y + 'px';
	  	},

	  	_finish: function () {
	  		if (this._moved) {
	  			remove(this._box);
	  			removeClass(this._container, 'leaflet-crosshair');
	  		}

	  		enableTextSelection();
	  		enableImageDrag();

	  		off(document, {
	  			contextmenu: stop,
	  			mousemove: this._onMouseMove,
	  			mouseup: this._onMouseUp,
	  			keydown: this._onKeyDown
	  		}, this);
	  	},

	  	_onMouseUp: function (e) {
	  		if ((e.which !== 1) && (e.button !== 1)) { return; }

	  		this._finish();

	  		if (!this._moved) { return; }
	  		// Postpone to next JS tick so internal click event handling
	  		// still see it as "moved".
	  		this._clearDeferredResetState();
	  		this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);

	  		var bounds = new LatLngBounds(
	  		        this._map.containerPointToLatLng(this._startPoint),
	  		        this._map.containerPointToLatLng(this._point));

	  		this._map
	  			.fitBounds(bounds)
	  			.fire('boxzoomend', {boxZoomBounds: bounds});
	  	},

	  	_onKeyDown: function (e) {
	  		if (e.keyCode === 27) {
	  			this._finish();
	  			this._clearDeferredResetState();
	  			this._resetState();
	  		}
	  	}
	  });

	  // @section Handlers
	  // @property boxZoom: Handler
	  // Box (shift-drag with mouse) zoom handler.
	  Map.addInitHook('addHandler', 'boxZoom', BoxZoom);

	  /*
	   * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
	   */

	  // @namespace Map
	  // @section Interaction Options

	  Map.mergeOptions({
	  	// @option doubleClickZoom: Boolean|String = true
	  	// Whether the map can be zoomed in by double clicking on it and
	  	// zoomed out by double clicking while holding shift. If passed
	  	// `'center'`, double-click zoom will zoom to the center of the
	  	//  view regardless of where the mouse was.
	  	doubleClickZoom: true
	  });

	  var DoubleClickZoom = Handler.extend({
	  	addHooks: function () {
	  		this._map.on('dblclick', this._onDoubleClick, this);
	  	},

	  	removeHooks: function () {
	  		this._map.off('dblclick', this._onDoubleClick, this);
	  	},

	  	_onDoubleClick: function (e) {
	  		var map = this._map,
	  		    oldZoom = map.getZoom(),
	  		    delta = map.options.zoomDelta,
	  		    zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;

	  		if (map.options.doubleClickZoom === 'center') {
	  			map.setZoom(zoom);
	  		} else {
	  			map.setZoomAround(e.containerPoint, zoom);
	  		}
	  	}
	  });

	  // @section Handlers
	  //
	  // Map properties include interaction handlers that allow you to control
	  // interaction behavior in runtime, enabling or disabling certain features such
	  // as dragging or touch zoom (see `Handler` methods). For example:
	  //
	  // ```js
	  // map.doubleClickZoom.disable();
	  // ```
	  //
	  // @property doubleClickZoom: Handler
	  // Double click zoom handler.
	  Map.addInitHook('addHandler', 'doubleClickZoom', DoubleClickZoom);

	  /*
	   * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
	   */

	  // @namespace Map
	  // @section Interaction Options
	  Map.mergeOptions({
	  	// @option dragging: Boolean = true
	  	// Whether the map is draggable with mouse/touch or not.
	  	dragging: true,

	  	// @section Panning Inertia Options
	  	// @option inertia: Boolean = *
	  	// If enabled, panning of the map will have an inertia effect where
	  	// the map builds momentum while dragging and continues moving in
	  	// the same direction for some time. Feels especially nice on touch
	  	// devices. Enabled by default.
	  	inertia: true,

	  	// @option inertiaDeceleration: Number = 3000
	  	// The rate with which the inertial movement slows down, in pixels/second².
	  	inertiaDeceleration: 3400, // px/s^2

	  	// @option inertiaMaxSpeed: Number = Infinity
	  	// Max speed of the inertial movement, in pixels/second.
	  	inertiaMaxSpeed: Infinity, // px/s

	  	// @option easeLinearity: Number = 0.2
	  	easeLinearity: 0.2,

	  	// TODO refactor, move to CRS
	  	// @option worldCopyJump: Boolean = false
	  	// With this option enabled, the map tracks when you pan to another "copy"
	  	// of the world and seamlessly jumps to the original one so that all overlays
	  	// like markers and vector layers are still visible.
	  	worldCopyJump: false,

	  	// @option maxBoundsViscosity: Number = 0.0
	  	// If `maxBounds` is set, this option will control how solid the bounds
	  	// are when dragging the map around. The default value of `0.0` allows the
	  	// user to drag outside the bounds at normal speed, higher values will
	  	// slow down map dragging outside bounds, and `1.0` makes the bounds fully
	  	// solid, preventing the user from dragging outside the bounds.
	  	maxBoundsViscosity: 0.0
	  });

	  var Drag = Handler.extend({
	  	addHooks: function () {
	  		if (!this._draggable) {
	  			var map = this._map;

	  			this._draggable = new Draggable(map._mapPane, map._container);

	  			this._draggable.on({
	  				dragstart: this._onDragStart,
	  				drag: this._onDrag,
	  				dragend: this._onDragEnd
	  			}, this);

	  			this._draggable.on('predrag', this._onPreDragLimit, this);
	  			if (map.options.worldCopyJump) {
	  				this._draggable.on('predrag', this._onPreDragWrap, this);
	  				map.on('zoomend', this._onZoomEnd, this);

	  				map.whenReady(this._onZoomEnd, this);
	  			}
	  		}
	  		addClass(this._map._container, 'leaflet-grab leaflet-touch-drag');
	  		this._draggable.enable();
	  		this._positions = [];
	  		this._times = [];
	  	},

	  	removeHooks: function () {
	  		removeClass(this._map._container, 'leaflet-grab');
	  		removeClass(this._map._container, 'leaflet-touch-drag');
	  		this._draggable.disable();
	  	},

	  	moved: function () {
	  		return this._draggable && this._draggable._moved;
	  	},

	  	moving: function () {
	  		return this._draggable && this._draggable._moving;
	  	},

	  	_onDragStart: function () {
	  		var map = this._map;

	  		map._stop();
	  		if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
	  			var bounds = toLatLngBounds(this._map.options.maxBounds);

	  			this._offsetLimit = toBounds(
	  				this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
	  				this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1)
	  					.add(this._map.getSize()));

	  			this._viscosity = Math.min(1.0, Math.max(0.0, this._map.options.maxBoundsViscosity));
	  		} else {
	  			this._offsetLimit = null;
	  		}

	  		map
	  		    .fire('movestart')
	  		    .fire('dragstart');

	  		if (map.options.inertia) {
	  			this._positions = [];
	  			this._times = [];
	  		}
	  	},

	  	_onDrag: function (e) {
	  		if (this._map.options.inertia) {
	  			var time = this._lastTime = +new Date(),
	  			    pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;

	  			this._positions.push(pos);
	  			this._times.push(time);

	  			this._prunePositions(time);
	  		}

	  		this._map
	  		    .fire('move', e)
	  		    .fire('drag', e);
	  	},

	  	_prunePositions: function (time) {
	  		while (this._positions.length > 1 && time - this._times[0] > 50) {
	  			this._positions.shift();
	  			this._times.shift();
	  		}
	  	},

	  	_onZoomEnd: function () {
	  		var pxCenter = this._map.getSize().divideBy(2),
	  		    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

	  		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
	  		this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
	  	},

	  	_viscousLimit: function (value, threshold) {
	  		return value - (value - threshold) * this._viscosity;
	  	},

	  	_onPreDragLimit: function () {
	  		if (!this._viscosity || !this._offsetLimit) { return; }

	  		var offset = this._draggable._newPos.subtract(this._draggable._startPos);

	  		var limit = this._offsetLimit;
	  		if (offset.x < limit.min.x) { offset.x = this._viscousLimit(offset.x, limit.min.x); }
	  		if (offset.y < limit.min.y) { offset.y = this._viscousLimit(offset.y, limit.min.y); }
	  		if (offset.x > limit.max.x) { offset.x = this._viscousLimit(offset.x, limit.max.x); }
	  		if (offset.y > limit.max.y) { offset.y = this._viscousLimit(offset.y, limit.max.y); }

	  		this._draggable._newPos = this._draggable._startPos.add(offset);
	  	},

	  	_onPreDragWrap: function () {
	  		// TODO refactor to be able to adjust map pane position after zoom
	  		var worldWidth = this._worldWidth,
	  		    halfWidth = Math.round(worldWidth / 2),
	  		    dx = this._initialWorldOffset,
	  		    x = this._draggable._newPos.x,
	  		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
	  		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
	  		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

	  		this._draggable._absPos = this._draggable._newPos.clone();
	  		this._draggable._newPos.x = newX;
	  	},

	  	_onDragEnd: function (e) {
	  		var map = this._map,
	  		    options = map.options,

	  		    noInertia = !options.inertia || e.noInertia || this._times.length < 2;

	  		map.fire('dragend', e);

	  		if (noInertia) {
	  			map.fire('moveend');

	  		} else {
	  			this._prunePositions(+new Date());

	  			var direction = this._lastPos.subtract(this._positions[0]),
	  			    duration = (this._lastTime - this._times[0]) / 1000,
	  			    ease = options.easeLinearity,

	  			    speedVector = direction.multiplyBy(ease / duration),
	  			    speed = speedVector.distanceTo([0, 0]),

	  			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
	  			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

	  			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
	  			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

	  			if (!offset.x && !offset.y) {
	  				map.fire('moveend');

	  			} else {
	  				offset = map._limitOffset(offset, map.options.maxBounds);

	  				requestAnimFrame(function () {
	  					map.panBy(offset, {
	  						duration: decelerationDuration,
	  						easeLinearity: ease,
	  						noMoveStart: true,
	  						animate: true
	  					});
	  				});
	  			}
	  		}
	  	}
	  });

	  // @section Handlers
	  // @property dragging: Handler
	  // Map dragging handler (by both mouse and touch).
	  Map.addInitHook('addHandler', 'dragging', Drag);

	  /*
	   * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
	   */

	  // @namespace Map
	  // @section Keyboard Navigation Options
	  Map.mergeOptions({
	  	// @option keyboard: Boolean = true
	  	// Makes the map focusable and allows users to navigate the map with keyboard
	  	// arrows and `+`/`-` keys.
	  	keyboard: true,

	  	// @option keyboardPanDelta: Number = 80
	  	// Amount of pixels to pan when pressing an arrow key.
	  	keyboardPanDelta: 80
	  });

	  var Keyboard = Handler.extend({

	  	keyCodes: {
	  		left:    [37],
	  		right:   [39],
	  		down:    [40],
	  		up:      [38],
	  		zoomIn:  [187, 107, 61, 171],
	  		zoomOut: [189, 109, 54, 173]
	  	},

	  	initialize: function (map) {
	  		this._map = map;

	  		this._setPanDelta(map.options.keyboardPanDelta);
	  		this._setZoomDelta(map.options.zoomDelta);
	  	},

	  	addHooks: function () {
	  		var container = this._map._container;

	  		// make the container focusable by tabbing
	  		if (container.tabIndex <= 0) {
	  			container.tabIndex = '0';
	  		}

	  		on(container, {
	  			focus: this._onFocus,
	  			blur: this._onBlur,
	  			mousedown: this._onMouseDown
	  		}, this);

	  		this._map.on({
	  			focus: this._addHooks,
	  			blur: this._removeHooks
	  		}, this);
	  	},

	  	removeHooks: function () {
	  		this._removeHooks();

	  		off(this._map._container, {
	  			focus: this._onFocus,
	  			blur: this._onBlur,
	  			mousedown: this._onMouseDown
	  		}, this);

	  		this._map.off({
	  			focus: this._addHooks,
	  			blur: this._removeHooks
	  		}, this);
	  	},

	  	_onMouseDown: function () {
	  		if (this._focused) { return; }

	  		var body = document.body,
	  		    docEl = document.documentElement,
	  		    top = body.scrollTop || docEl.scrollTop,
	  		    left = body.scrollLeft || docEl.scrollLeft;

	  		this._map._container.focus();

	  		window.scrollTo(left, top);
	  	},

	  	_onFocus: function () {
	  		this._focused = true;
	  		this._map.fire('focus');
	  	},

	  	_onBlur: function () {
	  		this._focused = false;
	  		this._map.fire('blur');
	  	},

	  	_setPanDelta: function (panDelta) {
	  		var keys = this._panKeys = {},
	  		    codes = this.keyCodes,
	  		    i, len;

	  		for (i = 0, len = codes.left.length; i < len; i++) {
	  			keys[codes.left[i]] = [-1 * panDelta, 0];
	  		}
	  		for (i = 0, len = codes.right.length; i < len; i++) {
	  			keys[codes.right[i]] = [panDelta, 0];
	  		}
	  		for (i = 0, len = codes.down.length; i < len; i++) {
	  			keys[codes.down[i]] = [0, panDelta];
	  		}
	  		for (i = 0, len = codes.up.length; i < len; i++) {
	  			keys[codes.up[i]] = [0, -1 * panDelta];
	  		}
	  	},

	  	_setZoomDelta: function (zoomDelta) {
	  		var keys = this._zoomKeys = {},
	  		    codes = this.keyCodes,
	  		    i, len;

	  		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
	  			keys[codes.zoomIn[i]] = zoomDelta;
	  		}
	  		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
	  			keys[codes.zoomOut[i]] = -zoomDelta;
	  		}
	  	},

	  	_addHooks: function () {
	  		on(document, 'keydown', this._onKeyDown, this);
	  	},

	  	_removeHooks: function () {
	  		off(document, 'keydown', this._onKeyDown, this);
	  	},

	  	_onKeyDown: function (e) {
	  		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

	  		var key = e.keyCode,
	  		    map = this._map,
	  		    offset;

	  		if (key in this._panKeys) {
	  			if (!map._panAnim || !map._panAnim._inProgress) {
	  				offset = this._panKeys[key];
	  				if (e.shiftKey) {
	  					offset = toPoint(offset).multiplyBy(3);
	  				}

	  				if (map.options.maxBounds) {
	  					offset = map._limitOffset(toPoint(offset), map.options.maxBounds);
	  				}

	  				if (map.options.worldCopyJump) {
	  					var newLatLng = map.wrapLatLng(map.unproject(map.project(map.getCenter()).add(offset)));
	  					map.panTo(newLatLng);
	  				} else {
	  					map.panBy(offset);
	  				}
	  			}
	  		} else if (key in this._zoomKeys) {
	  			map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);

	  		} else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
	  			map.closePopup();

	  		} else {
	  			return;
	  		}

	  		stop(e);
	  	}
	  });

	  // @section Handlers
	  // @section Handlers
	  // @property keyboard: Handler
	  // Keyboard navigation handler.
	  Map.addInitHook('addHandler', 'keyboard', Keyboard);

	  /*
	   * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
	   */

	  // @namespace Map
	  // @section Interaction Options
	  Map.mergeOptions({
	  	// @section Mouse wheel options
	  	// @option scrollWheelZoom: Boolean|String = true
	  	// Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
	  	// it will zoom to the center of the view regardless of where the mouse was.
	  	scrollWheelZoom: true,

	  	// @option wheelDebounceTime: Number = 40
	  	// Limits the rate at which a wheel can fire (in milliseconds). By default
	  	// user can't zoom via wheel more often than once per 40 ms.
	  	wheelDebounceTime: 40,

	  	// @option wheelPxPerZoomLevel: Number = 60
	  	// How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
	  	// mean a change of one full zoom level. Smaller values will make wheel-zooming
	  	// faster (and vice versa).
	  	wheelPxPerZoomLevel: 60
	  });

	  var ScrollWheelZoom = Handler.extend({
	  	addHooks: function () {
	  		on(this._map._container, 'wheel', this._onWheelScroll, this);

	  		this._delta = 0;
	  	},

	  	removeHooks: function () {
	  		off(this._map._container, 'wheel', this._onWheelScroll, this);
	  	},

	  	_onWheelScroll: function (e) {
	  		var delta = getWheelDelta(e);

	  		var debounce = this._map.options.wheelDebounceTime;

	  		this._delta += delta;
	  		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

	  		if (!this._startTime) {
	  			this._startTime = +new Date();
	  		}

	  		var left = Math.max(debounce - (+new Date() - this._startTime), 0);

	  		clearTimeout(this._timer);
	  		this._timer = setTimeout(bind(this._performZoom, this), left);

	  		stop(e);
	  	},

	  	_performZoom: function () {
	  		var map = this._map,
	  		    zoom = map.getZoom(),
	  		    snap = this._map.options.zoomSnap || 0;

	  		map._stop(); // stop panning and fly animations if any

	  		// map the delta with a sigmoid function to -4..4 range leaning on -1..1
	  		var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
	  		    d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2,
	  		    d4 = snap ? Math.ceil(d3 / snap) * snap : d3,
	  		    delta = map._limitZoom(zoom + (this._delta > 0 ? d4 : -d4)) - zoom;

	  		this._delta = 0;
	  		this._startTime = null;

	  		if (!delta) { return; }

	  		if (map.options.scrollWheelZoom === 'center') {
	  			map.setZoom(zoom + delta);
	  		} else {
	  			map.setZoomAround(this._lastMousePos, zoom + delta);
	  		}
	  	}
	  });

	  // @section Handlers
	  // @property scrollWheelZoom: Handler
	  // Scroll wheel zoom handler.
	  Map.addInitHook('addHandler', 'scrollWheelZoom', ScrollWheelZoom);

	  /*
	   * L.Map.TapHold is used to simulate `contextmenu` event on long hold,
	   * which otherwise is not fired by mobile Safari.
	   */

	  var tapHoldDelay = 600;

	  // @namespace Map
	  // @section Interaction Options
	  Map.mergeOptions({
	  	// @section Touch interaction options
	  	// @option tapHold: Boolean
	  	// Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
	  	tapHold: Browser.touchNative && Browser.safari && Browser.mobile,

	  	// @option tapTolerance: Number = 15
	  	// The max number of pixels a user can shift his finger during touch
	  	// for it to be considered a valid tap.
	  	tapTolerance: 15
	  });

	  var TapHold = Handler.extend({
	  	addHooks: function () {
	  		on(this._map._container, 'touchstart', this._onDown, this);
	  	},

	  	removeHooks: function () {
	  		off(this._map._container, 'touchstart', this._onDown, this);
	  	},

	  	_onDown: function (e) {
	  		clearTimeout(this._holdTimeout);
	  		if (e.touches.length !== 1) { return; }

	  		var first = e.touches[0];
	  		this._startPos = this._newPos = new Point(first.clientX, first.clientY);

	  		this._holdTimeout = setTimeout(bind(function () {
	  			this._cancel();
	  			if (!this._isTapValid()) { return; }

	  			// prevent simulated mouse events https://w3c.github.io/touch-events/#mouse-events
	  			on(document, 'touchend', preventDefault);
	  			on(document, 'touchend touchcancel', this._cancelClickPrevent);
	  			this._simulateEvent('contextmenu', first);
	  		}, this), tapHoldDelay);

	  		on(document, 'touchend touchcancel contextmenu', this._cancel, this);
	  		on(document, 'touchmove', this._onMove, this);
	  	},

	  	_cancelClickPrevent: function cancelClickPrevent() {
	  		off(document, 'touchend', preventDefault);
	  		off(document, 'touchend touchcancel', cancelClickPrevent);
	  	},

	  	_cancel: function () {
	  		clearTimeout(this._holdTimeout);
	  		off(document, 'touchend touchcancel contextmenu', this._cancel, this);
	  		off(document, 'touchmove', this._onMove, this);
	  	},

	  	_onMove: function (e) {
	  		var first = e.touches[0];
	  		this._newPos = new Point(first.clientX, first.clientY);
	  	},

	  	_isTapValid: function () {
	  		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
	  	},

	  	_simulateEvent: function (type, e) {
	  		var simulatedEvent = new MouseEvent(type, {
	  			bubbles: true,
	  			cancelable: true,
	  			view: window,
	  			// detail: 1,
	  			screenX: e.screenX,
	  			screenY: e.screenY,
	  			clientX: e.clientX,
	  			clientY: e.clientY,
	  			// button: 2,
	  			// buttons: 2
	  		});

	  		simulatedEvent._simulated = true;

	  		e.target.dispatchEvent(simulatedEvent);
	  	}
	  });

	  // @section Handlers
	  // @property tapHold: Handler
	  // Long tap handler to simulate `contextmenu` event (useful in mobile Safari).
	  Map.addInitHook('addHandler', 'tapHold', TapHold);

	  /*
	   * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
	   */

	  // @namespace Map
	  // @section Interaction Options
	  Map.mergeOptions({
	  	// @section Touch interaction options
	  	// @option touchZoom: Boolean|String = *
	  	// Whether the map can be zoomed by touch-dragging with two fingers. If
	  	// passed `'center'`, it will zoom to the center of the view regardless of
	  	// where the touch events (fingers) were. Enabled for touch-capable web
	  	// browsers.
	  	touchZoom: Browser.touch,

	  	// @option bounceAtZoomLimits: Boolean = true
	  	// Set it to false if you don't want the map to zoom beyond min/max zoom
	  	// and then bounce back when pinch-zooming.
	  	bounceAtZoomLimits: true
	  });

	  var TouchZoom = Handler.extend({
	  	addHooks: function () {
	  		addClass(this._map._container, 'leaflet-touch-zoom');
	  		on(this._map._container, 'touchstart', this._onTouchStart, this);
	  	},

	  	removeHooks: function () {
	  		removeClass(this._map._container, 'leaflet-touch-zoom');
	  		off(this._map._container, 'touchstart', this._onTouchStart, this);
	  	},

	  	_onTouchStart: function (e) {
	  		var map = this._map;
	  		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

	  		var p1 = map.mouseEventToContainerPoint(e.touches[0]),
	  		    p2 = map.mouseEventToContainerPoint(e.touches[1]);

	  		this._centerPoint = map.getSize()._divideBy(2);
	  		this._startLatLng = map.containerPointToLatLng(this._centerPoint);
	  		if (map.options.touchZoom !== 'center') {
	  			this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
	  		}

	  		this._startDist = p1.distanceTo(p2);
	  		this._startZoom = map.getZoom();

	  		this._moved = false;
	  		this._zooming = true;

	  		map._stop();

	  		on(document, 'touchmove', this._onTouchMove, this);
	  		on(document, 'touchend touchcancel', this._onTouchEnd, this);

	  		preventDefault(e);
	  	},

	  	_onTouchMove: function (e) {
	  		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

	  		var map = this._map,
	  		    p1 = map.mouseEventToContainerPoint(e.touches[0]),
	  		    p2 = map.mouseEventToContainerPoint(e.touches[1]),
	  		    scale = p1.distanceTo(p2) / this._startDist;

	  		this._zoom = map.getScaleZoom(scale, this._startZoom);

	  		if (!map.options.bounceAtZoomLimits && (
	  			(this._zoom < map.getMinZoom() && scale < 1) ||
	  			(this._zoom > map.getMaxZoom() && scale > 1))) {
	  			this._zoom = map._limitZoom(this._zoom);
	  		}

	  		if (map.options.touchZoom === 'center') {
	  			this._center = this._startLatLng;
	  			if (scale === 1) { return; }
	  		} else {
	  			// Get delta from pinch to center, so centerLatLng is delta applied to initial pinchLatLng
	  			var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
	  			if (scale === 1 && delta.x === 0 && delta.y === 0) { return; }
	  			this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
	  		}

	  		if (!this._moved) {
	  			map._moveStart(true, false);
	  			this._moved = true;
	  		}

	  		cancelAnimFrame(this._animRequest);

	  		var moveFn = bind(map._move, map, this._center, this._zoom, {pinch: true, round: false}, undefined);
	  		this._animRequest = requestAnimFrame(moveFn, this, true);

	  		preventDefault(e);
	  	},

	  	_onTouchEnd: function () {
	  		if (!this._moved || !this._zooming) {
	  			this._zooming = false;
	  			return;
	  		}

	  		this._zooming = false;
	  		cancelAnimFrame(this._animRequest);

	  		off(document, 'touchmove', this._onTouchMove, this);
	  		off(document, 'touchend touchcancel', this._onTouchEnd, this);

	  		// Pinch updates GridLayers' levels only when zoomSnap is off, so zoomSnap becomes noUpdate.
	  		if (this._map.options.zoomAnimation) {
	  			this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
	  		} else {
	  			this._map._resetView(this._center, this._map._limitZoom(this._zoom));
	  		}
	  	}
	  });

	  // @section Handlers
	  // @property touchZoom: Handler
	  // Touch zoom handler.
	  Map.addInitHook('addHandler', 'touchZoom', TouchZoom);

	  Map.BoxZoom = BoxZoom;
	  Map.DoubleClickZoom = DoubleClickZoom;
	  Map.Drag = Drag;
	  Map.Keyboard = Keyboard;
	  Map.ScrollWheelZoom = ScrollWheelZoom;
	  Map.TapHold = TapHold;
	  Map.TouchZoom = TouchZoom;

	  exports.Bounds = Bounds;
	  exports.Browser = Browser;
	  exports.CRS = CRS;
	  exports.Canvas = Canvas;
	  exports.Circle = Circle;
	  exports.CircleMarker = CircleMarker;
	  exports.Class = Class;
	  exports.Control = Control;
	  exports.DivIcon = DivIcon;
	  exports.DivOverlay = DivOverlay;
	  exports.DomEvent = DomEvent;
	  exports.DomUtil = DomUtil;
	  exports.Draggable = Draggable;
	  exports.Evented = Evented;
	  exports.FeatureGroup = FeatureGroup;
	  exports.GeoJSON = GeoJSON;
	  exports.GridLayer = GridLayer;
	  exports.Handler = Handler;
	  exports.Icon = Icon;
	  exports.ImageOverlay = ImageOverlay;
	  exports.LatLng = LatLng;
	  exports.LatLngBounds = LatLngBounds;
	  exports.Layer = Layer;
	  exports.LayerGroup = LayerGroup;
	  exports.LineUtil = LineUtil;
	  exports.Map = Map;
	  exports.Marker = Marker;
	  exports.Mixin = Mixin;
	  exports.Path = Path;
	  exports.Point = Point;
	  exports.PolyUtil = PolyUtil;
	  exports.Polygon = Polygon;
	  exports.Polyline = Polyline;
	  exports.Popup = Popup;
	  exports.PosAnimation = PosAnimation;
	  exports.Projection = index;
	  exports.Rectangle = Rectangle;
	  exports.Renderer = Renderer;
	  exports.SVG = SVG;
	  exports.SVGOverlay = SVGOverlay;
	  exports.TileLayer = TileLayer;
	  exports.Tooltip = Tooltip;
	  exports.Transformation = Transformation;
	  exports.Util = Util;
	  exports.VideoOverlay = VideoOverlay;
	  exports.bind = bind;
	  exports.bounds = toBounds;
	  exports.canvas = canvas;
	  exports.circle = circle;
	  exports.circleMarker = circleMarker;
	  exports.control = control;
	  exports.divIcon = divIcon;
	  exports.extend = extend;
	  exports.featureGroup = featureGroup;
	  exports.geoJSON = geoJSON;
	  exports.geoJson = geoJson;
	  exports.gridLayer = gridLayer;
	  exports.icon = icon;
	  exports.imageOverlay = imageOverlay;
	  exports.latLng = toLatLng;
	  exports.latLngBounds = toLatLngBounds;
	  exports.layerGroup = layerGroup;
	  exports.map = createMap;
	  exports.marker = marker;
	  exports.point = toPoint;
	  exports.polygon = polygon;
	  exports.polyline = polyline;
	  exports.popup = popup;
	  exports.rectangle = rectangle;
	  exports.setOptions = setOptions;
	  exports.stamp = stamp;
	  exports.svg = svg;
	  exports.svgOverlay = svgOverlay;
	  exports.tileLayer = tileLayer;
	  exports.tooltip = tooltip;
	  exports.transformation = toTransformation;
	  exports.version = version;
	  exports.videoOverlay = videoOverlay;

	  var oldL = window.L;
	  exports.noConflict = function() {
	  	window.L = oldL;
	  	return this;
	  };
	  // Always export us to window global (see #2364)
	  window.L = exports;

	}));
	
} (leafletSrc, leafletSrc.exports));

var leafletSrcExports = leafletSrc.exports;
const L$1 = /*@__PURE__*/getDefaultExportFromCjs(leafletSrcExports);

L.Control.Fullscreen = L.Control.extend({
    options: {
        position: 'topleft',
        title: {
            'false': 'View Fullscreen',
            'true': 'Exit Fullscreen'
        }
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-control-fullscreen leaflet-bar leaflet-control');

        this.link = L.DomUtil.create('a', 'leaflet-control-fullscreen-button leaflet-bar-part', container);
        this.link.href = '#';

        this._map = map;
        this._map.on('fullscreenchange', this._toggleTitle, this);
        this._toggleTitle();

        L.DomEvent.on(this.link, 'click', this._click, this);

        return container;
    },

    _click: function (e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        this._map.toggleFullscreen(this.options);
    },

    _toggleTitle: function() {
        this.link.title = this.options.title[this._map.isFullscreen()];
    }
});

L.Map.include({
    isFullscreen: function () {
        return this._isFullscreen || false;
    },

    toggleFullscreen: function (options) {
        var container = this.getContainer();
        if (this.isFullscreen()) {
            if (options && options.pseudoFullscreen) {
                this._disablePseudoFullscreen(container);
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else {
                this._disablePseudoFullscreen(container);
            }
        } else {
            if (options && options.pseudoFullscreen) {
                this._enablePseudoFullscreen(container);
            } else if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            } else {
                this._enablePseudoFullscreen(container);
            }
        }

    },

    _enablePseudoFullscreen: function (container) {
        L.DomUtil.addClass(container, 'leaflet-pseudo-fullscreen');
        this._setFullscreen(true);
        this.fire('fullscreenchange');
    },

    _disablePseudoFullscreen: function (container) {
        L.DomUtil.removeClass(container, 'leaflet-pseudo-fullscreen');
        this._setFullscreen(false);
        this.fire('fullscreenchange');
    },

    _setFullscreen: function(fullscreen) {
        this._isFullscreen = fullscreen;
        var container = this.getContainer();
        if (fullscreen) {
            L.DomUtil.addClass(container, 'leaflet-fullscreen-on');
        } else {
            L.DomUtil.removeClass(container, 'leaflet-fullscreen-on');
        }
        this.invalidateSize();
    },

    _onFullscreenChange: function (e) {
        var fullscreenElement =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement;

        if (fullscreenElement === this.getContainer() && !this._isFullscreen) {
            this._setFullscreen(true);
            this.fire('fullscreenchange');
        } else if (fullscreenElement !== this.getContainer() && this._isFullscreen) {
            this._setFullscreen(false);
            this.fire('fullscreenchange');
        }
    }
});

L.Map.mergeOptions({
    fullscreenControl: false
});

L.Map.addInitHook(function () {
    if (this.options.fullscreenControl) {
        this.fullscreenControl = new L.Control.Fullscreen(this.options.fullscreenControl);
        this.addControl(this.fullscreenControl);
    }

    var fullscreenchange;

    if ('onfullscreenchange' in document) {
        fullscreenchange = 'fullscreenchange';
    } else if ('onmozfullscreenchange' in document) {
        fullscreenchange = 'mozfullscreenchange';
    } else if ('onwebkitfullscreenchange' in document) {
        fullscreenchange = 'webkitfullscreenchange';
    } else if ('onmsfullscreenchange' in document) {
        fullscreenchange = 'MSFullscreenChange';
    }

    if (fullscreenchange) {
        var onFullscreenChange = L.bind(this._onFullscreenChange, this);

        this.whenReady(function () {
            L.DomEvent.on(document, fullscreenchange, onFullscreenChange);
        });

        this.on('unload', function () {
            L.DomEvent.off(document, fullscreenchange, onFullscreenChange);
        });
    }
});

L.control.fullscreen = function (options) {
    return new L.Control.Fullscreen(options);
};

function vi(r) {
  return Array.isArray(r) ? `[${r.map((t) => vi(t)).join(",")}]` : typeof r == "number" ? `${r}` : typeof r == "string" ? `"${r}"` : typeof r == "object" && r !== null ? Object.keys(r).sort().map((t) => `${t}:${vi(r[t])}`).join("|") : String(r);
}
async function Co(r) {
  const t = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(r));
  return Array.from(new Uint8Array(t)).map((n) => n.toString(16).padStart(2, "0")).join("");
}
async function zn(r, t = 16) {
  return (await Co(String(r))).slice(0, t);
}
async function Ro(r, t) {
  return await zn(vi(r), t);
}
var J;
(function(r) {
  r.assertEqual = (n) => n;
  function t(n) {
  }
  r.assertIs = t;
  function e(n) {
    throw new Error();
  }
  r.assertNever = e, r.arrayToEnum = (n) => {
    const s = {};
    for (const o of n)
      s[o] = o;
    return s;
  }, r.getValidEnumValues = (n) => {
    const s = r.objectKeys(n).filter((a) => typeof n[n[a]] != "number"), o = {};
    for (const a of s)
      o[a] = n[a];
    return r.objectValues(o);
  }, r.objectValues = (n) => r.objectKeys(n).map(function(s) {
    return n[s];
  }), r.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const s = [];
    for (const o in n)
      Object.prototype.hasOwnProperty.call(n, o) && s.push(o);
    return s;
  }, r.find = (n, s) => {
    for (const o of n)
      if (s(o))
        return o;
  }, r.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function i(n, s = " | ") {
    return n.map((o) => typeof o == "string" ? `'${o}'` : o).join(s);
  }
  r.joinValues = i, r.jsonStringifyReplacer = (n, s) => typeof s == "bigint" ? s.toString() : s;
})(J || (J = {}));
var xi;
(function(r) {
  r.mergeShapes = (t, e) => ({
    ...t,
    ...e
    // second overwrites first
  });
})(xi || (xi = {}));
const O = J.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), Yt = (r) => {
  switch (typeof r) {
    case "undefined":
      return O.undefined;
    case "string":
      return O.string;
    case "number":
      return isNaN(r) ? O.nan : O.number;
    case "boolean":
      return O.boolean;
    case "function":
      return O.function;
    case "bigint":
      return O.bigint;
    case "symbol":
      return O.symbol;
    case "object":
      return Array.isArray(r) ? O.array : r === null ? O.null : r.then && typeof r.then == "function" && r.catch && typeof r.catch == "function" ? O.promise : typeof Map < "u" && r instanceof Map ? O.map : typeof Set < "u" && r instanceof Set ? O.set : typeof Date < "u" && r instanceof Date ? O.date : O.object;
    default:
      return O.unknown;
  }
}, P = J.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), ko = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:");
class Pt extends Error {
  constructor(t) {
    super(), this.issues = [], this.addIssue = (i) => {
      this.issues = [...this.issues, i];
    }, this.addIssues = (i = []) => {
      this.issues = [...this.issues, ...i];
    };
    const e = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, e) : this.__proto__ = e, this.name = "ZodError", this.issues = t;
  }
  get errors() {
    return this.issues;
  }
  format(t) {
    const e = t || function(s) {
      return s.message;
    }, i = { _errors: [] }, n = (s) => {
      for (const o of s.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(n);
        else if (o.code === "invalid_return_type")
          n(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          n(o.argumentsError);
        else if (o.path.length === 0)
          i._errors.push(e(o));
        else {
          let a = i, h = 0;
          for (; h < o.path.length; ) {
            const c = o.path[h];
            h === o.path.length - 1 ? (a[c] = a[c] || { _errors: [] }, a[c]._errors.push(e(o))) : a[c] = a[c] || { _errors: [] }, a = a[c], h++;
          }
        }
    };
    return n(this), i;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, J.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (e) => e.message) {
    const e = {}, i = [];
    for (const n of this.issues)
      n.path.length > 0 ? (e[n.path[0]] = e[n.path[0]] || [], e[n.path[0]].push(t(n))) : i.push(t(n));
    return { formErrors: i, fieldErrors: e };
  }
  get formErrors() {
    return this.flatten();
  }
}
Pt.create = (r) => new Pt(r);
const Re = (r, t) => {
  let e;
  switch (r.code) {
    case P.invalid_type:
      r.received === O.undefined ? e = "Required" : e = `Expected ${r.expected}, received ${r.received}`;
      break;
    case P.invalid_literal:
      e = `Invalid literal value, expected ${JSON.stringify(r.expected, J.jsonStringifyReplacer)}`;
      break;
    case P.unrecognized_keys:
      e = `Unrecognized key(s) in object: ${J.joinValues(r.keys, ", ")}`;
      break;
    case P.invalid_union:
      e = "Invalid input";
      break;
    case P.invalid_union_discriminator:
      e = `Invalid discriminator value. Expected ${J.joinValues(r.options)}`;
      break;
    case P.invalid_enum_value:
      e = `Invalid enum value. Expected ${J.joinValues(r.options)}, received '${r.received}'`;
      break;
    case P.invalid_arguments:
      e = "Invalid function arguments";
      break;
    case P.invalid_return_type:
      e = "Invalid function return type";
      break;
    case P.invalid_date:
      e = "Invalid date";
      break;
    case P.invalid_string:
      typeof r.validation == "object" ? "includes" in r.validation ? (e = `Invalid input: must include "${r.validation.includes}"`, typeof r.validation.position == "number" && (e = `${e} at one or more positions greater than or equal to ${r.validation.position}`)) : "startsWith" in r.validation ? e = `Invalid input: must start with "${r.validation.startsWith}"` : "endsWith" in r.validation ? e = `Invalid input: must end with "${r.validation.endsWith}"` : J.assertNever(r.validation) : r.validation !== "regex" ? e = `Invalid ${r.validation}` : e = "Invalid";
      break;
    case P.too_small:
      r.type === "array" ? e = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "more than"} ${r.minimum} element(s)` : r.type === "string" ? e = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "over"} ${r.minimum} character(s)` : r.type === "number" ? e = `Number must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${r.minimum}` : r.type === "date" ? e = `Date must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(r.minimum))}` : e = "Invalid input";
      break;
    case P.too_big:
      r.type === "array" ? e = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "less than"} ${r.maximum} element(s)` : r.type === "string" ? e = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "under"} ${r.maximum} character(s)` : r.type === "number" ? e = `Number must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "bigint" ? e = `BigInt must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "date" ? e = `Date must be ${r.exact ? "exactly" : r.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(r.maximum))}` : e = "Invalid input";
      break;
    case P.custom:
      e = "Invalid input";
      break;
    case P.invalid_intersection_types:
      e = "Intersection results could not be merged";
      break;
    case P.not_multiple_of:
      e = `Number must be a multiple of ${r.multipleOf}`;
      break;
    case P.not_finite:
      e = "Number must be finite";
      break;
    default:
      e = t.defaultError, J.assertNever(r);
  }
  return { message: e };
};
let Zn = Re;
function Oo(r) {
  Zn = r;
}
function Er() {
  return Zn;
}
const Ir = (r) => {
  const { data: t, path: e, errorMaps: i, issueData: n } = r, s = [...e, ...n.path || []], o = {
    ...n,
    path: s
  };
  let a = "";
  const h = i.filter((c) => !!c).slice().reverse();
  for (const c of h)
    a = c(o, { data: t, defaultError: a }).message;
  return {
    ...n,
    path: s,
    message: n.message || a
  };
}, No = [];
function N(r, t) {
  const e = Ir({
    issueData: t,
    data: r.data,
    path: r.path,
    errorMaps: [
      r.common.contextualErrorMap,
      r.schemaErrorMap,
      Er(),
      Re
      // then globalThis default map
    ].filter((i) => !!i)
  });
  r.common.issues.push(e);
}
class ut {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, e) {
    const i = [];
    for (const n of e) {
      if (n.status === "aborted")
        return D;
      n.status === "dirty" && t.dirty(), i.push(n.value);
    }
    return { status: t.value, value: i };
  }
  static async mergeObjectAsync(t, e) {
    const i = [];
    for (const n of e)
      i.push({
        key: await n.key,
        value: await n.value
      });
    return ut.mergeObjectSync(t, i);
  }
  static mergeObjectSync(t, e) {
    const i = {};
    for (const n of e) {
      const { key: s, value: o } = n;
      if (s.status === "aborted" || o.status === "aborted")
        return D;
      s.status === "dirty" && t.dirty(), o.status === "dirty" && t.dirty(), s.value !== "__proto__" && (typeof o.value < "u" || n.alwaysSet) && (i[s.value] = o.value);
    }
    return { status: t.value, value: i };
  }
}
const D = Object.freeze({
  status: "aborted"
}), $n = (r) => ({ status: "dirty", value: r }), mt = (r) => ({ status: "valid", value: r }), Ti = (r) => r.status === "aborted", bi = (r) => r.status === "dirty", ke = (r) => r.status === "valid", Sr = (r) => typeof Promise < "u" && r instanceof Promise;
var j;
(function(r) {
  r.errToObj = (t) => typeof t == "string" ? { message: t } : t || {}, r.toString = (t) => typeof t == "string" ? t : t?.message;
})(j || (j = {}));
class Ot {
  constructor(t, e, i, n) {
    this._cachedPath = [], this.parent = t, this.data = e, this._path = i, this._key = n;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const on = (r, t) => {
  if (ke(t))
    return { success: !0, data: t.value };
  if (!r.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const e = new Pt(r.common.issues);
      return this._error = e, this._error;
    }
  };
};
function F(r) {
  if (!r)
    return {};
  const { errorMap: t, invalid_type_error: e, required_error: i, description: n } = r;
  if (t && (e || i))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? { errorMap: t, description: n } : { errorMap: (o, a) => o.code !== "invalid_type" ? { message: a.defaultError } : typeof a.data > "u" ? { message: i ?? a.defaultError } : { message: e ?? a.defaultError }, description: n };
}
class W {
  constructor(t) {
    this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return Yt(t.data);
  }
  _getOrReturnCtx(t, e) {
    return e || {
      common: t.parent.common,
      data: t.data,
      parsedType: Yt(t.data),
      schemaErrorMap: this._def.errorMap,
      path: t.path,
      parent: t.parent
    };
  }
  _processInputParams(t) {
    return {
      status: new ut(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: Yt(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      }
    };
  }
  _parseSync(t) {
    const e = this._parse(t);
    if (Sr(e))
      throw new Error("Synchronous parse encountered promise.");
    return e;
  }
  _parseAsync(t) {
    const e = this._parse(t);
    return Promise.resolve(e);
  }
  parse(t, e) {
    const i = this.safeParse(t, e);
    if (i.success)
      return i.data;
    throw i.error;
  }
  safeParse(t, e) {
    var i;
    const n = {
      common: {
        issues: [],
        async: (i = e?.async) !== null && i !== void 0 ? i : !1,
        contextualErrorMap: e?.errorMap
      },
      path: e?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Yt(t)
    }, s = this._parseSync({ data: t, path: n.path, parent: n });
    return on(n, s);
  }
  async parseAsync(t, e) {
    const i = await this.safeParseAsync(t, e);
    if (i.success)
      return i.data;
    throw i.error;
  }
  async safeParseAsync(t, e) {
    const i = {
      common: {
        issues: [],
        contextualErrorMap: e?.errorMap,
        async: !0
      },
      path: e?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Yt(t)
    }, n = this._parse({ data: t, path: i.path, parent: i }), s = await (Sr(n) ? n : Promise.resolve(n));
    return on(i, s);
  }
  refine(t, e) {
    const i = (n) => typeof e == "string" || typeof e > "u" ? { message: e } : typeof e == "function" ? e(n) : e;
    return this._refinement((n, s) => {
      const o = t(n), a = () => s.addIssue({
        code: P.custom,
        ...i(n)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((h) => h ? !0 : (a(), !1)) : o ? !0 : (a(), !1);
    });
  }
  refinement(t, e) {
    return this._refinement((i, n) => t(i) ? !0 : (n.addIssue(typeof e == "function" ? e(i, n) : e), !1));
  }
  _refinement(t) {
    return new Rt({
      schema: this,
      typeName: B.ZodEffects,
      effect: { type: "refinement", refinement: t }
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  optional() {
    return $t.create(this, this._def);
  }
  nullable() {
    return se.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Ct.create(this, this._def);
  }
  promise() {
    return ye.create(this, this._def);
  }
  or(t) {
    return je.create([this, t], this._def);
  }
  and(t) {
    return Be.create(this, t, this._def);
  }
  transform(t) {
    return new Rt({
      ...F(this._def),
      schema: this,
      typeName: B.ZodEffects,
      effect: { type: "transform", transform: t }
    });
  }
  default(t) {
    const e = typeof t == "function" ? t : () => t;
    return new We({
      ...F(this._def),
      innerType: this,
      defaultValue: e,
      typeName: B.ZodDefault
    });
  }
  brand() {
    return new Xn({
      typeName: B.ZodBranded,
      type: this,
      ...F(this._def)
    });
  }
  catch(t) {
    const e = typeof t == "function" ? t : () => t;
    return new Rr({
      ...F(this._def),
      innerType: this,
      catchValue: e,
      typeName: B.ZodCatch
    });
  }
  describe(t) {
    const e = this.constructor;
    return new e({
      ...this._def,
      description: t
    });
  }
  pipe(t) {
    return qe.create(this, t);
  }
  readonly() {
    return Or.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Lo = /^c[^\s-]{8,}$/i, jo = /^[a-z][a-z0-9]*$/, Bo = /^[0-9A-HJKMNP-TV-Z]{26}$/, Do = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Go = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Fo = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let oi;
const Uo = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, Wo = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, Vo = (r) => r.precision ? r.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${r.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${r.precision}}Z$`) : r.precision === 0 ? r.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : r.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function zo(r, t) {
  return !!((t === "v4" || !t) && Uo.test(r) || (t === "v6" || !t) && Wo.test(r));
}
class St extends W {
  _parse(t) {
    if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== O.string) {
      const s = this._getOrReturnCtx(t);
      return N(
        s,
        {
          code: P.invalid_type,
          expected: O.string,
          received: s.parsedType
        }
        //
      ), D;
    }
    const i = new ut();
    let n;
    for (const s of this._def.checks)
      if (s.kind === "min")
        t.data.length < s.value && (n = this._getOrReturnCtx(t, n), N(n, {
          code: P.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), i.dirty());
      else if (s.kind === "max")
        t.data.length > s.value && (n = this._getOrReturnCtx(t, n), N(n, {
          code: P.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), i.dirty());
      else if (s.kind === "length") {
        const o = t.data.length > s.value, a = t.data.length < s.value;
        (o || a) && (n = this._getOrReturnCtx(t, n), o ? N(n, {
          code: P.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : a && N(n, {
          code: P.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), i.dirty());
      } else if (s.kind === "email")
        Go.test(t.data) || (n = this._getOrReturnCtx(t, n), N(n, {
          validation: "email",
          code: P.invalid_string,
          message: s.message
        }), i.dirty());
      else if (s.kind === "emoji")
        oi || (oi = new RegExp(Fo, "u")), oi.test(t.data) || (n = this._getOrReturnCtx(t, n), N(n, {
          validation: "emoji",
          code: P.invalid_string,
          message: s.message
        }), i.dirty());
      else if (s.kind === "uuid")
        Do.test(t.data) || (n = this._getOrReturnCtx(t, n), N(n, {
          validation: "uuid",
          code: P.invalid_string,
          message: s.message
        }), i.dirty());
      else if (s.kind === "cuid")
        Lo.test(t.data) || (n = this._getOrReturnCtx(t, n), N(n, {
          validation: "cuid",
          code: P.invalid_string,
          message: s.message
        }), i.dirty());
      else if (s.kind === "cuid2")
        jo.test(t.data) || (n = this._getOrReturnCtx(t, n), N(n, {
          validation: "cuid2",
          code: P.invalid_string,
          message: s.message
        }), i.dirty());
      else if (s.kind === "ulid")
        Bo.test(t.data) || (n = this._getOrReturnCtx(t, n), N(n, {
          validation: "ulid",
          code: P.invalid_string,
          message: s.message
        }), i.dirty());
      else if (s.kind === "url")
        try {
          new URL(t.data);
        } catch {
          n = this._getOrReturnCtx(t, n), N(n, {
            validation: "url",
            code: P.invalid_string,
            message: s.message
          }), i.dirty();
        }
      else
        s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(t.data) || (n = this._getOrReturnCtx(t, n), N(n, {
          validation: "regex",
          code: P.invalid_string,
          message: s.message
        }), i.dirty())) : s.kind === "trim" ? t.data = t.data.trim() : s.kind === "includes" ? t.data.includes(s.value, s.position) || (n = this._getOrReturnCtx(t, n), N(n, {
          code: P.invalid_string,
          validation: { includes: s.value, position: s.position },
          message: s.message
        }), i.dirty()) : s.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : s.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : s.kind === "startsWith" ? t.data.startsWith(s.value) || (n = this._getOrReturnCtx(t, n), N(n, {
          code: P.invalid_string,
          validation: { startsWith: s.value },
          message: s.message
        }), i.dirty()) : s.kind === "endsWith" ? t.data.endsWith(s.value) || (n = this._getOrReturnCtx(t, n), N(n, {
          code: P.invalid_string,
          validation: { endsWith: s.value },
          message: s.message
        }), i.dirty()) : s.kind === "datetime" ? Vo(s).test(t.data) || (n = this._getOrReturnCtx(t, n), N(n, {
          code: P.invalid_string,
          validation: "datetime",
          message: s.message
        }), i.dirty()) : s.kind === "ip" ? zo(t.data, s.version) || (n = this._getOrReturnCtx(t, n), N(n, {
          validation: "ip",
          code: P.invalid_string,
          message: s.message
        }), i.dirty()) : J.assertNever(s);
    return { status: i.value, value: t.data };
  }
  _regex(t, e, i) {
    return this.refinement((n) => t.test(n), {
      validation: e,
      code: P.invalid_string,
      ...j.errToObj(i)
    });
  }
  _addCheck(t) {
    return new St({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...j.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...j.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: "emoji", ...j.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...j.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...j.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ...j.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: "ulid", ...j.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: "ip", ...j.errToObj(t) });
  }
  datetime(t) {
    var e;
    return typeof t == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: t
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof t?.precision > "u" ? null : t?.precision,
      offset: (e = t?.offset) !== null && e !== void 0 ? e : !1,
      ...j.errToObj(t?.message)
    });
  }
  regex(t, e) {
    return this._addCheck({
      kind: "regex",
      regex: t,
      ...j.errToObj(e)
    });
  }
  includes(t, e) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: e?.position,
      ...j.errToObj(e?.message)
    });
  }
  startsWith(t, e) {
    return this._addCheck({
      kind: "startsWith",
      value: t,
      ...j.errToObj(e)
    });
  }
  endsWith(t, e) {
    return this._addCheck({
      kind: "endsWith",
      value: t,
      ...j.errToObj(e)
    });
  }
  min(t, e) {
    return this._addCheck({
      kind: "min",
      value: t,
      ...j.errToObj(e)
    });
  }
  max(t, e) {
    return this._addCheck({
      kind: "max",
      value: t,
      ...j.errToObj(e)
    });
  }
  length(t, e) {
    return this._addCheck({
      kind: "length",
      value: t,
      ...j.errToObj(e)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(t) {
    return this.min(1, j.errToObj(t));
  }
  trim() {
    return new St({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new St({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new St({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === "ip");
  }
  get minLength() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "min" && (t === null || e.value > t) && (t = e.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "max" && (t === null || e.value < t) && (t = e.value);
    return t;
  }
}
St.create = (r) => {
  var t;
  return new St({
    checks: [],
    typeName: B.ZodString,
    coerce: (t = r?.coerce) !== null && t !== void 0 ? t : !1,
    ...F(r)
  });
};
function Zo(r, t) {
  const e = (r.toString().split(".")[1] || "").length, i = (t.toString().split(".")[1] || "").length, n = e > i ? e : i, s = parseInt(r.toFixed(n).replace(".", "")), o = parseInt(t.toFixed(n).replace(".", ""));
  return s % o / Math.pow(10, n);
}
class Jt extends W {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== O.number) {
      const s = this._getOrReturnCtx(t);
      return N(s, {
        code: P.invalid_type,
        expected: O.number,
        received: s.parsedType
      }), D;
    }
    let i;
    const n = new ut();
    for (const s of this._def.checks)
      s.kind === "int" ? J.isInteger(t.data) || (i = this._getOrReturnCtx(t, i), N(i, {
        code: P.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), n.dirty()) : s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (i = this._getOrReturnCtx(t, i), N(i, {
        code: P.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), n.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (i = this._getOrReturnCtx(t, i), N(i, {
        code: P.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), n.dirty()) : s.kind === "multipleOf" ? Zo(t.data, s.value) !== 0 && (i = this._getOrReturnCtx(t, i), N(i, {
        code: P.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), n.dirty()) : s.kind === "finite" ? Number.isFinite(t.data) || (i = this._getOrReturnCtx(t, i), N(i, {
        code: P.not_finite,
        message: s.message
      }), n.dirty()) : J.assertNever(s);
    return { status: n.value, value: t.data };
  }
  gte(t, e) {
    return this.setLimit("min", t, !0, j.toString(e));
  }
  gt(t, e) {
    return this.setLimit("min", t, !1, j.toString(e));
  }
  lte(t, e) {
    return this.setLimit("max", t, !0, j.toString(e));
  }
  lt(t, e) {
    return this.setLimit("max", t, !1, j.toString(e));
  }
  setLimit(t, e, i, n) {
    return new Jt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: e,
          inclusive: i,
          message: j.toString(n)
        }
      ]
    });
  }
  _addCheck(t) {
    return new Jt({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  int(t) {
    return this._addCheck({
      kind: "int",
      message: j.toString(t)
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: j.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: j.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: j.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: j.toString(t)
    });
  }
  multipleOf(t, e) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: j.toString(e)
    });
  }
  finite(t) {
    return this._addCheck({
      kind: "finite",
      message: j.toString(t)
    });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: j.toString(t)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: j.toString(t)
    });
  }
  get minValue() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "min" && (t === null || e.value > t) && (t = e.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "max" && (t === null || e.value < t) && (t = e.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && J.isInteger(t.value));
  }
  get isFinite() {
    let t = null, e = null;
    for (const i of this._def.checks) {
      if (i.kind === "finite" || i.kind === "int" || i.kind === "multipleOf")
        return !0;
      i.kind === "min" ? (e === null || i.value > e) && (e = i.value) : i.kind === "max" && (t === null || i.value < t) && (t = i.value);
    }
    return Number.isFinite(e) && Number.isFinite(t);
  }
}
Jt.create = (r) => new Jt({
  checks: [],
  typeName: B.ZodNumber,
  coerce: r?.coerce || !1,
  ...F(r)
});
class Kt extends W {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = BigInt(t.data)), this._getType(t) !== O.bigint) {
      const s = this._getOrReturnCtx(t);
      return N(s, {
        code: P.invalid_type,
        expected: O.bigint,
        received: s.parsedType
      }), D;
    }
    let i;
    const n = new ut();
    for (const s of this._def.checks)
      s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (i = this._getOrReturnCtx(t, i), N(i, {
        code: P.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), n.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (i = this._getOrReturnCtx(t, i), N(i, {
        code: P.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), n.dirty()) : s.kind === "multipleOf" ? t.data % s.value !== BigInt(0) && (i = this._getOrReturnCtx(t, i), N(i, {
        code: P.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), n.dirty()) : J.assertNever(s);
    return { status: n.value, value: t.data };
  }
  gte(t, e) {
    return this.setLimit("min", t, !0, j.toString(e));
  }
  gt(t, e) {
    return this.setLimit("min", t, !1, j.toString(e));
  }
  lte(t, e) {
    return this.setLimit("max", t, !0, j.toString(e));
  }
  lt(t, e) {
    return this.setLimit("max", t, !1, j.toString(e));
  }
  setLimit(t, e, i, n) {
    return new Kt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: e,
          inclusive: i,
          message: j.toString(n)
        }
      ]
    });
  }
  _addCheck(t) {
    return new Kt({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: j.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: j.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: j.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: j.toString(t)
    });
  }
  multipleOf(t, e) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: j.toString(e)
    });
  }
  get minValue() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "min" && (t === null || e.value > t) && (t = e.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "max" && (t === null || e.value < t) && (t = e.value);
    return t;
  }
}
Kt.create = (r) => {
  var t;
  return new Kt({
    checks: [],
    typeName: B.ZodBigInt,
    coerce: (t = r?.coerce) !== null && t !== void 0 ? t : !1,
    ...F(r)
  });
};
class Oe extends W {
  _parse(t) {
    if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== O.boolean) {
      const i = this._getOrReturnCtx(t);
      return N(i, {
        code: P.invalid_type,
        expected: O.boolean,
        received: i.parsedType
      }), D;
    }
    return mt(t.data);
  }
}
Oe.create = (r) => new Oe({
  typeName: B.ZodBoolean,
  coerce: r?.coerce || !1,
  ...F(r)
});
class ie extends W {
  _parse(t) {
    if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== O.date) {
      const s = this._getOrReturnCtx(t);
      return N(s, {
        code: P.invalid_type,
        expected: O.date,
        received: s.parsedType
      }), D;
    }
    if (isNaN(t.data.getTime())) {
      const s = this._getOrReturnCtx(t);
      return N(s, {
        code: P.invalid_date
      }), D;
    }
    const i = new ut();
    let n;
    for (const s of this._def.checks)
      s.kind === "min" ? t.data.getTime() < s.value && (n = this._getOrReturnCtx(t, n), N(n, {
        code: P.too_small,
        message: s.message,
        inclusive: !0,
        exact: !1,
        minimum: s.value,
        type: "date"
      }), i.dirty()) : s.kind === "max" ? t.data.getTime() > s.value && (n = this._getOrReturnCtx(t, n), N(n, {
        code: P.too_big,
        message: s.message,
        inclusive: !0,
        exact: !1,
        maximum: s.value,
        type: "date"
      }), i.dirty()) : J.assertNever(s);
    return {
      status: i.value,
      value: new Date(t.data.getTime())
    };
  }
  _addCheck(t) {
    return new ie({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  min(t, e) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: j.toString(e)
    });
  }
  max(t, e) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: j.toString(e)
    });
  }
  get minDate() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "min" && (t === null || e.value > t) && (t = e.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const e of this._def.checks)
      e.kind === "max" && (t === null || e.value < t) && (t = e.value);
    return t != null ? new Date(t) : null;
  }
}
ie.create = (r) => new ie({
  checks: [],
  coerce: r?.coerce || !1,
  typeName: B.ZodDate,
  ...F(r)
});
class Ar extends W {
  _parse(t) {
    if (this._getType(t) !== O.symbol) {
      const i = this._getOrReturnCtx(t);
      return N(i, {
        code: P.invalid_type,
        expected: O.symbol,
        received: i.parsedType
      }), D;
    }
    return mt(t.data);
  }
}
Ar.create = (r) => new Ar({
  typeName: B.ZodSymbol,
  ...F(r)
});
class Ne extends W {
  _parse(t) {
    if (this._getType(t) !== O.undefined) {
      const i = this._getOrReturnCtx(t);
      return N(i, {
        code: P.invalid_type,
        expected: O.undefined,
        received: i.parsedType
      }), D;
    }
    return mt(t.data);
  }
}
Ne.create = (r) => new Ne({
  typeName: B.ZodUndefined,
  ...F(r)
});
class Le extends W {
  _parse(t) {
    if (this._getType(t) !== O.null) {
      const i = this._getOrReturnCtx(t);
      return N(i, {
        code: P.invalid_type,
        expected: O.null,
        received: i.parsedType
      }), D;
    }
    return mt(t.data);
  }
}
Le.create = (r) => new Le({
  typeName: B.ZodNull,
  ...F(r)
});
class me extends W {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(t) {
    return mt(t.data);
  }
}
me.create = (r) => new me({
  typeName: B.ZodAny,
  ...F(r)
});
class re extends W {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(t) {
    return mt(t.data);
  }
}
re.create = (r) => new re({
  typeName: B.ZodUnknown,
  ...F(r)
});
class qt extends W {
  _parse(t) {
    const e = this._getOrReturnCtx(t);
    return N(e, {
      code: P.invalid_type,
      expected: O.never,
      received: e.parsedType
    }), D;
  }
}
qt.create = (r) => new qt({
  typeName: B.ZodNever,
  ...F(r)
});
class Pr extends W {
  _parse(t) {
    if (this._getType(t) !== O.undefined) {
      const i = this._getOrReturnCtx(t);
      return N(i, {
        code: P.invalid_type,
        expected: O.void,
        received: i.parsedType
      }), D;
    }
    return mt(t.data);
  }
}
Pr.create = (r) => new Pr({
  typeName: B.ZodVoid,
  ...F(r)
});
class Ct extends W {
  _parse(t) {
    const { ctx: e, status: i } = this._processInputParams(t), n = this._def;
    if (e.parsedType !== O.array)
      return N(e, {
        code: P.invalid_type,
        expected: O.array,
        received: e.parsedType
      }), D;
    if (n.exactLength !== null) {
      const o = e.data.length > n.exactLength.value, a = e.data.length < n.exactLength.value;
      (o || a) && (N(e, {
        code: o ? P.too_big : P.too_small,
        minimum: a ? n.exactLength.value : void 0,
        maximum: o ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message
      }), i.dirty());
    }
    if (n.minLength !== null && e.data.length < n.minLength.value && (N(e, {
      code: P.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.minLength.message
    }), i.dirty()), n.maxLength !== null && e.data.length > n.maxLength.value && (N(e, {
      code: P.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.maxLength.message
    }), i.dirty()), e.common.async)
      return Promise.all([...e.data].map((o, a) => n.type._parseAsync(new Ot(e, o, e.path, a)))).then((o) => ut.mergeArray(i, o));
    const s = [...e.data].map((o, a) => n.type._parseSync(new Ot(e, o, e.path, a)));
    return ut.mergeArray(i, s);
  }
  get element() {
    return this._def.type;
  }
  min(t, e) {
    return new Ct({
      ...this._def,
      minLength: { value: t, message: j.toString(e) }
    });
  }
  max(t, e) {
    return new Ct({
      ...this._def,
      maxLength: { value: t, message: j.toString(e) }
    });
  }
  length(t, e) {
    return new Ct({
      ...this._def,
      exactLength: { value: t, message: j.toString(e) }
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Ct.create = (r, t) => new Ct({
  type: r,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: B.ZodArray,
  ...F(t)
});
function le(r) {
  if (r instanceof rt) {
    const t = {};
    for (const e in r.shape) {
      const i = r.shape[e];
      t[e] = $t.create(le(i));
    }
    return new rt({
      ...r._def,
      shape: () => t
    });
  } else
    return r instanceof Ct ? new Ct({
      ...r._def,
      type: le(r.element)
    }) : r instanceof $t ? $t.create(le(r.unwrap())) : r instanceof se ? se.create(le(r.unwrap())) : r instanceof Nt ? Nt.create(r.items.map((t) => le(t))) : r;
}
class rt extends W {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const t = this._def.shape(), e = J.objectKeys(t);
    return this._cached = { shape: t, keys: e };
  }
  _parse(t) {
    if (this._getType(t) !== O.object) {
      const c = this._getOrReturnCtx(t);
      return N(c, {
        code: P.invalid_type,
        expected: O.object,
        received: c.parsedType
      }), D;
    }
    const { status: i, ctx: n } = this._processInputParams(t), { shape: s, keys: o } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof qt && this._def.unknownKeys === "strip"))
      for (const c in n.data)
        o.includes(c) || a.push(c);
    const h = [];
    for (const c of o) {
      const l = s[c], u = n.data[c];
      h.push({
        key: { status: "valid", value: c },
        value: l._parse(new Ot(n, u, n.path, c)),
        alwaysSet: c in n.data
      });
    }
    if (this._def.catchall instanceof qt) {
      const c = this._def.unknownKeys;
      if (c === "passthrough")
        for (const l of a)
          h.push({
            key: { status: "valid", value: l },
            value: { status: "valid", value: n.data[l] }
          });
      else if (c === "strict")
        a.length > 0 && (N(n, {
          code: P.unrecognized_keys,
          keys: a
        }), i.dirty());
      else if (c !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const c = this._def.catchall;
      for (const l of a) {
        const u = n.data[l];
        h.push({
          key: { status: "valid", value: l },
          value: c._parse(
            new Ot(n, u, n.path, l)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: l in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const c = [];
      for (const l of h) {
        const u = await l.key;
        c.push({
          key: u,
          value: await l.value,
          alwaysSet: l.alwaysSet
        });
      }
      return c;
    }).then((c) => ut.mergeObjectSync(i, c)) : ut.mergeObjectSync(i, h);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return j.errToObj, new rt({
      ...this._def,
      unknownKeys: "strict",
      ...t !== void 0 ? {
        errorMap: (e, i) => {
          var n, s, o, a;
          const h = (o = (s = (n = this._def).errorMap) === null || s === void 0 ? void 0 : s.call(n, e, i).message) !== null && o !== void 0 ? o : i.defaultError;
          return e.code === "unrecognized_keys" ? {
            message: (a = j.errToObj(t).message) !== null && a !== void 0 ? a : h
          } : {
            message: h
          };
        }
      } : {}
    });
  }
  strip() {
    return new rt({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new rt({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(t) {
    return new rt({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...t
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(t) {
    return new rt({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...t._def.shape()
      }),
      typeName: B.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(t, e) {
    return this.augment({ [t]: e });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(t) {
    return new rt({
      ...this._def,
      catchall: t
    });
  }
  pick(t) {
    const e = {};
    return J.objectKeys(t).forEach((i) => {
      t[i] && this.shape[i] && (e[i] = this.shape[i]);
    }), new rt({
      ...this._def,
      shape: () => e
    });
  }
  omit(t) {
    const e = {};
    return J.objectKeys(this.shape).forEach((i) => {
      t[i] || (e[i] = this.shape[i]);
    }), new rt({
      ...this._def,
      shape: () => e
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return le(this);
  }
  partial(t) {
    const e = {};
    return J.objectKeys(this.shape).forEach((i) => {
      const n = this.shape[i];
      t && !t[i] ? e[i] = n : e[i] = n.optional();
    }), new rt({
      ...this._def,
      shape: () => e
    });
  }
  required(t) {
    const e = {};
    return J.objectKeys(this.shape).forEach((i) => {
      if (t && !t[i])
        e[i] = this.shape[i];
      else {
        let s = this.shape[i];
        for (; s instanceof $t; )
          s = s._def.innerType;
        e[i] = s;
      }
    }), new rt({
      ...this._def,
      shape: () => e
    });
  }
  keyof() {
    return qn(J.objectKeys(this.shape));
  }
}
rt.create = (r, t) => new rt({
  shape: () => r,
  unknownKeys: "strip",
  catchall: qt.create(),
  typeName: B.ZodObject,
  ...F(t)
});
rt.strictCreate = (r, t) => new rt({
  shape: () => r,
  unknownKeys: "strict",
  catchall: qt.create(),
  typeName: B.ZodObject,
  ...F(t)
});
rt.lazycreate = (r, t) => new rt({
  shape: r,
  unknownKeys: "strip",
  catchall: qt.create(),
  typeName: B.ZodObject,
  ...F(t)
});
class je extends W {
  _parse(t) {
    const { ctx: e } = this._processInputParams(t), i = this._def.options;
    function n(s) {
      for (const a of s)
        if (a.result.status === "valid")
          return a.result;
      for (const a of s)
        if (a.result.status === "dirty")
          return e.common.issues.push(...a.ctx.common.issues), a.result;
      const o = s.map((a) => new Pt(a.ctx.common.issues));
      return N(e, {
        code: P.invalid_union,
        unionErrors: o
      }), D;
    }
    if (e.common.async)
      return Promise.all(i.map(async (s) => {
        const o = {
          ...e,
          common: {
            ...e.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await s._parseAsync({
            data: e.data,
            path: e.path,
            parent: o
          }),
          ctx: o
        };
      })).then(n);
    {
      let s;
      const o = [];
      for (const h of i) {
        const c = {
          ...e,
          common: {
            ...e.common,
            issues: []
          },
          parent: null
        }, l = h._parseSync({
          data: e.data,
          path: e.path,
          parent: c
        });
        if (l.status === "valid")
          return l;
        l.status === "dirty" && !s && (s = { result: l, ctx: c }), c.common.issues.length && o.push(c.common.issues);
      }
      if (s)
        return e.common.issues.push(...s.ctx.common.issues), s.result;
      const a = o.map((h) => new Pt(h));
      return N(e, {
        code: P.invalid_union,
        unionErrors: a
      }), D;
    }
  }
  get options() {
    return this._def.options;
  }
}
je.create = (r, t) => new je({
  options: r,
  typeName: B.ZodUnion,
  ...F(t)
});
const xr = (r) => r instanceof Ge ? xr(r.schema) : r instanceof Rt ? xr(r.innerType()) : r instanceof Fe ? [r.value] : r instanceof Qt ? r.options : r instanceof Ue ? Object.keys(r.enum) : r instanceof We ? xr(r._def.innerType) : r instanceof Ne ? [void 0] : r instanceof Le ? [null] : null;
class zr extends W {
  _parse(t) {
    const { ctx: e } = this._processInputParams(t);
    if (e.parsedType !== O.object)
      return N(e, {
        code: P.invalid_type,
        expected: O.object,
        received: e.parsedType
      }), D;
    const i = this.discriminator, n = e.data[i], s = this.optionsMap.get(n);
    return s ? e.common.async ? s._parseAsync({
      data: e.data,
      path: e.path,
      parent: e
    }) : s._parseSync({
      data: e.data,
      path: e.path,
      parent: e
    }) : (N(e, {
      code: P.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [i]
    }), D);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(t, e, i) {
    const n = /* @__PURE__ */ new Map();
    for (const s of e) {
      const o = xr(s.shape[t]);
      if (!o)
        throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
      for (const a of o) {
        if (n.has(a))
          throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(a)}`);
        n.set(a, s);
      }
    }
    return new zr({
      typeName: B.ZodDiscriminatedUnion,
      discriminator: t,
      options: e,
      optionsMap: n,
      ...F(i)
    });
  }
}
function Mi(r, t) {
  const e = Yt(r), i = Yt(t);
  if (r === t)
    return { valid: !0, data: r };
  if (e === O.object && i === O.object) {
    const n = J.objectKeys(t), s = J.objectKeys(r).filter((a) => n.indexOf(a) !== -1), o = { ...r, ...t };
    for (const a of s) {
      const h = Mi(r[a], t[a]);
      if (!h.valid)
        return { valid: !1 };
      o[a] = h.data;
    }
    return { valid: !0, data: o };
  } else if (e === O.array && i === O.array) {
    if (r.length !== t.length)
      return { valid: !1 };
    const n = [];
    for (let s = 0; s < r.length; s++) {
      const o = r[s], a = t[s], h = Mi(o, a);
      if (!h.valid)
        return { valid: !1 };
      n.push(h.data);
    }
    return { valid: !0, data: n };
  } else
    return e === O.date && i === O.date && +r == +t ? { valid: !0, data: r } : { valid: !1 };
}
class Be extends W {
  _parse(t) {
    const { status: e, ctx: i } = this._processInputParams(t), n = (s, o) => {
      if (Ti(s) || Ti(o))
        return D;
      const a = Mi(s.value, o.value);
      return a.valid ? ((bi(s) || bi(o)) && e.dirty(), { status: e.value, value: a.data }) : (N(i, {
        code: P.invalid_intersection_types
      }), D);
    };
    return i.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: i.data,
        path: i.path,
        parent: i
      }),
      this._def.right._parseAsync({
        data: i.data,
        path: i.path,
        parent: i
      })
    ]).then(([s, o]) => n(s, o)) : n(this._def.left._parseSync({
      data: i.data,
      path: i.path,
      parent: i
    }), this._def.right._parseSync({
      data: i.data,
      path: i.path,
      parent: i
    }));
  }
}
Be.create = (r, t, e) => new Be({
  left: r,
  right: t,
  typeName: B.ZodIntersection,
  ...F(e)
});
class Nt extends W {
  _parse(t) {
    const { status: e, ctx: i } = this._processInputParams(t);
    if (i.parsedType !== O.array)
      return N(i, {
        code: P.invalid_type,
        expected: O.array,
        received: i.parsedType
      }), D;
    if (i.data.length < this._def.items.length)
      return N(i, {
        code: P.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), D;
    !this._def.rest && i.data.length > this._def.items.length && (N(i, {
      code: P.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), e.dirty());
    const s = [...i.data].map((o, a) => {
      const h = this._def.items[a] || this._def.rest;
      return h ? h._parse(new Ot(i, o, i.path, a)) : null;
    }).filter((o) => !!o);
    return i.common.async ? Promise.all(s).then((o) => ut.mergeArray(e, o)) : ut.mergeArray(e, s);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new Nt({
      ...this._def,
      rest: t
    });
  }
}
Nt.create = (r, t) => {
  if (!Array.isArray(r))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Nt({
    items: r,
    typeName: B.ZodTuple,
    rest: null,
    ...F(t)
  });
};
class De extends W {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: e, ctx: i } = this._processInputParams(t);
    if (i.parsedType !== O.object)
      return N(i, {
        code: P.invalid_type,
        expected: O.object,
        received: i.parsedType
      }), D;
    const n = [], s = this._def.keyType, o = this._def.valueType;
    for (const a in i.data)
      n.push({
        key: s._parse(new Ot(i, a, i.path, a)),
        value: o._parse(new Ot(i, i.data[a], i.path, a))
      });
    return i.common.async ? ut.mergeObjectAsync(e, n) : ut.mergeObjectSync(e, n);
  }
  get element() {
    return this._def.valueType;
  }
  static create(t, e, i) {
    return e instanceof W ? new De({
      keyType: t,
      valueType: e,
      typeName: B.ZodRecord,
      ...F(i)
    }) : new De({
      keyType: St.create(),
      valueType: t,
      typeName: B.ZodRecord,
      ...F(e)
    });
  }
}
class Cr extends W {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: e, ctx: i } = this._processInputParams(t);
    if (i.parsedType !== O.map)
      return N(i, {
        code: P.invalid_type,
        expected: O.map,
        received: i.parsedType
      }), D;
    const n = this._def.keyType, s = this._def.valueType, o = [...i.data.entries()].map(([a, h], c) => ({
      key: n._parse(new Ot(i, a, i.path, [c, "key"])),
      value: s._parse(new Ot(i, h, i.path, [c, "value"]))
    }));
    if (i.common.async) {
      const a = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const h of o) {
          const c = await h.key, l = await h.value;
          if (c.status === "aborted" || l.status === "aborted")
            return D;
          (c.status === "dirty" || l.status === "dirty") && e.dirty(), a.set(c.value, l.value);
        }
        return { status: e.value, value: a };
      });
    } else {
      const a = /* @__PURE__ */ new Map();
      for (const h of o) {
        const c = h.key, l = h.value;
        if (c.status === "aborted" || l.status === "aborted")
          return D;
        (c.status === "dirty" || l.status === "dirty") && e.dirty(), a.set(c.value, l.value);
      }
      return { status: e.value, value: a };
    }
  }
}
Cr.create = (r, t, e) => new Cr({
  valueType: t,
  keyType: r,
  typeName: B.ZodMap,
  ...F(e)
});
class ne extends W {
  _parse(t) {
    const { status: e, ctx: i } = this._processInputParams(t);
    if (i.parsedType !== O.set)
      return N(i, {
        code: P.invalid_type,
        expected: O.set,
        received: i.parsedType
      }), D;
    const n = this._def;
    n.minSize !== null && i.data.size < n.minSize.value && (N(i, {
      code: P.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message
    }), e.dirty()), n.maxSize !== null && i.data.size > n.maxSize.value && (N(i, {
      code: P.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.maxSize.message
    }), e.dirty());
    const s = this._def.valueType;
    function o(h) {
      const c = /* @__PURE__ */ new Set();
      for (const l of h) {
        if (l.status === "aborted")
          return D;
        l.status === "dirty" && e.dirty(), c.add(l.value);
      }
      return { status: e.value, value: c };
    }
    const a = [...i.data.values()].map((h, c) => s._parse(new Ot(i, h, i.path, c)));
    return i.common.async ? Promise.all(a).then((h) => o(h)) : o(a);
  }
  min(t, e) {
    return new ne({
      ...this._def,
      minSize: { value: t, message: j.toString(e) }
    });
  }
  max(t, e) {
    return new ne({
      ...this._def,
      maxSize: { value: t, message: j.toString(e) }
    });
  }
  size(t, e) {
    return this.min(t, e).max(t, e);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
ne.create = (r, t) => new ne({
  valueType: r,
  minSize: null,
  maxSize: null,
  typeName: B.ZodSet,
  ...F(t)
});
class ge extends W {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(t) {
    const { ctx: e } = this._processInputParams(t);
    if (e.parsedType !== O.function)
      return N(e, {
        code: P.invalid_type,
        expected: O.function,
        received: e.parsedType
      }), D;
    function i(a, h) {
      return Ir({
        data: a,
        path: e.path,
        errorMaps: [
          e.common.contextualErrorMap,
          e.schemaErrorMap,
          Er(),
          Re
        ].filter((c) => !!c),
        issueData: {
          code: P.invalid_arguments,
          argumentsError: h
        }
      });
    }
    function n(a, h) {
      return Ir({
        data: a,
        path: e.path,
        errorMaps: [
          e.common.contextualErrorMap,
          e.schemaErrorMap,
          Er(),
          Re
        ].filter((c) => !!c),
        issueData: {
          code: P.invalid_return_type,
          returnTypeError: h
        }
      });
    }
    const s = { errorMap: e.common.contextualErrorMap }, o = e.data;
    if (this._def.returns instanceof ye) {
      const a = this;
      return mt(async function(...h) {
        const c = new Pt([]), l = await a._def.args.parseAsync(h, s).catch((w) => {
          throw c.addIssue(i(h, w)), c;
        }), u = await Reflect.apply(o, this, l);
        return await a._def.returns._def.type.parseAsync(u, s).catch((w) => {
          throw c.addIssue(n(u, w)), c;
        });
      });
    } else {
      const a = this;
      return mt(function(...h) {
        const c = a._def.args.safeParse(h, s);
        if (!c.success)
          throw new Pt([i(h, c.error)]);
        const l = Reflect.apply(o, this, c.data), u = a._def.returns.safeParse(l, s);
        if (!u.success)
          throw new Pt([n(l, u.error)]);
        return u.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...t) {
    return new ge({
      ...this._def,
      args: Nt.create(t).rest(re.create())
    });
  }
  returns(t) {
    return new ge({
      ...this._def,
      returns: t
    });
  }
  implement(t) {
    return this.parse(t);
  }
  strictImplement(t) {
    return this.parse(t);
  }
  static create(t, e, i) {
    return new ge({
      args: t || Nt.create([]).rest(re.create()),
      returns: e || re.create(),
      typeName: B.ZodFunction,
      ...F(i)
    });
  }
}
class Ge extends W {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: e } = this._processInputParams(t);
    return this._def.getter()._parse({ data: e.data, path: e.path, parent: e });
  }
}
Ge.create = (r, t) => new Ge({
  getter: r,
  typeName: B.ZodLazy,
  ...F(t)
});
class Fe extends W {
  _parse(t) {
    if (t.data !== this._def.value) {
      const e = this._getOrReturnCtx(t);
      return N(e, {
        received: e.data,
        code: P.invalid_literal,
        expected: this._def.value
      }), D;
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
Fe.create = (r, t) => new Fe({
  value: r,
  typeName: B.ZodLiteral,
  ...F(t)
});
function qn(r, t) {
  return new Qt({
    values: r,
    typeName: B.ZodEnum,
    ...F(t)
  });
}
class Qt extends W {
  _parse(t) {
    if (typeof t.data != "string") {
      const e = this._getOrReturnCtx(t), i = this._def.values;
      return N(e, {
        expected: J.joinValues(i),
        received: e.parsedType,
        code: P.invalid_type
      }), D;
    }
    if (this._def.values.indexOf(t.data) === -1) {
      const e = this._getOrReturnCtx(t), i = this._def.values;
      return N(e, {
        received: e.data,
        code: P.invalid_enum_value,
        options: i
      }), D;
    }
    return mt(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const e of this._def.values)
      t[e] = e;
    return t;
  }
  get Values() {
    const t = {};
    for (const e of this._def.values)
      t[e] = e;
    return t;
  }
  get Enum() {
    const t = {};
    for (const e of this._def.values)
      t[e] = e;
    return t;
  }
  extract(t) {
    return Qt.create(t);
  }
  exclude(t) {
    return Qt.create(this.options.filter((e) => !t.includes(e)));
  }
}
Qt.create = qn;
class Ue extends W {
  _parse(t) {
    const e = J.getValidEnumValues(this._def.values), i = this._getOrReturnCtx(t);
    if (i.parsedType !== O.string && i.parsedType !== O.number) {
      const n = J.objectValues(e);
      return N(i, {
        expected: J.joinValues(n),
        received: i.parsedType,
        code: P.invalid_type
      }), D;
    }
    if (e.indexOf(t.data) === -1) {
      const n = J.objectValues(e);
      return N(i, {
        received: i.data,
        code: P.invalid_enum_value,
        options: n
      }), D;
    }
    return mt(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
Ue.create = (r, t) => new Ue({
  values: r,
  typeName: B.ZodNativeEnum,
  ...F(t)
});
class ye extends W {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: e } = this._processInputParams(t);
    if (e.parsedType !== O.promise && e.common.async === !1)
      return N(e, {
        code: P.invalid_type,
        expected: O.promise,
        received: e.parsedType
      }), D;
    const i = e.parsedType === O.promise ? e.data : Promise.resolve(e.data);
    return mt(i.then((n) => this._def.type.parseAsync(n, {
      path: e.path,
      errorMap: e.common.contextualErrorMap
    })));
  }
}
ye.create = (r, t) => new ye({
  type: r,
  typeName: B.ZodPromise,
  ...F(t)
});
class Rt extends W {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === B.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(t) {
    const { status: e, ctx: i } = this._processInputParams(t), n = this._def.effect || null, s = {
      addIssue: (o) => {
        N(i, o), o.fatal ? e.abort() : e.dirty();
      },
      get path() {
        return i.path;
      }
    };
    if (s.addIssue = s.addIssue.bind(s), n.type === "preprocess") {
      const o = n.transform(i.data, s);
      return i.common.issues.length ? {
        status: "dirty",
        value: i.data
      } : i.common.async ? Promise.resolve(o).then((a) => this._def.schema._parseAsync({
        data: a,
        path: i.path,
        parent: i
      })) : this._def.schema._parseSync({
        data: o,
        path: i.path,
        parent: i
      });
    }
    if (n.type === "refinement") {
      const o = (a) => {
        const h = n.refinement(a, s);
        if (i.common.async)
          return Promise.resolve(h);
        if (h instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return a;
      };
      if (i.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: i.data,
          path: i.path,
          parent: i
        });
        return a.status === "aborted" ? D : (a.status === "dirty" && e.dirty(), o(a.value), { status: e.value, value: a.value });
      } else
        return this._def.schema._parseAsync({ data: i.data, path: i.path, parent: i }).then((a) => a.status === "aborted" ? D : (a.status === "dirty" && e.dirty(), o(a.value).then(() => ({ status: e.value, value: a.value }))));
    }
    if (n.type === "transform")
      if (i.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: i.data,
          path: i.path,
          parent: i
        });
        if (!ke(o))
          return o;
        const a = n.transform(o.value, s);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: e.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: i.data, path: i.path, parent: i }).then((o) => ke(o) ? Promise.resolve(n.transform(o.value, s)).then((a) => ({ status: e.value, value: a })) : o);
    J.assertNever(n);
  }
}
Rt.create = (r, t, e) => new Rt({
  schema: r,
  typeName: B.ZodEffects,
  effect: t,
  ...F(e)
});
Rt.createWithPreprocess = (r, t, e) => new Rt({
  schema: t,
  effect: { type: "preprocess", transform: r },
  typeName: B.ZodEffects,
  ...F(e)
});
class $t extends W {
  _parse(t) {
    return this._getType(t) === O.undefined ? mt(void 0) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
$t.create = (r, t) => new $t({
  innerType: r,
  typeName: B.ZodOptional,
  ...F(t)
});
class se extends W {
  _parse(t) {
    return this._getType(t) === O.null ? mt(null) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
se.create = (r, t) => new se({
  innerType: r,
  typeName: B.ZodNullable,
  ...F(t)
});
class We extends W {
  _parse(t) {
    const { ctx: e } = this._processInputParams(t);
    let i = e.data;
    return e.parsedType === O.undefined && (i = this._def.defaultValue()), this._def.innerType._parse({
      data: i,
      path: e.path,
      parent: e
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
We.create = (r, t) => new We({
  innerType: r,
  typeName: B.ZodDefault,
  defaultValue: typeof t.default == "function" ? t.default : () => t.default,
  ...F(t)
});
class Rr extends W {
  _parse(t) {
    const { ctx: e } = this._processInputParams(t), i = {
      ...e,
      common: {
        ...e.common,
        issues: []
      }
    }, n = this._def.innerType._parse({
      data: i.data,
      path: i.path,
      parent: {
        ...i
      }
    });
    return Sr(n) ? n.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Pt(i.common.issues);
        },
        input: i.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new Pt(i.common.issues);
        },
        input: i.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Rr.create = (r, t) => new Rr({
  innerType: r,
  typeName: B.ZodCatch,
  catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
  ...F(t)
});
class kr extends W {
  _parse(t) {
    if (this._getType(t) !== O.nan) {
      const i = this._getOrReturnCtx(t);
      return N(i, {
        code: P.invalid_type,
        expected: O.nan,
        received: i.parsedType
      }), D;
    }
    return { status: "valid", value: t.data };
  }
}
kr.create = (r) => new kr({
  typeName: B.ZodNaN,
  ...F(r)
});
const $o = Symbol("zod_brand");
class Xn extends W {
  _parse(t) {
    const { ctx: e } = this._processInputParams(t), i = e.data;
    return this._def.type._parse({
      data: i,
      path: e.path,
      parent: e
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class qe extends W {
  _parse(t) {
    const { status: e, ctx: i } = this._processInputParams(t);
    if (i.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: i.data,
          path: i.path,
          parent: i
        });
        return s.status === "aborted" ? D : s.status === "dirty" ? (e.dirty(), $n(s.value)) : this._def.out._parseAsync({
          data: s.value,
          path: i.path,
          parent: i
        });
      })();
    {
      const n = this._def.in._parseSync({
        data: i.data,
        path: i.path,
        parent: i
      });
      return n.status === "aborted" ? D : n.status === "dirty" ? (e.dirty(), {
        status: "dirty",
        value: n.value
      }) : this._def.out._parseSync({
        data: n.value,
        path: i.path,
        parent: i
      });
    }
  }
  static create(t, e) {
    return new qe({
      in: t,
      out: e,
      typeName: B.ZodPipeline
    });
  }
}
class Or extends W {
  _parse(t) {
    const e = this._def.innerType._parse(t);
    return ke(e) && (e.value = Object.freeze(e.value)), e;
  }
}
Or.create = (r, t) => new Or({
  innerType: r,
  typeName: B.ZodReadonly,
  ...F(t)
});
const Hn = (r, t = {}, e) => r ? me.create().superRefine((i, n) => {
  var s, o;
  if (!r(i)) {
    const a = typeof t == "function" ? t(i) : typeof t == "string" ? { message: t } : t, h = (o = (s = a.fatal) !== null && s !== void 0 ? s : e) !== null && o !== void 0 ? o : !0, c = typeof a == "string" ? { message: a } : a;
    n.addIssue({ code: "custom", ...c, fatal: h });
  }
}) : me.create(), qo = {
  object: rt.lazycreate
};
var B;
(function(r) {
  r.ZodString = "ZodString", r.ZodNumber = "ZodNumber", r.ZodNaN = "ZodNaN", r.ZodBigInt = "ZodBigInt", r.ZodBoolean = "ZodBoolean", r.ZodDate = "ZodDate", r.ZodSymbol = "ZodSymbol", r.ZodUndefined = "ZodUndefined", r.ZodNull = "ZodNull", r.ZodAny = "ZodAny", r.ZodUnknown = "ZodUnknown", r.ZodNever = "ZodNever", r.ZodVoid = "ZodVoid", r.ZodArray = "ZodArray", r.ZodObject = "ZodObject", r.ZodUnion = "ZodUnion", r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", r.ZodIntersection = "ZodIntersection", r.ZodTuple = "ZodTuple", r.ZodRecord = "ZodRecord", r.ZodMap = "ZodMap", r.ZodSet = "ZodSet", r.ZodFunction = "ZodFunction", r.ZodLazy = "ZodLazy", r.ZodLiteral = "ZodLiteral", r.ZodEnum = "ZodEnum", r.ZodEffects = "ZodEffects", r.ZodNativeEnum = "ZodNativeEnum", r.ZodOptional = "ZodOptional", r.ZodNullable = "ZodNullable", r.ZodDefault = "ZodDefault", r.ZodCatch = "ZodCatch", r.ZodPromise = "ZodPromise", r.ZodBranded = "ZodBranded", r.ZodPipeline = "ZodPipeline", r.ZodReadonly = "ZodReadonly";
})(B || (B = {}));
const Xo = (r, t = {
  message: `Input not instance of ${r.name}`
}) => Hn((e) => e instanceof r, t), Yn = St.create, Jn = Jt.create, Ho = kr.create, Yo = Kt.create, Kn = Oe.create, Jo = ie.create, Ko = Ar.create, Qo = Ne.create, ta = Le.create, ea = me.create, ra = re.create, ia = qt.create, na = Pr.create, sa = Ct.create, oa = rt.create, aa = rt.strictCreate, ha = je.create, ca = zr.create, la = Be.create, ua = Nt.create, da = De.create, fa = Cr.create, pa = ne.create, ga = ge.create, ma = Ge.create, ya = Fe.create, wa = Qt.create, va = Ue.create, xa = ye.create, an = Rt.create, Ta = $t.create, ba = se.create, Ma = Rt.createWithPreprocess, _a = qe.create, Ea = () => Yn().optional(), Ia = () => Jn().optional(), Sa = () => Kn().optional(), Aa = {
  string: (r) => St.create({ ...r, coerce: !0 }),
  number: (r) => Jt.create({ ...r, coerce: !0 }),
  boolean: (r) => Oe.create({
    ...r,
    coerce: !0
  }),
  bigint: (r) => Kt.create({ ...r, coerce: !0 }),
  date: (r) => ie.create({ ...r, coerce: !0 })
}, Pa = D;
var m = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: Re,
  setErrorMap: Oo,
  getErrorMap: Er,
  makeIssue: Ir,
  EMPTY_PATH: No,
  addIssueToContext: N,
  ParseStatus: ut,
  INVALID: D,
  DIRTY: $n,
  OK: mt,
  isAborted: Ti,
  isDirty: bi,
  isValid: ke,
  isAsync: Sr,
  get util() {
    return J;
  },
  get objectUtil() {
    return xi;
  },
  ZodParsedType: O,
  getParsedType: Yt,
  ZodType: W,
  ZodString: St,
  ZodNumber: Jt,
  ZodBigInt: Kt,
  ZodBoolean: Oe,
  ZodDate: ie,
  ZodSymbol: Ar,
  ZodUndefined: Ne,
  ZodNull: Le,
  ZodAny: me,
  ZodUnknown: re,
  ZodNever: qt,
  ZodVoid: Pr,
  ZodArray: Ct,
  ZodObject: rt,
  ZodUnion: je,
  ZodDiscriminatedUnion: zr,
  ZodIntersection: Be,
  ZodTuple: Nt,
  ZodRecord: De,
  ZodMap: Cr,
  ZodSet: ne,
  ZodFunction: ge,
  ZodLazy: Ge,
  ZodLiteral: Fe,
  ZodEnum: Qt,
  ZodNativeEnum: Ue,
  ZodPromise: ye,
  ZodEffects: Rt,
  ZodTransformer: Rt,
  ZodOptional: $t,
  ZodNullable: se,
  ZodDefault: We,
  ZodCatch: Rr,
  ZodNaN: kr,
  BRAND: $o,
  ZodBranded: Xn,
  ZodPipeline: qe,
  ZodReadonly: Or,
  custom: Hn,
  Schema: W,
  ZodSchema: W,
  late: qo,
  get ZodFirstPartyTypeKind() {
    return B;
  },
  coerce: Aa,
  any: ea,
  array: sa,
  bigint: Yo,
  boolean: Kn,
  date: Jo,
  discriminatedUnion: ca,
  effect: an,
  enum: wa,
  function: ga,
  instanceof: Xo,
  intersection: la,
  lazy: ma,
  literal: ya,
  map: fa,
  nan: Ho,
  nativeEnum: va,
  never: ia,
  null: ta,
  nullable: ba,
  number: Jn,
  object: oa,
  oboolean: Sa,
  onumber: Ia,
  optional: Ta,
  ostring: Ea,
  pipeline: _a,
  preprocess: Ma,
  promise: xa,
  record: da,
  set: pa,
  strictObject: aa,
  string: Yn,
  symbol: Ko,
  transformer: an,
  tuple: ua,
  undefined: Qo,
  union: ha,
  unknown: ra,
  void: na,
  NEVER: Pa,
  ZodIssueCode: P,
  quotelessJson: ko,
  ZodError: Pt
});
const Zr = /^https?:\/\/library.stanford.edu\/iiif\/image-api\/1.1\/compliance.html#level(?<level>[012])$/, Qn = m.string().regex(Zr), Ca = Qn, Nr = "http://library.stanford.edu/iiif/image-api/1.1/context.json", ts = "http://iiif.io/api/image/1/context.json", es = m.literal(Nr), rs = m.object({
  "@context": es,
  "@id": m.string().url(),
  profile: Qn.optional(),
  width: m.number().int(),
  height: m.number().int(),
  scale_factors: m.number().array().optional(),
  tile_width: m.number().optional(),
  tile_height: m.number().optional()
}), is = m.object({
  width: m.number().int(),
  height: m.number().int()
}), ns = m.object({
  width: m.number().int(),
  height: m.number().int().optional(),
  scaleFactors: m.array(m.number().int())
}), $r = /^https?:\/\/iiif.io\/api\/image\/2.*level(?<level>[012])(.json)?$/, hn = m.string().regex($r), Ra = m.object({
  formats: m.string().array().optional(),
  maxArea: m.number().int().optional(),
  maxHeight: m.number().int().optional(),
  maxWidth: m.number().int().optional(),
  qualities: m.string().array().optional(),
  supports: m.string().array().optional()
}), Lr = hn.or(m.array(m.union([
  hn,
  Ra,
  // Catchall for incorrect profiles
  m.any()
]))), jr = "http://iiif.io/api/image/2/context.json", ss = m.literal(jr).or(m.literal("https://iiif.io/api/image/2/context.json")), ji = m.object({
  "@id": m.string().url(),
  "@type": m.literal("iiif:Image").optional(),
  "@context": ss,
  protocol: m.literal("http://iiif.io/api/image"),
  width: m.number().int(),
  height: m.number().int(),
  profile: Lr,
  sizes: is.array().optional(),
  tiles: ns.array().optional()
}), ka = ["level0", "level1", "level2"], Bi = m.object({
  id: m.string().url(),
  type: m.literal("ImageService3"),
  protocol: m.literal("http://iiif.io/api/image"),
  profile: m.enum(ka),
  width: m.number().int(),
  height: m.number().int(),
  maxWidth: m.number().int().optional(),
  maxHeight: m.number().int().optional(),
  maxArea: m.number().int().optional(),
  sizes: is.array().optional(),
  tiles: ns.array().optional(),
  extraFeatures: m.string().array().optional()
  // TODO: add partOf, seeAlso, and service
}), Oa = m.object({
  "@id": m.string().url(),
  profile: Ca.or(Lr),
  width: m.number().int().optional(),
  height: m.number().int().optional(),
  "@context": es.or(m.literal("http://iiif.io/api/image/1/context.json")).or(ss).optional()
}), Na = ["level0", "level1", "level2"], La = [
  "ImageService1",
  "ImageService2",
  "ImageService3"
], ja = m.object({
  id: m.string().url(),
  type: m.literal("ImageService2"),
  profile: Lr
}).or(m.object({
  "@id": m.string().url(),
  "@type": m.literal("ImageService2"),
  profile: Lr
})), Ba = m.object({
  id: m.string().url(),
  type: m.enum(La),
  profile: m.enum(Na)
}), Da = m.union([
  ja,
  Ba
]), os = Oa.or(Da), cn = m.string().or(m.number()).or(m.boolean()), as = cn.or(cn.array()), ln = m.object({
  "@language": m.string().optional(),
  "@value": as
}), oe = as.or(ln).or(ln.array()), Ga = m.object({
  label: oe.optional(),
  value: oe.optional()
}), hs = Ga.array(), Fa = m.object({
  width: m.number().int().optional(),
  height: m.number().int().optional(),
  service: os
}), Ua = m.object({
  resource: Fa
}), cs = m.object({
  "@id": m.string().url(),
  "@type": m.literal("sc:Canvas"),
  width: m.number().int(),
  height: m.number().int(),
  images: Ua.array().length(1),
  label: oe.optional(),
  metadata: hs.optional()
}), Wa = m.object({
  canvases: cs.array().nonempty()
}), ls = m.object({
  "@id": m.string().url(),
  "@type": m.literal("sc:Manifest"),
  sequences: Wa.array().length(1),
  label: oe.optional(),
  description: oe.optional(),
  metadata: hs.optional()
}), un = m.lazy(() => m.object({
  "@id": m.string().url(),
  "@type": m.literal("sc:Manifest"),
  label: oe.optional()
})), _i = m.lazy(() => m.object({
  "@id": m.string().url(),
  "@type": m.literal("sc:Collection"),
  label: oe.optional(),
  manifests: un.array().optional(),
  collections: _i.array().optional(),
  members: un.or(_i).array().optional()
})), Va = m.string().or(m.number()).or(m.boolean()), ae = m.record(m.string(), Va.array()), za = m.object({
  label: ae.optional(),
  value: ae.optional()
}), us = za.array(), dn = m.object({
  type: m.literal("Image"),
  width: m.number().int().optional(),
  height: m.number().int().optional(),
  service: os.array()
}), Za = m.object({
  type: m.literal("Annotation"),
  body: dn.or(dn.array().length(1))
}), $a = m.object({
  type: m.literal("AnnotationPage"),
  items: Za.array().length(1)
}), ds = m.object({
  id: m.string().url(),
  type: m.literal("Canvas"),
  width: m.number().int(),
  height: m.number().int(),
  items: $a.array().length(1),
  label: ae.optional(),
  metadata: us.optional()
}), fs = m.object({
  id: m.string().url(),
  type: m.literal("Manifest"),
  items: ds.array().nonempty(),
  label: ae.optional(),
  description: ae.optional(),
  metadata: us.optional()
}), qa = m.lazy(() => m.object({
  id: m.string().url(),
  type: m.literal("Manifest"),
  label: ae.optional()
})), ps = m.lazy(() => m.object({
  id: m.string().url(),
  type: m.literal("Collection"),
  label: ae.optional(),
  items: qa.or(ps).array()
})), gs = rs.or(ji).or(Bi);
cs.or(ds);
const Xa = ls.or(fs);
_i.or(ps);
ls.or(ji);
fs.or(Bi);
Xa.or(gs);
function ms({ width: r, height: t }, e, i, n) {
  const s = i * e.originalWidth, o = n * e.originalHeight, a = i * e.originalWidth + e.width * e.scaleFactor > r ? r - i * e.originalWidth : e.width * e.scaleFactor, h = n * e.originalHeight + e.height * e.scaleFactor > t ? t - n * e.originalHeight : e.height * e.scaleFactor;
  let c = e.width, l = e.height;
  return s + e.width * e.scaleFactor > r && (c = Math.floor((r - s + e.scaleFactor - 1) / e.scaleFactor)), o + e.height * e.scaleFactor > t && (l = Math.floor((t - o + e.scaleFactor - 1) / e.scaleFactor)), {
    region: {
      x: s,
      y: o,
      width: a,
      height: h
    },
    size: {
      width: c,
      height: l
    }
  };
}
function Ha({ width: r, height: t }, e = 768) {
  const i = Math.max(r, t) / e, n = Math.ceil(Math.log(i) / Math.log(2));
  return {
    scaleFactors: Array.from({ length: n }, (s, o) => 2 ** o),
    // .filter((scaleFactor) => {
    //   if (maxTileSide) {
    //     return tileWidth * scaleFactor <= maxTileSide
    //   } else {
    //     return true
    //   }
    // }),
    width: e
  };
}
function Ya({ width: r, height: t }, e, i) {
  const n = e.height || e.width, s = e.width * i, o = n * i;
  return {
    scaleFactor: i,
    width: e.width,
    height: n,
    originalWidth: s,
    originalHeight: o,
    columns: Math.ceil(r / s),
    rows: Math.ceil(t / o)
  };
}
function Ja(r, t) {
  return t.map((e) => e.scaleFactors.map((i) => Ya(r, e, i))).flat();
}
function Ka(r) {
  return !!r.some((t) => t.width && t.scaleFactors && t.scaleFactors.length);
}
function Qa(r, t, e) {
  if (!t || !Ka(t))
    if (e)
      t = [Ha(r)];
    else
      throw new Error("Image does not support tiles or custom regions and sizes.");
  return Ja(r, t);
}
function th(r, t, e = "cover") {
  if (e === "cover" || e === "contain") {
    const i = t.width / r.width, n = t.height / r.height, s = e === "cover" ? Math.max(i, n) : Math.min(i, n), o = r.width * s, a = r.height * s;
    return {
      width: o,
      height: a
    };
  } else
    throw new Error('Mode must be either "cover" or "contain"');
}
const eh = 0.8, rh = 1.5;
function ys(r, t, e = "cover", { sizes: i, tileZoomLevels: n, supportsAnyRegionAndSize: s, maxWidth: o, maxHeight: a, maxArea: h }) {
  let { width: c, height: l } = th(r, t, e);
  if (o && c > o && (l = l / c * o, c = o), a && l > a && (c = c / l * a, l = a), h && c * l > h) {
    const g = l / c, y = Math.floor(Math.sqrt(h / g)) * g;
    c = Math.floor(y) / g, l = c * g;
  }
  const u = r.width / r.height;
  if (c = Math.floor(c), l = Math.round(c / u), i) {
    let g;
    for (const w of i) {
      const y = w.width / c;
      if (y >= eh && y <= rh) {
        g = w;
        break;
      }
    }
    if (g)
      return {
        size: g
      };
  }
  if (s)
    return {
      size: {
        width: Math.round(c),
        height: Math.round(l)
      }
    };
  if (n) {
    const g = r.width / c, w = n.map(({ scaleFactor: S }, f) => ({
      index: f,
      scaleFactor: S,
      diff: Math.abs(S - g)
    })).sort((S, f) => S.diff - f.diff), y = n[w[0].index], _ = Math.ceil(r.width / (y.scaleFactor * n[0].width)), I = Math.ceil(r.height / (y.scaleFactor * n[0].height)), v = [];
    for (let S = 0; S < I; S++) {
      const f = [];
      for (let p = 0; p < _; p++) {
        const T = ms(r, y, p, S);
        f.push(T);
      }
      v.push(f);
    }
    return v;
  }
  throw new Error("Unable to create thumbnail");
}
const ws = ["regionByPx", "sizeByWh"];
function ih(r) {
  const t = r.match(Zr);
  if (t && t.groups)
    return parseInt(t.groups.level);
}
function fn(r) {
  const t = r.match($r);
  if (t && t.groups)
    return parseInt(t.groups.level);
}
function nh(r) {
  return {
    maxWidth: r?.maxWidth,
    maxHeight: r?.maxHeight,
    maxArea: r?.maxArea,
    supportsAnyRegionAndSize: ws.every((t) => r?.supports && r?.supports?.includes(t))
  };
}
function sh(r) {
  if ("type" in r && r.type === "ImageService3")
    return 3;
  if ("type" in r && r.type === "ImageService2" || "@type" in r && r["@type"] === "ImageService2" || "@context" in r && r["@context"] === jr)
    return 2;
  if ("@context" in r && (r["@context"] === Nr || r["@context"] === ts))
    return 1;
  if ("profile" in r) {
    let t;
    return Array.isArray(r.profile) ? t = r.profile[0] : t = r.profile, t.match(Zr) ? 1 : t.match($r) ? 2 : 3;
  } else
    throw new Error("Unsupported IIIF Image Service");
}
function Ei(r) {
  if ("type" in r) {
    const t = r.profile;
    let e = !1;
    return t === "level0" || typeof t == "string" && t.endsWith("level0.json") ? "extraFeatures" in r && (e = ws.every((i) => r.extraFeatures && r.extraFeatures.includes(i))) : e = !0, {
      maxWidth: "maxWidth" in r ? r.maxWidth : void 0,
      maxHeight: "maxHeight" in r ? r.maxHeight : void 0,
      maxArea: "maxArea" in r ? r.maxArea : void 0,
      supportsAnyRegionAndSize: e
    };
  } else if (Array.isArray(r.profile)) {
    let t = !1, e = Number.NEGATIVE_INFINITY, i = Number.NEGATIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
    return r.profile.forEach((s) => {
      if (typeof s == "string") {
        const o = fn(s);
        o && (t = t || o >= 1);
      } else {
        const { maxWidth: o, maxHeight: a, maxArea: h, supportsAnyRegionAndSize: c } = nh(s);
        o !== void 0 && (i = Math.max(o, i)), a !== void 0 && (e = Math.max(a, e)), h !== void 0 && (n = Math.max(h, n)), t = t || c;
      }
    }), {
      maxWidth: i >= 0 ? i : void 0,
      maxHeight: e >= 0 ? e : void 0,
      maxArea: n >= 0 ? n : void 0,
      supportsAnyRegionAndSize: t
    };
  } else if ("profile" in r && r.profile) {
    const t = ih(r.profile), e = fn(r.profile);
    return t ? {
      supportsAnyRegionAndSize: t >= 1
    } : e ? {
      supportsAnyRegionAndSize: e >= 1
    } : {
      supportsAnyRegionAndSize: !1
    };
  } else
    throw new Error("Invalid Image");
}
const oh = "image";
class ah {
  constructor(t, e) {
    if (this.embedded = !0, this.type = oh, e) {
      const i = t;
      let n, s;
      if (Array.isArray(i.service) ? i.service.forEach((o) => {
        try {
          const a = sh(o);
          (!s || a > s) && (s = a, n = o);
        } catch {
        }
      }) : n = i.service, !n)
        throw new Error("Unsupported IIIF Image Service");
      if ("@id" in n)
        this.uri = n["@id"];
      else if ("id" in n)
        this.uri = n.id;
      else
        throw new Error("Unsupported IIIF Image Service");
      if ("type" in n && n.type === "ImageService3")
        this.majorVersion = 3;
      else if ("type" in n && n.type === "ImageService2" || "@type" in n && n["@type"] === "ImageService2" || "@context" in n && n["@context"] === jr)
        this.majorVersion = 2;
      else if ("@context" in n && (n["@context"] === Nr || n["@context"] === ts))
        this.majorVersion = 1;
      else if ("profile" in n) {
        let o;
        Array.isArray(n.profile) ? o = n.profile[0] : o = n.profile, o.match(Zr) ? this.majorVersion = 1 : o.match($r) ? this.majorVersion = 2 : this.majorVersion = 3;
      } else
        throw new Error("Unsupported IIIF Image Service");
      if ("profile" in n) {
        const o = Ei(n);
        this.supportsAnyRegionAndSize = o.supportsAnyRegionAndSize, this.maxWidth = o.maxWidth, this.maxHeight = o.maxHeight, this.maxArea = o.maxArea;
      } else
        this.supportsAnyRegionAndSize = !1;
    } else {
      if ("@id" in t)
        this.uri = t["@id"];
      else if ("id" in t)
        this.uri = t.id;
      else
        throw new Error("Unsupported IIIF Image");
      if ("type" in t && t.type === "ImageService3")
        this.majorVersion = 3;
      else if ("@type" in t && t["@type"] === "iiif:Image" || "@context" in t && t["@context"] === jr)
        this.majorVersion = 2;
      else if ("@context" in t && t["@context"] === Nr)
        this.majorVersion = 1;
      else
        throw new Error("Unsupported IIIF Image");
      if ("profile" in t) {
        const i = Ei(t);
        this.supportsAnyRegionAndSize = i.supportsAnyRegionAndSize, this.maxWidth = i.maxWidth, this.maxHeight = i.maxHeight, this.maxArea = i.maxArea;
      } else
        this.supportsAnyRegionAndSize = !1;
    }
    if (t.width !== void 0)
      this.width = t.width;
    else if (e)
      this.width = e.width;
    else
      throw new Error("Width not present on either Canvas or Image Resource");
    if (t.height !== void 0)
      this.height = t.height;
    else if (e)
      this.height = e.height;
    else
      throw new Error("Height not present on either Canvas or Image Resource");
  }
  /**
   * Generates a IIIF Image API URL for the requested region and size
   * @param {ImageRequest} imageRequest - Image request object containing the desired region and size of the requested image
   * @returns {string} Image API URL that can be used to fetch the requested image
   */
  getImageUrl(t) {
    const { region: e, size: i } = t;
    let n, s, o, a, h;
    e ? (h = `${e.x},${e.y},${e.width},${e.height}`, o = e.height, a = e.width) : (h = "full", o = this.height, a = this.width);
    let c;
    if (i) {
      n = Math.round(i.width), s = Math.round(i.height);
      const g = String(n);
      let w = String(s);
      const y = a / o, I = s * y / y;
      s === Math.round(I) && (w = ""), c = `${g},${w}`;
    } else
      n = this.width, s = this.height, c = this.majorVersion === 2 ? "full" : "max";
    const l = n * s;
    if (this.maxWidth !== void 0 && n > this.maxWidth)
      throw new Error(`Width of requested image is too large: ${n} > ${this.maxWidth}`);
    if (this.maxHeight !== void 0 && s > this.maxHeight)
      throw new Error(`Height of requested image is too large: ${s} > ${this.maxHeight}`);
    if (this.maxArea !== void 0 && l > this.maxArea)
      throw new Error(`Area of requested image is too large: ${l} > ${this.maxArea}`);
    const u = this.majorVersion === 1 ? "native" : "default";
    return `${this.uri}/${h}/${c}/0/${u}.jpg`;
  }
  getThumbnail(t, e = "cover") {
    return ys({ width: this.width, height: this.height }, t, e, {
      supportsAnyRegionAndSize: this.supportsAnyRegionAndSize,
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight,
      maxArea: this.maxArea
    });
  }
}
let hh = class vs extends ah {
  constructor(t) {
    super(t), this.embedded = !1;
    const e = Ei(t);
    let i;
    "tiles" in t && (i = t.tiles), this.tileZoomLevels = Qa({ width: this.width, height: this.height }, i, e.supportsAnyRegionAndSize), "sizes" in t && (this.sizes = t.sizes);
  }
  /**
   * Parses a IIIF image and returns a [Image](#image) containing the parsed version
   * @param {any} iiifImage - Source data of IIIF Image
   * @param {MajorVersion} [majorVersion=null] - IIIF API version of Image. If not provided, it will be determined automatically
   * @returns {Image} Parsed IIIF Image
   * @static
   */
  static parse(t, e = null) {
    let i;
    return e === 1 ? i = rs.parse(t) : e === 2 ? i = ji.parse(t) : e === 3 ? i = Bi.parse(t) : i = gs.parse(t), new vs(i);
  }
  /**
   * Returns a Image request object for a tile with the requested zoom level, column, and row
   * @param {TileZoomLevel} zoomLevel - Desired zoom level of the requested tile
   * @param {number} column - Column of the requested tile
   * @param {number} row - Row of the requested tile
   * @returns {ImageRequest} Image request object that can be used to fetch the requested tile
   */
  getIiifTile(t, e, i) {
    return ms({ width: this.width, height: this.height }, t, e, i);
  }
  /**
   * Returns a Image request object for the requested region and size
   * @param {SizeObject} size - Size of the requested thumbnail
   * @param {'cover' | 'contain'} mode - Desired fit mode of the requested thumbnail
   * @returns {ImageRequest} Image request object that can be used to fetch the requested thumbnail
   */
  getThumbnail(t, e = "cover") {
    return ys({ width: this.width, height: this.height }, t, e, {
      supportsAnyRegionAndSize: this.supportsAnyRegionAndSize,
      sizes: this.sizes,
      tileZoomLevels: this.tileZoomLevels,
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight,
      maxArea: this.maxArea
    });
  }
};
const pn = m.record(m.string(), m.string().array());
m.object({
  label: pn.optional(),
  value: pn.optional()
});
async function xs(r, t = {}) {
  let e;
  if (t.cache && (e = await t.cache.match(r)), e || (e = await fetch(r, {
    signal: t.abortSignal
  }), t.cache && t.cache.put(r, e.clone())), !e.ok)
    throw new Error(e.statusText);
  return e;
}
async function ch(r, t = {}) {
  return await (await xs(r, t)).json();
}
async function lh(r, t = {}) {
  return await ch(`${r}/info.json`, t);
}
function uh(r, t) {
  return new Promise((e, i) => {
    const n = new Image();
    let s = !1;
    n.addEventListener("load", () => e(n)), n.addEventListener("error", async () => {
      if (s)
        i(new DOMException("Loading image aborted by user", "AbortError"));
      else
        try {
          throw await xs(r, { abortSignal: t }), new Error("Image failed to load by setting Image src but downloaded successfully using fetch");
        } catch (o) {
          i(o);
        }
    }), n.crossOrigin = "anonymous", n.src = r, t && t.addEventListener("abort", () => {
      s = !0, n.src = "";
    });
  });
}
function Ts(r, t = !1) {
  switch (r.type) {
    case "Polygon":
      return r.coordinates ? {
        ...r,
        coordinates: gn(r.coordinates, t)
      } : r;
    case "MultiPolygon":
      return r.coordinates ? {
        ...r,
        coordinates: r.coordinates.map((e) => gn(e, t))
      } : r;
    case "GeometryCollection":
      return {
        ...r,
        geometries: r.geometries.map((e) => Ts(e, t))
      };
    default:
      return r;
  }
}
function gn(r, t) {
  if (r.length === 0)
    return r;
  const e = [];
  for (let i = 0; i < r.length; i++)
    e.push(dh(r[i], i === 0 ? t : !t));
  return e;
}
function dh(r, t) {
  let e = 0, i = 0;
  for (let n = 0, s = r.length, o = s - 1; n < s; o = n++) {
    const a = (r[n][0] - r[o][0]) * (r[o][1] + r[n][1]), h = e + a;
    i += Math.abs(e) >= Math.abs(a) ? e - h + a : a - h + e, e = h;
  }
  return e + i >= 0 != !!t ? r.slice().reverse() : r;
}
function gt(r) {
  return Array.isArray(r) && r.length === 2 && typeof r[0] == "number" && typeof r[1] == "number";
}
function Et(r) {
  return Array.isArray(r) && r.every(gt);
}
function fh(r) {
  return Array.isArray(r) && r.every(gt);
}
function It(r) {
  return Array.isArray(r) && r.every(fh);
}
function jt(r) {
  return Array.isArray(r) && r.every(gt);
}
function Bt(r) {
  return Array.isArray(r) && r.every(Et);
}
function Dt(r) {
  return Array.isArray(r) && r.every(It);
}
function qr(r) {
  if (r = r.filter(function(t, e, i) {
    return e === 0 || !Gi(t, i[e - 1]);
  }), r.length < 2)
    throw new Error("LineString should contain at least 2 points");
  return r;
}
function Di(r) {
  if (r = r.filter(function(t, e, i) {
    return e === 0 || !Gi(t, i[e - 1]);
  }), mh(r) && r.splice(-1), r.length < 3)
    throw new Error("Ring should contain at least 3 points");
  return r;
}
function bs(r) {
  return r.map((t) => Di(t));
}
function ph(r) {
  return r.map((t) => qr(t));
}
function gh(r) {
  return r.map((t) => bs(t));
}
function Je(r) {
  return {
    type: "Point",
    coordinates: r
  };
}
function Ke(r) {
  return {
    type: "LineString",
    coordinates: r
  };
}
function Qe(r, t = !0) {
  const e = {
    type: "Polygon",
    coordinates: t ? r.map((i) => [...i, i[0]]) : r
  };
  return Ts(e);
}
function mh(r) {
  return Array.isArray(r) && r.length >= 2 && Gi(r[0], r[r.length - 1]);
}
function Gi(r, t) {
  return r === t ? !0 : r == null || t == null ? !1 : r[0] == t[0] && r[1] == t[1];
}
function yh(r) {
  return [r[0], -r[1]];
}
function Br(r, t) {
  return [
    (t[0] - r[0]) / 2 + r[0],
    (t[1] - r[1]) / 2 + r[1]
  ];
}
function wh(r, t, e) {
  return [
    r[0] * e + t[0] * (1 - e),
    r[1] * e + t[1] * (1 - e)
  ];
}
function vt(r, t) {
  if (Et(r) && r.length == 2)
    return vt(r[0], r[1]);
  if (gt(r) && gt(t))
    return Math.sqrt((t[0] - r[0]) ** 2 + (t[1] - r[1]) ** 2);
  throw new Error("Input type not supported");
}
function vh(r) {
  return r * (Math.PI / 180);
}
function Gt(r) {
  return typeof r == "object" && r !== null && r.type === "Point" && gt(r.coordinates);
}
function Ft(r) {
  return typeof r == "object" && r !== null && r.type === "LineString" && Et(r.coordinates);
}
function Ut(r) {
  return typeof r == "object" && r !== null && r.type === "Polygon" && Array.isArray(r.coordinates) && It(r.coordinates);
}
function Wt(r) {
  return typeof r == "object" && r !== null && r.type === "MultiPoint" && jt(r.coordinates);
}
function Vt(r) {
  return typeof r == "object" && r !== null && r.type === "MultiLineString" && Bt(r.coordinates);
}
function zt(r) {
  return typeof r == "object" && r !== null && r.type === "MultiPolygon" && Array.isArray(r.coordinates) && Dt(r.coordinates);
}
function xh(r) {
  const t = typeof r == "object" && r !== null, i = t && "type" in r && typeof r.type == "string" && (r.type === "Point" || r.type === "LineString" || r.type === "Polygon" || r.type === "MultiPoint" || r.type === "MultiLineString" || r.type === "MultiPolygon"), n = t && "coordinates" in r && Array.isArray(r.coordinates);
  return i && n;
}
function Ee(r) {
  return r.coordinates;
}
function Ie(r) {
  return qr(r.coordinates);
}
function Se(r, t = !1) {
  let e = r.coordinates;
  return e = bs(e), t ? e.map((i) => [...i, i[0]]) : e;
}
function Th(r) {
  return r.coordinates;
}
function bh(r) {
  return ph(r.coordinates);
}
function Mh(r, t = !1) {
  let e = r.coordinates;
  return e = gh(e), t ? e.map((i) => i.map((n) => [...n, n[0]])) : e;
}
function _h(r) {
  if (Gt(r))
    return Ee(r);
  if (Ft(r))
    return Ie(r);
  if (Ut(r))
    return Se(r);
  if (Wt(r))
    return Th(r);
  if (Vt(r))
    return bh(r);
  if (zt(r))
    return Mh(r);
  throw new Error("Geometry type not supported");
}
function tr(r) {
  return r.coordinates.map((t) => ({
    type: "Point",
    coordinates: t
  }));
}
function er(r) {
  return r.coordinates.map((t) => ({
    type: "LineString",
    coordinates: t
  }));
}
function rr(r) {
  return r.coordinates.map((t) => ({
    type: "Polygon",
    coordinates: t
  }));
}
function ir(r) {
  return {
    type: "MultiPoint",
    coordinates: r.map((t) => t.coordinates)
  };
}
function nr(r) {
  return {
    type: "MultiLineString",
    coordinates: r.map((t) => t.coordinates)
  };
}
function sr(r) {
  return {
    type: "MultiPolygon",
    coordinates: r.map((t) => t.coordinates)
  };
}
function mn(r) {
  let t = Number.POSITIVE_INFINITY, e = Number.NEGATIVE_INFINITY;
  for (const i of r)
    t === void 0 ? i >= i && (t = e = i) : (t > i && (t = i), e < i && (e = i));
  return [t, e];
}
function lt(r) {
  if (gt(r) && (r = [r]), It(r) && (r = r.flat()), xh(r))
    return lt(_h(r));
  const t = [], e = [];
  for (const a of r)
    t.push(a[0]), e.push(a[1]);
  const [i, n] = mn(t), [s, o] = mn(e);
  return [i, s, n, o];
}
function yn(r, t) {
  return [
    Math.min(r[0], t[0]),
    Math.min(r[1], t[1]),
    Math.max(r[2], t[2]),
    Math.max(r[3], t[3])
  ];
}
function Eh(r, t) {
  const e = r[2] >= t[0] && t[2] >= r[0], i = r[3] >= t[1] && t[3] >= r[1];
  return e && i;
}
function Ve(r) {
  return [
    [r[0], r[1]],
    [r[2], r[1]],
    [r[2], r[3]],
    [r[0], r[3]]
  ];
}
function Ih(r) {
  return [Ve(r)];
}
function Ms(r) {
  return [
    [r[0], r[1]],
    [r[2], r[3]]
  ];
}
function Sh(r) {
  return vt(Ms(r));
}
function Ah(r) {
  return vt(Ms(lt(r)));
}
function Ii(r) {
  return [(r[0] + r[2]) / 2, (r[1] + r[3]) / 2];
}
function Ph(r) {
  return [r[2] - r[0], r[3] - r[1]];
}
function Si(r) {
  return [
    0.5 * (vt(r[0], r[1]) + vt(r[2], r[3])),
    0.5 * (vt(r[1], r[2]) + vt(r[3], r[0]))
  ];
}
function _s(r, t) {
  return Math.sqrt(r[0] * r[1] / (t[0] * t[1]));
}
function wn(r, t) {
  return _s(Si(r), Si(t));
}
function Ch(r) {
  const t = parseInt(r.replace(/^#/, ""), 16), e = t >> 16 & 255, i = t >> 8 & 255, n = t & 255;
  return [e, i, n];
}
function or(r) {
  return Ch(r).map((t) => t / 255);
}
function Rh(r, t) {
  return !r || !t || r.size !== t.size ? !1 : [...r].every((e) => t.has(e));
}
function vn(r, t) {
  if (r !== void 0 && t !== void 0)
    return Math.max(r, t);
  if (r !== void 0)
    return r;
  if (t !== void 0)
    return t;
}
function kh(r) {
  let t;
  try {
    t = new URL(r);
  } catch {
    return !1;
  }
  return t.protocol === "http:" || t.protocol === "https:";
}
function Oh([r, t]) {
  const i = 6378137 * vh(r), n = i / r, s = 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + t * (Math.PI / 180) / 2)) * n;
  return [i, s];
}
function xn([r, t]) {
  const i = Math.PI * 6378137, n = r / i * 180;
  let s = t / i * 180;
  return s = 180 / Math.PI * (2 * Math.atan(Math.exp(s * Math.PI / 180)) - Math.PI / 2), [n, s];
}
var yt = 63710088e-1, Es = {
  centimeters: yt * 100,
  centimetres: yt * 100,
  degrees: yt / 111325,
  feet: yt * 3.28084,
  inches: yt * 39.37,
  kilometers: yt / 1e3,
  kilometres: yt / 1e3,
  meters: yt,
  metres: yt,
  miles: yt / 1609.344,
  millimeters: yt * 1e3,
  millimetres: yt * 1e3,
  nauticalmiles: yt / 1852,
  radians: 1,
  yards: yt * 1.0936
};
function Nh(r, t, e) {
  e === void 0 && (e = {});
  var i = { type: "Feature" };
  return (e.id === 0 || e.id) && (i.id = e.id), e.bbox && (i.bbox = e.bbox), i.properties = t || {}, i.geometry = r, i;
}
function Lh(r, t, e) {
  if (e === void 0 && (e = {}), !r)
    throw new Error("coordinates is required");
  if (!Array.isArray(r))
    throw new Error("coordinates must be an Array");
  if (r.length < 2)
    throw new Error("coordinates must be at least 2 numbers long");
  if (!Tn(r[0]) || !Tn(r[1]))
    throw new Error("coordinates must contain numbers");
  var i = {
    type: "Point",
    coordinates: r
  };
  return Nh(i, t, e);
}
function jh(r, t) {
  t === void 0 && (t = "kilometers");
  var e = Es[t];
  if (!e)
    throw new Error(t + " units is invalid");
  return r * e;
}
function Bh(r, t) {
  t === void 0 && (t = "kilometers");
  var e = Es[t];
  if (!e)
    throw new Error(t + " units is invalid");
  return r / e;
}
function Ai(r) {
  var t = r % (2 * Math.PI);
  return t * 180 / Math.PI;
}
function At(r) {
  var t = r % 360;
  return t * Math.PI / 180;
}
function Tn(r) {
  return !isNaN(r) && r !== null && !Array.isArray(r);
}
function we(r) {
  if (!r)
    throw new Error("coord is required");
  if (!Array.isArray(r)) {
    if (r.type === "Feature" && r.geometry !== null && r.geometry.type === "Point")
      return r.geometry.coordinates;
    if (r.type === "Point")
      return r.coordinates;
  }
  if (Array.isArray(r) && r.length >= 2 && !Array.isArray(r[0]) && !Array.isArray(r[1]))
    return r;
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function Dh(r) {
  return r.type === "Feature" ? r.geometry : r;
}
function Is(r, t, e) {
  if (e === void 0 && (e = {}), e.final === !0)
    return Gh(r, t);
  var i = we(r), n = we(t), s = At(i[0]), o = At(n[0]), a = At(i[1]), h = At(n[1]), c = Math.sin(o - s) * Math.cos(h), l = Math.cos(a) * Math.sin(h) - Math.sin(a) * Math.cos(h) * Math.cos(o - s);
  return Ai(Math.atan2(c, l));
}
function Gh(r, t) {
  var e = Is(t, r);
  return e = (e + 180) % 360, e;
}
function Fh(r, t, e, i) {
  i === void 0 && (i = {});
  var n = we(r), s = At(n[0]), o = At(n[1]), a = At(e), h = Bh(t, i.units), c = Math.asin(Math.sin(o) * Math.cos(h) + Math.cos(o) * Math.sin(h) * Math.cos(a)), l = s + Math.atan2(Math.sin(a) * Math.sin(h) * Math.cos(o), Math.cos(h) - Math.sin(o) * Math.sin(c)), u = Ai(l), g = Ai(c);
  return Lh([u, g], i.properties);
}
function Fi(r, t, e) {
  e === void 0 && (e = {});
  var i = we(r), n = we(t), s = At(n[1] - i[1]), o = At(n[0] - i[0]), a = At(i[1]), h = At(n[1]), c = Math.pow(Math.sin(s / 2), 2) + Math.pow(Math.sin(o / 2), 2) * Math.cos(a) * Math.cos(h);
  return jh(2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c)), e.units);
}
function Dr(r, t) {
  var e = Fi(r, t), i = Is(r, t), n = Fh(r, e / 2, i);
  return n;
}
var Uh = Object.defineProperty, Wh = (r, t, e) => t in r ? Uh(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e, Vh = (r, t, e) => (Wh(r, typeof t != "symbol" ? t + "" : t, e), e), Ui = (r, t, e) => {
  if (!t.has(r))
    throw TypeError("Cannot " + e);
}, kt = (r, t, e) => (Ui(r, t, "read from private field"), e ? e.call(r) : t.get(r)), Ss = (r, t, e) => {
  if (t.has(r))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(r) : t.set(r, e);
}, ai = (r, t, e, i) => (Ui(r, t, "write to private field"), i ? i.call(r, e) : t.set(r, e), e), bn = (r, t, e) => (Ui(r, t, "access private method"), e);
function As(r) {
  if (r.__esModule)
    return r;
  var t = r.default;
  if (typeof t == "function") {
    var e = function i() {
      return this instanceof i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else
    e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(r).forEach(function(i) {
    var n = Object.getOwnPropertyDescriptor(r, i);
    Object.defineProperty(e, i, n.get ? n : {
      enumerable: !0,
      get: function() {
        return r[i];
      }
    });
  }), e;
}
var X = {};
const zh = Object.prototype.toString;
function ze(r) {
  const t = zh.call(r);
  return t.endsWith("Array]") && !t.includes("Big");
}
const Zh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isAnyArray: ze
}, Symbol.toStringTag, { value: "Module" })), $h = /* @__PURE__ */ As(Zh);
function qh(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ze(r))
    throw new TypeError("input must be an array");
  if (r.length === 0)
    throw new TypeError("input must not be empty");
  var e = t.fromIndex, i = e === void 0 ? 0 : e, n = t.toIndex, s = n === void 0 ? r.length : n;
  if (i < 0 || i >= r.length || !Number.isInteger(i))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (s <= i || s > r.length || !Number.isInteger(s))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var o = r[i], a = i + 1; a < s; a++)
    r[a] > o && (o = r[a]);
  return o;
}
function Xh(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!ze(r))
    throw new TypeError("input must be an array");
  if (r.length === 0)
    throw new TypeError("input must not be empty");
  var e = t.fromIndex, i = e === void 0 ? 0 : e, n = t.toIndex, s = n === void 0 ? r.length : n;
  if (i < 0 || i >= r.length || !Number.isInteger(i))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (s <= i || s > r.length || !Number.isInteger(s))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var o = r[i], a = i + 1; a < s; a++)
    r[a] < o && (o = r[a]);
  return o;
}
function Hh(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (ze(r)) {
    if (r.length === 0)
      throw new TypeError("input must not be empty");
  } else
    throw new TypeError("input must be an array");
  var e;
  if (t.output !== void 0) {
    if (!ze(t.output))
      throw new TypeError("output option must be an array if specified");
    e = t.output;
  } else
    e = new Array(r.length);
  var i = Xh(r), n = qh(r);
  if (i === n)
    throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var s = t.min, o = s === void 0 ? t.autoMinMax ? i : 0 : s, a = t.max, h = a === void 0 ? t.autoMinMax ? n : 1 : a;
  if (o >= h)
    throw new RangeError("min option must be smaller than max option");
  for (var c = (h - o) / (n - i), l = 0; l < r.length; l++)
    e[l] = (r[l] - i) * c + o;
  return e;
}
const Yh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hh
}, Symbol.toStringTag, { value: "Module" })), Jh = /* @__PURE__ */ As(Yh);
Object.defineProperty(X, "__esModule", { value: !0 });
var wt = $h, Mn = Jh;
const ar = " ".repeat(2), Ps = " ".repeat(4);
function Kh() {
  return Cs(this);
}
function Cs(r, t = {}) {
  const {
    maxRows: e = 15,
    maxColumns: i = 10,
    maxNumSize: n = 8,
    padMinus: s = "auto"
  } = t;
  return `${r.constructor.name} {
${ar}[
${Ps}${Qh(r, e, i, n, s)}
${ar}]
${ar}rows: ${r.rows}
${ar}columns: ${r.columns}
}`;
}
function Qh(r, t, e, i, n) {
  const { rows: s, columns: o } = r, a = Math.min(s, t), h = Math.min(o, e), c = [];
  if (n === "auto") {
    n = !1;
    t:
      for (let l = 0; l < a; l++)
        for (let u = 0; u < h; u++)
          if (r.get(l, u) < 0) {
            n = !0;
            break t;
          }
  }
  for (let l = 0; l < a; l++) {
    let u = [];
    for (let g = 0; g < h; g++)
      u.push(tc(r.get(l, g), i, n));
    c.push(`${u.join(" ")}`);
  }
  return h !== o && (c[c.length - 1] += ` ... ${o - e} more columns`), a !== s && c.push(`... ${s - t} more rows`), c.join(`
${Ps}`);
}
function tc(r, t, e) {
  return (r >= 0 && e ? ` ${_n(r, t - 1)}` : _n(r, t)).padEnd(t);
}
function _n(r, t) {
  let e = r.toString();
  if (e.length <= t)
    return e;
  let i = r.toFixed(t);
  if (i.length > t && (i = r.toFixed(Math.max(0, t - (i.length - t)))), i.length <= t && !i.startsWith("0.000") && !i.startsWith("-0.000"))
    return i;
  let n = r.toExponential(t);
  return n.length > t && (n = r.toExponential(Math.max(0, t - (n.length - t)))), n.slice(0);
}
function ec(r, t) {
  r.prototype.add = function(e) {
    return typeof e == "number" ? this.addS(e) : this.addM(e);
  }, r.prototype.addS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) + e);
    return this;
  }, r.prototype.addM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) + e.get(i, n));
    return this;
  }, r.add = function(e, i) {
    return new t(e).add(i);
  }, r.prototype.sub = function(e) {
    return typeof e == "number" ? this.subS(e) : this.subM(e);
  }, r.prototype.subS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) - e);
    return this;
  }, r.prototype.subM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) - e.get(i, n));
    return this;
  }, r.sub = function(e, i) {
    return new t(e).sub(i);
  }, r.prototype.subtract = r.prototype.sub, r.prototype.subtractS = r.prototype.subS, r.prototype.subtractM = r.prototype.subM, r.subtract = r.sub, r.prototype.mul = function(e) {
    return typeof e == "number" ? this.mulS(e) : this.mulM(e);
  }, r.prototype.mulS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) * e);
    return this;
  }, r.prototype.mulM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) * e.get(i, n));
    return this;
  }, r.mul = function(e, i) {
    return new t(e).mul(i);
  }, r.prototype.multiply = r.prototype.mul, r.prototype.multiplyS = r.prototype.mulS, r.prototype.multiplyM = r.prototype.mulM, r.multiply = r.mul, r.prototype.div = function(e) {
    return typeof e == "number" ? this.divS(e) : this.divM(e);
  }, r.prototype.divS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) / e);
    return this;
  }, r.prototype.divM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) / e.get(i, n));
    return this;
  }, r.div = function(e, i) {
    return new t(e).div(i);
  }, r.prototype.divide = r.prototype.div, r.prototype.divideS = r.prototype.divS, r.prototype.divideM = r.prototype.divM, r.divide = r.div, r.prototype.mod = function(e) {
    return typeof e == "number" ? this.modS(e) : this.modM(e);
  }, r.prototype.modS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) % e);
    return this;
  }, r.prototype.modM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) % e.get(i, n));
    return this;
  }, r.mod = function(e, i) {
    return new t(e).mod(i);
  }, r.prototype.modulus = r.prototype.mod, r.prototype.modulusS = r.prototype.modS, r.prototype.modulusM = r.prototype.modM, r.modulus = r.mod, r.prototype.and = function(e) {
    return typeof e == "number" ? this.andS(e) : this.andM(e);
  }, r.prototype.andS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) & e);
    return this;
  }, r.prototype.andM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) & e.get(i, n));
    return this;
  }, r.and = function(e, i) {
    return new t(e).and(i);
  }, r.prototype.or = function(e) {
    return typeof e == "number" ? this.orS(e) : this.orM(e);
  }, r.prototype.orS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) | e);
    return this;
  }, r.prototype.orM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) | e.get(i, n));
    return this;
  }, r.or = function(e, i) {
    return new t(e).or(i);
  }, r.prototype.xor = function(e) {
    return typeof e == "number" ? this.xorS(e) : this.xorM(e);
  }, r.prototype.xorS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) ^ e);
    return this;
  }, r.prototype.xorM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) ^ e.get(i, n));
    return this;
  }, r.xor = function(e, i) {
    return new t(e).xor(i);
  }, r.prototype.leftShift = function(e) {
    return typeof e == "number" ? this.leftShiftS(e) : this.leftShiftM(e);
  }, r.prototype.leftShiftS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) << e);
    return this;
  }, r.prototype.leftShiftM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) << e.get(i, n));
    return this;
  }, r.leftShift = function(e, i) {
    return new t(e).leftShift(i);
  }, r.prototype.signPropagatingRightShift = function(e) {
    return typeof e == "number" ? this.signPropagatingRightShiftS(e) : this.signPropagatingRightShiftM(e);
  }, r.prototype.signPropagatingRightShiftS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) >> e);
    return this;
  }, r.prototype.signPropagatingRightShiftM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) >> e.get(i, n));
    return this;
  }, r.signPropagatingRightShift = function(e, i) {
    return new t(e).signPropagatingRightShift(i);
  }, r.prototype.rightShift = function(e) {
    return typeof e == "number" ? this.rightShiftS(e) : this.rightShiftM(e);
  }, r.prototype.rightShiftS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) >>> e);
    return this;
  }, r.prototype.rightShiftM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, this.get(i, n) >>> e.get(i, n));
    return this;
  }, r.rightShift = function(e, i) {
    return new t(e).rightShift(i);
  }, r.prototype.zeroFillRightShift = r.prototype.rightShift, r.prototype.zeroFillRightShiftS = r.prototype.rightShiftS, r.prototype.zeroFillRightShiftM = r.prototype.rightShiftM, r.zeroFillRightShift = r.rightShift, r.prototype.not = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, ~this.get(e, i));
    return this;
  }, r.not = function(e) {
    return new t(e).not();
  }, r.prototype.abs = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.abs(this.get(e, i)));
    return this;
  }, r.abs = function(e) {
    return new t(e).abs();
  }, r.prototype.acos = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.acos(this.get(e, i)));
    return this;
  }, r.acos = function(e) {
    return new t(e).acos();
  }, r.prototype.acosh = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.acosh(this.get(e, i)));
    return this;
  }, r.acosh = function(e) {
    return new t(e).acosh();
  }, r.prototype.asin = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.asin(this.get(e, i)));
    return this;
  }, r.asin = function(e) {
    return new t(e).asin();
  }, r.prototype.asinh = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.asinh(this.get(e, i)));
    return this;
  }, r.asinh = function(e) {
    return new t(e).asinh();
  }, r.prototype.atan = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.atan(this.get(e, i)));
    return this;
  }, r.atan = function(e) {
    return new t(e).atan();
  }, r.prototype.atanh = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.atanh(this.get(e, i)));
    return this;
  }, r.atanh = function(e) {
    return new t(e).atanh();
  }, r.prototype.cbrt = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.cbrt(this.get(e, i)));
    return this;
  }, r.cbrt = function(e) {
    return new t(e).cbrt();
  }, r.prototype.ceil = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.ceil(this.get(e, i)));
    return this;
  }, r.ceil = function(e) {
    return new t(e).ceil();
  }, r.prototype.clz32 = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.clz32(this.get(e, i)));
    return this;
  }, r.clz32 = function(e) {
    return new t(e).clz32();
  }, r.prototype.cos = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.cos(this.get(e, i)));
    return this;
  }, r.cos = function(e) {
    return new t(e).cos();
  }, r.prototype.cosh = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.cosh(this.get(e, i)));
    return this;
  }, r.cosh = function(e) {
    return new t(e).cosh();
  }, r.prototype.exp = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.exp(this.get(e, i)));
    return this;
  }, r.exp = function(e) {
    return new t(e).exp();
  }, r.prototype.expm1 = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.expm1(this.get(e, i)));
    return this;
  }, r.expm1 = function(e) {
    return new t(e).expm1();
  }, r.prototype.floor = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.floor(this.get(e, i)));
    return this;
  }, r.floor = function(e) {
    return new t(e).floor();
  }, r.prototype.fround = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.fround(this.get(e, i)));
    return this;
  }, r.fround = function(e) {
    return new t(e).fround();
  }, r.prototype.log = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.log(this.get(e, i)));
    return this;
  }, r.log = function(e) {
    return new t(e).log();
  }, r.prototype.log1p = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.log1p(this.get(e, i)));
    return this;
  }, r.log1p = function(e) {
    return new t(e).log1p();
  }, r.prototype.log10 = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.log10(this.get(e, i)));
    return this;
  }, r.log10 = function(e) {
    return new t(e).log10();
  }, r.prototype.log2 = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.log2(this.get(e, i)));
    return this;
  }, r.log2 = function(e) {
    return new t(e).log2();
  }, r.prototype.round = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.round(this.get(e, i)));
    return this;
  }, r.round = function(e) {
    return new t(e).round();
  }, r.prototype.sign = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.sign(this.get(e, i)));
    return this;
  }, r.sign = function(e) {
    return new t(e).sign();
  }, r.prototype.sin = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.sin(this.get(e, i)));
    return this;
  }, r.sin = function(e) {
    return new t(e).sin();
  }, r.prototype.sinh = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.sinh(this.get(e, i)));
    return this;
  }, r.sinh = function(e) {
    return new t(e).sinh();
  }, r.prototype.sqrt = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.sqrt(this.get(e, i)));
    return this;
  }, r.sqrt = function(e) {
    return new t(e).sqrt();
  }, r.prototype.tan = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.tan(this.get(e, i)));
    return this;
  }, r.tan = function(e) {
    return new t(e).tan();
  }, r.prototype.tanh = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.tanh(this.get(e, i)));
    return this;
  }, r.tanh = function(e) {
    return new t(e).tanh();
  }, r.prototype.trunc = function() {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, Math.trunc(this.get(e, i)));
    return this;
  }, r.trunc = function(e) {
    return new t(e).trunc();
  }, r.pow = function(e, i) {
    return new t(e).pow(i);
  }, r.prototype.pow = function(e) {
    return typeof e == "number" ? this.powS(e) : this.powM(e);
  }, r.prototype.powS = function(e) {
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, Math.pow(this.get(i, n), e));
    return this;
  }, r.prototype.powM = function(e) {
    if (e = t.checkMatrix(e), this.rows !== e.rows || this.columns !== e.columns)
      throw new RangeError("Matrices dimensions must be equal");
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.set(i, n, Math.pow(this.get(i, n), e.get(i, n)));
    return this;
  };
}
function bt(r, t, e) {
  let i = e ? r.rows : r.rows - 1;
  if (t < 0 || t > i)
    throw new RangeError("Row index out of range");
}
function Mt(r, t, e) {
  let i = e ? r.columns : r.columns - 1;
  if (t < 0 || t > i)
    throw new RangeError("Column index out of range");
}
function ue(r, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== r.columns)
    throw new RangeError(
      "vector size must be the same as the number of columns"
    );
  return t;
}
function de(r, t) {
  if (t.to1DArray && (t = t.to1DArray()), t.length !== r.rows)
    throw new RangeError("vector size must be the same as the number of rows");
  return t;
}
function Wi(r, t) {
  if (!wt.isAnyArray(t))
    throw new TypeError("row indices must be an array");
  for (let e = 0; e < t.length; e++)
    if (t[e] < 0 || t[e] >= r.rows)
      throw new RangeError("row indices are out of range");
}
function Vi(r, t) {
  if (!wt.isAnyArray(t))
    throw new TypeError("column indices must be an array");
  for (let e = 0; e < t.length; e++)
    if (t[e] < 0 || t[e] >= r.columns)
      throw new RangeError("column indices are out of range");
}
function Pi(r, t, e, i, n) {
  if (arguments.length !== 5)
    throw new RangeError("expected 4 arguments");
  if (hr("startRow", t), hr("endRow", e), hr("startColumn", i), hr("endColumn", n), t > e || i > n || t < 0 || t >= r.rows || e < 0 || e >= r.rows || i < 0 || i >= r.columns || n < 0 || n >= r.columns)
    throw new RangeError("Submatrix indices are out of range");
}
function Xr(r, t = 0) {
  let e = [];
  for (let i = 0; i < r; i++)
    e.push(t);
  return e;
}
function hr(r, t) {
  if (typeof t != "number")
    throw new TypeError(`${r} must be a number`);
}
function he(r) {
  if (r.isEmpty())
    throw new Error("Empty matrix has no elements to index");
}
function rc(r) {
  let t = Xr(r.rows);
  for (let e = 0; e < r.rows; ++e)
    for (let i = 0; i < r.columns; ++i)
      t[e] += r.get(e, i);
  return t;
}
function ic(r) {
  let t = Xr(r.columns);
  for (let e = 0; e < r.rows; ++e)
    for (let i = 0; i < r.columns; ++i)
      t[i] += r.get(e, i);
  return t;
}
function nc(r) {
  let t = 0;
  for (let e = 0; e < r.rows; e++)
    for (let i = 0; i < r.columns; i++)
      t += r.get(e, i);
  return t;
}
function sc(r) {
  let t = Xr(r.rows, 1);
  for (let e = 0; e < r.rows; ++e)
    for (let i = 0; i < r.columns; ++i)
      t[e] *= r.get(e, i);
  return t;
}
function oc(r) {
  let t = Xr(r.columns, 1);
  for (let e = 0; e < r.rows; ++e)
    for (let i = 0; i < r.columns; ++i)
      t[i] *= r.get(e, i);
  return t;
}
function ac(r) {
  let t = 1;
  for (let e = 0; e < r.rows; e++)
    for (let i = 0; i < r.columns; i++)
      t *= r.get(e, i);
  return t;
}
function hc(r, t, e) {
  const i = r.rows, n = r.columns, s = [];
  for (let o = 0; o < i; o++) {
    let a = 0, h = 0, c = 0;
    for (let l = 0; l < n; l++)
      c = r.get(o, l) - e[o], a += c, h += c * c;
    t ? s.push((h - a * a / n) / (n - 1)) : s.push((h - a * a / n) / n);
  }
  return s;
}
function cc(r, t, e) {
  const i = r.rows, n = r.columns, s = [];
  for (let o = 0; o < n; o++) {
    let a = 0, h = 0, c = 0;
    for (let l = 0; l < i; l++)
      c = r.get(l, o) - e[o], a += c, h += c * c;
    t ? s.push((h - a * a / i) / (i - 1)) : s.push((h - a * a / i) / i);
  }
  return s;
}
function lc(r, t, e) {
  const i = r.rows, n = r.columns, s = i * n;
  let o = 0, a = 0, h = 0;
  for (let c = 0; c < i; c++)
    for (let l = 0; l < n; l++)
      h = r.get(c, l) - e, o += h, a += h * h;
  return t ? (a - o * o / s) / (s - 1) : (a - o * o / s) / s;
}
function uc(r, t) {
  for (let e = 0; e < r.rows; e++)
    for (let i = 0; i < r.columns; i++)
      r.set(e, i, r.get(e, i) - t[e]);
}
function dc(r, t) {
  for (let e = 0; e < r.rows; e++)
    for (let i = 0; i < r.columns; i++)
      r.set(e, i, r.get(e, i) - t[i]);
}
function fc(r, t) {
  for (let e = 0; e < r.rows; e++)
    for (let i = 0; i < r.columns; i++)
      r.set(e, i, r.get(e, i) - t);
}
function pc(r) {
  const t = [];
  for (let e = 0; e < r.rows; e++) {
    let i = 0;
    for (let n = 0; n < r.columns; n++)
      i += Math.pow(r.get(e, n), 2) / (r.columns - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function gc(r, t) {
  for (let e = 0; e < r.rows; e++)
    for (let i = 0; i < r.columns; i++)
      r.set(e, i, r.get(e, i) / t[e]);
}
function mc(r) {
  const t = [];
  for (let e = 0; e < r.columns; e++) {
    let i = 0;
    for (let n = 0; n < r.rows; n++)
      i += Math.pow(r.get(n, e), 2) / (r.rows - 1);
    t.push(Math.sqrt(i));
  }
  return t;
}
function yc(r, t) {
  for (let e = 0; e < r.rows; e++)
    for (let i = 0; i < r.columns; i++)
      r.set(e, i, r.get(e, i) / t[i]);
}
function wc(r) {
  const t = r.size - 1;
  let e = 0;
  for (let i = 0; i < r.columns; i++)
    for (let n = 0; n < r.rows; n++)
      e += Math.pow(r.get(n, i), 2) / t;
  return Math.sqrt(e);
}
function vc(r, t) {
  for (let e = 0; e < r.rows; e++)
    for (let i = 0; i < r.columns; i++)
      r.set(e, i, r.get(e, i) / t);
}
class G {
  static from1DArray(t, e, i) {
    if (t * e !== i.length)
      throw new RangeError("data length does not match given dimensions");
    let n = new R(t, e);
    for (let s = 0; s < t; s++)
      for (let o = 0; o < e; o++)
        n.set(s, o, i[s * e + o]);
    return n;
  }
  static rowVector(t) {
    let e = new R(1, t.length);
    for (let i = 0; i < t.length; i++)
      e.set(0, i, t[i]);
    return e;
  }
  static columnVector(t) {
    let e = new R(t.length, 1);
    for (let i = 0; i < t.length; i++)
      e.set(i, 0, t[i]);
    return e;
  }
  static zeros(t, e) {
    return new R(t, e);
  }
  static ones(t, e) {
    return new R(t, e).fill(1);
  }
  static rand(t, e, i = {}) {
    if (typeof i != "object")
      throw new TypeError("options must be an object");
    const { random: n = Math.random } = i;
    let s = new R(t, e);
    for (let o = 0; o < t; o++)
      for (let a = 0; a < e; a++)
        s.set(o, a, n());
    return s;
  }
  static randInt(t, e, i = {}) {
    if (typeof i != "object")
      throw new TypeError("options must be an object");
    const { min: n = 0, max: s = 1e3, random: o = Math.random } = i;
    if (!Number.isInteger(n))
      throw new TypeError("min must be an integer");
    if (!Number.isInteger(s))
      throw new TypeError("max must be an integer");
    if (n >= s)
      throw new RangeError("min must be smaller than max");
    let a = s - n, h = new R(t, e);
    for (let c = 0; c < t; c++)
      for (let l = 0; l < e; l++) {
        let u = n + Math.round(o() * a);
        h.set(c, l, u);
      }
    return h;
  }
  static eye(t, e, i) {
    e === void 0 && (e = t), i === void 0 && (i = 1);
    let n = Math.min(t, e), s = this.zeros(t, e);
    for (let o = 0; o < n; o++)
      s.set(o, o, i);
    return s;
  }
  static diag(t, e, i) {
    let n = t.length;
    e === void 0 && (e = n), i === void 0 && (i = e);
    let s = Math.min(n, e, i), o = this.zeros(e, i);
    for (let a = 0; a < s; a++)
      o.set(a, a, t[a]);
    return o;
  }
  static min(t, e) {
    t = this.checkMatrix(t), e = this.checkMatrix(e);
    let i = t.rows, n = t.columns, s = new R(i, n);
    for (let o = 0; o < i; o++)
      for (let a = 0; a < n; a++)
        s.set(o, a, Math.min(t.get(o, a), e.get(o, a)));
    return s;
  }
  static max(t, e) {
    t = this.checkMatrix(t), e = this.checkMatrix(e);
    let i = t.rows, n = t.columns, s = new this(i, n);
    for (let o = 0; o < i; o++)
      for (let a = 0; a < n; a++)
        s.set(o, a, Math.max(t.get(o, a), e.get(o, a)));
    return s;
  }
  static checkMatrix(t) {
    return G.isMatrix(t) ? t : new R(t);
  }
  static isMatrix(t) {
    return t != null && t.klass === "Matrix";
  }
  get size() {
    return this.rows * this.columns;
  }
  apply(t) {
    if (typeof t != "function")
      throw new TypeError("callback must be a function");
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        t.call(this, e, i);
    return this;
  }
  to1DArray() {
    let t = [];
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        t.push(this.get(e, i));
    return t;
  }
  to2DArray() {
    let t = [];
    for (let e = 0; e < this.rows; e++) {
      t.push([]);
      for (let i = 0; i < this.columns; i++)
        t[e].push(this.get(e, i));
    }
    return t;
  }
  toJSON() {
    return this.to2DArray();
  }
  isRowVector() {
    return this.rows === 1;
  }
  isColumnVector() {
    return this.columns === 1;
  }
  isVector() {
    return this.rows === 1 || this.columns === 1;
  }
  isSquare() {
    return this.rows === this.columns;
  }
  isEmpty() {
    return this.rows === 0 || this.columns === 0;
  }
  isSymmetric() {
    if (this.isSquare()) {
      for (let t = 0; t < this.rows; t++)
        for (let e = 0; e <= t; e++)
          if (this.get(t, e) !== this.get(e, t))
            return !1;
      return !0;
    }
    return !1;
  }
  isDistance() {
    if (!this.isSymmetric())
      return !1;
    for (let t = 0; t < this.rows; t++)
      if (this.get(t, t) !== 0)
        return !1;
    return !0;
  }
  isEchelonForm() {
    let t = 0, e = 0, i = -1, n = !0, s = !1;
    for (; t < this.rows && n; ) {
      for (e = 0, s = !1; e < this.columns && s === !1; )
        this.get(t, e) === 0 ? e++ : this.get(t, e) === 1 && e > i ? (s = !0, i = e) : (n = !1, s = !0);
      t++;
    }
    return n;
  }
  isReducedEchelonForm() {
    let t = 0, e = 0, i = -1, n = !0, s = !1;
    for (; t < this.rows && n; ) {
      for (e = 0, s = !1; e < this.columns && s === !1; )
        this.get(t, e) === 0 ? e++ : this.get(t, e) === 1 && e > i ? (s = !0, i = e) : (n = !1, s = !0);
      for (let o = e + 1; o < this.rows; o++)
        this.get(t, o) !== 0 && (n = !1);
      t++;
    }
    return n;
  }
  echelonForm() {
    let t = this.clone(), e = 0, i = 0;
    for (; e < t.rows && i < t.columns; ) {
      let n = e;
      for (let s = e; s < t.rows; s++)
        t.get(s, i) > t.get(n, i) && (n = s);
      if (t.get(n, i) === 0)
        i++;
      else {
        t.swapRows(e, n);
        let s = t.get(e, i);
        for (let o = i; o < t.columns; o++)
          t.set(e, o, t.get(e, o) / s);
        for (let o = e + 1; o < t.rows; o++) {
          let a = t.get(o, i) / t.get(e, i);
          t.set(o, i, 0);
          for (let h = i + 1; h < t.columns; h++)
            t.set(o, h, t.get(o, h) - t.get(e, h) * a);
        }
        e++, i++;
      }
    }
    return t;
  }
  reducedEchelonForm() {
    let t = this.echelonForm(), e = t.columns, i = t.rows, n = i - 1;
    for (; n >= 0; )
      if (t.maxRow(n) === 0)
        n--;
      else {
        let s = 0, o = !1;
        for (; s < i && o === !1; )
          t.get(n, s) === 1 ? o = !0 : s++;
        for (let a = 0; a < n; a++) {
          let h = t.get(a, s);
          for (let c = s; c < e; c++) {
            let l = t.get(a, c) - h * t.get(n, c);
            t.set(a, c, l);
          }
        }
        n--;
      }
    return t;
  }
  set() {
    throw new Error("set method is unimplemented");
  }
  get() {
    throw new Error("get method is unimplemented");
  }
  repeat(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { rows: e = 1, columns: i = 1 } = t;
    if (!Number.isInteger(e) || e <= 0)
      throw new TypeError("rows must be a positive integer");
    if (!Number.isInteger(i) || i <= 0)
      throw new TypeError("columns must be a positive integer");
    let n = new R(this.rows * e, this.columns * i);
    for (let s = 0; s < e; s++)
      for (let o = 0; o < i; o++)
        n.setSubMatrix(this, this.rows * s, this.columns * o);
    return n;
  }
  fill(t) {
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, t);
    return this;
  }
  neg() {
    return this.mulS(-1);
  }
  getRow(t) {
    bt(this, t);
    let e = [];
    for (let i = 0; i < this.columns; i++)
      e.push(this.get(t, i));
    return e;
  }
  getRowVector(t) {
    return R.rowVector(this.getRow(t));
  }
  setRow(t, e) {
    bt(this, t), e = ue(this, e);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, e[i]);
    return this;
  }
  swapRows(t, e) {
    bt(this, t), bt(this, e);
    for (let i = 0; i < this.columns; i++) {
      let n = this.get(t, i);
      this.set(t, i, this.get(e, i)), this.set(e, i, n);
    }
    return this;
  }
  getColumn(t) {
    Mt(this, t);
    let e = [];
    for (let i = 0; i < this.rows; i++)
      e.push(this.get(i, t));
    return e;
  }
  getColumnVector(t) {
    return R.columnVector(this.getColumn(t));
  }
  setColumn(t, e) {
    Mt(this, t), e = de(this, e);
    for (let i = 0; i < this.rows; i++)
      this.set(i, t, e[i]);
    return this;
  }
  swapColumns(t, e) {
    Mt(this, t), Mt(this, e);
    for (let i = 0; i < this.rows; i++) {
      let n = this.get(i, t);
      this.set(i, t, this.get(i, e)), this.set(i, e, n);
    }
    return this;
  }
  addRowVector(t) {
    t = ue(this, t);
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, this.get(e, i) + t[i]);
    return this;
  }
  subRowVector(t) {
    t = ue(this, t);
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, this.get(e, i) - t[i]);
    return this;
  }
  mulRowVector(t) {
    t = ue(this, t);
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, this.get(e, i) * t[i]);
    return this;
  }
  divRowVector(t) {
    t = ue(this, t);
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, this.get(e, i) / t[i]);
    return this;
  }
  addColumnVector(t) {
    t = de(this, t);
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, this.get(e, i) + t[e]);
    return this;
  }
  subColumnVector(t) {
    t = de(this, t);
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, this.get(e, i) - t[e]);
    return this;
  }
  mulColumnVector(t) {
    t = de(this, t);
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, this.get(e, i) * t[e]);
    return this;
  }
  divColumnVector(t) {
    t = de(this, t);
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        this.set(e, i, this.get(e, i) / t[e]);
    return this;
  }
  mulRow(t, e) {
    bt(this, t);
    for (let i = 0; i < this.columns; i++)
      this.set(t, i, this.get(t, i) * e);
    return this;
  }
  mulColumn(t, e) {
    Mt(this, t);
    for (let i = 0; i < this.rows; i++)
      this.set(i, t, this.get(i, t) * e);
    return this;
  }
  max(t) {
    if (this.isEmpty())
      return NaN;
    switch (t) {
      case "row": {
        const e = new Array(this.rows).fill(Number.NEGATIVE_INFINITY);
        for (let i = 0; i < this.rows; i++)
          for (let n = 0; n < this.columns; n++)
            this.get(i, n) > e[i] && (e[i] = this.get(i, n));
        return e;
      }
      case "column": {
        const e = new Array(this.columns).fill(Number.NEGATIVE_INFINITY);
        for (let i = 0; i < this.rows; i++)
          for (let n = 0; n < this.columns; n++)
            this.get(i, n) > e[n] && (e[n] = this.get(i, n));
        return e;
      }
      case void 0: {
        let e = this.get(0, 0);
        for (let i = 0; i < this.rows; i++)
          for (let n = 0; n < this.columns; n++)
            this.get(i, n) > e && (e = this.get(i, n));
        return e;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  maxIndex() {
    he(this);
    let t = this.get(0, 0), e = [0, 0];
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.get(i, n) > t && (t = this.get(i, n), e[0] = i, e[1] = n);
    return e;
  }
  min(t) {
    if (this.isEmpty())
      return NaN;
    switch (t) {
      case "row": {
        const e = new Array(this.rows).fill(Number.POSITIVE_INFINITY);
        for (let i = 0; i < this.rows; i++)
          for (let n = 0; n < this.columns; n++)
            this.get(i, n) < e[i] && (e[i] = this.get(i, n));
        return e;
      }
      case "column": {
        const e = new Array(this.columns).fill(Number.POSITIVE_INFINITY);
        for (let i = 0; i < this.rows; i++)
          for (let n = 0; n < this.columns; n++)
            this.get(i, n) < e[n] && (e[n] = this.get(i, n));
        return e;
      }
      case void 0: {
        let e = this.get(0, 0);
        for (let i = 0; i < this.rows; i++)
          for (let n = 0; n < this.columns; n++)
            this.get(i, n) < e && (e = this.get(i, n));
        return e;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  minIndex() {
    he(this);
    let t = this.get(0, 0), e = [0, 0];
    for (let i = 0; i < this.rows; i++)
      for (let n = 0; n < this.columns; n++)
        this.get(i, n) < t && (t = this.get(i, n), e[0] = i, e[1] = n);
    return e;
  }
  maxRow(t) {
    if (bt(this, t), this.isEmpty())
      return NaN;
    let e = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) > e && (e = this.get(t, i));
    return e;
  }
  maxRowIndex(t) {
    bt(this, t), he(this);
    let e = this.get(t, 0), i = [t, 0];
    for (let n = 1; n < this.columns; n++)
      this.get(t, n) > e && (e = this.get(t, n), i[1] = n);
    return i;
  }
  minRow(t) {
    if (bt(this, t), this.isEmpty())
      return NaN;
    let e = this.get(t, 0);
    for (let i = 1; i < this.columns; i++)
      this.get(t, i) < e && (e = this.get(t, i));
    return e;
  }
  minRowIndex(t) {
    bt(this, t), he(this);
    let e = this.get(t, 0), i = [t, 0];
    for (let n = 1; n < this.columns; n++)
      this.get(t, n) < e && (e = this.get(t, n), i[1] = n);
    return i;
  }
  maxColumn(t) {
    if (Mt(this, t), this.isEmpty())
      return NaN;
    let e = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) > e && (e = this.get(i, t));
    return e;
  }
  maxColumnIndex(t) {
    Mt(this, t), he(this);
    let e = this.get(0, t), i = [0, t];
    for (let n = 1; n < this.rows; n++)
      this.get(n, t) > e && (e = this.get(n, t), i[0] = n);
    return i;
  }
  minColumn(t) {
    if (Mt(this, t), this.isEmpty())
      return NaN;
    let e = this.get(0, t);
    for (let i = 1; i < this.rows; i++)
      this.get(i, t) < e && (e = this.get(i, t));
    return e;
  }
  minColumnIndex(t) {
    Mt(this, t), he(this);
    let e = this.get(0, t), i = [0, t];
    for (let n = 1; n < this.rows; n++)
      this.get(n, t) < e && (e = this.get(n, t), i[0] = n);
    return i;
  }
  diag() {
    let t = Math.min(this.rows, this.columns), e = [];
    for (let i = 0; i < t; i++)
      e.push(this.get(i, i));
    return e;
  }
  norm(t = "frobenius") {
    switch (t) {
      case "max":
        return this.max();
      case "frobenius":
        return Math.sqrt(this.dot(this));
      default:
        throw new RangeError(`unknown norm type: ${t}`);
    }
  }
  cumulativeSum() {
    let t = 0;
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        t += this.get(e, i), this.set(e, i, t);
    return this;
  }
  dot(t) {
    G.isMatrix(t) && (t = t.to1DArray());
    let e = this.to1DArray();
    if (e.length !== t.length)
      throw new RangeError("vectors do not have the same size");
    let i = 0;
    for (let n = 0; n < e.length; n++)
      i += e[n] * t[n];
    return i;
  }
  mmul(t) {
    t = R.checkMatrix(t);
    let e = this.rows, i = this.columns, n = t.columns, s = new R(e, n), o = new Float64Array(i);
    for (let a = 0; a < n; a++) {
      for (let h = 0; h < i; h++)
        o[h] = t.get(h, a);
      for (let h = 0; h < e; h++) {
        let c = 0;
        for (let l = 0; l < i; l++)
          c += this.get(h, l) * o[l];
        s.set(h, a, c);
      }
    }
    return s;
  }
  strassen2x2(t) {
    t = R.checkMatrix(t);
    let e = new R(2, 2);
    const i = this.get(0, 0), n = t.get(0, 0), s = this.get(0, 1), o = t.get(0, 1), a = this.get(1, 0), h = t.get(1, 0), c = this.get(1, 1), l = t.get(1, 1), u = (i + c) * (n + l), g = (a + c) * n, w = i * (o - l), y = c * (h - n), _ = (i + s) * l, I = (a - i) * (n + o), v = (s - c) * (h + l), S = u + y - _ + v, f = w + _, p = g + y, T = u - g + w + I;
    return e.set(0, 0, S), e.set(0, 1, f), e.set(1, 0, p), e.set(1, 1, T), e;
  }
  strassen3x3(t) {
    t = R.checkMatrix(t);
    let e = new R(3, 3);
    const i = this.get(0, 0), n = this.get(0, 1), s = this.get(0, 2), o = this.get(1, 0), a = this.get(1, 1), h = this.get(1, 2), c = this.get(2, 0), l = this.get(2, 1), u = this.get(2, 2), g = t.get(0, 0), w = t.get(0, 1), y = t.get(0, 2), _ = t.get(1, 0), I = t.get(1, 1), v = t.get(1, 2), S = t.get(2, 0), f = t.get(2, 1), p = t.get(2, 2), T = (i + n + s - o - a - l - u) * I, A = (i - o) * (-w + I), C = a * (-g + w + _ - I - v - S + p), E = (-i + o + a) * (g - w + I), d = (o + a) * (-g + w), x = i * g, M = (-i + c + l) * (g - y + v), b = (-i + c) * (y - v), Z = (c + l) * (-g + y), Y = (i + n + s - a - h - c - l) * v, H = l * (-g + y + _ - I - v - S + f), V = (-s + l + u) * (I + S - f), st = (s - u) * (I - f), ht = s * S, dt = (l + u) * (-S + f), tt = (-s + a + h) * (v + S - p), Tt = (s - h) * (v - p), U = (a + h) * (-S + p), it = n * _, ft = h * f, ct = o * y, ot = c * w, xo = u * p, To = x + ht + it, bo = T + E + d + x + V + ht + dt, Mo = x + M + Z + Y + ht + tt + U, _o = A + C + E + x + ht + tt + Tt, Eo = A + E + d + x + ft, Io = ht + tt + Tt + U + ct, So = x + M + b + H + V + st + ht, Ao = V + st + ht + dt + ot, Po = x + M + b + Z + xo;
    return e.set(0, 0, To), e.set(0, 1, bo), e.set(0, 2, Mo), e.set(1, 0, _o), e.set(1, 1, Eo), e.set(1, 2, Io), e.set(2, 0, So), e.set(2, 1, Ao), e.set(2, 2, Po), e;
  }
  mmulStrassen(t) {
    t = R.checkMatrix(t);
    let e = this.clone(), i = e.rows, n = e.columns, s = t.rows, o = t.columns;
    n !== s && console.warn(
      `Multiplying ${i} x ${n} and ${s} x ${o} matrix: dimensions do not match.`
    );
    function a(u, g, w) {
      let y = u.rows, _ = u.columns;
      if (y === g && _ === w)
        return u;
      {
        let I = G.zeros(g, w);
        return I = I.setSubMatrix(u, 0, 0), I;
      }
    }
    let h = Math.max(i, s), c = Math.max(n, o);
    e = a(e, h, c), t = a(t, h, c);
    function l(u, g, w, y) {
      if (w <= 512 || y <= 512)
        return u.mmul(g);
      w % 2 === 1 && y % 2 === 1 ? (u = a(u, w + 1, y + 1), g = a(g, w + 1, y + 1)) : w % 2 === 1 ? (u = a(u, w + 1, y), g = a(g, w + 1, y)) : y % 2 === 1 && (u = a(u, w, y + 1), g = a(g, w, y + 1));
      let _ = parseInt(u.rows / 2, 10), I = parseInt(u.columns / 2, 10), v = u.subMatrix(0, _ - 1, 0, I - 1), S = g.subMatrix(0, _ - 1, 0, I - 1), f = u.subMatrix(0, _ - 1, I, u.columns - 1), p = g.subMatrix(0, _ - 1, I, g.columns - 1), T = u.subMatrix(_, u.rows - 1, 0, I - 1), A = g.subMatrix(_, g.rows - 1, 0, I - 1), C = u.subMatrix(_, u.rows - 1, I, u.columns - 1), E = g.subMatrix(_, g.rows - 1, I, g.columns - 1), d = l(
        G.add(v, C),
        G.add(S, E),
        _,
        I
      ), x = l(G.add(T, C), S, _, I), M = l(v, G.sub(p, E), _, I), b = l(C, G.sub(A, S), _, I), Z = l(G.add(v, f), E, _, I), Y = l(
        G.sub(T, v),
        G.add(S, p),
        _,
        I
      ), H = l(
        G.sub(f, C),
        G.add(A, E),
        _,
        I
      ), V = G.add(d, b);
      V.sub(Z), V.add(H);
      let st = G.add(M, Z), ht = G.add(x, b), dt = G.sub(d, x);
      dt.add(M), dt.add(Y);
      let tt = G.zeros(2 * V.rows, 2 * V.columns);
      return tt = tt.setSubMatrix(V, 0, 0), tt = tt.setSubMatrix(st, V.rows, 0), tt = tt.setSubMatrix(ht, 0, V.columns), tt = tt.setSubMatrix(dt, V.rows, V.columns), tt.subMatrix(0, w - 1, 0, y - 1);
    }
    return l(e, t, h, c);
  }
  scaleRows(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: e = 0, max: i = 1 } = t;
    if (!Number.isFinite(e))
      throw new TypeError("min must be a number");
    if (!Number.isFinite(i))
      throw new TypeError("max must be a number");
    if (e >= i)
      throw new RangeError("min must be smaller than max");
    let n = new R(this.rows, this.columns);
    for (let s = 0; s < this.rows; s++) {
      const o = this.getRow(s);
      o.length > 0 && Mn(o, { min: e, max: i, output: o }), n.setRow(s, o);
    }
    return n;
  }
  scaleColumns(t = {}) {
    if (typeof t != "object")
      throw new TypeError("options must be an object");
    const { min: e = 0, max: i = 1 } = t;
    if (!Number.isFinite(e))
      throw new TypeError("min must be a number");
    if (!Number.isFinite(i))
      throw new TypeError("max must be a number");
    if (e >= i)
      throw new RangeError("min must be smaller than max");
    let n = new R(this.rows, this.columns);
    for (let s = 0; s < this.columns; s++) {
      const o = this.getColumn(s);
      o.length && Mn(o, {
        min: e,
        max: i,
        output: o
      }), n.setColumn(s, o);
    }
    return n;
  }
  flipRows() {
    const t = Math.ceil(this.columns / 2);
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < t; i++) {
        let n = this.get(e, i), s = this.get(e, this.columns - 1 - i);
        this.set(e, i, s), this.set(e, this.columns - 1 - i, n);
      }
    return this;
  }
  flipColumns() {
    const t = Math.ceil(this.rows / 2);
    for (let e = 0; e < this.columns; e++)
      for (let i = 0; i < t; i++) {
        let n = this.get(i, e), s = this.get(this.rows - 1 - i, e);
        this.set(i, e, s), this.set(this.rows - 1 - i, e, n);
      }
    return this;
  }
  kroneckerProduct(t) {
    t = R.checkMatrix(t);
    let e = this.rows, i = this.columns, n = t.rows, s = t.columns, o = new R(e * n, i * s);
    for (let a = 0; a < e; a++)
      for (let h = 0; h < i; h++)
        for (let c = 0; c < n; c++)
          for (let l = 0; l < s; l++)
            o.set(n * a + c, s * h + l, this.get(a, h) * t.get(c, l));
    return o;
  }
  kroneckerSum(t) {
    if (t = R.checkMatrix(t), !this.isSquare() || !t.isSquare())
      throw new Error("Kronecker Sum needs two Square Matrices");
    let e = this.rows, i = t.rows, n = this.kroneckerProduct(R.eye(i, i)), s = R.eye(e, e).kroneckerProduct(t);
    return n.add(s);
  }
  transpose() {
    let t = new R(this.columns, this.rows);
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++)
        t.set(i, e, this.get(e, i));
    return t;
  }
  sortRows(t = En) {
    for (let e = 0; e < this.rows; e++)
      this.setRow(e, this.getRow(e).sort(t));
    return this;
  }
  sortColumns(t = En) {
    for (let e = 0; e < this.columns; e++)
      this.setColumn(e, this.getColumn(e).sort(t));
    return this;
  }
  subMatrix(t, e, i, n) {
    Pi(this, t, e, i, n);
    let s = new R(
      e - t + 1,
      n - i + 1
    );
    for (let o = t; o <= e; o++)
      for (let a = i; a <= n; a++)
        s.set(o - t, a - i, this.get(o, a));
    return s;
  }
  subMatrixRow(t, e, i) {
    if (e === void 0 && (e = 0), i === void 0 && (i = this.columns - 1), e > i || e < 0 || e >= this.columns || i < 0 || i >= this.columns)
      throw new RangeError("Argument out of range");
    let n = new R(t.length, i - e + 1);
    for (let s = 0; s < t.length; s++)
      for (let o = e; o <= i; o++) {
        if (t[s] < 0 || t[s] >= this.rows)
          throw new RangeError(`Row index out of range: ${t[s]}`);
        n.set(s, o - e, this.get(t[s], o));
      }
    return n;
  }
  subMatrixColumn(t, e, i) {
    if (e === void 0 && (e = 0), i === void 0 && (i = this.rows - 1), e > i || e < 0 || e >= this.rows || i < 0 || i >= this.rows)
      throw new RangeError("Argument out of range");
    let n = new R(i - e + 1, t.length);
    for (let s = 0; s < t.length; s++)
      for (let o = e; o <= i; o++) {
        if (t[s] < 0 || t[s] >= this.columns)
          throw new RangeError(`Column index out of range: ${t[s]}`);
        n.set(o - e, s, this.get(o, t[s]));
      }
    return n;
  }
  setSubMatrix(t, e, i) {
    if (t = R.checkMatrix(t), t.isEmpty())
      return this;
    let n = e + t.rows - 1, s = i + t.columns - 1;
    Pi(this, e, n, i, s);
    for (let o = 0; o < t.rows; o++)
      for (let a = 0; a < t.columns; a++)
        this.set(e + o, i + a, t.get(o, a));
    return this;
  }
  selection(t, e) {
    Wi(this, t), Vi(this, e);
    let i = new R(t.length, e.length);
    for (let n = 0; n < t.length; n++) {
      let s = t[n];
      for (let o = 0; o < e.length; o++) {
        let a = e[o];
        i.set(n, o, this.get(s, a));
      }
    }
    return i;
  }
  trace() {
    let t = Math.min(this.rows, this.columns), e = 0;
    for (let i = 0; i < t; i++)
      e += this.get(i, i);
    return e;
  }
  clone() {
    return this.constructor.copy(this, new R(this.rows, this.columns));
  }
  /**
   * @template {AbstractMatrix} M
   * @param {AbstractMatrix} from
   * @param {M} to
   * @return {M}
   */
  static copy(t, e) {
    for (const [i, n, s] of t.entries())
      e.set(i, n, s);
    return e;
  }
  sum(t) {
    switch (t) {
      case "row":
        return rc(this);
      case "column":
        return ic(this);
      case void 0:
        return nc(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  product(t) {
    switch (t) {
      case "row":
        return sc(this);
      case "column":
        return oc(this);
      case void 0:
        return ac(this);
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  mean(t) {
    const e = this.sum(t);
    switch (t) {
      case "row": {
        for (let i = 0; i < this.rows; i++)
          e[i] /= this.columns;
        return e;
      }
      case "column": {
        for (let i = 0; i < this.columns; i++)
          e[i] /= this.rows;
        return e;
      }
      case void 0:
        return e / this.size;
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  variance(t, e = {}) {
    if (typeof t == "object" && (e = t, t = void 0), typeof e != "object")
      throw new TypeError("options must be an object");
    const { unbiased: i = !0, mean: n = this.mean(t) } = e;
    if (typeof i != "boolean")
      throw new TypeError("unbiased must be a boolean");
    switch (t) {
      case "row": {
        if (!wt.isAnyArray(n))
          throw new TypeError("mean must be an array");
        return hc(this, i, n);
      }
      case "column": {
        if (!wt.isAnyArray(n))
          throw new TypeError("mean must be an array");
        return cc(this, i, n);
      }
      case void 0: {
        if (typeof n != "number")
          throw new TypeError("mean must be a number");
        return lc(this, i, n);
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  standardDeviation(t, e) {
    typeof t == "object" && (e = t, t = void 0);
    const i = this.variance(t, e);
    if (t === void 0)
      return Math.sqrt(i);
    for (let n = 0; n < i.length; n++)
      i[n] = Math.sqrt(i[n]);
    return i;
  }
  center(t, e = {}) {
    if (typeof t == "object" && (e = t, t = void 0), typeof e != "object")
      throw new TypeError("options must be an object");
    const { center: i = this.mean(t) } = e;
    switch (t) {
      case "row": {
        if (!wt.isAnyArray(i))
          throw new TypeError("center must be an array");
        return uc(this, i), this;
      }
      case "column": {
        if (!wt.isAnyArray(i))
          throw new TypeError("center must be an array");
        return dc(this, i), this;
      }
      case void 0: {
        if (typeof i != "number")
          throw new TypeError("center must be a number");
        return fc(this, i), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  scale(t, e = {}) {
    if (typeof t == "object" && (e = t, t = void 0), typeof e != "object")
      throw new TypeError("options must be an object");
    let i = e.scale;
    switch (t) {
      case "row": {
        if (i === void 0)
          i = pc(this);
        else if (!wt.isAnyArray(i))
          throw new TypeError("scale must be an array");
        return gc(this, i), this;
      }
      case "column": {
        if (i === void 0)
          i = mc(this);
        else if (!wt.isAnyArray(i))
          throw new TypeError("scale must be an array");
        return yc(this, i), this;
      }
      case void 0: {
        if (i === void 0)
          i = wc(this);
        else if (typeof i != "number")
          throw new TypeError("scale must be a number");
        return vc(this, i), this;
      }
      default:
        throw new Error(`invalid option: ${t}`);
    }
  }
  toString(t) {
    return Cs(this, t);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * iterator from left to right, from top to bottom
   * yield [row, column, value]
   * @returns {Generator<[number, number, number], void, *>}
   */
  *entries() {
    for (let t = 0; t < this.rows; t++)
      for (let e = 0; e < this.columns; e++)
        yield [t, e, this.get(t, e)];
  }
  /**
   * iterator from left to right, from top to bottom
   * yield value
   * @returns {Generator<number, void, *>}
   */
  *values() {
    for (let t = 0; t < this.rows; t++)
      for (let e = 0; e < this.columns; e++)
        yield this.get(t, e);
  }
}
G.prototype.klass = "Matrix";
typeof Symbol < "u" && (G.prototype[Symbol.for("nodejs.util.inspect.custom")] = Kh);
function En(r, t) {
  return r - t;
}
function xc(r) {
  return r.every((t) => typeof t == "number");
}
G.random = G.rand;
G.randomInt = G.randInt;
G.diagonal = G.diag;
G.prototype.diagonal = G.prototype.diag;
G.identity = G.eye;
G.prototype.negate = G.prototype.neg;
G.prototype.tensorProduct = G.prototype.kroneckerProduct;
var cr, hi, lr;
let R = (lr = class extends G {
  constructor(r, t) {
    if (super(), Ss(this, cr), Vh(this, "data"), lr.isMatrix(r))
      bn(this, cr, hi).call(this, r.rows, r.columns), lr.copy(r, this);
    else if (Number.isInteger(r) && r >= 0)
      bn(this, cr, hi).call(this, r, t);
    else if (wt.isAnyArray(r)) {
      const e = r;
      if (r = e.length, t = r ? e[0].length : 0, typeof t != "number")
        throw new TypeError(
          "Data must be a 2D array with at least one element"
        );
      this.data = [];
      for (let i = 0; i < r; i++) {
        if (e[i].length !== t)
          throw new RangeError("Inconsistent array dimensions");
        if (!xc(e[i]))
          throw new TypeError("Input data contains non-numeric values");
        this.data.push(Float64Array.from(e[i]));
      }
      this.rows = r, this.columns = t;
    } else
      throw new TypeError(
        "First argument must be a positive number or an array"
      );
  }
  set(r, t, e) {
    return this.data[r][t] = e, this;
  }
  get(r, t) {
    return this.data[r][t];
  }
  removeRow(r) {
    return bt(this, r), this.data.splice(r, 1), this.rows -= 1, this;
  }
  addRow(r, t) {
    return t === void 0 && (t = r, r = this.rows), bt(this, r, !0), t = Float64Array.from(ue(this, t)), this.data.splice(r, 0, t), this.rows += 1, this;
  }
  removeColumn(r) {
    Mt(this, r);
    for (let t = 0; t < this.rows; t++) {
      const e = new Float64Array(this.columns - 1);
      for (let i = 0; i < r; i++)
        e[i] = this.data[t][i];
      for (let i = r + 1; i < this.columns; i++)
        e[i - 1] = this.data[t][i];
      this.data[t] = e;
    }
    return this.columns -= 1, this;
  }
  addColumn(r, t) {
    typeof t > "u" && (t = r, r = this.columns), Mt(this, r, !0), t = de(this, t);
    for (let e = 0; e < this.rows; e++) {
      const i = new Float64Array(this.columns + 1);
      let n = 0;
      for (; n < r; n++)
        i[n] = this.data[e][n];
      for (i[n++] = t[e]; n < this.columns + 1; n++)
        i[n] = this.data[e][n - 1];
      this.data[e] = i;
    }
    return this.columns += 1, this;
  }
}, cr = /* @__PURE__ */ new WeakSet(), hi = function(r, t) {
  if (this.data = [], Number.isInteger(t) && t >= 0)
    for (let e = 0; e < r; e++)
      this.data.push(new Float64Array(t));
  else
    throw new TypeError("nColumns must be a positive integer");
  this.rows = r, this.columns = t;
}, lr);
ec(G, R);
var pt;
const Tc = class Ci extends G {
  /**
   * @param {number | AbstractMatrix | ArrayLike<ArrayLike<number>>} diagonalSize
   * @return {this}
   */
  constructor(t) {
    if (super(), Ss(this, pt, void 0), R.isMatrix(t)) {
      if (!t.isSymmetric())
        throw new TypeError("not symmetric data");
      ai(this, pt, R.copy(
        t,
        new R(t.rows, t.rows)
      ));
    } else if (Number.isInteger(t) && t >= 0)
      ai(this, pt, new R(t, t));
    else if (ai(this, pt, new R(t)), !this.isSymmetric())
      throw new TypeError("not symmetric data");
  }
  get size() {
    return kt(this, pt).size;
  }
  get rows() {
    return kt(this, pt).rows;
  }
  get columns() {
    return kt(this, pt).columns;
  }
  get diagonalSize() {
    return this.rows;
  }
  /**
   * not the same as matrix.isSymmetric()
   * Here is to check if it's instanceof SymmetricMatrix without bundling issues
   *
   * @param value
   * @returns {boolean}
   */
  static isSymmetricMatrix(t) {
    return R.isMatrix(t) && t.klassType === "SymmetricMatrix";
  }
  /**
   * @param diagonalSize
   * @return {SymmetricMatrix}
   */
  static zeros(t) {
    return new this(t);
  }
  /**
   * @param diagonalSize
   * @return {SymmetricMatrix}
   */
  static ones(t) {
    return new this(t).fill(1);
  }
  clone() {
    const t = new Ci(this.diagonalSize);
    for (const [e, i, n] of this.upperRightEntries())
      t.set(e, i, n);
    return t;
  }
  toMatrix() {
    return new R(this);
  }
  get(t, e) {
    return kt(this, pt).get(t, e);
  }
  set(t, e, i) {
    return kt(this, pt).set(t, e, i), kt(this, pt).set(e, t, i), this;
  }
  removeCross(t) {
    return kt(this, pt).removeRow(t), kt(this, pt).removeColumn(t), this;
  }
  addCross(t, e) {
    e === void 0 && (e = t, t = this.diagonalSize);
    const i = e.slice();
    return i.splice(t, 1), kt(this, pt).addRow(t, i), kt(this, pt).addColumn(t, e), this;
  }
  /**
   * @param {Mask[]} mask
   */
  applyMask(t) {
    if (t.length !== this.diagonalSize)
      throw new RangeError("Mask size do not match with matrix size");
    const e = [];
    for (const [i, n] of t.entries())
      n || e.push(i);
    e.reverse();
    for (const i of e)
      this.removeCross(i);
    return this;
  }
  /**
   * Compact format upper-right corner of matrix
   * iterate from left to right, from top to bottom.
   *
   * ```
   *   A B C D
   * A 1 2 3 4
   * B 2 5 6 7
   * C 3 6 8 9
   * D 4 7 9 10
   * ```
   *
   * will return compact 1D array `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
   *
   * length is S(i=0, n=sideSize) => 10 for a 4 sideSized matrix
   *
   * @returns {number[]}
   */
  toCompact() {
    const { diagonalSize: t } = this, e = new Array(t * (t + 1) / 2);
    for (let i = 0, n = 0, s = 0; s < e.length; s++)
      e[s] = this.get(n, i), ++i >= t && (i = ++n);
    return e;
  }
  /**
   * @param {number[]} compact
   * @return {SymmetricMatrix}
   */
  static fromCompact(t) {
    const e = t.length, i = (Math.sqrt(8 * e + 1) - 1) / 2;
    if (!Number.isInteger(i))
      throw new TypeError(
        `This array is not a compact representation of a Symmetric Matrix, ${JSON.stringify(
          t
        )}`
      );
    const n = new Ci(i);
    for (let s = 0, o = 0, a = 0; a < e; a++)
      n.set(s, o, t[a]), ++s >= i && (s = ++o);
    return n;
  }
  /**
   * half iterator upper-right-corner from left to right, from top to bottom
   * yield [row, column, value]
   *
   * @returns {Generator<[number, number, number], void, *>}
   */
  *upperRightEntries() {
    for (let t = 0, e = 0; t < this.diagonalSize; void 0) {
      const i = this.get(t, e);
      yield [t, e, i], ++e >= this.diagonalSize && (e = ++t);
    }
  }
  /**
   * half iterator upper-right-corner from left to right, from top to bottom
   * yield value
   *
   * @returns {Generator<[number, number, number], void, *>}
   */
  *upperRightValues() {
    for (let t = 0, e = 0; t < this.diagonalSize; void 0)
      yield this.get(t, e), ++e >= this.diagonalSize && (e = ++t);
  }
};
pt = /* @__PURE__ */ new WeakMap();
let Ce = Tc;
Ce.prototype.klassType = "SymmetricMatrix";
class Hr extends Ce {
  /**
   * not the same as matrix.isSymmetric()
   * Here is to check if it's instanceof SymmetricMatrix without bundling issues
   *
   * @param value
   * @returns {boolean}
   */
  static isDistanceMatrix(t) {
    return Ce.isSymmetricMatrix(t) && t.klassSubType === "DistanceMatrix";
  }
  constructor(t) {
    if (super(t), !this.isDistance())
      throw new TypeError("Provided arguments do no produce a distance matrix");
  }
  set(t, e, i) {
    return t === e && (i = 0), super.set(t, e, i);
  }
  addCross(t, e) {
    return e === void 0 && (e = t, t = this.diagonalSize), e = e.slice(), e[t] = 0, super.addCross(t, e);
  }
  toSymmetricMatrix() {
    return new Ce(this);
  }
  clone() {
    const t = new Hr(this.diagonalSize);
    for (const [e, i, n] of this.upperRightEntries())
      e !== i && t.set(e, i, n);
    return t;
  }
  /**
   * Compact format upper-right corner of matrix
   * no diagonal (only zeros)
   * iterable from left to right, from top to bottom.
   *
   * ```
   *   A B C D
   * A 0 1 2 3
   * B 1 0 4 5
   * C 2 4 0 6
   * D 3 5 6 0
   * ```
   *
   * will return compact 1D array `[1, 2, 3, 4, 5, 6]`
   *
   * length is S(i=0, n=sideSize-1) => 6 for a 4 side sized matrix
   *
   * @returns {number[]}
   */
  toCompact() {
    const { diagonalSize: t } = this, e = (t - 1) * t / 2, i = new Array(e);
    for (let n = 1, s = 0, o = 0; o < i.length; o++)
      i[o] = this.get(s, n), ++n >= t && (n = ++s + 1);
    return i;
  }
  /**
   * @param {number[]} compact
   */
  static fromCompact(t) {
    const e = t.length, i = (Math.sqrt(8 * e + 1) + 1) / 2;
    if (!Number.isInteger(i))
      throw new TypeError(
        `This array is not a compact representation of a DistanceMatrix, ${JSON.stringify(
          t
        )}`
      );
    const n = new this(i);
    for (let s = 1, o = 0, a = 0; a < e; a++)
      n.set(s, o, t[a]), ++s >= i && (s = ++o + 1);
    return n;
  }
}
Hr.prototype.klassSubType = "DistanceMatrix";
class Xt extends G {
  constructor(t, e, i) {
    super(), this.matrix = t, this.rows = e, this.columns = i;
  }
}
class bc extends Xt {
  constructor(t, e) {
    Mt(t, e), super(t, t.rows, 1), this.column = e;
  }
  set(t, e, i) {
    return this.matrix.set(t, this.column, i), this;
  }
  get(t) {
    return this.matrix.get(t, this.column);
  }
}
class Mc extends Xt {
  constructor(t, e) {
    Vi(t, e), super(t, t.rows, e.length), this.columnIndices = e;
  }
  set(t, e, i) {
    return this.matrix.set(t, this.columnIndices[e], i), this;
  }
  get(t, e) {
    return this.matrix.get(t, this.columnIndices[e]);
  }
}
class _c extends Xt {
  constructor(t) {
    super(t, t.rows, t.columns);
  }
  set(t, e, i) {
    return this.matrix.set(t, this.columns - e - 1, i), this;
  }
  get(t, e) {
    return this.matrix.get(t, this.columns - e - 1);
  }
}
class Ec extends Xt {
  constructor(t) {
    super(t, t.rows, t.columns);
  }
  set(t, e, i) {
    return this.matrix.set(this.rows - t - 1, e, i), this;
  }
  get(t, e) {
    return this.matrix.get(this.rows - t - 1, e);
  }
}
class Ic extends Xt {
  constructor(t, e) {
    bt(t, e), super(t, 1, t.columns), this.row = e;
  }
  set(t, e, i) {
    return this.matrix.set(this.row, e, i), this;
  }
  get(t, e) {
    return this.matrix.get(this.row, e);
  }
}
class Sc extends Xt {
  constructor(t, e) {
    Wi(t, e), super(t, e.length, t.columns), this.rowIndices = e;
  }
  set(t, e, i) {
    return this.matrix.set(this.rowIndices[t], e, i), this;
  }
  get(t, e) {
    return this.matrix.get(this.rowIndices[t], e);
  }
}
class Tr extends Xt {
  constructor(t, e, i) {
    Wi(t, e), Vi(t, i), super(t, e.length, i.length), this.rowIndices = e, this.columnIndices = i;
  }
  set(t, e, i) {
    return this.matrix.set(
      this.rowIndices[t],
      this.columnIndices[e],
      i
    ), this;
  }
  get(t, e) {
    return this.matrix.get(
      this.rowIndices[t],
      this.columnIndices[e]
    );
  }
}
class Ac extends Xt {
  constructor(t, e, i, n, s) {
    Pi(t, e, i, n, s), super(t, i - e + 1, s - n + 1), this.startRow = e, this.startColumn = n;
  }
  set(t, e, i) {
    return this.matrix.set(
      this.startRow + t,
      this.startColumn + e,
      i
    ), this;
  }
  get(t, e) {
    return this.matrix.get(
      this.startRow + t,
      this.startColumn + e
    );
  }
}
class Pc extends Xt {
  constructor(t) {
    super(t, t.columns, t.rows);
  }
  set(t, e, i) {
    return this.matrix.set(e, t, i), this;
  }
  get(t, e) {
    return this.matrix.get(e, t);
  }
}
class Rs extends G {
  constructor(t, e = {}) {
    const { rows: i = 1 } = e;
    if (t.length % i !== 0)
      throw new Error("the data length is not divisible by the number of rows");
    super(), this.rows = i, this.columns = t.length / i, this.data = t;
  }
  set(t, e, i) {
    let n = this._calculateIndex(t, e);
    return this.data[n] = i, this;
  }
  get(t, e) {
    let i = this._calculateIndex(t, e);
    return this.data[i];
  }
  _calculateIndex(t, e) {
    return t * this.columns + e;
  }
}
class xt extends G {
  constructor(t) {
    super(), this.data = t, this.rows = t.length, this.columns = t[0].length;
  }
  set(t, e, i) {
    return this.data[t][e] = i, this;
  }
  get(t, e) {
    return this.data[t][e];
  }
}
function Cc(r, t) {
  if (wt.isAnyArray(r))
    return r[0] && wt.isAnyArray(r[0]) ? new xt(r) : new Rs(r, t);
  throw new Error("the argument is not an array");
}
class Yr {
  constructor(t) {
    t = xt.checkMatrix(t);
    let e = t.clone(), i = e.rows, n = e.columns, s = new Float64Array(i), o = 1, a, h, c, l, u, g, w, y, _;
    for (a = 0; a < i; a++)
      s[a] = a;
    for (y = new Float64Array(i), h = 0; h < n; h++) {
      for (a = 0; a < i; a++)
        y[a] = e.get(a, h);
      for (a = 0; a < i; a++) {
        for (_ = Math.min(a, h), u = 0, c = 0; c < _; c++)
          u += e.get(a, c) * y[c];
        y[a] -= u, e.set(a, h, y[a]);
      }
      for (l = h, a = h + 1; a < i; a++)
        Math.abs(y[a]) > Math.abs(y[l]) && (l = a);
      if (l !== h) {
        for (c = 0; c < n; c++)
          g = e.get(l, c), e.set(l, c, e.get(h, c)), e.set(h, c, g);
        w = s[l], s[l] = s[h], s[h] = w, o = -o;
      }
      if (h < i && e.get(h, h) !== 0)
        for (a = h + 1; a < i; a++)
          e.set(a, h, e.get(a, h) / e.get(h, h));
    }
    this.LU = e, this.pivotVector = s, this.pivotSign = o;
  }
  isSingular() {
    let t = this.LU, e = t.columns;
    for (let i = 0; i < e; i++)
      if (t.get(i, i) === 0)
        return !0;
    return !1;
  }
  solve(t) {
    t = R.checkMatrix(t);
    let e = this.LU;
    if (e.rows !== t.rows)
      throw new Error("Invalid matrix dimensions");
    if (this.isSingular())
      throw new Error("LU matrix is singular");
    let i = t.columns, n = t.subMatrixRow(this.pivotVector, 0, i - 1), s = e.columns, o, a, h;
    for (h = 0; h < s; h++)
      for (o = h + 1; o < s; o++)
        for (a = 0; a < i; a++)
          n.set(o, a, n.get(o, a) - n.get(h, a) * e.get(o, h));
    for (h = s - 1; h >= 0; h--) {
      for (a = 0; a < i; a++)
        n.set(h, a, n.get(h, a) / e.get(h, h));
      for (o = 0; o < h; o++)
        for (a = 0; a < i; a++)
          n.set(o, a, n.get(o, a) - n.get(h, a) * e.get(o, h));
    }
    return n;
  }
  get determinant() {
    let t = this.LU;
    if (!t.isSquare())
      throw new Error("Matrix must be square");
    let e = this.pivotSign, i = t.columns;
    for (let n = 0; n < i; n++)
      e *= t.get(n, n);
    return e;
  }
  get lowerTriangularMatrix() {
    let t = this.LU, e = t.rows, i = t.columns, n = new R(e, i);
    for (let s = 0; s < e; s++)
      for (let o = 0; o < i; o++)
        s > o ? n.set(s, o, t.get(s, o)) : s === o ? n.set(s, o, 1) : n.set(s, o, 0);
    return n;
  }
  get upperTriangularMatrix() {
    let t = this.LU, e = t.rows, i = t.columns, n = new R(e, i);
    for (let s = 0; s < e; s++)
      for (let o = 0; o < i; o++)
        s <= o ? n.set(s, o, t.get(s, o)) : n.set(s, o, 0);
    return n;
  }
  get pivotPermutationVector() {
    return Array.from(this.pivotVector);
  }
}
function Zt(r, t) {
  let e = 0;
  return Math.abs(r) > Math.abs(t) ? (e = t / r, Math.abs(r) * Math.sqrt(1 + e * e)) : t !== 0 ? (e = r / t, Math.abs(t) * Math.sqrt(1 + e * e)) : 0;
}
class zi {
  constructor(t) {
    t = xt.checkMatrix(t);
    let e = t.clone(), i = t.rows, n = t.columns, s = new Float64Array(n), o, a, h, c;
    for (h = 0; h < n; h++) {
      let l = 0;
      for (o = h; o < i; o++)
        l = Zt(l, e.get(o, h));
      if (l !== 0) {
        for (e.get(h, h) < 0 && (l = -l), o = h; o < i; o++)
          e.set(o, h, e.get(o, h) / l);
        for (e.set(h, h, e.get(h, h) + 1), a = h + 1; a < n; a++) {
          for (c = 0, o = h; o < i; o++)
            c += e.get(o, h) * e.get(o, a);
          for (c = -c / e.get(h, h), o = h; o < i; o++)
            e.set(o, a, e.get(o, a) + c * e.get(o, h));
        }
      }
      s[h] = -l;
    }
    this.QR = e, this.Rdiag = s;
  }
  solve(t) {
    t = R.checkMatrix(t);
    let e = this.QR, i = e.rows;
    if (t.rows !== i)
      throw new Error("Matrix row dimensions must agree");
    if (!this.isFullRank())
      throw new Error("Matrix is rank deficient");
    let n = t.columns, s = t.clone(), o = e.columns, a, h, c, l;
    for (c = 0; c < o; c++)
      for (h = 0; h < n; h++) {
        for (l = 0, a = c; a < i; a++)
          l += e.get(a, c) * s.get(a, h);
        for (l = -l / e.get(c, c), a = c; a < i; a++)
          s.set(a, h, s.get(a, h) + l * e.get(a, c));
      }
    for (c = o - 1; c >= 0; c--) {
      for (h = 0; h < n; h++)
        s.set(c, h, s.get(c, h) / this.Rdiag[c]);
      for (a = 0; a < c; a++)
        for (h = 0; h < n; h++)
          s.set(a, h, s.get(a, h) - s.get(c, h) * e.get(a, c));
    }
    return s.subMatrix(0, o - 1, 0, n - 1);
  }
  isFullRank() {
    let t = this.QR.columns;
    for (let e = 0; e < t; e++)
      if (this.Rdiag[e] === 0)
        return !1;
    return !0;
  }
  get upperTriangularMatrix() {
    let t = this.QR, e = t.columns, i = new R(e, e), n, s;
    for (n = 0; n < e; n++)
      for (s = 0; s < e; s++)
        n < s ? i.set(n, s, t.get(n, s)) : n === s ? i.set(n, s, this.Rdiag[n]) : i.set(n, s, 0);
    return i;
  }
  get orthogonalMatrix() {
    let t = this.QR, e = t.rows, i = t.columns, n = new R(e, i), s, o, a, h;
    for (a = i - 1; a >= 0; a--) {
      for (s = 0; s < e; s++)
        n.set(s, a, 0);
      for (n.set(a, a, 1), o = a; o < i; o++)
        if (t.get(a, a) !== 0) {
          for (h = 0, s = a; s < e; s++)
            h += t.get(s, a) * n.get(s, o);
          for (h = -h / t.get(a, a), s = a; s < e; s++)
            n.set(s, o, n.get(s, o) + h * t.get(s, a));
        }
    }
    return n;
  }
}
let xe = class {
  constructor(r, t = {}) {
    if (r = xt.checkMatrix(r), r.isEmpty())
      throw new Error("Matrix must be non-empty");
    let e = r.rows, i = r.columns;
    const {
      computeLeftSingularVectors: n = !0,
      computeRightSingularVectors: s = !0,
      autoTranspose: o = !1
    } = t;
    let a = !!n, h = !!s, c = !1, l;
    if (e < i)
      if (!o)
        l = r.clone(), console.warn(
          "Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose"
        );
      else {
        l = r.transpose(), e = l.rows, i = l.columns, c = !0;
        let d = a;
        a = h, h = d;
      }
    else
      l = r.clone();
    let u = Math.min(e, i), g = Math.min(e + 1, i), w = new Float64Array(g), y = new R(e, u), _ = new R(i, i), I = new Float64Array(i), v = new Float64Array(e), S = new Float64Array(g);
    for (let d = 0; d < g; d++)
      S[d] = d;
    let f = Math.min(e - 1, i), p = Math.max(0, Math.min(i - 2, e)), T = Math.max(f, p);
    for (let d = 0; d < T; d++) {
      if (d < f) {
        w[d] = 0;
        for (let x = d; x < e; x++)
          w[d] = Zt(w[d], l.get(x, d));
        if (w[d] !== 0) {
          l.get(d, d) < 0 && (w[d] = -w[d]);
          for (let x = d; x < e; x++)
            l.set(x, d, l.get(x, d) / w[d]);
          l.set(d, d, l.get(d, d) + 1);
        }
        w[d] = -w[d];
      }
      for (let x = d + 1; x < i; x++) {
        if (d < f && w[d] !== 0) {
          let M = 0;
          for (let b = d; b < e; b++)
            M += l.get(b, d) * l.get(b, x);
          M = -M / l.get(d, d);
          for (let b = d; b < e; b++)
            l.set(b, x, l.get(b, x) + M * l.get(b, d));
        }
        I[x] = l.get(d, x);
      }
      if (a && d < f)
        for (let x = d; x < e; x++)
          y.set(x, d, l.get(x, d));
      if (d < p) {
        I[d] = 0;
        for (let x = d + 1; x < i; x++)
          I[d] = Zt(I[d], I[x]);
        if (I[d] !== 0) {
          I[d + 1] < 0 && (I[d] = 0 - I[d]);
          for (let x = d + 1; x < i; x++)
            I[x] /= I[d];
          I[d + 1] += 1;
        }
        if (I[d] = -I[d], d + 1 < e && I[d] !== 0) {
          for (let x = d + 1; x < e; x++)
            v[x] = 0;
          for (let x = d + 1; x < e; x++)
            for (let M = d + 1; M < i; M++)
              v[x] += I[M] * l.get(x, M);
          for (let x = d + 1; x < i; x++) {
            let M = -I[x] / I[d + 1];
            for (let b = d + 1; b < e; b++)
              l.set(b, x, l.get(b, x) + M * v[b]);
          }
        }
        if (h)
          for (let x = d + 1; x < i; x++)
            _.set(x, d, I[x]);
      }
    }
    let A = Math.min(i, e + 1);
    if (f < i && (w[f] = l.get(f, f)), e < A && (w[A - 1] = 0), p + 1 < A && (I[p] = l.get(p, A - 1)), I[A - 1] = 0, a) {
      for (let d = f; d < u; d++) {
        for (let x = 0; x < e; x++)
          y.set(x, d, 0);
        y.set(d, d, 1);
      }
      for (let d = f - 1; d >= 0; d--)
        if (w[d] !== 0) {
          for (let x = d + 1; x < u; x++) {
            let M = 0;
            for (let b = d; b < e; b++)
              M += y.get(b, d) * y.get(b, x);
            M = -M / y.get(d, d);
            for (let b = d; b < e; b++)
              y.set(b, x, y.get(b, x) + M * y.get(b, d));
          }
          for (let x = d; x < e; x++)
            y.set(x, d, -y.get(x, d));
          y.set(d, d, 1 + y.get(d, d));
          for (let x = 0; x < d - 1; x++)
            y.set(x, d, 0);
        } else {
          for (let x = 0; x < e; x++)
            y.set(x, d, 0);
          y.set(d, d, 1);
        }
    }
    if (h)
      for (let d = i - 1; d >= 0; d--) {
        if (d < p && I[d] !== 0)
          for (let x = d + 1; x < i; x++) {
            let M = 0;
            for (let b = d + 1; b < i; b++)
              M += _.get(b, d) * _.get(b, x);
            M = -M / _.get(d + 1, d);
            for (let b = d + 1; b < i; b++)
              _.set(b, x, _.get(b, x) + M * _.get(b, d));
          }
        for (let x = 0; x < i; x++)
          _.set(x, d, 0);
        _.set(d, d, 1);
      }
    let C = A - 1, E = Number.EPSILON;
    for (; A > 0; ) {
      let d, x;
      for (d = A - 2; d >= -1 && d !== -1; d--) {
        const M = Number.MIN_VALUE + E * Math.abs(w[d] + Math.abs(w[d + 1]));
        if (Math.abs(I[d]) <= M || Number.isNaN(I[d])) {
          I[d] = 0;
          break;
        }
      }
      if (d === A - 2)
        x = 4;
      else {
        let M;
        for (M = A - 1; M >= d && M !== d; M--) {
          let b = (M !== A ? Math.abs(I[M]) : 0) + (M !== d + 1 ? Math.abs(I[M - 1]) : 0);
          if (Math.abs(w[M]) <= E * b) {
            w[M] = 0;
            break;
          }
        }
        M === d ? x = 3 : M === A - 1 ? x = 1 : (x = 2, d = M);
      }
      switch (d++, x) {
        case 1: {
          let M = I[A - 2];
          I[A - 2] = 0;
          for (let b = A - 2; b >= d; b--) {
            let Z = Zt(w[b], M), Y = w[b] / Z, H = M / Z;
            if (w[b] = Z, b !== d && (M = -H * I[b - 1], I[b - 1] = Y * I[b - 1]), h)
              for (let V = 0; V < i; V++)
                Z = Y * _.get(V, b) + H * _.get(V, A - 1), _.set(V, A - 1, -H * _.get(V, b) + Y * _.get(V, A - 1)), _.set(V, b, Z);
          }
          break;
        }
        case 2: {
          let M = I[d - 1];
          I[d - 1] = 0;
          for (let b = d; b < A; b++) {
            let Z = Zt(w[b], M), Y = w[b] / Z, H = M / Z;
            if (w[b] = Z, M = -H * I[b], I[b] = Y * I[b], a)
              for (let V = 0; V < e; V++)
                Z = Y * y.get(V, b) + H * y.get(V, d - 1), y.set(V, d - 1, -H * y.get(V, b) + Y * y.get(V, d - 1)), y.set(V, b, Z);
          }
          break;
        }
        case 3: {
          const M = Math.max(
            Math.abs(w[A - 1]),
            Math.abs(w[A - 2]),
            Math.abs(I[A - 2]),
            Math.abs(w[d]),
            Math.abs(I[d])
          ), b = w[A - 1] / M, Z = w[A - 2] / M, Y = I[A - 2] / M, H = w[d] / M, V = I[d] / M, st = ((Z + b) * (Z - b) + Y * Y) / 2, ht = b * Y * (b * Y);
          let dt = 0;
          (st !== 0 || ht !== 0) && (st < 0 ? dt = 0 - Math.sqrt(st * st + ht) : dt = Math.sqrt(st * st + ht), dt = ht / (st + dt));
          let tt = (H + b) * (H - b) + dt, Tt = H * V;
          for (let U = d; U < A - 1; U++) {
            let it = Zt(tt, Tt);
            it === 0 && (it = Number.MIN_VALUE);
            let ft = tt / it, ct = Tt / it;
            if (U !== d && (I[U - 1] = it), tt = ft * w[U] + ct * I[U], I[U] = ft * I[U] - ct * w[U], Tt = ct * w[U + 1], w[U + 1] = ft * w[U + 1], h)
              for (let ot = 0; ot < i; ot++)
                it = ft * _.get(ot, U) + ct * _.get(ot, U + 1), _.set(ot, U + 1, -ct * _.get(ot, U) + ft * _.get(ot, U + 1)), _.set(ot, U, it);
            if (it = Zt(tt, Tt), it === 0 && (it = Number.MIN_VALUE), ft = tt / it, ct = Tt / it, w[U] = it, tt = ft * I[U] + ct * w[U + 1], w[U + 1] = -ct * I[U] + ft * w[U + 1], Tt = ct * I[U + 1], I[U + 1] = ft * I[U + 1], a && U < e - 1)
              for (let ot = 0; ot < e; ot++)
                it = ft * y.get(ot, U) + ct * y.get(ot, U + 1), y.set(ot, U + 1, -ct * y.get(ot, U) + ft * y.get(ot, U + 1)), y.set(ot, U, it);
          }
          I[A - 2] = tt;
          break;
        }
        case 4: {
          if (w[d] <= 0 && (w[d] = w[d] < 0 ? -w[d] : 0, h))
            for (let M = 0; M <= C; M++)
              _.set(M, d, -_.get(M, d));
          for (; d < C && !(w[d] >= w[d + 1]); ) {
            let M = w[d];
            if (w[d] = w[d + 1], w[d + 1] = M, h && d < i - 1)
              for (let b = 0; b < i; b++)
                M = _.get(b, d + 1), _.set(b, d + 1, _.get(b, d)), _.set(b, d, M);
            if (a && d < e - 1)
              for (let b = 0; b < e; b++)
                M = y.get(b, d + 1), y.set(b, d + 1, y.get(b, d)), y.set(b, d, M);
            d++;
          }
          A--;
          break;
        }
      }
    }
    if (c) {
      let d = _;
      _ = y, y = d;
    }
    this.m = e, this.n = i, this.s = w, this.U = y, this.V = _;
  }
  solve(r) {
    let t = r, e = this.threshold, i = this.s.length, n = R.zeros(i, i);
    for (let u = 0; u < i; u++)
      Math.abs(this.s[u]) <= e ? n.set(u, u, 0) : n.set(u, u, 1 / this.s[u]);
    let s = this.U, o = this.rightSingularVectors, a = o.mmul(n), h = o.rows, c = s.rows, l = R.zeros(h, c);
    for (let u = 0; u < h; u++)
      for (let g = 0; g < c; g++) {
        let w = 0;
        for (let y = 0; y < i; y++)
          w += a.get(u, y) * s.get(g, y);
        l.set(u, g, w);
      }
    return l.mmul(t);
  }
  solveForDiagonal(r) {
    return this.solve(R.diag(r));
  }
  inverse() {
    let r = this.V, t = this.threshold, e = r.rows, i = r.columns, n = new R(e, this.s.length);
    for (let c = 0; c < e; c++)
      for (let l = 0; l < i; l++)
        Math.abs(this.s[l]) > t && n.set(c, l, r.get(c, l) / this.s[l]);
    let s = this.U, o = s.rows, a = s.columns, h = new R(e, o);
    for (let c = 0; c < e; c++)
      for (let l = 0; l < o; l++) {
        let u = 0;
        for (let g = 0; g < a; g++)
          u += n.get(c, g) * s.get(l, g);
        h.set(c, l, u);
      }
    return h;
  }
  get condition() {
    return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
  }
  get norm2() {
    return this.s[0];
  }
  get rank() {
    let r = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON, t = 0, e = this.s;
    for (let i = 0, n = e.length; i < n; i++)
      e[i] > r && t++;
    return t;
  }
  get diagonal() {
    return Array.from(this.s);
  }
  get threshold() {
    return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
  }
  get leftSingularVectors() {
    return this.U;
  }
  get rightSingularVectors() {
    return this.V;
  }
  get diagonalMatrix() {
    return R.diag(this.s);
  }
};
function Rc(r, t = !1) {
  return r = xt.checkMatrix(r), t ? new xe(r).inverse() : ks(r, R.eye(r.rows));
}
function ks(r, t, e = !1) {
  return r = xt.checkMatrix(r), t = xt.checkMatrix(t), e ? new xe(r).solve(t) : r.isSquare() ? new Yr(r).solve(t) : new zi(r).solve(t);
}
function br(r) {
  if (r = R.checkMatrix(r), r.isSquare()) {
    if (r.columns === 0)
      return 1;
    let t, e, i, n;
    if (r.columns === 2)
      return t = r.get(0, 0), e = r.get(0, 1), i = r.get(1, 0), n = r.get(1, 1), t * n - e * i;
    if (r.columns === 3) {
      let s, o, a;
      return s = new Tr(r, [1, 2], [1, 2]), o = new Tr(r, [1, 2], [0, 2]), a = new Tr(r, [1, 2], [0, 1]), t = r.get(0, 0), e = r.get(0, 1), i = r.get(0, 2), t * br(s) - e * br(o) + i * br(a);
    } else
      return new Yr(r).determinant;
  } else
    throw Error("determinant can only be calculated for a square matrix");
}
function kc(r, t) {
  let e = [];
  for (let i = 0; i < r; i++)
    i !== t && e.push(i);
  return e;
}
function Oc(r, t, e, i = 1e-9, n = 1e-9) {
  if (r > n)
    return new Array(t.rows + 1).fill(0);
  {
    let s = t.addRow(e, [0]);
    for (let o = 0; o < s.rows; o++)
      Math.abs(s.get(o, 0)) < i && s.set(o, 0, 0);
    return s.to1DArray();
  }
}
function Nc(r, t = {}) {
  const { thresholdValue: e = 1e-9, thresholdError: i = 1e-9 } = t;
  r = R.checkMatrix(r);
  let n = r.rows, s = new R(n, n);
  for (let o = 0; o < n; o++) {
    let a = R.columnVector(r.getRow(o)), h = r.subMatrixRow(kc(n, o)).transpose(), c = new xe(h).solve(a), l = R.sub(a, h.mmul(c)).abs().max();
    s.setRow(
      o,
      Oc(l, c, o, e, i)
    );
  }
  return s;
}
function Lc(r, t = Number.EPSILON) {
  if (r = R.checkMatrix(r), r.isEmpty())
    return r.transpose();
  let e = new xe(r, { autoTranspose: !0 }), i = e.leftSingularVectors, n = e.rightSingularVectors, s = e.diagonal;
  for (let o = 0; o < s.length; o++)
    Math.abs(s[o]) > t ? s[o] = 1 / s[o] : s[o] = 0;
  return n.mmul(R.diag(s).mmul(i.transpose()));
}
function jc(r, t = r, e = {}) {
  r = new R(r);
  let i = !1;
  if (typeof t == "object" && !R.isMatrix(t) && !wt.isAnyArray(t) ? (e = t, t = r, i = !0) : t = new R(t), r.rows !== t.rows)
    throw new TypeError("Both matrices must have the same number of rows");
  const { center: n = !0 } = e;
  n && (r = r.center("column"), i || (t = t.center("column")));
  const s = r.transpose().mmul(t);
  for (let o = 0; o < s.rows; o++)
    for (let a = 0; a < s.columns; a++)
      s.set(o, a, s.get(o, a) * (1 / (r.rows - 1)));
  return s;
}
function Bc(r, t = r, e = {}) {
  r = new R(r);
  let i = !1;
  if (typeof t == "object" && !R.isMatrix(t) && !wt.isAnyArray(t) ? (e = t, t = r, i = !0) : t = new R(t), r.rows !== t.rows)
    throw new TypeError("Both matrices must have the same number of rows");
  const { center: n = !0, scale: s = !0 } = e;
  n && (r.center("column"), i || t.center("column")), s && (r.scale("column"), i || t.scale("column"));
  const o = r.standardDeviation("column", { unbiased: !0 }), a = i ? o : t.standardDeviation("column", { unbiased: !0 }), h = r.transpose().mmul(t);
  for (let c = 0; c < h.rows; c++)
    for (let l = 0; l < h.columns; l++)
      h.set(
        c,
        l,
        h.get(c, l) * (1 / (o[c] * a[l])) * (1 / (r.rows - 1))
      );
  return h;
}
class Os {
  constructor(t, e = {}) {
    const { assumeSymmetric: i = !1 } = e;
    if (t = xt.checkMatrix(t), !t.isSquare())
      throw new Error("Matrix is not a square matrix");
    if (t.isEmpty())
      throw new Error("Matrix must be non-empty");
    let n = t.columns, s = new R(n, n), o = new Float64Array(n), a = new Float64Array(n), h = t, c, l, u = !1;
    if (i ? u = !0 : u = t.isSymmetric(), u) {
      for (c = 0; c < n; c++)
        for (l = 0; l < n; l++)
          s.set(c, l, h.get(c, l));
      Dc(n, a, o, s), Gc(n, a, o, s);
    } else {
      let g = new R(n, n), w = new Float64Array(n);
      for (l = 0; l < n; l++)
        for (c = 0; c < n; c++)
          g.set(c, l, h.get(c, l));
      Fc(n, g, w, s), Uc(n, a, o, s, g);
    }
    this.n = n, this.e = a, this.d = o, this.V = s;
  }
  get realEigenvalues() {
    return Array.from(this.d);
  }
  get imaginaryEigenvalues() {
    return Array.from(this.e);
  }
  get eigenvectorMatrix() {
    return this.V;
  }
  get diagonalMatrix() {
    let t = this.n, e = this.e, i = this.d, n = new R(t, t), s, o;
    for (s = 0; s < t; s++) {
      for (o = 0; o < t; o++)
        n.set(s, o, 0);
      n.set(s, s, i[s]), e[s] > 0 ? n.set(s, s + 1, e[s]) : e[s] < 0 && n.set(s, s - 1, e[s]);
    }
    return n;
  }
}
function Dc(r, t, e, i) {
  let n, s, o, a, h, c, l, u;
  for (h = 0; h < r; h++)
    e[h] = i.get(r - 1, h);
  for (a = r - 1; a > 0; a--) {
    for (u = 0, o = 0, c = 0; c < a; c++)
      u = u + Math.abs(e[c]);
    if (u === 0)
      for (t[a] = e[a - 1], h = 0; h < a; h++)
        e[h] = i.get(a - 1, h), i.set(a, h, 0), i.set(h, a, 0);
    else {
      for (c = 0; c < a; c++)
        e[c] /= u, o += e[c] * e[c];
      for (n = e[a - 1], s = Math.sqrt(o), n > 0 && (s = -s), t[a] = u * s, o = o - n * s, e[a - 1] = n - s, h = 0; h < a; h++)
        t[h] = 0;
      for (h = 0; h < a; h++) {
        for (n = e[h], i.set(h, a, n), s = t[h] + i.get(h, h) * n, c = h + 1; c <= a - 1; c++)
          s += i.get(c, h) * e[c], t[c] += i.get(c, h) * n;
        t[h] = s;
      }
      for (n = 0, h = 0; h < a; h++)
        t[h] /= o, n += t[h] * e[h];
      for (l = n / (o + o), h = 0; h < a; h++)
        t[h] -= l * e[h];
      for (h = 0; h < a; h++) {
        for (n = e[h], s = t[h], c = h; c <= a - 1; c++)
          i.set(c, h, i.get(c, h) - (n * t[c] + s * e[c]));
        e[h] = i.get(a - 1, h), i.set(a, h, 0);
      }
    }
    e[a] = o;
  }
  for (a = 0; a < r - 1; a++) {
    if (i.set(r - 1, a, i.get(a, a)), i.set(a, a, 1), o = e[a + 1], o !== 0) {
      for (c = 0; c <= a; c++)
        e[c] = i.get(c, a + 1) / o;
      for (h = 0; h <= a; h++) {
        for (s = 0, c = 0; c <= a; c++)
          s += i.get(c, a + 1) * i.get(c, h);
        for (c = 0; c <= a; c++)
          i.set(c, h, i.get(c, h) - s * e[c]);
      }
    }
    for (c = 0; c <= a; c++)
      i.set(c, a + 1, 0);
  }
  for (h = 0; h < r; h++)
    e[h] = i.get(r - 1, h), i.set(r - 1, h, 0);
  i.set(r - 1, r - 1, 1), t[0] = 0;
}
function Gc(r, t, e, i) {
  let n, s, o, a, h, c, l, u, g, w, y, _, I, v, S, f;
  for (o = 1; o < r; o++)
    t[o - 1] = t[o];
  t[r - 1] = 0;
  let p = 0, T = 0, A = Number.EPSILON;
  for (c = 0; c < r; c++) {
    for (T = Math.max(T, Math.abs(e[c]) + Math.abs(t[c])), l = c; l < r && !(Math.abs(t[l]) <= A * T); )
      l++;
    if (l > c)
      do {
        for (n = e[c], u = (e[c + 1] - n) / (2 * t[c]), g = Zt(u, 1), u < 0 && (g = -g), e[c] = t[c] / (u + g), e[c + 1] = t[c] * (u + g), w = e[c + 1], s = n - e[c], o = c + 2; o < r; o++)
          e[o] -= s;
        for (p = p + s, u = e[l], y = 1, _ = y, I = y, v = t[c + 1], S = 0, f = 0, o = l - 1; o >= c; o--)
          for (I = _, _ = y, f = S, n = y * t[o], s = y * u, g = Zt(u, t[o]), t[o + 1] = S * g, S = t[o] / g, y = u / g, u = y * e[o] - S * n, e[o + 1] = s + S * (y * n + S * e[o]), h = 0; h < r; h++)
            s = i.get(h, o + 1), i.set(h, o + 1, S * i.get(h, o) + y * s), i.set(h, o, y * i.get(h, o) - S * s);
        u = -S * f * I * v * t[c] / w, t[c] = S * u, e[c] = y * u;
      } while (Math.abs(t[c]) > A * T);
    e[c] = e[c] + p, t[c] = 0;
  }
  for (o = 0; o < r - 1; o++) {
    for (h = o, u = e[o], a = o + 1; a < r; a++)
      e[a] < u && (h = a, u = e[a]);
    if (h !== o)
      for (e[h] = e[o], e[o] = u, a = 0; a < r; a++)
        u = i.get(a, o), i.set(a, o, i.get(a, h)), i.set(a, h, u);
  }
}
function Fc(r, t, e, i) {
  let n = 0, s = r - 1, o, a, h, c, l, u, g;
  for (u = n + 1; u <= s - 1; u++) {
    for (g = 0, c = u; c <= s; c++)
      g = g + Math.abs(t.get(c, u - 1));
    if (g !== 0) {
      for (h = 0, c = s; c >= u; c--)
        e[c] = t.get(c, u - 1) / g, h += e[c] * e[c];
      for (a = Math.sqrt(h), e[u] > 0 && (a = -a), h = h - e[u] * a, e[u] = e[u] - a, l = u; l < r; l++) {
        for (o = 0, c = s; c >= u; c--)
          o += e[c] * t.get(c, l);
        for (o = o / h, c = u; c <= s; c++)
          t.set(c, l, t.get(c, l) - o * e[c]);
      }
      for (c = 0; c <= s; c++) {
        for (o = 0, l = s; l >= u; l--)
          o += e[l] * t.get(c, l);
        for (o = o / h, l = u; l <= s; l++)
          t.set(c, l, t.get(c, l) - o * e[l]);
      }
      e[u] = g * e[u], t.set(u, u - 1, g * a);
    }
  }
  for (c = 0; c < r; c++)
    for (l = 0; l < r; l++)
      i.set(c, l, c === l ? 1 : 0);
  for (u = s - 1; u >= n + 1; u--)
    if (t.get(u, u - 1) !== 0) {
      for (c = u + 1; c <= s; c++)
        e[c] = t.get(c, u - 1);
      for (l = u; l <= s; l++) {
        for (a = 0, c = u; c <= s; c++)
          a += e[c] * i.get(c, l);
        for (a = a / e[u] / t.get(u, u - 1), c = u; c <= s; c++)
          i.set(c, l, i.get(c, l) + a * e[c]);
      }
    }
}
function Uc(r, t, e, i, n) {
  let s = r - 1, o = 0, a = r - 1, h = Number.EPSILON, c = 0, l = 0, u = 0, g = 0, w = 0, y = 0, _ = 0, I = 0, v, S, f, p, T, A, C, E, d, x, M, b, Z, Y, H;
  for (v = 0; v < r; v++)
    for ((v < o || v > a) && (e[v] = n.get(v, v), t[v] = 0), S = Math.max(v - 1, 0); S < r; S++)
      l = l + Math.abs(n.get(v, S));
  for (; s >= o; ) {
    for (p = s; p > o && (y = Math.abs(n.get(p - 1, p - 1)) + Math.abs(n.get(p, p)), y === 0 && (y = l), !(Math.abs(n.get(p, p - 1)) < h * y)); )
      p--;
    if (p === s)
      n.set(s, s, n.get(s, s) + c), e[s] = n.get(s, s), t[s] = 0, s--, I = 0;
    else if (p === s - 1) {
      if (C = n.get(s, s - 1) * n.get(s - 1, s), u = (n.get(s - 1, s - 1) - n.get(s, s)) / 2, g = u * u + C, _ = Math.sqrt(Math.abs(g)), n.set(s, s, n.get(s, s) + c), n.set(s - 1, s - 1, n.get(s - 1, s - 1) + c), E = n.get(s, s), g >= 0) {
        for (_ = u >= 0 ? u + _ : u - _, e[s - 1] = E + _, e[s] = e[s - 1], _ !== 0 && (e[s] = E - C / _), t[s - 1] = 0, t[s] = 0, E = n.get(s, s - 1), y = Math.abs(E) + Math.abs(_), u = E / y, g = _ / y, w = Math.sqrt(u * u + g * g), u = u / w, g = g / w, S = s - 1; S < r; S++)
          _ = n.get(s - 1, S), n.set(s - 1, S, g * _ + u * n.get(s, S)), n.set(s, S, g * n.get(s, S) - u * _);
        for (v = 0; v <= s; v++)
          _ = n.get(v, s - 1), n.set(v, s - 1, g * _ + u * n.get(v, s)), n.set(v, s, g * n.get(v, s) - u * _);
        for (v = o; v <= a; v++)
          _ = i.get(v, s - 1), i.set(v, s - 1, g * _ + u * i.get(v, s)), i.set(v, s, g * i.get(v, s) - u * _);
      } else
        e[s - 1] = E + u, e[s] = E + u, t[s - 1] = _, t[s] = -_;
      s = s - 2, I = 0;
    } else {
      if (E = n.get(s, s), d = 0, C = 0, p < s && (d = n.get(s - 1, s - 1), C = n.get(s, s - 1) * n.get(s - 1, s)), I === 10) {
        for (c += E, v = o; v <= s; v++)
          n.set(v, v, n.get(v, v) - E);
        y = Math.abs(n.get(s, s - 1)) + Math.abs(n.get(s - 1, s - 2)), E = d = 0.75 * y, C = -0.4375 * y * y;
      }
      if (I === 30 && (y = (d - E) / 2, y = y * y + C, y > 0)) {
        for (y = Math.sqrt(y), d < E && (y = -y), y = E - C / ((d - E) / 2 + y), v = o; v <= s; v++)
          n.set(v, v, n.get(v, v) - y);
        c += y, E = d = C = 0.964;
      }
      for (I = I + 1, T = s - 2; T >= p && (_ = n.get(T, T), w = E - _, y = d - _, u = (w * y - C) / n.get(T + 1, T) + n.get(T, T + 1), g = n.get(T + 1, T + 1) - _ - w - y, w = n.get(T + 2, T + 1), y = Math.abs(u) + Math.abs(g) + Math.abs(w), u = u / y, g = g / y, w = w / y, !(T === p || Math.abs(n.get(T, T - 1)) * (Math.abs(g) + Math.abs(w)) < h * (Math.abs(u) * (Math.abs(n.get(T - 1, T - 1)) + Math.abs(_) + Math.abs(n.get(T + 1, T + 1)))))); )
        T--;
      for (v = T + 2; v <= s; v++)
        n.set(v, v - 2, 0), v > T + 2 && n.set(v, v - 3, 0);
      for (f = T; f <= s - 1 && (Y = f !== s - 1, f !== T && (u = n.get(f, f - 1), g = n.get(f + 1, f - 1), w = Y ? n.get(f + 2, f - 1) : 0, E = Math.abs(u) + Math.abs(g) + Math.abs(w), E !== 0 && (u = u / E, g = g / E, w = w / E)), E !== 0); f++)
        if (y = Math.sqrt(u * u + g * g + w * w), u < 0 && (y = -y), y !== 0) {
          for (f !== T ? n.set(f, f - 1, -y * E) : p !== T && n.set(f, f - 1, -n.get(f, f - 1)), u = u + y, E = u / y, d = g / y, _ = w / y, g = g / u, w = w / u, S = f; S < r; S++)
            u = n.get(f, S) + g * n.get(f + 1, S), Y && (u = u + w * n.get(f + 2, S), n.set(f + 2, S, n.get(f + 2, S) - u * _)), n.set(f, S, n.get(f, S) - u * E), n.set(f + 1, S, n.get(f + 1, S) - u * d);
          for (v = 0; v <= Math.min(s, f + 3); v++)
            u = E * n.get(v, f) + d * n.get(v, f + 1), Y && (u = u + _ * n.get(v, f + 2), n.set(v, f + 2, n.get(v, f + 2) - u * w)), n.set(v, f, n.get(v, f) - u), n.set(v, f + 1, n.get(v, f + 1) - u * g);
          for (v = o; v <= a; v++)
            u = E * i.get(v, f) + d * i.get(v, f + 1), Y && (u = u + _ * i.get(v, f + 2), i.set(v, f + 2, i.get(v, f + 2) - u * w)), i.set(v, f, i.get(v, f) - u), i.set(v, f + 1, i.get(v, f + 1) - u * g);
        }
    }
  }
  if (l !== 0) {
    for (s = r - 1; s >= 0; s--)
      if (u = e[s], g = t[s], g === 0)
        for (p = s, n.set(s, s, 1), v = s - 1; v >= 0; v--) {
          for (C = n.get(v, v) - u, w = 0, S = p; S <= s; S++)
            w = w + n.get(v, S) * n.get(S, s);
          if (t[v] < 0)
            _ = C, y = w;
          else if (p = v, t[v] === 0 ? n.set(v, s, C !== 0 ? -w / C : -w / (h * l)) : (E = n.get(v, v + 1), d = n.get(v + 1, v), g = (e[v] - u) * (e[v] - u) + t[v] * t[v], A = (E * y - _ * w) / g, n.set(v, s, A), n.set(
            v + 1,
            s,
            Math.abs(E) > Math.abs(_) ? (-w - C * A) / E : (-y - d * A) / _
          )), A = Math.abs(n.get(v, s)), h * A * A > 1)
            for (S = v; S <= s; S++)
              n.set(S, s, n.get(S, s) / A);
        }
      else if (g < 0)
        for (p = s - 1, Math.abs(n.get(s, s - 1)) > Math.abs(n.get(s - 1, s)) ? (n.set(s - 1, s - 1, g / n.get(s, s - 1)), n.set(s - 1, s, -(n.get(s, s) - u) / n.get(s, s - 1))) : (H = ur(0, -n.get(s - 1, s), n.get(s - 1, s - 1) - u, g), n.set(s - 1, s - 1, H[0]), n.set(s - 1, s, H[1])), n.set(s, s - 1, 0), n.set(s, s, 1), v = s - 2; v >= 0; v--) {
          for (x = 0, M = 0, S = p; S <= s; S++)
            x = x + n.get(v, S) * n.get(S, s - 1), M = M + n.get(v, S) * n.get(S, s);
          if (C = n.get(v, v) - u, t[v] < 0)
            _ = C, w = x, y = M;
          else if (p = v, t[v] === 0 ? (H = ur(-x, -M, C, g), n.set(v, s - 1, H[0]), n.set(v, s, H[1])) : (E = n.get(v, v + 1), d = n.get(v + 1, v), b = (e[v] - u) * (e[v] - u) + t[v] * t[v] - g * g, Z = (e[v] - u) * 2 * g, b === 0 && Z === 0 && (b = h * l * (Math.abs(C) + Math.abs(g) + Math.abs(E) + Math.abs(d) + Math.abs(_))), H = ur(
            E * w - _ * x + g * M,
            E * y - _ * M - g * x,
            b,
            Z
          ), n.set(v, s - 1, H[0]), n.set(v, s, H[1]), Math.abs(E) > Math.abs(_) + Math.abs(g) ? (n.set(
            v + 1,
            s - 1,
            (-x - C * n.get(v, s - 1) + g * n.get(v, s)) / E
          ), n.set(
            v + 1,
            s,
            (-M - C * n.get(v, s) - g * n.get(v, s - 1)) / E
          )) : (H = ur(
            -w - d * n.get(v, s - 1),
            -y - d * n.get(v, s),
            _,
            g
          ), n.set(v + 1, s - 1, H[0]), n.set(v + 1, s, H[1]))), A = Math.max(Math.abs(n.get(v, s - 1)), Math.abs(n.get(v, s))), h * A * A > 1)
            for (S = v; S <= s; S++)
              n.set(S, s - 1, n.get(S, s - 1) / A), n.set(S, s, n.get(S, s) / A);
        }
    for (v = 0; v < r; v++)
      if (v < o || v > a)
        for (S = v; S < r; S++)
          i.set(v, S, n.get(v, S));
    for (S = r - 1; S >= o; S--)
      for (v = o; v <= a; v++) {
        for (_ = 0, f = o; f <= Math.min(S, a); f++)
          _ = _ + i.get(v, f) * n.get(f, S);
        i.set(v, S, _);
      }
  }
}
function ur(r, t, e, i) {
  let n, s;
  return Math.abs(e) > Math.abs(i) ? (n = i / e, s = e + n * i, [(r + n * t) / s, (t - n * r) / s]) : (n = e / i, s = i + n * e, [(n * r + t) / s, (n * t - r) / s]);
}
class Ns {
  constructor(t) {
    if (t = xt.checkMatrix(t), !t.isSymmetric())
      throw new Error("Matrix is not symmetric");
    let e = t, i = e.rows, n = new R(i, i), s = !0, o, a, h;
    for (a = 0; a < i; a++) {
      let c = 0;
      for (h = 0; h < a; h++) {
        let l = 0;
        for (o = 0; o < h; o++)
          l += n.get(h, o) * n.get(a, o);
        l = (e.get(a, h) - l) / n.get(h, h), n.set(a, h, l), c = c + l * l;
      }
      for (c = e.get(a, a) - c, s &= c > 0, n.set(a, a, Math.sqrt(Math.max(c, 0))), h = a + 1; h < i; h++)
        n.set(a, h, 0);
    }
    this.L = n, this.positiveDefinite = !!s;
  }
  isPositiveDefinite() {
    return this.positiveDefinite;
  }
  solve(t) {
    t = xt.checkMatrix(t);
    let e = this.L, i = e.rows;
    if (t.rows !== i)
      throw new Error("Matrix dimensions do not match");
    if (this.isPositiveDefinite() === !1)
      throw new Error("Matrix is not positive definite");
    let n = t.columns, s = t.clone(), o, a, h;
    for (h = 0; h < i; h++)
      for (a = 0; a < n; a++) {
        for (o = 0; o < h; o++)
          s.set(h, a, s.get(h, a) - s.get(o, a) * e.get(h, o));
        s.set(h, a, s.get(h, a) / e.get(h, h));
      }
    for (h = i - 1; h >= 0; h--)
      for (a = 0; a < n; a++) {
        for (o = h + 1; o < i; o++)
          s.set(h, a, s.get(h, a) - s.get(o, a) * e.get(o, h));
        s.set(h, a, s.get(h, a) / e.get(h, h));
      }
    return s;
  }
  get lowerTriangularMatrix() {
    return this.L;
  }
}
class Ls {
  constructor(t, e = {}) {
    t = xt.checkMatrix(t);
    let { Y: i } = e;
    const {
      scaleScores: n = !1,
      maxIterations: s = 1e3,
      terminationCriteria: o = 1e-10
    } = e;
    let a;
    if (i) {
      if (wt.isAnyArray(i) && typeof i[0] == "number" ? i = R.columnVector(i) : i = xt.checkMatrix(i), i.rows !== t.rows)
        throw new Error("Y should have the same number of rows as X");
      a = i.getColumnVector(0);
    } else
      a = t.getColumnVector(0);
    let h = 1, c, l, u, g;
    for (let w = 0; w < s && h > o; w++)
      u = t.transpose().mmul(a).div(a.transpose().mmul(a).get(0, 0)), u = u.div(u.norm()), c = t.mmul(u).div(u.transpose().mmul(u).get(0, 0)), w > 0 && (h = c.clone().sub(g).pow(2).sum()), g = c.clone(), i ? (l = i.transpose().mmul(c).div(c.transpose().mmul(c).get(0, 0)), l = l.div(l.norm()), a = i.mmul(l).div(l.transpose().mmul(l).get(0, 0))) : a = c;
    if (i) {
      let w = t.transpose().mmul(c).div(c.transpose().mmul(c).get(0, 0));
      w = w.div(w.norm());
      let y = t.clone().sub(c.clone().mmul(w.transpose())), _ = a.transpose().mmul(c).div(c.transpose().mmul(c).get(0, 0)), I = i.clone().sub(
        c.clone().mulS(_.get(0, 0)).mmul(l.transpose())
      );
      this.t = c, this.p = w.transpose(), this.w = u.transpose(), this.q = l, this.u = a, this.s = c.transpose().mmul(c), this.xResidual = y, this.yResidual = I, this.betas = _;
    } else
      this.w = u.transpose(), this.s = c.transpose().mmul(c).sqrt(), n ? this.t = c.clone().div(this.s.get(0, 0)) : this.t = c, this.xResidual = t.sub(c.mmul(u.transpose()));
  }
}
X.AbstractMatrix = G;
X.CHO = Ns;
X.CholeskyDecomposition = Ns;
X.DistanceMatrix = Hr;
X.EVD = Os;
X.EigenvalueDecomposition = Os;
X.LU = Yr;
X.LuDecomposition = Yr;
var Wc = X.Matrix = R;
X.MatrixColumnSelectionView = Mc;
X.MatrixColumnView = bc;
X.MatrixFlipColumnView = _c;
X.MatrixFlipRowView = Ec;
X.MatrixRowSelectionView = Sc;
X.MatrixRowView = Ic;
X.MatrixSelectionView = Tr;
X.MatrixSubView = Ac;
X.MatrixTransposeView = Pc;
X.NIPALS = Ls;
X.Nipals = Ls;
X.QR = zi;
X.QrDecomposition = zi;
X.SVD = xe;
var Vc = X.SingularValueDecomposition = xe;
X.SymmetricMatrix = Ce;
X.WrapperMatrix1D = Rs;
X.WrapperMatrix2D = xt;
X.correlation = Bc;
X.covariance = jc;
var In = X.default = R;
X.determinant = br;
var zc = X.inverse = Rc;
X.linearDependencies = Nc;
var Zc = X.pseudoInverse = Lc;
X.solve = ks;
X.wrap = Cc;
const _t = Wc, $c = Vc;
In.Matrix && In.Matrix;
const qc = zc, js = Zc;
class Bs {
  constructor(t, e) {
    if (this.sourcePoints = t, this.destinationPoints = e, this.pointCount = this.sourcePoints.length, this.pointCount < 2)
      throw new Error(
        "Not enough control points. A helmert transformation requires a minimum of 2 points, but " + this.pointCount + " are given."
      );
    const i = _t.columnVector(
      e.flat()
    ), n = _t.zeros(2 * this.pointCount, 4);
    for (let o = 0; o < this.pointCount; o++)
      n.set(2 * o, 0, 1), n.set(2 * o, 1, 0), n.set(2 * o, 2, t[o][0]), n.set(2 * o, 3, -t[o][1]), n.set(2 * o + 1, 0, 0), n.set(2 * o + 1, 1, 1), n.set(2 * o + 1, 2, t[o][1]), n.set(2 * o + 1, 3, t[o][0]);
    const s = js(n);
    this.helmertParametersMatrix = s.mmul(
      i
    ), this.helmertParameters = this.helmertParametersMatrix.to1DArray(), this.scale = Math.sqrt(
      this.helmertParameters[2] ** 2 + this.helmertParameters[3] ** 2
    ), this.rotation = Math.atan2(
      this.helmertParameters[3],
      this.helmertParameters[2]
    ), this.translation = [this.helmertParameters[0], this.helmertParameters[1]];
  }
  // The interpolant function will compute the value at any point.
  interpolate(t) {
    if (!this.helmertParameters)
      throw new Error("Helmert parameters not computed");
    return [
      this.helmertParameters[0] + this.helmertParameters[2] * t[0] - this.helmertParameters[3] * t[1],
      this.helmertParameters[1] + this.helmertParameters[2] * t[1] + this.helmertParameters[3] * t[0]
    ];
  }
}
class Xc {
  constructor(t, e, i) {
    if (this.sourcePoints = t, this.destinationPoints = e, this.options = i, this.pointCount = this.sourcePoints.length, this.pointCount < 2)
      throw new Error(
        "Not enough control points. A straight transformation requires a minimum of 2 points, but " + this.pointCount + " are given."
      );
    const n = new Bs(t, e);
    if (this.scale = n.scale, !this.scale)
      throw new Error("Scale could not be computed");
    this.sourcePointsCenter = this.sourcePoints.reduce((o, a) => [o[0] + a[0], o[1] + a[1]]).map((o) => o / this.pointCount), this.destinationPointsCenter = this.destinationPoints.reduce((o, a) => [o[0] + a[0], o[1] + a[1]]).map((o) => o / this.pointCount);
    const s = this.scale;
    this.translation = this.destinationPointsCenter.map(
      (o, a) => o - this.sourcePointsCenter[a] * s
    );
  }
  // The interpolant function will compute the value at any point.
  interpolate(t) {
    if (!this.scale || !this.translation)
      throw new Error("Straight parameters not computed");
    return [
      this.translation[0] + this.scale * t[0],
      this.translation[1] + this.scale * t[1]
    ];
  }
}
class ci {
  constructor(t, e, i) {
    if (this.sourcePoints = t, this.destinationPoints = e, this.pointCount = this.sourcePoints.length, this.order = i || 1, this.nCoefs = (this.order + 1) * (this.order + 2) / 2, this.pointCount < this.nCoefs)
      throw new Error(
        "Not enough control points. A polynomial transformation of order " + this.order + " requires a minimum of " + this.nCoefs + " points, but " + this.pointCount + " are given."
      );
    if (this.order < 1 || this.order > 3)
      throw new Error(
        "Only polynomial transformations of order 1, 2 or 3 are supported"
      );
    const n = [
      _t.columnVector(e.map((a) => a[0])),
      _t.columnVector(e.map((a) => a[1]))
    ], s = _t.zeros(this.pointCount, this.nCoefs);
    for (let a = 0; a < this.pointCount; a++)
      switch (this.order) {
        case 1:
          s.set(a, 0, 1), s.set(a, 1, t[a][0]), s.set(a, 2, t[a][1]);
          break;
        case 2:
          s.set(a, 0, 1), s.set(a, 1, t[a][0]), s.set(a, 2, t[a][1]), s.set(a, 3, t[a][0] ** 2), s.set(a, 4, t[a][1] ** 2), s.set(
            a,
            5,
            t[a][0] * t[a][1]
          );
          break;
        case 3:
          s.set(a, 0, 1), s.set(a, 1, t[a][0]), s.set(a, 2, t[a][1]), s.set(a, 3, t[a][0] ** 2), s.set(a, 4, t[a][1] ** 2), s.set(
            a,
            5,
            t[a][0] * t[a][1]
          ), s.set(a, 6, t[a][0] ** 3), s.set(a, 7, t[a][1] ** 3), s.set(
            a,
            8,
            t[a][0] ** 2 * t[a][1]
          ), s.set(
            a,
            9,
            t[a][0] * t[a][1] ** 2
          );
          break;
      }
    const o = js(
      s
    );
    this.polynomialParametersMatrices = [
      o.mmul(n[0]),
      o.mmul(n[1])
    ], this.polynomialParameters = this.polynomialParametersMatrices.map(
      (a) => a.to1DArray()
    );
  }
  // The interpolant function will compute the value at any point.
  interpolate(t) {
    if (!this.polynomialParameters)
      throw new Error("Polynomial parameters not computed");
    const e = [0, 0];
    for (let i = 0; i < 2; i++)
      switch (this.order) {
        case 1:
          e[i] += this.polynomialParameters[i][0] + this.polynomialParameters[i][1] * t[0] + this.polynomialParameters[i][2] * t[1];
          break;
        case 2:
          e[i] += this.polynomialParameters[i][0] + this.polynomialParameters[i][1] * t[0] + this.polynomialParameters[i][2] * t[1] + this.polynomialParameters[i][3] * t[0] ** 2 + this.polynomialParameters[i][4] * t[1] ** 2 + this.polynomialParameters[i][5] * t[0] * t[1];
          break;
        case 3:
          e[i] += this.polynomialParameters[i][0] + this.polynomialParameters[i][1] * t[0] + this.polynomialParameters[i][2] * t[1] + this.polynomialParameters[i][3] * t[0] ** 2 + this.polynomialParameters[i][4] * t[1] ** 2 + this.polynomialParameters[i][5] * t[0] * t[1] + this.polynomialParameters[i][6] * t[0] ** 3 + this.polynomialParameters[i][7] * t[1] ** 3 + this.polynomialParameters[i][8] * t[0] ** 2 * t[1] + this.polynomialParameters[i][9] * t[0] * t[1] ** 2;
          break;
      }
    return e;
  }
}
class Hc {
  constructor(t, e) {
    if (this.sourcePoints = t, this.destinationPoints = e, this.pointCount = this.sourcePoints.length, this.pointCount < 4)
      throw new Error(
        "Not enough control points. A projective transformation requires a minimum of 4 points, but " + this.pointCount + " are given."
      );
    const i = _t.zeros(2 * this.pointCount, 9);
    for (let s = 0; s < this.pointCount; s++)
      i.set(2 * s, 0, -t[s][0]), i.set(2 * s, 1, -t[s][1]), i.set(2 * s, 2, -1), i.set(2 * s, 3, 0), i.set(2 * s, 4, 0), i.set(2 * s, 5, 0), i.set(
        2 * s,
        6,
        e[s][0] * t[s][0]
      ), i.set(
        2 * s,
        7,
        e[s][0] * t[s][1]
      ), i.set(2 * s, 8, e[s][0]), i.set(2 * s + 1, 0, 0), i.set(2 * s + 1, 1, 0), i.set(2 * s + 1, 2, 0), i.set(2 * s + 1, 3, -t[s][0]), i.set(2 * s + 1, 4, -t[s][1]), i.set(2 * s + 1, 5, -1), i.set(
        2 * s + 1,
        6,
        e[s][1] * t[s][0]
      ), i.set(
        2 * s + 1,
        7,
        e[s][1] * t[s][1]
      ), i.set(2 * s + 1, 8, e[s][1]);
    const n = new $c(i);
    this.projectiveParametersMatrix = _t.from1DArray(
      3,
      3,
      n.rightSingularVectors.getColumn(8)
    ).transpose(), this.projectiveParameters = this.projectiveParametersMatrix.to2DArray();
  }
  // The interpolant function will compute the value at any point.
  interpolate(t) {
    if (!this.projectiveParameters)
      throw new Error("projective parameters not computed");
    const e = this.projectiveParameters[0][2] * t[0] + this.projectiveParameters[1][2] * t[1] + this.projectiveParameters[2][2];
    return [
      (this.projectiveParameters[0][0] * t[0] + this.projectiveParameters[1][0] * t[1] + this.projectiveParameters[2][0]) / e,
      (this.projectiveParameters[0][1] * t[0] + this.projectiveParameters[1][1] * t[1] + this.projectiveParameters[2][1]) / e
    ];
  }
}
class Yc {
  constructor(t, e, i, n, s) {
    if (this.sourcePoints = t, this.destinationPoints = e, this.kernelFunction = i, this.normFunction = n, this.pointCount = this.sourcePoints.length, this.pointCount < 3)
      throw new Error(
        `Not enough control points. A thin plate spline transformation (with affine component) requires a minimum of 3 points, but ${this.pointCount} are given.`
      );
    const o = [
      _t.columnVector(
        [...e, [0, 0], [0, 0], [0, 0]].map((u) => u[0])
      ),
      _t.columnVector(
        [...e, [0, 0], [0, 0], [0, 0]].map((u) => u[1])
      )
    ], a = _t.zeros(this.pointCount, this.pointCount);
    for (let u = 0; u < this.pointCount; u++)
      for (let g = 0; g < this.pointCount; g++)
        a.set(u, g, n(t[u], t[g]));
    s === void 0 && (s = a.sum() / (Math.pow(this.pointCount, 2) - this.pointCount)), this.epsilon = s;
    for (let u = 0; u < this.pointCount; u++)
      for (let g = 0; g < this.pointCount; g++)
        a.set(
          u,
          g,
          i(a.get(u, g), s)
        );
    const h = _t.zeros(this.pointCount, 3), c = _t.zeros(
      this.pointCount + 3,
      this.pointCount + 3
    );
    for (let u = 0; u < this.pointCount; u++)
      h.set(u, 0, 1), h.set(u, 1, t[u][0]), h.set(u, 2, t[u][1]);
    for (let u = 0; u < this.pointCount + 3; u++)
      for (let g = 0; g < this.pointCount + 3; g++)
        u < this.pointCount && g < this.pointCount ? c.set(u, g, a.get(u, g)) : u >= this.pointCount && g < this.pointCount ? c.set(
          u,
          g,
          h.transpose().get(u - this.pointCount, g)
        ) : u < this.pointCount && g >= this.pointCount && c.set(
          u,
          g,
          h.get(u, g - this.pointCount)
        );
    const l = qc(
      c
    );
    this.weightsMatrices = [
      l.mmul(o[0]),
      l.mmul(o[1])
    ], this.rbfWeights = this.weightsMatrices.map(
      (u) => u.selection([...Array(this.pointCount).keys()], [0]).to1DArray()
    ), this.affineWeights = this.weightsMatrices.map(
      (u) => u.selection(
        [0, 1, 2].map((g) => g + this.pointCount),
        [0]
      ).to1DArray()
    );
  }
  // The interpolant function will compute the value at any point.
  interpolate(t) {
    if (!this.rbfWeights || !this.affineWeights)
      throw new Error("Weights not computed");
    const e = this.sourcePoints.map(
      (n) => this.kernelFunction(
        this.normFunction(t, n),
        this.epsilon
      )
    ), i = [0, 0];
    for (let n = 0; n < 2; n++)
      i[n] = e.reduce(
        (s, o, a) => s + o * this.rbfWeights[n][a],
        0
      ), i[n] += this.affineWeights[n][0] + this.affineWeights[n][1] * t[0] + this.affineWeights[n][2] * t[1];
    return i;
  }
}
function Jc(r) {
  return r === 0 ? 0 : Math.pow(r, 2) * Math.log(r);
}
function Kc(r, t) {
  const e = [t[0] - r[0], t[1] - r[1]];
  return Math.sqrt(e[0] ** 2 + e[1] ** 2);
}
function et(r, t, e) {
  return {
    maxOffsetRatio: 0,
    maxDepth: 0,
    destinationIsGeographic: !1,
    sourceIsGeographic: !1,
    inputIsMultiGeometry: !1,
    differentHandedness: !1,
    ...e,
    ...t,
    ...r
  };
}
function dr(r, t, e) {
  t = qr(t);
  const i = t.map((o) => ({
    source: o,
    destination: r.transformForward(o)
  })), n = Jr(i, !1), s = Ds(
    r,
    n,
    e
  );
  return Kr(s, !0).map(
    (o) => o.destination
  );
}
function fr(r, t, e) {
  t = qr(t);
  const i = t.map((o) => ({
    source: r.transformBackward(o),
    destination: o
  })), n = Jr(i, !1), s = Gs(
    r,
    n,
    e
  );
  return Kr(s, !0).map((o) => o.source);
}
function Qc(r, t, e) {
  t = Di(t);
  const i = t.map((o) => ({
    source: o,
    destination: r.transformForward(o)
  })), n = Jr(i, !0), s = Ds(
    r,
    n,
    e
  );
  return Kr(s, !1).map(
    (o) => o.destination
  );
}
function tl(r, t, e) {
  t = Di(t);
  const i = t.map((o) => ({
    source: r.transformBackward(o),
    destination: o
  })), n = Jr(i, !0), s = Gs(
    r,
    n,
    e
  );
  return Kr(s, !1).map(
    (o) => o.source
  );
}
function pr(r, t, e) {
  return t.map((i) => Qc(r, i, e));
}
function gr(r, t, e) {
  return t.map((i) => tl(r, i, e));
}
function Jr(r, t = !1) {
  const e = r.length - (t ? 0 : 1), i = [];
  for (let n = 0; n < e; n++)
    i.push({
      from: r[n],
      to: r[(n + 1) % r.length]
    });
  return i;
}
function Kr(r, t = !1) {
  const e = r.map((i) => i.from);
  return t && e.push(r[r.length - 1].to), e;
}
function Ds(r, t, e) {
  return e.maxDepth <= 0 ? t : t.map(
    (i) => Ri(
      r,
      i,
      e,
      0
    )
  ).flat(1);
}
function Gs(r, t, e) {
  return e.maxDepth <= 0 ? t : t.map(
    (i) => ki(
      r,
      i,
      e,
      0
    )
  ).flat(1);
}
function Ri(r, t, e, i) {
  if (i >= e.maxDepth)
    return t;
  const n = (e.sourceIsGeographic ? (c, l) => Dr(c, l).geometry.coordinates : Br)(
    t.from.source,
    t.to.source
  ), s = (e.destinationIsGeographic ? (c, l) => Dr(c, l).geometry.coordinates : Br)(
    t.from.destination,
    t.to.destination
  ), o = r.transformForward(n), a = e.destinationIsGeographic ? Fi : vt, h = a(
    t.from.destination,
    t.to.destination
  );
  if (a(
    s,
    o
  ) / h > e.maxOffsetRatio && h > 0) {
    const c = {
      source: n,
      destination: o
    };
    return [
      Ri(
        r,
        { from: t.from, to: c },
        e,
        i + 1
      ),
      Ri(
        r,
        { from: c, to: t.to },
        e,
        i + 1
      )
    ].flat(1);
  } else
    return t;
}
function ki(r, t, e, i) {
  if (i >= e.maxDepth)
    return t;
  const n = (e.destinationIsGeographic ? (c, l) => Dr(c, l).geometry.coordinates : Br)(
    t.from.destination,
    t.to.destination
  ), s = (e.sourceIsGeographic ? (c, l) => Dr(c, l).geometry.coordinates : Br)(
    t.from.source,
    t.to.source
  ), o = r.transformBackward(
    n
  ), a = e.sourceIsGeographic ? Fi : vt, h = a(
    t.from.source,
    t.to.source
  );
  if (a(
    s,
    o
  ) / h > e.maxOffsetRatio && h > 0) {
    const c = {
      source: o,
      destination: n
    };
    return [
      ki(
        r,
        { from: t.from, to: c },
        e,
        i + 1
      ),
      ki(
        r,
        { from: c, to: t.to },
        e,
        i + 1
      )
    ].flat(1);
  } else
    return t;
}
class Sn {
  /**
   * Create a GcpTransformer
   * @param {TransformGcp[] | Gcp[]} gcps - An array of Ground Control Points (GCPs)
   * @param {TransformationType} [type='polynomial'] - The transformation type
   */
  constructor(t, e = "polynomial", i) {
    if (i && (this.options = i), t.length == 0)
      throw new Error("No control points.");
    this.gcps = t.map((n) => {
      if ("resource" in n && "geo" in n)
        return {
          source: n.resource,
          destination: n.geo
        };
      if ("source" in n && "destination" in n)
        return n;
      throw new Error("Unsupported GCP type");
    }), this.sourcePoints = this.gcps.map((n) => n.source), this.destinationPoints = this.gcps.map((n) => n.destination), this.type = e;
  }
  assureEqualHandedness(t) {
    return this.options?.differentHandedness ? yh(t) : t;
  }
  createForwardTransformation() {
    return this.createTransformation(
      this.sourcePoints.map((t) => this.assureEqualHandedness(t)),
      this.destinationPoints
    );
  }
  createBackwardTransformation() {
    return this.createTransformation(
      this.destinationPoints,
      this.sourcePoints.map((t) => this.assureEqualHandedness(t))
    );
  }
  createTransformation(t, e) {
    if (this.type === "straight")
      return new Xc(t, e);
    if (this.type === "helmert")
      return new Bs(t, e);
    if (this.type === "polynomial1" || this.type === "polynomial")
      return new ci(t, e);
    if (this.type === "polynomial2")
      return new ci(t, e, 2);
    if (this.type === "polynomial3")
      return new ci(t, e, 3);
    if (this.type === "projective")
      return new Hc(t, e);
    if (this.type === "thinPlateSpline")
      return new Yc(
        t,
        e,
        Jc,
        Kc
      );
    throw new Error(`Unsupported transformation type: ${this.type}`);
  }
  /**
   * Transforms a Geometry or a GeoJSON geometry forward to a Geometry
   * @param {Geometry | GeojsonGeometry} input - Geometry or GeoJSON geometry to transform
   * @param {PartialTransformOptions} [options] - Transform options
   * @returns {Geometry} Forward transform of input as Geometry
   * @type {{
   * (input:Point | GeojsonPoint) => Point;
   * (input:LineString | GeojsonLineString) => LineString;
   * (input:Polygon | GeojsonPolygon) => Polygon;
   * (input:MultiPoint | GeojsonMultiPoint) => MultiPoint;
   * (input:MultiLineString | GeojsonMultiLineString) => MultiLineString;
   * (input:MultiPolygon | GeojsonMultiPolygon) => MultiPolygon;
   * }}
   */
  transformForward(t, e) {
    if (!et(e, this.options).inputIsMultiGeometry) {
      if (gt(t))
        return this.forwardTransformation || (this.forwardTransformation = this.createForwardTransformation()), this.forwardTransformation.interpolate(
          this.assureEqualHandedness(t)
        );
      if (Gt(t))
        return this.transformForward(Ee(t), e);
      if (Et(t))
        return dr(
          this,
          t,
          et(e, this.options)
        );
      if (Ft(t))
        return dr(
          this,
          Ie(t),
          et(e, this.options, {
            sourceIsGeographic: !0
          })
        );
      if (It(t))
        return pr(
          this,
          t,
          et(e, this.options)
        );
      if (Ut(t))
        return pr(
          this,
          Se(t),
          et(e, this.options, { sourceIsGeographic: !0 })
        );
    }
    if (e && (e.inputIsMultiGeometry = !1), jt(t))
      return t.map((i) => this.transformForward(i, e));
    if (Wt(t))
      return tr(t).map(
        (i) => this.transformForward(i, e)
      );
    if (Bt(t))
      return t.map((i) => this.transformForward(i, e));
    if (Vt(t))
      return er(t).map(
        (i) => this.transformForward(i, e)
      );
    if (Dt(t))
      return t.map((i) => this.transformForward(i, e));
    if (zt(t))
      return rr(t).map(
        (i) => this.transformForward(i, e)
      );
    throw new Error("Input type not supported");
  }
  /**
   * Transforms a Geometry or a GeoJSON geometry forward to a GeoJSON geometry
   * @param {Geometry | GeojsonGeometry} input - Geometry or GeoJSON geometry to transform
   * @param {PartialTransformOptions} [options] - Transform options
   * @returns {GeojsonGeometry} Forward transform of input, as GeoJSON geometry
   * @type {{
   * (input:Point | GeojsonPoint) => GeojsonPoint;
   * (input:LineString | GeojsonLineString) => GeojsonLineString;
   * (input:Polygon | GeojsonPolygon) => GeojsonPolygon;
   * (input:MultiPoint | GeojsonMultiPoint) => GeojsonMultiPoint;
   * (input:MultiLineString | GeojsonMultiLineString) => GeojsonMultiLineString;
   * (input:MultiPolygon | GeojsonMultiPolygon) => GeojsonMultiPolygon;
   * }}
   */
  transformForwardAsGeojson(t, e) {
    if (!et(e, this.options).inputIsMultiGeometry) {
      if (gt(t))
        return Je(this.transformForward(t));
      if (Gt(t))
        return Je(
          this.transformForward(Ee(t))
        );
      if (Et(t))
        return Ke(
          dr(
            this,
            t,
            et(e, this.options, {
              destinationIsGeographic: !0
            })
          )
        );
      if (Ft(t))
        return Ke(
          dr(
            this,
            Ie(t),
            et(e, this.options, {
              sourceIsGeographic: !0,
              destinationIsGeographic: !0
            })
          )
        );
      if (It(t))
        return Qe(
          pr(
            this,
            t,
            et(e, this.options, {
              destinationIsGeographic: !0
            })
          )
        );
      if (Ut(t))
        return Qe(
          pr(
            this,
            Se(t),
            et(e, this.options, {
              sourceIsGeographic: !0,
              destinationIsGeographic: !0
            })
          )
        );
    }
    if (e && (e.inputIsMultiGeometry = !1), jt(t))
      return ir(
        t.map((i) => this.transformForwardAsGeojson(i, e))
      );
    if (Wt(t))
      return ir(
        tr(t).map(
          (i) => this.transformForwardAsGeojson(i, e)
        )
      );
    if (Bt(t))
      return nr(
        t.map((i) => this.transformForwardAsGeojson(i, e))
      );
    if (Vt(t))
      return nr(
        er(t).map(
          (i) => this.transformForwardAsGeojson(i, e)
        )
      );
    if (Dt(t))
      return sr(
        t.map((i) => this.transformForwardAsGeojson(i, e))
      );
    if (zt(t))
      return sr(
        rr(t).map(
          (i) => this.transformForwardAsGeojson(i, e)
        )
      );
    throw new Error("Input type not supported");
  }
  /**
   * Transforms a geometry or a GeoJSON geometry backward to a Geometry
   * @param {Geometry | GeojsonGeometry} input - Geometry or GeoJSON geometry to transform
   * @param {PartialTransformOptions} [options] - Transform options
   * @returns {Geometry} backward transform of input, as geometry
   * @type {{
   * (input:Point | GeojsonPoint) => Point;
   * (input:LineString | GeojsonLineString) => LineString;
   * (input:Polygon | GeojsonPolygon) => Polygon;
   * (input:MultiPoint | GeojsonMultiPoint) => MultiPoint;
   * (input:MultiLineString | GeojsonMultiLineString) => MultiLineString;
   * (input:MultiPolygon | GeojsonMultiPolygon) => MultiPolygon;
   * }}
   */
  transformBackward(t, e) {
    if (!et(e, this.options).inputIsMultiGeometry) {
      if (gt(t))
        return this.backwardTransformation || (this.backwardTransformation = this.createBackwardTransformation()), this.assureEqualHandedness(
          this.backwardTransformation.interpolate(t)
        );
      if (Gt(t))
        return this.transformBackward(Ee(t));
      if (Et(t))
        return fr(
          this,
          t,
          et(e, this.options)
        );
      if (Ft(t))
        return fr(
          this,
          Ie(t),
          et(e, this.options, {
            destinationIsGeographic: !0
          })
        );
      if (It(t))
        return gr(
          this,
          t,
          et(e, this.options)
        );
      if (Ut(t))
        return gr(
          this,
          Se(t),
          et(e, this.options, {
            destinationIsGeographic: !0
          })
        );
    }
    if (e && (e.inputIsMultiGeometry = !1), jt(t))
      return t.map((i) => this.transformBackward(i, e));
    if (Wt(t))
      return tr(t).map(
        (i) => this.transformBackward(i, e)
      );
    if (Bt(t))
      return t.map((i) => this.transformBackward(i, e));
    if (Vt(t))
      return er(t).map(
        (i) => this.transformBackward(i, e)
      );
    if (Dt(t))
      return t.map((i) => this.transformBackward(i, e));
    if (zt(t))
      return rr(t).map(
        (i) => this.transformBackward(i, e)
      );
    throw new Error("Input type not supported");
  }
  /**
   * Transforms a Geometry or a GeoJSON geometry backward to a GeoJSON geometry
   * @param {Geometry | GeojsonGeometry} input - Geometry or GeoJSON geometry to transform
   * @param {PartialTransformOptions} [options] - Transform options
   * @returns {GeojsonGeometry} backward transform of input, as GeoJSON geometry
   * @type {{
   * (input:Point | GeojsonPoint) => GeojsonPoint;
   * (input:LineString | GeojsonLineString) => GeojsonLineString;
   * (input:Polygon | GeojsonPolygon) => GeojsonPolygon;
   * (input:MultiPoint | GeojsonMultiPoint) => GeojsonMultiPoint;
   * (input:MultiLineString | GeojsonMultiLineString) => GeojsonMultiLineString;
   * (input:MultiPolygon | GeojsonMultiPolygon) => GeojsonMultiPolygon;
   * }}
   */
  transformBackwardAsGeojson(t, e) {
    if (!et(e, this.options).inputIsMultiGeometry) {
      if (gt(t))
        return Je(this.transformBackward(t));
      if (Gt(t))
        return Je(
          this.transformBackward(Ee(t))
        );
      if (Et(t))
        return Ke(
          fr(
            this,
            t,
            et(e, this.options, {
              sourceIsGeographic: !0
            })
          )
        );
      if (Ft(t))
        return Ke(
          fr(
            this,
            Ie(t),
            et(e, this.options, {
              sourceIsGeographic: !0,
              destinationIsGeographic: !0
            })
          )
        );
      if (It(t))
        return Qe(
          gr(
            this,
            t,
            et(e, this.options, {
              sourceIsGeographic: !0
            })
          )
        );
      if (Ut(t))
        return Qe(
          gr(
            this,
            Se(t),
            et(e, this.options, {
              sourceIsGeographic: !0,
              destinationIsGeographic: !0
            })
          )
        );
    }
    if (e && (e.inputIsMultiGeometry = !1), jt(t))
      return ir(
        t.map(
          (i) => this.transformBackwardAsGeojson(i, e)
        )
      );
    if (Wt(t))
      return ir(
        tr(t).map(
          (i) => this.transformBackwardAsGeojson(i, e)
        )
      );
    if (Bt(t))
      return nr(
        t.map(
          (i) => this.transformBackwardAsGeojson(i, e)
        )
      );
    if (Vt(t))
      return nr(
        er(t).map(
          (i) => this.transformBackwardAsGeojson(i, e)
        )
      );
    if (Dt(t))
      return sr(
        t.map(
          (i) => this.transformBackwardAsGeojson(i, e)
        )
      );
    if (zt(t))
      return sr(
        rr(t).map(
          (i) => this.transformBackwardAsGeojson(i, e)
        )
      );
    throw new Error("Input type not supported");
  }
  /**
   * Transforms Geometry or GeoJSON geometry forward, as Geometry
   * @param {Geometry | GeojsonGeometry} input - Input to transform
   * @returns {Geometry} Forward transform of input, as Geometry
   * @type {{
   * (input:Point | GeojsonPoint) => Point;
   * (input:LineString | GeojsonLineString) => LineString;
   * (input:Polygon | GeojsonPolygon) => Polygon;
   * (input:MultiPoint | GeojsonMultiPoint) => MultiPoint;
   * (input:MultiLineString | GeojsonMultiLineString) => MultiLineString;
   * (input:MultiPolygon | GeojsonMultiPolygon) => MultiPolygon;
   * }}
   */
  transformToGeo(t, e) {
    if (!et(e, this.options).inputIsMultiGeometry) {
      if (gt(t))
        return this.transformForward(t, e);
      if (Gt(t))
        return this.transformForward(t, e);
      if (Et(t))
        return this.transformForward(t, e);
      if (Ft(t))
        return this.transformForward(t, e);
      if (It(t))
        return this.transformForward(t, e);
      if (Ut(t))
        return this.transformForward(t, e);
    }
    if (e && (e.inputIsMultiGeometry = !1), jt(t))
      return this.transformForward(t, e);
    if (Wt(t))
      return this.transformForward(t, e);
    if (Bt(t))
      return this.transformForward(t, e);
    if (Vt(t))
      return this.transformForward(t, e);
    if (Dt(t))
      return this.transformForward(t, e);
    if (zt(t))
      return this.transformForward(t, e);
    throw new Error("Input type not supported");
  }
  /**
   * Transforms a Geometry or a GeoJSON geometry forward, to a GeoJSON geometry
   * @param {Geometry | GeojsonGeometry} input - Input to transform
   * @returns {Geometry} Forward transform of input, as GeoJSON geometry
   * @type {{
   * (input:Point | GeojsonPoint) => GeojsonPoint;
   * (input:LineString | GeojsonLineString) => GeojsonLineString;
   * (input:Polygon | GeojsonPolygon) => GeojsonPolygon;
   * (input:MultiPoint | GeojsonMultiPoint) => GeojsonMultiPoint;
   * (input:MultiLineString | GeojsonMultiLineString) => GeojsonMultiLineString;
   * (input:MultiPolygon | GeojsonMultiPolygon) => GeojsonMultiPolygon;
   * }}
   */
  transformToGeoAsGeojson(t, e) {
    if (!et(e, this.options).inputIsMultiGeometry) {
      if (gt(t))
        return this.transformForwardAsGeojson(t, e);
      if (Gt(t))
        return this.transformForwardAsGeojson(t, e);
      if (Et(t))
        return this.transformForwardAsGeojson(t, e);
      if (Ft(t))
        return this.transformForwardAsGeojson(
          t,
          e
        );
      if (It(t))
        return this.transformForwardAsGeojson(t, e);
      if (Ut(t))
        return this.transformForwardAsGeojson(t, e);
    }
    if (e && (e.inputIsMultiGeometry = !1), jt(t))
      return this.transformForwardAsGeojson(t, e);
    if (Wt(t))
      return this.transformForwardAsGeojson(t, e);
    if (Bt(t))
      return this.transformForwardAsGeojson(t, e);
    if (Vt(t))
      return this.transformForwardAsGeojson(
        t,
        e
      );
    if (Dt(t))
      return this.transformForwardAsGeojson(t, e);
    if (zt(t))
      return this.transformForwardAsGeojson(
        t,
        e
      );
    throw new Error("Input type not supported");
  }
  /**
   * Transforms a Geometry or a GeoJSON geometry backward, to a Geometry
   * @param {Geometry | GeojsonGeometry} input - Input to transform
   * @returns {Geometry} Backward transform of input, as a Geometry
   * @type {{
   * (input:Point | GeojsonPoint) => Point;
   * (input:LineString | GeojsonLineString) => LineString;
   * (input:Polygon | GeojsonPolygon) => Polygon;
   * (input:MultiPoint | GeojsonMultiPoint) => MultiPoint;
   * (input:MultiLineString | GeojsonMultiLineString) => MultiLineString;
   * (input:MultiPolygon | GeojsonMultiPolygon) => MultiPolygon;
   * }}
   */
  transformToResource(t, e) {
    if (!et(e, this.options).inputIsMultiGeometry) {
      if (gt(t))
        return this.transformBackward(t, e);
      if (Gt(t))
        return this.transformBackward(t, e);
      if (Et(t))
        return this.transformBackward(t, e);
      if (Ft(t))
        return this.transformBackward(t, e);
      if (It(t))
        return this.transformBackward(t, e);
      if (Ut(t))
        return this.transformBackward(t, e);
    }
    if (e && (e.inputIsMultiGeometry = !1), jt(t))
      return this.transformBackward(t, e);
    if (Wt(t))
      return this.transformBackward(t, e);
    if (Bt(t))
      return this.transformBackward(t, e);
    if (Vt(t))
      return this.transformBackward(t, e);
    if (Dt(t))
      return this.transformBackward(t, e);
    if (zt(t))
      return this.transformBackward(t, e);
    throw new Error("Input type not supported");
  }
  /**
   * Transforms a Geometry or a GeoJSON geometry backward, to a GeoJSON geometry
   * @param {Geometry | GeojsonGeometry} input - Input to transform
   * @returns {GeojsonGeometry} Backward transform of input, as a GeoJSON geometry
   * @type {{
   * (input:Point | GeojsonPoint) => GeojsonPoint;
   * (input:LineString | GeojsonLineString) => GeojsonLineString;
   * (input:Polygon | GeojsonPolygon) => GeojsonPolygon;
   * (input:MultiPoMultiint | GeojsonMultiPoint) => GeojsonMultiPoint;
   * (input:MultiLineString | GeojsonMultiLineString) => GeojsonMultiLineString;
   * (input:MultiPolygon | GeojsonMultiPolygon) => GeojsonMultiPolygon;
   * }}
   */
  transformToResourceAsGeojson(t, e) {
    if (!et(e, this.options).inputIsMultiGeometry) {
      if (gt(t))
        return this.transformBackwardAsGeojson(t, e);
      if (Gt(t))
        return this.transformBackwardAsGeojson(t, e);
      if (Et(t))
        return this.transformBackwardAsGeojson(t, e);
      if (Ft(t))
        return this.transformBackwardAsGeojson(
          t,
          e
        );
      if (It(t))
        return this.transformBackwardAsGeojson(t, e);
      if (Ut(t))
        return this.transformBackwardAsGeojson(t, e);
    }
    if (e && (e.inputIsMultiGeometry = !1), jt(t))
      return this.transformBackwardAsGeojson(t, e);
    if (Wt(t))
      return this.transformBackwardAsGeojson(
        t,
        e
      );
    if (Bt(t))
      return this.transformBackwardAsGeojson(t, e);
    if (Vt(t))
      return this.transformBackwardAsGeojson(
        t,
        e
      );
    if (Dt(t))
      return this.transformBackwardAsGeojson(t, e);
    if (zt(t))
      return this.transformBackwardAsGeojson(
        t,
        e
      );
    throw new Error("Input type not supported");
  }
  // Shortcuts for SVG <> GeoJSON
  /**
   * Transforms a SVG geometry forward to a GeoJSON geometry
   *
   * Note: Multi-geometries are not supported
   * @param {SvgGeometry} geometry - SVG geometry to transform
   * @returns {GeojsonGeometry} Forward transform of input, as a GeoJSON geometry
   */
  transformSvgToGeojson(t, e) {
    if (t.type === "circle")
      return this.transformForwardAsGeojson(t.coordinates);
    if (t.type === "line")
      return this.transformForwardAsGeojson(
        t.coordinates,
        e
      );
    if (t.type === "polyline")
      return this.transformForwardAsGeojson(
        t.coordinates,
        e
      );
    if (t.type === "rect")
      return this.transformForwardAsGeojson(
        [t.coordinates],
        e
      );
    if (t.type === "polygon")
      return this.transformForwardAsGeojson(
        [t.coordinates],
        e
      );
    throw new Error("Unsupported SVG geometry");
  }
  /**
   * Transforms a GeoJSON geometry backward to a SVG geometry
   *
   * Note: Multi-geometries are not supported
   * @param {GeojsonGeometry} geometry - GeoJSON geometry to transform
   * @returns {SvgGeometry} Backward transform of input, as SVG geometry
   */
  transformGeojsonToSvg(t, e) {
    if (t.type === "Point")
      return {
        type: "circle",
        coordinates: this.transformBackward(t)
      };
    if (t.type === "LineString")
      return {
        type: "polyline",
        coordinates: this.transformBackward(t, e)
      };
    if (t.type === "Polygon")
      return {
        type: "polygon",
        coordinates: this.transformBackward(t, e)[0]
      };
    throw new Error("Unsupported GeoJSON geometry");
  }
}
function el(r) {
  return Math.sqrt(Math.pow(r[1][0] - r[0][0], 2) + Math.pow(r[1][1] - r[0][1], 2));
}
function rl(r) {
  return Math.atan2(r[1][1] - r[0][1], r[1][0] - r[0][0]);
}
function il(r, t, e) {
  return [
    r[0] + Math.cos(e) * t,
    r[1] + Math.sin(e) * t
  ];
}
function nl(r, t) {
  let e = r[0];
  const i = [e];
  for (; el([e, r[1]]) > t; ) {
    const n = il(e, t, rl(r));
    i.push(n), e = n;
  }
  return i;
}
function sl(r, t) {
  r = [...r, r[0]];
  let e = [];
  for (let i = 0; i < r.length - 1; i++)
    e = e.concat(nl([r[i], r[i + 1]], t));
  return e;
}
function ol(r, t) {
  const e = [], i = lt(r);
  for (let n = i[0] + t, s = 0; n <= i[2]; s++, n += t)
    for (let o = i[1] + t, a = 0; o <= i[3]; a++, o += t)
      e.push([n, o]);
  return e;
}
var Oi = {}, al = {
  get exports() {
    return Oi;
  },
  set exports(r) {
    Oi = r;
  }
}, Fs = hl, An = +(Math.pow(2, 27) + 1);
function hl(r, t, e) {
  var i = r * t, n = An * r, s = n - r, o = n - s, a = r - o, h = An * t, c = h - t, l = h - c, u = t - l, g = i - o * l, w = g - a * l, y = w - o * u, _ = a * u - y;
  return e ? (e[0] = _, e[1] = i, e) : [_, i];
}
var cl = ul;
function ll(r, t) {
  var e = r + t, i = e - r, n = e - i, s = t - i, o = r - n, a = o + s;
  return a ? [a, e] : [e];
}
function ul(r, t) {
  var e = r.length | 0, i = t.length | 0;
  if (e === 1 && i === 1)
    return ll(r[0], t[0]);
  var n = e + i, s = new Array(n), o = 0, a = 0, h = 0, c = Math.abs, l = r[a], u = c(l), g = t[h], w = c(g), y, _;
  u < w ? (_ = l, a += 1, a < e && (l = r[a], u = c(l))) : (_ = g, h += 1, h < i && (g = t[h], w = c(g))), a < e && u < w || h >= i ? (y = l, a += 1, a < e && (l = r[a], u = c(l))) : (y = g, h += 1, h < i && (g = t[h], w = c(g)));
  for (var I = y + _, v = I - y, S = _ - v, f = S, p = I, T, A, C, E, d; a < e && h < i; )
    u < w ? (y = l, a += 1, a < e && (l = r[a], u = c(l))) : (y = g, h += 1, h < i && (g = t[h], w = c(g))), _ = f, I = y + _, v = I - y, S = _ - v, S && (s[o++] = S), T = p + I, A = T - p, C = T - A, E = I - A, d = p - C, f = d + E, p = T;
  for (; a < e; )
    y = l, _ = f, I = y + _, v = I - y, S = _ - v, S && (s[o++] = S), T = p + I, A = T - p, C = T - A, E = I - A, d = p - C, f = d + E, p = T, a += 1, a < e && (l = r[a]);
  for (; h < i; )
    y = g, _ = f, I = y + _, v = I - y, S = _ - v, S && (s[o++] = S), T = p + I, A = T - p, C = T - A, E = I - A, d = p - C, f = d + E, p = T, h += 1, h < i && (g = t[h]);
  return f && (s[o++] = f), p && (s[o++] = p), o || (s[o++] = 0), s.length = o, s;
}
var dl = fl;
function fl(r, t, e) {
  var i = r + t, n = i - r, s = i - n, o = t - n, a = r - s;
  return e ? (e[0] = a + o, e[1] = i, e) : [a + o, i];
}
var li = Fs, pl = dl, gl = ml;
function ml(r, t) {
  var e = r.length;
  if (e === 1) {
    var i = li(r[0], t);
    return i[0] ? i : [i[1]];
  }
  var n = new Array(2 * e), s = [0.1, 0.1], o = [0.1, 0.1], a = 0;
  li(r[0], t, s), s[0] && (n[a++] = s[0]);
  for (var h = 1; h < e; ++h) {
    li(r[h], t, o);
    var c = s[1];
    pl(c, o[0], s), s[0] && (n[a++] = s[0]);
    var l = o[1], u = s[1], g = l + u, w = g - l, y = u - w;
    s[1] = g, y && (n[a++] = y);
  }
  return s[1] && (n[a++] = s[1]), a === 0 && (n[a++] = 0), n.length = a, n;
}
var yl = vl;
function wl(r, t) {
  var e = r + t, i = e - r, n = e - i, s = t - i, o = r - n, a = o + s;
  return a ? [a, e] : [e];
}
function vl(r, t) {
  var e = r.length | 0, i = t.length | 0;
  if (e === 1 && i === 1)
    return wl(r[0], -t[0]);
  var n = e + i, s = new Array(n), o = 0, a = 0, h = 0, c = Math.abs, l = r[a], u = c(l), g = -t[h], w = c(g), y, _;
  u < w ? (_ = l, a += 1, a < e && (l = r[a], u = c(l))) : (_ = g, h += 1, h < i && (g = -t[h], w = c(g))), a < e && u < w || h >= i ? (y = l, a += 1, a < e && (l = r[a], u = c(l))) : (y = g, h += 1, h < i && (g = -t[h], w = c(g)));
  for (var I = y + _, v = I - y, S = _ - v, f = S, p = I, T, A, C, E, d; a < e && h < i; )
    u < w ? (y = l, a += 1, a < e && (l = r[a], u = c(l))) : (y = g, h += 1, h < i && (g = -t[h], w = c(g))), _ = f, I = y + _, v = I - y, S = _ - v, S && (s[o++] = S), T = p + I, A = T - p, C = T - A, E = I - A, d = p - C, f = d + E, p = T;
  for (; a < e; )
    y = l, _ = f, I = y + _, v = I - y, S = _ - v, S && (s[o++] = S), T = p + I, A = T - p, C = T - A, E = I - A, d = p - C, f = d + E, p = T, a += 1, a < e && (l = r[a]);
  for (; h < i; )
    y = g, _ = f, I = y + _, v = I - y, S = _ - v, S && (s[o++] = S), T = p + I, A = T - p, C = T - A, E = I - A, d = p - C, f = d + E, p = T, h += 1, h < i && (g = -t[h]);
  return f && (s[o++] = f), p && (s[o++] = p), o || (s[o++] = 0), s.length = o, s;
}
(function(r) {
  var t = Fs, e = cl, i = gl, n = yl, s = 5, o = 11102230246251565e-32, a = (3 + 16 * o) * o, h = (7 + 56 * o) * o;
  function c(f, p, T, A) {
    return function(E, d, x) {
      var M = f(f(p(d[1], x[0]), p(-x[1], d[0])), f(p(E[1], d[0]), p(-d[1], E[0]))), b = f(p(E[1], x[0]), p(-x[1], E[0])), Z = A(M, b);
      return Z[Z.length - 1];
    };
  }
  function l(f, p, T, A) {
    return function(E, d, x, M) {
      var b = f(f(T(f(p(x[1], M[0]), p(-M[1], x[0])), d[2]), f(T(f(p(d[1], M[0]), p(-M[1], d[0])), -x[2]), T(f(p(d[1], x[0]), p(-x[1], d[0])), M[2]))), f(T(f(p(d[1], M[0]), p(-M[1], d[0])), E[2]), f(T(f(p(E[1], M[0]), p(-M[1], E[0])), -d[2]), T(f(p(E[1], d[0]), p(-d[1], E[0])), M[2])))), Z = f(f(T(f(p(x[1], M[0]), p(-M[1], x[0])), E[2]), f(T(f(p(E[1], M[0]), p(-M[1], E[0])), -x[2]), T(f(p(E[1], x[0]), p(-x[1], E[0])), M[2]))), f(T(f(p(d[1], x[0]), p(-x[1], d[0])), E[2]), f(T(f(p(E[1], x[0]), p(-x[1], E[0])), -d[2]), T(f(p(E[1], d[0]), p(-d[1], E[0])), x[2])))), Y = A(b, Z);
      return Y[Y.length - 1];
    };
  }
  function u(f, p, T, A) {
    return function(E, d, x, M, b) {
      var Z = f(f(f(T(f(T(f(p(M[1], b[0]), p(-b[1], M[0])), x[2]), f(T(f(p(x[1], b[0]), p(-b[1], x[0])), -M[2]), T(f(p(x[1], M[0]), p(-M[1], x[0])), b[2]))), d[3]), f(T(f(T(f(p(M[1], b[0]), p(-b[1], M[0])), d[2]), f(T(f(p(d[1], b[0]), p(-b[1], d[0])), -M[2]), T(f(p(d[1], M[0]), p(-M[1], d[0])), b[2]))), -x[3]), T(f(T(f(p(x[1], b[0]), p(-b[1], x[0])), d[2]), f(T(f(p(d[1], b[0]), p(-b[1], d[0])), -x[2]), T(f(p(d[1], x[0]), p(-x[1], d[0])), b[2]))), M[3]))), f(T(f(T(f(p(x[1], M[0]), p(-M[1], x[0])), d[2]), f(T(f(p(d[1], M[0]), p(-M[1], d[0])), -x[2]), T(f(p(d[1], x[0]), p(-x[1], d[0])), M[2]))), -b[3]), f(T(f(T(f(p(M[1], b[0]), p(-b[1], M[0])), d[2]), f(T(f(p(d[1], b[0]), p(-b[1], d[0])), -M[2]), T(f(p(d[1], M[0]), p(-M[1], d[0])), b[2]))), E[3]), T(f(T(f(p(M[1], b[0]), p(-b[1], M[0])), E[2]), f(T(f(p(E[1], b[0]), p(-b[1], E[0])), -M[2]), T(f(p(E[1], M[0]), p(-M[1], E[0])), b[2]))), -d[3])))), f(f(T(f(T(f(p(d[1], b[0]), p(-b[1], d[0])), E[2]), f(T(f(p(E[1], b[0]), p(-b[1], E[0])), -d[2]), T(f(p(E[1], d[0]), p(-d[1], E[0])), b[2]))), M[3]), f(T(f(T(f(p(d[1], M[0]), p(-M[1], d[0])), E[2]), f(T(f(p(E[1], M[0]), p(-M[1], E[0])), -d[2]), T(f(p(E[1], d[0]), p(-d[1], E[0])), M[2]))), -b[3]), T(f(T(f(p(x[1], M[0]), p(-M[1], x[0])), d[2]), f(T(f(p(d[1], M[0]), p(-M[1], d[0])), -x[2]), T(f(p(d[1], x[0]), p(-x[1], d[0])), M[2]))), E[3]))), f(T(f(T(f(p(x[1], M[0]), p(-M[1], x[0])), E[2]), f(T(f(p(E[1], M[0]), p(-M[1], E[0])), -x[2]), T(f(p(E[1], x[0]), p(-x[1], E[0])), M[2]))), -d[3]), f(T(f(T(f(p(d[1], M[0]), p(-M[1], d[0])), E[2]), f(T(f(p(E[1], M[0]), p(-M[1], E[0])), -d[2]), T(f(p(E[1], d[0]), p(-d[1], E[0])), M[2]))), x[3]), T(f(T(f(p(d[1], x[0]), p(-x[1], d[0])), E[2]), f(T(f(p(E[1], x[0]), p(-x[1], E[0])), -d[2]), T(f(p(E[1], d[0]), p(-d[1], E[0])), x[2]))), -M[3]))))), Y = f(f(f(T(f(T(f(p(M[1], b[0]), p(-b[1], M[0])), x[2]), f(T(f(p(x[1], b[0]), p(-b[1], x[0])), -M[2]), T(f(p(x[1], M[0]), p(-M[1], x[0])), b[2]))), E[3]), T(f(T(f(p(M[1], b[0]), p(-b[1], M[0])), E[2]), f(T(f(p(E[1], b[0]), p(-b[1], E[0])), -M[2]), T(f(p(E[1], M[0]), p(-M[1], E[0])), b[2]))), -x[3])), f(T(f(T(f(p(x[1], b[0]), p(-b[1], x[0])), E[2]), f(T(f(p(E[1], b[0]), p(-b[1], E[0])), -x[2]), T(f(p(E[1], x[0]), p(-x[1], E[0])), b[2]))), M[3]), T(f(T(f(p(x[1], M[0]), p(-M[1], x[0])), E[2]), f(T(f(p(E[1], M[0]), p(-M[1], E[0])), -x[2]), T(f(p(E[1], x[0]), p(-x[1], E[0])), M[2]))), -b[3]))), f(f(T(f(T(f(p(x[1], b[0]), p(-b[1], x[0])), d[2]), f(T(f(p(d[1], b[0]), p(-b[1], d[0])), -x[2]), T(f(p(d[1], x[0]), p(-x[1], d[0])), b[2]))), E[3]), T(f(T(f(p(x[1], b[0]), p(-b[1], x[0])), E[2]), f(T(f(p(E[1], b[0]), p(-b[1], E[0])), -x[2]), T(f(p(E[1], x[0]), p(-x[1], E[0])), b[2]))), -d[3])), f(T(f(T(f(p(d[1], b[0]), p(-b[1], d[0])), E[2]), f(T(f(p(E[1], b[0]), p(-b[1], E[0])), -d[2]), T(f(p(E[1], d[0]), p(-d[1], E[0])), b[2]))), x[3]), T(f(T(f(p(d[1], x[0]), p(-x[1], d[0])), E[2]), f(T(f(p(E[1], x[0]), p(-x[1], E[0])), -d[2]), T(f(p(E[1], d[0]), p(-d[1], E[0])), x[2]))), -b[3])))), H = A(Z, Y);
      return H[H.length - 1];
    };
  }
  function g(f) {
    var p = f === 3 ? c : f === 4 ? l : u;
    return p(e, t, i, n);
  }
  var w = g(3), y = g(4), _ = [
    function() {
      return 0;
    },
    function() {
      return 0;
    },
    function(p, T) {
      return T[0] - p[0];
    },
    function(p, T, A) {
      var C = (p[1] - A[1]) * (T[0] - A[0]), E = (p[0] - A[0]) * (T[1] - A[1]), d = C - E, x;
      if (C > 0) {
        if (E <= 0)
          return d;
        x = C + E;
      } else if (C < 0) {
        if (E >= 0)
          return d;
        x = -(C + E);
      } else
        return d;
      var M = a * x;
      return d >= M || d <= -M ? d : w(p, T, A);
    },
    function(p, T, A, C) {
      var E = p[0] - C[0], d = T[0] - C[0], x = A[0] - C[0], M = p[1] - C[1], b = T[1] - C[1], Z = A[1] - C[1], Y = p[2] - C[2], H = T[2] - C[2], V = A[2] - C[2], st = d * Z, ht = x * b, dt = x * M, tt = E * Z, Tt = E * b, U = d * M, it = Y * (st - ht) + H * (dt - tt) + V * (Tt - U), ft = (Math.abs(st) + Math.abs(ht)) * Math.abs(Y) + (Math.abs(dt) + Math.abs(tt)) * Math.abs(H) + (Math.abs(Tt) + Math.abs(U)) * Math.abs(V), ct = h * ft;
      return it > ct || -it > ct ? it : y(p, T, A, C);
    }
  ];
  function I(f) {
    var p = _[f.length];
    return p || (p = _[f.length] = g(f.length)), p.apply(void 0, f);
  }
  function v(f, p, T, A, C, E, d) {
    return function(M, b, Z, Y, H) {
      switch (arguments.length) {
        case 0:
        case 1:
          return 0;
        case 2:
          return A(M, b);
        case 3:
          return C(M, b, Z);
        case 4:
          return E(M, b, Z, Y);
        case 5:
          return d(M, b, Z, Y, H);
      }
      for (var V = new Array(arguments.length), st = 0; st < arguments.length; ++st)
        V[st] = arguments[st];
      return f(V);
    };
  }
  function S() {
    for (; _.length <= s; )
      _.push(g(_.length));
    r.exports = v.apply(void 0, [I].concat(_));
    for (var f = 0; f <= s; ++f)
      r.exports[f] = _[f];
  }
  S();
})(al);
var xl = Tl, mr = Oi;
function Tl(r, t) {
  for (var e = t[0], i = t[1], n = r.length, s = 1, o = n, a = 0, h = n - 1; a < o; h = a++) {
    var c = r[a], l = r[h], u = c[1], g = l[1];
    if (g < u) {
      if (g < i && i < u) {
        var w = mr(c, l, t);
        if (w === 0)
          return 0;
        s ^= 0 < w | 0;
      } else if (i === u) {
        var y = r[(a + 1) % n], _ = y[1];
        if (u < _) {
          var w = mr(c, l, t);
          if (w === 0)
            return 0;
          s ^= 0 < w | 0;
        }
      }
    } else if (u < g) {
      if (u < i && i < g) {
        var w = mr(c, l, t);
        if (w === 0)
          return 0;
        s ^= w < 0 | 0;
      } else if (i === u) {
        var y = r[(a + 1) % n], _ = y[1];
        if (_ < u) {
          var w = mr(c, l, t);
          if (w === 0)
            return 0;
          s ^= w < 0 | 0;
        }
      }
    } else if (i === u) {
      var I = Math.min(c[0], l[0]), v = Math.max(c[0], l[0]);
      if (a === 0) {
        for (; h > 0; ) {
          var S = (h + n - 1) % n, f = r[S];
          if (f[1] !== i)
            break;
          var p = f[0];
          I = Math.min(I, p), v = Math.max(v, p), h = S;
        }
        if (h === 0)
          return I <= e && e <= v ? 0 : 1;
        o = h + 1;
      }
      for (var T = r[(h + n - 1) % n][1]; a + 1 < o; ) {
        var f = r[a + 1];
        if (f[1] !== i)
          break;
        var p = f[0];
        I = Math.min(I, p), v = Math.max(v, p), a += 1;
      }
      if (I <= e && e <= v)
        return 0;
      var A = r[(a + 1) % n][1];
      e < I && T < i != A < i && (s ^= 1);
    }
  }
  return 2 * s - 1;
}
var Mr = {};
const bl = "1.5.0", Ml = {
  version: bl
};
function Us(r) {
  return "(" + r.x + ";" + r.y + ")";
}
function _l(r) {
  var t = r.toString();
  return t === "[object Object]" ? Us(r) : t;
}
function El(r, t) {
  return r.y === t.y ? r.x - t.x : r.y - t.y;
}
function Il(r, t) {
  return r.x === t.x && r.y === t.y;
}
var Zi = {
  toString: _l,
  toStringBase: Us,
  compare: El,
  equals: Il
}, Sl = Zi, Gr = function(r, t) {
  this.name = "PointError", this.points = t = t || [], this.message = r || "Invalid Points!";
  for (var e = 0; e < t.length; e++)
    this.message += " " + Sl.toString(t[e]);
};
Gr.prototype = new Error();
Gr.prototype.constructor = Gr;
var $i = Gr, Xe = Zi, Q = function(r, t) {
  this.x = +r || 0, this.y = +t || 0, this._p2t_edge_list = null;
};
Q.prototype.toString = function() {
  return Xe.toStringBase(this);
};
Q.prototype.toJSON = function() {
  return { x: this.x, y: this.y };
};
Q.prototype.clone = function() {
  return new Q(this.x, this.y);
};
Q.prototype.set_zero = function() {
  return this.x = 0, this.y = 0, this;
};
Q.prototype.set = function(r, t) {
  return this.x = +r || 0, this.y = +t || 0, this;
};
Q.prototype.negate = function() {
  return this.x = -this.x, this.y = -this.y, this;
};
Q.prototype.add = function(r) {
  return this.x += r.x, this.y += r.y, this;
};
Q.prototype.sub = function(r) {
  return this.x -= r.x, this.y -= r.y, this;
};
Q.prototype.mul = function(r) {
  return this.x *= r, this.y *= r, this;
};
Q.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
Q.prototype.normalize = function() {
  var r = this.length();
  return this.x /= r, this.y /= r, r;
};
Q.prototype.equals = function(r) {
  return this.x === r.x && this.y === r.y;
};
Q.negate = function(r) {
  return new Q(-r.x, -r.y);
};
Q.add = function(r, t) {
  return new Q(r.x + t.x, r.y + t.y);
};
Q.sub = function(r, t) {
  return new Q(r.x - t.x, r.y - t.y);
};
Q.mul = function(r, t) {
  return new Q(r * t.x, r * t.y);
};
Q.cross = function(r, t) {
  return typeof r == "number" ? typeof t == "number" ? r * t : new Q(-r * t.y, r * t.x) : typeof t == "number" ? new Q(t * r.y, -t * r.x) : r.x * t.y - r.y * t.x;
};
Q.toString = Xe.toString;
Q.compare = Xe.compare;
Q.cmp = Xe.compare;
Q.equals = Xe.equals;
Q.dot = function(r, t) {
  return r.x * t.x + r.y * t.y;
};
var Ws = Q, Al = Zi, q = function(r, t, e) {
  this.points_ = [r, t, e], this.neighbors_ = [null, null, null], this.interior_ = !1, this.constrained_edge = [!1, !1, !1], this.delaunay_edge = [!1, !1, !1];
}, ui = Al.toString;
q.prototype.toString = function() {
  return "[" + ui(this.points_[0]) + ui(this.points_[1]) + ui(this.points_[2]) + "]";
};
q.prototype.getPoint = function(r) {
  return this.points_[r];
};
q.prototype.GetPoint = q.prototype.getPoint;
q.prototype.getPoints = function() {
  return this.points_;
};
q.prototype.getNeighbor = function(r) {
  return this.neighbors_[r];
};
q.prototype.containsPoint = function(r) {
  var t = this.points_;
  return r === t[0] || r === t[1] || r === t[2];
};
q.prototype.containsEdge = function(r) {
  return this.containsPoint(r.p) && this.containsPoint(r.q);
};
q.prototype.containsPoints = function(r, t) {
  return this.containsPoint(r) && this.containsPoint(t);
};
q.prototype.isInterior = function() {
  return this.interior_;
};
q.prototype.setInterior = function(r) {
  return this.interior_ = r, this;
};
q.prototype.markNeighborPointers = function(r, t, e) {
  var i = this.points_;
  if (r === i[2] && t === i[1] || r === i[1] && t === i[2])
    this.neighbors_[0] = e;
  else if (r === i[0] && t === i[2] || r === i[2] && t === i[0])
    this.neighbors_[1] = e;
  else if (r === i[0] && t === i[1] || r === i[1] && t === i[0])
    this.neighbors_[2] = e;
  else
    throw new Error("poly2tri Invalid Triangle.markNeighborPointers() call");
};
q.prototype.markNeighbor = function(r) {
  var t = this.points_;
  r.containsPoints(t[1], t[2]) ? (this.neighbors_[0] = r, r.markNeighborPointers(t[1], t[2], this)) : r.containsPoints(t[0], t[2]) ? (this.neighbors_[1] = r, r.markNeighborPointers(t[0], t[2], this)) : r.containsPoints(t[0], t[1]) && (this.neighbors_[2] = r, r.markNeighborPointers(t[0], t[1], this));
};
q.prototype.clearNeighbors = function() {
  this.neighbors_[0] = null, this.neighbors_[1] = null, this.neighbors_[2] = null;
};
q.prototype.clearDelaunayEdges = function() {
  this.delaunay_edge[0] = !1, this.delaunay_edge[1] = !1, this.delaunay_edge[2] = !1;
};
q.prototype.pointCW = function(r) {
  var t = this.points_;
  return r === t[0] ? t[2] : r === t[1] ? t[0] : r === t[2] ? t[1] : null;
};
q.prototype.pointCCW = function(r) {
  var t = this.points_;
  return r === t[0] ? t[1] : r === t[1] ? t[2] : r === t[2] ? t[0] : null;
};
q.prototype.neighborCW = function(r) {
  return r === this.points_[0] ? this.neighbors_[1] : r === this.points_[1] ? this.neighbors_[2] : this.neighbors_[0];
};
q.prototype.neighborCCW = function(r) {
  return r === this.points_[0] ? this.neighbors_[2] : r === this.points_[1] ? this.neighbors_[0] : this.neighbors_[1];
};
q.prototype.getConstrainedEdgeCW = function(r) {
  return r === this.points_[0] ? this.constrained_edge[1] : r === this.points_[1] ? this.constrained_edge[2] : this.constrained_edge[0];
};
q.prototype.getConstrainedEdgeCCW = function(r) {
  return r === this.points_[0] ? this.constrained_edge[2] : r === this.points_[1] ? this.constrained_edge[0] : this.constrained_edge[1];
};
q.prototype.getConstrainedEdgeAcross = function(r) {
  return r === this.points_[0] ? this.constrained_edge[0] : r === this.points_[1] ? this.constrained_edge[1] : this.constrained_edge[2];
};
q.prototype.setConstrainedEdgeCW = function(r, t) {
  r === this.points_[0] ? this.constrained_edge[1] = t : r === this.points_[1] ? this.constrained_edge[2] = t : this.constrained_edge[0] = t;
};
q.prototype.setConstrainedEdgeCCW = function(r, t) {
  r === this.points_[0] ? this.constrained_edge[2] = t : r === this.points_[1] ? this.constrained_edge[0] = t : this.constrained_edge[1] = t;
};
q.prototype.getDelaunayEdgeCW = function(r) {
  return r === this.points_[0] ? this.delaunay_edge[1] : r === this.points_[1] ? this.delaunay_edge[2] : this.delaunay_edge[0];
};
q.prototype.getDelaunayEdgeCCW = function(r) {
  return r === this.points_[0] ? this.delaunay_edge[2] : r === this.points_[1] ? this.delaunay_edge[0] : this.delaunay_edge[1];
};
q.prototype.setDelaunayEdgeCW = function(r, t) {
  r === this.points_[0] ? this.delaunay_edge[1] = t : r === this.points_[1] ? this.delaunay_edge[2] = t : this.delaunay_edge[0] = t;
};
q.prototype.setDelaunayEdgeCCW = function(r, t) {
  r === this.points_[0] ? this.delaunay_edge[2] = t : r === this.points_[1] ? this.delaunay_edge[0] = t : this.delaunay_edge[1] = t;
};
q.prototype.neighborAcross = function(r) {
  return r === this.points_[0] ? this.neighbors_[0] : r === this.points_[1] ? this.neighbors_[1] : this.neighbors_[2];
};
q.prototype.oppositePoint = function(r, t) {
  var e = r.pointCW(t);
  return this.pointCW(e);
};
q.prototype.legalize = function(r, t) {
  var e = this.points_;
  if (r === e[0])
    e[1] = e[0], e[0] = e[2], e[2] = t;
  else if (r === e[1])
    e[2] = e[1], e[1] = e[0], e[0] = t;
  else if (r === e[2])
    e[0] = e[2], e[2] = e[1], e[1] = t;
  else
    throw new Error("poly2tri Invalid Triangle.legalize() call");
};
q.prototype.index = function(r) {
  var t = this.points_;
  if (r === t[0])
    return 0;
  if (r === t[1])
    return 1;
  if (r === t[2])
    return 2;
  throw new Error("poly2tri Invalid Triangle.index() call");
};
q.prototype.edgeIndex = function(r, t) {
  var e = this.points_;
  if (r === e[0]) {
    if (t === e[1])
      return 2;
    if (t === e[2])
      return 1;
  } else if (r === e[1]) {
    if (t === e[2])
      return 0;
    if (t === e[0])
      return 2;
  } else if (r === e[2]) {
    if (t === e[0])
      return 1;
    if (t === e[1])
      return 0;
  }
  return -1;
};
q.prototype.markConstrainedEdgeByIndex = function(r) {
  this.constrained_edge[r] = !0;
};
q.prototype.markConstrainedEdgeByEdge = function(r) {
  this.markConstrainedEdgeByPoints(r.p, r.q);
};
q.prototype.markConstrainedEdgeByPoints = function(r, t) {
  var e = this.points_;
  t === e[0] && r === e[1] || t === e[1] && r === e[0] ? this.constrained_edge[2] = !0 : t === e[0] && r === e[2] || t === e[2] && r === e[0] ? this.constrained_edge[1] = !0 : (t === e[1] && r === e[2] || t === e[2] && r === e[1]) && (this.constrained_edge[0] = !0);
};
var qi = q, Xi = {};
function Pl(r, t) {
  if (!r)
    throw new Error(t || "Assert Failed");
}
var Cl = Pl, Ze = {}, Rl = {
  get exports() {
    return Ze;
  },
  set exports(r) {
    Ze = r;
  }
}, kl = function(r, t) {
  this.point = r, this.triangle = t || null, this.next = null, this.prev = null, this.value = r.x;
}, Lt = function(r, t) {
  this.head_ = r, this.tail_ = t, this.search_node_ = r;
};
Lt.prototype.head = function() {
  return this.head_;
};
Lt.prototype.setHead = function(r) {
  this.head_ = r;
};
Lt.prototype.tail = function() {
  return this.tail_;
};
Lt.prototype.setTail = function(r) {
  this.tail_ = r;
};
Lt.prototype.search = function() {
  return this.search_node_;
};
Lt.prototype.setSearch = function(r) {
  this.search_node_ = r;
};
Lt.prototype.findSearchNode = function() {
  return this.search_node_;
};
Lt.prototype.locateNode = function(r) {
  var t = this.search_node_;
  if (r < t.value) {
    for (; t = t.prev; )
      if (r >= t.value)
        return this.search_node_ = t, t;
  } else
    for (; t = t.next; )
      if (r < t.value)
        return this.search_node_ = t.prev, t.prev;
  return null;
};
Lt.prototype.locatePoint = function(r) {
  var t = r.x, e = this.findSearchNode(t), i = e.point.x;
  if (t === i) {
    if (r !== e.point)
      if (r === e.prev.point)
        e = e.prev;
      else if (r === e.next.point)
        e = e.next;
      else
        throw new Error("poly2tri Invalid AdvancingFront.locatePoint() call");
  } else if (t < i)
    for (; (e = e.prev) && r !== e.point; )
      ;
  else
    for (; (e = e.next) && r !== e.point; )
      ;
  return e && (this.search_node_ = e), e;
};
Rl.exports = Lt;
Ze.Node = kl;
var Te = {}, $e = 1e-12;
Te.EPSILON = $e;
var _r = {
  CW: 1,
  CCW: -1,
  COLLINEAR: 0
};
Te.Orientation = _r;
function Ol(r, t, e) {
  var i = (r.x - e.x) * (t.y - e.y), n = (r.y - e.y) * (t.x - e.x), s = i - n;
  return s > -$e && s < $e ? _r.COLLINEAR : s > 0 ? _r.CCW : _r.CW;
}
Te.orient2d = Ol;
function Nl(r, t, e, i) {
  var n = (r.x - t.x) * (i.y - t.y) - (i.x - t.x) * (r.y - t.y);
  if (n >= -$e)
    return !1;
  var s = (r.x - e.x) * (i.y - e.y) - (i.x - e.x) * (r.y - e.y);
  return !(s <= $e);
}
Te.inScanArea = Nl;
function Ll(r, t, e) {
  var i = t.x - r.x, n = t.y - r.y, s = e.x - r.x, o = e.y - r.y;
  return i * s + n * o < 0;
}
Te.isAngleObtuse = Ll;
var Hi = Cl, Fr = $i, Vs = qi, jl = Ze.Node, He = Te, Bl = He.EPSILON, nt = He.Orientation, at = He.orient2d, zs = He.inScanArea, Pn = He.isAngleObtuse;
function Dl(r) {
  r.initTriangulation(), r.createAdvancingFront(), Gl(r), Fl(r);
}
function Gl(r) {
  var t, e = r.pointCount();
  for (t = 1; t < e; ++t)
    for (var i = r.getPoint(t), n = Ul(r, i), s = i._p2t_edge_list, o = 0; s && o < s.length; ++o)
      Wl(r, s[o], n);
}
function Fl(r) {
  for (var t = r.front().head().next.triangle, e = r.front().head().next.point; !t.getConstrainedEdgeCW(e); )
    t = t.neighborCCW(e);
  r.meshClean(t);
}
function Ul(r, t) {
  var e = r.locateNode(t), i = Vl(r, t, e);
  return t.x <= e.point.x + Bl && ve(r, e), zl(r, i), i;
}
function Wl(r, t, e) {
  r.edge_event.constrained_edge = t, r.edge_event.right = t.p.x > t.q.x, !Zs(e.triangle, t.p, t.q) && (Hl(r, t, e), Yi(r, t.p, t.q, e.triangle, t.q));
}
function Yi(r, t, e, i, n) {
  if (!Zs(i, t, e)) {
    var s = i.pointCCW(n), o = at(e, s, t);
    if (o === nt.COLLINEAR)
      throw new Fr("poly2tri EdgeEvent: Collinear not supported!", [e, s, t]);
    var a = i.pointCW(n), h = at(e, a, t);
    if (h === nt.COLLINEAR)
      throw new Fr("poly2tri EdgeEvent: Collinear not supported!", [e, a, t]);
    o === h ? (o === nt.CW ? i = i.neighborCCW(n) : i = i.neighborCW(n), Yi(r, t, e, i, n)) : Qi(r, t, e, i, n);
  }
}
function Zs(r, t, e) {
  var i = r.edgeIndex(t, e);
  if (i !== -1) {
    r.markConstrainedEdgeByIndex(i);
    var n = r.getNeighbor(i);
    return n && n.markConstrainedEdgeByPoints(t, e), !0;
  }
  return !1;
}
function Vl(r, t, e) {
  var i = new Vs(t, e.point, e.next.point);
  i.markNeighbor(e.triangle), r.addToMap(i);
  var n = new jl(t);
  return n.next = e.next, n.prev = e, e.next.prev = n, e.next = n, te(r, i) || r.mapTriangleToNodes(i), n;
}
function ve(r, t) {
  var e = new Vs(t.prev.point, t.point, t.next.point);
  e.markNeighbor(t.prev.triangle), e.markNeighbor(t.triangle), r.addToMap(e), t.prev.next = t.next, t.next.prev = t.prev, te(r, e) || r.mapTriangleToNodes(e);
}
function zl(r, t) {
  for (var e = t.next; e.next && !Pn(e.point, e.next.point, e.prev.point); )
    ve(r, e), e = e.next;
  for (e = t.prev; e.prev && !Pn(e.point, e.next.point, e.prev.point); )
    ve(r, e), e = e.prev;
  t.next && t.next.next && Zl(t) && ql(r, t);
}
function Zl(r) {
  var t = r.point.x - r.next.next.point.x, e = r.point.y - r.next.next.point.y;
  return Hi(e >= 0, "unordered y"), t >= 0 || Math.abs(t) < e;
}
function te(r, t) {
  for (var e = 0; e < 3; ++e)
    if (!t.delaunay_edge[e]) {
      var i = t.getNeighbor(e);
      if (i) {
        var n = t.getPoint(e), s = i.oppositePoint(t, n), o = i.index(s);
        if (i.constrained_edge[o] || i.delaunay_edge[o]) {
          t.constrained_edge[e] = i.constrained_edge[o];
          continue;
        }
        var a = $l(n, t.pointCCW(n), t.pointCW(n), s);
        if (a) {
          t.delaunay_edge[e] = !0, i.delaunay_edge[o] = !0, $s(t, n, i, s);
          var h = !te(r, t);
          return h && r.mapTriangleToNodes(t), h = !te(r, i), h && r.mapTriangleToNodes(i), t.delaunay_edge[e] = !1, i.delaunay_edge[o] = !1, !0;
        }
      }
    }
  return !1;
}
function $l(r, t, e, i) {
  var n = r.x - i.x, s = r.y - i.y, o = t.x - i.x, a = t.y - i.y, h = n * a, c = o * s, l = h - c;
  if (l <= 0)
    return !1;
  var u = e.x - i.x, g = e.y - i.y, w = u * s, y = n * g, _ = w - y;
  if (_ <= 0)
    return !1;
  var I = o * g, v = u * a, S = n * n + s * s, f = o * o + a * a, p = u * u + g * g, T = S * (I - v) + f * _ + p * l;
  return T > 0;
}
function $s(r, t, e, i) {
  var n, s, o, a;
  n = r.neighborCCW(t), s = r.neighborCW(t), o = e.neighborCCW(i), a = e.neighborCW(i);
  var h, c, l, u;
  h = r.getConstrainedEdgeCCW(t), c = r.getConstrainedEdgeCW(t), l = e.getConstrainedEdgeCCW(i), u = e.getConstrainedEdgeCW(i);
  var g, w, y, _;
  g = r.getDelaunayEdgeCCW(t), w = r.getDelaunayEdgeCW(t), y = e.getDelaunayEdgeCCW(i), _ = e.getDelaunayEdgeCW(i), r.legalize(t, i), e.legalize(i, t), e.setDelaunayEdgeCCW(t, g), r.setDelaunayEdgeCW(t, w), r.setDelaunayEdgeCCW(i, y), e.setDelaunayEdgeCW(i, _), e.setConstrainedEdgeCCW(t, h), r.setConstrainedEdgeCW(t, c), r.setConstrainedEdgeCCW(i, l), e.setConstrainedEdgeCW(i, u), r.clearNeighbors(), e.clearNeighbors(), n && e.markNeighbor(n), s && r.markNeighbor(s), o && r.markNeighbor(o), a && e.markNeighbor(a), r.markNeighbor(e);
}
function ql(r, t) {
  for (at(t.point, t.next.point, t.next.next.point) === nt.CCW ? r.basin.left_node = t.next.next : r.basin.left_node = t.next, r.basin.bottom_node = r.basin.left_node; r.basin.bottom_node.next && r.basin.bottom_node.point.y >= r.basin.bottom_node.next.point.y; )
    r.basin.bottom_node = r.basin.bottom_node.next;
  if (r.basin.bottom_node !== r.basin.left_node) {
    for (r.basin.right_node = r.basin.bottom_node; r.basin.right_node.next && r.basin.right_node.point.y < r.basin.right_node.next.point.y; )
      r.basin.right_node = r.basin.right_node.next;
    r.basin.right_node !== r.basin.bottom_node && (r.basin.width = r.basin.right_node.point.x - r.basin.left_node.point.x, r.basin.left_highest = r.basin.left_node.point.y > r.basin.right_node.point.y, qs(r, r.basin.bottom_node));
  }
}
function qs(r, t) {
  if (!Xl(r, t)) {
    ve(r, t);
    var e;
    if (!(t.prev === r.basin.left_node && t.next === r.basin.right_node)) {
      if (t.prev === r.basin.left_node) {
        if (e = at(t.point, t.next.point, t.next.next.point), e === nt.CW)
          return;
        t = t.next;
      } else if (t.next === r.basin.right_node) {
        if (e = at(t.point, t.prev.point, t.prev.prev.point), e === nt.CCW)
          return;
        t = t.prev;
      } else
        t.prev.point.y < t.next.point.y ? t = t.prev : t = t.next;
      qs(r, t);
    }
  }
}
function Xl(r, t) {
  var e;
  return r.basin.left_highest ? e = r.basin.left_node.point.y - t.point.y : e = r.basin.right_node.point.y - t.point.y, r.basin.width > e;
}
function Hl(r, t, e) {
  r.edge_event.right ? Yl(r, t, e) : Jl(r, t, e);
}
function Yl(r, t, e) {
  for (; e.next.point.x < t.p.x; )
    at(t.q, e.next.point, t.p) === nt.CCW ? Xs(r, t, e) : e = e.next;
}
function Xs(r, t, e) {
  e.point.x < t.p.x && (at(e.point, e.next.point, e.next.next.point) === nt.CCW ? Ji(r, t, e) : (Hs(r, t, e), Xs(r, t, e)));
}
function Ji(r, t, e) {
  ve(r, e.next), e.next.point !== t.p && at(t.q, e.next.point, t.p) === nt.CCW && at(e.point, e.next.point, e.next.next.point) === nt.CCW && Ji(r, t, e);
}
function Hs(r, t, e) {
  at(e.next.point, e.next.next.point, e.next.next.next.point) === nt.CCW ? Ji(r, t, e.next) : at(t.q, e.next.next.point, t.p) === nt.CCW && Hs(r, t, e.next);
}
function Jl(r, t, e) {
  for (; e.prev.point.x > t.p.x; )
    at(t.q, e.prev.point, t.p) === nt.CW ? Ys(r, t, e) : e = e.prev;
}
function Ys(r, t, e) {
  e.point.x > t.p.x && (at(e.point, e.prev.point, e.prev.prev.point) === nt.CW ? Ki(r, t, e) : (Js(r, t, e), Ys(r, t, e)));
}
function Js(r, t, e) {
  at(e.prev.point, e.prev.prev.point, e.prev.prev.prev.point) === nt.CW ? Ki(r, t, e.prev) : at(t.q, e.prev.prev.point, t.p) === nt.CW && Js(r, t, e.prev);
}
function Ki(r, t, e) {
  ve(r, e.prev), e.prev.point !== t.p && at(t.q, e.prev.point, t.p) === nt.CW && at(e.point, e.prev.point, e.prev.prev.point) === nt.CW && Ki(r, t, e);
}
function Qi(r, t, e, i, n) {
  var s = i.neighborAcross(n);
  Hi(s, "FLIP failed due to missing triangle!");
  var o = s.oppositePoint(i, n);
  if (i.getConstrainedEdgeAcross(n)) {
    var a = i.index(n);
    throw new Fr(
      "poly2tri Intersecting Constraints",
      [n, o, i.getPoint((a + 1) % 3), i.getPoint((a + 2) % 3)]
    );
  }
  if (zs(n, i.pointCCW(n), i.pointCW(n), o))
    if ($s(i, n, s, o), r.mapTriangleToNodes(i), r.mapTriangleToNodes(s), n === e && o === t)
      e === r.edge_event.constrained_edge.q && t === r.edge_event.constrained_edge.p && (i.markConstrainedEdgeByPoints(t, e), s.markConstrainedEdgeByPoints(t, e), te(r, i), te(r, s));
    else {
      var h = at(e, o, t);
      i = Kl(r, h, i, s, n, o), Qi(r, t, e, i, n);
    }
  else {
    var c = Ks(t, e, s, o);
    Qs(r, t, e, i, s, c), Yi(r, t, e, i, n);
  }
}
function Kl(r, t, e, i, n, s) {
  var o;
  return t === nt.CCW ? (o = i.edgeIndex(n, s), i.delaunay_edge[o] = !0, te(r, i), i.clearDelaunayEdges(), e) : (o = e.edgeIndex(n, s), e.delaunay_edge[o] = !0, te(r, e), e.clearDelaunayEdges(), i);
}
function Ks(r, t, e, i) {
  var n = at(t, i, r);
  if (n === nt.CW)
    return e.pointCCW(i);
  if (n === nt.CCW)
    return e.pointCW(i);
  throw new Fr("poly2tri [Unsupported] nextFlipPoint: opposing point on constrained edge!", [t, i, r]);
}
function Qs(r, t, e, i, n, s) {
  var o = n.neighborAcross(s);
  Hi(o, "FLIP failed due to missing triangle");
  var a = o.oppositePoint(n, s);
  if (zs(e, i.pointCCW(e), i.pointCW(e), a))
    Qi(r, e, a, o, a);
  else {
    var h = Ks(t, e, o, a);
    Qs(r, t, e, i, o, h);
  }
}
Xi.triangulate = Dl;
var Ql = $i, be = Ws, tu = qi, eu = Xi, to = Ze, di = to.Node, Cn = 0.3, ru = function(r, t) {
  if (this.p = r, this.q = t, r.y > t.y)
    this.q = r, this.p = t;
  else if (r.y === t.y) {
    if (r.x > t.x)
      this.q = r, this.p = t;
    else if (r.x === t.x)
      throw new Ql("poly2tri Invalid Edge constructor: repeated points!", [r]);
  }
  this.q._p2t_edge_list || (this.q._p2t_edge_list = []), this.q._p2t_edge_list.push(this);
}, eo = function() {
  this.left_node = null, this.bottom_node = null, this.right_node = null, this.width = 0, this.left_highest = !1;
};
eo.prototype.clear = function() {
  this.left_node = null, this.bottom_node = null, this.right_node = null, this.width = 0, this.left_highest = !1;
};
var iu = function() {
  this.constrained_edge = null, this.right = !1;
}, K = function(r, t) {
  t = t || {}, this.triangles_ = [], this.map_ = [], this.points_ = t.cloneArrays ? r.slice(0) : r, this.edge_list = [], this.pmin_ = this.pmax_ = null, this.front_ = null, this.head_ = null, this.tail_ = null, this.af_head_ = null, this.af_middle_ = null, this.af_tail_ = null, this.basin = new eo(), this.edge_event = new iu(), this.initEdges(this.points_);
};
K.prototype.addHole = function(r) {
  this.initEdges(r);
  var t, e = r.length;
  for (t = 0; t < e; t++)
    this.points_.push(r[t]);
  return this;
};
K.prototype.AddHole = K.prototype.addHole;
K.prototype.addHoles = function(r) {
  var t, e = r.length;
  for (t = 0; t < e; t++)
    this.initEdges(r[t]);
  return this.points_ = this.points_.concat.apply(this.points_, r), this;
};
K.prototype.addPoint = function(r) {
  return this.points_.push(r), this;
};
K.prototype.AddPoint = K.prototype.addPoint;
K.prototype.addPoints = function(r) {
  return this.points_ = this.points_.concat(r), this;
};
K.prototype.triangulate = function() {
  return eu.triangulate(this), this;
};
K.prototype.getBoundingBox = function() {
  return { min: this.pmin_, max: this.pmax_ };
};
K.prototype.getTriangles = function() {
  return this.triangles_;
};
K.prototype.GetTriangles = K.prototype.getTriangles;
K.prototype.front = function() {
  return this.front_;
};
K.prototype.pointCount = function() {
  return this.points_.length;
};
K.prototype.head = function() {
  return this.head_;
};
K.prototype.setHead = function(r) {
  this.head_ = r;
};
K.prototype.tail = function() {
  return this.tail_;
};
K.prototype.setTail = function(r) {
  this.tail_ = r;
};
K.prototype.getMap = function() {
  return this.map_;
};
K.prototype.initTriangulation = function() {
  var r = this.points_[0].x, t = this.points_[0].x, e = this.points_[0].y, i = this.points_[0].y, n, s = this.points_.length;
  for (n = 1; n < s; n++) {
    var o = this.points_[n];
    o.x > r && (r = o.x), o.x < t && (t = o.x), o.y > e && (e = o.y), o.y < i && (i = o.y);
  }
  this.pmin_ = new be(t, i), this.pmax_ = new be(r, e);
  var a = Cn * (r - t), h = Cn * (e - i);
  this.head_ = new be(r + a, i - h), this.tail_ = new be(t - a, i - h), this.points_.sort(be.compare);
};
K.prototype.initEdges = function(r) {
  var t, e = r.length;
  for (t = 0; t < e; ++t)
    this.edge_list.push(new ru(r[t], r[(t + 1) % e]));
};
K.prototype.getPoint = function(r) {
  return this.points_[r];
};
K.prototype.addToMap = function(r) {
  this.map_.push(r);
};
K.prototype.locateNode = function(r) {
  return this.front_.locateNode(r.x);
};
K.prototype.createAdvancingFront = function() {
  var r, t, e, i = new tu(this.points_[0], this.tail_, this.head_);
  this.map_.push(i), r = new di(i.getPoint(1), i), t = new di(i.getPoint(0), i), e = new di(i.getPoint(2)), this.front_ = new to(r, e), r.next = t, t.next = e, t.prev = r, e.prev = t;
};
K.prototype.removeNode = function(r) {
};
K.prototype.mapTriangleToNodes = function(r) {
  for (var t = 0; t < 3; ++t)
    if (!r.getNeighbor(t)) {
      var e = this.front_.locatePoint(r.pointCW(r.getPoint(t)));
      e && (e.triangle = r);
    }
};
K.prototype.removeFromMap = function(r) {
  var t, e = this.map_, i = e.length;
  for (t = 0; t < i; t++)
    if (e[t] === r) {
      e.splice(t, 1);
      break;
    }
};
K.prototype.meshClean = function(r) {
  for (var t = [r], e, i; e = t.pop(); )
    if (!e.isInterior())
      for (e.setInterior(!0), this.triangles_.push(e), i = 0; i < 3; i++)
        e.constrained_edge[i] || t.push(e.getNeighbor(i));
};
var nu = K;
(function(r) {
  var t = globalThis.poly2tri;
  r.noConflict = function() {
    return globalThis.poly2tri = t, r;
  }, r.VERSION = Ml.version, r.PointError = $i, r.Point = Ws, r.Triangle = qi, r.SweepContext = nu;
  var e = Xi;
  r.triangulate = e.triangulate, r.sweep = { Triangulate: e.triangulate };
})(Mr);
function su(r, t) {
  const e = ol(r, t), i = new Mr.SweepContext(sl(r, t).map((n) => new Mr.Point(n[0], n[1])));
  for (let n = 0; n < e.length; n++)
    xl(r, e[n]) === -1 && i.addPoint(new Mr.Point(e[n][0], e[n][1]));
  try {
    i.triangulate();
  } catch {
    throw new Error("A Point Error occured during resource mask triangulation. This is typically because the resource mask contains duplicate or collinear points, or is self-intersecting.");
  }
  return i.getTriangles();
}
function ou(r, t) {
  return su(r, t).map((e) => e.getPoints().map((i) => [i.x, i.y]));
}
function pe(r, t) {
  const e = t[0], i = t[1];
  return [
    r[0] * e + r[2] * i + r[4],
    r[1] * e + r[3] * i + r[5]
  ];
}
function au() {
  return [1, 0, 0, 1, 0, 0];
}
function hu(r, t) {
  const e = r[0], i = r[1], n = r[2], s = r[3], o = r[4], a = r[5], h = t[0], c = t[1], l = t[2], u = t[3], g = t[4], w = t[5];
  return [
    e * h + n * c,
    i * h + s * c,
    e * l + n * u,
    i * l + s * u,
    e * g + n * w + o,
    i * g + s * w + a
  ];
}
function Rn(r, t, e, i, n, s, o) {
  const a = Math.sin(n), h = Math.cos(n);
  return [
    e * h,
    i * a,
    -e * a,
    i * h,
    s * e * h - o * e * a + r,
    s * i * a + o * i * h + t
  ];
}
function cu(r) {
  const t = lu(r), e = r[0], i = r[1], n = r[2], s = r[3], o = r[4], a = r[5];
  return [
    s / t,
    -i / t,
    -n / t,
    e / t,
    (n * a - s * o) / t,
    -(e * a - i * o) / t
  ];
}
function lu(r) {
  return r[0] * r[3] - r[1] * r[2];
}
function uu(r) {
  const t = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  return t[0] = r[0], t[1] = r[1], t[4] = r[2], t[5] = r[3], t[12] = r[4], t[13] = r[5], t;
}
var k;
(function(r) {
  r.GEOREFERENCEANNOTATIONADDED = "georeferenceannotationadded", r.GEOREFERENCEANNOTATIONREMOVED = "georeferenceannotationremoved", r.WARPEDMAPADDED = "warpedmapadded", r.WARPEDMAPREMOVED = "warpedmapremoved", r.WARPEDMAPENTER = "warpedmapenter", r.WARPEDMAPLEAVE = "warpedmapleave", r.IMAGEINFOLOADED = "imageinfoloaded", r.TILEFETCHED = "tilefetched", r.TILEFETCHERROR = "tilefetcherror", r.MAPTILELOADED = "maptileloaded", r.MAPTILEREMOVED = "maptileremoved", r.FIRSTMAPTILELOADED = "firstmaptileloaded", r.ALLREQUESTEDTILESLOADED = "allrequestedtilesloaded", r.TEXTURESUPDATED = "texturesupdated", r.ZINDICESCHANGES = "zindiceschanged", r.RESOURCEMASKUPDATED = "resourcemaskupdated", r.VISIBILITYCHANGED = "visibilitychanged", r.TRANSFORMATIONCHANGED = "transformationchanged", r.CHANGED = "changed", r.CLEARED = "cleared";
})(k || (k = {}));
class $ extends Event {
  constructor(t, e) {
    super(t), this.data = e;
  }
}
const du = 80, fu = {
  maxOffsetRatio: 0.05,
  maxDepth: 2,
  differentHandedness: !0
}, pu = {
  maxOffsetRatio: 0.05,
  maxDepth: 2,
  differentHandedness: !0
}, gu = 10;
class mu extends EventTarget {
  /**
   * Creates an instance of WarpedMap.
   *
   * @constructor
   * @param {string} mapId - ID of the map
   * @param {GeoreferencedMap} georeferencedMap - Georeferende map this warped map is build on
   * @param {?Cache} [imageInfoCache] - Cache of the image info of this image
   * @param {boolean} [visible=true] - Whether the map is visible
   */
  constructor(t, e, i, n = !0) {
    super(), this.transformerByTransformationType = /* @__PURE__ */ new Map(), this.projectedTransformerByTransformationType = /* @__PURE__ */ new Map(), this.triangulateErrorCount = 0, this.resourceViewportRing = [], this.resourceTrianglePoints = [], this.resourceTrianglePointsByBestScaleFactor = /* @__PURE__ */ new Map(), this.projectedGeoCurrentTrianglePoints = [], this.projectedGeoNewTrianglePoints = [], this.projectedGeoTrianglePointsByBestScaleFactorAndTransformationType = /* @__PURE__ */ new Map(), this.mapId = t, this.georeferencedMap = e, this.gcps = this.georeferencedMap.gcps, this.projectedGcps = this.gcps.map(({ resource: s, geo: o }) => ({
      resource: s,
      geo: Oh(o)
    })), this.resourceMask = this.georeferencedMap.resourceMask, this.updateResourceMaskProperties(), this.resourceFullMask = [
      [0, 0],
      [this.georeferencedMap.resource.width, 0],
      [
        this.georeferencedMap.resource.width,
        this.georeferencedMap.resource.height
      ],
      [0, this.georeferencedMap.resource.height]
    ], this.resourceFullMaskBbox = lt(this.resourceFullMask), this.resourceFullMaskRectangle = Ve(this.resourceFullMaskBbox), this.imageInfoCache = i, this.loadingImageInfo = !1, this.visible = n, this.transformationType = this.georeferencedMap.transformation?.type || "polynomial", this.updateTransformerProperties();
  }
  /**
   * Get resourceMask in viewport coordinates
   *
   * @param {Viewport} viewport - the current viewport
   * @returns {Ring}
   */
  getViewportMask(t) {
    return this.projectedGeoMask.map((e) => pe(t.projectedGeoToViewportTransform, e));
  }
  /**
   * Get bbox of resourceMask in viewport coordinates
   *
   * @param {Viewport} viewport - the current viewport
   * @returns {Bbox}
   */
  getViewportMaskBbox(t) {
    return lt(this.getViewportMask(t));
  }
  /**
   * Get resourceMaskRectangle in viewport coordinates
   *
   * @param {Viewport} viewport - the current viewport
   * @returns {Rectangle}
   */
  getViewportMaskRectangle(t) {
    return this.projectedGeoMaskRectangle.map((e) => pe(t.projectedGeoToViewportTransform, e));
  }
  /**
   * Get resourceFullMask in viewport coordinates
   *
   * @param {Viewport} viewport - the current viewport
   * @returns {Ring}
   */
  getViewportFullMask(t) {
    return this.projectedGeoFullMask.map((e) => pe(t.projectedGeoToViewportTransform, e));
  }
  /**
   * Get bbox of rresourceFullMask in viewport coordinates
   *
   * @param {Viewport} viewport - the current viewport
   * @returns {Bbox}
   */
  getViewportFullMaskBbox(t) {
    return lt(this.getViewportFullMask(t));
  }
  /**
   * Get resourceFullMaskRectangle in viewport coordinates
   *
   * @param {Viewport} viewport - the current viewport
   * @returns {Rectangle}
   */
  getViewportFullMaskRectangle(t) {
    return this.projectedGeoFullMaskRectangle.map((e) => pe(t.projectedGeoToViewportTransform, e));
  }
  /**
   * Get scale of the warped map, in resource pixels per viewport pixels.
   *
   * @param {Viewport} viewport - the current viewport
   * @returns {number}
   */
  getResourceToViewportScale(t) {
    return wn(this.resourceMaskRectangle, this.getViewportMaskRectangle(t));
  }
  /**
   * Get scale of the warped map, in resource pixels per canvas pixels.
   *
   * @param {Viewport} viewport - the current viewport
   * @returns {number}
   */
  getResourceToCanvasScale(t) {
    return this.getResourceToViewportScale(t) / t.devicePixelRatio;
  }
  /**
   * Set resourceViewportRing at current viewport
   *
   * @param {Ring} resourceViewportRing
   */
  setResourceViewportRing(t) {
    this.resourceViewportRing = t, this.resourceViewportRingBbox = lt(t);
  }
  /**
   * Update the resourceMask loaded from a georeferenced map to a new mask.
   *
   * @param {Ring} resourceMask
   */
  setResourceMask(t) {
    this.resourceMask = t, this.updateResourceMaskProperties(), this.updateGeoMask(), this.updateProjectedGeoMask(), this.updateResourceToProjectedGeoScale(), this.resourceTrianglePointsByBestScaleFactor = /* @__PURE__ */ new Map(), this.projectedGeoTrianglePointsByBestScaleFactorAndTransformationType = /* @__PURE__ */ new Map(), this.updateTriangulation();
  }
  /**
   * Update the transformationType loaded from a georeferenced map to a new transformation type.
   *
   * @param {TransformationType} transformationType
   */
  setTransformationType(t) {
    this.transformationType = t, this.updateTransformerProperties();
  }
  /**
   * Update the Ground Controle Points loaded from a georeferenced map to new Ground Controle Points.
   *
   * @param {GCP[]} gcps
   */
  setGcps(t) {
    this.gcps = t, this.updateTransformerProperties(!1);
  }
  /**
   * Set the bestScaleFactor at the current viewport
   *
   * @param {number} scaleFactor - scale factor
   * @returns {boolean}
   */
  setBestScaleFactor(t) {
    this.bestScaleFactor != t && (this.bestScaleFactor = t, this.updateTriangulation(!0));
  }
  /**
   * Update the triangulation of the resourceMask, at the current bestScaleFactor. Use cache if available.
   *
   * @param {boolean} [currentIsNew=false] - whether the new and current triangulation are the same - true by default, false during a transformation transition
   */
  updateTriangulation(t = !1) {
    if (this.resourceTrianglePointsByBestScaleFactor.has(this.bestScaleFactor))
      this.resourceTrianglePoints = this.resourceTrianglePointsByBestScaleFactor.get(this.bestScaleFactor);
    else {
      const e = Ah(this.resourceMask) * this.bestScaleFactor / du;
      try {
        this.resourceTrianglePoints = ou(this.resourceMask, e).flat();
      } catch (i) {
        this.logTriangulateError(i);
      }
      this.resourceTrianglePointsByBestScaleFactor.set(this.bestScaleFactor, this.resourceTrianglePoints);
    }
    this.updateProjectedGeoTrianglePoints(t);
  }
  logTriangulateError(t) {
    this.triangulateErrorCount++, this.triangulateErrorCount <= gu && (console.error(`Error computing triangulation for map ${this.mapId}.`, `Fix this map with Allmaps Editor: https://editor.allmaps.org/#/collection?url=${this.parsedImage?.uri}/info.json`), this.triangulateErrorCount === 1 && console.error(t));
  }
  /**
   * Update the (current and new) points of the triangulated resourceMask, at the current bestScaleFactor, in projectedGeo coordinates. Use cache if available.
   *
   * @param {boolean} [currentIsNew=false]
   */
  updateProjectedGeoTrianglePoints(t = !1) {
    this.projectedGeoTrianglePointsByBestScaleFactorAndTransformationType.get(this.bestScaleFactor)?.has(this.transformationType) ? this.projectedGeoNewTrianglePoints = this.projectedGeoTrianglePointsByBestScaleFactorAndTransformationType.get(this.bestScaleFactor)?.get(this.transformationType) : (this.projectedGeoNewTrianglePoints = this.resourceTrianglePoints.map((e) => this.projectedTransformer.transformToGeo(e)), this.projectedGeoTrianglePointsByBestScaleFactorAndTransformationType.get(this.bestScaleFactor) || this.projectedGeoTrianglePointsByBestScaleFactorAndTransformationType.set(this.bestScaleFactor, /* @__PURE__ */ new Map()), this.projectedGeoTrianglePointsByBestScaleFactorAndTransformationType.get(this.bestScaleFactor)?.set(this.transformationType, this.projectedGeoNewTrianglePoints)), (t || !this.projectedGeoCurrentTrianglePoints.length) && (this.projectedGeoCurrentTrianglePoints = this.projectedGeoNewTrianglePoints);
  }
  /**
   * Reset the current points of the triangulated resourceMask in projectedGeo coordinates.
   */
  resetCurrentTrianglePoints() {
    this.projectedGeoCurrentTrianglePoints = this.projectedGeoNewTrianglePoints;
  }
  /**
   * Mix the current and new points of the triangulated resourceMask in projectedGeo coordinates
   *
   * @param {number} t
   */
  mixProjectedGeoCurrentAndNewTrianglePoints(t) {
    this.projectedGeoCurrentTrianglePoints = this.projectedGeoNewTrianglePoints.map((e, i) => wh(e, this.projectedGeoCurrentTrianglePoints[i], t));
  }
  /**
   * Check if warpedMap has image info
   *
   * @returns {this is WarpedMapWithImageInfo}
   */
  hasImageInfo() {
    return this.imageId !== void 0 && this.parsedImage !== void 0;
  }
  /**
   * Fetch and parse the image info, and generate the image ID
   *
   * @async
   * @returns {Promise<void>}
   */
  async loadImageInfo() {
    this.loadingImageInfo = !0;
    const t = this.georeferencedMap.resource.id, e = await lh(t, {
      cache: this.imageInfoCache
    });
    this.parsedImage = hh.parse(e), this.imageId = await zn(t), this.loadingImageInfo = !1, this.dispatchEvent(new $(k.IMAGEINFOLOADED));
  }
  dispose() {
    this.resourceTrianglePoints = [], this.projectedGeoCurrentTrianglePoints = [], this.projectedGeoNewTrianglePoints = [];
  }
  updateResourceMaskProperties() {
    this.resourceMaskBbox = lt(this.resourceMask), this.resourceMaskRectangle = Ve(this.resourceMaskBbox);
  }
  updateTransformerProperties(t = !0) {
    this.updateTransformer(t), this.updateProjectedTransformer(t), this.updateGeoMask(), this.updateFullGeoMask(), this.updateProjectedGeoMask(), this.updateProjectedFullGeoMask(), this.updateResourceToProjectedGeoScale();
  }
  updateTransformer(t = !0) {
    this.transformerByTransformationType.has(this.transformationType) && t ? this.transformer = this.transformerByTransformationType.get(this.transformationType) : (this.transformer = new Sn(this.gcps, this.transformationType, fu), this.transformerByTransformationType.set(this.transformationType, this.transformer));
  }
  updateProjectedTransformer(t = !0) {
    this.projectedTransformerByTransformationType.has(this.transformationType) && t ? this.projectedTransformer = this.projectedTransformerByTransformationType.get(this.transformationType) : (this.projectedTransformer = new Sn(this.projectedGcps, this.transformationType, pu), this.projectedTransformerByTransformationType.set(this.transformationType, this.projectedTransformer));
  }
  updateGeoMask() {
    this.geoMask = this.transformer.transformForwardAsGeojson([
      this.resourceMask
    ]), this.geoMaskBbox = lt(this.geoMask), this.geoMaskRectangle = this.transformer.transformForward([this.resourceMaskRectangle], { maxDepth: 0 })[0];
  }
  updateFullGeoMask() {
    this.geoFullMask = this.transformer.transformForwardAsGeojson([
      this.resourceFullMask
    ]), this.geoFullMaskBbox = lt(this.geoFullMask), this.geoFullMaskRectangle = this.transformer.transformForward([this.resourceFullMaskRectangle], { maxDepth: 0 })[0];
  }
  updateProjectedGeoMask() {
    this.projectedGeoMask = this.projectedTransformer.transformForward([
      this.resourceMask
    ])[0], this.projectedGeoMaskBbox = lt(this.projectedGeoMask), this.projectedGeoMaskRectangle = this.projectedTransformer.transformForward([this.resourceMaskRectangle])[0];
  }
  updateProjectedFullGeoMask() {
    this.projectedGeoFullMask = this.projectedTransformer.transformForward([
      this.resourceFullMask
    ])[0], this.projectedGeoFullMaskBbox = lt(this.projectedGeoFullMask), this.projectedGeoFullMaskRectangle = this.projectedTransformer.transformForward([
      this.resourceFullMaskRectangle
    ])[0];
  }
  updateResourceToProjectedGeoScale() {
    this.resourceToProjectedGeoScale = wn(this.resourceMaskRectangle, this.projectedGeoMaskRectangle);
  }
}
const yu = m.string().or(m.number()).or(m.boolean()), wu = m.record(m.string(), yu.array()), ee = m.tuple([m.number(), m.number()]), ro = m.object({
  type: m.literal("Point"),
  coordinates: ee
}), io = ee.array().min(3), Ye = m.enum([
  "ImageService1",
  "ImageService2",
  "ImageService3"
]), vu = m.object({
  id: m.string().url(),
  type: m.string(),
  label: wu.optional()
}), Qr = vu.extend({
  partOf: m.lazy(() => Qr.array()).optional()
}), ti = m.union([
  m.any(),
  m.object({
    type: m.string(),
    options: m.object({}).optional()
  })
]).transform((r) => {
  if (r && typeof r == "object" && "type" in r)
    return r;
}), ei = m.union([
  m.string().url().array(),
  m.string().url()
]), xu = /^<svg\s+width="\d+"\s+height="\d+"\s*>\s*<polygon\s+points="\s*(-?\d+(\.\d+)?,-?\d+(\.\d+)?\s+){2,}-?\d+(\.\d+)?,-?\d+(\.\d+)?\s*"\s*\/>\s*<\/svg>$/, Tu = m.object({
  type: m.literal("SvgSelector"),
  value: m.string().regex(xu)
}), bu = m.object({
  source: m.string().url(),
  service: m.array(m.object({
    "@id": m.string().url(),
    type: Ye
  })).length(1),
  selector: Tu
}), no = m.object({
  pixelCoords: ee
}), Mu = m.object({
  type: m.literal("FeatureCollection"),
  transformation: ti.optional(),
  features: m.array(m.object({
    type: m.literal("Feature"),
    properties: no,
    geometry: ro
  }))
}), tn = m.object({
  id: m.string().optional(),
  type: m.literal("Annotation"),
  "@context": ei.optional(),
  motivation: m.string().default("georeferencing").optional(),
  target: bu,
  body: Mu
}), so = m.object({
  id: m.string().optional(),
  type: m.literal("AnnotationPage"),
  "@context": ei.optional(),
  items: m.array(tn)
}), en = /<polygon\s+points="\s*(-?\d+(\.\d+)?,-?\d+(\.\d+)?\s+){2,}-?\d+(\.\d+)?,-?\d+(\.\d+)?\s*"\s*\/>/, _u = new RegExp(`^<svg\\s+width="\\d+"\\s+height="\\d+"\\s*>\\s*${en.source}\\s*</svg>$`), Eu = new RegExp(`^<svg\\s+height="\\d+"\\s+width="\\d+"\\s*>\\s*${en.source}\\s*</svg>$`), Iu = new RegExp(`^<svg\\s*>\\s*${en.source}\\s*</svg>$`), Su = m.string().regex(Iu), Au = m.string().regex(_u), Pu = m.string().regex(Eu), Cu = m.object({
  type: m.literal("SvgSelector"),
  value: Su.or(Au).or(Pu)
}), Ru = m.object({
  "@id": m.string().url(),
  type: Ye,
  height: m.number().positive(),
  width: m.number().positive(),
  partOf: Qr.array().optional()
}), ku = m.object({
  id: m.string().url(),
  type: Ye,
  height: m.number().positive(),
  width: m.number().positive(),
  partOf: Qr.array().optional()
}), Ou = m.object({
  type: m.literal("SpecificResource"),
  source: Ru.or(ku),
  // selector: SvgSelectorSchema.or(ImageApiSelectorSchema)
  selector: Cu
}), oo = m.object({
  resourceCoords: ee
}), Nu = m.object({
  type: m.literal("FeatureCollection"),
  transformation: ti.optional(),
  features: m.array(m.object({
    type: m.literal("Feature"),
    properties: oo,
    geometry: ro
  }))
}), rn = m.object({
  id: m.string().optional(),
  type: m.literal("Annotation"),
  "@context": ei.optional(),
  motivation: m.string().default("georeferencing").optional(),
  created: m.string().datetime().optional(),
  modified: m.string().datetime().optional(),
  target: Ou,
  body: Nu
}), ao = m.object({
  id: m.string().optional(),
  type: m.literal("AnnotationPage"),
  "@context": ei.optional(),
  items: m.array(rn)
});
tn.or(rn);
so.or(ao);
no.or(oo);
function ho(r) {
  return Array.isArray(r);
}
function Lu(r) {
  return !!(r && typeof r == "object" && "type" in r && r.type === "AnnotationPage");
}
function Ur(r) {
  return !!(r && typeof r == "object" && "type" in r && r.type === "GeoreferencedMap");
}
function kn(r) {
  return !!(r && typeof r == "object" && "target" in r && r.target && typeof r.target == "object" && "source" in r.target && typeof r.target.source == "string");
}
function ri(r) {
  return "type" in r && r.type === "GeoreferencedMap";
}
function ii(r) {
  return "source" in r.target && typeof r.target.source == "object";
}
function ju(r) {
  return {
    id: Bu(r),
    ...Vu(r),
    type: Du(r),
    partOf: Gu(r)
  };
}
function Bu(r) {
  if (ii(r)) {
    const t = r.target.source;
    return "id" in t ? t.id : t["@id"];
  } else
    return r.target.service[0]["@id"];
}
function Du(r) {
  return "service" in r.target ? r.target.service[0].type : r.target.source.type;
}
function Gu(r) {
  if (ii(r))
    return r.target.source.partOf;
}
function Fu(r) {
  return "pixelCoords" in r ? r.pixelCoords : r.resourceCoords;
}
function Uu(r) {
  return r.body.features.map((t) => ({
    resource: Fu(t.properties),
    geo: t.geometry.coordinates
  }));
}
function Wu(r) {
  if (ii(r))
    return {
      created: r.created,
      modified: r.modified
    };
}
function Vu(r) {
  if (ii(r))
    return {
      width: r.target.source.width,
      height: r.target.source.height
    };
  const e = r.target.selector.value, i = /width="(?<width>\d+)"/.exec(e), n = /height="(?<height>\d+)"/.exec(e), s = i?.groups?.width, o = n?.groups?.height;
  if (!s || !o)
    throw new Error("Could not parse image dimensions");
  return {
    width: parseInt(s),
    height: parseInt(o)
  };
}
function zu(r) {
  const e = r.target.selector.value, n = /points="(?<points>.+)"/.exec(e)?.groups;
  if (n && n.points) {
    const s = n.points.trim().split(/\s+/);
    if (s[0] === s[s.length - 1] && s.splice(-1), s.length >= 3)
      return s.map((o) => {
        const a = o.split(",");
        if (a.length === 2)
          return [parseFloat(a[0]), parseFloat(a[1])];
        throw new Error("Could not parse resource mask");
      });
    throw new Error("Could not parse resource mask");
  } else
    throw new Error("Could not parse resource mask");
}
function On(r) {
  return {
    "@context": "https://schemas.allmaps.org/map/2/context.json",
    type: "GeoreferencedMap",
    id: r.id,
    ...Wu(r),
    resource: ju(r),
    gcps: Uu(r),
    resourceMask: zu(r),
    transformation: r.body.transformation
  };
}
function Ni(r) {
  if (Lu(r)) {
    let t;
    return "items" in r && Array.isArray(r.items) && kn(r.items[0]) ? t = so.parse(r) : t = ao.parse(r), t.items.map((e) => On(e));
  } else {
    let t;
    return kn(r) ? t = tn.parse(r) : t = rn.parse(r), [On(t)];
  }
}
const co = m.object({
  image: ee,
  world: ee
}), Zu = m.object({
  uri: m.string().url(),
  width: m.number(),
  height: m.number(),
  type: Ye
}), ni = m.object({
  id: m.string().optional(),
  version: m.number().min(1).max(1).default(1),
  image: Zu,
  gcps: co.array(),
  pixelMask: io,
  transformation: ti.optional()
}), nn = m.array(ni), lo = m.object({
  resource: ee,
  geo: ee
}), $u = m.object({
  id: m.string().url(),
  width: m.number(),
  height: m.number(),
  type: Ye,
  partOf: Qr.array().optional()
}), si = m.object({
  "@context": m.literal("https://schemas.allmaps.org/map/2/context.json").optional(),
  type: m.literal("GeoreferencedMap"),
  id: m.string().optional(),
  created: m.string().datetime().optional(),
  modified: m.string().datetime().optional(),
  resource: $u,
  gcps: lo.array(),
  resourceMask: io,
  transformation: ti.optional()
}), sn = m.array(si);
ni.or(si);
nn.or(sn);
co.or(lo);
function qu(r) {
  let t, e, i;
  return ri(r) ? (t = r.resource.width, e = r.resource.height, i = r.resourceMask) : (t = r.image.width, e = r.image.height, i = r.pixelMask), {
    type: "SvgSelector",
    value: `<svg width="${t}" height="${e}"><polygon points="${i.map((n) => n.join(",")).join(" ")}" /></svg>`
  };
}
function Xu(r) {
  let t, e, i, n, s;
  return ri(r) ? (t = r.resource.id, e = r.resource.type, i = r.resource.width, n = r.resource.height, s = r.resource.partOf) : (t = r.image.uri, e = r.image.type, i = r.image.width, n = r.image.height), {
    id: t,
    type: e,
    height: n,
    width: i,
    partOf: s
  };
}
function Hu(r) {
  if (ri(r))
    return {
      created: r.created,
      modified: r.modified
    };
}
function Yu() {
  return [
    "http://iiif.io/api/extension/georef/1/context.json",
    "http://iiif.io/api/presentation/3/context.json"
  ];
}
function Ju(r) {
  let t, e;
  return "resource" in r ? (t = r.resource, e = r.geo) : (t = r.image, e = r.world), {
    type: "Feature",
    properties: {
      resourceCoords: t
    },
    geometry: {
      type: "Point",
      coordinates: e
    }
  };
}
function Nn(r) {
  const t = {
    type: "SpecificResource",
    source: Xu(r),
    selector: qu(r)
  }, e = {
    type: "FeatureCollection",
    transformation: r.transformation,
    features: r.gcps.map((i) => Ju(i))
  };
  return {
    id: r.id,
    type: "Annotation",
    "@context": Yu(),
    ...Hu(r),
    motivation: "georeferencing",
    target: t,
    body: e
  };
}
function Ku(r) {
  if (ho(r)) {
    let t;
    return Ur(r[0]) ? t = sn.parse(r) : t = nn.parse(r), {
      type: "AnnotationPage",
      "@context": "http://www.w3.org/ns/anno.jsonld",
      items: t.map((i) => Nn(i))
    };
  } else {
    let t;
    return Ur(r) ? t = si.parse(r) : t = ni.parse(r), Nn(t);
  }
}
function uo(r) {
  return ri(r) ? r : Ni(Ku(r))[0];
}
function Qu(r) {
  return r.map(uo);
}
function Ln(r) {
  if (ho(r)) {
    let t;
    return Ur(r[0]) ? t = sn.parse(r) : t = nn.parse(r), Qu(t);
  } else {
    let t;
    return Ur(r) ? t = si.parse(r) : t = ni.parse(r), uo(t);
  }
}
function td(r, t, e, i, n) {
  fo(r, t, e || 0, i || r.length - 1, n || ed);
}
function fo(r, t, e, i, n) {
  for (; i > e; ) {
    if (i - e > 600) {
      var s = i - e + 1, o = t - e + 1, a = Math.log(s), h = 0.5 * Math.exp(2 * a / 3), c = 0.5 * Math.sqrt(a * h * (s - h) / s) * (o - s / 2 < 0 ? -1 : 1), l = Math.max(e, Math.floor(t - o * h / s + c)), u = Math.min(i, Math.floor(t + (s - o) * h / s + c));
      fo(r, t, l, u, n);
    }
    var g = r[t], w = e, y = i;
    for (Me(r, e, t), n(r[i], g) > 0 && Me(r, e, i); w < y; ) {
      for (Me(r, w, y), w++, y--; n(r[w], g) < 0; )
        w++;
      for (; n(r[y], g) > 0; )
        y--;
    }
    n(r[e], g) === 0 ? Me(r, e, y) : (y++, Me(r, y, i)), y <= t && (e = y + 1), t <= y && (i = y - 1);
  }
}
function Me(r, t, e) {
  var i = r[t];
  r[t] = r[e], r[e] = i;
}
function ed(r, t) {
  return r < t ? -1 : r > t ? 1 : 0;
}
class rd {
  constructor(t = 9) {
    this._maxEntries = Math.max(4, t), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(t) {
    let e = this.data;
    const i = [];
    if (!wr(t, e))
      return i;
    const n = this.toBBox, s = [];
    for (; e; ) {
      for (let o = 0; o < e.children.length; o++) {
        const a = e.children[o], h = e.leaf ? n(a) : a;
        wr(t, h) && (e.leaf ? i.push(a) : pi(t, h) ? this._all(a, i) : s.push(a));
      }
      e = s.pop();
    }
    return i;
  }
  collides(t) {
    let e = this.data;
    if (!wr(t, e))
      return !1;
    const i = [];
    for (; e; ) {
      for (let n = 0; n < e.children.length; n++) {
        const s = e.children[n], o = e.leaf ? this.toBBox(s) : s;
        if (wr(t, o)) {
          if (e.leaf || pi(t, o))
            return !0;
          i.push(s);
        }
      }
      e = i.pop();
    }
    return !1;
  }
  load(t) {
    if (!(t && t.length))
      return this;
    if (t.length < this._minEntries) {
      for (let i = 0; i < t.length; i++)
        this.insert(t[i]);
      return this;
    }
    let e = this._build(t.slice(), 0, t.length - 1, 0);
    if (!this.data.children.length)
      this.data = e;
    else if (this.data.height === e.height)
      this._splitRoot(this.data, e);
    else {
      if (this.data.height < e.height) {
        const i = this.data;
        this.data = e, e = i;
      }
      this._insert(e, this.data.height - e.height - 1, !0);
    }
    return this;
  }
  insert(t) {
    return t && this._insert(t, this.data.height - 1), this;
  }
  clear() {
    return this.data = fe([]), this;
  }
  remove(t, e) {
    if (!t)
      return this;
    let i = this.data;
    const n = this.toBBox(t), s = [], o = [];
    let a, h, c;
    for (; i || s.length; ) {
      if (i || (i = s.pop(), h = s[s.length - 1], a = o.pop(), c = !0), i.leaf) {
        const l = id(t, i.children, e);
        if (l !== -1)
          return i.children.splice(l, 1), s.push(i), this._condense(s), this;
      }
      !c && !i.leaf && pi(i, n) ? (s.push(i), o.push(a), a = 0, h = i, i = i.children[0]) : h ? (a++, i = h.children[a], c = !1) : i = null;
    }
    return this;
  }
  toBBox(t) {
    return t;
  }
  compareMinX(t, e) {
    return t.minX - e.minX;
  }
  compareMinY(t, e) {
    return t.minY - e.minY;
  }
  toJSON() {
    return this.data;
  }
  fromJSON(t) {
    return this.data = t, this;
  }
  _all(t, e) {
    const i = [];
    for (; t; )
      t.leaf ? e.push(...t.children) : i.push(...t.children), t = i.pop();
    return e;
  }
  _build(t, e, i, n) {
    const s = i - e + 1;
    let o = this._maxEntries, a;
    if (s <= o)
      return a = fe(t.slice(e, i + 1)), ce(a, this.toBBox), a;
    n || (n = Math.ceil(Math.log(s) / Math.log(o)), o = Math.ceil(s / Math.pow(o, n - 1))), a = fe([]), a.leaf = !1, a.height = n;
    const h = Math.ceil(s / o), c = h * Math.ceil(Math.sqrt(o));
    jn(t, e, i, c, this.compareMinX);
    for (let l = e; l <= i; l += c) {
      const u = Math.min(l + c - 1, i);
      jn(t, l, u, h, this.compareMinY);
      for (let g = l; g <= u; g += h) {
        const w = Math.min(g + h - 1, u);
        a.children.push(this._build(t, g, w, n - 1));
      }
    }
    return ce(a, this.toBBox), a;
  }
  _chooseSubtree(t, e, i, n) {
    for (; n.push(e), !(e.leaf || n.length - 1 === i); ) {
      let s = 1 / 0, o = 1 / 0, a;
      for (let h = 0; h < e.children.length; h++) {
        const c = e.children[h], l = fi(c), u = od(t, c) - l;
        u < o ? (o = u, s = l < s ? l : s, a = c) : u === o && l < s && (s = l, a = c);
      }
      e = a || e.children[0];
    }
    return e;
  }
  _insert(t, e, i) {
    const n = i ? t : this.toBBox(t), s = [], o = this._chooseSubtree(n, this.data, e, s);
    for (o.children.push(t), Pe(o, n); e >= 0 && s[e].children.length > this._maxEntries; )
      this._split(s, e), e--;
    this._adjustParentBBoxes(n, s, e);
  }
  // split overflowed node into two
  _split(t, e) {
    const i = t[e], n = i.children.length, s = this._minEntries;
    this._chooseSplitAxis(i, s, n);
    const o = this._chooseSplitIndex(i, s, n), a = fe(i.children.splice(o, i.children.length - o));
    a.height = i.height, a.leaf = i.leaf, ce(i, this.toBBox), ce(a, this.toBBox), e ? t[e - 1].children.push(a) : this._splitRoot(i, a);
  }
  _splitRoot(t, e) {
    this.data = fe([t, e]), this.data.height = t.height + 1, this.data.leaf = !1, ce(this.data, this.toBBox);
  }
  _chooseSplitIndex(t, e, i) {
    let n, s = 1 / 0, o = 1 / 0;
    for (let a = e; a <= i - e; a++) {
      const h = Ae(t, 0, a, this.toBBox), c = Ae(t, a, i, this.toBBox), l = ad(h, c), u = fi(h) + fi(c);
      l < s ? (s = l, n = a, o = u < o ? u : o) : l === s && u < o && (o = u, n = a);
    }
    return n || i - e;
  }
  // sorts node children by the best axis for split
  _chooseSplitAxis(t, e, i) {
    const n = t.leaf ? this.compareMinX : nd, s = t.leaf ? this.compareMinY : sd, o = this._allDistMargin(t, e, i, n), a = this._allDistMargin(t, e, i, s);
    o < a && t.children.sort(n);
  }
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin(t, e, i, n) {
    t.children.sort(n);
    const s = this.toBBox, o = Ae(t, 0, e, s), a = Ae(t, i - e, i, s);
    let h = yr(o) + yr(a);
    for (let c = e; c < i - e; c++) {
      const l = t.children[c];
      Pe(o, t.leaf ? s(l) : l), h += yr(o);
    }
    for (let c = i - e - 1; c >= e; c--) {
      const l = t.children[c];
      Pe(a, t.leaf ? s(l) : l), h += yr(a);
    }
    return h;
  }
  _adjustParentBBoxes(t, e, i) {
    for (let n = i; n >= 0; n--)
      Pe(e[n], t);
  }
  _condense(t) {
    for (let e = t.length - 1, i; e >= 0; e--)
      t[e].children.length === 0 ? e > 0 ? (i = t[e - 1].children, i.splice(i.indexOf(t[e]), 1)) : this.clear() : ce(t[e], this.toBBox);
  }
}
function id(r, t, e) {
  if (!e)
    return t.indexOf(r);
  for (let i = 0; i < t.length; i++)
    if (e(r, t[i]))
      return i;
  return -1;
}
function ce(r, t) {
  Ae(r, 0, r.children.length, t, r);
}
function Ae(r, t, e, i, n) {
  n || (n = fe(null)), n.minX = 1 / 0, n.minY = 1 / 0, n.maxX = -1 / 0, n.maxY = -1 / 0;
  for (let s = t; s < e; s++) {
    const o = r.children[s];
    Pe(n, r.leaf ? i(o) : o);
  }
  return n;
}
function Pe(r, t) {
  return r.minX = Math.min(r.minX, t.minX), r.minY = Math.min(r.minY, t.minY), r.maxX = Math.max(r.maxX, t.maxX), r.maxY = Math.max(r.maxY, t.maxY), r;
}
function nd(r, t) {
  return r.minX - t.minX;
}
function sd(r, t) {
  return r.minY - t.minY;
}
function fi(r) {
  return (r.maxX - r.minX) * (r.maxY - r.minY);
}
function yr(r) {
  return r.maxX - r.minX + (r.maxY - r.minY);
}
function od(r, t) {
  return (Math.max(t.maxX, r.maxX) - Math.min(t.minX, r.minX)) * (Math.max(t.maxY, r.maxY) - Math.min(t.minY, r.minY));
}
function ad(r, t) {
  const e = Math.max(r.minX, t.minX), i = Math.max(r.minY, t.minY), n = Math.min(r.maxX, t.maxX), s = Math.min(r.maxY, t.maxY);
  return Math.max(0, n - e) * Math.max(0, s - i);
}
function pi(r, t) {
  return r.minX <= t.minX && r.minY <= t.minY && t.maxX <= r.maxX && t.maxY <= r.maxY;
}
function wr(r, t) {
  return t.minX <= r.maxX && t.minY <= r.maxY && t.maxX >= r.minX && t.maxY >= r.minY;
}
function fe(r) {
  return {
    children: r,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0
  };
}
function jn(r, t, e, i, n) {
  const s = [t, e];
  for (; s.length; ) {
    if (e = s.pop(), t = s.pop(), e - t <= i)
      continue;
    const o = t + Math.ceil((e - t) / i / 2) * i;
    td(r, o, t, e, n), s.push(t, o, o, e);
  }
}
function hd(r, t, e) {
  if (e === void 0 && (e = {}), !r)
    throw new Error("point is required");
  if (!t)
    throw new Error("polygon is required");
  var i = we(r), n = Dh(t), s = n.type, o = t.bbox, a = n.coordinates;
  if (o && cd(i, o) === !1)
    return !1;
  s === "Polygon" && (a = [a]);
  for (var h = !1, c = 0; c < a.length && !h; c++)
    if (Bn(i, a[c][0], e.ignoreBoundary)) {
      for (var l = !1, u = 1; u < a[c].length && !l; )
        Bn(i, a[c][u], !e.ignoreBoundary) && (l = !0), u++;
      l || (h = !0);
    }
  return h;
}
function Bn(r, t, e) {
  var i = !1;
  t[0][0] === t[t.length - 1][0] && t[0][1] === t[t.length - 1][1] && (t = t.slice(0, t.length - 1));
  for (var n = 0, s = t.length - 1; n < t.length; s = n++) {
    var o = t[n][0], a = t[n][1], h = t[s][0], c = t[s][1], l = r[1] * (o - h) + a * (h - r[0]) + c * (r[0] - o) === 0 && (o - r[0]) * (h - r[0]) <= 0 && (a - r[1]) * (c - r[1]) <= 0;
    if (l)
      return !e;
    var u = a > r[1] != c > r[1] && r[0] < (h - o) * (r[1] - a) / (c - a) + o;
    u && (i = !i);
  }
  return i;
}
function cd(r, t) {
  return t[0] <= r[0] && t[1] <= r[1] && t[2] >= r[0] && t[3] >= r[1];
}
const ld = !0;
class ud {
  constructor() {
    this.rbush = new rd(), this.polygonsById = /* @__PURE__ */ new Map(), this.bboxesById = /* @__PURE__ */ new Map(), this.itemsById = /* @__PURE__ */ new Map();
  }
  addItem(t, e) {
    this.removeItem(t);
    const i = lt(e), n = {
      minX: i[0],
      minY: i[1],
      maxX: i[2],
      maxY: i[3],
      id: t
    };
    this.polygonsById.set(t, e), this.bboxesById.set(t, i), this.itemsById.set(t, n), this.rbush.insert(n);
  }
  removeItem(t) {
    const e = this.itemsById.get(t);
    e && (this.rbush.remove(e), this.polygonsById.delete(t), this.bboxesById.delete(t), this.itemsById.delete(t));
  }
  clear() {
    this.polygonsById.clear(), this.bboxesById.clear(), this.itemsById.clear(), this.rbush.clear();
  }
  search(t, e, i, n) {
    return this.rbush.search({
      minX: t,
      minY: e,
      maxX: i,
      maxY: n
    });
  }
  getBbox(t) {
    return this.bboxesById.get(t);
  }
  getPolygon(t) {
    return this.polygonsById.get(t);
  }
  searchFromBbox(t) {
    const [e, i, n, s] = t;
    return this.search(e, i, n, s).map((o) => o.id);
  }
  searchFromPoint(t, e = ld) {
    const [i, n, s, o] = [t[0], t[1], t[0], t[1]], a = this.search(i, n, s, o);
    return e ? a.filter((h) => {
      const c = this.polygonsById.get(h.id);
      return c ? hd(t, c) : !1;
    }).map((h) => h.id) : a.map((h) => h.id);
  }
}
class dd extends EventTarget {
  /**
   * Creates an instance of WarpedMapList.
   *
   * @constructor
   * @param {?Cache} [imageInfoCache] - An image info cache
   * @param {?WarpedMapListOptions} [options] - Options
   */
  constructor(t, e) {
    super(), this.warpedMapsById = /* @__PURE__ */ new Map(), this.zIndices = /* @__PURE__ */ new Map(), e = Object.assign({ createRTree: !0 }, e), this.imageInfoCache = t, e.createRTree && (this.rtree = new ud());
  }
  /**
   * Returns mapIds for the maps in this list.
   *
   * @returns {Iterable<string>}
   */
  getMaps() {
    return this.warpedMapsById.keys();
  }
  getWarpedMaps(t) {
    if (t === void 0)
      return this.warpedMapsById.values();
    {
      const e = [];
      for (const i of t) {
        const n = this.warpedMapsById.get(i);
        n && e.push(n);
      }
      return e;
    }
  }
  /**
   * Returns the WarpedMap object in this list of map specified by a mapId.
   *
   * @param {string} mapId
   * @returns {(WarpedMap | undefined)}
   */
  getWarpedMap(t) {
    return this.warpedMapsById.get(t);
  }
  /**
   * Returns the zIndex of a map.
   *
   * @param {string} mapId
   * @returns {number | undefined}
   */
  getMapZIndex(t) {
    return this.zIndices.get(t);
  }
  /**
   * Return the bounding box of all visible maps in this list, in longitude/latitude coordinates
   *
   * @returns {(Bbox | undefined)}
   */
  getBbox() {
    let t;
    for (const e of this.getWarpedMaps())
      e.visible && (t ? t = yn(t, e.geoMaskBbox) : t = e.geoMaskBbox);
    return t;
  }
  /**
   * Return the bounding box of all visible maps in this list, in projected coordinates
   *
   * @returns {(Bbox | undefined)}
   */
  getProjectedBbox() {
    let t;
    for (const e of this.getWarpedMaps())
      e.visible && (t ? t = yn(t, e.projectedGeoMaskBbox) : t = e.projectedGeoMaskBbox);
    return t;
  }
  /**
   * Returns mapIds of the maps whose geoBbox overlaps with the specified geoBbox.
   *
   * @param {Bbox} geoBbox
   * @returns {Iterable<string>}
   */
  getMapsByGeoBbox(t) {
    return this.rtree ? this.rtree.searchFromBbox(t) : Array.from(this.warpedMapsById.keys());
  }
  /**
   * Sets the image info cache
   *
   * @param {Cache} cache - the image info cache
   */
  setImageInfoCache(t) {
    this.imageInfoCache = t;
  }
  /**
   * Sets the resource mask for a specified map
   *
   * @param {string} mapId - ID of the map
   * @param {Ring} resourceMask - the new resource mask
   */
  setMapResourceMask(t, e) {
    const i = this.warpedMapsById.get(t);
    i && (i.setResourceMask(e), this.addToOrUpdateRtree(i), this.dispatchEvent(new $(k.RESOURCEMASKUPDATED, t)));
  }
  /**
   * Sets the transformation type of specified maps
   *
   * @param {Iterable<string>} mapIds - the IDs of the maps
   * @param {TransformationType} transformationType - the new transformation type
   */
  setMapsTransformationType(t, e) {
    for (const i of t) {
      const n = this.warpedMapsById.get(i);
      n && (n.setTransformationType(e), this.addToOrUpdateRtree(n));
    }
    this.dispatchEvent(new $(k.TRANSFORMATIONCHANGED, t));
  }
  /**
   * Changes the zIndex of the specified maps to bring them to front
   *
   * @param {Iterable<string>} mapIds
   */
  bringMapsToFront(t) {
    let e = this.warpedMapsById.size;
    for (const i of t)
      this.zIndices.has(i) && (this.zIndices.set(i, e), e++);
    this.removeZIndexHoles(), this.dispatchEvent(new $(k.ZINDICESCHANGES));
  }
  /**
   * Changes the zIndex of the specified maps to send them to back
   *
   * @param {Iterable<string>} mapIds
   */
  sendMapsToBack(t) {
    let e = -Array.from(t).length;
    for (const i of t)
      this.zIndices.has(i) && (this.zIndices.set(i, e), e++);
    this.removeZIndexHoles(), this.dispatchEvent(new $(k.ZINDICESCHANGES));
  }
  /**
   * Changes the zIndex of the specified maps to bring them forward
   *
   * @param {Iterable<string>} mapIds
   */
  bringMapsForward(t) {
    for (const [e, i] of this.zIndices.entries())
      this.zIndices.set(e, i * 2);
    for (const e of t) {
      const i = this.zIndices.get(e);
      i !== void 0 && this.zIndices.set(e, i + 3);
    }
    this.removeZIndexHoles(), this.dispatchEvent(new $(k.ZINDICESCHANGES));
  }
  /**
   * Changes the zIndex of the specified maps to send them backward
   *
   * @param {Iterable<string>} mapIds
   */
  sendMapsBackward(t) {
    for (const [e, i] of this.zIndices.entries())
      this.zIndices.set(e, i * 2);
    for (const e of t) {
      const i = this.zIndices.get(e);
      i !== void 0 && this.zIndices.set(e, i - 3);
    }
    this.removeZIndexHoles(), this.dispatchEvent(new $(k.ZINDICESCHANGES));
  }
  /**
   * Changes the visibility of the specified maps to `true`
   *
   * @param {Iterable<string>} mapIds
   */
  showMaps(t) {
    for (const e of t) {
      const i = this.warpedMapsById.get(e);
      i && (i.visible = !0);
    }
    this.dispatchEvent(new $(k.VISIBILITYCHANGED, t));
  }
  /**
   * Changes the visibility of the specified maps to `false`
   *
   * @param {Iterable<string>} mapIds
   */
  hideMaps(t) {
    for (const e of t) {
      const i = this.warpedMapsById.get(e);
      i && (i.visible = !1);
    }
    this.dispatchEvent(new $(k.VISIBILITYCHANGED, t));
  }
  /**
   * Adds a georeferenced map to this list
   *
   * @async
   * @param {unknown} georeferencedMap
   * @returns {Promise<string | Error>}
   */
  async addGeoreferencedMap(t) {
    const e = Ln(t), i = Array.isArray(e) ? e[0] : e;
    return this.addGeoreferencedMapInternal(i);
  }
  /**
   * Removes a georeferenced map from this list
   *
   * @async
   * @param {unknown} georeferencedMap
   * @returns {Promise<string | Error>}
   */
  async removeGeoreferencedMap(t) {
    const e = Ln(t), i = Array.isArray(e) ? e[0] : e;
    return this.removeGeoreferencedMapInternal(i);
  }
  /**
   * Parses an annotation and adds its georeferenced map to this list
   *
   * @async
   * @param {unknown} annotation
   * @returns {Promise<(string | Error)[]>}
   */
  async addGeoreferenceAnnotation(t) {
    const e = [], i = Ni(t), n = await Promise.allSettled(i.map((s) => this.addGeoreferencedMapInternal(s)));
    for (const s of n)
      s.status === "fulfilled" ? e.push(s.value) : e.push(s.reason);
    return this.dispatchEvent(new $(k.GEOREFERENCEANNOTATIONADDED)), this.dispatchEvent(new $(k.ZINDICESCHANGES)), e;
  }
  /**
   * Parses an annotation and removes its georeferenced map from this list
   *
   * @async
   * @param {unknown} annotation
   * @returns {Promise<(string | Error)[]>}
   */
  async removeGeoreferenceAnnotation(t) {
    const e = [], i = Ni(t);
    for (const n of i) {
      const s = await this.removeGeoreferencedMapInternal(n);
      e.push(s);
    }
    return this.dispatchEvent(new $(k.GEOREFERENCEANNOTATIONREMOVED)), e;
  }
  clear() {
    this.warpedMapsById = /* @__PURE__ */ new Map(), this.zIndices = /* @__PURE__ */ new Map(), this.rtree?.clear(), this.dispatchEvent(new $(k.CLEARED));
  }
  dispose() {
    for (const t of this.getWarpedMaps())
      this.removeEventListenersFromWarpedMap(t), t.dispose();
  }
  async addGeoreferencedMapInternal(t) {
    const e = await this.getOrComputeMapId(t), i = new mu(e, t, this.imageInfoCache);
    return this.warpedMapsById.set(e, i), this.zIndices.set(e, this.warpedMapsById.size - 1), this.addToOrUpdateRtree(i), this.addEventListenersToWarpedMap(i), this.dispatchEvent(new $(k.WARPEDMAPADDED, e)), e;
  }
  async removeGeoreferencedMapInternal(t) {
    const e = await this.getOrComputeMapId(t), i = this.warpedMapsById.get(e);
    if (i)
      this.warpedMapsById.delete(e), this.zIndices.delete(e), this.removeFromRtree(i), this.dispatchEvent(new $(k.WARPEDMAPREMOVED, e)), this.removeZIndexHoles(), this.dispatchEvent(new $(k.ZINDICESCHANGES));
    else
      throw new Error(`No map found with ID ${e}`);
    return e;
  }
  async getOrComputeMapId(t) {
    return t.id || await Ro(t);
  }
  addToOrUpdateRtree(t) {
    this.rtree && (this.rtree.removeItem(t.mapId), this.rtree.addItem(t.mapId, t.geoMask));
  }
  removeFromRtree(t) {
    this.rtree && this.rtree.removeItem(t.mapId);
  }
  removeZIndexHoles() {
    const t = [...this.zIndices.entries()].sort((i, n) => i[1] - n[1]);
    let e = 0;
    for (const i of t) {
      const n = i[0];
      this.zIndices.set(n, e), e++;
    }
  }
  imageInfoLoaded() {
    this.dispatchEvent(new $(k.IMAGEINFOLOADED));
  }
  addEventListenersToWarpedMap(t) {
    t.addEventListener(k.IMAGEINFOLOADED, this.imageInfoLoaded.bind(this));
  }
  removeEventListenersFromWarpedMap(t) {
    t.removeEventListener(k.IMAGEINFOLOADED, this.imageInfoLoaded.bind(this));
  }
}
class fd extends EventTarget {
  /**
   * Creates an instance of Viewport.
   *
   * @constructor
   * @param {Point} projectedGeoCenter - Center point of the viewport, in projected coordinates.
   * @param {Size} viewportSize - Size of the viewport in viewport pixels, as [width, height].
   * @param {number} rotation - Rotation of the viewport with respect to the project coordinate system.
   * @param {number} projectedGeoPerViewportScale - Resolution of the viewport, in projection coordinates per viewport pixel.
   * @param {number} [devicePixelRatio=1] - The devicePixelRatio of the viewport.
   */
  constructor(t, e, i, n, s = 1) {
    super(), this.projectedGeoToViewportTransform = [1, 0, 0, 1, 0, 0], this.projectedGeoToClipTransform = [1, 0, 0, 1, 0, 0], this.projectedGeoCenter = t, this.projectedGeoPerViewportScale = n, this.rotation = i, this.viewportSize = e, this.devicePixelRatio = s, this.projectedGeoRectangle = this.computeProjectedGeoRectangle(this.projectedGeoCenter, this.projectedGeoPerViewportScale, this.rotation, this.viewportSize), this.projectedGeoRectangleBbox = lt(this.projectedGeoRectangle), this.projectedGeoSize = [
      this.viewportSize[0] * n,
      this.viewportSize[1] * n
    ], this.geoCenter = xn(this.projectedGeoCenter), this.geoRectangle = this.projectedGeoRectangle.map((o) => xn(o)), this.geoRectangleBbox = lt(this.geoRectangle), this.geoSize = Ph(this.geoRectangleBbox), this.viewportCenter = [this.viewportSize[0] / 2, this.viewportSize[1] / 2], this.viewportBbox = [0, 0, ...this.viewportSize], this.viewportRectangle = Ve(this.viewportBbox), this.canvasCenter = [
      this.viewportCenter[0] * this.devicePixelRatio,
      this.viewportSize[1] * this.devicePixelRatio
    ], this.canvasSize = [
      this.viewportSize[0] * this.devicePixelRatio,
      this.viewportSize[1] * this.devicePixelRatio
    ], this.canvasBbox = [0, 0, ...this.canvasSize], this.canvasRectangle = Ve(this.canvasBbox), this.projectedGeoPerCanvasScale = this.projectedGeoPerViewportScale / this.devicePixelRatio, this.projectedGeoToViewportTransform = this.composeProjectedGeoToViewportTransform(), this.projectedGeoToClipTransform = this.composeProjectedGeoToClipTransform();
  }
  composeProjectedGeoToViewportTransform() {
    return Rn(this.viewportSize[0] / 2, this.viewportSize[1] / 2, 1 / this.projectedGeoPerViewportScale, -1 / this.projectedGeoPerViewportScale, -this.rotation, -this.projectedGeoCenter[0], -this.projectedGeoCenter[1]);
  }
  composeProjectedGeoToClipTransform() {
    return Rn(0, 0, 2 / (this.projectedGeoPerViewportScale * this.viewportSize[0]), 2 / (this.projectedGeoPerViewportScale * this.viewportSize[1]), -this.rotation, -this.projectedGeoCenter[0], -this.projectedGeoCenter[1]);
  }
  /** Returns a rotated rectangle in projected geo coordinates */
  computeProjectedGeoRectangle(t, e, i, n) {
    const s = e * n[0] / 2, o = e * n[1] / 2, a = Math.cos(i), h = Math.sin(i), c = s * a, l = s * h, u = o * a, g = o * h, w = t[0], y = t[1];
    return [
      [w - c + g, y - l - u],
      [w - c - g, y - l + u],
      [w + c - g, y + l + u],
      [w + c + g, y + l - u]
    ];
  }
}
class pd extends EventTarget {
  /**
   * Creates an instance of CacheableTile.
   *
   * @constructor
   * @param {FetchableMapTile} fetchableMapTile
   */
  constructor(t) {
    super(), this.tile = t.tile, this.imageRequest = t.imageRequest, this.tileUrl = t.tileUrl, this.abortController = new AbortController();
  }
  /**
   * Fetch the tile and create its image bitmap.
   *
   * Returns and event when completed (or error).
   *
   * @async
   * @returns {Promise<ImageBitmap> | void}
   */
  async fetch() {
    try {
      const t = await uh(this.tileUrl, this.abortController.signal);
      return this.imageBitmap = await createImageBitmap(t), this.dispatchEvent(new $(k.TILEFETCHED, this.tileUrl)), this.imageBitmap;
    } catch (t) {
      t instanceof Error && t.name === "AbortError" || this.dispatchEvent(new $(k.TILEFETCHERROR, this.tileUrl));
    }
  }
  /**
   * Whether a tile has completed its caching
   * I.e. their fetching is completed and image bitmap is created
   *
   * @returns {cacheableTile is CachedTile}
   */
  isCachedTile() {
    return this.imageBitmap !== void 0;
  }
  /**
   * Abort the fetch
   */
  abort() {
    this.abortController.signal.aborted || this.abortController.abort();
  }
}
const gd = 0.5;
function po(r, t) {
  return `${r}:${t}`;
}
function go(r) {
  return po(r.mapId, r.tileUrl);
}
function gi(r) {
  return new Set(r.map((t) => go(t)));
}
function md(r, t, e = {
  maxOffsetRatio: 1e-5,
  maxDepth: 2
}) {
  const i = Ih(t);
  return r.transformBackward(i, e)[0];
}
function yd(r, t, e = gd) {
  let i = Number.POSITIVE_INFINITY, n = r.tileZoomLevels.at(-1);
  for (const s of r.tileZoomLevels) {
    const o = Math.abs(Math.log(s.scaleFactor) - Math.log(t + e));
    o < i && (i = o, n = s);
  }
  return n;
}
function wd(r, t, e) {
  const i = vd(r, t), n = xd(i), s = bd(n, e, t), o = Ii(lt(r));
  return s.sort((a, h) => Dn(a, o) - Dn(h, o)), s;
}
function vd(r, t) {
  return r.map((e) => [
    e[0] / t.originalWidth,
    e[1] / t.originalHeight
  ]);
}
function xd(r) {
  const t = {};
  for (let e = 0; e < r.length; e++) {
    const i = [r[e], r[(e + 1) % r.length]];
    Td(i).forEach(([s, o]) => {
      t[s] || (t[s] = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]), o < t[s][0] && (t[s][0] = o), o > t[s][1] && (t[s][1] = o);
    });
  }
  return t;
}
function Td([r, t]) {
  let e = Math.floor(r[0]), i = Math.floor(r[1]);
  const n = Math.floor(t[0]), s = Math.floor(t[1]), o = [[e, i]];
  if (e === n && i === s)
    return o;
  const a = Math.sign(t[0] - r[0]), h = Math.sign(t[1] - r[1]), c = Math.abs(r[0] - e - Math.max(0, a)), l = Math.abs(r[1] - i - Math.max(0, h)), u = Math.abs(r[0] - t[0]), g = Math.abs(r[1] - t[1]);
  let w = c / u, y = l / g;
  const _ = 1 / u, I = 1 / g;
  for (; !(e === n && i === s); )
    w < y ? (w = w + _, e = e + a) : (y = y + I, i = i + h), o.push([e, i]);
  return o;
}
function bd(r, t, e) {
  const i = [];
  for (const n in r) {
    const s = parseInt(n);
    if (s < 0 || s >= e.columns)
      break;
    const o = Math.max(r[s][0], 0), a = Math.min(r[s][1], e.rows - 1);
    for (let h = o; h <= a; h++)
      i.push({
        column: s,
        row: h,
        tileZoomLevel: e,
        imageSize: [t.width, t.height]
      });
  }
  return i;
}
function Md(r) {
  return (r.imageRequest.size?.height || 0) * (r.imageRequest.size?.width || 0) * 3;
}
function Dn(r, t) {
  return vt(_d(r), t);
}
function _d(r) {
  const t = mo(r);
  return [(t[2] - t[0]) / 2 + t[0], (t[3] - t[1]) / 2 + t[1]];
}
function Ed(r) {
  const t = r.column * r.tileZoomLevel.originalWidth, e = r.row * r.tileZoomLevel.originalHeight;
  return [t, e];
}
function mo(r) {
  const t = Ed(r), e = Math.min(t[0] + r.tileZoomLevel.originalWidth, r.imageSize[0]), i = Math.min(t[1] + r.tileZoomLevel.originalHeight, r.imageSize[1]);
  return [
    t[0],
    t[1],
    e,
    i
  ];
}
const Id = 0, Sd = 32 * 1e3 * 1e3;
class Ad extends EventTarget {
  constructor() {
    super(...arguments), this.tilesByTileUrl = /* @__PURE__ */ new Map(), this.mapIdsByTileUrl = /* @__PURE__ */ new Map(), this.tileUrlsByMapId = /* @__PURE__ */ new Map(), this.tilesFetchingCount = 0, this.previousRequestedTiles = [], this.outgoingTilesHistory = [];
  }
  /**
   * Get a specific cacheable tile in this cache
   * I.e. independent of whether their fetching is completed and image bitmap is created
   *
   * @param {string} tileUrl - the url of the requested tile
   * @returns {(CacheableTile | undefined)}
   */
  getCacheableTile(t) {
    return this.tilesByTileUrl.get(t);
  }
  /**
   * Get a specific cached tile in this cache
   * I.e. with their fetching completed and image bitmap created
   *
   * @param {string} tileUrl - the url of the requested tile
   * @returns {(CachedTile | undefined)}
   */
  getCachedTile(t) {
    const e = this.tilesByTileUrl.get(t);
    if (e && e.isCachedTile())
      return e;
  }
  /**
   * Get the tiles in this cache (independent of whether their caching has completed)
   *
   * @returns {IterableIterator<CacheableTile>}
   */
  getCacheableTiles() {
    return this.tilesByTileUrl.values();
  }
  /**
   * Get the tiles in this cache whose caching has completed
   * I.e. their fetching is completed and image bitmap is created
   *
   * @returns {CacheableTile[]}
   */
  getCachedTiles() {
    const t = Array.from(this.tilesByTileUrl.values()), e = [];
    return t.forEach((i) => {
      i.isCachedTile() && e.push(i);
    }), e;
  }
  /**
   * Get the urls of all tiles in this cache
   *
   * @returns {IterableIterator<string>}
   */
  getTileUrls() {
    return this.tilesByTileUrl.keys();
  }
  /**
   * Process the request for new tiles to be added to this cache
   *
   * @param {FetchableMapTile[]} requestedTiles
   */
  requestFetcableMapTiles(t) {
    const e = gi(this.previousRequestedTiles), i = gi(t);
    if (Rh(e, i))
      return;
    const n = [];
    for (const a of this.previousRequestedTiles)
      i.has(go(a)) || n.push(a);
    this.updateOutgoingTilesHistory(n, t.length);
    const s = gi(this.outgoingTilesHistory), o = /* @__PURE__ */ new Set([
      ...i,
      ...s
    ]);
    for (const [a, h] of this.mapIdsByTileUrl)
      for (const c of h)
        o.has(po(c, a)) || this.removeMapTile(c, a);
    for (const a of t)
      this.addMapTile(a);
    this.previousRequestedTiles = t;
  }
  clear() {
    this.tilesByTileUrl = /* @__PURE__ */ new Map(), this.mapIdsByTileUrl = /* @__PURE__ */ new Map(), this.tileUrlsByMapId = /* @__PURE__ */ new Map(), this.tilesFetchingCount = 0, this.outgoingTilesHistory = [];
  }
  dispose() {
    for (const t of this.getCacheableTiles())
      this.removeEventListenersFromTile(t);
  }
  addMapTile(t) {
    const e = t.mapId, i = t.tileUrl;
    if (this.tilesByTileUrl.has(i))
      this.dispatchEvent(new $(k.MAPTILELOADED, {
        mapId: e,
        tileUrl: i
      }));
    else {
      const n = new pd(t);
      this.addEventListenersToTile(n), this.tilesByTileUrl.set(i, n), this.updateTilesFetchingCount(1), n.fetch();
    }
    this.addTileUrlForMapId(e, i), this.addMapIdForTileUrl(e, i);
  }
  removeMapTile(t, e) {
    const i = this.tilesByTileUrl.get(e);
    if (!i)
      return;
    const n = this.removeMapIdForTileUrl(t, e);
    this.removeTileUrlForMapId(t, e), n.size || (i.isCachedTile() || (i.abort(), this.updateTilesFetchingCount(-1)), this.tilesByTileUrl.delete(e)), this.dispatchEvent(new $(k.MAPTILEREMOVED, {
      mapId: t,
      tileUrl: e
    }));
  }
  updateOutgoingTilesHistory(t, e) {
    for (let o = t.length - 1; o >= 0; o--) {
      const a = t[o];
      this.outgoingTilesHistory.unshift(a);
    }
    this.outgoingTilesHistory = Array.from(new Set(this.outgoingTilesHistory));
    let i = 0, n = 0, s = 0;
    for (const o of this.outgoingTilesHistory) {
      if (i += 1, s = Md(o), n += s, i + e > Id) {
        i -= 1, n -= s;
        break;
      }
      if (n > Sd) {
        i -= 1, n -= s;
        break;
      }
    }
    this.outgoingTilesHistory = this.outgoingTilesHistory.slice(0, i);
  }
  tileFetched(t) {
    if (t instanceof $) {
      const e = t.data;
      this.updateTilesFetchingCount(-1);
      for (const i of this.mapIdsByTileUrl.get(e) || [])
        this.dispatchEvent(new $(k.MAPTILELOADED, {
          mapId: i,
          tileUrl: e
        })), this.tileUrlsByMapId.get(i)?.values().next().value === e && this.dispatchEvent(new $(k.FIRSTMAPTILELOADED, {
          mapId: i,
          tileUrl: e
        }));
    }
  }
  tileFetchError(t) {
    if (t instanceof $) {
      const e = t.data;
      this.tilesByTileUrl.has(e) || (this.updateTilesFetchingCount(-1), this.tilesByTileUrl.delete(e));
    }
  }
  addMapIdForTileUrl(t, e) {
    let i = this.mapIdsByTileUrl.get(e);
    return i ? i.add(t) : i = /* @__PURE__ */ new Set([t]), this.mapIdsByTileUrl.set(e, i), i;
  }
  removeMapIdForTileUrl(t, e) {
    const i = this.mapIdsByTileUrl.get(e);
    if (i)
      i.delete(t);
    else
      return /* @__PURE__ */ new Set();
    return i.size ? this.mapIdsByTileUrl.set(e, i) : this.mapIdsByTileUrl.delete(e), i;
  }
  addTileUrlForMapId(t, e) {
    let i = this.tileUrlsByMapId.get(t);
    return i ? i.add(e) : i = /* @__PURE__ */ new Set([e]), this.tileUrlsByMapId.set(t, i), i;
  }
  removeTileUrlForMapId(t, e) {
    const i = this.tileUrlsByMapId.get(t);
    return i ? (i.delete(e), i.size ? this.tileUrlsByMapId.set(t, i) : this.tileUrlsByMapId.delete(t), i) : /* @__PURE__ */ new Set();
  }
  updateTilesFetchingCount(t) {
    this.tilesFetchingCount += t, this.tilesFetchingCount === 0 && this.dispatchEvent(new $(k.ALLREQUESTEDTILESLOADED));
  }
  addEventListenersToTile(t) {
    t.addEventListener(k.TILEFETCHED, this.tileFetched.bind(this)), t.addEventListener(k.TILEFETCHERROR, this.tileFetchError.bind(this));
  }
  removeEventListenersFromTile(t) {
    t.removeEventListener(k.TILEFETCHED, this.tileFetched.bind(this)), t.removeEventListener(k.TILEFETCHERROR, this.tileFetchError.bind(this));
  }
}
class Pd {
  /**
   * Creates an instance of FetchableMapTile.
   *
   * @constructor
   * @param {Tile} tile - the tile
   * @param {WarpedMapWithImageInfo} warpedMap - the warpedMap, which must have its image info so the tileUrl can be assigned
   */
  constructor(t, e) {
    this.mapId = e.mapId, this.tile = t;
    const i = e.parsedImage.getIiifTile(t.tileZoomLevel, t.column, t.row);
    this.imageRequest = i;
    const n = e.parsedImage.getImageUrl(i);
    this.tileUrl = n;
  }
}
var Cd = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
const Rd = Cd;
var kd = typeof self == "object" && self && self.Object === Object && self, Od = Rd || kd || Function("return this")();
const yo = Od;
var Nd = yo.Symbol;
const Wr = Nd;
var wo = Object.prototype, Ld = wo.hasOwnProperty, jd = wo.toString, _e = Wr ? Wr.toStringTag : void 0;
function Bd(r) {
  var t = Ld.call(r, _e), e = r[_e];
  try {
    r[_e] = void 0;
    var i = !0;
  } catch {
  }
  var n = jd.call(r);
  return i && (t ? r[_e] = e : delete r[_e]), n;
}
var Dd = Object.prototype, Gd = Dd.toString;
function Fd(r) {
  return Gd.call(r);
}
var Ud = "[object Null]", Wd = "[object Undefined]", Gn = Wr ? Wr.toStringTag : void 0;
function Vd(r) {
  return r == null ? r === void 0 ? Wd : Ud : Gn && Gn in Object(r) ? Bd(r) : Fd(r);
}
function zd(r) {
  return r != null && typeof r == "object";
}
var Zd = "[object Symbol]";
function $d(r) {
  return typeof r == "symbol" || zd(r) && Vd(r) == Zd;
}
var qd = /\s/;
function Xd(r) {
  for (var t = r.length; t-- && qd.test(r.charAt(t)); )
    ;
  return t;
}
var Hd = /^\s+/;
function Yd(r) {
  return r && r.slice(0, Xd(r) + 1).replace(Hd, "");
}
function Vr(r) {
  var t = typeof r;
  return r != null && (t == "object" || t == "function");
}
var Fn = 0 / 0, Jd = /^[-+]0x[0-9a-f]+$/i, Kd = /^0b[01]+$/i, Qd = /^0o[0-7]+$/i, tf = parseInt;
function Un(r) {
  if (typeof r == "number")
    return r;
  if ($d(r))
    return Fn;
  if (Vr(r)) {
    var t = typeof r.valueOf == "function" ? r.valueOf() : r;
    r = Vr(t) ? t + "" : t;
  }
  if (typeof r != "string")
    return r === 0 ? r : +r;
  r = Yd(r);
  var e = Kd.test(r);
  return e || Qd.test(r) ? tf(r.slice(2), e ? 2 : 8) : Jd.test(r) ? Fn : +r;
}
var ef = function() {
  return yo.Date.now();
};
const mi = ef;
var rf = "Expected a function", nf = Math.max, sf = Math.min;
function of(r, t, e) {
  var i, n, s, o, a, h, c = 0, l = !1, u = !1, g = !0;
  if (typeof r != "function")
    throw new TypeError(rf);
  t = Un(t) || 0, Vr(e) && (l = !!e.leading, u = "maxWait" in e, s = u ? nf(Un(e.maxWait) || 0, t) : s, g = "trailing" in e ? !!e.trailing : g);
  function w(A) {
    var C = i, E = n;
    return i = n = void 0, c = A, o = r.apply(E, C), o;
  }
  function y(A) {
    return c = A, a = setTimeout(v, t), l ? w(A) : o;
  }
  function _(A) {
    var C = A - h, E = A - c, d = t - C;
    return u ? sf(d, s - E) : d;
  }
  function I(A) {
    var C = A - h, E = A - c;
    return h === void 0 || C >= t || C < 0 || u && E >= s;
  }
  function v() {
    var A = mi();
    if (I(A))
      return S(A);
    a = setTimeout(v, _(A));
  }
  function S(A) {
    return a = void 0, g && i ? w(A) : (i = n = void 0, o);
  }
  function f() {
    a !== void 0 && clearTimeout(a), c = 0, i = h = n = a = void 0;
  }
  function p() {
    return a === void 0 ? o : S(mi());
  }
  function T() {
    var A = mi(), C = I(A);
    if (i = arguments, n = this, h = A, C) {
      if (a === void 0)
        return y(h);
      if (u)
        return clearTimeout(a), a = setTimeout(v, t), w(h);
    }
    return a === void 0 && (a = setTimeout(v, t)), o;
  }
  return T.cancel = f, T.flush = p, T;
}
var af = "Expected a function";
function Li(r, t, e) {
  var i = !0, n = !0;
  if (typeof r != "function")
    throw new TypeError(af);
  return Vr(e) && (i = "leading" in e ? !!e.leading : i, n = "trailing" in e ? !!e.trailing : n), of(r, t, {
    leading: i,
    maxWait: t,
    trailing: n
  });
}
function hf(r) {
  let t = 0, e = 0;
  for (const a of r)
    t += a.w * a.h, e = Math.max(e, a.w);
  r.sort((a, h) => h.h - a.h);
  const n = [{ x: 0, y: 0, w: Math.max(Math.ceil(Math.sqrt(t / 0.95)), e), h: 1 / 0 }];
  let s = 0, o = 0;
  for (const a of r)
    for (let h = n.length - 1; h >= 0; h--) {
      const c = n[h];
      if (!(a.w > c.w || a.h > c.h)) {
        if (a.x = c.x, a.y = c.y, o = Math.max(o, a.y + a.h), s = Math.max(s, a.x + a.w), a.w === c.w && a.h === c.h) {
          const l = n.pop();
          h < n.length && (n[h] = l);
        } else
          a.h === c.h ? (c.x += a.w, c.w -= a.w) : a.w === c.w ? (c.y += a.h, c.h -= a.h) : (n.push({
            x: c.x + a.w,
            y: c.y,
            w: c.w - a.w,
            h: a.h
          }), c.y += a.h, c.h -= a.h);
        break;
      }
    }
  return {
    w: s,
    // container width
    h: o,
    // container height
    fill: t / (s * o) || 0
    // space utilization
  };
}
function Wn(r, t, e) {
  const i = r.createShader(t);
  if (i) {
    if (r.shaderSource(i, e), r.compileShader(i), r.getShaderParameter(i, r.COMPILE_STATUS))
      return i;
    {
      const s = r.getShaderInfoLog(i);
      throw r.deleteShader(i), new Error("Failed to compile shader: " + s);
    }
  } else
    throw new Error("Failed to create shader");
}
function cf(r, t, e) {
  const i = r.createProgram();
  if (i) {
    if (r.attachShader(i, t), r.attachShader(i, e), r.linkProgram(i), r.getProgramParameter(i, r.LINK_STATUS))
      return i;
    {
      const s = r.getProgramInfoLog(i);
      throw r.deleteProgram(i), new Error("Failed to link program: " + s);
    }
  } else
    throw new Error("Failed to create program");
}
function vr(r, t, e, i, n) {
  const s = r.createBuffer();
  r.bindBuffer(r.ARRAY_BUFFER, s), r.bufferData(r.ARRAY_BUFFER, e, r.STATIC_DRAW);
  const o = r.FLOAT, a = !1, h = 0, c = 0, l = r.getAttribLocation(t, n);
  r.vertexAttribPointer(l, i, o, a, h, c), r.enableVertexAttribArray(l);
}
const lf = 100, uf = {
  leading: !0,
  trailing: !0
}, df = 1, ff = 1;
class pf extends EventTarget {
  /**
   * Creates an instance of WebGL2WarpedMap.
   *
   * @constructor
   * @param {WebGL2RenderingContext} gl - the WebGL2 rendering context
   * @param {WebGLProgram} program - the WebGL2 program
   * @param {WarpedMap} warpedMap - the warped map to render
   */
  constructor(t, e, i) {
    super(), this.CachedTilesByTileUrl = /* @__PURE__ */ new Map(), this.opacity = df, this.saturation = ff, this.renderOptions = {}, this.warpedMap = i, this.gl = t, this.program = e, this.vao = t.createVertexArray(), this.packedTilesTexture = t.createTexture(), this.packedTilesScaleFactorsTexture = t.createTexture(), this.packedTilesPositionsTexture = t.createTexture(), this.packedTilesResourcePositionsAndDimensionsTexture = t.createTexture(), this.throttledUpdateTextures = Li(this.updateTextures.bind(this), lf, uf);
  }
  /**
   * Update the vertex buffers of this warped map
   *
   * @param {Transform} projectedGeoToClipTransform - Transform from projected geo coordinates to webgl2 coordinates in the [-1, 1] range. Equivalent to OpenLayer projectionTransform.
   */
  updateVertexBuffers(t) {
    this.projectedGeoToClipTransform = t, this.updateVertexBuffersInternal();
  }
  /**
   * Add cached tile to the textures of this map and update textures
   *
   * @param {CachedTile} cachedTile
   */
  addCachedTileAndUpdateTextures(t) {
    this.CachedTilesByTileUrl.set(t.tileUrl, t), this.throttledUpdateTextures();
  }
  /**
   * Remove cached tile from the textures of this map and update textes
   *
   * @param {string} tileUrl
   */
  removeCachedTileAndUpdateTextures(t) {
    this.CachedTilesByTileUrl.delete(t), this.throttledUpdateTextures();
  }
  dispose() {
    this.gl.deleteVertexArray(this.vao), this.gl.deleteTexture(this.packedTilesTexture), this.gl.deleteTexture(this.packedTilesScaleFactorsTexture), this.gl.deleteTexture(this.packedTilesPositionsTexture), this.gl.deleteTexture(this.packedTilesResourcePositionsAndDimensionsTexture);
  }
  updateVertexBuffersInternal() {
    if (!this.vao || !this.projectedGeoToClipTransform)
      return;
    this.gl.bindVertexArray(this.vao);
    const t = this.warpedMap.resourceTrianglePoints;
    vr(this.gl, this.program, new Float32Array(t.flat()), 2, "a_resourceTrianglePoint");
    const e = this.warpedMap.projectedGeoCurrentTrianglePoints.map((s) => pe(this.projectedGeoToClipTransform, s));
    vr(this.gl, this.program, new Float32Array(e.flat()), 2, "a_clipCurrentTrianglePoint");
    const i = this.warpedMap.projectedGeoNewTrianglePoints.map((s) => pe(this.projectedGeoToClipTransform, s));
    vr(this.gl, this.program, new Float32Array(i.flat()), 2, "a_clipNewTrianglePoint");
    let n = new Float32Array(this.warpedMap.resourceTrianglePoints.length);
    n = n.map((s, o) => Math.round((o - 1) / 3)), vr(this.gl, this.program, n, 1, "a_triangleIndex");
  }
  async updateTextures() {
    const t = this.gl;
    if (this.CachedTilesByTileUrl.size === 0)
      return;
    let e = [...this.CachedTilesByTileUrl.values()];
    e = e.filter((l) => this.warpedMap.resourceViewportRingBbox ? Eh(mo(l.tile), this.warpedMap.resourceViewportRingBbox) : !0);
    const i = e.length, n = e.map((l, u) => ({
      w: l.imageBitmap.width,
      h: l.imageBitmap.height,
      // Calling potpack will add x and y properties
      // with the position of the tile's origin in the pack
      // By adding them here already, we'll make TypeScript happy!
      x: 0,
      y: 0,
      index: u
    })), { w: s, h: o } = hf(n);
    t.pixelStorei(t.UNPACK_ALIGNMENT, 4), t.bindTexture(t.TEXTURE_2D, this.packedTilesTexture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, s, o, 0, t.RGBA, t.UNSIGNED_BYTE, null);
    for (const l of n) {
      const u = e[l.index].imageBitmap;
      t.texSubImage2D(t.TEXTURE_2D, 0, l.x, l.y, u.width, u.height, t.RGBA, t.UNSIGNED_BYTE, u);
    }
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
    const a = n.map((l) => [
      l.x,
      l.y
    ]);
    t.bindTexture(t.TEXTURE_2D, this.packedTilesPositionsTexture), t.texImage2D(t.TEXTURE_2D, 0, t.RG32I, 1, i, 0, t.RG_INTEGER, t.INT, new Int32Array(a.flat())), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
    const h = n.map((l) => {
      const u = e[l.index];
      if (u && u.imageRequest && u.imageRequest.region)
        return [
          u.imageRequest.region.x,
          u.imageRequest.region.y,
          u.imageRequest.region.width,
          u.imageRequest.region.height
        ];
    });
    t.bindTexture(t.TEXTURE_2D, this.packedTilesResourcePositionsAndDimensionsTexture), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA32I, 1, i, 0, t.RGBA_INTEGER, t.INT, new Int32Array(h.flat())), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
    const c = n.map(({ index: l }) => e[l].tile.tileZoomLevel.scaleFactor);
    t.bindTexture(t.TEXTURE_2D, this.packedTilesScaleFactorsTexture), t.texImage2D(t.TEXTURE_2D, 0, t.R32I, 1, i, 0, t.RED_INTEGER, t.INT, new Int32Array(c)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), this.dispatchEvent(new $(k.TEXTURESUPDATED));
  }
}
const gf = `#version 300 es

precision highp float;

uniform mat4 u_renderTransform;

uniform float u_animationProgress;

in vec2 a_resourceTrianglePoint;
in vec2 a_clipCurrentTrianglePoint;
in vec2 a_clipNewTrianglePoint;
in float a_triangleIndex;

out vec2 v_resourceTrianglePoint;
out float v_triangleIndex;

float cubicInOut(float t) {
  return t < 0.5f ? 4.0f * t * t * t : 0.5f * pow(2.0f * t - 2.0f, 3.0f) + 1.0f;
}

void main() {
  // Pass attributes as varyings to fragment shader
  v_resourceTrianglePoint = a_resourceTrianglePoint;
  v_triangleIndex = a_triangleIndex;

  // Compute triangle vertex coordinates by mixing current and new
  vec2 clipTrianglePoint = mix(a_clipCurrentTrianglePoint, a_clipNewTrianglePoint, cubicInOut(u_animationProgress));

  // Set triangle points coordinates
  // Variables that start with gl_ are special globalThis variables
  // gl_Position stores the vertex (or 'point') positions (or 'coordinates') in clip coordinates (which go from -1 to 1.)

  gl_Position = u_renderTransform * vec4(clipTrianglePoint, 0.0f, 1.0f);
}
`, mf = `#version 300 es

precision highp float;
precision highp isampler2D;

uniform bool u_removeColor;
uniform vec3 u_removeColorOptionsColor;
uniform float u_removeColorOptionsThreshold;
uniform float u_removeColorOptionsHardness;

uniform bool u_colorize;
uniform vec3 u_colorizeOptionsColor;

uniform float u_opacity;
uniform float u_saturation;

uniform int u_bestScaleFactor;

uniform sampler2D u_packedTilesTexture;
uniform isampler2D u_packedTilesPositionsTexture;
uniform isampler2D u_packedTilesResourcePositionsAndDimensionsTexture;
uniform isampler2D u_packedTilesScaleFactorsTexture;

in vec2 v_resourceTrianglePoint;
in float v_triangleIndex;

out vec4 color;

void main() {
  // The treated triangle point
  int resourceTrianglePointX = int(round(v_resourceTrianglePoint.x));
  int resourceTrianglePointY = int(round(v_resourceTrianglePoint.y));

  // Reading information on packed tiles from textures
  int packedTilesCount = textureSize(u_packedTilesPositionsTexture, 0).y;
  ivec2 packedTilesTextureSize = textureSize(u_packedTilesTexture, 0);

  // Setting references for the for loop
  int smallestScaleFactorDiff = 256 * 256; // Starting with very high number
  int bestScaleFactor = 0;

  // Prepare storage for the resulting packed tiles texture point that corresponds to the treated triangle point
  vec2 packedTilesTexturePoint = vec2(0.0f, 0.0f);

  color = vec4(0.0f, 0.0f, 0.0f, 0.0f);

  bool found = false;

  // Loop through all packed tiles
  for(int index = 0; index < packedTilesCount; index += 1) {

    // Read the information of the tile
    ivec2 packedTilePosition = texelFetch(u_packedTilesPositionsTexture, ivec2(0, index), 0).rg;
    ivec4 packedTileResourcePositionAndDimension = texelFetch(u_packedTilesResourcePositionsAndDimensionsTexture, ivec2(0, index), 0);
    int packedTileScaleFactor = texelFetch(u_packedTilesScaleFactorsTexture, ivec2(0, index), 0).r;

    float packedTilePositionX = float(packedTilePosition.r);
    float packedTilePositionY = float(packedTilePosition.g);

    int packedTileResourcePositionX = packedTileResourcePositionAndDimension.r;
    int packedTileResourcePositionY = packedTileResourcePositionAndDimension.g;

    int packedTileDimensionWidth = packedTileResourcePositionAndDimension.b;
    int packedTileDimensionHeight = packedTileResourcePositionAndDimension.a;

    // If the treated triangle point is inside the tile, consider to use the tile:
    // if the scale factor is closer to the best scale factor for this map then currently known one
    // update the smallest scale factor diff
    // and compute the packed tiles texture point that corresponds to the treated triangle point
    if(resourceTrianglePointX >= packedTileResourcePositionX &&
      resourceTrianglePointX < packedTileResourcePositionX + packedTileDimensionWidth &&
      resourceTrianglePointY >= packedTileResourcePositionY &&
      resourceTrianglePointY < packedTileResourcePositionY + packedTileDimensionHeight) {
      found = true;

      int scaleFactorDiff = abs(u_bestScaleFactor - packedTileScaleFactor);

      if(scaleFactorDiff < smallestScaleFactorDiff || bestScaleFactor == 0) {

        smallestScaleFactorDiff = scaleFactorDiff;
        bestScaleFactor = packedTileScaleFactor;

        float packedTilePointX = float(resourceTrianglePointX - packedTileResourcePositionX) / float(bestScaleFactor);
        float packedTilePointY = float(resourceTrianglePointY - packedTileResourcePositionY) / float(bestScaleFactor);

        float packedTilesPointX = packedTilePositionX + packedTilePointX;
        float packedTilesPointY = packedTilePositionY + packedTilePointY;

        float packedTilesTexturePointX = round(packedTilesPointX) / float(packedTilesTextureSize.x);
        float packedTilesTexturePointY = round(packedTilesPointY) / float(packedTilesTextureSize.y);

        packedTilesTexturePoint = vec2(packedTilesTexturePointX, packedTilesTexturePointY);
      }
    }
  }

  if(found == true) {
    // Read color of the treated point at its packed tiles texture point coordinates in the packed tiles texture
    color = texture(u_packedTilesTexture, packedTilesTexturePoint);

    // Remove background color
    if(u_removeColorOptionsThreshold > 0.0f) {
      vec3 backgroundColorDiff = color.rgb - u_removeColorOptionsColor.rgb;
      float backgroundColorDistance = length(backgroundColorDiff);
      if(u_removeColor && backgroundColorDistance < u_removeColorOptionsThreshold) {
        float amount = smoothstep(u_removeColorOptionsThreshold - u_removeColorOptionsThreshold * (1.0f - u_removeColorOptionsHardness), u_removeColorOptionsThreshold, backgroundColorDistance);
        color = vec4(color.rgb * amount, amount);
      }
    }

    // Saturation
    float gray = 0.21f * color.r + 0.71f * color.g + 0.07f * color.b;
    color = vec4(color.rgb * (u_saturation) + (gray * (1.0f - u_saturation)), color.a);

    // Colorize
    if(u_colorize) {
      color = vec4((u_colorizeOptionsColor + color.rgb) * color.a, color.a);
    }

    // Opacity
    color = vec4(color.rgb * u_opacity, color.a * u_opacity);

    // Debugging: uncomment to override color of the treated point with a color made from the point's triangle index
    // vec4 debugColor = vec4(abs(sin(v_triangleIndex)), abs(sin(v_triangleIndex + 1.0f)), abs(sin(v_triangleIndex + 2.0f)), 1);
    // color = debugColor;
  }
}
`, yf = 500, wf = {
  leading: !0,
  trailing: !0
}, vf = 50, xf = {
  leading: !0,
  trailing: !0
}, yi = 1, wi = 1, Tf = 0, bf = 0.7, Mf = 5, _f = 5, Vn = 750;
class Ef extends EventTarget {
  /**
   * Creates an instance of WebGL2Renderer.
   *
   * @constructor
   * @param {WebGL2RenderingContext} gl - the WebGL2 rendering context
   * @param {WarpedMapList} warpedMapList - the list of warped maps to render
   */
  constructor(t, e) {
    super(), this.webgl2WarpedMapsById = /* @__PURE__ */ new Map(), this.tileCache = new Ad(), this.mapsInViewport = /* @__PURE__ */ new Set(), this.opacity = yi, this.saturation = wi, this.renderOptions = {}, this.animating = !1, this.animationProgress = 1, this.warpedMapList = e, this.gl = t;
    const i = Wn(t, t.VERTEX_SHADER, gf), n = Wn(t, t.FRAGMENT_SHADER, mf);
    this.program = cf(t, i, n), t.deleteShader(i), t.deleteShader(n), t.disable(t.DEPTH_TEST), this.invertedRenderTransform = au(), this.addEventListeners(), this.throttledPrepareRenderInternal = Li(this.prepareRenderInternal.bind(this), yf, wf), this.throttledChanged = Li(this.changed.bind(this), vf, xf);
  }
  /**
   * Get the opacity of the renderer
   *
   * @returns {(number | undefined)}
   */
  getOpacity() {
    return this.opacity;
  }
  /**
   * Set the opacity of the renderer
   *
   * @param {number} opacity - opacity to set
   */
  setOpacity(t) {
    this.opacity = t;
  }
  /**
   * Reset the opacity of the renderer
   */
  resetOpacity() {
    this.opacity = yi;
  }
  /**
   * Get the opacity of a map
   *
   * @param {string} mapId - ID of the map
   * @returns {(number | undefined)}
   */
  getMapOpacity(t) {
    const e = this.webgl2WarpedMapsById.get(t);
    if (e)
      return e.opacity;
  }
  /**
   * Set the opacity of a map
   *
   * @param {string} mapId - ID of the map
   * @param {number} opacity - opacity to set
   */
  setMapOpacity(t, e) {
    const i = this.webgl2WarpedMapsById.get(t);
    i && (i.opacity = Math.min(Math.max(e, 0), 1));
  }
  /**
   * Rreset the opacity of a map
   *
   * @param {string} mapId - ID of the map
   */
  resetMapOpacity(t) {
    const e = this.webgl2WarpedMapsById.get(t);
    e && (e.opacity = yi);
  }
  /**
   * Get the remove color options of the renderer
   *
   * @returns {(Partial<RemoveColorOptions> | undefined)}
   */
  getRemoveColorOptions() {
    return this.renderOptions.removeColorOptions;
  }
  /**
   * Set the remove color options of the renderer
   *
   * @param {RemoveColorOptions} removeColorOptions
   */
  setRemoveColorOptions(t) {
    this.renderOptions.removeColorOptions = t;
  }
  /**
   * Reset the remove color options of the renderer
   */
  resetRemoveColorOptions() {
    this.renderOptions.removeColorOptions = void 0;
  }
  /**
   * Get the remove color options of a map
   *
   * @param {string} mapId - ID of the map
   * @returns {(Partial<RemoveColorOptions> | undefined)}
   */
  getMapRemoveColorOptions(t) {
    const e = this.webgl2WarpedMapsById.get(t);
    if (e)
      return e.renderOptions.removeColorOptions;
  }
  /**
   * Set the remove color options of a map
   *
   * @param {string} mapId - ID of the map
   * @param {RemoveColorOptions} removeColorOptions - the 'remove color options' to set
   */
  setMapRemoveColorOptions(t, e) {
    const i = this.webgl2WarpedMapsById.get(t);
    i && (i.renderOptions.removeColorOptions = e);
  }
  /**
   * Reset the remove color options of a map
   *
   * @param {string} mapId - ID of the map
   */
  resetMapRemoveColorOptions(t) {
    const e = this.webgl2WarpedMapsById.get(t);
    e && (e.renderOptions.removeColorOptions = void 0);
  }
  /**
   * Get the colorize options of the renderer
   *
   * @returns {(Partial<ColorizeOptions> | undefined)}
   */
  getColorizeOptions() {
    return this.renderOptions.colorizeOptions;
  }
  /**
   * Set the colorize options of the renderer
   *
   * @param {ColorizeOptions} colorizeOptions - the colorize options to set
   */
  setColorizeOptions(t) {
    this.renderOptions.colorizeOptions = t;
  }
  /**
   * Reset the colorize options of the renderer
   */
  resetColorizeOptions() {
    this.renderOptions.colorizeOptions = void 0;
  }
  /**
   * Get the colorize options of a map
   *
   * @param {string} mapId - ID of the map
   * @returns {(Partial<ColorizeOptions> | undefined)}
   */
  getMapColorizeOptions(t) {
    const e = this.webgl2WarpedMapsById.get(t);
    if (e)
      return e.renderOptions.colorizeOptions;
  }
  /**
   * Set the colorize options of a map
   *
   * @param {string} mapId - ID of the map
   * @param {ColorizeOptions} colorizeOptions - the colorize options to set
   */
  setMapColorizeOptions(t, e) {
    const i = this.webgl2WarpedMapsById.get(t);
    i && (i.renderOptions.colorizeOptions = e);
  }
  /**
   * Reset the colorize options of a map
   *
   * @param {string} mapId - ID of the map
   */
  resetMapColorizeOptions(t) {
    const e = this.webgl2WarpedMapsById.get(t);
    e && (e.renderOptions.colorizeOptions = void 0);
  }
  /**
   * Get the saturation of the renderer
   *
   * @returns {number}
   */
  getSaturation() {
    return this.saturation;
  }
  /**
   * Set the saturation of the renderer
   *
   * 0 - grayscale, 1 - original colors
   *
   * @param saturation - the satuation to set
   */
  setSaturation(t) {
    this.saturation = t;
  }
  /**
   * Reset the satuation of the renderer
   */
  resetSaturation() {
    this.saturation = wi;
  }
  /**
   * Get the saturation of a map
   *
   * @param {string} mapId - ID of the map
   * @returns {(number | undefined)}
   */
  getMapSaturation(t) {
    const e = this.webgl2WarpedMapsById.get(t);
    if (e)
      return e.saturation;
  }
  /**
   * Set the saturation of a map
   *
   * 0 - grayscale, 1 - original colors
   *
   * @param mapId - ID of the map
   * @param saturation - the saturation to set
   */
  setMapSaturation(t, e) {
    const i = this.webgl2WarpedMapsById.get(t);
    i && (i.saturation = e);
  }
  /**
   * Reset the saturation of a map
   *
   * @param {string} mapId - ID of the map
   */
  resetMapSaturation(t) {
    const e = this.webgl2WarpedMapsById.get(t);
    e && (e.saturation = wi);
  }
  /**
   * Render the map for a given viewport
   *
   * @param {Viewport} viewport - the current viewport
   */
  render(t) {
    this.viewport = t, this.checkAndLoadImageInfos() && this.throttledPrepareRenderInternal(), this.renderInternal();
  }
  clear() {
    this.warpedMapList.clear(), this.webgl2WarpedMapsById = /* @__PURE__ */ new Map(), this.mapsInViewport = /* @__PURE__ */ new Set(), this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT), this.tileCache.clear();
  }
  dispose() {
    for (const t of this.webgl2WarpedMapsById.values())
      this.removeEventListenersFromWebGL2WarpedMap(t), t.dispose();
    this.tileCache.clear(), this.tileCache.dispose(), this.removeEventListeners(), this.gl.deleteProgram(this.program);
  }
  startTransformationTransition() {
    this.lastAnimationFrameRequestId !== void 0 && cancelAnimationFrame(this.lastAnimationFrameRequestId), this.animating = !0, this.transformationTransitionStart = void 0, this.lastAnimationFrameRequestId = requestAnimationFrame(this.transformationTransitionFrame.bind(this));
  }
  transformationTransitionFrame(t) {
    if (this.transformationTransitionStart || (this.transformationTransitionStart = t), t - this.transformationTransitionStart < Vn)
      this.animationProgress = (t - this.transformationTransitionStart) / Vn, this.renderInternal(), this.lastAnimationFrameRequestId = requestAnimationFrame(this.transformationTransitionFrame.bind(this));
    else {
      for (const e of this.warpedMapList.getWarpedMaps())
        e.resetCurrentTrianglePoints();
      this.updateVertexBuffers(), this.animating = !1, this.animationProgress = 0, this.transformationTransitionStart = void 0;
    }
  }
  checkAndLoadImageInfos() {
    return this.viewport ? Array.from(this.warpedMapList.getMapsByGeoBbox(this.viewport.geoRectangleBbox)).map((e) => this.warpedMapList.getWarpedMap(e)).map((e) => e.hasImageInfo() ? !0 : (e.loadingImageInfo || e.loadImageInfo(), !1)).some((e) => e === !0) : !1;
  }
  prepareRenderInternal() {
    this.updateRequestedTiles(), this.updateVertexBuffers();
  }
  updateRequestedTiles() {
    if (!this.viewport || !this.viewportMovedSignificantly() || this.animating)
      return;
    const t = Array.from(this.warpedMapList.getMapsByGeoBbox(this.viewport.geoRectangleBbox)).sort((i, n) => vt(Ii(this.warpedMapList.getWarpedMap(i).geoMaskBbox), this.viewport.geoCenter) - vt(Ii(this.warpedMapList.getWarpedMap(n).geoMaskBbox), this.viewport.geoCenter)), e = [];
    for (const i of t) {
      const n = this.warpedMapList.getWarpedMap(i);
      if (!n || !n.visible || !n.hasImageInfo() || Sh(n.getViewportMaskBbox(this.viewport)) < Mf)
        continue;
      const s = yd(n.parsedImage, n.getResourceToCanvasScale(this.viewport));
      n.setBestScaleFactor(s.scaleFactor);
      const o = {
        // This can be expensive at high maxDepth and seems to work fine with maxDepth = 0
        maxDepth: 0
      }, a = md(n.projectedTransformer, this.viewport.projectedGeoRectangleBbox, o);
      n.setResourceViewportRing(a);
      const h = wd(a, s, n.parsedImage);
      for (const c of h)
        e.push(new Pd(c, n));
    }
    this.tileCache.requestFetcableMapTiles(e), this.updateMapsInViewport(e);
  }
  updateVertexBuffers() {
    if (this.viewport) {
      this.invertedRenderTransform = cu(this.viewport.projectedGeoToClipTransform);
      for (const t of this.mapsInViewport) {
        const e = this.webgl2WarpedMapsById.get(t);
        if (!e)
          break;
        e.updateVertexBuffers(this.viewport.projectedGeoToClipTransform);
      }
    }
  }
  viewportMovedSignificantly() {
    if (!this.viewport)
      return !1;
    if (this.previousSignificantViewport) {
      const t = [];
      for (let i = 0; i < 4; i++)
        t.push(vt(this.previousSignificantViewport.projectedGeoRectangle[i], this.viewport.projectedGeoRectangle[i]) / this.viewport.projectedGeoPerViewportScale);
      const e = Math.max(...t);
      return e === 0 ? !0 : e > _f ? (this.previousSignificantViewport = this.viewport, !0) : !1;
    } else
      return this.previousSignificantViewport = this.viewport, !0;
  }
  updateMapsInViewport(t) {
    const e = Array.from(this.mapsInViewport), i = t.map((o) => o.mapId).filter((o, a, h) => h.indexOf(o) === a);
    this.mapsInViewport = new Set(i.sort((o, a) => {
      const h = this.warpedMapList.getMapZIndex(o), c = this.warpedMapList.getMapZIndex(a);
      return h !== void 0 && c !== void 0 ? h - c : 0;
    }));
    const n = i.filter((o) => !e.includes(o)), s = e.filter((o) => !i.includes(o));
    for (const o in n)
      this.dispatchEvent(new $(k.WARPEDMAPENTER, o));
    for (const o in s)
      this.dispatchEvent(new $(k.WARPEDMAPLEAVE, o));
  }
  renderInternal() {
    if (!this.viewport)
      return;
    const t = hu(this.viewport.projectedGeoToClipTransform, this.invertedRenderTransform), e = this.gl;
    e.viewport(0, 0, e.canvas.width, e.canvas.height), e.enable(e.BLEND), e.blendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA), e.useProgram(this.program);
    const i = e.getUniformLocation(this.program, "u_renderTransform");
    e.uniformMatrix4fv(i, !1, uu(t));
    const n = e.getUniformLocation(this.program, "u_animationProgress");
    e.uniform1f(n, this.animationProgress);
    for (const s of this.mapsInViewport) {
      const o = this.webgl2WarpedMapsById.get(s);
      if (!o)
        continue;
      this.setRenderOptionsUniforms(this.renderOptions, o.renderOptions);
      const a = e.getUniformLocation(this.program, "u_opacity");
      e.uniform1f(a, this.opacity * o.opacity);
      const h = e.getUniformLocation(this.program, "u_saturation");
      e.uniform1f(h, this.saturation * o.saturation);
      const c = e.getUniformLocation(this.program, "u_bestScaleFactor"), l = o.warpedMap.bestScaleFactor;
      e.uniform1i(c, l);
      const u = e.getUniformLocation(this.program, "u_packedTilesTexture");
      e.uniform1i(u, 0), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, o.packedTilesTexture);
      const g = e.getUniformLocation(this.program, "u_packedTilesPositionsTexture");
      e.uniform1i(g, 1), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, o.packedTilesPositionsTexture);
      const w = e.getUniformLocation(this.program, "u_packedTilesResourcePositionsAndDimensionsTexture");
      e.uniform1i(w, 2), e.activeTexture(e.TEXTURE2), e.bindTexture(e.TEXTURE_2D, o.packedTilesResourcePositionsAndDimensionsTexture);
      const y = e.getUniformLocation(this.program, "u_packedTilesScaleFactorsTexture");
      e.uniform1i(y, 3), e.activeTexture(e.TEXTURE3), e.bindTexture(e.TEXTURE_2D, o.packedTilesScaleFactorsTexture);
      const _ = o.vao, I = o.warpedMap.resourceTrianglePoints.length, v = this.gl.TRIANGLES, S = 0;
      e.bindVertexArray(_), e.drawArrays(v, S, I);
    }
  }
  setRenderOptionsUniforms(t, e) {
    const i = this.gl, n = {
      removeColorOptions: {
        color: e.removeColorOptions?.color || t.removeColorOptions?.color,
        hardness: vn(e.removeColorOptions?.hardness, t.removeColorOptions?.hardness),
        threshold: vn(e.removeColorOptions?.threshold, t.removeColorOptions?.threshold)
      },
      colorizeOptions: {
        ...t.colorizeOptions,
        ...e.colorizeOptions
      }
    }, s = n.removeColorOptions?.color, o = i.getUniformLocation(this.program, "u_removeColor");
    if (i.uniform1f(o, s ? 1 : 0), s) {
      const c = i.getUniformLocation(this.program, "u_removeColorOptionsColor");
      i.uniform3fv(c, s);
      const l = i.getUniformLocation(this.program, "u_removeColorOptionsThreshold");
      i.uniform1f(l, n.removeColorOptions?.threshold || Tf);
      const u = i.getUniformLocation(this.program, "u_removeColorOptionsHardness");
      i.uniform1f(u, n.removeColorOptions?.hardness || bf);
    }
    const a = n.colorizeOptions?.color, h = i.getUniformLocation(this.program, "u_colorize");
    if (i.uniform1f(h, a ? 1 : 0), a) {
      const c = i.getUniformLocation(this.program, "u_colorizeOptionsColor");
      i.uniform3fv(c, a);
    }
  }
  changed() {
    this.dispatchEvent(new $(k.CHANGED));
  }
  imageInfoLoaded(t) {
    t instanceof $ && this.dispatchEvent(new $(k.IMAGEINFOLOADED));
  }
  mapTileLoaded(t) {
    if (t instanceof $) {
      const { mapId: e, tileUrl: i } = t.data, n = this.tileCache.getCacheableTile(i);
      if (!n || !n.isCachedTile())
        return;
      const s = this.webgl2WarpedMapsById.get(e);
      if (!s)
        return;
      s.addCachedTileAndUpdateTextures(n);
    }
  }
  mapTileRemoved(t) {
    if (t instanceof $) {
      const { mapId: e, tileUrl: i } = t.data, n = this.webgl2WarpedMapsById.get(e);
      if (!n)
        return;
      n.removeCachedTileAndUpdateTextures(i);
    }
  }
  warpedMapAdded(t) {
    if (t instanceof $) {
      const e = t.data, i = this.warpedMapList.getWarpedMap(e);
      if (i) {
        const n = new pf(this.gl, this.program, i);
        this.webgl2WarpedMapsById.set(i.mapId, n), this.addEventListenersToWebGL2WarpedMap(n);
      }
    }
  }
  transformationChanged(t) {
    if (t instanceof $) {
      const e = t.data;
      for (const i of this.warpedMapList.getWarpedMaps(e))
        this.animating && i.mixProjectedGeoCurrentAndNewTrianglePoints(this.animationProgress), i.updateProjectedGeoTrianglePoints(!1);
      this.updateVertexBuffers(), this.startTransformationTransition();
    }
  }
  addEventListenersToWebGL2WarpedMap(t) {
    t.addEventListener(k.TEXTURESUPDATED, this.throttledChanged.bind(this));
  }
  removeEventListenersFromWebGL2WarpedMap(t) {
    t.removeEventListener(k.TEXTURESUPDATED, this.throttledChanged.bind(this));
  }
  addEventListeners() {
    this.tileCache.addEventListener(k.MAPTILELOADED, this.mapTileLoaded.bind(this)), this.tileCache.addEventListener(k.MAPTILEREMOVED, this.mapTileRemoved.bind(this)), this.warpedMapList.addEventListener(k.IMAGEINFOLOADED, this.imageInfoLoaded.bind(this)), this.warpedMapList.addEventListener(k.WARPEDMAPADDED, this.warpedMapAdded.bind(this)), this.warpedMapList.addEventListener(k.TRANSFORMATIONCHANGED, this.transformationChanged.bind(this));
  }
  removeEventListeners() {
    this.tileCache.removeEventListener(k.MAPTILELOADED, this.mapTileLoaded.bind(this)), this.tileCache.removeEventListener(k.MAPTILEREMOVED, this.mapTileRemoved.bind(this)), this.warpedMapList.removeEventListener(k.IMAGEINFOLOADED, this.imageInfoLoaded.bind(this)), this.warpedMapList.removeEventListener(k.WARPEDMAPADDED, this.warpedMapAdded.bind(this)), this.warpedMapList.removeEventListener(k.TRANSFORMATIONCHANGED, this.transformationChanged.bind(this));
  }
}
const If = "Renderer not defined. Add the layer to a map before calling this function.";
function z(r) {
  if (!r)
    throw new Error(If);
}
class vo extends leafletSrcExports.Layer {
  constructor(t, e) {
    super(), this.options = {
      opacity: 1,
      interactive: !1,
      className: "",
      pane: "tilePane",
      zIndex: 1
    }, this.initialize(t, e);
  }
  /**
   * Creates a WarpedMapLayer
   * @param {unknown} [annotation] - Georeference Annotation or URL of a Georeference Annotation
   * @param {WarpedMapLayerOptions} options
   */
  initialize(t, e) {
    this._annotationOrAnnotationUrl = t, leafletSrcExports.setOptions(this, e), this._initGl();
  }
  /**
   * Contains all code code that creates DOM elements for the layer and adds them to map panes where they belong.
   * @async
   */
  onAdd(t) {
    if (!this._map || !this.container)
      return this;
    const e = this.getPaneName();
    return this._map.getPane(e)?.appendChild(this.container), t.on("zoomend viewreset move", this._update, this), t.on("zoomanim", this._animateZoom, this), t.on("unload", this._unload, this), this.resizeObserver = new ResizeObserver(this._resized.bind(this)), this.resizeObserver.observe(this._map.getContainer(), {
      box: "content-box"
    }), this._annotationOrAnnotationUrl && (typeof this._annotationOrAnnotationUrl == "string" && kh(this._annotationOrAnnotationUrl) ? this.addGeoreferenceAnnotationByUrl(
      this._annotationOrAnnotationUrl
    ).then(() => this._update()) : this.addGeoreferenceAnnotation(this._annotationOrAnnotationUrl).then(
      () => this._update()
    )), this;
  }
  /**
   * Contains all cleanup code that removes the layer's elements from the DOM.
   */
  onRemove(t) {
    return this.container && this.container.remove(), t.off("zoomend viewreset move", this._update, this), t.off("zoomanim", this._animateZoom, this), this;
  }
  /**
   * Adds a [Georeference Annotation](https://iiif.io/api/extension/georef/).
   * @async
   * @param {any} annotation - Georeference Annotation
   * @returns {Promise<(string | Error)[]>} - the map IDs of the maps that were added, or an error per map
   */
  async addGeoreferenceAnnotation(t) {
    z(this.renderer);
    const e = await this.renderer.warpedMapList.addGeoreferenceAnnotation(
      t
    );
    return this._update(), e;
  }
  /**
   * Removes a [Georeference Annotation](https://iiif.io/api/extension/georef/).
   * @async
   * @param {any} annotation - Georeference Annotation
   * @returns {Promise<(string | Error)[]>} - the map IDs of the maps that were removed, or an error per map
   */
  async removeGeoreferenceAnnotation(t) {
    z(this.renderer);
    const e = await this.renderer.warpedMapList.removeGeoreferenceAnnotation(t);
    return this._update(), e;
  }
  /**
   * Adds a [Georeference Annotation](https://iiif.io/api/extension/georef/) by URL.
   * @async
   * @param {string} annotationUrl - Georeference Annotation
   * @returns {Promise<(string | Error)[]>} - the map IDs of the maps that were added, or an error per map
   */
  async addGeoreferenceAnnotationByUrl(t) {
    const e = await fetch(t).then(
      (i) => i.json()
    );
    return this.addGeoreferenceAnnotation(e);
  }
  /**
   * Removes a [Georeference Annotation](https://iiif.io/api/extension/georef/) by URL.
   * @async
   * @param {string} annotationUrl - Georeference Annotation
   * @returns {Promise<(string | Error)[]>} - the map IDs of the maps that were removed, or an error per map
   */
  async removeGeoreferenceAnnotationByUrl(t) {
    const e = await fetch(t).then(
      (n) => n.json()
    );
    return this.removeGeoreferenceAnnotation(e);
  }
  /**
   * Adds a Georeferenced map.
   * @param {any} georeferencedMap - Georeferenced map
   * @returns {Promise<(string | Error)>} - the map ID of the map that was added, or an error
   */
  async addGeoreferencedMap(t) {
    z(this.renderer);
    const e = this.renderer.warpedMapList.addGeoreferencedMap(t);
    return this._update(), e;
  }
  /**
   * Removes a Georeferenced map.
   * @param {any} georeferencedMap - Georeferenced map
   * @returns {Promise<(string | Error)>} - the map ID of the map that was removed, or an error
   */
  async removeGeoreferencedMap(t) {
    z(this.renderer);
    const e = this.renderer.warpedMapList.removeGeoreferencedMap(t);
    return this._update(), e;
  }
  /**
   * Gets the HTML container element of the layer
   * @return {HTMLElement} HTML Div Element
   */
  getContainer() {
    return this.container;
  }
  /**
   * Gets the HTML canvas element of the layer
   * @return {HTMLCanvasElement | null} HTML Canvas Element
   */
  getCanvas() {
    return this.canvas;
  }
  /**
   * Returns the WarpedMapList object that contains a list of the warped maps of all loaded maps
   */
  getWarpedMapList() {
    return z(this.renderer), this.renderer.warpedMapList;
  }
  /**
   * Returns a single map's warped map
   * @param {string} mapId - ID of the map
   * @returns {WarpedMap | undefined} the warped map
   */
  getWarpedMap(t) {
    return z(this.renderer), this.renderer.warpedMapList.getWarpedMap(t);
  }
  /**
   * Make a single map visible
   * @param {string} mapId - ID of the map
   */
  showMap(t) {
    z(this.renderer), this.renderer.warpedMapList.showMaps([t]), this._update();
  }
  /**
   * Make multiple maps visible
   * @param {Iterable<string>} mapIds - IDs of the maps
   */
  showMaps(t) {
    z(this.renderer), this.renderer.warpedMapList.showMaps(t), this._update();
  }
  /**
   * Make a single map invisible
   * @param {string} mapId - ID of the map
   */
  hideMap(t) {
    z(this.renderer), this.renderer.warpedMapList.hideMaps([t]), this._update();
  }
  /**
   * Make multiple maps invisible
   * @param {Iterable<string>} mapIds - IDs of the maps
   */
  hideMaps(t) {
    z(this.renderer), this.renderer.warpedMapList.hideMaps(t), this._update();
  }
  /**
   * Returns the visibility of a single map
   * @returns {boolean | undefined} - whether the map is visible
   */
  isMapVisible(t) {
    return z(this.renderer), this.renderer.warpedMapList.getWarpedMap(t)?.visible;
  }
  /**
   * Sets the resource mask of a single map
   * @param {string} mapId - ID of the map
   * @param {Point[]} resourceMask - new resource mask
   */
  setMapResourceMask(t, e) {
    z(this.renderer), this.renderer.warpedMapList.setMapResourceMask(t, e), this._update();
  }
  /**
   * Sets the transformation type of multiple maps
   * @param {Iterable<string>} mapIds - IDs of the maps
   * @param {TransformationType} transformation - new transformation type
   */
  setMapsTransformationType(t, e) {
    z(this.renderer), this.renderer.warpedMapList.setMapsTransformationType(
      t,
      e
    ), this._update();
  }
  /**
   * Returns the bounds of all visible maps (inside or outside of the Viewport), in latitude/longitude coordinates.
   * @returns {number[][] | undefined} - L.LatLngBounds in array form of all visible maps
   */
  getBounds() {
    z(this.renderer);
    const t = this.renderer.warpedMapList.getBbox();
    if (t)
      return [
        [t[1], t[0]],
        [t[3], t[2]]
      ];
  }
  /**
   * Bring maps to front
   * @param {Iterable<string>} mapIds - IDs of the maps
   */
  bringMapsToFront(t) {
    z(this.renderer), this.renderer.warpedMapList.bringMapsToFront(t), this._update();
  }
  /**
   * Send maps to back
   * @param {Iterable<string>} mapIds - IDs of the maps
   */
  sendMapsToBack(t) {
    z(this.renderer), this.renderer.warpedMapList.sendMapsToBack(t), this._update();
  }
  /**
   * Bring maps forward
   * @param {Iterable<string>} mapIds - IDs of the maps
   */
  bringMapsForward(t) {
    z(this.renderer), this.renderer.warpedMapList.bringMapsForward(t), this._update();
  }
  /**
   * Send maps backward
   * @param {Iterable<string>} mapIds - IDs of the maps
   */
  sendMapsBackward(t) {
    z(this.renderer), this.renderer.warpedMapList.sendMapsBackward(t), this._update();
  }
  /**
   * Brings the layer in front of other overlays (in the same map pane).
   */
  bringToFront() {
    return this._map && this.container && leafletSrcExports.DomUtil.toFront(this.container), this;
  }
  /**
   * Brings the layer to the back of other overlays (in the same map pane).
   */
  bringToBack() {
    return this._map && this.container && leafletSrcExports.DomUtil.toBack(this.container), this;
  }
  /**
   * Returns the z-index of a single map
   * @param {string} mapId - ID of the map
   * @returns {number | undefined} - z-index of the map
   */
  getMapZIndex(t) {
    return z(this.renderer), this.renderer.warpedMapList.getMapZIndex(t);
  }
  /**
   * Gets the zIndex of the layer.
   */
  getZIndex() {
    return this.options.zIndex;
  }
  /**
   * Changes the zIndex of the layer.
   * @param {number} value - zIndex
   */
  setZIndex(t) {
    return this.options.zIndex = t, this._updateZIndex(), this;
  }
  /**
   * Sets the image info Cache of the warpedMapList
   * @param {Cache} cache - the image info cache
   */
  setImageInfoCache(t) {
    z(this.renderer), this.renderer.warpedMapList.setImageInfoCache(t);
  }
  /**
   * Gets the pane name the layer is attached to. Defaults to 'tilePane'
   * @returns {string} Pane name
   */
  getPaneName() {
    return this._map.getPane(this.options.pane) ? this.options.pane : "tilePane";
  }
  /**
   * Gets the opacity of the layer
   * @returns {number} Layer opacity
   */
  getOpacity() {
    return this.options.opacity;
  }
  /**
   * Sets the opacity of the layer
   * @param {number} opacity - Layer opacity
   */
  setOpacity(t) {
    return this.options.opacity = t, this._update(), this;
  }
  /**
   * Resets the opacity of the layer to fully opaque
   */
  resetOpacity() {
    return this.options.opacity = 1, this._update(), this;
  }
  /**
   * Gets the opacity of a single map
   * @param {string} mapId - ID of the map
   * @return {number | undefined} opacity of the map
   */
  getMapOpacity(t) {
    return z(this.renderer), this.renderer.getMapOpacity(t);
  }
  /**
   * Sets the opacity of a single map
   * @param {string} mapId - ID of the map
   * @param {number} opacity - opacity between 0 and 1, where 0 is fully transparent and 1 is fully opaque
   */
  setMapOpacity(t, e) {
    return z(this.renderer), this.renderer.setMapOpacity(t, e), this._update(), this;
  }
  /**
   * Resets the opacity of a single map to 1
   * @param {string} mapId - ID of the map
   */
  resetMapOpacity(t) {
    return z(this.renderer), this.renderer.resetMapOpacity(t), this._update(), this;
  }
  /**
   * Sets the saturation of a single map
   * @param {number} saturation - saturation between 0 and 1, where 0 is grayscale and 1 are the original colors
   */
  setSaturation(t) {
    return z(this.renderer), this.renderer.setSaturation(t), this._update(), this;
  }
  /**
   * Resets the saturation of a single map to the original colors
   */
  resetSaturation() {
    return z(this.renderer), this.renderer.resetSaturation(), this._update(), this;
  }
  /**
   * Sets the saturation of a single map
   * @param {string} mapId - ID of the map
   * @param {number} saturation - saturation between 0 and 1, where 0 is grayscale and 1 are the original colors
   */
  setMapSaturation(t, e) {
    return z(this.renderer), this.renderer.setMapSaturation(t, e), this._update(), this;
  }
  /**
   * Resets the saturation of a single map to the original colors
   * @param {string} mapId - ID of the map
   */
  resetMapSaturation(t) {
    return z(this.renderer), this.renderer.resetMapSaturation(t), this._update(), this;
  }
  /**
   * Removes a color from all maps
   * @param {Object} options - remove color options
   * @param {string} [options.hexColor] - hex color to remove
   * @param {number} [options.threshold] - threshold between 0 and 1
   * @param {number} [options.hardness] - hardness between 0 and 1
   */
  setRemoveColor(t) {
    z(this.renderer);
    const e = t.hexColor ? or(t.hexColor) : void 0;
    return this.renderer.setRemoveColorOptions({
      color: e,
      threshold: t.threshold,
      hardness: t.hardness
    }), this._update(), this;
  }
  /**
   * Resets the color removal for all maps
   */
  resetRemoveColor() {
    return z(this.renderer), this.renderer.resetRemoveColorOptions(), this._update(), this;
  }
  /**
   * Removes a color from a single map
   * @param {string} mapId - ID of the map
   * @param {Object} options - remove color options
   * @param {string} [options.hexColor] - hex color to remove
   * @param {number} [options.threshold] - threshold between 0 and 1
   * @param {number} [options.hardness] - hardness between 0 and 1
   */
  setMapRemoveColor(t, e) {
    z(this.renderer);
    const i = e.hexColor ? or(e.hexColor) : void 0;
    return this.renderer.setMapRemoveColorOptions(t, {
      color: i,
      threshold: e.threshold,
      hardness: e.hardness
    }), this._update(), this;
  }
  /**
   * Resets the color removal for a single map
   * @param {string} mapId - ID of the map
   */
  resetMapRemoveColor(t) {
    return z(this.renderer), this.renderer.resetMapRemoveColorOptions(t), this;
  }
  /**
   * Sets the colorization for all maps
   * @param {string} hexColor - desired hex color
   */
  setColorize(t) {
    z(this.renderer);
    const e = or(t);
    return e && (this.renderer.setColorizeOptions({ color: e }), this._update()), this;
  }
  /**
   * Resets the colorization for all maps
   */
  resetColorize() {
    return z(this.renderer), this.renderer.resetColorizeOptions(), this._update(), this;
  }
  /**
   * Sets the colorization for a single map
   * @param {string} mapId - ID of the map
   * @param {string} hexColor - desired hex color
   */
  setMapColorize(t, e) {
    z(this.renderer);
    const i = or(e);
    return i && (this.renderer.setMapColorizeOptions(t, { color: i }), this._update()), this;
  }
  /**
   * Resets the colorization of a single map
   * @param {string} mapId - ID of the map
   */
  resetMapColorize(t) {
    return z(this.renderer), this.renderer.resetMapColorizeOptions(t), this._update(), this;
  }
  /**
   * Removes all warped maps from the layer
   */
  clear() {
    return z(this.renderer), this.renderer.clear(), this._update(), this;
  }
  _initGl() {
    if (this.container = leafletSrcExports.DomUtil.create("div"), this.container.classList.add("leaflet-layer"), this.container.classList.add("allmaps-warped-map-layer"), this.options.zIndex && this._updateZIndex(), this.canvas = leafletSrcExports.DomUtil.create("canvas", void 0, this.container), this.canvas.classList.add("leaflet-zoom-animated"), this.canvas.classList.add("leaflet-image-layer"), this.options.interactive && this.canvas.classList.add("leaflet-interactive"), this.options.className && this.canvas.classList.add(this.options.className), this.gl = this.canvas.getContext("webgl2", {
      premultipliedAlpha: !0
    }), !this.gl)
      throw new Error("WebGL 2 not available");
    const t = new dd(this.options.imageInfoCache);
    this.renderer = new Ef(this.gl, t), this._addEventListeners();
  }
  _resized(t) {
    if (this.canvas) {
      for (const e of t) {
        const i = e.contentRect.width, n = e.contentRect.height, s = window.devicePixelRatio, o = Math.round(i * s), a = Math.round(n * s);
        this.canvas.width = o, this.canvas.height = a, this.canvas.style.width = i + "px", this.canvas.style.height = n + "px";
      }
      this._update();
    }
  }
  // Note: borrowed from L.ImageOverlay
  // https://github.com/Leaflet/Leaflet/blob/3b62c7ec96242ee4040cf438a8101a48f8da316d/src/layer/ImageOverlay.js#L225
  _animateZoom(t) {
    if (!this.canvas)
      return;
    const e = this._map.getZoomScale(t.zoom), i = this._map._latLngBoundsToNewLayerBounds(
      this._map.getBounds(),
      t.zoom,
      t.center
    ).min;
    leafletSrcExports.DomUtil.setTransform(this.canvas, i, e);
  }
  _updateZIndex() {
    this.container && this.options.zIndex !== void 0 && (this.container.style.zIndex = String(this.options.zIndex));
  }
  _update() {
    if (!this._map || !this.renderer || !this.canvas || !this._map.options.crs)
      return;
    const t = this._map.containerPointToLayerPoint([0, 0]);
    leafletSrcExports.DomUtil.setPosition(this.canvas, t), this.renderer.setOpacity(this.getOpacity());
    const e = this._map.getCenter(), i = this._map.options.crs.project(e), n = [
      i.x,
      i.y
    ], s = this._map.getSize(), o = [s.x, s.y], a = this._map.getBounds(), h = this._map.options.crs.project(
      a.getNorthEast()
    ), c = this._map.options.crs.project(
      a.getNorthWest()
    ), l = this._map.options.crs.project(
      a.getSouthWest()
    ), u = this._map.options.crs.project(
      a.getSouthEast()
    ), g = [
      [h.x, h.y],
      [c.x, c.y],
      [l.x, l.y],
      [u.x, u.y]
    ], w = Si(g), y = _s(
      w,
      o
    ), _ = new fd(
      n,
      o,
      0,
      y,
      window.devicePixelRatio
    );
    return this.renderer.render(_), this.container;
  }
  _addEventListeners() {
    z(this.renderer), this.renderer.addEventListener(
      k.CHANGED,
      this._update.bind(this)
    ), this.renderer.addEventListener(
      k.IMAGEINFOLOADED,
      this._update.bind(this)
    ), this.renderer.addEventListener(
      k.WARPEDMAPENTER,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.addEventListener(
      k.WARPEDMAPLEAVE,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.tileCache.addEventListener(
      k.FIRSTMAPTILELOADED,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.tileCache.addEventListener(
      k.ALLREQUESTEDTILESLOADED,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.warpedMapList.addEventListener(
      k.WARPEDMAPADDED,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.warpedMapList.addEventListener(
      k.WARPEDMAPREMOVED,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.warpedMapList.addEventListener(
      k.VISIBILITYCHANGED,
      this._update.bind(this)
    ), this.renderer.warpedMapList.addEventListener(
      k.CLEARED,
      this._update.bind(this)
    );
  }
  _removeEventListeners() {
    z(this.renderer), this.renderer.removeEventListener(
      k.CHANGED,
      this._update.bind(this)
    ), this.renderer.removeEventListener(
      k.IMAGEINFOLOADED,
      this._update.bind(this)
    ), this.renderer.removeEventListener(
      k.WARPEDMAPENTER,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.removeEventListener(
      k.WARPEDMAPLEAVE,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.tileCache.removeEventListener(
      k.FIRSTMAPTILELOADED,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.tileCache.removeEventListener(
      k.ALLREQUESTEDTILESLOADED,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.warpedMapList.removeEventListener(
      k.WARPEDMAPADDED,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.warpedMapList.removeEventListener(
      k.WARPEDMAPREMOVED,
      this._passWarpedMapEvent.bind(this)
    ), this.renderer.warpedMapList.removeEventListener(
      k.VISIBILITYCHANGED,
      this._update.bind(this)
    ), this.renderer.warpedMapList.removeEventListener(
      k.CLEARED,
      this._update.bind(this)
    );
  }
  _passWarpedMapEvent(t) {
    t instanceof $ && this._map && this._map.fire(t.type, t.data);
  }
  _unload() {
    if (z(this.renderer), !this.gl)
      return;
    this.renderer.dispose();
    const t = this.gl.getExtension("WEBGL_lose_context");
    t && t.loseContext();
    const e = this.gl.canvas;
    e.width = 1, e.height = 1, this.resizeObserver?.disconnect(), this._removeEventListeners();
  }
}
const Sf = function(r, t) {
  return new vo(r, t);
};
L.WarpedMapLayer = vo;
L.warpedMapLayer = Sf;

// leaflet_layer_opacity.js

class LayerOpacityControl extends L$1.Control {
  initialize(layer) {
    super.initialize();
    let options = { position: 'topleft' };

    // Check if the layer is actually a layer group and adjust accordingly
    if (typeof layer.getLayers !== 'undefined') {
      options.layer = layer.getLayers()[0];
    } else {
      options.layer = layer;
    }

    L$1.Util.setOptions(this, options);
  }

  onAdd(map) {
    const container = L$1.DomUtil.create('div', 'opacity-control unselectable');
    L$1.DomUtil.create('div', 'opacity-area', container);
    const handle = L$1.DomUtil.create('div', 'opacity-handle', container);
    L$1.DomUtil.create('div', 'opacity-arrow-up', handle);
    const handleText = L$1.DomUtil.create('div', 'opacity-text', handle);
    L$1.DomUtil.create('div', 'opacity-arrow-down', handle);
    const bottom = L$1.DomUtil.create('div', 'opacity-bottom', container);

    L$1.DomEvent.stopPropagation(container);
    L$1.DomEvent.disableClickPropagation(container);

    this.setListeners(handle, bottom, handleText);
    handle.style.top = `${handle.offsetTop - 13 + 50}px`;
    handleText.innerHTML = `${parseInt(this.options.layer.options.opacity * 100, 10)}%`;

    return container;
  }

  setListeners(handle, bottom, handleText) {
    let start = false;
    let startTop;

    L$1.DomEvent.on(document, 'mousemove', (e) => {
      if (!start) return;
      const percentInverse = Math.max(0, Math.min(200, startTop + parseInt(e.clientY, 10) - start)) / 2;
      handle.style.top = `${(percentInverse * 2) - 13}px`;
      handleText.innerHTML = `${Math.round((1 - (percentInverse / 100)) * 100)}%`;
      bottom.style.height = `${Math.max(0, ((100 - percentInverse) * 2) - 13)}px`;
      bottom.style.top = `${Math.min(200, (percentInverse * 2) + 13)}px`;
      this.options.layer.setOpacity(1 - (percentInverse / 100));
    });

    L$1.DomEvent.on(handle, 'mousedown', (e) => {
      start = parseInt(e.clientY, 10);
      startTop = handle.offsetTop - 12;
      return false;
    });

    L$1.DomEvent.on(document, 'mouseup', () => {
      start = null;
    });
  }
}

// Extend Leaflet's control factory to include this new control
L$1.Control.layerOpacity = function(layer, options) {
  return new LayerOpacityControl(layer, options);
};

// initialize_geoblacklight_map.js

function initializeGeoBlacklightMap() {
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("geoblacklight-allmaps-map") != null) {
      const element = document.getElementById("geoblacklight-allmaps-map");
      const allmaps_id = element.getAttribute("data-allmaps-id");
      const geoTab = document.getElementById("georeferenced-tab");
      if (!element) return; // Exit if the element doesn't exist

      const map = L$1.map("geoblacklight-allmaps-map", {
        center: [0, 0],
        zoom: 15,
        zoomAnimationThreshold: 1
      });

      // Basemap and Attribution
      L$1.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
        maxZoom: 18
      }).addTo(map);
  
      // Fullscreen control
      map.addControl(new L$1.Control.Fullscreen({
        position: "topright"
      }));

      // Annotation URL assumes the ID is passed dynamically to this function
      const annotationUrl = `https://annotations.allmaps.org/manifests/${allmaps_id}`;
      const warpedMapLayer = new vo(annotationUrl).addTo(map);

      // Layer opacity control
      map.addControl(new LayerOpacityControl(warpedMapLayer));

      // Watch DOM to see active tab and
      // Resize map to render correctly
      const observer = new MutationObserver(function() {
        if (geoTab.style.display !== "none") {
          map.invalidateSize();
          warpedMapLayer.addTo(map);
          map.fitBounds(warpedMapLayer.getBounds());
        }
      });

      observer.observe(geoTab, { attributes: true });
    }
  });
}
// app/javascript/blacklight/allmaps/initialize_geoblacklight_map.js

// initialize_blacklight_map.js

function initializeBlacklightMap() {
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("blacklight-allmaps-map") != null) {
      const element = document.getElementById("blacklight-allmaps-map");
      const allmaps_id = element.getAttribute("data-allmaps-id");
      if (!element) return; // Exit if the element doesn't exist
  
      const map = L$1.map("blacklight-allmaps-map", {
        center: [0, 0],
        zoom: 15,
        zoomAnimationThreshold: 1
      });
  
      // Basemap and Attribution
      L$1.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
        maxZoom: 18
      }).addTo(map);
  
      // Fullscreen control
      map.addControl(new L$1.Control.Fullscreen({
        position: "topright"
      }));
  
      // Annotation URL assumes the ID is passed dynamically to this function
      const annotationUrl = `https://annotations.allmaps.org/manifests/${allmaps_id}`;
      const warpedMapLayer = new vo(annotationUrl).addTo(map);
  
      // Layer opacity control
      map.addControl(new LayerOpacityControl(warpedMapLayer));
  
      map.on("warpedmapadded", () => {
        map.fitBounds(warpedMapLayer.getBounds());
      });  
    }
  });
}
// app/javascript/blacklight/allmaps/initialize_blacklight_map.js

// update_georef_links.js
const updateGeorefLinks = async () => {
  const sidebarElement = document.getElementById('allmaps-sidebar');
  if (sidebarElement) {
    const manifestUrl = sidebarElement.getAttribute('data-iiif-manifest');
    const documentId = sidebarElement.getAttribute('data-document-id');
    const georefDiv = document.getElementById('georeferencing');
    const annotationUrlByIIIFUri = `https://annotations.allmaps.org/?url=${manifestUrl}`;

    try {
      const response = await fetch(annotationUrlByIIIFUri);
      if (!response.ok) {
        georefDiv.innerHTML = `<a href="https://editor.allmaps.org/#/collection?url=${manifestUrl}" target="_blank">Georeference this item</a>`;

        const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        fetch(`/allmaps/annotations/${documentId}`, {
          method: "PUT",
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

      } else {
        const annotationUrl = response.url;
        georefDiv.innerHTML = `<a href="https://viewer.allmaps.org/?url=${annotationUrl}" target="_blank">View this georeferenced item</a>`;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
};

initializeGeoBlacklightMap();
initializeBlacklightMap();

document.addEventListener('DOMContentLoaded', () => {
  updateGeorefLinks();
});
//# sourceMappingURL=blacklight-allmaps.esm.js.map
