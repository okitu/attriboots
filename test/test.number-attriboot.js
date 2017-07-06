/* eslint-env node, mocha */

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

// use 'expect' & sinon-chai
let expect = chai.expect;
chai.use(sinonChai);

// Import the classes.
import NumberAttriboot from '../src/number-attriboot';

describe('attriboots', () => {

    let attriboot;

    // Helper for easy set-tests
    let _simpleSetterTests = (property, value, badValue) => {
        it('can be changed and fires change events', () => {

            var changeEventSpy = sinon.spy();
            attriboot.addEventListener('change', changeEventSpy);
            var propertyChangeEventSpy = sinon.spy();
            attriboot.addEventListener('change:' + property, propertyChangeEventSpy);

            attriboot[property] = value;
            expect(attriboot[property]).to.equal(value);

            expect(changeEventSpy).to.have.callCount(1);
            expect(changeEventSpy).to.have.been.calledWith({
                type: 'change',
                target: attriboot,
                property: property,
                value: value
            });
            expect(propertyChangeEventSpy).to.have.callCount(1);
            expect(propertyChangeEventSpy).to.have.been.calledWith({
                type: 'change:' + property,
                target: attriboot,
                value: value
            });
        });

        it('only accepts correct values', () => {
            expect(() => {
                attriboot[property] = badValue;
            }).to.throw(Error);
        });
    };

    describe('NumberAttriboot', () => {

        beforeEach(() => {
            attriboot = new NumberAttriboot({
                easing: NumberAttriboot.Easing.linear
            });
        });

        it('should have correct default values and working getters', () => {
            let defaultAttriboot = new NumberAttriboot();

            expect(defaultAttriboot.target).to.equal(0);
            expect(defaultAttriboot.lastTarget).to.equal(null);
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

            it('should #updateImmediate if animationTime is 0', () => {
                attriboot.animationTime = 0;
                attriboot.target = 5;
                expect(attriboot.updated).to.be.true;
                expect(attriboot.current).to.equal(5);
            });

            it('should dispatch events when necessary', () => {

                var changeSpy = sinon.spy();
                attriboot.addEventListener('change', changeSpy);

                attriboot.target = 0;
                expect(changeSpy).to.not.have.been.called;
                attriboot.target = 1;
                expect(changeSpy).to.have.been.calledOnce;
                attriboot.target = 2;
                expect(changeSpy).to.have.been.calledTwice;

            });
        });

        describe('.lastTarget', () => {
            it('should return the last value of target', () => {
                attriboot.target = 5;
                attriboot.target = 3;
                expect(attriboot.lastTarget).to.equal(5);
            });
        });

        describe('.min', () => {
            _simpleSetterTests('min', -3, 'not-number');

            it('should be set to Number.NEGATIVE_INFINITY if assign null or undefined', () => {

                attriboot.min = 10;
                expect(attriboot.min).to.equal(10);

                attriboot.min = null;
                expect(attriboot.min).to.equal(Number.NEGATIVE_INFINITY);

                attriboot.min = 10;
                expect(attriboot.min).to.equal(10);

                attriboot.min = undefined;
                expect(attriboot.min).to.equal(Number.NEGATIVE_INFINITY);

            });

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

            it('should be set to Number.POSITIVE_INFINITY if assign null or undefined', () => {

                attriboot.max = 10;
                expect(attriboot.max).to.equal(10);

                attriboot.max = null;
                expect(attriboot.max).to.equal(Number.POSITIVE_INFINITY);

                attriboot.max = 10;
                expect(attriboot.max).to.equal(10);

                attriboot.max = undefined;
                expect(attriboot.max).to.equal(Number.POSITIVE_INFINITY);

            });

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

        describe('.animationTime', () => {

            it('should work', () => {

                attriboot.animationTime = 2;
                attriboot.target = 4;

                expect(attriboot.current).to.equal(0);

                expect(attriboot.update(1)).to.be.true;
                expect(attriboot.current).to.equal(2);

                expect(attriboot.update(1)).to.be.true;
                expect(attriboot.current).to.equal(4);

                expect(attriboot.dirty).to.be.false;
            });

            it('should #updateImmediate if animationTime is changed to 0 and dirty is true', () => {
                attriboot.animationTime = 0;
                attriboot.target = 5;
                expect(attriboot.updated).to.be.true;
                expect(attriboot.current).to.equal(5);
            });

        });

        describe('#update', () => {

            it('should work with using the delta parameter', () => {

                var updateSpy = sinon.spy();
                attriboot.addEventListener('update', updateSpy);

                attriboot.animationTime = 3;
                attriboot.target = 10;

                expect(attriboot.current).to.equal(0);

                expect(attriboot.update(1)).to.be.true;
                expect(updateSpy).to.have.callCount(1);
                expect(attriboot.current).to.be.above(0);

                expect(attriboot.update(1)).to.be.true;
                expect(updateSpy).to.have.callCount(2);

                expect(attriboot.update(1)).to.be.true;
                expect(updateSpy).to.have.callCount(3);

                expect(attriboot.update(1)).to.be.false;
                expect(updateSpy).to.have.callCount(3);
                expect(attriboot.current).to.equal(10);
                expect(attriboot.dirty).to.be.false;
            });

            it('should work without using the delta parameter', (done) => {

                var updateSpy = sinon.spy();
                attriboot.addEventListener('update', updateSpy);

                expect(() => {
                    attriboot.update('not-number');
                }).to.throw(Error);

                attriboot.animationTime = 200;
                attriboot.target = 4;

                setTimeout(function() {

                    expect(attriboot.update()).to.be.true;
                    setTimeout(function() {

                        expect(attriboot.update()).to.be.true;
                        setTimeout(function() {

                            expect(attriboot.update()).to.be.false;
                            expect(attriboot.dirty).to.be.false;

                            done();
                        }, 100);
                    }, 100);
                }, 100);

            });
        });

        describe('#updateImmediate', () => {

            it('should work', () => {

                var updateSpy = sinon.spy();
                attriboot.addEventListener('update', updateSpy);

                attriboot.target = 10;

                expect(attriboot.current).to.equal(0);

                expect(attriboot.updateImmediate()).to.be.true;
                expect(updateSpy).to.have.callCount(1);
                expect(attriboot.current).to.equal(10);

                expect(attriboot.updateImmediate()).to.be.false;
                expect(attriboot.dirty).to.be.false;
                expect(updateSpy).to.have.callCount(1);
            });
        });

        describe('#stop', () => {

            it('should work', () => {
                attriboot.target = 10;

                expect(attriboot.current).to.equal(0);
                expect(attriboot.stop()).to.be.true;
                expect(attriboot.target).to.equal(attriboot.current);
                expect(attriboot.dirty).to.be.false;
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