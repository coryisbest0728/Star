/**
 * @file The unit test for the CheckBox
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../lib/typings/tsd.d.ts" />

import {CheckBox} from 'com/gsx/components/form/CheckBox';

describe('The unit test for the CheckBox', function () {
    beforeEach(function () {
        this.checkbox = new CheckBox();
        document.body.appendChild(this.checkbox.getNode());
    });

    it('Creation of the checkbox', function () {
        expect(this.checkbox.getNode() instanceof Node).toBeTruthy('The dom node of this checkbox has been created');
        expect(document.body.contains(this.checkbox.getNode()))
            .toBeTruthy('The checkbox has been excisted in the document');
        expect(this.checkbox.getParent())
            .toBeNull('This checkbox has not any parent component, and not in the any container.');
    });

    it('Set checkbox label', function () {
        this.checkbox.setLabel('Testing');
        expect(this.checkbox.getLabel()).toBe('Testing');
    });

    it('Set checkbox name', function () {
        this.checkbox.setName('testingName');
        expect(this.checkbox.getName()).toBe('testingName');
        expect((<Element>this.checkbox.getFormControlNode()).getAttribute('name')).toBe(this.checkbox.getName());
    });

    it('Set checkbox value', function () {
        this.checkbox.setValue('testingValue');
        expect(this.checkbox.getValue()).toBe('testingValue');
        expect((<Element>this.checkbox.getFormControlNode()).getAttribute('value')).toBe(this.checkbox.getValue());
    });

    afterEach(function () {
        this.checkbox.destroy();
    });
});
