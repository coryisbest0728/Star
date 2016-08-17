/**
 * @file The view model implements.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {EventDispatcher} from '../events/EventDispatcher';
import {IModel} from './IModel';
import {IViewModel} from './IViewModel';
//import {ObjectUtil} from '../utils/ObjectUtil';
//import {StringUtil} from '../utils/StringUtil';

export abstract class ViewModel extends EventDispatcher implements IViewModel {

    constructor() {
        super();
    }

    /**
     * @override
     */
    public watch(expression: string, watchHandler: (model: IModel) => void): void;
    public watch(watchHandler: (model: IModel) => void): void;
    public watch(expression: any, watchHandler?: (model: IModel) => void): void {
        if (typeof expression === 'string') {
            this.on('watch:' + expression, watchHandler, this);
        } else {
            watchHandler = expression;
            this.on('watch', watchHandler, this);
        }
    }

    /**
     * @override
     */
    public destroy(): void {
        this.removeAllListeners();
    }
}