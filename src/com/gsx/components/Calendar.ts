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
    public getTemplateString(): string {
        return '<div class="' + this.getSkinClass() + '"></div>';
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