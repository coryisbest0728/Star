/**
 * @file The unit test for the Calendar
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {EventType} from 'com/gsx/events/EventType';
import {Calendar} from 'com/gsx/components/Calendar';
import moment = require('moment');

describe('The unit test for the Calendar', function () {
    beforeEach(function () {
        this.calendar = new Calendar({});
        document.body.classList.add('plain');
        document.body.appendChild(this.calendar.getNode());
    });

    it('Creation of the calendar', function () {
        expect(this.calendar.getNode() instanceof Node).toBeTruthy('The dom node of this calendar has been created');
        expect(document.body.contains(this.calendar.getNode()))
            .toBeTruthy('The calendar has been excisted in the document');
        expect(this.calendar.getParent())
            .toBeNull('This calendar has not any parent component, and not in the any container.');
    });

    it('Select current year and current month', function () {
        var targetDate: Date = new Date();
        this.calendar.setSelectedDate(targetDate);
        var selectedDate: Date = this.calendar.getSelectedDate();
        var selectedCell: DOMStringMap = (<HTMLElement>(<Element>this.calendar.getNode())
            .querySelector('.selected')).dataset;
        var date: Date = new Date(+selectedCell['year'], +selectedCell['month'], +selectedCell['date']);
        expect(moment(selectedDate).isSame(moment(targetDate), 'day')).toBeTruthy('The selected date is the target date');
        expect(moment(date).isSame(moment(selectedDate), 'day')).toBeTruthy('The selected date in the selected dom is correct');
    });

    it('Select other year and current month', function () {
        var targetDate: Date = new Date(2015, 4, 17);
        this.calendar.setSelectedDate(targetDate);
        var selectedDate: Date = this.calendar.getSelectedDate();
        var selectedCell: DOMStringMap = (<HTMLElement>(<Element>this.calendar.getNode())
            .querySelector('.selected')).dataset;
        var date: Date = new Date(+selectedCell['year'], +selectedCell['month'], +selectedCell['date']);
        expect(moment(selectedDate).isSame(moment(targetDate), 'day')).toBeTruthy('The selected date is the target date');
        expect(moment(date).isSame(moment(selectedDate), 'day')).toBeTruthy('The selected date in the selected dom is correct');
    });

    afterEach(function () {
        this.calendar.destroy();
        document.body.classList.remove('plain');
    });
});
