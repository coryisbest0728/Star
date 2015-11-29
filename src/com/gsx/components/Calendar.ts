/**
 * @file The Calendar
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/moment/moment.d.ts" />

import {UIComponent} from 'com/gsx/components/UIComponent';
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
        this.params = params || {};
        super(this.params);
    }

    /**
     * @override
     */
    public postCreate(): void {
        super.postCreate();
        this.getTemplatedElementById('prev-month').addEventListener('click', this.prevMonth.bind(this));
        this.getTemplatedElementById('next-month').addEventListener('click', this.nextMonth.bind(this));
        this.getTemplatedElementById('calendar-grid').addEventListener('click', this.clickGrid.bind(this));
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
            +         '<a href="javascript:;" data-element-id="prev-month">&lt;&lt;</a>'
            +         '<span data-element-id="year-month-panel">'
            +             this.targetMoment.year() + '年' + (this.targetMoment.month() + 1) + '月'
            +         '</span>'
            +         '<a href="javascript:;" data-element-id="next-month">&gt;&gt;</a>'
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
     * @param {number} toIndex could be negative or positive number;
     */
    private toMonth(toIndex: number): void {
        var toMoment: moment.Moment = this.targetMoment.add(toIndex, 'months');
        (<HTMLElement>this.getTemplatedElementById('year-month-panel')).innerHTML =
            toMoment.year() + '年' + (toMoment.month() + 1) + '月';
        (<HTMLElement>this.getTemplatedElementById('calendar-grid')).innerHTML =
            this.getGridBodyTemplate(toMoment.clone());
    }

    /**
     * prev month
     */
    protected prevMonth(): void {
        this.toMonth(-1);
    }

    /**
     * next month
     */
    protected nextMonth(): void {
        this.toMonth(1);
    }

    /**
     * To click the calendar grid.
     * @param {MouseEvent} event
     */
    protected clickGrid(event: MouseEvent): void {
        var selectedCells: NodeList = (<Element>event.currentTarget).querySelectorAll('.calendar-grid-col.selected');
        for (var i: number = 0; i < selectedCells.length; ++i) {
            (<Element>selectedCells.item(i)).classList.remove('selected');
        }
        var selectedCell: HTMLElement = (<HTMLElement>event.target);
        selectedCell.classList.add('selected');
        var selectedData: DOMStringMap = selectedCell.dataset;
        this.selectedMoment = moment([+selectedData['year'], +selectedData['month'], +selectedData['date']]);
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
    
}