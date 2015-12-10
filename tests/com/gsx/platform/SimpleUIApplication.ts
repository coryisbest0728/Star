/**
 * @file 
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IPlugin} from 'com/gsx/platform/IPlugin';
import {Simple1Plugin} from 'com/gsx/platform/Simple1Plugin';
import {UIApplication} from 'com/gsx/platform/UIApplication';

export class SimpleUIApplication extends UIApplication {

    /**
     * @override
     */
    public getPlugins(): IPlugin[] {
        return [new Simple1Plugin(this)];
    }
}