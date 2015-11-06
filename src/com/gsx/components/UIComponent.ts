/**
 * @file The base class of UI component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventDispatcher} from 'com/gsx/events/EventDispatcher';
import {EventType} from 'com/gsx/events/EventType';
import {GeometryUtil} from 'com/gsx/utils/GeometryUtil';
import {IBox} from 'com/gsx/components/IBox';
import {IContained} from 'com/gsx/components/IContained';
import {IContainer} from 'com/gsx/components/IContainer';
import {IDestroyable} from 'com/gsx/components/IDestroyable';
import {ITemplated} from 'com/gsx/components/ITemplated';

export class UIComponent extends EventDispatcher implements IBox, ITemplated, IContained, IDestroyable {

    /**
     * The node of the ui component.
     */
    private node: Node;

    /**
     * The parent of ui component.
     */
    private parent: IContainer = null;

    constructor(params?: Object) {
        super();
        this.create(params);
        this.listenerEvents();
    }

    /**
     * To listener events.
     */
    protected listenerEvents() {
        var node: Node = this.getNode();
        // the event emit
        node.addEventListener('focus', this.emit.bind(this, EventType.FOCUS));
        node.addEventListener('blur', this.emit.bind(this, EventType.BLUR));
        node.addEventListener('contextmenu', this.emit.bind(this, EventType.CONTEXT_MENU));
        node.addEventListener('resize', this.emit.bind(this, EventType.RESIZE));

        // The key event emit
        node.addEventListener('keydown', this.emit.bind(this, EventType.KEY_DOWN));
        node.addEventListener('keypress', this.emit.bind(this, EventType.KEY_PRESS));
        node.addEventListener('keyup', this.emit.bind(this, EventType.KEY_UP));

        // The mouse event emit
        node.addEventListener('click', this.emit.bind(this, EventType.CLICK));
        node.addEventListener('dbclick', this.emit.bind(this, EventType.DBCLICK));
        node.addEventListener('mousedown', this.emit.bind(this, EventType.MOUSE_DOWN));
        node.addEventListener('mouseup', this.emit.bind(this, EventType.MOUSE_UP));
        node.addEventListener('mousemove', this.emit.bind(this, EventType.MOUSE_MOVE));
        node.addEventListener('mouseover', this.emit.bind(this, EventType.MOUSE_OVER));
        node.addEventListener('mouseout', this.emit.bind(this, EventType.MOUSE_OUT));
        node.addEventListener('mousewheel', this.emit.bind(this, EventType.MOUSE_WHEEL));
        node.addEventListener('scroll', this.emit.bind(this, EventType.SCROLL));
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
        this.removeAllListeners();
        var node: Node = this.getNode();
        node.parentNode.removeChild(node);
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
     * Set the parent container of this ui component.
     * @param {IContainer} parent
     */
    public setParent(parent: IContainer): void {
        this.parent = parent;
    }

    /**
     * @override
     */
    public getParent(): IContainer {
        return this.parent;
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
        return GeometryUtil.getBox(<HTMLElement>this.getNode()).getWidth();
    }

    /**
     * @override
     */
    public getHeight(): number {
        return GeometryUtil.getBox(<HTMLElement>this.getNode()).getHeight();
    }

    /**
     * @override
     */
    public getX(): number {
        return GeometryUtil.getBox(<HTMLElement>this.getNode()).getX();
    }

    /**
     * @override
     */
    public getY(): number {
        return GeometryUtil.getBox(<HTMLElement>this.getNode()).getY();
    }
}
