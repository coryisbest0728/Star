/**
 * @file The button component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {IValidator} from './validator/IValidator';
import {LabelledFormComponent} from './LabelledFormComponent';

export class Button extends LabelledFormComponent {

    /**
     * The params of inital.
     */
    private params: ButtonParams;

    constructor(params?: ButtonParams) {
        params = params || {};
        super(params);
        this.params = params;
    }

    /**
     * @override
     */
    public getTemplate(): string {
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
    public postCreate(): void {
        super.postCreate();
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
