/**
 * MIT License
 * 
 * Copyright (c) 2017 David Schäfer
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * @license
 */

(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (factory((global.attriboots = global.attriboots || {})));
}(this, (function(exports) {
    'use strict';

    var classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    var createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var inherits = function(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    /**
     * Various easing methods adopted from Robert Penner.
     */
    var Easing = function() {
        function Easing() {
            classCallCheck(this, Easing);
        }

        createClass(Easing, null, [{
            key: "linear",

            /**
             * @param  {number} t Current time/step
             * @param  {number} b Start value
             * @param  {number} c Change in value
             * @param  {number} d Duration
             * @return {number}
             */
            value: function linear(t, b, c, d) {
                return c * t / d + b;
            }

            // quadratic easing in - accelerating from zero velocity

        }, {
            key: "inQuad",
            value: function inQuad(t, b, c, d) {
                t /= d;
                return c * t * t + b;
            }

            // quadratic easing out - decelerating to zero velocity

        }, {
            key: "outQuad",
            value: function outQuad(t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            }

            // quadratic easing in/out - acceleration until halfway, then deceleration

        }, {
            key: "inOutQuad",
            value: function inOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            // cubic easing in - accelerating from zero velocity

        }, {
            key: "inCubic",
            value: function inCubic(t, b, c, d) {
                t /= d;
                return c * t * t * t + b;
            }

            // cubic easing out - decelerating to zero velocity

        }, {
            key: "outCubic",
            value: function outCubic(t, b, c, d) {
                t /= d;
                t--;
                return c * (t * t * t + 1) + b;
            }

            // cubic easing in/out - acceleration until halfway, then deceleration

        }, {
            key: "inOutCubic",
            value: function inOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }

            // quartic easing in - accelerating from zero velocity

        }, {
            key: "inQuart",
            value: function inQuart(t, b, c, d) {
                t /= d;
                return c * t * t * t * t + b;
            }

            // quartic easing out - decelerating to zero velocity

        }, {
            key: "outQuart",
            value: function outQuart(t, b, c, d) {
                t /= d;
                t--;
                return -c * (t * t * t * t - 1) + b;
            }

            // quartic easing in/out - acceleration until halfway, then deceleration

        }, {
            key: "inOutQuart",
            value: function inOutQuart(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t * t + b;
                t -= 2;
                return -c / 2 * (t * t * t * t - 2) + b;
            }

            // quintic easing in - accelerating from zero velocity

        }, {
            key: "inQuint",
            value: function inQuint(t, b, c, d) {
                t /= d;
                return c * t * t * t * t * t + b;
            }

            // quintic easing out - decelerating to zero velocity

        }, {
            key: "outQuint",
            value: function outQuint(t, b, c, d) {
                t /= d;
                t--;
                return c * (t * t * t * t * t + 1) + b;
            }

            // quintic easing in/out - acceleration until halfway, then deceleration

        }, {
            key: "inOutQuint",
            value: function inOutQuint(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t * t * t + 2) + b;
            }

            // sinusoidal easing in - accelerating from zero velocity

        }, {
            key: "inSine",
            value: function inSine(t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            }

            // sinusoidal easing out - decelerating to zero velocity

        }, {
            key: "outSine",
            value: function outSine(t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            }

            // sinusoidal easing in/out - accelerating until halfway, then decelerating

        }, {
            key: "inOutSine",
            value: function inOutSine(t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }

            // exponential easing in - accelerating from zero velocity

        }, {
            key: "inExpo",
            value: function inExpo(t, b, c, d) {
                return c * Math.pow(2, 10 * (t / d - 1)) + b;
            }

            // exponential easing out - decelerating to zero velocity

        }, {
            key: "outExpo",
            value: function outExpo(t, b, c, d) {
                return c * (-Math.pow(2, -10 * t / d) + 1) + b;
            }

            // exponential easing in/out - accelerating until halfway, then decelerating

        }, {
            key: "inOutExpo",
            value: function inOutExpo(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                t--;
                return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
            }

            // circular easing in - accelerating from zero velocity

        }, {
            key: "inCirc",
            value: function inCirc(t, b, c, d) {
                t /= d;
                return -c * (Math.sqrt(1 - t * t) - 1) + b;
            }

            // circular easing out - decelerating to zero velocity

        }, {
            key: "outCirc",
            value: function outCirc(t, b, c, d) {
                t /= d;
                t--;
                return c * Math.sqrt(1 - t * t) + b;
            }

            // circular easing in/out - acceleration until halfway, then deceleration

        }, {
            key: "inOutCirc",
            value: function inOutCirc(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                t -= 2;
                return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
            }
        }]);
        return Easing;
    }();

    /**
     * Abstract base class for all attriboots.
     * @abstract
     * @author David Schäfer, me@okitu.de
     */

    var BaseAttriboot = function() {
        function BaseAttriboot() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref$id = _ref.id,
                id = _ref$id === undefined ? null : _ref$id,
                _ref$enabled = _ref.enabled,
                enabled = _ref$enabled === undefined ? true : _ref$enabled,
                _ref$ignoreBounds = _ref.ignoreBounds,
                ignoreBounds = _ref$ignoreBounds === undefined ? false : _ref$ignoreBounds,
                _ref$steps = _ref.steps,
                steps = _ref$steps === undefined ? 30 : _ref$steps,
                _ref$easing = _ref.easing,
                easing = _ref$easing === undefined ? Easing.outQuad : _ref$easing,
                _ref$locked = _ref.locked,
                locked = _ref$locked === undefined ? false : _ref$locked;

            classCallCheck(this, BaseAttriboot);

            if (this.constructor === BaseAttriboot) {
                throw new TypeError('BaseAttriboot is an abstract class and cannot be instantiated directly.');
            }

            this._id = id;
            this.enabled = enabled;
            this.locked = locked;
            this.ignoreBounds = ignoreBounds;
            this.steps = steps;
            this.easing = easing;

            this._dirty = false;
            this._updated = false;
        }

        /**
         * Static accessor to the Easing methods.
         * @type {Easing}
         */

        createClass(BaseAttriboot, [{
            key: 'update',

            //
            // Public methods
            // --------------------------------------------------

            /**
             * Updates `current` if not equal to `target`.
             *
             * @return Returns true, if `current` has been updated.
             */
            value: function update() {
                return false;
            }

            /**
             * Set the `current` to `target`.
             *
             * @return Returns true, if `current` has been updated.
             */

        }, {
            key: 'updateImmediate',
            value: function updateImmediate() {
                return false;
            }

            /**
             * Sets `target` to `current`.
             *
             * @return Returns true, if `target` has been updated.
             */

        }, {
            key: 'stop',
            value: function stop() {
                return false;
            }
        }, {
            key: 'id',

            /**
             * An optional id-string.
             * @type {string}
             */
            get: function get$$1() {
                return this._id;
            },
            set: function set$$1(id) {
                if (typeof id != 'string') throw new TypeError('"id" must be a number');

                this._id = id;
            }

            /**
             * True, if current does not equal target.
             * @type {boolean}
             */

        }, {
            key: 'dirty',
            get: function get$$1() {
                return this._dirty;
            }

            /**
             * Whether this property is enabled. HAS NO DIRECT EFFECT!
             * @type {boolean}
             */

        }, {
            key: 'enabled',
            get: function get$$1() {
                return this._enabled;
            },
            set: function set$$1(enabled) {
                if (typeof enabled != 'boolean') throw new TypeError('"enabled" must be a boolean');

                this._enabled = enabled;
            }

            /**
             * True to ignore min and max.
             * @type {boolean}
             */

        }, {
            key: 'ignoreBounds',
            get: function get$$1() {
                return this._ignoreBounds;
            },
            set: function set$$1(ignoreBounds) {
                if (typeof ignoreBounds != 'boolean') throw new TypeError('"ignoreBounds" must be a boolean');

                this._ignoreBounds = ignoreBounds;
            }

            /**
             * If true, target cannot be changed.
             * @type {boolean}
             */

        }, {
            key: 'locked',
            get: function get$$1() {
                return this._locked;
            },
            set: function set$$1(locked) {
                if (typeof locked != 'boolean') throw new TypeError('"locked" must be a boolean');

                this._locked = locked;
            }

            /**
             * How many update-calls are required to bring `current` to `target`.
             * @type {integer}
             */

        }, {
            key: 'steps',
            get: function get$$1() {
                return this._steps;
            },
            set: function set$$1(steps) {
                if (typeof steps != 'number') throw new TypeError('"steps" must be a number');

                this._steps = Math.round(steps);
            }

            /**
             * Easing method.
             * @type {Function}
             * @see {Easing}
             */

        }, {
            key: 'easing',
            get: function get$$1() {
                return this._easing;
            },
            set: function set$$1(easing) {
                if (typeof easing != 'function') throw new TypeError('"easing" must be a function!');

                this._easing = easing;
            }

            /**
             * True if current or target have been updated during the last update or stop.
             * @type {boolean}
             */

        }, {
            key: 'updated',
            get: function get$$1() {
                return this._updated;
            }
        }], [{
            key: 'Easing',
            get: function get$$1() {
                return Easing;
            }
        }]);
        return BaseAttriboot;
    }();

    /**
     * @author David Schäfer, me@okitu.de
     */

    var NumberBaseAttriboot = function(_BaseAttriboot) {
        inherits(NumberBaseAttriboot, _BaseAttriboot);

        function NumberBaseAttriboot() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref$target = _ref.target,
                target = _ref$target === undefined ? 0 : _ref$target,
                _ref$min = _ref.min,
                min = _ref$min === undefined ? Number.NEGATIVE_INFINITY : _ref$min,
                _ref$exclusiveMin = _ref.exclusiveMin,
                exclusiveMin = _ref$exclusiveMin === undefined ? false : _ref$exclusiveMin,
                _ref$max = _ref.max,
                max = _ref$max === undefined ? Number.POSITIVE_INFINITY : _ref$max,
                _ref$exclusiveMax = _ref.exclusiveMax,
                exclusiveMax = _ref$exclusiveMax === undefined ? false : _ref$exclusiveMax;

            classCallCheck(this, NumberBaseAttriboot);

            var _this = possibleConstructorReturn(this, (NumberBaseAttriboot.__proto__ || Object.getPrototypeOf(NumberBaseAttriboot)).apply(this, arguments));

            _this._target = 0;
            _this._lastTarget = 0;
            _this._change = 0;
            _this._current = 0;
            _this._previous = 0;
            _this._raw = 0;
            _this._stored = 0;

            _this.min = min;
            _this.exclusiveMin = exclusiveMin;
            _this.max = max;
            _this.exclusiveMax = exclusiveMax;

            _this.apply(target);
            return _this;
        }

        /**
         * Raw target value, without adjustements (eg. min/max-clamping)
         */

        createClass(NumberBaseAttriboot, [{
            key: '_clamp',

            //
            // Private methods
            // --------------------------------------------------

            /**
             * Ensures that `value` is between `min` and `max`.
             * @param {number} value
             * @param {number} min
             * @param {number} max
             * @param {boolean} exclusiveMin If true will return a Number the is `Number.MIN_VALUE` larger than `min`.
             * @param {boolean} exclusiveMax If true will return a Number the is `Number.MIN_VALUE` smaller than `max`.
             * @return {number} The clamped value
             * @protected
             */
            value: function _clamp(value) {
                var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
                var exclusiveMin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
                var exclusiveMax = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

                if (min === max) return min;

                if (value <= min) return exclusiveMin ? min + Number.MIN_VALUE : min;

                if (value >= max) return exclusiveMax ? max - Number.MIN_VALUE : max;

                return value;
            }

            //
            // Public methods
            // --------------------------------------------------

            /**
             * Updates `current` if not equal to `target`.
             * @return {boolean} Returns true, if `current` has been updated.
             */

        }, {
            key: 'update',
            value: function update() {
                if (this._current != this._target) {

                    this._previous = this._current;
                    this._current = this.easing(++this._step, this._start, this._change, this._steps);
                    this._updated = true;
                } else {
                    this._updated = false;
                }

                this._dirty = this._current != this._target;

                return this._updated;
            }

            /**
             * Set `current` to `target` if not equal.
             * @return {boolean} Returns true, if `current` has been updated.
             */

        }, {
            key: 'updateImmediate',
            value: function updateImmediate() {
                if (this._current != this._target) {
                    this._previous = this._current;
                    this._current = this._target;
                    this._updated = true;
                } else {
                    this._updated = false;
                }

                this._dirty = false;

                return this._updated;
            }

            /**
             * Sets `target` to `current` if not equal.
             * @return {boolean} Returns true, if `target` has been updated.
             */

        }, {
            key: 'stop',
            value: function stop() {
                if (this._current != this._target) {
                    this._lastTarget = this._target;
                    this._target = this._current;
                    this._updated = true;
                } else {
                    this._updated = false;
                }

                this._dirty = false;

                return this._updated;
            }

            /**
             * Set `target`and update immediately
             * @param {number] value
             */

        }, {
            key: 'apply',
            value: function apply(value) {
                this.target = value;
                this.updateImmediate();
            }

            /**
             * Adds `offset` to `target` and `current`.
             * @param {number} offset
             */

        }, {
            key: 'addOffset',
            value: function addOffset(offset) {
                if (typeof offset != 'number') throw new TypeError('"offset" must be a number');

                this.target += offset;
                this._current += offset;
                this._updated = true;
            }

            /**
             * Stores the given/or the current `target` value
             * @param {number} value
             */

        }, {
            key: 'store',
            value: function store() {
                var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;

                if (typeof value != 'number') throw new TypeError('"value" must be a number');

                this._stored = !isNaN(value) ? value : this.target;
            }

            /**
             * Set `target` to `stored`.
             * param {boolean} ignoreLock If true, will restore even if the BaseAttriboot is locked.
             */

        }, {
            key: 'restore',
            value: function restore() {
                var ignoreLock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (typeof ignoreLock != 'boolean') throw new TypeError('"ignoreLock" must be a boolean');

                var lockBefore = this._locked;

                if (ignoreLock) this._locked = false;

                this.target = this.stored;
                this._locked = lockBefore;
            }

            // toString() {
            //     var str: String = "NumberBaseAttriboot( ";

            //     if (_id)
            //         str += "id: " + id + ", "

            //     str += "target=" + target + ", ";
            //     str += "value = " + value + ", ";
            //     str += "min = " + min + ", ";
            //     str += "max = " + max + " )";

            //     return str;
            // }

        }, {
            key: 'raw',
            get: function get$$1() {
                return this._raw;
            }

            /**
             * Target value
             * @type {number}
             */

        }, {
            key: 'target',
            get: function get$$1() {
                return this._target;
            },
            set: function set$$1(target) {
                if (typeof target != 'number') throw new TypeError('"target" must be a number');

                if (this._locked) return;

                this._raw = target;

                if (!this._ignoreBounds) target = this._clamp(target, this._min, this._max, this._exclusiveMin, this._exclusiveMax);

                if (target == this._target) return;

                this._lastTarget = this._target;
                this._target = target;

                // Setup easing values
                this._start = this.current;
                this._change = this._target - this.current;
                this._step = 0;

                this._dirty = true;

                if (this.steps === 0) this.updateImmediate();
            }

            /**
             * The last target value.
             * @type {number}
             */

        }, {
            key: 'lastTarget',
            get: function get$$1() {
                return this._lastTarget;
            }

            /**
             * Current value. Get updates by calling update or updateImmediate
             * @type {number}
             */

        }, {
            key: 'current',
            get: function get$$1() {
                return this._current;
            }

            /**
             * The previous value, before calling update or updateImmediate last time
             * @type {number}
             */

        }, {
            key: 'previous',
            get: function get$$1() {
                return this._previous;
            }

            /**
             * The minimum allowed `target`
             * @type {number}
             */

        }, {
            key: 'min',
            get: function get$$1() {
                return this._min;
            },
            set: function set$$1(min) {
                if (typeof min != 'number') throw new TypeError('"min" must be a number');

                // min may not be greater than max
                if (min >= this._max) {
                    // respect exclusiveMax
                    this._min = this.exclusiveMax ? this.max - Number.MIN_VALUE : this.max;
                } else {
                    this._min = min;
                }

                this.target = this._raw;
            }

            /**
             * The maximum allowed `target`
             * @type {number}
             */

        }, {
            key: 'max',
            get: function get$$1() {
                return this._max;
            },
            set: function set$$1(max) {
                if (typeof max != 'number') throw new TypeError('"max" must be a number');

                // may not be less than min
                if (max <= this._min) {
                    // respect exclusiveMin
                    this._max = this.exclusiveMin ? this.min + Number.MIN_VALUE : this.min;
                } else {
                    this._max = max;
                }

                this.target = this._raw;
            }

            /**
             * If true, `min` will be an exclusive minimum, meaning `target` and `currebnt`
             * will always be larger by `Number.MIN_VALUE` and never equal to max.
             * @type {boolean}
             */

        }, {
            key: 'exclusiveMin',
            get: function get$$1() {
                return this._exclusiveMin;
            },
            set: function set$$1(exclusiveMin) {
                if (typeof exclusiveMin != 'boolean') throw new TypeError('"exclusiveMin" must be a boolean');

                this._exclusiveMin = exclusiveMin;
                this.target = this._raw;
            }

            /**
             * If true, max will be an exclusive maximum, meaning `target` and `current`
             * will always be smaller by `Number.MIN_VALUE` and never equal to `max`.
             * @type {boolean}
             */

        }, {
            key: 'exclusiveMax',
            get: function get$$1() {
                return this._exclusiveMax;
            },
            set: function set$$1(exclusiveMax) {
                if (typeof exclusiveMax != 'boolean') throw new TypeError('"exclusiveMax" must be a boolean');

                this._exclusiveMax = exclusiveMax;
                this.target = this._raw;
            }

            /**
             * A reference, that can be used to store a value for whatever reason.
             * @type {number}
             */

        }, {
            key: 'stored',
            get: function get$$1() {
                return this._stored;
            }
        }]);
        return NumberBaseAttriboot;
    }(BaseAttriboot);

    exports.Easing = Easing;
    exports.NumberAttriboot = NumberBaseAttriboot;

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

})));