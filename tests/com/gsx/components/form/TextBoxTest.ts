/**
 * @file The unit test for the Radio
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../lib/typings/tsd.d.ts" />

import {TextBox} from 'com/gsx/components/form/TextBox';
import {EventType} from 'com/gsx/events/EventType';

describe('The unit test for the TextBox', function () {
    beforeEach(function () {
        this.textbox = new TextBox();
        document.body.appendChild(this.textbox.getNode());
    });

    it('Creation of the textbox', function () {
        expect(this.textbox.getNode() instanceof Node).toBeTruthy('The dom node of this textbox has been created');
        expect(document.body.contains(this.textbox.getNode()))
            .toBeTruthy('The textbox has been excisted in the document');
        expect(this.textbox.getParent())
            .toBeNull('This textbox has not any parent component, and not in the any container.');
    });

    it('Set textbox name', function () {
        this.textbox.setName('testingName');
        expect(this.textbox.getName()).toBe('testingName');
        expect((<Element>this.textbox.getFormControlNode()).getAttribute('name')).toBe(this.textbox.getName());
    });

    it('Set textbox value', function () {
        this.textbox.setValue('testingValue');
        expect(this.textbox.getValue()).toBe('testingValue');
        expect((<Element>this.textbox.getFormControlNode()).getAttribute('value')).toBe(this.textbox.getValue());
    });

    it('Events of the textbox ', function (done) {
        var textbox = this.textbox;
        this.textbox.on(EventType.FOCUS, function (e) {
            expect(this).toBe(textbox, 'The context is the textbox self.');
            done();
        });
        var event: Event = document.createEvent("Events");
        event.initEvent("focus", true, true);
        textbox.getFormControlNode().dispatchEvent(event);
    });

    afterEach(function () {
        this.textbox.destroy();
    });
});
