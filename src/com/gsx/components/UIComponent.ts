/**
 * @file The base class of UI component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventDispatcher} from 'com/gsx/events/EventDispatcher';
import {EventType} from 'com/gsx/events/EventType';
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
     * Convert the enum event type to the string.
     */
    private convertEventTypeToString(eventType: EventType): string {
        return eventType + '';
    }

    /**
     * To listener events.
     */
    protected listenerEvents() {
        var node:Node = this.getNode();
        // the event emit
        node.addEventListener(this.convertEventTypeToString(EventType.FOCUS), this.emit.bind(this, EventType.FOCUS));
        node.addEventListener(this.convertEventTypeToString(EventType.BLUR), this.emit.bind(this, EventType.BLUR));
        node.addEventListener(this.convertEventTypeToString(EventType.CONTEXT_MENU),
            this.emit.bind(this, EventType.CONTEXT_MENU));
        node.addEventListener(this.convertEventTypeToString(EventType.RESIZE), this.emit.bind(this, EventType.RESIZE));

        // The key event emit
        node.addEventListener(this.convertEventTypeToString(EventType.KEY_DOWN),
            this.emit.bind(this, EventType.KEY_DOWN));
        node.addEventListener(this.convertEventTypeToString(EventType.KEY_PRESS),
            this.emit.bind(this, EventType.KEY_PRESS));
        node.addEventListener(this.convertEventTypeToString(EventType.KEY_UP), this.emit.bind(this, EventType.KEY_UP));

        // The mouse event emit
        node.addEventListener(this.convertEventTypeToString(EventType.CLICK), this.emit.bind(this, EventType.CLICK));
        node.addEventListener(this.convertEventTypeToString(EventType.DBCLICK),
            this.emit.bind(this, EventType.DBCLICK));
        node.addEventListener(this.convertEventTypeToString(EventType.MOUSE_DOWN),
            this.emit.bind(this, EventType.MOUSE_DOWN));
        node.addEventListener(this.convertEventTypeToString(EventType.MOUSE_UP),
            this.emit.bind(this, EventType.MOUSE_UP));
        node.addEventListener(this.convertEventTypeToString(EventType.MOUSE_MOVE),
            this.emit.bind(this, EventType.MOUSE_MOVE));
        node.addEventListener(this.convertEventTypeToString(EventType.MOUSE_OVER),
            this.emit.bind(this, EventType.MOUSE_OVER));
        node.addEventListener(this.convertEventTypeToString(EventType.MOUSE_OUT),
            this.emit.bind(this, EventType.MOUSE_OUT));
        node.addEventListener(this.convertEventTypeToString(EventType.MOUSE_WHEEL),
            this.emit.bind(this, EventType.MOUSE_WHEEL));
        node.addEventListener(this.convertEventTypeToString(EventType.SCROLL), this.emit.bind(this, EventType.SCROLL));
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
