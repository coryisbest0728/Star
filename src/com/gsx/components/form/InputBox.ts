/**
 * @file The abstract input box component.
 *
 * @author kuanghongrui@baijiahulian.com
 */

import {FormComponent} from 'com/gsx/components/form/FormComponent';

export abstract class InputBox extends FormComponent {

    /**
     * The params of inital.
     */
    private params: {disabled?: boolean; specSkinClass?: string;};

    constructor(params?: {disabled?: boolean; specSkinClass?: string;}) {
        this.params = params || {};
        super();
    }

    /**
     * @override
     */
    public getTemplateString(): string {
        return '<input class="' + this.getSkinClass() + '" type="' + this.getType() + '"></button>';
    }

    /**
     * Get the type of the input box.
     * @return {string}
     */
    abstract getType(): string;

    /**
     * @override
     */
    public getFormControlNode(): Node {
        return this.getNode();
    }

    /**
     * @override
     */
    public buildRendering(): void {
        super.buildRendering();
        this.setDisabled(this.params.disabled);
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
        return 'form-control';
    }

    /**
     * @override
     */
    public destroy(): void {
        super.destroy();
        delete this.params;
    }
}
