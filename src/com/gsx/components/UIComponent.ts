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
     * The node of the ui component.
     */
    private node:Node;

    constructor(params?: Object) {
        super();
        this.create(params);
        this.listenerEvents();
    }

    /**
     * To listener events.
     */
    protected listenerEvents() {
        var node:Node = this.getNode();
        node.addEventListener('focus', this.emit.bind(this, 'focus'));
        node.addEventListener('blur', this.emit.bind(this, 'blur'));
        node.addEventListener('contextmenu', this.emit.bind(this, 'contextmenu'));
        node.addEventListener('resize', this.emit.bind(this, 'resize'));

        node.addEventListener('keydown', this.emit.bind(this, 'keydown'));
        node.addEventListener('keypress', this.emit.bind(this, 'keypress'));
        node.addEventListener('keyup', this.emit.bind(this, 'keyup'));

        node.addEventListener('click', this.emit.bind(this, 'click'));
        node.addEventListener('dbclick', this.emit.bind(this, 'dbclick'));
        node.addEventListener('mousedown', this.emit.bind(this, 'mousedown'));
        node.addEventListener('mouseup', this.emit.bind(this, 'mouseup'));
        node.addEventListener('mousemove', this.emit.bind(this, 'mousemove'));
        node.addEventListener('mouseover', this.emit.bind(this, 'mouseover'));
        node.addEventListener('mouseout', this.emit.bind(this, 'mouseout'));
        node.addEventListener('mousewheel', this.emit.bind(this, 'mousewheel'));
        node.addEventListener('scroll', this.emit.bind(this, 'scroll'));
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
