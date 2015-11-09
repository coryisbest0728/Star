/**
 * @file The form component.
 * plz see <url>http://www.w3school.com.cn/tags/tag_form.asp</url>
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {FormComponent} from 'com/gsx/components/form/FormComponent';
import {IContainer} from 'com/gsx/components/IContainer';
import {IDestroyable} from 'com/gsx/components/IDestroyable';
import {UIComponent} from 'com/gsx/components/UIComponent';

export class Form extends FormComponent implements IContainer {

    private children: Array<UIComponent>;

    constructor() {
        super();
        this.children = new Array<UIComponent>();
    }

    /**
     * @override
     */
    public getTemplateString(): string {
        return '<form></form>';
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
     * @override
     */
    public getContainerNode(): Node {
        return this.getNode();
    }

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
        
    }

    /**
     * Set the charset of the server application
     * @param {string} acceptCharset
     * @see http://www.w3school.com.cn/tags/att_form_accept-charset.asp
     */
    public setAcceptCharset(acceptCharset: string): void {
        (<Element>this.getNode()).setAttribute('accept-charset', acceptCharset);
    }

    /**
     * Get the charset of the server application
     * @return {string}
     * @see http://www.w3school.com.cn/tags/att_form_accept-charset.asp
     */
    public getAcceptCharset(): string {
        return (<Element>this.getNode()).getAttribute('accept-charset');
    }

    /**
     * Set the server action url path.
     * @param {string} action
     * @see http://www.w3school.com.cn/tags/att_form_action.asp
     */
    public setAction(action: string): void {
        (<Element>this.getNode()).setAttribute('action', action);
    }

    /**
     * Get the server action url path.
     * @return {string}
     * @see http://www.w3school.com.cn/tags/att_form_action.asp
     */
    public getAction(): string {
        return (<Element>this.getNode()).getAttribute('action');
    }

    /**
     * Turn on the autocomplete or not.
     * @param {boolean} autocomplete
     * @see http://www.w3school.com.cn/tags/att_form_autocomplete.asp
     */
    public setAutocomplete(autocomplete: boolean): void {
        (<Element>this.getNode()).setAttribute('autocomplete', autocomplete ? 'on' : 'off');
    }

    /**
     * Get the autocomplete state.
     * @return {boolean}
     * @see http://www.w3school.com.cn/tags/att_form_autocomplete.asp
     */
    public getAutocomplete(): boolean {
        return (<Element>this.getNode()).getAttribute('autocomplete') === 'on';
    }

    /**
     * Set the enctype of the form.
     * @param {string} enctype
     * @see http://www.w3school.com.cn/tags/att_form_enctype.asp
     */
    public setEnctype(enctype: string): void {
        (<Element>this.getNode()).setAttribute('enctype', enctype || 'application/x-www-form-urlencoded');
    }

    /**
     * Get the form of the form.
     * @return {string}
     * @see http://www.w3school.com.cn/tags/att_form_enctype.asp
     */
    public getEnctype(): string {
        return (<Element>this.getNode()).getAttribute('enctype') || 'application/x-www-form-urlencoded';
    }

    /**
     * Set the method of the form.
     * @param {string} method
     * @see http://www.w3school.com.cn/tags/att_form_method.asp
     */
    public setMethod(method: string): void {
        (<Element>this.getNode()).setAttribute('method', method);
    }

    /**
     * Get the method of the form.
     * @return {string}
     * @see http://www.w3school.com.cn/tags/att_form_method.asp
     */
    public getMethod(): string {
        return (<Element>this.getNode()).getAttribute('method');
    }

    /**
     * @override
     */
    public destroy(): void {
//        var children: Array<UIComponent> = this.getChildren();
//        for (var i: number = children.length; i > 0; --i) {
//            children.pop().destroy();
//        }
        this.removeAllChildren();
        delete this.children;
        super.destroy();
    }
}
