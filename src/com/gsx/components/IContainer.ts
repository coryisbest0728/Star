/**
 * @file The container interface.
 *     It always contains the contained
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {UIComponent} from './UIComponent';

export interface IContainer {
    /**
     * Get the children of the container。
     * @return {Array<UIComponent>}
     */
    getChildren(): Array<UIComponent>;

    /**
     * The container contains the spec component or not. 
     * @param {UIComponent} uiComponent
     */
    contains(uiComponent: UIComponent): boolean;

    /**
     * Get the container node.
     * This container node could append/prepend the dom node as it's child node.
     * @return {Node}
     */
    getContainerNode(): Node;

    /**
     * Add the ui component child.
     * @param {UIComponent} uiComponent
     * @param {number?} index
     */
    addChild(uiComponent: UIComponent, index?: number): void;

    /**
     * Get the child component by index.
     * @param {number} index
     */
    getChild(index: number): UIComponent;

    /**
     * Remove the spec child under this container.
     */
    removeChild(uiComponent: UIComponent): void;
    removeChild(index: number): void;

    /**
     * Remove all of the children
     */
    removeAllChildren(): void;
}
