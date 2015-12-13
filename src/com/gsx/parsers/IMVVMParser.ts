/**
 * @file The interface of the parser
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IViewModel} from '../mvvm/IViewModel';

export interface IMVVMParser {

    /**
     * Make element viewmodelable.
     * @param {Element} element The parsed element.
     * @param {Function} Clazz The class of IViewModel.
     * @return {IViewModel}
     */
    paserElement2MVVM(element: Element): IViewModel;
}