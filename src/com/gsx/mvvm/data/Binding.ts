/**
 * @file The interface of the parser
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {DataViewModel} from '../DataViewModel';
import {EventType} from '../../events/EventType';
import {FormComponent} from '../../components/form/FormComponent';
import {IBinding} from './IBinding';
import {IModel} from '../IModel';
import {InputBox} from '../../components/form/InputBox';
import {IViewModel} from '../IViewModel';
import {StringUtil} from '../../utils/StringUtil';
import {UIComponent} from '../../components/UIComponent';

export class Binding implements IBinding {

    public bind(expression: string, attr: string, component: UIComponent, vm: IViewModel): void {
        console.log('expression: ' + expression);
        console.log('attr: ' + attr);
        console.log('component: ' + component);
        console.log('vm: ' + vm);
        console.log('=================');
    }

    private executeExpression(expression: string, vm: IViewModel): any {
        return new Function('try{with(this){return ' + expression + ';}}catch(e){}').call(vm);
    }

//    /**
//     * Bind expression data.
//     * @param {string} expression The expression.
//     * @param {IViewModel} component The component which expression in.
//     * @param {IViewModel} cxt.
//     */
//    public bind(expression: string, attr: string, component: IViewModel, cxt: IViewModel): void {
//        var vars: string[] = expression.split('.');
//        if (vars.length === 1) {
//            this.bindExpression(vars[0], cxt, attr, component, cxt);
//            this.bindComponent(vars[0], cxt, attr, component, cxt);
//        } else {
//            var obj: Object = cxt;
//            for (var i: number = 0, j: number = vars.length; i < j; ++i) {
//                if (i < j - 1) {
//                    obj[vars[i]] = {};
//                    obj = obj[vars[i]];
//                } else {
//                    obj[vars[i]] = undefined;
//                }
//            }
//            this.bindObject(vars[0], cxt, attr, component, cxt);
//        }
//    }
//
//    private bindObject(expression: string, obj: Object, attr: string, component: IViewModel, cxt: IViewModel): void {
//        this.bindExpression(expression, obj, attr, component, cxt);
//        obj = obj[expression];
//        for (var i in obj) {
//            if (obj[i] instanceof Object) {
//                this.bindObject(i, obj[i], attr, component, cxt);
//            } else if (obj[i] instanceof Array) {
//                this.bindArray(obj[i], attr, component, cxt);
//            } else {
//                this.bindExpression(i, obj, attr, component, cxt);
//                this.bindComponent(i, obj, attr, component, cxt);
//            }
//        }
//    }
//
//    private bindArray(array: any[], attr: string, component: IViewModel, cxt: IViewModel): void {
//        
//    }
//
//    private bindExpression(expression: string, obj: Object, attr: string, component: IViewModel, cxt: IViewModel): void {
//        var setter: Function = component['set' + StringUtil.pressStr2UpperCaseInitial(attr)];
//        if (!obj.hasOwnProperty(expression)) {
//            Object.defineProperty(obj, expression, {
//                set: function (expression: string, cxt: IViewModel, value: any): void {
//                    if (this['_' + expression] !== value) {
//                        var setterFun: Function = cxt['set' + StringUtil.toUpperCaseInitial(expression)];
//                        if (setterFun) {
//                            setterFun.call(this, value);
//                        }
//                        var model: IModel = {
//                            name: expression,
//                            newValue: value,
//                            oldValue: this['_' + expression]
//                        };
//                        cxt.emit('watch', model);
//                        cxt.emit('watch:' + expression, model);
//                        this['_' + expression] = value;
//                    }
//                }.bind(obj, expression, cxt),
//                get: function (expression: string, attr: string, component: IViewModel, cxt: IViewModel): any {
//                    var getterFun: Function = cxt['get' + StringUtil.toUpperCaseInitial(expression)];
//                    var returnValue = getterFun ? getterFun.call(cxt) : this['_' + expression];
//                    if (returnValue === undefined) {
//                        return component['get' + StringUtil.pressStr2UpperCaseInitial(attr)]();
//                    }
//                    return returnValue;
//                }.bind(obj, expression, attr, component, cxt),
//                enumerable: true,
//                configurable: true
//            });
//            setter.call(component, obj[expression]);
//        }
//        cxt.on('watch:' + expression, function (model: IModel): void {
//            setter.call(component, model.newValue);
//        });
//    }
//
//    private bindComponent(expression: string, obj: Object, attr: string, component: IViewModel, cxt: Object): void {
//        if (component instanceof FormComponent) { // form component
//            component.on(EventType.CHANGE, function (): void {
//                obj[expression] = this['get' + StringUtil.pressStr2UpperCaseInitial(attr)]();
//            }, component);
//        }
//        if (component instanceof InputBox) { // input box component
//            component.on(EventType.KEY_UP, function (): void {
//                obj[expression] = this['get' + StringUtil.pressStr2UpperCaseInitial(attr)]();
//            }, component);
//        }
//    }
}
