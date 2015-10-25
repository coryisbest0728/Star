/**
 * @file The base class of UI component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventDispatcher} from 'com/gsx/events/EventDispatcher';
import {IBox} from 'com/gsx/components/IBox';
import {IContained} from 'com/gsx/components/IContained';
import {IContainer} from 'com/gsx/components/IContainer';
import {IDestroyable} from 'com/gsx/components/IDestroyable';
import {ITemplated} from 'com/gsx/components/ITemplated';

export class UIComponent extends EventDispatcher implements IBox, ITemplated, IContained, IDestroyable {

    /**
     * 该组件对应的node节点。
     */
    private node:Node;

    constructor(params?: Object) {
        super();
        this.create(params);
    }

    /**
     * 组件生命周期启始方法。
     * @param {Object?} params 创建组件时传入的参数。
     */
    public create(params?: Object): void {
        this.buildRendering();
    }

    /**
     * @override
     */
    public buildRendering(): void {
        var tempElement: HTMLElement = <HTMLElement>document.createElement('div');
        tempElement.innerHTML = this.getTemplateString();
        this.node = tempElement.firstChild;
    }

    /**
     * @override
     */
    public destroy(): void {
        
    }

    /**
     * @override
     * The subclass must implement this method.
     */
    public getTemplateString(): string {
        throw new Error('Please implements the method com.gsx.component.ITemplated#getTemplateString():string');
        return '';
    }

    /**
     * @override
     */
    public getParent(): IContainer {
        return null;
    }

    /**
     * 得到该组件的node节点。
     * @return {Node} 得到该组件的node节点。
     */
    public getNode(): Node {
        return this.node;
    }

    /**
     * @override
     */
    public getWidth(): number {
        return 0;
    }

    /**
     * @override
     */
    public getHeight(): number {
        return 0;
    }

    /**
     * @override
     */
    public getX(): number {
        return 0;
    }

    /**
     * @override
     */
    public getY(): number {
        return 0;
    }
}
