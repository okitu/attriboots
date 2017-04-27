/* eslint-env node, mocha */

import chai from 'chai';
// import sinon from 'sinon';
import sinonChai from 'sinon-chai';

// use 'expect' & sinon-chai
let expect = chai.expect;
chai.use(sinonChai);

// Import the classes.
import AngleAttriboot from '../src/angle-attriboot';

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

    describe('AngleAttriboot', () => {

        beforeEach(() => {
            attriboot = new AngleAttriboot({
                easing: AngleAttriboot.Easing.linear
            });
        });

        it('should have correct default values and working getters', () => {
            let defaultAttriboot = new AngleAttriboot();

            expect(defaultAttriboot.wrap).to.equal(false);
            expect(defaultAttriboot.shortRotation).to.equal(false);
        });

        it('should have correct values when instantiated', () => {
            let attriboot = new AngleAttriboot({
                wrap: true,
                shortRotation: true
            });

            expect(attriboot.wrap).to.equal(true);
            expect(attriboot.shortRotation).to.equal(true);
        });

        describe('.target', () => {
            _simpleSetterTests('target', 1, 'not-number');

            it('should work', () => {

                attriboot.animationTime = 0;
                attriboot.target = 10;
                expect(attriboot.target).to.equal(10);
                expect(attriboot.current).to.equal(10);
                
                attriboot.locked = true;
                attriboot.target = 20;
                expect(attriboot.target).to.equal(10);

            });
        });

        describe('.wrap', () => {
            _simpleSetterTests('wrap', true, 'not-bool');

            it('should work', () => {

                attriboot.wrap = true;

                attriboot.target = 540;
                expect(attriboot.target).to.equal(180);

                attriboot.target = -120;
                expect(attriboot.target).to.equal(240);

            });
        });

        describe('.shortRotation', () => {
            _simpleSetterTests('shortRotation', true, 'not-bool');

            it('should work', () => {

                attriboot.wrap = true;
                attriboot.shortRotation = true;

                attriboot.target = 350;
                attriboot.update(250);
                expect(attriboot.current).to.be.above(350);

                attriboot.updateImmediate();
                attriboot.target = 10;
                attriboot.update(250);
                expect(attriboot.current).to.be.below(10);

            });
        });

        describe('#getTargetRadians & #getCurrentRadians', () => {

            it('should work', () => {

                attriboot.target = 180;
                expect(attriboot.getTargetRadians()).to.equal(Math.PI);

                attriboot.updateImmediate();
                expect(attriboot.getCurrentRadians()).to.equal(Math.PI);

            });
        });

    });

});