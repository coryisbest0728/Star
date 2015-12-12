/**
 * @file 
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {Calendar} from 'com/gsx/components/Calendar';
import {TextBox} from 'com/gsx/components/form/TextBox';
import {UIPlugin} from 'com/gsx/platform/UIPlugin';

export class CalendarFormPlugin extends UIPlugin {

    /**
     * @override
     */
    public install(): void {
        console.log('install');
        this.addComponent(new Calendar());
        this.addComponent(new TextBox());
    }

    /**
     * @override
     */
    public uninstall(): void {
        super.uninstall();
        console.log('uninstall');
    }
}