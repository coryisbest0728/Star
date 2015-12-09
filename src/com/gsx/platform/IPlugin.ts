/**
 * @file The plugin interface.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IDestroyable} from '../components/IDestroyable';

export interface IPlugin extends IDestroyable {

    /**
     * Startup this plugin.
     */
    startup(): void;
}