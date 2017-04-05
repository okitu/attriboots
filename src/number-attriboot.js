import BaseAttriboot from './base-attriboot';

/**
 * @author David Schäfer, me@okitu.de
 */
export default class NumberAttriboot extends BaseAttriboot {

    constructor({

            target: target = 0,
            min: min = Number.NEGATIVE_INFINITY,
            exclusiveMin: exclusiveMin = false,
            max: max = Number.POSITIVE_INFINITY,
            exclusiveMax: exclusiveMax = false

        } = {}

    ) {

        super(...arguments);

        this._target = 0;
        this._lastTarget = 0;
        this._current = 0;
        this._previous = 0;
        this._raw = 0;
        this._stored = 0;

        this.min = min;
        this.exclusiveMin = exclusiveMin;
        this.max = max;
        this.exclusiveMax = exclusiveMax;

        this.apply(target);
    }

    /**
     * Raw target value, without adjustements (eg. min/max-clamping)
     */
    get raw() {
        return this._raw;
    }

    /**
     * Target value
     * @type {number}
     */
    get target() {
        return this._target;
    }

    set target(target) {
        if (typeof(target) != 'number')
            throw new TypeError('"target" must be a number');

        if (this._locked)
            return;

        this._raw = target;

        if (!this._ignoreBounds)
            target = this._clamp(target, this._min, this._max, this._exclusiveMin, this._exclusiveMax);

        if (target == this._target)
            return;

        this._lastTarget = this._target;
        this._target = target;

        // Setup easing values
        this._start = this.current;
        this._step = 0;

        this._triggerChange();

        if (this.steps === 0)
            this.updateImmediate();
    }

    /**
     * The last target value.
     * @type {number}
     */
    get lastTarget() {
        return this._lastTarget;
    }

    /**
     * Current value. Get updates by calling update or updateImmediate
     * @type {number}
     */
    get current() {
        return this._current;
    }

    /**
     * The previous value, before calling update or updateImmediate last time
     * @type {number}
     */
    get previous() {
        return this._previous;
    }

    /**
     * The minimum allowed `target`
     * @type {number}
     */
    get min() {
        return this._min;
    }

    set min(min) {
        if (typeof(min) != 'number')
            throw new TypeError('"min" must be a number');

        // min may not be greater than max
        if (min >= this._max) {
            // respect exclusiveMax
            this._min = (this.exclusiveMax) ? this.max - Number.MIN_VALUE : this.max;
        } else {
            this._min = min;
        }

        this.target = this._raw;
    }

    /**
     * The maximum allowed `target`
     * @type {number}
     */
    get max() {
        return this._max;
    }

    set max(max) {
        if (typeof(max) != 'number')
            throw new TypeError('"max" must be a number');

        // may not be less than min
        if (max <= this._min) {
            // respect exclusiveMin
            this._max = (this.exclusiveMin) ? this.min + Number.MIN_VALUE : this.min;
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
    get exclusiveMin() {
        return this._exclusiveMin;
    }

    set exclusiveMin(exclusiveMin) {
        if (typeof(exclusiveMin) != 'boolean')
            throw new TypeError('"exclusiveMin" must be a boolean');

        this._exclusiveMin = exclusiveMin;
        this.target = this._raw;
    }

    /**
     * If true, max will be an exclusive maximum, meaning `target` and `current`
     * will always be smaller by `Number.MIN_VALUE` and never equal to `max`.
     * @type {boolean}
     */
    get exclusiveMax() {
        return this._exclusiveMax;
    }

    set exclusiveMax(exclusiveMax) {
        if (typeof(exclusiveMax) != 'boolean')
            throw new TypeError('"exclusiveMax" must be a boolean');

        this._exclusiveMax = exclusiveMax;
        this.target = this._raw;
    }

    /**
     * A reference, that can be used to store a value for whatever reason.
     * @type {number}
     */
    get stored() {
        return this._stored;
    }

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
    _clamp(value, min = 0, max = 1, exclusiveMin = false, exclusiveMax = false) {
        if (min === max)
            return min;

        if (value <= min)
            return exclusiveMin ? min + Number.MIN_VALUE : min;

        if (value >= max)
            return exclusiveMax ? max - Number.MIN_VALUE : max;

        return value;
    }

    //
    // Public methods
    // --------------------------------------------------

    /**
     * Updates `current` if not equal to `target`.
     * @param {integer} [delta=1] Amount of steps to ease to target.
     * @return {boolean} Returns true, if `current` has been updated.
     */
    update(delta) {

        if (delta === undefined) {
            delta = 1;
        } else {

            if (typeof(delta) != 'number' || delta < 0)
                throw new TypeError('"delta" must be a number');

            delta = Math.round(Math.abs(delta));
        }

        if (this.dirty) {

            this._previous = this._current;
            this._step = Math.min(this._step + delta, this._steps);
            this._current = this.easing(this._step, this._start, this._target - this._start, this._steps);
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
    updateImmediate() {
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
    stop() {
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
    apply(value) {
        this.target = value;
        this.updateImmediate();
    }

    /**
     * Adds `offset` to `target` and `current`.
     * @param {number} offset
     */
    addOffset(offset) {
        if (typeof(offset) != 'number')
            throw new TypeError('"offset" must be a number');

        if (offset !== 0) {

            this.target += offset;
            this._current += offset;
            this._updated = true;
        }
    }

    /**
     * Stores the given/or the current `target` value
     * @param {number} value
     */
    store(value = NaN) {
        if (typeof(value) != 'number')
            throw new TypeError('"value" must be a number');

        this._stored = !isNaN(value) ? value : this.target;
    }

    /**
     * Set `target` to `stored`.
     * param {boolean} ignoreLock If true, will restore even if `locked` is true.
     */
    restore(ignoreLock = false) {
        if (typeof(ignoreLock) != 'boolean')
            throw new TypeError('"ignoreLock" must be a boolean');

        var lockBefore = this._locked;

        if (ignoreLock)
            this._locked = false;

        this.target = this.stored;
        this._locked = lockBefore;
    }

    // toString() {
    //     var str: String = "NumberAttriboot( ";

    //     if (_id)
    //         str += "id: " + id + ", "

    //     str += "target=" + target + ", ";
    //     str += "value = " + value + ", ";
    //     str += "min = " + min + ", ";
    //     str += "max = " + max + " )";

    //     return str;
    // }
}