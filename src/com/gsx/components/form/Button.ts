/**
 * @file The button component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IValidator} from 'com/gsx/components/form/validator/IValidator';
import {LabelledFormComponent} from 'com/gsx/components/form/LabelledFormComponent';

export class Button extends LabelledFormComponent {

    /**
     * The params of inital.
     */
    private params: ButtonParams;

    constructor(params?: ButtonParams) {
        this.params = params || {};
        super(this.params);
    }

    /**
     * @override
     */
    public getTemplateString(): string {
        return '<button class="' + this.getSkinClass() + '" type="button"></button>';
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
    public buildRendering(): void {
        super.buildRendering();
        this.setLabel(this.params.label || '');
        this.setDisabled(this.params.disabled);
    }

    /**
     * @override
     */
    public getLabelledNode(): Node {
        return this.getFormControlNode();
    }

    /**
     * @override
     */
    protected getOriginSpecSkinClass(): string {
        return this.params.specSkinClass || 'btn-primary';
    }

    /**
     * @override
     */
    public getBaseSkinClass(): string {
        return 'btn';
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
    }
}

interface ButtonParams {
    /**
     * The label of the button
     */
    label?: string;

    /**
     * @see http://www.w3school.com.cn/tags/att_button_disabled.asp
     */
    disabled?: boolean;

    /**
     * The spec button skin class.
     */
    specSkinClass?: string;
}
