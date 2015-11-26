/**
 * @file The base class of UI component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventType} from 'com/gsx/events/EventType';
import {GeometryUtil} from 'com/gsx/utils/GeometryUtil';
import {IBox} from 'com/gsx/components/IBox';
import {IContained} from 'com/gsx/components/IContained';
import {IContainer} from 'com/gsx/components/IContainer';
import {ITemplated} from 'com/gsx/components/ITemplated';
import {NumberUtil} from 'com/gsx/utils/NumberUtil';
import {SkinableComponent} from 'com/gsx/components/SkinableComponent';

export abstract class UIComponent extends SkinableComponent implements IBox, ITemplated, IContained {

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
        var tempFrag: DocumentFragment = document.createDocumentFragment();
        tempFrag.appendChild(tempElement);
        tempElement.innerHTML = this.getTemplateString();
        this.node = tempFrag.firstChild.firstChild;
        (<Element>this.node).setAttribute('data-component-id',
            this.getSimpleClassName().toLowerCase() + '-' + NumberUtil.getRandom());
    }

    /**
     * @override
     */
    public destroy(): void {
        this.removeAllListeners();
        var node: Node = this.getNode();
        node.parentNode.removeChild(node);
        super.destroy();
    }

    /**
     * @override
     * The subclass must implement this method.
     */
    abstract getTemplateString(): string;

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
     * @override
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

    /**
     * @override
     */
//    public toString(): string {
//        return '[object UIComponent-' + this.getSimpleClassName() + ']';
//    }

    /**
     * Get the simple class name.
     * @return {string}
     */
    private getSimpleClassName(): string {
        var results = /function (.{1,})\(/.exec(this.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
}
