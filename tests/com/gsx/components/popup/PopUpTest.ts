/**
 * @file The unit test for the Calendar
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../lib/typings/tsd.d.ts" />

import {Calendar} from 'com/gsx/components/Calendar';
import {EventType} from 'com/gsx/events/EventType';
import {PositionType} from 'com/gsx/components/PositionType';
import {PopUp} from 'com/gsx/components/popup/PopUp';
import {TextBox} from 'com/gsx/components/form/TextBox';

describe('The unit test for the PopUp', function () {
    beforeEach(function () {
        this.popUp = new PopUp({});
        document.body.classList.add('plain');
        document.body.appendChild(this.popUp.getNode());
    });

    it('Creation of the pop up', function () {
        expect(this.popUp.getNode() instanceof Node).toBeTruthy('The dom node of this pop up has been created');
        expect(document.body.contains(this.popUp.getNode()))
            .toBeTruthy('The pop up has been excisted in the document');
        expect(this.popUp.getParent())
            .toBeNull('This pop up has not any parent component, and not in the any container.');
    });

    it('Insert one pop up widthout parent and around', function () {
        this.popUp.addChild(new Calendar());
        this.popUp.setPosition(null, PositionType.CENTER);
    });

    it('Insert one component into the pop up', function () {
        var textBox: TextBox = new TextBox();
        document.body.appendChild(textBox.getNode());
        this.popUp.addChild(new Calendar());
        this.popUp.setPosition(null, textBox, PositionType.LEFT | PositionType.RIGHT);
    });

    afterEach(function () {
//        this.popUp.destroy();
    });
});
