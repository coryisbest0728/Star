/**
 * @file The view model implements.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {EventDispatcher} from '../events/EventDispatcher';
import {IModel} from './IModel';
import {IViewModel} from './IViewModel';
import {ViewModel} from './ViewModel';
import {ObjectUtil} from '../utils/ObjectUtil';
import {StringUtil} from '../utils/StringUtil';
import Vue = require('vue');

export class VueViewModel extends ViewModel {

//    private vue: Vue;
//    private viewmodel: IViewModel;
//
//    constructor(element: Element, viewmodel: IViewModel) {
//        super();
//        var attrs: string[] = [];
//        var regExp: RegExp = /\{\{\s*([\w|\d|\.]+)\s*\}\}/g;
//        var matches: RegExpMatchArray = (<HTMLElement>element).outerHTML.match(regExp);
//        if (matches) {
//            matches.forEach(function (exp: string): void {
//                if (regExp.test(exp)) {
//                    attrs.push(RegExp.$1);
//                }
//            });
//        }
//        this.viewmodel = viewmodel;
//        this.vue = new Vue({
//            el: element,
//            data: {}
//        });
//        attrs.forEach(this.watchAttr, this);
//    }
//
//    private watchAttr(attr: string) {
//        var self = this;
//        self.vue.$watch(attr, function (newValue, oldValue):void {
//            var model: IModel = {
//                name: attr,
//                newValue: newValue,
//                oldValue: oldValue
//            };
//            self.emit('watch:' + attr, model);
//        });
//    }
//
//    private wrapViewModelFromObject(value: Vue): IViewModel {
//        var self = this;
//        for (var i in value) {
//            if (value[i] instanceof Object) {
//                value[i] = self.wrapViewModelFromObject(value[i]);
//            } else if (value[i] instanceof Array) {
//                value[i] = self.wrapViewModelFromArray(value[i]);
//            }
//        }
//        return <IViewModel>ObjectUtil.mixin(value, {
//            set: function (attr: string, value: any): void {
//                value.$set(attr, value);
//                self.executeSetterFn(attr, self.convertValue2VM(value));
//            },
//            get: function (attr: string): any {
//                return self.executeGetterFn(attr, this.convertValue2VM(value.$get(attr)));
//            },
//            watch: function (attr: string, watchHandler: (model: IModel) => void): void {
//                
//            }
//        });
//    }
//
//    private wrapViewModelFromArray(value: Vue[]): IViewModel {
//        return null;
//    }
//
//    /**
//     * @override
//     */
//    public get(attr: string): any {
//        return this.executeGetterFn(attr, this.convertValue2VM(this.vue.$get(attr)));
//    }
//
//    private convertValue2VM(value: any): any {
//        if (value instanceof Object) { // object
//            return this.wrapViewModelFromObject(value);
//        } else if (value instanceof Array) { // array
//            return this.wrapViewModelFromArray(value);
//        }
//        return value;
//    }
//
//    private executeGetterFn(attr: string, value: any): any {
//        var viewmodel: IViewModel = this.viewmodel;
//        if (viewmodel) {
//            var getterFn: (...args: any[]) => void = viewmodel['get' + StringUtil.toUpperCaseInitial(attr)];
//            if (getterFn) {
//                return getterFn.call(viewmodel, value);
//            }
//        }
//        return value;
//    }
//
//    private executeSetterFn(attr: string, value: any): void {
//        var viewmodel: IViewModel = this.viewmodel;
//        if (viewmodel) {
//            var setterFn: (...args: any[]) => void = viewmodel['set' + StringUtil.toUpperCaseInitial(attr)];
//            if (setterFn) {
//                setterFn.call(viewmodel, value);
//            }
//        }
//    };
//
//    /**
//     * @override
//     */
//    public set(attr: string, value: any): void {
//        this.vue.$set(attr, value);
//        this.executeSetterFn(attr, this.convertValue2VM(this.vue.$get(attr)));
//    }
//
//    /**
//     * @override
//     */
//    public watch(attr: string, watchHandler: (model: IModel) => void): void {
//        this.on('watch:' + attr, watchHandler, this);
//    }
//
//    /**
//     * @override
//     */
//    public destroy(): void {
//        this.removeAllListeners();
//        if (this.vue) {
//            this.vue.$destroy();
//        }
//    }
}