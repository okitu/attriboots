/* eslint-env node, mocha */

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

// use 'expect' & sinon-chai
let expect = chai.expect;
chai.use(sinonChai);

// Import the classes.
import BaseAttriboot from '../src/base-attriboot';

// Extend Attriboot to make it instantiable
class TestAttriboot extends BaseAttriboot {
    constructor() {
        super(...arguments);
    }
}

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

    describe('BaseAttriboot', () => {

        beforeEach(() => {
            attriboot = new TestAttriboot({
                id: 'test-attriboot',
                enabled: false,
                locked: true,
                ignoreBounds: true,
                animationTime: 100
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
            expect(testAttriboot.animationTime).to.equal(300);
            expect(testAttriboot.easing).to.equal(BaseAttriboot.Easing.outQuad);
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
            _simpleSetterTests('locked', false, 'not-bool');
        });

        describe('.ignoreBounds', () => {
            _simpleSetterTests('ignoreBounds', false, 'not-bool');
        });

        describe('.animationTime', () => {
            _simpleSetterTests('animationTime', 123, 'not-number');
        });

        describe('.easing', () => {
            expect(TestAttriboot.Easing).to.exist;
            _simpleSetterTests('easing', BaseAttriboot.Easing.inOutQuad, 'not-function');
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

        describe('EventTarget interface', () => {

            it('should work', () => {

                var eventSpy = sinon.spy();

                attriboot.dispatchEvent({
                    type: 'test'
                });
                expect(eventSpy).to.have.callCount(0);

                attriboot.addEventListener('test', eventSpy);

                attriboot.dispatchEvent({
                    type: 'test'
                });
                expect(eventSpy).to.have.callCount(1);

                attriboot.dispatchEvent({
                    type: 'unknown'
                });
                expect(eventSpy).to.have.callCount(1);

                attriboot.removeEventListener('test', eventSpy);
                attriboot.removeEventListener('unknown', eventSpy);

                attriboot.dispatchEvent({
                    type: 'test'
                });
                expect(eventSpy).to.have.callCount(1);
            });

        });

    });

});