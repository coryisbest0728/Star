/**
 * @file The Calendar
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/moment/moment.d.ts" />

import {UIComponent} from './UIComponent';
import moment = require('moment');

export class Calendar extends UIComponent {

    /**
     * The params of inital.
     */
    private params: CalendarParams;

    /**
     * The target date of moment.
     * This is the current moment in the calendar grid. Only has year and month.
     */
    private targetMoment: moment.Moment;

    /**
     * The selected date of moment
     */
    private selectedMoment: moment.Moment;

    constructor(params?: CalendarParams) {
        params = params || {};
        super(params);
        this.params = params;
    }

    /**
     * @override
     */
    public postCreate(): void {
        super.postCreate();
        this.getElementById('prev-month').addEventListener('click', this.prevMonth.bind(this));
        this.getElementById('next-month').addEventListener('click', this.nextMonth.bind(this));
        this.getElementById('calendar-grid').addEventListener('click', this.clickGrid.bind(this));
    }

    /**
     * @override
     */
    public getTemplate(): string {
        var currentMoment: moment.Moment = moment();
        this.targetMoment = moment([currentMoment.year(), currentMoment.month()]);
        return ''
            + '<div class="' + this.getSkinClass() + '">'
            +     '<div>'
            +         '<a class="link-btn" data-element-id="prev-month">&lt;&lt;</a>'
            +         '<span data-element-id="year-month-panel">'
            +             this.targetMoment.year() + '年' + (this.targetMoment.month() + 1) + '月'
            +         '</span>'
            +         '<a class="link-btn" data-element-id="next-month">&gt;&gt;</a>'
            +     '</div>'
            +     '<div data-element-id="calendar-grid" class="calendar-grid">'
            +         this.getGridBodyTemplate(this.targetMoment.clone())
            +     '</div>'
            + '</div>';
    }

    /**
     * Get the date panel template string.
     * @param {moment.Moment} targetMoment
     * @return {string}
     */
    protected getGridBodyTemplate(targetMoment: moment.Moment): string {
        var targetMonthFirstDay: number = targetMoment.day();
        var currentMonth: number = targetMoment.month();
        var template: string = '<table class="calendar-grid-body">';
        for (var weekIndex: number = 0; weekIndex < 6; ++weekIndex) {
            template += '<tr class="calendar-grid-row">';
            for (var dayIndex: number = 0; dayIndex < 7; ++dayIndex) {
                if (weekIndex === 0 && targetMonthFirstDay > dayIndex) { // pre date
                    var prevMoment: moment.Moment = targetMoment.clone()
                        .subtract(targetMonthFirstDay - dayIndex, 'days');
                    template += this.getCellTemplate(prevMoment, false);
                } else {
                    template += this.getCellTemplate(targetMoment, targetMoment.month() === currentMonth);
                    targetMoment.add(1, 'days');
                }
            }
            template += '</tr>';
        }
        return template + '</table>';
    }

    /**
     * Get the cell templated in the calendar grid.
     * @param {moment.Moment} targetMoment
     * @param {boolean} isCurrentTargetMonth
     * @return {string}
     */
    protected getCellTemplate(targetMoment: moment.Moment, isCurrentTargetMonth: boolean): string {
        var date: number = targetMoment.date();
        var extraClassName: string = '';
        if (!isCurrentTargetMonth) {
            extraClassName += ' non-current';
        }
        if (targetMoment.isSame(moment(), 'day')) {
            extraClassName += ' today';
        }
        if (this.selectedMoment && this.selectedMoment.isSame(targetMoment, 'day')) {
            extraClassName += ' selected';
        }
        return '<td class="calendar-grid-col ' + extraClassName + '"'
            + 'data-year="' + targetMoment.year() + '" '
            + 'data-month="' + targetMoment.month() + '" '
            + 'data-day="' + targetMoment.day() + '" '
            + 'data-date="' + date + '">' + date + '</td>';
    }

    /**
     * Go to the spec month.
     * @overload
     * @param {number} toIndex could be negative or positive number;
     */
    protected toMonth(toIndex: number): void;

    /**
     * Go to the spec month.
     * @overload
     * @param {moment.Moment} toMoment Direct to the spec moment
     */
    protected toMonth(toMoment: moment.Moment): void;

    /**
     * @overload
     */
    protected toMonth(param: any): void {
        var toMoment: moment.Moment;
        if (typeof param === 'number') {
            toMoment = this.targetMoment.add(param, 'months');
        } else {
            toMoment = param.clone();
            toMoment.date(1);
            this.targetMoment = toMoment;
        }
        (<HTMLElement>this.getElementById('year-month-panel')).innerHTML =
            toMoment.year() + '年' + (toMoment.month() + 1) + '月';
        (<HTMLElement>this.getElementById('calendar-grid')).innerHTML =
            this.getGridBodyTemplate(toMoment.clone());
    }

    /**
     * prev month
     */
    public prevMonth(): void {
        this.toMonth(-1);
    }

    /**
     * next month
     */
    public nextMonth(): void {
        this.toMonth(1);
    }

    /**
     * To click the calendar grid.
     * @param {MouseEvent} event
     */
    protected clickGrid(event: MouseEvent): void {
        var target: HTMLElement = <HTMLElement>event.target;
        var calendarGridElement: HTMLElement = <HTMLElement>this.getElementById('calendar-grid');
        if (calendarGridElement !== target && calendarGridElement.contains(target)) {
            var selectedData: DOMStringMap = target.dataset;
            this.setSelectedDate(new Date(+selectedData['year'], +selectedData['month'], +selectedData['date']));
        }
    }

    /**
     * Get the selected date.
     * @return {Date}
     */
    public getSelectedDate(): Date {
        return this.selectedMoment.toDate();
    }

    /**
     * Set the selected date.
     * @param {Date}
     */
    public setSelectedDate(selectedDate: Date): void {
        var selectedMoment: moment.Moment = moment(selectedDate);
        if (!selectedMoment.isSame(this.targetMoment, 'month')) {
            // the selected date is not the same year or not the same month to the current date.
            this.toMonth(selectedMoment);
        }
        var selectedCells: NodeList = (<Element>this.getNode()).querySelectorAll('.calendar-grid-col.selected');
        for (var i: number = 0; i < selectedCells.length; ++i) {
            (<Element>selectedCells.item(i)).classList.remove('selected');
        }
        (<Element>this.getNode()).querySelector('.calendar-grid-col'
            + '[data-year="' + selectedMoment.year() + '"]'
            + '[data-month="' + selectedMoment.month() + '"]'
            + '[data-date="' + selectedMoment.date() + '"]').classList.add('selected');
        this.selectedMoment = selectedMoment;
    }

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return 'calendar';
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
        delete this.targetMoment;
        delete this.selectedMoment;
    }
}

interface CalendarParams {
    /**
     * The selected date
     */
    selectedDate?: Date
}
