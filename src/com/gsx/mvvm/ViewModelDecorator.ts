/**
 * @file The view model implements.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../lib/typings/tsd.d.ts" />

import {EventDispatcher} from '../events/EventDispatcher';
import {IDestroyable} from '../IDestroyable';
import {IModel} from './IModel';
import {IViewModel} from './IViewModel';
import {StringUtil} from '../utils/StringUtil';
import Vue = require('vue');

export class ViewModelDecorator extends EventDispatcher implements IViewModel, IDestroyable {

    private vue: Vue;
    private viewmodel: IViewModel;

    constructor(element: Element, viewmodel: IViewModel) {
        super();
        var attrs: string[] = [];
        (<HTMLElement>element).outerHTML.match(/\{\{\s*([\w|\d]+)\s*\}\}/g).forEach(function (exp: string): void {
            if (/\{\{\s*([\w|\d]+)\s*\}\}/g.test(exp)) {
                attrs.push(RegExp.$1);
            }
        });
        this.viewmodel = viewmodel;
        this.vue = new Vue({
            el: element,
            data: {}
        });
        attrs.forEach(this.watchAttr, this);
    }

    private watchAttr(attr: string) {
        var self = this;
        self.vue.$watch(attr, function (newValue, oldValue):void {
            var model: IModel = {
                name: attr,
                newValue: newValue,
                oldValue: oldValue
            };
            self.emit('watch:' + attr, model);
        });
    }

    private wrapViewModel(value: any): IViewModel {
        if (value instanceof Object) { // object
            return ;
        } else if (value instanceof Array) { // array
            return ;
        }
        console.log('get -->', value);
        return value;
    }

    /**
     * @override
     */
    public get(attr: string): IViewModel {
        return this.wrapViewModel(this.vue.$get(attr));
    }

    /**
     * @override
     */
    public set(attr: string, value: any): void {
        var viewmodel: IViewModel = this.viewmodel;
        if (viewmodel) {
            var setterFn: (...argArray: any[]) => void = viewmodel['set' + StringUtil.toUpperCaseInitial(attr)];
            if (setterFn) {
                setterFn.call(viewmodel, value);
            }
        }
        this.vue.$set(attr, value);
    }

    /**
     * @override
     */
    public watch(attr: string, watchHandler: (model: IModel) => void): void {
        this.on('watch:' + attr, watchHandler, this);
    }

    /**
     * @override
     */
    public destroy(): void {
        this.removeAllListeners();
        if (this.vue) {
            this.vue.$destroy();
        }
    }
}