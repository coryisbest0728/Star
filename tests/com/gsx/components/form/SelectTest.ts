/**
 * @file The unit test for the Select
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../lib/typings/tsd.d.ts" />

import {EventType} from 'com/gsx/events/EventType';
import {Select} from 'com/gsx/components/form/Select';
import {Option, OptionParams} from 'com/gsx/components/form/Option';

describe('The unit test for the Select', function () {
    beforeEach(function () {
        this.select = new Select();
        document.body.appendChild(this.select.getNode());
    });

    it('Creation of the Select', function () {
        expect(this.select.getNode() instanceof Node).toBeTruthy('The dom node of this select has been created');
        expect(document.body.contains(this.select.getNode()))
            .toBeTruthy('The select has been excisted in the document');
        expect(this.select.getParent())
            .toBeNull('This select has not any parent component, and not in the any container.');
    });

    it('Add options into the select', function () {
        this.select.addOptions([{
            label: 'Test 1',
            value: '1'
        }, {
            label: 'Test 2',
            value: '2'
        }]);
        expect(this.select.getNode().options.length).toBe(2, 'The options of the select have 2 items.');

        var optionComponent = new Option({
            label: 'Test 1.5',
            value: '1.5',
            selected: true
        });
        this.select.addChild(optionComponent, 1);
        expect(this.select.getNode().options.length).toBe(3, 'The options of the select have 3 items.');
        expect(this.select.getNode().options[1]).toBe(optionComponent.getNode());
    });

    it('Events of the select', function (done) {
        this.select.addOptions([{
            label: 'Test 1',
            value: '1'
        }, {
            label: 'Test 2',
            value: '2'
        }, {
            label: 'Test 3',
            value: '3'
        }]);
        var selectedValue: string = '2';
        this.select.on(EventType.CHANGE, function () {
            expect(this.getValue()).toBe(selectedValue, 'The value: ' + selectedValue + ' has to be selected.');
            done();
        });
        this.select.setValue(selectedValue);
    });

    afterEach(function () {
        this.select.destroy();
    });
});
