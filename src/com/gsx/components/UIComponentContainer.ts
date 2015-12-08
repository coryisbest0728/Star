/**
 * @file The ui container component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IContainer} from './IContainer';
import {IDestroyable} from './IDestroyable';
import {UIComponent} from './UIComponent';

export abstract class UIComponentContainer extends UIComponent implements IContainer {

    private children: Array<UIComponent>;

    /**
     * @override
     */
    public create(params?: Object) {
        this.children = new Array<UIComponent>();
        super.create(params);
    }

    /**
     * @override
     */
    public getChildren(): Array<UIComponent> {
        return this.children;
    }

    /**
     * @override
     */
    public contains(uiComponent: UIComponent): boolean {
        return this.children.filter(function (child: UIComponent): boolean {
            return uiComponent === child;
        }).length === 1;
    }

    /**
     * @abstract
     */
    abstract getContainerNode(): Node;

    /**
     * @override
     */
    public addChild(uiComponent: UIComponent, index?: number): void {
        if (!this.contains(uiComponent)) {
            var containerNode: Node = this.getContainerNode();
            var children: Array<UIComponent> = this.getChildren();
            if (typeof(index) === 'number') {
                index = index || 0;
                this.getContainerNode().insertBefore(uiComponent.getNode(), children[index].getNode());
                children.splice(index, 0, uiComponent);
            } else {
                containerNode.appendChild(uiComponent.getNode());
                children.push(uiComponent);
            }
            uiComponent.setParent(this);
        }
    }

    /**
     * @override
     */
    public getChild(index: number): UIComponent {
        return this.getChildren()[index];
    }

    /**
     * @override
     */
    public removeChild(uiComponent: UIComponent): void;
    public removeChild(index: number): void;
    public removeChild(param: any): void {
        var index = -1;
        if (param instanceof UIComponent) { // remove the uiComponent
            if (this.contains(param)) {
                var children: Array<UIComponent> = this.getChildren();
                for (var i: number = 0, len: number = children.length; i < len; ++i) {
                    if (children[i] === param) {
                        index = i;
                        break;
                    }
                }
            }
        } else if (typeof(param) === 'number') { // remove from the index
            index = param || 0;
        }
        if (index >= 0) {
            var deletingChildren: Array<IDestroyable> = this.children.splice(index, 1);
            if (deletingChildren && deletingChildren.length) {
                deletingChildren[0].destroy();
            }
        }
    }

    /**
     * @override
     */
    public removeAllChildren(): void {
        // TODO:
    }

    /**
     * @override
     */
    public destroy(): void {
        this.removeAllChildren();
        delete this.children;
        super.destroy();
    }
}
