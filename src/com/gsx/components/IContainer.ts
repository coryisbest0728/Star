/**
 * @file The container interface.
 *     It always contains the contained
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {UIComponent} from './UIComponent';

export interface IContainer {
    /**
     * 销毁。
     */
    getChildren(): Array<UIComponent>;

    /**
     * 该孩子组件是否在容器内部。
     * @param {UIComponent} uiComponent 容器的孩子组件。
     */
    contains(uiComponent: UIComponent): boolean;
}
