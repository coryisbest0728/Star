/**
 * @file The platform interface.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IPlugin} from './IPlugin';
import {ApplicationContext} from './context/ApplicationContext';

export interface IApplication {

    /**
     * Run this application.
     */
    run(): void;

    /**
     * The plugin list.
     * @return {Array<IPlugin>}
     */
    getPlugins(): IPlugin[];

    /**
     * Get the context of the application.
     * @return {ApplicationContext}
     */
    getApplicationContext(): ApplicationContext;
}