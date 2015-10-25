/**
 * @file The contained interface. It only has parent container.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IContained} from './IContained';

export interface IContained {
    /**
     * Get it's parent as container.
     * @return {IContainer} parent.
     */
    getParent(): IContainer;
}
