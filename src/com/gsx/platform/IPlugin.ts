/**
 * @file The plugin interface.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IApplication} from './IApplication';

export interface IPlugin {

    /**
     * Installation of the plugin.
     */
    install(): void;

    /**
     * Uninstallation of the plugin.
     */
    uninstall(): void;

    /**
     * Get application of the plugin.
     * @return {IApplication}
     */
    getApplication(): IApplication;
}