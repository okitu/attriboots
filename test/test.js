/* eslint-env node, mocha */

// Import chai and use 'expect'
let chai = require('chai');
let expect = chai.expect;

// Import the classes.
import BaseAttriboot from '../src/base-attriboot';
import NumberAttriboot from '../src/number-attriboot';

// Extend Attriboot to make it instantiable
class TestAttriboot extends BaseAttriboot {
    constructor() {
        super(...arguments);
    }
}

describe('attriboots', () => {

    let attriboot;

    // Helper for easy set-tests
    let _simpleSetterTests = (field, value, badValue) => {
        it('can be changed', () => {
            attriboot[field] = value;
            expect(attriboot[field]).to.equal(value);
        });

        it('only accepts correct values', () => {
            expect(() => {
                attriboot[field] = badValue;
            }).to.throw(Error);
        });
    };

    describe('BaseAttriboot', () => {

        beforeEach(() => {
            attriboot = new TestAttriboot({
                id: 'test-attriboot',
                enabled: false,
                locked: true,
                ignoreBounds: true,
                steps: 7
            });
        });

        it('should throw an error when instantiated directly', () => {
            expect(() => {
                new BaseAttriboot();
            }).to.throw('BaseAttriboot is an abstract class and cannot be instantiated directly.');
        });

        it('should have correct default values and working getters', () => {
            let testAttriboot = new TestAttriboot();
            expect(testAttriboot.id).to.be.null;
            expect(testAttriboot.enabled).to.equal(true);
            expect(testAttriboot.locked).to.equal(false);
            expect(testAttriboot.ignoreBounds).to.equal(false);
            expect(testAttriboot.steps).to.equal(30);
            expect(testAttriboot.dirty).to.equal(false);
            expect(testAttriboot.updated).to.equal(false);
        });

        describe('.id', () => {
            _simpleSetterTests('id', 'new-id', 0);
        });

        describe('.enabled', () => {
            _simpleSetterTests('enabled', true, 'not-bool');
        });

        describe('.locked', () => {
            _simpleSetterTests('locked', true, 'not-bool');
        });

        describe('.ignoreBounds', () => {
            _simpleSetterTests('ignoreBounds', true, 'not-bool');
        });

        describe('.steps', () => {
            _simpleSetterTests('steps', 123, 'not-number');
        });

        describe('.easing', () => {
            expect(TestAttriboot.Easing).to.exist;
            _simpleSetterTests('easing', TestAttriboot.Easing.inOutQuad, 'not-function');
        });

        describe('#update', () => {

            it('should return false', () => {
                expect(attriboot.update()).to.equal(false);
            });
        });

        describe('#updateImmediate', () => {

            it('should return false', () => {
                expect(attriboot.updateImmediate()).to.equal(false);
            });
        });

        describe('#stop', () => {

            it('should return false', () => {
                expect(attriboot.stop()).to.equal(false);
            });
        });

    });

    describe('NumberAttriboot', () => {

        beforeEach(() => {
            attriboot = new NumberAttriboot();
        });

        it('should have correct default values and working getters', () => {
            let defaultAttriboot = new NumberAttriboot();

            expect(defaultAttriboot.target).to.equal(0);
            expect(defaultAttriboot.lastTarget).to.equal(0);
            expect(defaultAttriboot.current).to.equal(0);
            expect(defaultAttriboot.previous).to.equal(0);
            expect(defaultAttriboot.raw).to.equal(0);
            expect(defaultAttriboot.stored).to.equal(0);

            expect(defaultAttriboot.min).to.equal(Number.NEGATIVE_INFINITY);
            expect(defaultAttriboot.exclusiveMin).to.equal(false);
            expect(defaultAttriboot.max).to.equal(Number.POSITIVE_INFINITY);
            expect(defaultAttriboot.exclusiveMax).to.equal(false);
        });

        it('should have correct values when instantiated', () => {
            let defaultAttriboot = new NumberAttriboot({
                target: 5,
                min: 0,
                exclusiveMin: true,
                max: 10,
                exclusiveMax: true
            });

            expect(defaultAttriboot.target).to.equal(5);
            expect(defaultAttriboot.raw).to.equal(5);

            expect(defaultAttriboot.min).to.equal(0);
            expect(defaultAttriboot.exclusiveMin).to.equal(true);
            expect(defaultAttriboot.max).to.equal(10);
            expect(defaultAttriboot.exclusiveMax).to.equal(true);
        });

        describe('.target', () => {
            _simpleSetterTests('target', 5, 'not-number');
        });

        describe('.lastTarget', () => {
            it('should return the last value of target', () => {
                attriboot.target = 5;
                attriboot.target = 3;
                expect(attriboot.lastTarget).to.equal(5);
            });
        });

        describe('.min', () => {
            _simpleSetterTests('min', 3, 'not-number');

            it('should ensure target is greater or equal than min', () => {
                attriboot.min = 10;
                attriboot.target = 15;
                expect(attriboot.target).to.equal(15);

                attriboot.target = 5;
                expect(attriboot.target).to.equal(10);
            });

            it('should be less or equal than max', () => {
                attriboot.max = 0;
                attriboot.min = 10;
                expect(attriboot.min).to.equal(0);
            });
        });

        describe('.exclusiveMin', () => {
            _simpleSetterTests('exclusiveMin', true, 'not-bool');

            it('should work', () => {
                attriboot.min = 0;
                attriboot.exclusiveMin = true;
                attriboot.target = 0;

                expect(attriboot.target).to.be.above(0);

                attriboot.max = 0;
                expect(attriboot.max).to.be.above(0);
            });
        });

        describe('.max', () => {
            _simpleSetterTests('max', 3, 'not-number');

            it('should ensure target less or equal than max', () => {
                attriboot.target = 10;
                attriboot.max = 3;
                expect(attriboot.target).to.equal(3);
                expect(attriboot.raw).to.equal(10);

                attriboot.target = 4;
                expect(attriboot.target).to.equal(3);
                expect(attriboot.raw).to.equal(4);
            });

            it('should be greater or equal than min', () => {
                attriboot.min = 0;
                attriboot.max = -1;
                expect(attriboot.max).to.equal(attriboot.min);
            });
        });

        describe('.exclusiveMax', () => {
            _simpleSetterTests('exclusiveMax', true, 'not-bool');

            it('should work', () => {
                attriboot.max = 0;
                attriboot.exclusiveMax = true;
                attriboot.target = 0;

                expect(attriboot.target).to.be.below(0);

                attriboot.min = 0;
                expect(attriboot.min).to.be.below(0);
            });
        });

        describe('.locked', () => {

            it('should lock target', () => {

                attriboot.target = 5;
                expect(attriboot.target).to.equal(5);

                attriboot.locked = true;
                attriboot.target = 10;
                expect(attriboot.target).to.equal(5);
            });
        });

        describe('.ignoreBounds', () => {

            it('should allow target to be greater than max', () => {

                attriboot.ignoreBounds = true;
                attriboot.max = 5;
                attriboot.target = 10;
                expect(attriboot.target).to.equal(10);
            });

            it('should allow target to be less than min', () => {

                attriboot.ignoreBounds = true;
                attriboot.min = 5;
                attriboot.target = 0;
                expect(attriboot.target).to.equal(0);
            });
        });

        describe('.steps', () => {

            it('should work', () => {

                attriboot.steps = 2;
                attriboot.target = 5;

                expect(attriboot.update()).to.be.true;
                expect(attriboot.update()).to.be.true;
                expect(attriboot.update()).to.be.false;
            });

            it('should #updateImmediate if target is changed an steps is 0', () => {
                attriboot.steps = 0;
                attriboot.target = 5;
                expect(attriboot.updated).to.be.true;
                expect(attriboot.current).to.equal(5);
            });

        });

        describe('#update', () => {

            it('should work', () => {
                attriboot.target = 10;
                attriboot.steps = 3;

                expect(attriboot.current).to.equal(0);
                expect(attriboot.update()).to.be.true;
                expect(attriboot.current).to.be.above(0);

                expect(attriboot.update()).to.be.true;
                expect(attriboot.update()).to.be.true;
                expect(attriboot.update()).to.be.false;
                expect(attriboot.current).to.equal(10);
            });
        });

        describe('#updateImmediate', () => {

            it('should work', () => {
                attriboot.target = 10;
                attriboot.steps = 3;

                expect(attriboot.current).to.equal(0);
                expect(attriboot.updateImmediate()).to.be.true;
                expect(attriboot.current).to.equal(10);
                expect(attriboot.update()).to.be.false;
                expect(attriboot.updateImmediate()).to.be.false;
            });
        });

        describe('#stop', () => {

            it('should work', () => {
                attriboot.target = 10;
                attriboot.steps = 3;

                expect(attriboot.current).to.equal(0);
                expect(attriboot.update()).to.be.true;
                expect(attriboot.stop()).to.be.true;
                expect(attriboot.target).to.equal(attriboot.current);
                expect(attriboot.update()).to.be.false;
                expect(attriboot.stop()).to.be.false;
            });
        });

        describe('#apply', () => {

            it('should work', () => {

                attriboot.apply(7);
                expect(attriboot.target).to.equal(7);
                expect(attriboot.current).to.equal(7);
            });
        });

        describe('#addOffset', () => {

            it('only accepts correct values', () => {
                expect(() => {
                    attriboot.addOffset('not-number');
                }).to.throw(Error);
            });

            it('should work', () => {

                attriboot.target = 5;
                expect(attriboot.current).to.equal(0);
                expect(attriboot.target).to.equal(5);

                attriboot.addOffset(2);
                expect(attriboot.current).to.equal(2);
                expect(attriboot.target).to.equal(7);
            });
        });

        describe('#store', () => {

            it('only accepts correct values', () => {
                expect(() => {
                    attriboot.store('not-number');
                }).to.throw(Error);
            });

            it('should work', () => {

                attriboot.target = 5;
                attriboot.store();
                expect(attriboot.stored).to.equal(5);

                attriboot.store(7);
                expect(attriboot.stored).to.equal(7);
            });
        });

        describe('#restore', () => {

            it('only accepts correct values', () => {
                expect(() => {
                    attriboot.restore('not-boolean');
                }).to.throw(Error);
            });

            it('should work', () => {

                attriboot.store(3);
                attriboot.target = 7;
                attriboot.restore();
                expect(attriboot.target).to.equal(3);

                attriboot.store(3);
                attriboot.target = 7;
                attriboot.locked = true;
                attriboot.restore();
                expect(attriboot.target).to.equal(7);

                attriboot.store(3);
                attriboot.target = 7;
                attriboot.locked = true;
                attriboot.restore(true);
                expect(attriboot.target).to.equal(3);
            });
        });

    });

});