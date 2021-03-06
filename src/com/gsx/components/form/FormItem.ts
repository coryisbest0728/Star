/**
 * @file The select component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventType} from '../../events/EventType';
import {IValidator} from './validator/IValidator';
import {IValidation} from '../IValidation';
import {UIComponent} from '../UIComponent';
import {UIComponentContainer} from '../UIComponentContainer';

export class FormItem extends UIComponentContainer implements IValidation {

    /**
     * The params of inital.
     */
    private params: IFormItemParams;

    constructor(params?: IFormItemParams) {
        params = params || {};
        super(params);
        this.params = params;
    }

    /**
     * @override
     */
    public getTemplate(): string {
        return '<fieldset class="' + this.getSkinClass() + '">'
            +     '<label class="col-sm-2 form-control-label" data-element-id="labelNode"></label>'
            +     '<div class="col-sm-10" data-element-id="containerNode"></div>'
            + '</fieldset>';
    }

    /**
     * @override
     */
    public postCreate() {
        super.postCreate();
        this.setLabel(this.params.label);
    }

    /**
     * @override
     */
    public getContainerNode(): Node {
        return this.getElementById('containerNode');
    }

    /**
     * Set label.
     * @param {string} label
     */
    public setLabel(label: string): void {
        var labelNode: HTMLElement = <HTMLElement>this.getElementById('labelNode');
        var labelNodeClassList: DOMTokenList = labelNode.classList;
        labelNode.innerHTML = label || '';
        var containerNodeClassList: DOMTokenList = (<Element>this.getContainerNode()).classList;
        if (label) {
            if (containerNodeClassList.contains('col-sm-offset-2')) {
                containerNodeClassList.remove('col-sm-offset-2');
            }
            labelNodeClassList.contains('hidden') && labelNodeClassList.remove('hidden');
        } else {
            containerNodeClassList.add('col-sm-offset-2');
            !labelNodeClassList.contains('hidden') && labelNodeClassList.add('hidden');
        }
    }

    /**
     * @override
     */
    public validate(): boolean {
        // TODO:
        return true;
    }

    /**
     * @override
     */
    protected getOriginSpecSkinClass(): string {
        return this.params.specSkinClass || '';
    }

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return 'form-group row form-item';
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
    }
}

interface IFormItemParams {
    specSkinClass?: string;

    /**
     * The label of the form item.
     */
    label?: string;
}
