/**
 * @file The unit test for the Radio
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../lib/typings/tsd.d.ts" />

import {Radio} from 'com/gsx/components/form/Radio';

describe('The unit test for the Radio', function () {
    beforeEach(function () {
        this.radio = new Radio();
        document.body.appendChild(this.radio.getNode());
    });

    it('Creation of the radio', function () {
        expect(this.radio.getNode() instanceof Node).toBeTruthy('The dom node of this radio has been created');
        expect(document.body.contains(this.radio.getNode()))
            .toBeTruthy('The radio has been excisted in the document');
        expect(this.radio.getParent())
            .toBeNull('This radio has not any parent component, and not in the any container.');
    });

    it('Set radio label', function () {
        this.radio.setLabel('Testing');
        expect(this.radio.getLabel()).toBe('Testing');
    });

    it('Set radio name', function () {
        this.radio.setName('testingName');
        expect(this.radio.getName()).toBe('testingName');
        expect((<Element>this.radio.getFormControlNode()).getAttribute('name')).toBe(this.radio.getName());
    });

    it('Set radio value', function () {
        this.radio.setValue('testingValue');
        expect(this.radio.getValue()).toBe('testingValue');
        expect((<Element>this.radio.getFormControlNode()).getAttribute('value')).toBe(this.radio.getValue());
    });

    afterEach(function () {
        this.radio.destroy();
    });
});
