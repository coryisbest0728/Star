/**
 * @file The view model implements.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {EventDispatcher} from '../events/EventDispatcher';
import {IModel} from './IModel';
import {IViewModel} from './IViewModel';
import {ObjectUtil} from '../utils/ObjectUtil';
import {StringUtil} from '../utils/StringUtil';

export class ViewModel extends EventDispatcher implements IViewModel {

    private viewmodel: IViewModel;

    constructor() {
        super();
    }

    /**
     * @override
     */
    public getByExp(expression: string): any {
        var getterFun: Function = this['get' + StringUtil.toUpperCaseInitial(expression)];
        return getterFun ? getterFun.call(this) : this['_' + expression];
    }

    /**
     * @override
     */
    public setByExp(expression: string, value: any): void {
        if (this['_' + expression] !== value) {
            var setterFun: Function = this['set' + StringUtil.toUpperCaseInitial(expression)];
            if (setterFun) {
                setterFun.call(this, value);
            }
            var model: IModel = {
                name: expression,
                newValue: value,
                oldValue: this['_' + expression]
            };
            this.emit('watch', model);
            this.emit('watch:' + expression, model);
            this['_' + expression] = value;
        }
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