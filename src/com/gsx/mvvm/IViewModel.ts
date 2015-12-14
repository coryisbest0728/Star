/**
 * @file The interface of the viewmodel
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IModel} from './IModel';

export interface IViewModel {

    /**
     * Get the attr value
     * @param {string} attr
     * @return {IModel}
     */
    get(attr: string): IViewModel;

    /**
     * Set the attr value
     * @param {string} attr
     * @param {any} attr
     */
    set(attr: string, value: any): void;

    /**
     * Watch the changes of the attr value.
     * @param {string} attr
     * @param {Function} watchHandler(model: IModel)
     */
    watch(attr: string, watchHandler: (model: IModel) => void): void;
}