/**
 * @file The mvvm converter.
 *
 * @author kuanghongrui@baijiahulian.com
 */

/// <reference path="../../../../../lib/typings/tsd.d.ts" />

import {IViewModel} from './IViewModel';

export interface IConverter {

    /**
     * Conver mvvm expression in the view.
     * @param {Element} element The target element.
     * @param {IViewModel} component
     * @param {IViewModel} cxt.
     */
    convert(element: Element, component: IViewModel, cxt: IViewModel): void;
}