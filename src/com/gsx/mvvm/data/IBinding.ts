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
     * @param {UIComponent} component The component which expression in.
     * @param {IViewModel} cxt.
     */
    bind(expression: string, attr: string, component: UIComponent, cxt: IViewModel): void;
}
