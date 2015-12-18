/**
 * @file The interface of the parser
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventType} from '../../events/EventType';
import {FormComponent} from '../../components/form/FormComponent';
import {IBinding} from './IBinding';
import {IModel} from '../IModel';
import {InputBox} from '../../components/form/InputBox';
import {IViewModel} from '../IViewModel';
import {StringUtil} from '../../utils/StringUtil';

export class Binding implements IBinding {

    /**
     * Bind expression data.
     * @param {string} expression The expression.
     * @param {IViewModel} component The component which expression in.
     * @param {IViewModel} cxt.
     */
    public bind(expression: string, attr: string, component: IViewModel, cxt: IViewModel): void {
        this.bindExpression(expression, attr, component, cxt);
        this.bindComponent(expression, attr, component, cxt);
    }

    private bindExpression(expression: string, attr: string, component: IViewModel, cxt: IViewModel): void {
        var setter: Function = component['set' + StringUtil.toUpperCaseInitial(attr)];
        if (!cxt.hasOwnProperty(expression)) {
            Object.defineProperty(cxt, expression, {
                set: function (value: any): void {
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
                },
                get: function (): any {
                    var getterFun: Function = this['get' + StringUtil.toUpperCaseInitial(expression)];
                    var returnValue = getterFun ? getterFun.call(this) : this['_' + expression];
                    if (returnValue === undefined) {
                        return component['get' + StringUtil.toUpperCaseInitial(attr)]();
                    }
                    return returnValue;
                },
                enumerable: true,
                configurable: true
            });
            setter.call(component, cxt[expression]);
        }
        cxt.on('watch:' + expression, function (model: IModel): void {
            setter.call(component, model.newValue);
        });
    }

    private bindComponent(expression: string, attr: string, component: IViewModel, cxt: IViewModel): void {
        if (component instanceof FormComponent) { // form component
            component.on(EventType.CHANGE, function (): void {
                cxt[expression] = this['get' + StringUtil.pressStr2UpperCaseInitial(attr)]();
            }, component);
        }
        if (component instanceof InputBox) { // input box component
            component.on(EventType.KEY_UP, function (): void {
                cxt[expression] = this['get' + StringUtil.pressStr2UpperCaseInitial(attr)]();
            }, component);
        }
    }
}
