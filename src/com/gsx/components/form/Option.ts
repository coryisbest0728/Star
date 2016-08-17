/**
 * @file The select component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IValidator} from './validator/IValidator';
import {LabelledFormComponent} from './LabelledFormComponent';

export class Option extends LabelledFormComponent {

    /**
     * The params of inital.
     */
    private params: OptionParams;

    constructor(params?: OptionParams) {
        params = params || {};
        super(params);
        this.params = params;
    }

    /**
     * @override
     */
    public getTemplate(): string {
        return '<option class="' + this.getSkinClass() + '"></option>';
    }

    /**
     * @override
     */
    public postCreate(): void {
        super.postCreate();
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
    public getLabelledNode(): Node {
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
