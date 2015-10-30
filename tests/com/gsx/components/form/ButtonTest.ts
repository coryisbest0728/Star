/**
 * @file The unit test for the Button
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../lib/typings/tsd.d.ts" />

import {EventType} from 'com/gsx/events/EventType';
import {Button} from 'com/gsx/components/form/Button';

describe('The unit test for the Button', function () {
    beforeEach(function () {
        this.button = new Button({
            label: 'Test'
        });
        document.body.appendChild(this.button.getNode());
    });

    it('Creation of the button', function () {
        expect(this.button.getNode() instanceof Node).toBeTruthy('The dom node of this button has been created');
        expect(document.body.contains(this.button.getNode()))
            .toBeTruthy('The button has been excisted in the document');
        expect(this.button.getParent())
            .toBeNull('This button has not any parent component, and not in the any container.');
    });

    it('The label of ths button', function () {
        expect(this.button.getLabel()).toBe('Test');

        this.button.setLabel('Test2');
        expect(this.button.getLabel()).toBe('Test2', 'The lable of the button is "Test2"');
        expect(this.button.getLabel())
            .toBe((<HTMLElement>this.button.getNode()).innerHTML, 'It is "Test2" as the lable of rendered one.');
    });

    it('The disabled of the button', function () {
        expect(this.button.getDisabled()).toBe(false);

        this.button.setDisabled(true);
        expect(this.button.getDisabled()).toBe(true, 'The disabled of the button is true');
        expect(this.button.getDisabled())
            .toBe((<Element>this.button.getNode()).hasAttribute('disabled'), 'The button has been disabled already.');

        this.button.setDisabled(false);
        expect(this.button.getDisabled()).toBe(false, 'The disabled of the button is false');
        expect(this.button.getDisabled())
            .toBe((<Element>this.button.getNode()).hasAttribute('disabled'), 'The button has been enabled already.');
    });

    it('The skin of the button', function () {
        expect(this.button.getBaseSkinClass()).toBe('btn', 'The base skin class is "btn"');
        expect(this.button.getSpecSkinClass())
            .toBe('btn-primary', 'The spec skin class default value is "btn-primary"');
        var specSkinClass = 'btn-secondary custom-skin-class';
        this.button.setSpecSkinClass(specSkinClass);
        expect(this.button.getBaseSkinClass() + ' ' +this.button.getSpecSkinClass())
            .toBe((<HTMLElement>this.button.getNode()).className);
        expect(this.button.getSpecSkinClass())
            .toBe(specSkinClass, 'The spec skin class settled value is "' + specSkinClass + '"');
    });

    it('Click the button', function (done) {
        var button = this.button;
        this.button.on(EventType.CLICK, function () {
            expect(this).toBe(button, 'The context is the button self.');
            done();
        });
        var mouseEvent: Event = document.createEvent("MouseEvents");
        mouseEvent.initEvent("click", true, true);
        button.getNode().dispatchEvent(mouseEvent);
        expect(this.button.emit(EventType.CLICK)).toBeTruthy('The click event has been listened');
    })

    it('The button\'s width must be 0', function () {
        expect(this.button.getWidth()).toBe(0);
    });

    it('The button\'s height must be 0', function () {
        expect(this.button.getHeight()).toBe(0);
    });

    afterEach(function () {
        this.button.destroy();
    });
});
