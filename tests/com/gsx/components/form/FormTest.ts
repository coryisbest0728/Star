/**
 * @file The unit test for the Button
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../lib/typings/tsd.d.ts" />

import {EventType} from 'com/gsx/events/EventType';
import {Button} from 'com/gsx/components/form/Button';
import {Form} from 'com/gsx/components/form/Form';

describe('The unit test for the Form', function () {
    beforeEach(function () {
        this.form = new Form();
        document.body.appendChild(this.form.getNode());
    });

    it('Creation of the form', function () {
        expect(this.form.getNode() instanceof Node).toBeTruthy('The dom node of this form has been created');
        expect(document.body.contains(this.form.getNode()))
            .toBeTruthy('The form has been excisted in the document');
        expect(this.form.getParent())
            .toBeNull('This form has not any parent component, and not in the any container.');
    });

    it('The form is a container', function () {
        expect(this.form.getChildren().length).toBe(0);

        var button: Button = new Button({ label: 'Test-contained' });
        this.form.addChild(button);
        expect(this.form.getChildren().length).toBe(1);
        expect(this.form.contains(button)).toBeTruthy();

        this.form.addChild(button); // The same button object.
        expect(this.form.getChildren().length).toBe(1);
        expect(this.form.getContainerNode().childNodes.length).toBe(1);
        expect(this.form.getContainerNode().childNodes[0]).toBe(button.getNode());
        expect(this.form.getChild(0)).toBe(button);
        expect(button.getParent()).toBe(this.form);

        var button2: Button = new Button();
        this.form.addChild(button2);
        expect(this.form.contains(button2)).toBeTruthy();
        expect(this.form.getChildren().length).toBe(2);
        expect(this.form.getChild(1)).toBe(button2);
        expect(this.form.getContainerNode().childNodes[1]).toBe(button2.getNode());

        var button3: Button = new Button();
        this.form.addChild(button3, 0);
        expect(this.form.contains(button3)).toBeTruthy();
        expect(this.form.getChildren().length).toBe(3);
        expect(this.form.getChild(0)).toBe(button3);
        expect(this.form.getChild(1)).toBe(button);
        expect(this.form.getContainerNode().childNodes[0]).toBe(button3.getNode());

        var button4: Button = new Button();
        this.form.addChild(button4, 2);
        expect(this.form.getChild(2)).toBe(button4);
        expect(this.form.getContainerNode().childNodes[2]).toBe(button4.getNode());
        


//        expect(this.form instanceof IContainer).toBeTruthy();

//        this.button.setLabel('Test2');
//        expect(this.button.getLabel()).toBe('Test2', 'The lable of the button is "Test2"');
//        expect(this.button.getLabel())
//            .toBe((<HTMLElement>this.button.getNode()).innerHTML, 'It is "Test2" as the lable of rendered one.');
    });

    afterEach(function () {
        this.form.destroy();
    });
});
