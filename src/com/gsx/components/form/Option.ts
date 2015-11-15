/**
 * @file The select component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IValidator} from 'com/gsx/components/form/validator/IValidator';
import {FormComponent} from 'com/gsx/components/form/FormComponent';

export class Option extends FormComponent {

    /**
     * The params of inital.
     */
    private params: OptionParams;

    constructor(params?: OptionParams) {
        this.params = params || {};
        super(this.params);
    }

    /**
     * @override
     */
    public getTemplateString(): string {
        return '<option class="' + this.getSkinClass() + '"></option>';
    }

    /**
     * @override
     */
    public buildRendering(): void {
        super.buildRendering();
        this.setLabel(this.params.label);
        this.setValue(this.params.value);
        this.setSelected(this.params.selected);
    }

    /**
     * @override
     */
    public getFormControlNode(): Node {
        return this.getNode();
    }

    /**
     * @override
     */
    public getValidators(): Array<IValidator> {
        return [];
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
        return '';
    }

    /**
     * Set the label of the option.
     * @param {string} label
     */
    public setLabel(label: string): void {
        (<HTMLElement>this.getFormControlNode()).innerHTML = label;
    }

    /**
     * Get the label of the option.
     * @return {string}
     */
    public getLabel(): string {
        var formControlNode = this.getFormControlNode();
        if (formControlNode) {
            return (<HTMLElement>formControlNode).innerHTML;
        } else {
            return this.params.label || '';
        }
    }

    /**
     * Set the value of the option.
     * @param {string} value
     */
    public setValue(value: string): void {
        (<Element>this.getFormControlNode()).setAttribute('value', value);
    }

    /**
     * Get the value of the option.
     * @return {string}
     */
    public getValue(): string {
        var formControlNode = this.getFormControlNode();
        if (formControlNode) {
            return (<Element>formControlNode).getAttribute('value');
        } else {
            return this.params.value || '';
        }
    }

    /**
     * Set selected status of ths option
     * @param {boolean} selected
     */
    public setSelected(selected: boolean) {
        if (selected) {
            (<Element>this.getFormControlNode()).setAttribute('selected', 'selected');
        } else {
            (<Element>this.getFormControlNode()).removeAttribute('selected');
        }
    }

    /**
     * Get selected status of ths option
     * @return {boolean}
     */
    public getSelected(selected: boolean) {
        (<Element>this.getFormControlNode()).hasAttribute('selected');
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
    }
}

export interface OptionParams {
    label?: string;
    value?: string;
    selected?: boolean;
    specSkinClass?: string;
}