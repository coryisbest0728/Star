/**
 * @file The contained interface. It only has parent container.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IContainer} from './IContainer';

export interface IContained {
    /**
     * Get it's parent as container.
     * @return {IContainer} parent.
     */
    getParent(): IContainer;
}
