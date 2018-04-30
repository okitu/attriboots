import NumberAttriboot from './number-attriboot';

/**
 * @author David Schäfer, me@okitu.de
 */
export default class AngleAttriboot extends NumberAttriboot {

    constructor({

            shortRotation: shortRotation = false,
            wrap: wrap = false

        } = {}

    ) {
        super(...arguments);

        this._shortRotation = shortRotation;
        this._wrap = wrap;
    }

    /**
     * @override
     */
    get current() {
        return this._wrap ? this._wrapTo360(this._current) : this._current;
    }

    /**
     * @override
     */
    get target() {
        return this._wrap ? this._wrapTo360(this._target) : this._target;
    }

    /**
     * @override
     */
    set target(target) {
        if (typeof(target) != 'number' || isNaN(target))
            throw new TypeError('"target" must be a number');

        if (this._locked)
            return;

        this._raw = target;

        if (!this._ignoreBounds)
            target = this._clamp(target);

        if (target == this._target)
            return;

        this._lastTarget = this._target;

        this._start = this.current;
        this._startTime = this._currentTime = Date.now();

        this._target = target;
        this._targetTime = Date.now() + this._animationTime;

        if (this._wrap && this._shortRotation)
            this._applyShortRotation();

        this._triggerChange('target', this._target);

        if (this._animationTime === 0)
            this.updateImmediate();
    }

    /**
     * If true, `target`and `current`will be wrapped between 0° and 360°.
     * For example if 540° will be wrapped to 180° and -120° to 240°.
     * @type {boolean}
     */
    get wrap() {
        return this._wrap;
    }

    set wrap(wrap) {
        if (typeof(wrap) != 'boolean')
            throw new TypeError('"wrap" must be a boolean');

        if (wrap == this._wrap)
            return;

        this._wrap = wrap;
        this._triggerChange('wrap', this._wrap);
    }

    /**
     * If wrap & shortRotation is true, fixes illogical rotation behavior. When the angle is internally at -30° and
     * gets set to 350°, this would cause a rotation around 380° when logically only 20° would be necessary.
     * @type {boolean}
     */
    get shortRotation() {
        return this._shortRotation;
    }

    set shortRotation(shortRotation) {
        if (typeof(shortRotation) != 'boolean')
            throw new TypeError('"shortRotation" must be a boolean');

        if (shortRotation == this._shortRotation)
            return;

        this._shortRotation = shortRotation;
        this._triggerChange('shortRotation', this._shortRotation);
    }

    /**
     * Get the `target` in radians.
     * @return {number}
     */
    getTargetRadians() {
        return this.target * Math.PI / 180;
    }

    /**
     * Get the `current` in radians.
     * @return {number}
     */
    getCurrentRadians() {
        return this.current * Math.PI / 180;
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
    _applyShortRotation() {
        // fix for short rotation
        while (this._start - this._target > 180)
            this._start -= 360;

        while (this._start - this._target < -180)
            this._start += 360;
    }

    /**
     * Wraps the given degree-value to 0-360°.
     * @param {number} angle
     * @return {number}
     * @private
     */
    _wrapTo360(angle) {
        if (angle > 360)
            return angle % 360;

        while (angle < 0) {
            angle += 360;
        }

        return angle;
    }

}