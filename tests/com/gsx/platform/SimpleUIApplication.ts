/**
 * @file 
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IPlugin} from 'com/gsx/platform/IPlugin';
import {CalendarFormPlugin} from 'com/gsx/platform/plugins/calendar/CalendarFormPlugin';
import {SubmitFormPlugin} from 'com/gsx/platform/plugins/submit/SubmitFormPlugin';
import {UIApplication} from 'com/gsx/platform/UIApplication';

export class SimpleUIApplication extends UIApplication {

    public a() {
        console.log(CalendarFormPlugin);
        console.log(SubmitFormPlugin);
    }
    /**
     * @override
     */
//    public getPlugins(): IPlugin[] {
//        return [
//            new CalendarFormPlugin(this), new SubmitFormPlugin(this)
//        ];
//    }
}