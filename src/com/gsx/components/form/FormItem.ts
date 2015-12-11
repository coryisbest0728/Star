/**
 * @file The select component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {EventType} from '../../events/EventType';
import {IValidator} from './validator/IValidator';
import {IValidationComponent} from '../IValidationComponent';
import {UIComponent} from '../UIComponent';
import {UIComponentContainer} from '../UIComponentContainer';

export class FormItem extends UIComponentContainer implements IValidationComponent {

    /**
     * The params of inital.
     */
    private params: IFormItemParams;

    constructor(params?: IFormItemParams) {
        this.params = params || {};
        super(this.params);
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
        (<HTMLElement>this.getElementById('labelNode')).innerHTML = label || '&nbsp;';
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
