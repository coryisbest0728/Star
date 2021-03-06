/**
 * @file The interface of the viewmodel
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IDestroyable} from '../IDestroyable';
import {IEventDispatcher} from '../events/IEventDispatcher';
import {IModel} from './IModel';

export interface IViewModel extends IEventDispatcher, IDestroyable {

    /**
     * Watch the changes of the expression value.
     * @param {string} expression
     * @param {Function} watchHandler(model: IModel)
     */
    watch(expression: string, watchHandler: (model: IModel) => void): void;

    /**
     * Every epress change will trigger this method.
     * @param {Function} watchHandler(model: IModel)
     */
    watch(watchHandler: (model: IModel) => void): void;
}