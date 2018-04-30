import BaseAttriboot from './base-attriboot';

/**
 * @author David Schäfer, me@okitu.de
 */
export default class NumberAttriboot extends BaseAttriboot {

    constructor({

            target: target = 0,
            min: min = Number.NEGATIVE_INFINITY,
            max: max = Number.POSITIVE_INFINITY,
            exclusiveMin: exclusiveMin = false,
            exclusiveMax: exclusiveMax = false,
            exclusivePrecision: exclusivePrecision = Math.pow(10, -16)

        } = {}

    ) {

        super(...arguments);

        this._target = null;
        this._lastTarget = 0;
        this._current = 0;
        this._previous = 0;
        this._raw = 0;
        this._stored = 0;

        this.min = min;
        this.max = max;
        this.exclusiveMin = exclusiveMin;
        this.exclusiveMax = exclusiveMax;
        this.exclusivePrecision = exclusivePrecision;

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
            target = this._clamp(target, this._min, this._max, this._exclusiveMin, this._exclusiveMax, this._exclusivePrecision);

        if (target == this._target)
            return;

        this._lastTarget = this._target;

        this._start = this.current;
        this._startTime = this._currentTime = Date.now();

        this._target = target;
        this._targetTime = Date.now() + this._animationTime;

        this._triggerChange('target', this._target);

        if (this._animationTime === 0)
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
     * The minimum allowed `target`.
     * IF set to `null`or `undefined` will be set to negative infinity.
     * @type {number}
     */
    get min() {
        return this._min;
    }

    set min(min) {
        if (min === null || min === undefined)
            min = Number.NEGATIVE_INFINITY;

        if (typeof(min) != 'number')
            throw new TypeError('"min" must be a number');

        // min may not be greater than max
        if (min >= this._max) {
            // respect exclusiveMax
            min = (this.exclusiveMax) ? this.max - this.exclusivePrecision : this.max;
        }

        if (min == this._min)
            return;

        this._min = min;
        this._triggerChange('min', this._min);

        this.target = this._raw;
    }

    /**
     * The maximum allowed `target`.
     * IF set to `null`or `undefined` will be set to positive infinity.
     * @type {number}
     */
    get max() {
        return this._max;
    }

    set max(max) {
        if (max === null || max === undefined)
            max = Number.POSITIVE_INFINITY;

        if (typeof(max) != 'number')
            throw new TypeError('"max" must be a number');

        // may not be less than min
        if (max <= this._min) {
            // respect exclusiveMin
            max = (this.exclusiveMin) ? this.min + this.exclusivePrecision : this.min;
        }

        if (max == this._max)
            return;

        this._max = max;
        this._triggerChange('max', this._max);

        this.target = this._raw;
    }

    /**
     * If true, `min` will be an exclusive minimum, meaning `target` and `currebnt`
     * will always be larger by `exclusivePrecision` and never equal to max.
     * @type {boolean}
     */
    get exclusiveMin() {
        return this._exclusiveMin;
    }

    set exclusiveMin(exclusiveMin) {
        if (typeof(exclusiveMin) != 'boolean')
            throw new TypeError('"exclusiveMin" must be a boolean');

        if (exclusiveMin == this._exclusiveMin)
            return;

        this._exclusiveMin = exclusiveMin;
        this._triggerChange('exclusiveMin', this._exclusiveMin);
        this.target = this._raw;
    }

    /**
     * If true, max will be an exclusive maximum, meaning `target` and `current`
     * will always be smaller by `exclusivePrecision` and never equal to `max`.
     * @type {boolean}
     */
    get exclusiveMax() {
        return this._exclusiveMax;
    }

    set exclusiveMax(exclusiveMax) {
        if (typeof(exclusiveMax) != 'boolean')
            throw new TypeError('"exclusiveMax" must be a boolean');

        if (exclusiveMax == this._exclusiveMax)
            return;

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
    get exclusivePrecision() {
        return this._exclusivePrecision;
    }

    set exclusivePrecision(exclusivePrecision) {
        if (typeof(exclusivePrecision) != 'number')
            throw new TypeError('"exclusivePrecision" must be a number');

        if (exclusivePrecision == this._exclusivePrecision)
            return;

        this._exclusivePrecision = exclusivePrecision;
        this._triggerChange('exclusivePrecision', this._exclusivePrecision);
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
     * @param {boolean} exclusiveMin If true will return a Number that is `exclusivePrecision` larger than `min`.
     * @param {boolean} exclusiveMax If true will return a Number that is `exclusivePrecision` smaller than `max`.
     * @param {number} exclusivePrecision
     * @return {number} The clamped value
     * @protected
     */
    _clamp(value, min = 0, max = 1, exclusiveMin = false, exclusiveMax = false, exclusivePrecision) {
        if (min === max)
            return min;

        if (value <= min)
            return exclusiveMin ? min + exclusivePrecision : min;

        if (value >= max)
            return exclusiveMax ? max - exclusivePrecision : max;

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
    update(delta) {

        if (delta === undefined) {
            delta = Date.now() - this._startTime;
        } else {

            if (typeof(delta) != 'number' || delta < 0)
                throw new TypeError('"delta" must be a positive number');

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

}