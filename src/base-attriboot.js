import Easing from './easing';

/**
 * Abstract base class for all attriboots.
 * @abstract
 * @author David Schäfer, me@okitu.de
 */
export default class BaseAttriboot {

    constructor({

        id: id = null,
        enabled: enabled = true,
        ignoreBounds: ignoreBounds = false,
        steps: steps = 30,
        easing: easing = Easing.outQuad,
        locked: locked = false

    } = {}) {

        if (this.constructor === BaseAttriboot) {
            throw new TypeError('BaseAttriboot is an abstract class and cannot be instantiated directly.');
        }

        this._id = id;
        this.enabled = enabled;
        this.locked = locked;
        this.ignoreBounds = ignoreBounds;
        this.steps = steps;
        this.easing = easing;

        this._updated = false;
    }

    /**
     * Static accessor to the Easing methods.
     * @type {Easing}
     */
    static get Easing() {
        return Easing;
    }

    /**
     * An optional id-string.
     * @type {string}
     */
    get id() {
        return this._id;
    }

    set id(id) {
        if (typeof(id) != 'string')
            throw new TypeError('"id" must be a number');

        this._id = id;
    }

    /**
     * True, if current does not equal target.
     * @type {boolean}
     */
    get dirty() {
        return this._current != this._target;
    }

    /**
     * Whether this property is enabled. HAS NO DIRECT EFFECT!
     * @type {boolean}
     */
    get enabled() {
        return this._enabled;
    }

    set enabled(enabled) {
        if (typeof(enabled) != 'boolean')
            throw new TypeError('"enabled" must be a boolean');

        this._enabled = enabled;
    }

    /**
     * True to ignore min and max.
     * @type {boolean}
     */
    get ignoreBounds() {
        return this._ignoreBounds;
    }

    set ignoreBounds(ignoreBounds) {
        if (typeof(ignoreBounds) != 'boolean')
            throw new TypeError('"ignoreBounds" must be a boolean');

        this._ignoreBounds = ignoreBounds;
    }

    /**
     * If true, target cannot be changed.
     * @type {boolean}
     */
    get locked() {
        return this._locked;
    }

    set locked(locked) {
        if (typeof(locked) != 'boolean')
            throw new TypeError('"locked" must be a boolean');

        this._locked = locked;
    }

    /**
     * How many update-calls are required to bring `current` to `target`.
     * @type {integer}
     */
    get steps() {
        return this._steps;
    }

    set steps(steps) {
        if (typeof(steps) != 'number')
            throw new TypeError('"steps" must be a number');

        this._steps = Math.round(Math.abs(steps));

        if (this._steps === 0 && this.dirty)
            this.updateImmediate();
    }

    /**
     * Easing method.
     * @type {Function}
     * @see {Easing}
     */
    get easing() {
        return this._easing;
    }

    set easing(easing) {
        if (typeof(easing) != 'function')
            throw new TypeError('"easing" must be a function!');

        this._easing = easing;
    }

    /**
     * True if current or target have been updated during the last update or stop.
     * @type {boolean}
     */
    get updated() {
        return this._updated;
    }

    //
    // Public methods
    // --------------------------------------------------

    /**
     * Updates `current` if not equal to `target`.
     * 
     * Tip: By using milliseconds for `delta` and
     * the `steps`property, timed-based updating is possible.
     * 
     * @param {integer} [delta=1] Amount of steps to ease to target.
     * @return Returns true, if `current` has been updated.
     */
    update() {
        return false;
    }

    /**
     * Set the `current` to `target`.
     *
     * @return Returns true, if `current` has been updated.
     */
    updateImmediate() {
        return false;
    }

    /**
     * Sets `target` to `current`.
     *
     * @return Returns true, if `target` has been updated.
     */
    stop() {
        return false;
    }

    //
    // EventTarget Interface
    // https://developer.mozilla.org/en-US/docs/Web/API/Event
    // --------------------------------------------------

    addEventListener(type, callback) {
        if (!this._listeners) this._listeners = {};
        if (!(type in this._listeners)) {
            this._listeners[type] = [];
        }
        this._listeners[type].push(callback);
    }

    removeEventListener(type, callback) {
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

    dispatchEvent(event) {
        if (this._listeners === undefined)
            return;

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
    _triggerUpdate() {

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
     * @protected
     */
    _triggerChange() {

        /**
         * Change event.
         * Dispatched when `target` changes.
         *
         * @event change
         * @type {object}
         */
        this.dispatchEvent({
            type: 'change',
            value: this._target
        });
    }

}