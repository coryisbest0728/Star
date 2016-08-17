/**
 * @file The interface of the binding
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IViewModel} from '../IViewModel';
import {UIComponent} from '../../components/UIComponent';

export interface IBinding {

    /**
     * Bind expression data.
     * @param {string} expression The expression.
     * @param {string} attr The binding attr name in the component element.
     * @param {IViewModel} vm.
     */
    bind(expression: string, attr: string, component: UIComponent, vm: IViewModel): void;
}
