/**
 * attriboots@0.0.10
 * https://github.com/okitu/attriboots
 *
 * @license
 *
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
     * @author David Schäfer, me@okitu.de
     * 
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
                _ref$animationTime = _ref.animationTime,
                animationTime = _ref$animationTime === undefined ? 300 : _ref$animationTime,
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
            this.animationTime = animationTime;
            this.easing = easing;

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
             * @param {integer} [delta] Time since last call. If not set, will be calculated.
             * @return Returns true, if `current` has been updated.
             */
            value: function update() {
                return false;
            }

            /**
             * Set the `current` to `target`.
             * @return Returns true, if `current` has been updated.
             */

        }, {
            key: 'updateImmediate',
            value: function updateImmediate() {
                return false;
            }

            /**
             * Sets `target` to `current`.
             * @return Returns true, if `target` has been updated.
             */

        }, {
            key: 'stop',
            value: function stop() {
                return false;
            }

            //
            // EventTarget Interface
            // https://developer.mozilla.org/en-US/docs/Web/API/Event
            // --------------------------------------------------

        }, {
            key: 'addEventListener',
            value: function addEventListener(type, callback) {
                if (!this._listeners) this._listeners = {};
                if (!(type in this._listeners)) {
                    this._listeners[type] = [];
                }
                this._listeners[type].push(callback);
            }
        }, {
            key: 'removeEventListener',
            value: function removeEventListener(type, callback) {
                if (!(type in this._listeners)) {
                    return;
                }
                var stack = this._listeners[type];
                for (var i = 0, l = stack.length; i < l; i++) {
                    if (stack[i] === callback) {
                        stack.splice(i, 1);
                        return;
                    }
                }
            }
        }, {
            key: 'dispatchEvent',
            value: function dispatchEvent(event) {
                if (this._listeners === undefined) return;

                if (!(event.type in this._listeners)) {
                    return true;
                }
                var stack = this._listeners[event.type];
                event.target = this;
                for (var i = 0, l = stack.length; i < l; i++) {
                    stack[i].call(this, event);
                }
                return !event.defaultPrevented;
            }

            //
            // Event shorthands
            // --------------------------------------------------

            /**
             * Dispatch an 'update' event.
             * @protected
             */

        }, {
            key: '_triggerUpdate',
            value: function _triggerUpdate() {

                /**
                 * Update event.
                 * Dispatched when `current` is updated.
                 *
                 * @event update
                 * @type {object}
                 */
                this.dispatchEvent({
                    type: 'update',
                    value: this._current
                });
            }

            /**
             * Dispatch a 'change' event.
             * @param  {string} property  The name of the property that changed
             * @param  {object} value The new value of the changed property
             * @protected
             */

        }, {
            key: '_triggerChange',
            value: function _triggerChange(property, value) {

                /**
                 * Change event.
                 * Dispatched when any property changes.
                 *
                 * @event change
                 * @type {object}
                 */
                this.dispatchEvent({
                    type: 'change',
                    property: property,
                    value: value
                });

                /**
                 * Property change event.
                 * Dispatched when a property changes.
                 *
                 * @event change:*
                 * @type {object}
                 */
                this.dispatchEvent({
                    type: 'change:' + property,
                    value: value
                });
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
                if (typeof id != 'string') throw new TypeError('"id" must be a string');

                if (id == this._id) return;

                this._id = id;
                this._triggerChange('id', this._id);
            }

            /**
             * True, if current does not equal target.
             * @type {boolean}
             */

        }, {
            key: 'dirty',
            get: function get$$1() {
                return this._current != this._target;
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

                if (enabled == this._enabled) {
                    return;
                }

                this._enabled = enabled;
                this._triggerChange('enabled', this._enabled);
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

                if (ignoreBounds == this._ignoreBounds) return;

                this._ignoreBounds = ignoreBounds;
                this._triggerChange('ignoreBounds', this._ignoreBounds);
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

                if (locked == this._locked) return;

                this._locked = locked;
                this._triggerChange('locked', this._locked);
            }

            /**
             * Time to animate from `current` to `target`, when changing `target`.
             * Will not affect an active animation.
             * @type {number}
             */

        }, {
            key: 'animationTime',
            get: function get$$1() {
                return this._animationTime;
            },
            set: function set$$1(animationTime) {
                if (typeof animationTime != 'number' || isNaN(animationTime)) throw new TypeError('"animationTime" must be a number');

                if (animationTime == this._animationTime) return;

                this._animationTime = Math.abs(animationTime);
                this._triggerChange('animationTime', this._animationTime);

                if (this._animationTime === 0 && this.dirty) this.updateImmediate();
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

                if (easing == this._easing) return;

                this._easing = easing;
                this._triggerChange('easing', this._easing);
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

    var NumberAttriboot = function(_BaseAttriboot) {
        inherits(NumberAttriboot, _BaseAttriboot);

        function NumberAttriboot() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref$value = _ref.value,
                value = _ref$value === undefined ? 0 : _ref$value,
                _ref$min = _ref.min,
                min = _ref$min === undefined ? Number.NEGATIVE_INFINITY : _ref$min,
                _ref$max = _ref.max,
                max = _ref$max === undefined ? Number.POSITIVE_INFINITY : _ref$max,
                _ref$exclusiveMin = _ref.exclusiveMin,
                exclusiveMin = _ref$exclusiveMin === undefined ? false : _ref$exclusiveMin,
                _ref$exclusiveMax = _ref.exclusiveMax,
                exclusiveMax = _ref$exclusiveMax === undefined ? false : _ref$exclusiveMax,
                _ref$exclusivePrecisi = _ref.exclusivePrecision,
                exclusivePrecision = _ref$exclusivePrecisi === undefined ? Math.pow(10, -16) : _ref$exclusivePrecisi;

            classCallCheck(this, NumberAttriboot);

            var _this = possibleConstructorReturn(this, (NumberAttriboot.__proto__ || Object.getPrototypeOf(NumberAttriboot)).apply(this, arguments));

            _this._target = value;
            _this._lastTarget = value;
            _this._current = value;
            _this._previous = value;
            _this._raw = value;
            _this._stored = 0;

            _this.min = min;
            _this.max = max;
            _this.exclusiveMin = exclusiveMin;
            _this.exclusiveMax = exclusiveMax;
            _this.exclusivePrecision = exclusivePrecision;
            return _this;
        }

        /**
         * Raw target value, without adjustements (eg. min/max-clamping)
         */

        createClass(NumberAttriboot, [{
            key: '_clamp',

            //
            // Private methods
            // --------------------------------------------------

            /**
             * Ensures that `value` is between `min` and `max`.
             * If `exclusiveMin` true will return a Number that is `exclusivePrecision` larger than `min`.
             * If `exclusiveMax` true will return a Number that is `exclusivePrecision` smaller than `max`.
             * @return {number} The clamped value
             * @protected
             */
            value: function _clamp(value) {
                if (this.min === this.max) return this.min;

                if (value <= this.min) return this.exclusiveMin ? this.min + this.exclusivePrecision : this.min;

                if (value >= this.max) return this.exclusiveMax ? this.max - this.exclusivePrecision : this.max;

                return value;
            }

            //
            // Public methods
            // --------------------------------------------------

            /**
             * Updates `current` if not equal to `target`.
             * @param {integer} [delta] Time since last call. If not set, will be calculated.
             * @return {boolean} Returns true, if `current` has been updated.
             */

        }, {
            key: 'update',
            value: function update(delta) {

                if (delta === undefined) {
                    delta = Date.now() - this._startTime;
                } else {

                    if (typeof delta != 'number' || delta < 0 || isNaN(delta)) throw new TypeError('"delta" must be a positive number');

                    delta = Math.round(Math.abs(delta));
                }

                if (this.dirty) {

                    this._previous = this._current;
                    this._currentTime += delta;

                    var step = Math.min((this._currentTime - this._startTime) / (this._targetTime - this._startTime), 1);

                    this._current = this.easing(step, this._start, this._target - this._start, 1);
                    this._updated = true;
                } else {
                    this._updated = false;
                }

                this._updated && this._triggerUpdate();

                return this._updated;
            }

            /**
             * Set `current` to `target` if not equal.
             * @return {boolean} Returns true, if `current` has been updated.
             */

        }, {
            key: 'updateImmediate',
            value: function updateImmediate() {
                if (this.dirty) {

                    this._previous = this._current;
                    this._current = this._target;
                    this._updated = true;
                } else {
                    this._updated = false;
                }

                this._updated && this._triggerUpdate();

                return this._updated;
            }

            /**
             * Sets `target` to `current` if not equal.
             * @return {boolean} Returns true, if `target` has been updated.
             */

        }, {
            key: 'stop',
            value: function stop() {
                var targetChanged;

                if (this.dirty) {

                    this._lastTarget = this._target;
                    this._target = this._current;
                    targetChanged = true;
                } else {
                    targetChanged = false;
                }

                targetChanged && this._triggerChange();

                return targetChanged;
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
                if (typeof offset != 'number' || isNaN(offset)) throw new TypeError('"offset" must be a number');

                if (!this.locked && offset !== 0) {

                    this.target += offset;

                    // Target may have been clamped
                    var actualOffset = this._target - this._lastTarget;

                    if (actualOffset !== 0) {
                        this._start += actualOffset;
                        this._current += actualOffset;
                        this._updated = true;
                        this._triggerUpdate();
                    }
                }
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
             * param {boolean} ignoreLock If true, will restore even if `locked` is true.
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
                if (typeof target != 'number' || isNaN(target)) throw new TypeError('"target" must be a number');

                if (this._locked) return;

                this._raw = target;

                if (!this._ignoreBounds) target = this._clamp(target);

                if (target == this._target) return;

                this._lastTarget = this._target;

                this._start = this.current;
                this._startTime = this._currentTime = Date.now();

                this._target = target;
                this._targetTime = Date.now() + this._animationTime;

                this._triggerChange('target', this._target);

                if (this._animationTime === 0) this.updateImmediate();
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
             * The minimum allowed `target`.
             * IF set to `null`or `undefined` will be set to negative infinity.
             * @type {number}
             */

        }, {
            key: 'min',
            get: function get$$1() {
                return this._min;
            },
            set: function set$$1(min) {
                if (min === null || min === undefined) min = Number.NEGATIVE_INFINITY;

                if (typeof min != 'number' || isNaN(min)) throw new TypeError('"min" must be a number');

                // min may not be greater than max
                if (min >= this._max) {
                    // respect exclusiveMax
                    min = this.exclusiveMax ? this.max - this.exclusivePrecision : this.max;
                }

                if (min == this._min) return;

                this._min = min;
                this._triggerChange('min', this._min);

                this.target = this._raw;
            }

            /**
             * The maximum allowed `target`.
             * IF set to `null`or `undefined` will be set to positive infinity.
             * @type {number}
             */

        }, {
            key: 'max',
            get: function get$$1() {
                return this._max;
            },
            set: function set$$1(max) {
                if (max === null || max === undefined) max = Number.POSITIVE_INFINITY;

                if (typeof max != 'number' || isNaN(max)) throw new TypeError('"max" must be a number');

                // may not be less than min
                if (max <= this._min) {
                    // respect exclusiveMin
                    max = this.exclusiveMin ? this.min + this.exclusivePrecision : this.min;
                }

                if (max == this._max) return;

                this._max = max;
                this._triggerChange('max', this._max);

                this.target = this._raw;
            }

            /**
             * If true, `min` will be an exclusive minimum, meaning `target` and `currebnt`
             * will always be larger by `exclusivePrecision` and never equal to max.
             * @type {boolean}
             */

        }, {
            key: 'exclusiveMin',
            get: function get$$1() {
                return this._exclusiveMin;
            },
            set: function set$$1(exclusiveMin) {
                if (typeof exclusiveMin != 'boolean') throw new TypeError('"exclusiveMin" must be a boolean');

                if (exclusiveMin == this._exclusiveMin) return;

                this._exclusiveMin = exclusiveMin;
                this._triggerChange('exclusiveMin', this._exclusiveMin);
                this.target = this._raw;
            }

            /**
             * If true, max will be an exclusive maximum, meaning `target` and `current`
             * will always be smaller by `exclusivePrecision` and never equal to `max`.
             * @type {boolean}
             */

        }, {
            key: 'exclusiveMax',
            get: function get$$1() {
                return this._exclusiveMax;
            },
            set: function set$$1(exclusiveMax) {
                if (typeof exclusiveMax != 'boolean') throw new TypeError('"exclusiveMax" must be a boolean');

                if (exclusiveMax == this._exclusiveMax) return;

                this._exclusiveMax = exclusiveMax;
                this._triggerChange('exclusiveMax', this._exclusiveMax);
                this.target = this._raw;
            }

            /**
             * If `exclusiveMin` or `exclusiveMax` is true, and a value has to be clamped,
             * the result will always be `exclusivePrecision` larger than `min` and
             * `exclusivePrecision` smaller than `max`.
             * Defaults to 10^-16.
             * @type {number}
             */

        }, {
            key: 'exclusivePrecision',
            get: function get$$1() {
                return this._exclusivePrecision;
            },
            set: function set$$1(exclusivePrecision) {
                if (typeof exclusivePrecision != 'number' || isNaN(exclusivePrecision)) throw new TypeError('"exclusivePrecision" must be a number');

                if (exclusivePrecision == this._exclusivePrecision) return;

                this._exclusivePrecision = exclusivePrecision;
                this._triggerChange('exclusivePrecision', this._exclusivePrecision);
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
        return NumberAttriboot;
    }(BaseAttriboot);

    /**
     * @author David Schäfer, me@okitu.de
     */

    var AngleAttriboot = function(_NumberAttriboot) {
        inherits(AngleAttriboot, _NumberAttriboot);

        function AngleAttriboot() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref$shortRotation = _ref.shortRotation,
                shortRotation = _ref$shortRotation === undefined ? false : _ref$shortRotation,
                _ref$wrap = _ref.wrap,
                wrap = _ref$wrap === undefined ? false : _ref$wrap;

            classCallCheck(this, AngleAttriboot);

            var _this = possibleConstructorReturn(this, (AngleAttriboot.__proto__ || Object.getPrototypeOf(AngleAttriboot)).apply(this, arguments));

            _this._shortRotation = shortRotation;
            _this._wrap = wrap;
            return _this;
        }

        /**
         * @override
         */

        createClass(AngleAttriboot, [{
            key: 'getTargetRadians',

            /**
             * Get the `target` in radians.
             * @return {number}
             */
            value: function getTargetRadians() {
                return this.target * Math.PI / 180;
            }

            /**
             * Get the `current` in radians.
             * @return {number}
             */

        }, {
            key: 'getCurrentRadians',
            value: function getCurrentRadians() {
                return this.current * Math.PI / 180;
            }

            //
            // Public methods
            // --------------------------------------------------

            /**
             * Adds `offset` to `target` and `current`.
             * @param {number} offset
             * @override
             */

        }, {
            key: 'addOffset',
            value: function addOffset(offset) {
                if (typeof offset != 'number' || isNaN(offset)) throw new TypeError('"offset" must be a number');

                if (!this.locked && offset !== 0) {

                    this.target += offset;

                    // Target may have been clamped
                    var actualOffset = this._target - this._lastTarget;

                    if (actualOffset !== 0) {
                        this._start += actualOffset;
                        if (this._wrap && this._shortRotation) this._applyShortRotation();

                        this._current += actualOffset;
                        if (this._wrap) this._current = this._wrapTo360Degrees(this._current);

                        this._updated = true;
                        this._triggerUpdate();
                    }
                }
            }

            //
            // Private methods
            // --------------------------------------------------

            /**
             * Fixes illogical rotation behavior. When the angle is internally at -30° and
             * gets set to 350°, this would cause a rotation around 380° when logically
             * only 20° would be necessary.
             * @private
             */

        }, {
            key: '_applyShortRotation',
            value: function _applyShortRotation() {
                // fix for short rotation
                while (this._start - this._target > 180) {
                    this._start -= 360;
                }
                while (this._start - this._target < -180) {
                    this._start += 360;
                }
            }

            /**
             * Wraps the given degree-value to 0-360°.
             * @param {number} angle
             * @return {number}
             * @private
             */

        }, {
            key: '_wrapTo360Degrees',
            value: function _wrapTo360Degrees(angle) {
                if (angle > 360) return angle % 360;

                while (angle < 0) {
                    angle += 360;
                }

                return angle;
            }
        }, {
            key: 'current',
            get: function get$$1() {
                return this._wrap ? this._wrapTo360Degrees(this._current) : this._current;
            }

            /**
             * @override
             */

        }, {
            key: 'target',
            get: function get$$1() {
                    return this._wrap ? this._wrapTo360Degrees(this._target) : this._target;
                }

                /**
                 * @override
                 */
                ,
            set: function set$$1(target) {
                if (typeof target != 'number' || isNaN(target)) throw new TypeError('"target" must be a number');

                if (this._locked) return;

                this._raw = target;

                if (!this._ignoreBounds) target = this._clamp(target);

                if (target == this._target) return;

                this._lastTarget = this._target;

                this._start = this.current;
                this._startTime = this._currentTime = Date.now();

                this._target = target;
                this._targetTime = Date.now() + this._animationTime;

                if (this._wrap && this._shortRotation) this._applyShortRotation();

                this._triggerChange('target', this._target);

                if (this._animationTime === 0) this.updateImmediate();
            }

            /**
             * If true, `target`and `current`will be wrapped between 0° and 360°.
             * For example if 540° will be wrapped to 180° and -120° to 240°.
             * @type {boolean}
             */

        }, {
            key: 'wrap',
            get: function get$$1() {
                return this._wrap;
            },
            set: function set$$1(wrap) {
                if (typeof wrap != 'boolean') throw new TypeError('"wrap" must be a boolean');

                if (wrap == this._wrap) return;

                this._wrap = wrap;
                this._triggerChange('wrap', this._wrap);
            }

            /**
             * If wrap & shortRotation is true, fixes illogical rotation behavior. When the angle is internally at -30° and
             * gets set to 350°, this would cause a rotation around 380° when logically only 20° would be necessary.
             * @type {boolean}
             */

        }, {
            key: 'shortRotation',
            get: function get$$1() {
                return this._shortRotation;
            },
            set: function set$$1(shortRotation) {
                if (typeof shortRotation != 'boolean') throw new TypeError('"shortRotation" must be a boolean');

                if (shortRotation == this._shortRotation) return;

                this._shortRotation = shortRotation;
                this._triggerChange('shortRotation', this._shortRotation);
            }
        }]);
        return AngleAttriboot;
    }(NumberAttriboot);

    exports.Easing = Easing;
    exports.NumberAttriboot = NumberAttriboot;
    exports.AngleAttriboot = AngleAttriboot;

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

})));