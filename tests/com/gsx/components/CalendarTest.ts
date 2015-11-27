/**
 * @file The unit test for the Calendar
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {EventType} from 'com/gsx/events/EventType';
import {Calendar} from 'com/gsx/components/Calendar';

describe('The unit test for the Calendar', function () {
    beforeEach(function () {
        this.calendar = new Calendar({});
        document.body.className = 'plain';
        document.body.appendChild(this.calendar.getNode());
    });

    it('Creation of the calendar', function () {
        expect(this.calendar.getNode() instanceof Node).toBeTruthy('The dom node of this calendar has been created');
        expect(document.body.contains(this.calendar.getNode()))
            .toBeTruthy('The calendar has been excisted in the document');
        expect(this.calendar.getParent())
            .toBeNull('This calendar has not any parent component, and not in the any container.');
    });

    afterEach(function () {
//        this.calendar.destroy();
    });
});
