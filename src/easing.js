/**
 * Various easing methods adopted from Robert Penner.
 */
export default class Easing {

    /**
     * @param  {number} t Current time/step
     * @param  {number} b Start value
     * @param  {number} c Change in value
     * @param  {number} d Duration
     * @return {number}
     */
    static linear(t, b, c, d) {
        return c * t / d + b;
    }

    // quadratic easing in - accelerating from zero velocity
    static inQuad(t, b, c, d) {
        t /= d;
        return c * t * t + b;
    }

    // quadratic easing out - decelerating to zero velocity
    static outQuad(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    }

    // quadratic easing in/out - acceleration until halfway, then deceleration
    static inOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // cubic easing in - accelerating from zero velocity
    static inCubic(t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    }

    // cubic easing out - decelerating to zero velocity
    static outCubic(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }

    // cubic easing in/out - acceleration until halfway, then deceleration
    static inOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    // quartic easing in - accelerating from zero velocity
    static inQuart(t, b, c, d) {
        t /= d;
        return c * t * t * t * t + b;
    }

    // quartic easing out - decelerating to zero velocity
    static outQuart(t, b, c, d) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    }

    // quartic easing in/out - acceleration until halfway, then deceleration
    static inOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    // quintic easing in - accelerating from zero velocity
    static inQuint(t, b, c, d) {
        t /= d;
        return c * t * t * t * t * t + b;
    }

    // quintic easing out - decelerating to zero velocity
    static outQuint(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
    }

    // quintic easing in/out - acceleration until halfway, then deceleration
    static inOutQuint(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
    }

    // sinusoidal easing in - accelerating from zero velocity
    static inSine(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }

    // sinusoidal easing out - decelerating to zero velocity
    static outSine(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }

    // sinusoidal easing in/out - accelerating until halfway, then decelerating
    static inOutSine(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }

    // exponential easing in - accelerating from zero velocity
    static inExpo(t, b, c, d) {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
    }

    // exponential easing out - decelerating to zero velocity
    static outExpo(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }

    // exponential easing in/out - accelerating until halfway, then decelerating
    static inOutExpo(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
    }

    // circular easing in - accelerating from zero velocity
    static inCirc(t, b, c, d) {
        t /= d;
        return -c * (Math.sqrt(1 - t * t) - 1) + b;
    }

    // circular easing out - decelerating to zero velocity
    static outCirc(t, b, c, d) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t * t) + b;
    }

    // circular easing in/out - acceleration until halfway, then deceleration
    static inOutCirc(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        t -= 2;
        return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
    }
}