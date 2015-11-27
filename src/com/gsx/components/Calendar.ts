/**
 * @file The Calendar
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {UIComponent} from 'com/gsx/components/UIComponent';

export class Calendar extends UIComponent {

    /**
     * The params of inital.
     */
    private params: CalendarParams;

    constructor(params?: CalendarParams) {
        this.params = params || {};
        super(this.params);
    }

    /**
     * @override
     */
    public getTemplate(): string {
        return '<div class="' + this.getSkinClass() + '">' + this.getDatePanelTemplate() + '</div>';
    }

    /**
     * Get the date panel template string.
     * @return {string}
     */
    private getDatePanelTemplate(): string {
        var template: string = '<table class="date-panel-border">';
        for (var rowIndex: number = 0; rowIndex < 5; ++rowIndex) {
            template += '<tr>';
            for (var columnIndex: number = 0; columnIndex < 7; ++columnIndex) {
                template += '<td>' + rowIndex + '' + columnIndex + '</td>';
            }
            template += '</tr>';
        }
        return template + '</table>';
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
    }
}

interface CalendarParams {
    
}